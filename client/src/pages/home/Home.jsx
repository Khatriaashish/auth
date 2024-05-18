import React from "react";
import { Container, Button, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Home.css";
import { FaUser, FaEdit, FaList } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Home = () => {
  const { authUser } = useAuth();
  return (
    <>
      <div className="home-container text-center">
        <Col sm={12} md={{ offset: 0, span: 4 }}>
          <Container className="dashboard">
            <h2>Welcome to {authUser.role} Dashboard</h2>
            <hr />
            <div className="mt-5">
              <Button
                as={NavLink}
                to="/profile"
                variant="ghost"
                size="lg"
                className="me-3"
              >
                <FaUser />
                <br />
                Go to Profile
              </Button>
              <Button
                as={NavLink}
                to="/edit-profile"
                variant="ghost"
                size="lg"
                className="me-3"
              >
                <FaEdit />
                <br />
                Edit Profile
              </Button>
              {authUser && authUser.role === "admin" && (
                <>
                  <Button
                    as={NavLink}
                    to="/list-user"
                    variant="ghost"
                    size="lg"
                  >
                    <FaList />
                    <br />
                    User List
                  </Button>
                </>
              )}
            </div>
          </Container>
        </Col>
      </div>
    </>
  );
};

export default Home;
