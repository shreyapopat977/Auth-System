import React, { useState } from "react";
import { Link } from "react-router-dom";

// ─── Validators ───────────────────────────────────────────────
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const validateEmail = (value) => {
    if (!value.trim()) return "Email is required.";
    if (!EMAIL_REGEX.test(value)) return "Enter a valid email address.";
    return "";
};

const validatePassword = (value) => {
    if (!value) return "Password is required.";
    if (value.length < 8) return "Password must be at least 8 characters.";
    return "";
};

// ─── Component ────────────────────────────────────────────────
const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [touched, setTouched] = useState({});

    const validators = { email: validateEmail, password: validatePassword };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setForm((prev) => ({ ...prev, [id]: value }));

        // Live validation only after first blur
        if (touched[id]) {
            setErrors((prev) => ({ ...prev, [id]: validators[id](value) }));
        }
    };

    const handleBlur = (e) => {
        const { id, value } = e.target;
        setTouched((prev) => ({ ...prev, [id]: true }));
        setErrors((prev) => ({ ...prev, [id]: validators[id](value) }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {
            email: validateEmail(form.email),
            password: validatePassword(form.password),
        };
        setErrors(newErrors);
        setTouched({ email: true, password: true });

        const hasErrors = Object.values(newErrors).some(Boolean);
        if (hasErrors) return;

        // ✅ Proceed with login logic (API call etc.)
        console.log("Login submitted:", form);
    };

    const inputClass = (field) =>
        `w-full pl-11 pr-11 py-3 border rounded-xl outline-none focus:ring-2 transition ${
            errors[field] && touched[field]
                ? "border-red-400 focus:ring-red-300 bg-red-50"
                : "border-gray-300 focus:ring-blue-500"
        }`;

    return (
        <main className="min-h-screen flex items-center justify-center bg-[#f9f9ff] px-6 py-12">
            <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-lg p-8 md:p-10">

                {/* Heading */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-[#151c27] mb-2">Welcome Back</h1>
                    <p className="text-[#434656] text-base">Please enter your details to sign in.</p>
                </div>

                {/* Form */}
                <form className="space-y-6" onSubmit={handleSubmit} noValidate>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-[#434656] mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">📧</span>
                            <input
                                type="email"
                                id="email"
                                value={form.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="name@company.com"
                                className={inputClass("email")}
                                autoComplete="email"
                            />
                        </div>
                        {errors.email && touched.email && (
                            <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                                <span>⚠️</span> {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label htmlFor="password" className="text-sm font-semibold text-[#434656]">
                                Password
                            </label>
                            <a href="#" className="text-sm text-blue-600 hover:underline">
                                Forgot password?
                            </a>
                        </div>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={form.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="••••••••"
                                className={inputClass("password")}
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                aria-label="Toggle password visibility"
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                        {errors.password && touched.password && (
                            <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                                <span>⚠️</span> {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="remember" className="accent-blue-600" />
                        <label htmlFor="remember" className="text-sm text-gray-600">
                            Remember for 30 days
                        </label>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full py-4 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-semibold transition duration-200"
                    >
                        Login
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-gray-600">
                        Don&apos;t have an account?{" "}
                        <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default Login;