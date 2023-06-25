import React, { useEffect, useState } from "react";
import "./Login.css";
import ImgRegister from "../../assets/images/registerImg.svg";
import Black from "../../assets/images/black.svg";
import Header from "../../components/Header/Header";
import PaperPattern from "../../assets/images/paper-plane 1.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, setLogin } from "../../Redux/actions/loginAction";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.loginRedu);
  const [watchPass, setWatchPass] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  const handleEye = (watch) => {
    const ele = document.getElementById("password");
    if (watch) {
      ele.type = "text";
    } else {
      ele.type = "password";
    }
  };

  useEffect(() => {
    if (loginState.loginDetail) {
      if (loginState.loginDetail == localStorage.getItem("tokenId")) {
        navigate("/");
      } else if (typeof loginState.loginDetail === "number") {
        localStorage.setItem("tokenId", JSON.stringify(loginState.loginDetail));

        toast.success("Login Successfully", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else if (
        loginState.loginDetail &&
        typeof loginState.loginDetail === "string"
      ) {
        toast.error("Email or Password is invalid", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        dispatch(setLogin());
      }
    }
  }, [loginState.loginDetail]);
  return (
    <>
      <Header backColor="#FFFFFF" />
      <ToastContainer />
      <section className="login-form">
        <div className="container-fluid">
          <div className="row justify-content-between align-items-center">
            <div className="col-12 col-md-12 col-lg-6 left">
              <div className="title">
                <img src={Black} alt="pattern" />
                <span className="content">
                  Sign<span className="color-text">In</span>
                </span>
              </div>
              <img src={ImgRegister} alt="" />
            </div>
            <img src={PaperPattern} alt="" className="paper-plane" />
            <div className="col-12 col-md-12 col-lg-6 right">
              <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    aria-describedby="emailHelp"
                    placeholder="Email Address"
                    value={formData.email}
                    onInput={handleInput}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    minLength="8"
                    maxLength="14"
                    value={formData.password}
                    aria-describedby="emailHelp"
                    placeholder="Password"
                    onInput={handleInput}
                  />
                  {!watchPass ? (
                    <AiOutlineEye
                      className="eye"
                      onClick={() => {
                        setWatchPass(true);
                        handleEye(true);
                      }}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="eye"
                      onClick={() => {
                        setWatchPass(false);
                        handleEye(false);
                      }}
                    />
                  )}
                </div>
                <div className="links w-100 text-right d-block">
                  <Link className="link_create" to="/teacher/register">
                    Create a new account ?
                  </Link>
                </div>
                <input type="submit" value="Login" className="btn" />
              </form>
              <div className="note">
                <span className="bold">Note</span> - In case you didn’t remember
                your Id or password kindly check your mail we have send via
                betterconnectt@gmail.com
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
