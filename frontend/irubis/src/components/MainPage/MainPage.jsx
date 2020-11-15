import React from "react";

import Dashboard from "../Dashboard/Dashboard";

function MainPage() {
  return (
    <>
      <nav className="navbar navbar-light sticky-top bg-light">
        <a className="navbar-brand" href="#">
          <strong>IRUBIS ANALYTICS DASHBOARD</strong>
        </a>
      </nav>
      <div className="row">
        <Dashboard />
      </div>
    </>
  );
}

export default MainPage;
