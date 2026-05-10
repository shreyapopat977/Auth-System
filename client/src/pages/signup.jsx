import React, { useState } from "react";
import { Link } from "react-router-dom";

// ─── Validators ───────────────────────────────────────────────
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Checks each password rule individually for strength indicator
export const PASSWORD_RULES = [
    { id: "length",    label: "At least 8 characters",       test: (v) => v.length >= 8 },
    { id: "uppercase", label: "One uppercase letter (A–Z)",  test: (v) => /[A-Z]/.test(v) },
    { id: "number",    label: "One number (0–9)",            test: (v) => /[0-9]/.test(v) },
    { id: "special",   label: "One special character (!@#…)", test: (v) => /[^A-Za-z0-9]/.test(v) },
];

const validateFullName = (value) => {
    if (!value.trim()) return "Full name is required.";
    if (value.trim().length < 2) return "Name must be at least 2 characters.";
    return "";
};

const validateEmail = (value) => {
    if (!value.trim()) return "Email is required.";
    if (!EMAIL_REGEX.test(value)) return "Enter a valid email address.";
    return "";
};

const validatePassword = (value) => {
    if (!value) return "Password is required.";
    const failed = PASSWORD_RULES.find((rule) => !rule.test(value));
    if (failed) return failed.label + " is required.";
    return "";
};

const validateConfirmPassword = (value, password) => {
    if (!value) return "Please confirm your password.";
    if (value !== password) return "Passwords do not match.";
    return "";
};

// ─── Password Strength Indicator ──────────────────────────────
const PasswordStrength = ({ password }) => {
    if (!password) return null;

    const passed = PASSWORD_RULES.filter((r) => r.test(password)).length;
    const levels = ["", "Weak", "Fair", "Good", "Strong"];
    const colors = ["", "bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-green-500"];
    const textColors = ["", "text-red-500", "text-orange-500", "text-yellow-600", "text-green-600"];

    return (
        <div className="mt-2 space-y-1.5">
            {/* Bar */}
            <div className="flex gap-1">
                {PASSWORD_RULES.map((_, i) => (
                    <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                            i < passed ? colors[passed] : "bg-gray-200"
                        }`}
                    />
                ))}
            </div>
            <p className={`text-xs font-medium ${textColors[passed]}`}>
                {levels[passed]}
            </p>
            {/* Rule checklist */}
            <ul className="space-y-0.5">
                {PASSWORD_RULES.map((rule) => (
                    <li
                        key={rule.id}
                        className={`text-xs flex items-center gap-1.5 ${
                            rule.test(password) ? "text-green-600" : "text-gray-400"
                        }`}
                    >
                        <span>{rule.test(password) ? "✅" : "○"}</span>
                        {rule.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

// ─── Component ────────────────────────────────────────────────
const Signup = () => {
    const [form, setForm] = useState({
        full_name: "",
        email: "",
        password: "",
        confirm_password: "",
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const getError = (field, value) => {
        switch (field) {
            case "full_name":        return validateFullName(value);
            case "email":            return validateEmail(value);
            case "password":         return validatePassword(value);
            case "confirm_password": return validateConfirmPassword(value, form.password);
            default:                 return "";
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        const updatedForm = { ...form, [id]: value };
        setForm(updatedForm);

        if (touched[id]) {
            const err = id === "confirm_password"
                ? validateConfirmPassword(value, updatedForm.password)
                : getError(id, value);
            setErrors((prev) => ({ ...prev, [id]: err }));
        }

        // Re-validate confirm_password when password changes
        if (id === "password" && touched.confirm_password) {
            setErrors((prev) => ({
                ...prev,
                confirm_password: validateConfirmPassword(updatedForm.confirm_password, value),
            }));
        }
    };

    const handleBlur = (e) => {
        const { id, value } = e.target;
        setTouched((prev) => ({ ...prev, [id]: true }));
        setErrors((prev) => ({ ...prev, [id]: getError(id, value) }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {
            full_name:        validateFullName(form.full_name),
            email:            validateEmail(form.email),
            password:         validatePassword(form.password),
            confirm_password: validateConfirmPassword(form.confirm_password, form.password),
        };
        setErrors(newErrors);
        setTouched({ full_name: true, email: true, password: true, confirm_password: true });

        const hasErrors = Object.values(newErrors).some(Boolean);
        if (hasErrors) return;

        // ✅ Proceed with signup logic (API call etc.)
        console.log("Signup submitted:", form);
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

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-[#151c27] mb-2">Create Account</h1>
                    <p className="text-[#434656] text-base">Join the community of secure developers.</p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit} noValidate>

                    {/* Full Name */}
                    <div>
                        <label htmlFor="full_name" className="block text-sm font-semibold text-[#434656] mb-2">
                            Full Name
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">👤</span>
                            <input
                                type="text"
                                id="full_name"
                                value={form.full_name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="John Doe"
                                className={inputClass("full_name")}
                                autoComplete="name"
                            />
                        </div>
                        {errors.full_name && touched.full_name && (
                            <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                                <span>⚠️</span> {errors.full_name}
                            </p>
                        )}
                    </div>

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
                        <label htmlFor="password" className="block text-sm font-semibold text-[#434656] mb-2">
                            Password
                        </label>
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
                                autoComplete="new-password"
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
                        {/* Password strength — shows as soon as user types */}
                        {form.password && <PasswordStrength password={form.password} />}
                        {errors.password && touched.password && !form.password && (
                            <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                                <span>⚠️</span> {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label htmlFor="confirm_password" className="block text-sm font-semibold text-[#434656] mb-2">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">✅</span>
                            <input
                                type={showConfirm ? "text" : "password"}
                                id="confirm_password"
                                value={form.confirm_password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="••••••••"
                                className={inputClass("confirm_password")}
                                autoComplete="new-password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm((prev) => !prev)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                aria-label="Toggle confirm password visibility"
                            >
                                {showConfirm ? "🙈" : "👁️"}
                            </button>
                        </div>
                        {errors.confirm_password && touched.confirm_password && (
                            <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                                <span>⚠️</span> {errors.confirm_password}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full py-4 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-semibold transition duration-200 mt-2"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-gray-600">
                        Already have an account?{" "}
                        <Link to="/" className="text-blue-600 font-semibold hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default Signup;