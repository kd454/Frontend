import React from "react";
import ProfileImg from "../../assets/images/avtar.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Card.css";

const Card = ({ detail, handleShow }) => {
  const {
    name,
    distance,
    time,
    fees,
    image,
    scholarship,
    batchStrength,
    experience,
    batchId,
    teacherId,
    bio,
  } = detail;

  return (
    <>
      <ToastContainer />
      <div className="card-profile">
        <div className="d-flex inner">
          <div className="img-part">
            <img
              src={image ? `data:image/jpeg;base64,${image}` : ProfileImg}
              height={67}
              width={67}
              alt=""
            />
            <button
              className="btn contact-btn"
              // data-toggle="modal"
              // data-target="#exampleModalCenter"
              onClick={() => handleShow(batchId, teacherId)}
            >
              Get Contact
            </button>
          </div>
          <div className="content d-flex align-items-start flex-column">
            <h6 className="name">
              {name.replace(
                name.substring(0, 1),
                name.substring(0, 1).toUpperCase()
              )}
            </h6>
            <p className="sub-title mt-2">{bio}</p>
            <div className="other-detail d-flex align-items-center justify-content-between mt-auto">
              <div className="data">
                <h5 className="data-about">Distance</h5>
                <p className="value">{distance}</p>
              </div>
              <div className="data">
                <h5 className="data-about">Fees</h5>
                <p className="value">{fees}</p>
              </div>
              <div className="data">
                <h5 className="data-about">Scholarship</h5>
                <p className="value">{scholarship}</p>
              </div>
              <div className="data">
                <h5 className="data-about">Batch Size</h5>
                <p className="value">{batchStrength}</p>
              </div>
              <div className="data">
                <h5 className="data-about">Time</h5>
                <p className="value">{time}</p>
              </div>
              <div className="data">
                <h5 className="data-about">Experience</h5>
                <p className="value">{experience}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
