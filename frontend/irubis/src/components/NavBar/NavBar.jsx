import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";

function Header() {
  return (
    <Navbar bg="light" variant="light" className="Navbar">
      <Container fluid className="navbar-content">
        <NavLink to="/" activeStyle={{ color: "white" }}>
          <Navbar.Brand>
            <h1 className="title">IRUBIS Analytics Dashboard</h1>
            <br />
          </Navbar.Brand>
        </NavLink>
      </Container>
    </Navbar>
  );
}

export default Header;
