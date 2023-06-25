import React from "react";
import "./OfferCard.css";

const OfferCard = ({ title, content }) => {
  return (
    <div className="offer-card card">
      <h4 className="title">{title}</h4>
      <p className="content">{content}</p>
      <div className="shape"></div>
    </div>
  );
};

export default React.memo(OfferCard);
