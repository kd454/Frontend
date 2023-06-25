import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { IoMdCall } from "react-icons/io";
import { FaFacebookF } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="content d-flex justify-content-between">
        <div className="left">
          <ul className="menus d-flex align-items-center">
            <li className="item">
              <Link to={"/"}>About Us</Link>
            </li>
            <li className="item">
              <Link to={"/"}>Teacher</Link>
            </li>
            <li className="item">
              <Link to={"/"}>Impact</Link>
            </li>
          </ul>
          <div className="links-icons d-flex">
            <Link
              to={"https://www.facebook.com/profile.php?id=100093515841293"}
            >
              <button className="btn">
                <FaFacebookF />
              </button>
            </Link>
            <Link to={"https://www.instagram.com/betterconnecttt/"}>
              <button className="btn">
                <AiFillInstagram />
              </button>
            </Link>
          </div>
        </div>
        <div className="right">
          <div className="contact-detail">
            <span className="email">
              <MdOutlineMail />
              info@betterconnect.in
            </span>
            <span className="mobile">
              <IoMdCall />
              9399576212
            </span>
          </div>
        </div>
      </div>
      <div className="bottom-bar d-flex justify-content-between">
        <div className="left">
          <span className="copy-right">
            Copyright @2023 BetterConnect All Rights Reserverd
          </span>
        </div>
        <div className="right">
          <span className="cookie">Cookie Preference</span>
          <span className="terms">Terms & Condition</span>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
