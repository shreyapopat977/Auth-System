import {
    signupService,
    loginService,
} from "../services/auth.service.js";


// SIGNUP CONTROLLER
export const signup = async (req, res) => {
    try {
        const data = await signupService(req.body);

        // save refresh token in cookie
        res.cookie("refreshToken", data.refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(201).json({
            success: true,
            message: "Signup successful",
            accessToken: data.accessToken,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};


// LOGIN CONTROLLER
export const login = async (req, res) => {
    try {
        const data = await loginService(req.body);

        // save refresh token in cookie
        res.cookie("refreshToken", data.refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            accessToken: data.accessToken,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};