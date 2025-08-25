import React, { useState } from "react";
import { FaEnvelope, FaLock, FaSpinner } from "react-icons/fa";
import "./Login.css";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
    };

    const validateForm = () => {
        let newErrors = {};
        if (!form.email) newErrors.email = "이메일을 입력해주세요.";
        else if (!/\S+@\S+\.\S+/.test(form.email))
            newErrors.email = "올바른 이메일 형식이 아닙니다.";

        if (!form.password) newErrors.password = "비밀번호를 입력해주세요.";
        else if (form.password.length < 6)
            newErrors.password = "비밀번호는 6자 이상이어야 합니다.";

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 2000);
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Welcome Back!</h2>
                <p className="login-subtitle">로그인하여 계속 진행하세요.</p>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <FaEnvelope className="input-icon" />
                        <input
                            type="email"
                            name="email"
                            placeholder="이메일"
                            value={form.email}
                            onChange={handleChange}
                            className={errors.email ? "input error" : "input"}
                        />
                    </div>
                    {errors.email && <p className="error-text">{errors.email}</p>}

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
