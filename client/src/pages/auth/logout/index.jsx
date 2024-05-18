import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./index.css";
import toast from "react-hot-toast";
import { apiCall } from "../../apicall";

const Logout = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loggingout = async () => {
    try {
      setLoading(true);
      const response = await apiCall.logout();
      navigate("/login");
      toast.success("Logged out! See you again!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loggingout();
  }, []);

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
