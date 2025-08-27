import React, { useState , useEffect } from "react";
import {FaUser, FaEnvelope, FaLock, FaSpinner } from "react-icons/fa";
import "./Login.css";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext.jsx";
import apiClient from '../util/axiosInstance.jsx'

const Login = () => {

    const [form, setForm] = useState({ memberId: "", password: "" });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
    };

    const validateForm = () => {
        let newErrors = {};
        if (!form.memberId) newErrors.memberId = "아이디를 입력해주세요.";


        if (!form.password) newErrors.password = "비밀번호를 입력해주세요.";
        else if (form.password.length < 4)
            newErrors.password = "비밀번호는 4자 이상이어야 합니다.";

        return newErrors;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:8080/generateToken',
                form,
                {
                    headers: { 'Content-Type': 'application/json' },
                },
            );

            //추가, 로그인 정보 표기
            //login({ memberId: this.memberId }); // Context에 로그인 정보 저장

            localStorage.setItem('accessToken', response.data.accessToken); // 토큰 저장
            localStorage.setItem('refreshToken', response.data.refreshToken); // 토큰 저장
            // 사용자 정보 가져오기
            const userDetailsResponse = await apiClient.get('/member/me');
            const userName = userDetailsResponse.data.userName; // userName 속성이 있다고 가정

            login({ memberId: form.memberId, userName: userName }); // Context에 로그인 정보 저장
            alert('로그인 성공!');
            navigate('/toolspage'); // 로그인 후 대시보드로 이동
        } catch (error) {
            alert('로그인 실패');
            console.error(error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Welcome Back!</h2>
                <p className="login-subtitle">로그인하여 계속 진행하세요.</p>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <FaUser className="input-icon" />
                        <input
                            type="text"
                            name="memberId"
                            placeholder="아이디"
                            value={form.memberId}
                            onChange={handleChange}
                            className={errors.memberId ? "input error" : "input"}
                        />
                    </div>
                    {errors.memberId && <p className="error-text">{errors.memberId}</p>}

                    <div className="input-group">
                        <FaLock className="input-icon" />
                        <input
                            type="password"
                            name="password"
                            placeholder="비밀번호"
                            value={form.password}
                            onChange={handleChange}
                            className={errors.password ? "input error" : "input"}
                        />
                    </div>
                    {errors.password && <p className="error-text">{errors.password}</p>}

                    <button type="submit" className="login-btn" disabled={isLoading}>
                        {isLoading ? <FaSpinner className="spinner" /> : "로그인"}
                    </button>
                </form>

                <p className="signup-text">
                    계정이 없으신가요?{" "}
                    <a href="/register" className="signup-link">
                        회원가입
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
