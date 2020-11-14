import React, { useState, useEffect } from "react";

import { Button } from "react-bootstrap";
import Dashboard from "../Dashboard/Dashboard";
import axios from "axios";
function SideBarLeft() {
  const [fileNames, setFileNames] = useState([]);
  const [testName, setTestName] = useState("");
  const [testData, setTestData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/datafiles`)
      .then((response) => response.json())
      .then((data) => setFileNames(data.files));
  }, []);

  const handleFileClick = (index) => {
    let testName = fileNames[index];
    setTestName(testName);
    const data = { filename: testName };
    axios
      .post(`http://localhost:5000/read_data`, data)
      .then((response) => setTestData(response.data));
  };
  console.log(testName);

  return (
    <>
      <div className="col-sm-3">
        <h4>Select Data File</h4>
        {fileNames &&
          fileNames.map((file, index) => (
            <Button
              variant="link"
              onClick={() => handleFileClick(index)}
              key={index}
            >
              {file}
            </Button>
          ))}
      </div>
      <div className="col-sm-9">
        {testData && <Dashboard testData={testData} testName={testName} />}
      </div>
    </>
  );
}

export default SideBarLeft;
