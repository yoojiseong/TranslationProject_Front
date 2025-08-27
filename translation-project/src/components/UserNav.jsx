import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './UserNav.css'; // Create this CSS file

const UserNav = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const userName = user?.username || "이름"; // You can replace this with a dynamic user name from a state or context

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="user-nav-container">
      <span className="welcome-message">
        {userName}님 환영합니다
      </span>
      <nav className="header-nav">
        <ul className="nav-list">
          <li className="nav-item">
            <a href="/mypage" className="nav-link">마이페이지</a>
          </li>
          <li className="nav-item">
            <a href="#" onClick={handleLogout} className="nav-link">로그아웃</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserNav;