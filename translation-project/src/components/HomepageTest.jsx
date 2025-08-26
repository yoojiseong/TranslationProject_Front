import React from 'react';
import './HomePage.css'; // 분리된 CSS 파일을 import 합니다.

/**
 * 웹사이트의 홈 페이지 컴포넌트입니다.
 * 스타일은 HomePage.css 파일에서 관리됩니다.
 */
const HomePage = () => {
    // 인라인 SVG 아이콘 정의
    const getIcon = (type) => {
        // 기존 Tailwind 클래스 대신 새로운 'feature-icon' 클래스를 사용합니다.
        const iconClass = "feature-icon";
        switch (type) {
            case 'translate':
                return (
                    <svg className={iconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
                        <path d="M0 256c0 141.4 114.6 256 256 256s256-114.6 256-256S397.4 0 256 0 0 114.6 0 256zm256 128c-28.7 0-51.9-23.3-51.9-51.9v-51.5h-51.5c-28.7 0-51.9-23.3-51.9-51.9S123.3 128 152 128h128v-32h-128c-48.4 0-87.9 39.5-87.9 87.9v51.5c0 48.4 39.5 87.9 87.9 87.9H256v51.5c0 28.7 23.3 51.9 51.9 51.9s51.9-23.3 51.9-51.9v-51.5h51.5c28.7 0 51.9-23.3 51.9-51.9s-23.3-51.9-51.9-51.9h-51.5v-32h51.5c48.4 0 87.9 39.5 87.9 87.9v51.5c0 48.4-39.5 87.9-87.9 87.9H256zm128-128c-28.7 0-51.9-23.3-51.9-51.9v-51.5h-51.5c-28.7 0-51.9-23.3-51.9-51.9S307.7 128 336 128h128v-32h-128c-48.4 0-87.9 39.5-87.9 87.9v51.5c0 48.4 39.5 87.9 87.9 87.9H384v51.5c0 28.7 23.3 51.9 51.9 51.9s51.9-23.3 51.9-51.9v-51.5h51.5c28.7 0 51.9-23.3 51.9-51.9s-23.3-51.9-51.9-51.9h-51.5v-32h51.5c48.4 0 87.9 39.5 87.9 87.9v51.5c0 48.4-39.5 87.9-87.9 87.9H384zm-64-64h-32v-32h32v32zM192 192c0-8.8-7.2-16-16-16H48c-8.8 0-16 7.2-16 16v160c0 8.8 7.2 16 16 16h128c8.8 0 16-7.2 16-16V192zm-16 128H48v-64h128v64z" />
                    </svg>
                );
            case 'summarize':
                return (
                    <svg className={iconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
                        <path d="M416 32H32C14.3 32 0 46.3 0 64v384c0 17.7 14.3 32 32 32h384c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32zM128 176c-8.8 0-16 7.2-16 16v16c0 8.8 7.2 16 16 16h192c8.8 0 16-7.2 16-16v-16c0-8.8-7.2-16-16-16H128zm-32 80c0-8.8 7.2-16 16-16h224c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16H112c-8.8 0-16-7.2-16-16v-16zm96 96c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16h-64c-8.8 0-16-7.2-16-16v-16z" />
                    </svg>
                );
            case 'paraphrase':
                return (
                    <svg className={iconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
                        <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm328-80c8.8-4.4 19.3-2.1 26.2 5.1c7 7 9.2 17.5 4.8 26.2l-3.3 6.6c-4.9 9.8-16.1 14.2-26.4 10.4c-10.3-3.9-15.6-14.7-12.7-25.5l.6-2.2c-1.3-4.8-5.3-8.8-10.1-10.1l-2.2 .6c-10.8 2.9-21.6-2.4-25.5-12.7c-3.9-10.3 .5-21.5 10.4-26.4l6.6-3.3c8.7-4.4 16.5 .5 19.5 9.7l2.8 8.6l7-14c4.3-8.6 15.4-12.9 24.3-9.5zM148.2 253.9c-8.4 8.4-8.4 22 0 30.4L188 324l-39.6 16.7c-17.1 7.2-29.6 23.9-30.2 43.1c-1.5 46.1 36.4 83.1 82.5 81.6c19.2-.6 35.9-13.2 43.1-30.2L284 324l39.6 16.7c8.4 3.5 17.9 1.1 24.5-6.2s8.5-17.9 6.2-24.5l-20.9-49.3L400 248.6c13.7-5.8 20.3-20.4 16.8-35.4s-14.7-25.7-29.7-25.7l-49.3-20.9L299.7 122c-7.3-17.3-27.1-23.7-44.4-16.4c-17.3 7.3-23.7 27.1-16.4 44.4L248 184l-49.3 20.9c-17.3 7.3-23.7 27.1-16.4 44.4L184 248.6l-20.9 49.3c-2.3 5.4-.5 11.5 4.8 14.1l14.1 6.8c1.3 .6 2.6 1 4.1 1.2c8.2 1.2 16.3-2.6 21.6-10.2l20.9-49.3L284 324l-39.6 16.7c-8.4 3.5-17.9 1.1-24.5-6.2s-8.5-17.9-6.2-24.5L248 184l-49.3 20.9c-17.3 7.3-23.7 27.1-16.4 44.4L184 248.6l-20.9 49.3c-2.3 5.4-.5 11.5 4.8 14.1l14.1 6.8c1.3 .6 2.6 1 4.1 1.2c8.2 1.2 16.3-2.6 21.6-10.2l20.9-49.3z" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <div className="home-container">
            <div className="home-bg-before"></div>
            <div className="home-bg-after"></div>

            <div className="home-box">
                <div className="text-center">
                    <h1 className="title-text">
                        텍스트 변환의 새로운 경험
                    </h1>
                    <p className="subtitle-text">
                        간편하고 강력한 번역, 요약, 의역 도구를 만나보세요.
                    </p>
                    <a href="/tools" className="start-button">
                        지금 시작하기
                    </a>
                </div>

                {/* 카드들을 감싸는 div의 클래스를 'features-grid'로 변경합니다. */}
                <div className="features-grid">
                    <div className="feature-card">
                        {getIcon('translate')}
                        <h3 className="feature-title">정확한 번역</h3>
                        <p className="feature-description">
                            문맥에 맞는 자연스러운 번역으로 언어의 장벽을 허물어 보세요.
                        </p>
                    </div>

                    <div className="feature-card">
                        {getIcon('summarize')}
                        <h3 className="feature-title">빠른 요약</h3>
                        <p className="feature-description">
                            긴 문서를 핵심만 파악하여 시간을 절약하고 효율성을 높여줍니다.
                        </p>
                    </div>

                    <div className="feature-card">
                        {getIcon('paraphrase')}
                        <h3 className="feature-title">창의적인 의역</h3>
                        <p className="feature-description">
                            동일한 의미를 새로운 표현으로 바꿔 더 풍부한 글쓰기를 돕습니다.
                        </p>
                    </div>
                </div>

                <div className="footer-text">
                    <p>
                        본 서비스는 백엔드와 비동기 방식으로 통신하여
                        최적의 성능과 사용자 경험을 제공합니다.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
