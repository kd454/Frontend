import React, { useEffect, useState } from "react";
import "./Tabs.css";
import $ from "jquery";
import BatchDetail from "../../containers/BatchDetail/BatchDetail";
import { useDispatch, useSelector } from "react-redux";
import { studentHistory } from "../../Redux/actions/studentAction";

const Tabs = () => {
  const studentData = useSelector((state) => state.studentRedu);
  const teacherData = useSelector((state) => state.teacherRedu);
  const dispatch = useDispatch();
  const [studentHistoryDetails, setStudentDetails] = useState([]);
  useEffect(() => {
    setStudentDetails(studentData.studentHistoryData);
  }, [studentData.studentHistoryData]);
  $(function () {
    var $tabButtonItem = $("#tab-button li"),
      $tabSelect = $("#tab-select"),
      $tabContents = $(".tab-contents"),
      activeClass = "is-active";

    $tabButtonItem.first().addClass(activeClass);
    $tabContents.not(":first").hide();

    $tabButtonItem.find("a").on("click", function (e) {
      var target = $(this).attr("href");

      $tabButtonItem.removeClass(activeClass);
      $(this).parent().addClass(activeClass);
      $tabSelect.val(target);
      $tabContents.hide();
      $(target).show();
      e.preventDefault();
    });

    $tabSelect.on("change", function () {
      var target = $(this).val(),
        targetSelectNum = $(this).prop("selectedIndex");

      $tabButtonItem.removeClass(activeClass);
      $tabButtonItem.eq(targetSelectNum).addClass(activeClass);
      $tabContents.hide();
      $(target).show();
    });
  });

  return (
    <div className="tabs">
      <div className="tab-button-outer">
        <ul id="tab-button">
          <li>
            <a href="#tab01">Batch Details</a>
          </li>
          {/* <li>
            <a href="#tab02">Student History</a>
          </li> */}
        </ul>
      </div>
      <div className="tab-select-outer">
        <select id="tab-select">
          <option value="#tab01">Batch Details</option>
          {/* <option value="#tab02">Student History</option> */}
        </select>
      </div>

      <div id="tab01" className="tab-contents">
        <BatchDetail />
      </div>
      {/* <div id="tab02" className="tab-contents">
        {studentHistoryDetails.length ? (
          <table className="table mt-4">
            <thead className="thead-light border-0">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Class</th>
                <th scope="col">Subject</th>
                <th scope="col">Address</th>
                <th scope="col">City</th>
                <th scope="col">Contact No.</th>
                <th scope="col">Email Id</th>
              </tr>
            </thead>
            <tbody>
              {studentHistoryDetails?.map((item) => {
                return (
                  <tr>
                    <td data-label="Name">
                      {item?.firstName + " " + item?.lastName}
                    </td>
                    <td data-label="Class">{item?.class}</td>
                    <td data-label="Subject">{item?.subject}</td>
                    <td data-label="Address">{item?.address}</td>
                    <td data-label="City">{item?.city}</td>
                    <td data-label="Phone">{item?.phone}</td>
                    <td data-label="Email">{item?.email}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <EmptyCompo />
        )}
      </div> */}
    </div>
  );
};

export default React.memo(Tabs);

const EmptyCompo = () => {
  return (
    <>
      <p className="text-center mt-3">Data not found</p>
    </>
  );
};
