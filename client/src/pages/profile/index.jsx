import React from "react";
import { Badge, Button, Container, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import "./index.css";
import image from "../../assets/images/background.jpg";

const UserProfile = () => {
  return (
    <div>
      <div className="profile-container">
        <Col sm={12} md={{ offset: 0, span: 4 }}>
          <Container className="profile-card">
            <NavLink to="/edit-profile">
              <FaEdit className="edit-icon" size={20} />
            </NavLink>
            <img src={image} alt="Profile" />
            <h2>John Doe</h2>
            <p>john.doe@example.com</p>
            <p>Admin</p>
            <p>Member Since January 2020</p>
            <Badge bg="success">Active</Badge>
            <Button variant="danger">Delete Account</Button>
          </Container>
        </Col>
      </div>
    </div>
  );
};

export default UserProfile;
