import React from "react";
import { RotateLoader } from "react-spinners";
import "./loading.css";

const Loading = () => {
  return (
    <div className="loader">
      <RotateLoader color="#36d7b7" />
    </div>
  );
};

export default Loading;
