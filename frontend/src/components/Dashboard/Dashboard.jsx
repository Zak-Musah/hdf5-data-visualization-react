import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import axios from "axios";

import Chart from "../Chart/Chart";

function Dashboard(props) {
  const [fileNames, setFileNames] = useState([]);
  const [fileName, setFileName] = useState("");
  const [fileData, setFileData] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const fetchData = (index) => {
    const name = fileNames[index];
    setFileName(name);
    setLoading(true);
    const data = { file_name: name };
    axios
      .post(`${process.env.REACT_APP_BACKEND_SERVICE_URL}/api/read_data`, data)
      .then((response) => {
        if (response.data.status === true) {
          setFileData(response.data.data);
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

  return (
    <>
      <div className="col-3 bg-light card">
        <div className="card-body">
          <h5 className="card-title">Select File</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            To show dataset on dashboard
          </h6>
          <div className="list-group">
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
            <button
              onClick={() => clearDashboard()}
              className="btn btn-primary"
              type="button"
              key="clear-dashboard"
            >
              Clear Dashboard
            </button>
          </div>
        </div>
      </div>
      <div className="col bg-light card">
        <div className="card-body" style={{ paddingLeft: "20%"}}>
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
