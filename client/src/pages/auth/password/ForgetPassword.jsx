import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../login/index.css";

const ForgetPassword = () => {
  return (
    <div className="login-container">
      <Container className="login-form">
        <h2>Login</h2>
        <Form>
          <Form.Group controlId="formEmail" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter your password" />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-4">
            Login
          </Button>
        </Form>
        <NavLink to="/signup" className="form-link">
          No account? Sign up
        </NavLink>
        <NavLink to="/forgot-password" className="form-link">
          Forgot password?
        </NavLink>
      </Container>
    </div>
  );
};

export default ForgetPassword;
