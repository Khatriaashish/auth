import React, { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate a logout process
    const timer = setTimeout(() => {
      navigate("/login"); // Redirect to the login page after logout
    }, 3000); // Animation duration

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="logout-container">
      <Container className="logout-card">
        <h1>Logging Out...</h1>
        <p>Thank you for visiting. You are being logged out.</p>
      </Container>
    </div>
  );
};

export default Logout;
