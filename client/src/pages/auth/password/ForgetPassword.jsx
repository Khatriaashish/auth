import React from "react";
import { Form, Button, Container, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../login/index.css";

const ForgetPassword = () => {
  return (
    <div className="login-container">
      <Col sm={12} md={{ offset: 0, span: 4 }}>
        <Container className="login-form">
          <h2>Forgot your password?</h2>
          <hr />
          <center className="small">Enter your email to continue</center>
          <Form>
            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4">
              Request reset
            </Button>
          </Form>
          <NavLink to="/login" className="form-link">
            Remember Password? Log in
          </NavLink>
        </Container>
      </Col>
    </div>
  );
};

export default ForgetPassword;
