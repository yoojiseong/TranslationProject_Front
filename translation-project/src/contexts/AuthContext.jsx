import { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../util/axiosInstance';
import {useNavigate} from "react-router-dom"; // apiClient 임포트


// Context 생성
const AuthContext = createContext(null);

// Context Provider 생성
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // 로그인 정보 저장
    const [logoutTimer, setLogoutTimer] = useState(null); // 로그아웃 타이머 상태
    const [remainingTime, setRemainingTime] = useState(null); // 남은 시간 (초 단위)
    const [intervalId, setIntervalId] = useState(null); // ✅ 인터벌 ID 저장
    const navigate = useNavigate();

    // Function to fetch user profile
    const fetchUserProfile = async () => {
        try {
            const response = await apiClient.get('/member/me'); // Adjust API endpoint as needed
            if (response.data && response.data.userName) { // 참고: userName (N 대문자)
                setUser(prevUser => ({ ...prevUser, userName: response.data.userName })); // 참고: userName (N 대문자)
                localStorage.setItem('user', JSON.stringify({ ...JSON.parse(localStorage.getItem('user')),
                    userName: response.data.userName,
                    email: response.data.email
                })); // 참고: userName (N 대문자)
            }
        } catch (error) {
            console.error("Failed to fetch user profile:", error);
            // Optionally, handle error, e.g., logout if token is invalid
        }
    };

    // 🔹 1️⃣ 컴포넌트가 처음 로드될 때 localStorage에서 로그인 정보 로드
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        const expireTime = localStorage.getItem('expireTime');

        if (savedUser && expireTime) {
            const currentTime = new Date().getTime();
            const timeLeft = parseInt(expireTime, 10) - currentTime;
            if (timeLeft > 0) {
                const parsedUser = JSON.parse(savedUser);
                setUser(parsedUser);
                startAutoLogout(timeLeft);
                // Fetch user profile to ensure username is up-to-date
                if (!parsedUser.userName) { // userName이 없는 경우에만 가져옴 (참고: userName N 대문자)
                    fetchUserProfile();
                }
            } else {
                logout(); // 만료된 경우 자동 로그아웃
            }
        }
    }, []);

    // 🔹 2️⃣ 자동 로그아웃 타이머 및 남은 시간 업데이트
    const startAutoLogout = (time) => {
        if (logoutTimer) clearTimeout(logoutTimer);
        if (intervalId) clearInterval(intervalId); // ✅ 기존 인터벌 제거

        setRemainingTime(Math.floor(time / 1000)); // 남은 시간을 초 단위로 변환

        // ✅ 새롭게 setInterval을 시작할 때 기존 것을 정리
        const newIntervalId = setInterval(() => {
            setRemainingTime((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(newIntervalId);
                    logout();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        setIntervalId(newIntervalId); // ✅ 새 인터벌 ID 저장

        setLogoutTimer(
            setTimeout(() => {
                clearInterval(newIntervalId);
                logout();
            }, time),
        );
    };

    // 로그인 함수
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        extendSession();
        // After successful login, fetch user profile to get username
        fetchUserProfile(); // Fetch username immediately after login
    };

    // 로그아웃 함수
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('expireTime');
        setRemainingTime(null);
        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
        navigate('/login');
    };

    // 🔹 10분 연장 기능 (중복 실행 방지)
    const extendSession = () => {
        if (logoutTimer) clearTimeout(logoutTimer); // ✅ 기존 타이머 제거
        if (intervalId) clearInterval(intervalId); // ✅ 기존 인터벌 제거

        const newExpireTime = new Date().getTime() + 600000; // 10분 연장
        localStorage.setItem('expireTime', newExpireTime.toString());

        startAutoLogout(600000); // ✅ 새로운 10분 타이머 실행
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user, // Add isAuthenticated
                login,
                logout,
                extendSession,
                remainingTime
            }}
        >
            
            {children}
        </AuthContext.Provider>
    );
};

// Context 사용을 위한 Hook
export const useAuth = () => useContext(AuthContext);