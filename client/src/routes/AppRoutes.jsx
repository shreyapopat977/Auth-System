import Login from "../pages/login";
import Signup from "../pages/signup";
import { Routes, Route } from "react-router-dom";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    )
};

export default AppRoutes;