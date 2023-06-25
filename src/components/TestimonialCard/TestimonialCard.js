import React, { useState } from "react";
import "./TestimonialCard.css";
import TestImg from "../../assets/images/testi-1.jpg";

const TestimonialCard = ({ withoutImg, content, head }) => {
  return (
    <div className="card">
      {!withoutImg && <img src={TestImg} alt="" />}
      <h5 className="name">{head}</h5>
      {content.length <= 150 ? (
        <p className="description">{content}</p>
      ) : (
        <ReadMore>{content}</ReadMore>
      )}
      <div className="round"></div>
    </div>
  );
};

export default TestimonialCard;

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="description">
      {isReadMore ? text?.slice(0, 155) : text}
      <span
        onClick={toggleReadMore}
        className="read-or-hide"
        style={{ color: "black", cursor: "pointer" }}
      >
        {isReadMore ? "...read more" : " show less"}
      </span>
    </p>
  );
};
