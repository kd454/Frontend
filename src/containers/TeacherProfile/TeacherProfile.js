import React, { useEffect, useMemo, useState } from "react";
import "./TeacherProfile.css";
import ImgRegister from "../../assets/images/registerImg.svg";
import Black from "../../assets/images/black.svg";
import Header from "../../components/Header/Header";
import PaperPattern from "../../assets/images/paper-plane 1.svg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getTeachersDetailById,
  setTeacherRegistration,
} from "../../Redux/actions/teacherAction";
import Tabs from "../../components/Tabs/Tabs";
import { studentHistory } from "../../Redux/actions/studentAction";

const TeacherProfile = () => {
  const stateData = useSelector((state) => state.teacherRedu);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
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
    if (localStorage.getItem("tokenId")) {
      dispatch(getTeachersDetailById(localStorage.getItem("tokenId")));
    }
  }, []);

  useMemo(() => {
    dispatch(setTeacherRegistration(formData));
  }, [formData]);

  useEffect(() => {
    setFormData(stateData?.teacherDetails);

    if (stateData?.teacherDetails?.teacherId) {
      setFormData(stateData?.teacherDetails);
      dispatch(studentHistory(stateData?.teacherDetails?.teacherId));
    }
    if (stateData?.teacherDetails?.batchDetails) {
      localStorage.setItem(
        "batchDetail",
        JSON.stringify(stateData.teacherDetails.batchDetails)
      );
      //radios
      const eles = document.querySelectorAll(".associate");
      let eleSchool = window.document.querySelector(".school-active");
      let eleInsti = window.document.querySelector(".institute-active");
      if (stateData?.teacherDetails?.currentlyAssociated === "Both") {
        eles[2].checked = true;
        eleSchool.style.display = "block";
        eleInsti.style.display = "block";
        eleSchool.value = stateData.teacherDetails.schoolName;
        eleInsti.value = stateData.teacherDetails.instituteName;
      } else if (stateData?.teacherDetails?.currentlyAssociated === "School") {
        eles[0].checked = true;
        eleSchool.style.display = "block";
        eleInsti.style.display = "none";
        eleSchool.value = stateData.teacherDetails.schoolName;
      } else if (
        stateData?.teacherDetails?.currentlyAssociated === "Institute"
      ) {
        eles[1].checked = true;
        eleSchool.style.display = "none";
        eleInsti.style.display = "block";
        eleInsti.value = stateData.teacherDetails.instituteName;
      } else {
        eles[3].checked = true;
        eleSchool.style.display = "none";
        eleInsti.style.display = "none";
      }
    }
  }, [stateData.teacherDetails]);

  const handleInput = async (e, file) => {
    if (file) {
      if (e.target.name === "image") {
        window.document.getElementById("picture").textContent =
          e.target.files[0].name;
      } else {
        window.document.getElementById("document-file").textContent =
          e.target.files[0].name;
      }
      const base64 = await getBase64(e.target.files[0], e.target.name);
      // dispatch(setTeacherRegistration(formData));
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      // dispatch(setTeacherRegistration(formData));
    }
  };

  async function getBase64(file, name) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      const base64String = reader.result.split(",")[1];
      setFormData({ ...formData, [name]: base64String });
    };
  }

  const handleRadios = (e) => {
    console.log(stateData.teacherDetails);
    setFormData({ ...formData, [e.target.name]: e.target.value });
    let ele = window.document.querySelector(".school-active");
    let ele1 = window.document.querySelector(".institute-active");
    switch (e.target.value) {
      case "None":
        ele.style.display = "none";
        ele1.style.display = "none";
        ele.textContent = "";
        ele1.textContent = "";
        break;
      case "Both":
        ele.style.display = "block";
        ele.placeholder = "School";
        ele1.style.display = "block";
        ele1.placeholder = "Institute";
        break;
      case "School":
        ele.placeholder = "School";
        ele.style.display = "block";
        ele1.style.display = "none";
        ele1.textContent = "";
        break;
      case "Institute":
        ele1.placeholder = "Institute";
        ele1.style.display = "block";
        ele.style.display = "none";
        ele.textContent = "";

        break;
      default:
        console.log("error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
                  Teacher<span className="color-text">Profile</span>
                </span>
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
                    value={formData.name}
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
                    value={formData.address}
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
                      value={formData.city}
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
                      value={formData.pincode}
                      onInput={handleInput}
                      required
                    />
                  </div>
                </div>
                {/* <div className="row justify-content-between align-items-center">
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
                      value={formData.email}
                      onInput={handleInput}
                      required
                      style={{ pointerEven: "none" }}
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
                  </div>
                </div> */}
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
                    placeholder="Bio"
                    autoComplete="off"
                    value={formData.bio}
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
                      value={formData.qualification}
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
                      autoComplete="off"
                      aria-describedby="emailHelp"
                      placeholder="Mobile No."
                      value={formData.phone}
                      onInput={handleInput}
                      required
                      disabled
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
                    >
                      <option>Select</option>
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
                      placeholder="Teaching Experience"
                      value={formData.experience}
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
                        className="form-check-input associate"
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
                        className="form-check-input associate"
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
                        Institue
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input associate"
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
                        className="form-check-input associate"
                        type="radio"
                        name="currentlyAssociated"
                        id="inlineRadio4"
                        value="None"
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
                    value={formData.schoolName}
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
                    value={formData.instituteName}
                    onInput={handleInput}
                    style={{ display: "none" }}
                  />
                </div>
                {/* <input type="submit" value="Next" className="btn submit" /> */}
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="tabs-section">
        <Tabs />
      </section>
    </>
  );
};

export default React.memo(TeacherProfile);
