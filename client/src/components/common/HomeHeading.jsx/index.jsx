import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./index.css";

const HomeHeading = () => {
  return (
    <>
      <Navbar expand="lg" className="glass-effect">
        <Container>
          <NavLink to="/" className="navbar-brand">
            Auth & CRUD
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/profile" className="nav-link">
                Profile
              </NavLink>
            </Nav>
            <Nav className="float-end">
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
              <NavLink to="/signup" className={"nav-link"}>
                SignUp
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default HomeHeading;
