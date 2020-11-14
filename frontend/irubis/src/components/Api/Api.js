import React from "react";
import SideBar from "../SideBar/SideBar";
import Dashboard from "../Dashboard/Dashboard";

function DataSet() {
  return (
    <>
      <div className="col-sm-3">
        <SideBar />
      </div>
      <div className="col-sm-9">
        <Dashboard />
      </div>
    </>
  );
}

export default DataSet;
