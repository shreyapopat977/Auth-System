import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

import  generateAndSaveTokens  from "../utils/generateAndSaveTokens.js";


// SIGNUP SERVICE
export const signupService = async ({ email, password }) => {
    // validation
    if (!email || !password) {
        throw new Error("All fields are required");
    }

    // check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("User already exists");
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
        email,
        password: hashedPassword,
    });

    // generate tokens
    const tokens = await generateAndSaveTokens(user._id);

    return tokens;
};


// LOGIN SERVICE
export const loginService = async ({ email, password }) => {
    // validation
    if (!email || !password) {
        throw new Error("All fields are required");
    }

    // find user
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    // generate tokens
    const tokens = await generateAndSaveTokens(user._id);

    return tokens;
};