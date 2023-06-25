import React, { useEffect, useState } from "react";
import "./SearchInput.css";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { getTeacherDetail } from "../../Redux/actions/teacherAction";

const SearchInput = () => {
  const navigate = useNavigate();
  const stateData = useSelector((state) => state.teacherRedu);
  const [data, setData] = useState({
    location: "",
    subject: "",
    classVal: "",
    mode: "",
  });

  // useEffect(() => {
  //   stateData.
  //   if()
  // })

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.location && data.mode) {
      navigate({
        pathname: "/search",
        search: `?location=${data.location}&class=${data.classVal}&subject=${data.subject}&mode=${data.mode}`,
      });
    } else if (!data.mode) {
      toast.error("Select mode for better result", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      // dispatch(getTeacherDetail());
      toast.error(
        "To get the proper result kindly mention the City name at the end of the address",
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
  };
  return (
    <>
      <ToastContainer />
      <form
        className="input-group search d-flex align-items-center"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="form-control"
          aria-label="Text input with dropdown button"
          placeholder="Location"
          name="location"
          autoComplete="off"
          value={data.location}
          onInput={handleInput}
          onBlur={() => {
            alert(
              "To get the proper search result kindly mention the CITY name at the end of the address"
            );
          }}
        />
        <input
          type="text"
          className="form-control"
          aria-label="Text input with dropdown button"
          placeholder="Subject"
          name="subject"
          autoComplete="off"
          value={data.subject}
          onInput={handleInput}
        />
        <input
          type="text"
          className="form-control"
          aria-label="Text input with dropdown button"
          placeholder="Class"
          name="classVal"
          autoComplete="off"
          value={data.classVal}
          onInput={handleInput}
        />
        <select
          className="custom-select"
          id="inputGroupSelect01"
          name="mode"
          required
          onChange={handleInput}
        >
          <option selected>Mode</option>
          <option value="Offline">Offline</option>
          <option value="Hometutor">Hometutor</option>
          <option value="Online">Online</option>
        </select>
        <input type="submit" value="" style={{ display: "none" }} />
        <FiSearch
          type="submit"
          className="search-icon"
          onClick={handleSubmit}
        />
      </form>
    </>
  );
};

export default React.memo(SearchInput);
