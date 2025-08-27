import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Outlet, Route, Routes} from 'react-router-dom';
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";
import HomePageTest from "./components/HomepageTest.jsx";
import ToolsPage from "./components/ToolsPage.jsx";
import UserNav from "./components/UserNav.jsx";
import MyPage from "./components/MyPage.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
      <div className="app-container">
          <Header />
          <main className="main-content">
              <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route index element={<HomePageTest />} />
                  <Route path="/toolspage" element={<ToolsPage />} />
                  <Route path="/mypage" element={<MyPage />} />
              </Routes>
          </main>
          <Footer />
      </div>
  )
}

export default App
