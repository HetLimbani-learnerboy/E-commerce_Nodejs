import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Privatecomponent = () => {
    const auth = localStorage.getItem("users");
    return auth ? <Outlet /> : <Navigate to="/signup" />;
};

export default Privatecomponent;
