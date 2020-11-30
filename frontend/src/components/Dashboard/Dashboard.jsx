import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Popover, OverlayTrigger, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";

import Chart from "../Chart/Chart";
import { compareNames, range } from "../Helpers/DashboardFunctions";
import { chartBgColor } from "../Helpers/Constants";

function Dashboard(props) {
  const [fileNames, setFileNames] = useState([]);
  const [multipleFiles, setMultipleFiles] = useState([]);
  const [fileData, setFileData] = useState([]);
  const [firstPlot, setFirstPlot] = useState([]);
  const [secondPlot, setSecondPlot] = useState([]);
  const [glucoseValue, setGlucoseValue] = useState([]);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVICE_URL}/api/get_file_names`)
      .then((response) => {
        if (response.data.status === true) {
          setFileNames(response.data.data);
        } else {
          setFileNames([]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let chartsObject = [];
    fileData.map((obj, index) => {
      let data = {
        x: range(0, 610, 1),
        y: obj.glucose,
        type: "date",
        mode: "line",
        hoverinfo: "closest",
        name: multipleFiles[index][0],
      };
      chartsObject.push(data);
    });
    setFirstPlot(chartsObject);
  }, [fileData]);

  const toggleDarkMode = () => {
    setIsDarkMode((p) => !p);
  };

  const fetchData = (index) => {
    const name = fileNames[index];
    setFileName(name);
    if (multipleFiles.length > 0 && compareNames(multipleFiles, name)) {
      return;
    } else {
      setMultipleFiles((p) => [...p, [name]]);
      setLoading(true);
      const data = { file_name: name, index: 10 };
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_SERVICE_URL}/api/get_glucose_data`,
          data,
        )
        .then((response) => {
          if (response.data.status === true) {
            setFileData((p) => [...p, response.data.data]);
          } else {
            setFileData([]);
          }
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  };

  const HandleClick = (eventData) => {
    let name = eventData.points[0]["data"]["name"];
    let index = eventData.points[0]["pointIndex"];
    let glucoseVal = eventData.points[0]["y"];
    const data = { file_name: name, index };
    if (glucoseValue.length > 0 && glucoseValue.includes(glucoseVal)) {
      return;
    } else {
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_SERVICE_URL}/api/get_measurement_data`,
          data,
        )
        .then((response) => {
          if (response.data.status === true) {
            let xaxis = [];
            let glucoseArray = [];
            response.data.data.measurement.map((e, index) => {
              xaxis.push(index);
              glucoseArray.push(glucoseVal);
            });
            let meas = {
              x: xaxis,
              y: response.data.data.measurement,
              type: "date",
              mode: "line",
              hoverinfo: "closest",
              name,
              hovertemplate:
                "<b>Glucose</b>: " +
                "<b>%{text}</b> " +
                "<br> <i>Wavenumber</i>: %{y}",
              text: glucoseArray,
            };
            setGlucoseValue((p) => [...p, glucoseVal]);
            setSecondPlot((p) => [...p, meas]);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const clearDashboard = () => {
    setFileData([]);
    setFileName("");
    setSecondPlot([]);
    setMultipleFiles([]);
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title style={{ backgroundColor: " #1e1f45", color: "white" }}>
        <h5>Select file/s to visualize</h5>
      </Popover.Title>
      {fileNames &&
        fileNames.map((fileName, index) => (
          <button
            type="button"
            className="list-group-item list-group-item-action"
            onClick={() => fetchData(index)}
            key={index}
            style={{
              backgroundColor: "#1e1f45",
              color: "white",
              textAlign: "center",
            }}
          >
            {fileName.slice(0, -5).toUpperCase()}
          </button>
        ))}
    </Popover>
  );

  const handleDelete = (index) => {
    if (multipleFiles.length > 0) {
      let name = multipleFiles[index][0];

      if (secondPlot.length > 0) {
        let newArray = [];
        secondPlot.map((obj, index) => {
          if (obj.name === name) {
            return;
          }
          newArray.push(obj);
        });
        setSecondPlot(newArray);
      }
      setMultipleFiles(multipleFiles.filter((_, i) => i !== index));
      setFileData(fileData.filter((_, i) => i !== index));
    } else {
      setFileData([]);
      setMultipleFiles([]);
      setFileName("");
      setSecondPlot([]);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="col-3 bg-violet card">
        <div className="card-body">
          <div className="list-group">
            <OverlayTrigger
              trigger="click"
              rootClose
              placement="right"
              overlay={popover}
            >
              <Button
                variant="success"
                style={{
                  backgroundColor: "#1e1f45",
                  transition: "box-shadow 5s",
                }}
              >
                <h3>Choose Dataset</h3>
              </Button>
            </OverlayTrigger>
          </div>
          <br />
          {multipleFiles.length > 0 &&
            multipleFiles.map((file, index) => (
              <div key={index} style={{ width: "100%", textAlign: "center" }}>
                <button
                  type="button"
                  className="list-group-item list-group-item-action"
                  style={{
                    marginRight: "50px",
                    width: "70%",
                    color: "white",
                    display: "inline-block",
                    backgroundColor: "#1e1f45",
                    alignItems: "center",
                  }}
                >
                  {file[0].slice(0, -5).toUpperCase()}
                </button>
                <button
                  variant="danger"
                  style={{
                    marginLeft: "-50px",
                    width: "10%",
                    display: "inline-block",
                    position: "absolute",
                    zIndex: 1010,
                    backgroundColor: "brown",
                    transition: "box-shadow .5s",
                  }}
                  className="list-group-item list-group-item-action"
                  onClick={() => handleDelete(index)}
                >
                  x
                </button>
              </div>
            ))}
          <br />
          {multipleFiles.length > 0 && (
            <button
              onClick={() => clearDashboard()}
              className="btn btn-primary"
              type="button"
              key="clear-dashboard"
            >
              <h5> Clear Dashboard</h5>
            </button>
          )}
        </div>
      </div>
      <div className="col bg-light card">
        <div className="card-body" style={{ paddingLeft: "4%" }}>
          {loading && (
            <center>
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </center>
          )}
          {!loading && fileName.length > 0 ? (
            <>
              <h5 className="card-title" style={{ color: "white" }}>
                Click on glucose data point to display corresponding spectrum in
                second graph
              </h5>
              <Button
                variant={isDarkMode ? "success" : "primary"}
                onClick={() => toggleDarkMode()}
                style={{
                  float: "right",
                  marginRight: "15px",
                  marginTop: "-35px",
                }}
              >
                <FontAwesomeIcon icon={faMoon} />
              </Button>

              <Chart
                firstPlot={firstPlot}
                secondPlot={secondPlot}
                HandleClick={HandleClick}
                lightDarkMode={
                  isDarkMode ? chartBgColor.darkMode : chartBgColor.lightMode
                }
              />
            </>
          ) : (
            <h4 className="card-title" style={{ color: "white" }}>
              No data yet...
            </h4>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
