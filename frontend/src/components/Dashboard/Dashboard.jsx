import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Popover, OverlayTrigger, Button } from "react-bootstrap";
import Rodal from "rodal";
import "rodal/lib/rodal.css";

import Chart from "../Chart/Chart";
import { compareNames } from "../Helpers/DashboardFunctions";

function Dashboard(props) {
  const [fileNames, setFileNames] = useState([]);
  const [multipleFiles, setMultipleFiles] = useState([]);
  const [fileName, setFileName] = useState("");
  const [fileData, setFileData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/get_file_names`)
      .then((response) => {
        if (response.data.status === true) {
          setFileNames(response.data.data);
        } else {
          setFileNames([]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const fetchData = (index) => {
    const name = fileNames[index];

    setFileName(name);
    console.log(multipleFiles, name);
    if (multipleFiles.length > 0 && compareNames(multipleFiles, name)) {
      return;
    } else {
      setMultipleFiles((p) => [...p, [name]]);
      setLoading(true);
      const data = { file_name: name, index: 10 };
      axios
        .post(`http://localhost:5000/api/glucose`, data)
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

  const clearDashboard = () => {
    setFileData([]);
    setFileName("");
  };
  const popover = (
    <Popover id="popover-basic">
      <Popover.Title
        style={{ backgroundColor: " #1e1f45", color: "white" }}
        as="h3"
      >
        <h5>Select file/s to visualize</h5>
      </Popover.Title>
      {fileNames &&
        fileNames.map((fileName, index) => (
          <button
            type="button"
            className="list-group-item list-group-item-action"
            onClick={() => fetchData(index)}
            key={index}
            style={{ backgroundColor: "#1e1f45", color: "white" }}
          >
            {fileName.slice(0, -5).toUpperCase()}
          </button>
        ))}
    </Popover>
  );

  const handleDelete = (index) => {
    if (multipleFiles.length > 0) {
      setMultipleFiles(multipleFiles.filter((_, i) => i !== index));
      setFileData(fileData.filter((_, i) => i !== index));
    } else {
      setFileData([]);
      setMultipleFiles([]);
    }
  };
  console.log(multipleFiles);
  return (
    <>
      <div className="col-3 bg-violet card">
        <div className="card-body">
          <h5 className="card-title">Select File</h5>

          <div className="list-group">
            {/* <button
              onClick={() => clearDashboard()}
              className="btn btn-primary"
              type="button"
              key="clear-dashboard"
            >
              Clear Dashboard
            </button> */}
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
                <h3>Dataset</h3>
              </Button>
            </OverlayTrigger>
          </div>
          <br />
          {/* <h6 className="card-subtitle mb-2 text-muted">
            <big>Dataset to visualize</big>
          </h6> */}
          {multipleFiles.length > 0 &&
            multipleFiles.map((file, index) => (
              <div style={{ width: "100%", " text-align": "center" }}>
                <button
                  type="button"
                  className="list-group-item list-group-item-action"
                  key={index}
                  style={{
                    "pointer-events": "none",
                    width: "90%",
                    color: "white",
                    display: "inline-block",
                    backgroundColor: "#1e1f45",
                    alignItems: "center",
                  }}
                >
                  {file[0].slice(0, -5).toUpperCase()}
                </button>
                <button
                  // variant="danger"
                  style={{
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
                Click on a glucose data point to display corresponding meas in
                another graph
              </h5>
              <Chart fileData={fileData} multipleFiles={multipleFiles} />
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
