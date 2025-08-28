import React from 'react';
import { MdGTranslate } from 'react-icons/md';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'; // Make sure to import the CSS file

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const userName = user?.username || "이름"; // You can replace this with a dynamic user name from a state or context

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="main-header">
      <Link to="/toolspage" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h1 className="project-title"><MdGTranslate color="#6a5acd" /> Translate Project</h1>
      </Link>
    </header>
  );
};

export default Header;