import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./index.css";
import { useAuth } from "../../../context/AuthContext";

const HomeHeading = () => {
  const { authUser } = useAuth();
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
              {authUser && (
                <NavLink to="/profile" className="nav-link">
                  Profile
                </NavLink>
              )}
              {authUser && authUser.role === "admin" && (
                <NavLink to="/list-user" className="nav-link">
                  Users List
                </NavLink>
              )}
            </Nav>
            <Nav className="float-end">
              {!authUser ? (
                <>
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                  <NavLink to="/signup" className={"nav-link"}>
                    SignUp
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/logout" className={"nav-link"}>
                    Logout
                  </NavLink>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default HomeHeading;
