import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <>
      <h1>Are sure ? Do you want to logout. </h1>
      <button
        onClick={handleLogout}
        style={{
          padding: "5px 20px",
          color: "white",
          backgroundColor: "#2a2438",
          outline: "none",
          border: "none",
          fontWeight: "600",
        }}>
        Logout
      </button>
    </>
  );
};

export default Logout;
