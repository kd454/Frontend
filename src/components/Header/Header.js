import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import { Link as LinkRouter } from "react-router-dom";
import "./Header.css";
import { HiMenuAlt3 } from "react-icons/hi";
import { GrClose } from "react-icons/gr";
import Logo from "../../assets/images/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  getTeachersDetailById,
  setEmailState,
} from "../../Redux/actions/teacherAction";
import { setLogin } from "../../Redux/actions/loginAction";

const Header = ({ backColor, page }) => {
  const [active, setActive] = useState(false);
  const [login, setLoginInn] = useState(false);
  const teacherData = useSelector((state) => state.teacherRedu);
  const [accountName, setAccountName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobile, setMobile] = useState(false);

  // useEffect(() => {
  //   if (ocalStorage.getItem("tokenId")) {
  //     dispatch(getTeachersDetailById(localStorage.getItem("tokenId")));
  //   }
  // }, []);
  useEffect(() => {
    if (window.screen.width <= 1080) {
      setMobile(true);
      console.log(mobile);
    } else {
      console.log(mobile);
    }
  }, []);

  useEffect(() => {
    if (teacherData?.teacherDetails?.name) {
      setAccountName(teacherData?.teacherDetails?.name);
      localStorage.setItem(
        "batchDetail",
        JSON.stringify(teacherData?.teacherDetails?.batchDetails)
      );
    } else {
      setAccountName("");
    }
  }, [teacherData?.teacherDetails?.name]);

  useEffect(() => {
    if (page) {
      document.querySelector(".menu-btn").style.display = "none";
    }
    window.addEventListener("scroll", isSticky);
    if (JSON.parse(localStorage.getItem("tokenId"))) {
      setLoginInn(true);
    }
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  });

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("tokenId"))) {
      setLoginInn(true);
      dispatch(
        getTeachersDetailById(JSON.parse(localStorage.getItem("tokenId")))
      );
    } else {
      localStorage.setItem("batchDetail", JSON.stringify([]));
      setLoginInn(false);
    }
  }, [JSON.parse(localStorage.getItem("tokenId"))]);

  const isSticky = (e) => {
    const header = document.querySelector(".header");
    const scrollTop = window.scrollY;
    if (scrollTop > 10) {
      header.classList.add("active-color");
      header.style.backgroundColor =
        "linear-gradient(to bottom right, rgba(255,255,255,0.75), rgba(255,255,255,0.75)) !important";
      header.style.backdropFilter = "blur(7px)";
    } else {
      header.classList.remove("active-color");
      header.style.backgroundColor = backColor;
      header.style.backdropFilter = "none";
    }
  };

  const handleNav = () => {
    if (active) {
      document.querySelector(".list").style.height = "0px";
      setActive(false);
    } else {
      document.querySelector(".list").style.height = "280px";
      setActive(true);
    }
  };

  //handle profile
  const handleProfile = () => {
    dispatch(getTeachersDetailById(localStorage.getItem("tokenId")));
  };

  const handleLogout = () => {
    localStorage.setItem("tokenId", JSON.stringify(null));
    setLoginInn(false);
    dispatch(setLogin(null));
    navigate("/");
  };
  return (
    <header className={`header ${active ? "active" : ""}`}>
      <nav className="navigation d-flex align-items-center justify-content-between">
        <ul className="list d-flex align-items-center">
          {!page && (
            <>
              <li className="list-item">
                <LinkRouter
                  // activeClass="active"
                  to="/"
                  onClick={handleNav}
                  // spy={true}
                  // smooth={true}
                  // offset={0}
                  // duration={500}
                >
                  Home
                </LinkRouter>
              </li>
              <li className="list-item">
                <Link
                  to="about"
                  spy={true}
                  smooth={true}
                  offset={-90}
                  duration={500}
                  onClick={handleNav}
                >
                  About Us
                </Link>
              </li>
              <li className="list-item">
                <Link
                  to="impact"
                  spy={true}
                  smooth={true}
                  offset={-90}
                  duration={500}
                  onClick={handleNav}
                >
                  Impact
                </Link>
              </li>
              <li className="list-item">
                <Link
                  to="contact"
                  spy={true}
                  smooth={true}
                  offset={-90}
                  duration={500}
                  onClick={handleNav}
                >
                  Contact Us
                </Link>
              </li>
              {mobile && (
                <li className="list-item">
                  <RouterLink to="/teacher/register">
                    Register as teacher
                  </RouterLink>
                </li>
              )}
            </>
          )}
        </ul>
        <div className="logo d-flex align-items-center">
          <RouterLink to="/">
            <img src={Logo} alt="logo" />
          </RouterLink>
        </div>
        <div className="register-btn d-flex">
          {!page &&
            (!login ? (
              <div className="dropdown show ml-auto">
                <a
                  className="btn dropdown-toggle"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Teacher
                </a>

                <div
                  className="dropdown-menu text-left"
                  aria-labelledby="dropdownMenuLink"
                >
                  <RouterLink
                    to="/teacher/login"
                    className="dropdown-item"
                    onClick={() => {
                      dispatch(setEmailState({}));
                    }}
                  >
                    Login as teacher
                  </RouterLink>
                  <RouterLink
                    to="/teacher/register"
                    className="dropdown-item"
                    onClick={() => {
                      dispatch(setEmailState({}));
                    }}
                  >
                    Register as teacher
                  </RouterLink>
                </div>
              </div>
            ) : (
              <div className="dropdown show ml-auto">
                <a
                  className="btn  dropdown-toggle"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {accountName?.charAt(0).toUpperCase() +
                    accountName?.substring(1, accountName.length)}
                </a>

                <div
                  className="dropdown-menu text-left"
                  aria-labelledby="dropdownMenuLink"
                >
                  <RouterLink
                    to="/teacher/profile"
                    className="dropdown-item"
                    onClick={handleProfile}
                  >
                    Profile
                  </RouterLink>
                  <RouterLink
                    to="/teacher/login"
                    className="dropdown-item"
                    onClick={handleLogout}
                  >
                    Logout
                  </RouterLink>
                </div>
              </div>
            ))}
        </div>

        {active ? (
          <GrClose className="menu-btn" onClick={handleNav} />
        ) : (
          <HiMenuAlt3 className="menu-btn" onClick={handleNav} />
        )}
      </nav>
    </header>
  );
};

export default React.memo(Header);
