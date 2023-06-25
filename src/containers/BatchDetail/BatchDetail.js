import React, { useEffect, useState } from "react";
import "./BatchDetail.css";
import Black from "../../assets/images/black.svg";
import EditComponent from "../../components/editComponent/EditComponent";
import Header from "../../components/Header/Header";
import {
  regitrationWithBatchDetail,
  setLocalBatch,
  updateTeacherDetails,
} from "../../Redux/actions/teacherAction";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const BatchDetail = ({ formData }) => {
  const teacherData = useSelector((state) => state.teacherRedu);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [batch, setBatch] = useState([]);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("batchDetail"))) {
      const ele = document.querySelector(".add-row");
      ele.dispatchEvent(new Event("click"));
    }
    dispatch(setLocalBatch(innerData));
  }, []);
  let initialObject = {
    class: "",
    subject: "",
    board: "",
    mode: "",
    fees: 0,
    time: "",
    batchStrength: "",
    scholarship: "0",
  };
  const [innerData, setInnerData] = useState({
    class: "",
    subject: "",
    board: "",
    mode: "",
    fees: 0,
    time: "",
    batchStrength: "",
    scholarship: "0",
  });
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("batchDetail")).length) {
      localStorage.setItem("batchDetail", JSON.stringify([initialObject]));
    }
    dispatch(setLocalBatch([innerData]));
  }, []);

  const addTableRows = (e) => {
    e.preventDefault();
    let arr = JSON.parse(localStorage.getItem("batchDetail"));
    if (arr) {
      if (teacherData.teacherDetails) {
        initialObject = {
          ...initialObject,
          ["teacherId"]: arr[arr.length - 1].teacherId,
          // ["batchId"]: arr[arr.length - 1].batchId + 1,
        };
      }
    } else {
      arr = [];
    }
    const data = arr.find((item) => {
      if (
        !item.class ||
        !item.subject ||
        !item.fees ||
        !item.board ||
        !item.scholarship ||
        !item.mode ||
        !item.batchStrength
      ) {
        return "no data";
      }
    });
    if (!data) {
      arr.push(initialObject);
      localStorage.setItem("batchDetail", JSON.stringify(arr));
      dispatch(setLocalBatch(arr));
    } else {
      toast.error(`Fill all the details first`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return 0;
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    let mainData = {};
    const data = JSON.parse(localStorage.getItem("batchDetail")).find(
      (item) => {
        if (
          !item.class ||
          !item.subject ||
          !item.fees ||
          !item.board ||
          !item.scholarship ||
          !item.mode ||
          !item.batchStrength
        ) {
          return "no data";
        }
      }
    );
    if (!data) {
      if (teacherData?.teacherDetails?.batchDetails) {
        mainData = {
          ...teacherData.teacher,
          batchDetails: JSON.parse(localStorage.getItem("batchDetail")),
        };
        dispatch(updateTeacherDetails(mainData));
      } else {
        mainData = {
          ...teacherData.teacher,
          batchDetails: JSON.parse(localStorage.getItem("batchDetail")),
        };
        dispatch(regitrationWithBatchDetail(mainData));
      }

      if (!teacherData?.teacherDetails?.batchDetails) {
        toast.success(`Registration Done Successfully`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        localStorage.setItem("batchDetail", JSON.stringify([]));
        setTimeout(() => {
          navigate("/teacher/login");
        }, 2000);
      } else {
        toast.success(`Details Update Successfully`, {
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
      }
    } else {
      toast.error(`Fill all details first`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return 0;
    }
  };
  return (
    <>
      <Header />
      <ToastContainer />
      <section className="batch-detail">
        <div className="title">
          <img src={Black} alt="pattern" />
          <span className="content">
            Batch<span className="color-text">Details</span>
          </span>
        </div>
        <form className="table-content">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Class/Course</th>
                <th scope="col">Subject</th>
                <th scope="col">Board</th>
                <th scope="col">Fees</th>
                <th scope="col">Scholership</th>
                <th scope="col">Time</th>
                <th scope="col">Batch Strength</th>
                <th scope="col">Mode</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {JSON.parse(localStorage.getItem("batchDetail")) &&
                JSON.parse(localStorage.getItem("batchDetail")).map(
                  (item, index) => {
                    return (
                      <EditComponent
                        data={item}
                        id={index}
                        batch={batch}
                        innerData={innerData}
                        initialObject={initialObject}
                        setInnerData={setInnerData}
                      />
                    );
                  }
                )}
              <tr>
                <td colSpan={9}>
                  <div className="add-submit d-flex align-items-center justify-content-between mb-2">
                    <input
                      type="submit"
                      className="btn add-row"
                      onClick={addTableRows}
                      value="Add batch"
                    />
                    <input
                      type="submit"
                      className="btn"
                      onClick={handleSubmitForm}
                      value="Submit"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </section>
    </>
  );
};

export default BatchDetail;
