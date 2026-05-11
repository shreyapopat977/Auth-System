import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const generateAndSaveTokens = async (userId) => {

    // generate access token
    const accessToken = jwt.sign(
        { userId },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
    );

    // generate refresh token
    const refreshToken = jwt.sign(
        { userId },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
    );

    // save refresh token in database
    const user = await User.findById(userId);

    user.refreshToken = refreshToken;

    await user.save();

    // return both tokens
    return {
        accessToken,
        refreshToken,
    };
};

export default generateAndSaveTokens;