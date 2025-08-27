import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HomePageTest from "./components/HomepageTest.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import ToolsPage from "./components/ToolsPage.jsx";
import MyPage from "./components/MyPage.jsx";

// ✨ App.css는 App.jsx에서 직접 import하여 레이아웃을 제어합니다.
import './App.css';

function App() {
    return (
        <div className="app-container">
            <Header />
            <main className="main-content">
                <Routes>
                    <Route index element={<HomePageTest />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/toolspage" element={<ToolsPage />} />
                    <Route path="/mypage" element={<MyPage />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;