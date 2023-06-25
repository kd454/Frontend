import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("tokenId"));
    if (!id) {
      navigate("/teacher/login");
    }
  });
  return <>{children}</>;
};

export default PrivateRoute;
