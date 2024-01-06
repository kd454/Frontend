import React, { useEffect, useState, useMemo } from "react";
import Card from "../../components/Card/Card";
import Filters from "../../components/Filters/Filters";
import Header from "../../components/Header/Header";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  getTeacherDetail,
  setAllTeacherDetail,
  setFilterData,
} from "../../Redux/actions/teacherAction";
import "./Search.css";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { MdSocialDistance } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsCurrencyRupee, BsSearch } from "react-icons/bs";
import { BiTimeFive, BiFilterAlt } from "react-icons/bi";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  cleanUp,
  sendTeachersDetails,
  setStudentDetail,
  studentAlreadyRegistered,
} from "../../Redux/actions/studentAction";
import Loading from "../../components/Loading/Loading";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeClassName, setActiveClassName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stateTeachers = useSelector((state) => state.teacherRedu);
  const [allTeachersData, setAllTeachers] = useState([]);
  const data = useMemo(() => {
    return {
      location: searchParams.get("location"),
      subject: searchParams.get("subject"),
      class: searchParams.get("class"),
      mode: searchParams.get("mode"),
    };
  });
  const [filterObject, setFilterObject] = useState({
    classVal: data?.classVal,
    subject: data?.subject,
  });
  useEffect(() => {
    dispatch(getTeacherDetail(data));
    setFilterObject({ classVal: data?.class, subject: data?.subject });
  }, [data?.mode, data?.class, data?.subject]);

  useEffect(() => {
    renderLoader();
    if (typeof stateTeachers.allteachers[0] === "string") {
      alert(
        `Currently we are not present in your city Kindly fill the student details, we’ll notify you once we are functional in your city`
      );
      setShowStudent(true);
      dispatch(setAllTeacherDetail());
    } else {
      setAllTeachers(stateTeachers.allteachers);
    }
  }, [stateTeachers?.allteachers]);

  const renderLoader = () => {
    if (stateTeachers.allteachers?.length >= 0) {
      setLoading(!loading);
    }
  };
  useEffect(() => {
    filterAllData(stateTeachers?.filterObject);
  }, [
    stateTeachers?.filterObject?.fees,
    stateTeachers?.filterObject?.distance,
    stateTeachers?.filterObject?.experience,
    stateTeachers?.filterObject?.gender,
    stateTeachers?.filterObject?.batch_detail,
    stateTeachers?.filterObject?.boards,
  ]);

  const studentState = useSelector((state) => state.studentRedu);

  useEffect(() => {
    let data = studentState.isStudentAlreadyRegister;
    if (data.result !== undefined) {
      if (!data.result) {
        handleShowStudent();
        handleCloseEmail();
      } else if (data.result && data.count < 3) {
        handleCloseStudent();
        handleCloseEmail();
        handleShowMessage(data.studentID);
      } else if (data.result && data.count === 3) {
        handleCloseEmail();
        toast.error(`You already get 3 teachers details`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
    return () => {
      dispatch(cleanUp());
    };
  }, [
    studentState?.isStudentAlreadyRegister?.result,
    studentState?.isStudentAlreadyRegister?.count,
  ]);

  useEffect(() => {
    if (studentState.studentDetail.result) {
      toast.success(`Details successfully send to your email`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      handleCloseStudent();
    }
  }, [studentState?.studentDetail?.result]);

  //handle filter bottom bar
  const handleFilterBottom = (text) => {
    const allEle = document.querySelectorAll(".inn-box");
    if (document.getElementById(text).classList.contains("active")) {
      document.getElementById(text).classList.remove("active");
      setActive(false);
      setActiveClassName("");
      document.body.style.overflowY = "scroll";
      document.querySelector(".search-inn").style.display = "flex !important";
    } else {
      for (let ele = 0; ele < allEle.length; ele++) {
        allEle[ele].classList.remove("active");
        document.body.style.overflowY = "scroll";
        document.querySelector(".search-inn").style.display = "flex !important";
      }
      setActive(true);
      setActiveClassName(text);
      document.body.style.overflowY = "hidden";
      document.getElementById(text).classList.add("active");
    }
  };

  // handle class subject input filter
  const handleClaasSubject = (e) => {
    const { name, value } = e.target;
    setFilterObject({ ...filterObject, [name]: value });
  };

  const handleSearch = (name) => {
    if (name === "class") {
      navigate({
        pathname: "/search",
        search: `?location=${data?.location}&class=${filterObject?.classVal}&subject=${data?.subject}&mode=${data?.mode}`,
      });
    } else {
      navigate({
        pathname: "/search",
        search: `?location=${data?.location}&class=${data?.class}&subject=${filterObject?.subject}&mode=${data?.mode}`,
      });
    }
  };

  // handling allfilter left part
  let finalFilterData = stateTeachers?.allteachers;

  const filterAllData = (obj) => {
    const { fees, distance, experience, gender, batch_detail, boards } = obj;

    // fees filter
    if (fees && Object.keys(fees).length !== 0) {
      finalFilterData = finalFilterData.filter((item) => {
        return item.fees >= fees[0] && item.fees <= fees[1];
      });
    }

    //experience filter
    if (experience && Object.keys(experience).length !== 0) {
      finalFilterData = finalFilterData.filter((item) => {
        return (
          item.experience >= experience[0] && item.experience <= experience[1]
        );
      });
    }

    //distance
    if (distance && distance.length !== 0) {
      finalFilterData = finalFilterData.filter((item) => {
        let val = parseInt(item.distance.toString().split(" ")[0]);
        return val >= distance[0] && val <= distance[1];
      });
    }

    //gender filter
    if (gender?.length !== 0) {
      let dataOne = [];
      for (let i = 0; i < gender?.length; i++) {
        const data = finalFilterData.filter((item) => {
          return item.gender === gender[i];
        });
        dataOne = [...dataOne, ...data];
      }
      finalFilterData = dataOne;
      dispatch(setFilterData([...dataOne]));
    }

    // batch size filter
    if (batch_detail?.length !== 0) {
      let dataOne = [];
      for (let i = 0; i < batch_detail?.length; i++) {
        const data = finalFilterData.filter((item) => {
          return item.batchStrength === batch_detail[i];
        });
        dataOne = [...dataOne, ...data];
      }
      finalFilterData = dataOne;
      dispatch(setFilterData([...dataOne]));
    }

    // board filter
    if (boards?.length !== 0) {
      // console.log("uncheck");
      let dataOne = [];
      for (let i = 0; i < boards?.length; i++) {
        // console.log(boards, i);
        const data = finalFilterData.filter((item) => {
          return item.board === boards[i];
        });
        dataOne = [...dataOne, ...data];
      }
      finalFilterData = dataOne;
      dispatch(setFilterData([...dataOne]));
    }

    if (finalFilterData.length === 0) {
      setAllTeachers(finalFilterData);
      dispatch(setFilterData(finalFilterData));
    } else {
      setAllTeachers(finalFilterData);
      dispatch(setFilterData(finalFilterData));
    }
  };

  //model handling
  const [studentData, setStudentData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    school: "",
    email: "",
    teacherId: 0,
    batchId: 0,
  });
  const [showEmail, setShowEmail] = useState(false);
  const [showStudent, setShowStudent] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleCloseEmail = () => setShowEmail(false);
  const handleShowEmail = (bacthId, teacherId) => {
    setStudentData({
      ...studentData,
      batchId: bacthId,
      teacherId: teacherId,
    });
    setShowEmail(true);
  };
  const handleCloseStudent = () => setShowStudent(false);
  const handleShowStudent = () => setShowStudent(true);
  const handleCloseMessage = () => setShowMessage(false);
  const handleShowMessage = () => {
    setShowMessage(true);
    setDataSendTeacher({
      ...dataSendTeacher,
      studentId: studentState.isStudentAlreadyRegister.studentId,
    });
  };
  const [email, setEmail] = useState("");
  const [dataSendTeacher, setDataSendTeacher] = useState({
    email: "",
    studentId: 0,
    teacherId: 0,
    batchId: 0,
  });

  const handleChangeOfEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleStudentEmail = () => {
    dispatch(studentAlreadyRegistered(email));
    setDataSendTeacher({
      ...dataSendTeacher,
      email: email,
      teacherId: studentData.teacherId,
      batchId: studentData.batchId,
    });
  };

  const handleStudentRegister = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handleStudentForm = () => {
    dispatch(setStudentDetail(studentData));
  };

  const handleMessage = () => {
    dispatch(sendTeachersDetails(dataSendTeacher));
    toast.success(`Details successfully send to your email`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    handleCloseMessage();
  };

  return (
    <>
      {!loading ? (
        <Loading />
      ) : (
        <>
          <ToastContainer />
          <Header backColor="#FFFFFF" page="search" />
          <section className="all-teachers">
            <div className="d-flex justify-content-between">
              <div className="left">
                <h3 className="heading">Search</h3>
                <div className="search-inn mb-3">
                  <div className="class">
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Class"
                      name="classVal"
                      id="classVal"
                      value={filterObject?.classVal}
                      onChange={handleClaasSubject}
                    />
                    <BsSearch
                      className="search-icon"
                      onClick={() => handleSearch("class")}
                    />
                  </div>
                  <div className="subject">
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Subject"
                      name="subject"
                      id="subject"
                      onInput={handleClaasSubject}
                      value={filterObject?.subject}
                    />
                    <BsSearch
                      className="search-icon"
                      onClick={() => handleSearch("subject")}
                    />
                  </div>
                </div>
                <Filters
                  classVal={active}
                  handleFilterBottom={handleFilterBottom}
                  activeClassName={activeClassName}
                />
              </div>
              <div className="right pl-5">
                {/* <p className="note-search">
              Note: You can get upto 3 teachers details
            </p> */}
                {typeof stateTeachers.allteachers[0] === "string"
                  ? "No data found"
                  : allTeachersData.map((item, index) => {
                      return (
                        <Card
                          key={index}
                          detail={item}
                          handleShow={handleShowEmail}
                        />
                      );
                    })}
              </div>
            </div>
            <div className="all-filters d-flex flex-row align-items-center justify-content-center">
              <Link
                className="home inn-box d-flex flex-column align-items-center justify-content-center"
                id="home"
                to="/"
              >
                <AiOutlineHome
                  className="dis-icon icon"
                  style={{ color: "#fff" }}
                />
                <span className="title">Home</span>
              </Link>
              <div
                className="distance inn-box d-flex flex-column align-items-center justify-content-center"
                id="distance"
                onClick={() => handleFilterBottom("distance")}
              >
                <MdSocialDistance className="dis-icon icon" />
                <span className="title">Distance</span>
              </div>
              <div
                className="fees inn-box d-flex flex-column align-items-center justify-content-center"
                id="fees"
                onClick={() => handleFilterBottom("fees")}
              >
                <BsCurrencyRupee className="fees-icon icon" />
                <span className="title">Fees</span>
              </div>
              <div
                className="time inn-box d-flex flex-column align-items-center justify-content-center"
                id="time"
                onClick={() => handleFilterBottom("time")}
              >
                <BiTimeFive className="time-icon icon" />
                <span className="title">Time</span>
              </div>
              <div className="filter-block inn-box d-flex flex-column align-items-center justify-content-center active-icon">
                <BiFilterAlt className="filter-icon icon" />
                <span className="title">Filters</span>
              </div>
            </div>
          </section>
          <Modal show={showEmail} onHide={handleCloseEmail}>
            <form
              className="email-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleStudentEmail();
              }}
            >
              <Modal.Header>
                <Modal.Title>Get Teacher Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="form-group">
                  <input
                    className="form-control mb-2"
                    type="email"
                    placeholder="Email Address"
                    autoFocus
                    required
                    onInput={handleChangeOfEmail}
                  />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="gray" onClick={handleCloseEmail}>
                  Close
                </Button>
                <input
                  type="submit"
                  className="btn"
                  value="Submit"
                  style={{ backgroundColor: "#FBD37A" }}
                />
              </Modal.Footer>
            </form>
          </Modal>

          <Modal show={showStudent} onHide={handleCloseStudent}>
            <form
              className="student-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleStudentForm();
              }}
            >
              <Modal.Header>
                <Modal.Title>Student Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="form-group">
                  <input
                    className="form-control mb-2"
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    required
                    onInput={handleStudentRegister}
                  />
                  <input
                    className="form-control mb-2"
                    type="text"
                    placeholder="Last Name"
                    required
                    name="lastName"
                    onInput={handleStudentRegister}
                  />
                  <input
                    className="form-control mb-2"
                    type="email"
                    placeholder="Email Address"
                    required
                    name="email"
                    onInput={handleStudentRegister}
                  />
                  <input
                    className="form-control mb-2"
                    type="text"
                    maxLength={10}
                    minLength={10}
                    placeholder="Contact"
                    required
                    name="phone"
                    pattern="[0-9]+"
                    onInput={handleStudentRegister}
                  />
                  <input
                    className="form-control mb-2"
                    type="text"
                    placeholder="City"
                    name="city"
                    required
                    onInput={handleStudentRegister}
                  />
                  <input
                    className="form-control mb-2"
                    type="text"
                    placeholder="School (Optional)"
                    name="school"
                    onInput={handleStudentRegister}
                  />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="gray" onClick={handleCloseStudent}>
                  Close
                </Button>
                <input
                  type="submit"
                  className="btn"
                  value="Submit"
                  style={{ backgroundColor: "#FBD37A" }}
                />
              </Modal.Footer>
            </form>
          </Modal>
          <Modal show={showMessage} onHide={handleCloseMessage}>
            <Modal.Header>
              <Modal.Title>Get Teacher Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Your email is already registered, press ok to get teacher details.
            </Modal.Body>
            <Modal.Footer>
              <Button vvariant="gray" onClick={handleCloseMessage}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={handleMessage}
                style={{ backgroundColor: "#FBD37A" }}
              >
                Ok
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
};

export default Search;
