import React from "react";
import { Form, Button, Container, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./index.css";

const Login = () => {
  return (
    <div className="login-container">
      <Col sm={12} md={{ offset: 0, span: 4 }}>
        <Container className="login-form">
          <h2>Login</h2>
          <hr />
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
      </Col>
    </div>
  );
};

export default Login;
