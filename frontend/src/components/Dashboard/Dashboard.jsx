import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Popover, OverlayTrigger, Button } from "react-bootstrap";

import Chart from "../Chart/Chart";

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
        console.log(response);
        if (response.data.status === true) {
          setFileNames(response.data.data);
        } else {
          setFileNames([]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const fetchData = (index) => {
    console.log(fileNames);
    const name = fileNames[index];
    console.log(name);
    setFileName(name);
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
  };

  const clearDashboard = () => {
    setFileData([]);
    setFileName("");
  };
  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Select file/s to visualize</Popover.Title>
      {fileNames &&
        fileNames.map((fileName, index) => (
          <button
            type="button"
            className="list-group-item list-group-item-action"
            onClick={() => fetchData(index)}
            key={index}
          >
            {fileName.slice(0, -5).toUpperCase()}
          </button>
        ))}
    </Popover>
  );

  const handleDelete = (index) => {
    if (multipleFiles.length > 0) {
      setMultipleFiles(multipleFiles.filter((_, i) => i !== index));
    } else {
      setMultipleFiles([]);
    }
  };
  console.log(multipleFiles);
  return (
    <>
      <div className="col-3 bg-light card">
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
              <Button variant="success">Dataset</Button>
            </OverlayTrigger>
          </div>
          <br />
          <h6 className="card-subtitle mb-2 text-muted">
            <big>Dataset to visualize</big>
          </h6>
          {multipleFiles.length > 0 &&
            multipleFiles.map((fileName, index) => (
              <div style={{ width: "100%", " text-align": "center" }}>
                <button
                  type="button"
                  className="list-group-item list-group-item-action"
                  key={index}
                  style={{
                    "pointer-events": "none",
                    width: "80%",
                    display: "inline-block",
                  }}
                >
                  {fileName}
                </button>
                <button
                  // variant="danger"
                  style={{ width: "10%", display: "inline-block" }}
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
        <div className="card-body" style={{ paddingLeft: "20%" }}>
          {loading && (
            <center>
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </center>
          )}
          {!loading && fileName.length > 0 ? (
            <>
              <h4 className="card-title">
                {fileName.slice(0, -5).toUpperCase()}
              </h4>
              <Chart fileData={fileData} fileName={fileName} />
            </>
          ) : (
            <h4 className="card-title">No data yet...</h4>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
