import React from "react";
import { Card } from "react-bootstrap";
import { FaDatabase } from "react-icons/fa";

function DataSet() {
  return (
    <>
      <div className="dataset">
        <h3>
          <FaDatabase className="dataset-icon" />
          <br />
          Datasets
        </h3>
      </div>
    </>
  );
}

export default DataSet;
