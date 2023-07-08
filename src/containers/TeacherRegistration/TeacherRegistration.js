import React, { useEffect, useState } from "react";
import "./TeacherRegistration.css";
import ImgRegister from "../../assets/images/registerImg.svg";
import Black from "../../assets/images/black.svg";
import Header from "../../components/Header/Header";
import PaperPattern from "../../assets/images/paper-plane 1.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  isEmailorPhoneAlreadyexist,
  setTeacherRegistration,
} from "../../Redux/actions/teacherAction";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const TeacherRegistration = () => {
  const stateData = useSelector((state) => state.teacherRedu);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [watchPass, setWatchPass] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    gender: "",
    address: "",
    city: "",
    pincode: 0,
    phone: "",
    qualification: "",
    experience: 0,
    currentlyAssociated: "",
    schoolName: "",
    instituteName: "",
    document: "",
    image: "",
    bio: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const result = stateData?.isValidOrNot?.result;
    if (result !== undefined) {
      if (result) {
        toast.error(
          `${stateData?.isValidOrNot?.message}, Kindly go to login page`,
          {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      } else {
        if (
          formData?.email &&
          formData?.password &&
          formData?.address &&
          formData?.name &&
          formData?.city &&
          formData?.phone &&
          formData?.pincode &&
          formData?.gender &&
          formData?.experience &&
          formData?.bio &&
          formData?.qualification
        ) {
          dispatch(setTeacherRegistration(formData));
          navigate("/teacher/batchdetail");
        }
      }
    }
  }, [stateData.isValidOrNot.message]);
  const handleInput = async (e, file) => {
    if (file) {
      if (e.target.name === "image") {
        window.document.getElementById("picture").textContent =
          e.target.files[0].name;
      } else {
        window.document.getElementById("document-file").textContent =
          e.target.files[0].name;
      }
      convertByteArray(e.target.files[0], e.target.name);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  async function convertByteArray(file, name) {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        storeDocument(base64String.split(",")[1].toString(), name);
      };
      reader.readAsDataURL(file);
    }
  }

  const storeDocument = (documentData, name) => {
    setFormData({ ...formData, [name]: documentData });
  };
  const handleRadios = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    let ele = window.document.querySelector(".school-active");
    let ele1 = window.document.querySelector(".institute-active");
    switch (e.target.value) {
      case "none":
        ele.style.display = "none";
        ele1.style.display = "none";
        break;
      case "Both":
        ele.style.display = "block";
        ele.placeholder = "School (optional)";
        ele1.style.display = "block";
        ele1.placeholder = "Institute (optional)";
        break;
      case "School":
        ele.placeholder = "School (optional)";
        ele.style.display = "block";
        ele1.style.display = "none";
        break;
      case "Institute":
        ele1.placeholder = "Institute (optional)";
        ele1.style.display = "block";
        ele.style.display = "none";

        break;
      default:
        console.log("error");
    }
  };

  const handleEye = (watch) => {
    const ele = document.getElementById("password");
    if (watch) {
      ele.type = "text";
    } else {
      ele.type = "password";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (stateData.isValidOrNot.result) {
      toast.error(
        `${stateData.isValidOrNot.message}, Kindly go to login page`,
        {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }
    const { email, phone } = formData;
    dispatch(isEmailorPhoneAlreadyexist({ email, phone }));
  };

  return (
    <>
      <Header backColor="#FFFFFF" />
      <ToastContainer />
      <section className="register-form">
        <div className="container-fluid">
          <div className="row justify-content-between">
            <div className="col-12 col-md-12 col-lg-6 left">
              <div className="title">
                <img src={Black} alt="pattern" />
                <span className="content">
                  Register as<span className="color-text">Teacher</span> or
                </span>
                <span className="color-text">Institute</span>
              </div>
              <img src={ImgRegister} alt="" />
            </div>
            <img src={PaperPattern} alt="" className="paper-plane" />
            <div className="col-12 col-md-12 col-lg-6 right">
              <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    aria-describedby="emailHelp"
                    placeholder="Full Name"
                    autoComplete="off"
                    onInput={handleInput}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    aria-describedby="emailHelp"
                    placeholder="Address"
                    autoComplete="off"
                    onInput={handleInput}
                    required
                  />
                </div>
                <div className="row justify-content-between align-items-center">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      City
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      name="city"
                      aria-describedby="emailHelp"
                      placeholder="City"
                      autoComplete="off"
                      onInput={handleInput}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Pincode
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="pincode"
                      name="pincode"
                      maxLength="6"
                      autoComplete="off"
                      aria-describedby="emailHelp"
                      placeholder="Pincode"
                      pattern="[0-9]+"
                      onInput={handleInput}
                      required
                    />
                  </div>
                </div>
                <div className="row justify-content-between align-items-center">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      aria-describedby="emailHelp"
                      placeholder="Email"
                      autoComplete="off"
                      onInput={handleInput}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      minLength="8"
                      maxLength="14"
                      aria-describedby="emailHelp"
                      placeholder="Password"
                      autoComplete="off"
                      onInput={handleInput}
                      required
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
                </div>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Bio
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="bio"
                    name="bio"
                    aria-describedby="emailHelp"
                    placeholder="Here you can mention your teaching pattern / achievement / catchy phrase"
                    autoComplete="off"
                    maxLength="107"
                    onInput={handleInput}
                    required
                  />
                </div>
                <div className="row justify-content-between align-items-center">
                  <div className="form-group">
                    <label htmlFor="qualification" className="form-label">
                      Qualification
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="qualification"
                      autoComplete="off"
                      aria-describedby="emailHelp"
                      placeholder="Ex. BCom, Mcom"
                      onInput={handleInput}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Mobile No.
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="mobile"
                      name="phone"
                      maxLength="10"
                      minLength="10"
                      autoComplete="off"
                      pattern="[0-9]+"
                      aria-describedby="emailHelp"
                      placeholder="Mobile No."
                      onInput={handleInput}
                      required
                    />
                  </div>
                </div>
                <div className="row justify-content-between align-items-center">
                  <div className="form-group">
                    <label className="form-label">
                      Qualification Document (optional)
                    </label>
                    <input
                      type="file"
                      className="form-control-file"
                      name="document"
                      id="document"
                      onChange={(e) => handleInput(e, "file")}
                    />
                    <label
                      className="form-control file-input d-flex align-items-center justify-content-between"
                      htmlFor="profile m-0"
                    >
                      <label
                        className="inner-place p-0 m-0 file-type-lable"
                        id="document-file"
                        htmlFor=""
                      >
                        Upload Document
                      </label>
                      <label className="btn m-0" htmlFor="document">
                        Browse
                      </label>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Gender</label>
                    <select
                      className="custom-select"
                      id="inputGroupSelect01"
                      name="gender"
                      value={formData.gender}
                      onChange={(e) => handleInput(e)}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Both">Both</option>
                    </select>
                  </div>
                </div>
                <div className="row justify-content-between align-items-center">
                  <div className="form-group col-12">
                    <label htmlFor="name" className="form-label">
                      Teaching Experience
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="experience"
                      name="experience"
                      maxLength="2"
                      required
                      aria-describedby="emailHelp"
                      autoComplete="off"
                      pattern="[0-9]+"
                      placeholder="Teaching Experience"
                      onInput={handleInput}
                    />
                  </div>
                  <div className="form-group col-12">
                    <label className="form-label d-flex align-items-center">
                      Profile Picture (optional)
                    </label>
                    <input
                      type="file"
                      className="form-control-file file-type-lable"
                      name="image"
                      id="profile"
                      onChange={(e) => handleInput(e, "file")}
                    />
                    <label
                      className="form-control m-0 file-input d-flex align-items-center justify-content-between"
                      htmlFor="profile"
                    >
                      <label
                        className="inner-place p-0 m-0"
                        htmlFor="profile"
                        id="picture"
                      >
                        Profile Picture
                      </label>
                      <label className="btn m-0" htmlFor="profile">
                        Browse
                      </label>
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Currently Associate with (optional)
                  </label>
                  <div className="row align-items-center">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="currentlyAssociated"
                        id="inlineRadio1"
                        value="School"
                        onChange={handleRadios}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio1"
                      >
                        School
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="currentlyAssociated"
                        id="inlineRadio2"
                        value="Institute"
                        onChange={handleRadios}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio2"
                      >
                        Institute
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="currentlyAssociated"
                        id="inlineRadio3"
                        value="Both"
                        onChange={handleRadios}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio3"
                      >
                        Both
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="currentlyAssociated"
                        id="inlineRadio4"
                        value="none"
                        onChange={handleRadios}
                        // onChange={handleRadios}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio4"
                      >
                        None
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control school-active"
                    id="school"
                    name="schoolName"
                    aria-describedby="emailHelp"
                    placeholder=""
                    autoComplete="off"
                    onInput={handleInput}
                    style={{ display: "none" }}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control institute-active"
                    id="institute"
                    name="instituteName"
                    autoComplete="off"
                    aria-describedby="emailHelp"
                    placeholder=""
                    onInput={handleInput}
                    style={{ display: "none" }}
                  />
                </div>
                <input type="submit" value="Next" className="btn submit" />
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default React.memo(TeacherRegistration);
