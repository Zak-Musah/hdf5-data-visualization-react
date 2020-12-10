import React from "react";

import Dashboard from "../Dashboard/Dashboard";

function MainPage() {
  return (
    <>
      <nav className="navbar ">
        <a className="navbar-brand" href="/#">
          <h2 style={{ color: "white" }}>HDF5 DASHBOARD</h2>
        </a>
      </nav>
      <div className="row">
        <Dashboard />
      </div>
    </>
  );
}

export default MainPage;
