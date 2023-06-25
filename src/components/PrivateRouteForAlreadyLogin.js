import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRouteForAlreadyLogin = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("tokenId"));
    if (id) {
      navigate("/");
    }
  });
  return <>{children}</>;
};

export default PrivateRouteForAlreadyLogin;
