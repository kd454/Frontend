import React, { useEffect, useState } from "react";
import "./Filters.css";
import Range from "../Range/Range";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  setFilterData,
  setFilterObjectRedux,
} from "../../Redux/actions/teacherAction";

const Filters = ({ classVal, handleFilterBottom }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filterDataIn, setFilterDataIn] = useState([]);
  const [searchParams] = useSearchParams();
  const data = {
    location: searchParams.get("location"),
    subject: searchParams.get("subject"),
    classVal: searchParams.get("class"),
    mode: searchParams.get("mode"),
  };
  const stateData = useSelector((state) => state.teacherRedu);
  const [filterObject, setFilterObject] = useState({
    fees: [],
    experience: [],
    distance: [],
  });

  useEffect(() => {
    if (data.mode) {
      const text = data.mode.toLowerCase();
      const ele = document.getElementById(`${text}`);
      ele.checked = true;
    }
  }, []);

  useEffect(() => {
    dispatch(setFilterObjectRedux(filterObject));
  }, [filterObject.fees, filterObject.experience, filterObject.distance]);

  useEffect(() => {
    dispatch(setFilterData(filterDataIn));
  }, [filterDataIn.length]);

  const handleRadios = (e) => {
    navigate({
      pathname: "/search",
      search: `?location=${data?.location}&class=${data?.classVal}&subject=${data?.subject}&mode=${e.target.value}`,
    });
  };

  const handleRange = (type, min, max) => {
    setFilterObject({
      ...filterObject,
      [type]: [min, max],
    });
  };

  const handleCheckItems = (e, list) => {
    if (e.target.checked) {
      let data = stateData.allteachers.filter((item) => {
        if (list === "gender") {
          return item.gender === e.target.value;
        } else {
          return item.batchStrength === e.target.value;
        }
      });
      setFilterDataIn([...filterDataIn, ...data]);
    } else {
      let data = filterDataIn.filter((item) => {
        if (list === "gender") {
          return item.gender !== e.target.value;
        } else {
          return item.batchStrength !== e.target.value;
        }
      });
      setFilterDataIn(data);
    }
  };

  return (
    <>
      <div className={classVal ? "filter active" : "filter"}>
        <h3 className="heading">Filters</h3>
        <Range
          min={100}
          max={2000}
          title="Fees"
          label=""
          handleRange={(min, max) => handleRange("fees", min, max)}
        />
        <Range
          min={0}
          max={25}
          title="Distance"
          label="KM"
          handleRange={(min, max) => handleRange("distance", min, max)}
        />
        <Range
          min={0}
          max={30}
          title="Experience"
          label="years"
          handleRange={(min, max) => handleRange("experience", min, max)}
        />
        <div className="modes flex-grow-1 mb-3">
          <h6 className="title-mode">Batch Detail</h6>
          <div className="all-radios d-flex flex-row flex-wrap">
            <div className="form-check">
              <input
                className="form-check-input gender-check"
                type="checkbox"
                value="less than 10"
                id="less"
                name="less"
                onChange={(e) => handleCheckItems(e, "batch")}
              />
              <label className="form-check-label mr-5" htmlFor="less">
                less then 10
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input gender-check"
                type="checkbox"
                value="10 to 20"
                id="ten"
                name="10-20"
                onChange={(e) => handleCheckItems(e, "batch")}
              />
              <label className="form-check-label" htmlFor="ten">
                10 to 20
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input gender-check"
                type="checkbox"
                value="more than 30"
                id="more"
                name="more"
                onChange={(e) => handleCheckItems(e, "batch")}
              />
              <label className="form-check-label" htmlFor="more">
                More then 30
              </label>
            </div>
          </div>
        </div>
        <div className="row justify-content-start">
          <div className="modes flex-grow-1">
            <h6 className="title-mode">Modes</h6>
            <div className="all-radios d-flex flex-column ">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="mode"
                  id="offline"
                  value="Offline"
                  onChange={handleRadios}
                />
                <label className="form-check-label" htmlFor="offline">
                  Offline
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="mode"
                  id="hometutor"
                  value="Hometutor"
                  onChange={handleRadios}
                />
                <label className="form-check-label" htmlFor="hometutor">
                  Hometutor
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="mode"
                  id="online"
                  value="Online"
                  onChange={handleRadios}
                />
                <label className="form-check-label" htmlFor="online">
                  Online
                </label>
              </div>
            </div>
          </div>
          <div className="modes flex-grow-1">
            <h6 className="title-mode">Gender</h6>
            <div className="all-radios d-flex flex-column ">
              <div className="form-check">
                <input
                  className="form-check-input gender-check"
                  type="checkbox"
                  value="Male"
                  id="male"
                  name="male"
                  onChange={(e) => handleCheckItems(e, "gender")}
                />
                <label className="form-check-label" htmlFor="male">
                  Male
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input gender-check"
                  type="checkbox"
                  value="Female"
                  id="female"
                  name="female"
                  onChange={(e) => handleCheckItems(e, "gender")}
                />
                <label className="form-check-label" htmlFor="female">
                  Female
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input gender-check"
                  type="checkbox"
                  value="Both"
                  id="both"
                  name="both"
                  onChange={(e) => handleCheckItems(e, "gender")}
                />
                <label className="form-check-label" htmlFor="both">
                  Both
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Filters);
