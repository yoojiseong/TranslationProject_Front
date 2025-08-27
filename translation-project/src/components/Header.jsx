import React from 'react';
import { MdGTranslate } from 'react-icons/md';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Header.css'; // Make sure to import the CSS file

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const userName = user?.username || "이름"; // You can replace this with a dynamic user name from a state or context

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="main-header">
      <h1 className="project-title"><MdGTranslate color="#6a5acd" /> Translate Project</h1>
      
    </header>
  );
};

export default Header;