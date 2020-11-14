import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "../../components/NavBar/NavBar";
// import DataSet from "../DataSet/DataSet";
function MainPage() {
  return (
    <>
      <div className="nav-bar">
        <Router>
          <Header />
        </Router>
      </div>
      <div className="main-page">
        <div className="row">{/* <DataSet /> */}</div>
      </div>
    </>
  );
}

export default MainPage;
