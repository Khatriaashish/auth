import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./index.css";

const Signup = () => {
  return (
    <div className="signup-container">
      <Container className="signup-form">
        <h2>Sign Up</h2>
        <Form>
          <Form.Group controlId="formFullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your full name" />
          </Form.Group>
          <Form.Group controlId="formEmail" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" />
          </Form.Group>
          <Form.Group controlId="formImageUpload" className="mt-3">
            <Form.Label>Upload Profile Image</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-4">
            Sign Up
          </Button>
        </Form>
        <NavLink to="/login" className="form-link">
          Already signed up? Log in
        </NavLink>
      </Container>
    </div>
  );
};

export default Signup;
