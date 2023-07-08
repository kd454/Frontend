import React, { useEffect, useState } from "react";
import "./EditComponent.css";
import { MdOutlineDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setLocalBatch } from "../../Redux/actions/teacherAction";
import { MultiSelect } from "primereact/multiselect";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

const EditComponent = ({ data, id, setInnerData, initialObject }) => {
  // const [active, setActive] = useState();

  const boards = [
    { name: "CBSE", code: "cs" },
    { name: "ICSE", code: "is" },
    { name: "IGCSE", code: "ics" },
  ];
  const modes = [
    { name: "Offline", code: "ofln" },
    { name: "Hometutor", code: "hmttr" },
    { name: "Online", code: "onlin" },
  ];

  const [selectedBoard, setSelectedBoard] = useState([]);
  const [selectedModes, setSelectedModes] = useState([]);

  useEffect(() => {
    handleMultiSelect("board");
  }, [selectedBoard.length]);

  useEffect(() => {
    handleMultiSelect("mode");
  }, [selectedModes.length]);

  const [inner, setInner] = useState();

  useEffect(() => {
    setInner(data);
    if (data.board) {
      // console.log("hello");
      let dataOut = [];
      data.board.split(",").map((item1, index) => {
        boards.map((item) => {
          if (item.name === item1) {
            dataOut.push(item);
          }
        });
      });
      setSelectedBoard(dataOut);
    }
    if (data.mode) {
      // console.log("gello");
      let dataOut = [];
      data.mode.split(",").map((item1, index) => {
        modes.map((item) => {
          if (item.name === item1) {
            dataOut.push(item);
          }
        });
      });
      // console.log(dataOut);
      setSelectedModes(dataOut);
    }
  }, [data]);
  const dispatch = useDispatch();

  const optionsForBatch = [
    {
      id: 1,
      value: "less than 10",
      minMax: [0, 10],
    },
    {
      id: 2,
      value: "10 to 20",
      minMax: [10, 20],
    },
    {
      id: 3,
      value: "more than 30",
      minMax: [30, 500],
    },
  ];

  const handleMultiSelect = (val) => {
    let stringVal = "";
    if (val === "board") {
      selectedBoard.map((item, index) => {
        stringVal += item.name + ",";
      });
    } else {
      selectedModes.map((item, index) => {
        stringVal += item.name + ",";
      });
    }

    let finalStr = stringVal.substring(0, stringVal.length - 1);

    setInner({ ...inner, [val]: finalStr });
    setInnerData(inner);
    if (localStorage.getItem("batchDetail") !== null) {
      let arr = JSON.parse(localStorage.getItem("batchDetail"));
      let updateObj = arr.find((item, index) => {
        return index === id;
      });
      let obj = updateObj;
      obj[val] = finalStr;
      arr[id] = obj;
      localStorage.setItem("batchDetail", JSON.stringify(arr));
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInner({ ...inner, [name]: value });
    setInnerData(inner);
    if (localStorage.getItem("batchDetail") !== null) {
      let arr = JSON.parse(localStorage.getItem("batchDetail"));
      let updateObj = arr.find((item, index) => {
        return index === id;
      });
      let obj = updateObj;
      obj[name] = value;
      arr[id] = obj;
      localStorage.setItem("batchDetail", JSON.stringify(arr));
    }
  };

  const handleDelete = (id) => {
    let localbatch = JSON.parse(localStorage.getItem("batchDetail"));
    if (localbatch.length === 1) {
      localStorage.setItem("batchDetail", JSON.stringify([initialObject]));
      dispatch(setLocalBatch(initialObject));
      return 0;
    } else {
      let newFilterData = localbatch.filter((item, index) => {
        return index !== id;
      });
      localStorage.setItem("batchDetail", JSON.stringify(newFilterData));
      dispatch(setLocalBatch(newFilterData));
    }
  };

  return (
    inner && (
      <tr className="edit-compo active" id={id}>
        <td data-label="Class">
          <input
            type="text"
            className="form-control"
            name="class"
            placeholder="Class"
            autoComplete="off"
            value={inner?.class}
            required
            onChange={(e) => handleChange(e)}
          />
        </td>
        <td data-label="Subject">
          <input
            type="text"
            className="form-control"
            name="subject"
            placeholder="Subject"
            autoComplete="off"
            required
            value={inner?.subject}
            onChange={(e) => handleChange(e)}
          />
        </td>
        <td data-label="Board">
          <div className="input-group">
            <MultiSelect
              className="multi-select-drop"
              value={selectedBoard}
              options={boards}
              onChange={(e) => setSelectedBoard(e.value)}
              optionLabel="name"
              placeholder="Select a Board"
              maxSelectedLabels={2}
              // defaultValue={["CBSE"]}
              // optionValue=
              // selectedOption={selectedBoard}
            />
          </div>
        </td>
        <td data-label="Fees">
          <input
            type="number"
            className="form-control"
            name="fees"
            placeholder="Fees"
            required
            value={inner?.fees}
            autoComplete="off"
            onChange={(e) => handleChange(e)}
          />
        </td>
        <td data-label="Scholarship">
          <div className="input-group">
            <select
              className="custom-select scholarship"
              id="inputGroupSelect02"
              required
              name="scholarship"
              value={inner?.scholarship}
              onChange={(e) => handleChange(e)}
            >
              <option value="">Select</option>
              <option value="Zero">Zero</option>
              <option value="Upto 10%">Upto 10%</option>
              <option value="Upto 20%">Upto 20%</option>
              <option value="Upto 30%">Upto 30%</option>
              <option value="Upto 40%">Upto 40%</option>
            </select>
          </div>
        </td>
        <td data-label="Time">
          <input
            type="text"
            className="form-control"
            name="time"
            placeholder="Ex.10-11PM"
            autoComplete="off"
            value={inner?.time}
            required
            onChange={(e) => handleChange(e)}
          />
        </td>
        <td data-label="Batch size">
          <div className="input-group">
            <select
              className="custom-select size"
              id="inputGroupSelect01"
              name="batchStrength"
              required
              value={inner?.batchStrength}
              onChange={(e) => handleChange(e)}
            >
              <option value="">Select</option>
              {optionsForBatch.map((item) => {
                return <option value={item.value}>{item.value}</option>;
              })}
            </select>
          </div>
        </td>
        <td data-label="Mode">
          <div className="input-group">
            <MultiSelect
              className="multi-select-drop"
              value={selectedModes}
              options={modes}
              onChange={(e) => setSelectedModes(e.value)}
              optionLabel="name"
              placeholder="Select a Mode"
              maxSelectedLabels={2}
            />
          </div>
        </td>

        <td className="icons">
          <MdOutlineDelete
            className="delete-icon"
            onClick={() => handleDelete(id)}
          />
        </td>
      </tr>
    )
  );
};

export default React.memo(EditComponent);
