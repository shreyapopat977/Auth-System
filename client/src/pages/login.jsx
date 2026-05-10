import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <main className="min-h-screen flex items-center justify-center bg-[#f9f9ff] px-6 py-12">
            <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-lg p-8 md:p-10">

                {/* Heading */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-[#151c27] mb-2">
                        Welcome Back
                    </h1>

                    <p className="text-[#434656] text-base">
                        Please enter your details to sign in.
                    </p>
                </div>

                {/* Form */}
                <form className="space-y-6">

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-[#434656] mb-2"
                        >
                            Email Address
                        </label>

                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                📧
                            </span>

                            <input
                                type="email"
                                id="email"
                                placeholder="name@company.com"
                                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label
                                htmlFor="password"
                                className="text-sm font-semibold text-[#434656]"
                            >
                                Password
                            </label>

                            <a
                                href="#"
                                className="text-sm text-blue-600 hover:underline"
                            >
                                Forgot password?
                            </a>
                        </div>

                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                🔒
                            </span>

                            <input
                                type="password"
                                id="password"
                                placeholder="••••••••"
                                className="w-full pl-11 pr-11 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <button
                                type="button"
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                            >
                                👁️
                            </button>
                        </div>
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="remember" />

                        <label
                            htmlFor="remember"
                            className="text-sm text-gray-600"
                        >
                            Remember for 30 days
                        </label>
                    </div>

                    {/* Login Button */}
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
                        Don’t have an account?{" "}

                        <link
                            to="/signup"
                            className="text-blue-600 font-semibold hover:underline"
                        >
                            Sign Up
                        </link>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default Login;