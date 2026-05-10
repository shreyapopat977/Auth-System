import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
    return (
        <main className="min-h-screen flex items-center justify-center bg-[#f9f9ff] px-6 py-12">
            <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-lg p-8 md:p-10">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-[#151c27] mb-2">
                        Create Account
                    </h1>

                    <p className="text-[#434656] text-base">
                        Join the community of secure developers.
                    </p>
                </div>

                {/* Form */}
                <form className="space-y-6">

                    {/* Full Name */}
                    <div>
                        <label
                            htmlFor="full_name"
                            className="block text-sm font-semibold text-[#434656] mb-2"
                        >
                            Full Name
                        </label>

                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                👤
                            </span>

                            <input
                                type="text"
                                id="full_name"
                                placeholder="John Doe"
                                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

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
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-[#434656] mb-2"
                        >
                            Password
                        </label>

                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                🔒
                            </span>

                            <input
                                type="password"
                                id="password"
                                placeholder="••••••••"
                                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label
                            htmlFor="confirm_password"
                            className="block text-sm font-semibold text-[#434656] mb-2"
                        >
                            Confirm Password
                        </label>

                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                ✅
                            </span>

                            <input
                                type="password"
                                id="confirm_password"
                                placeholder="••••••••"
                                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Signup Button */}
                    <button
                        type="submit"
                        className="w-full py-4 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-semibold transition duration-200"
                    >
                        Signup
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-gray-600">
                        Already have an account?{" "}

                        <link
                            to="/"
                            className="text-blue-600 font-semibold hover:underline"
                        >
                            Login
                        </link>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default Signup;