import React, { useEffect } from "react";
import "./PageNotFound.css";
import Header from "../../components/Header/Header";
import PageNotFoundIMG from "../../assets/images/404_page.png";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header />
      <div className="pageNotFound d-flex align-items-center justigy-content-center">
        <div className="row">
          <div className="col-12 col-md-4 col-lg-4 left">
            <h3 className="left-title">404</h3>
            <h5 className="sub-title">Ooops!</h5>
            <h5 className="sub-title">Page Not Found</h5>
            <p className="content">
              This page doesn’t exists or was removed! We suggest you back to
              home
            </p>
            <Link to="/" className="btn home-btn">
              Back to Home
            </Link>
          </div>
          <div className="col-12 col-md-8 col-lg-8 right">
            <img src={PageNotFoundIMG} alt="PageNotFoundIMG" />
          </div>
        </div>
        <div className="asset-design"></div>
      </div>
    </>
  );
};

export default PageNotFound;
