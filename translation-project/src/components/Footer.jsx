import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-bottom-content">
          <p>&copy; 2025 Translation Project. All rights reserved.</p>
          <div className="footer-links">
            <a href="#" className="footer-link">회사소개</a>
            <a href="#" className="footer-link">이용약관</a>
            <a href="#" className="footer-link">고객센터</a>
            <a href="#" className="footer-link">개인정보처리방침</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;