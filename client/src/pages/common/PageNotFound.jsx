import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./PageNotFound.css";

const PageNotFound = () => {
  return (
    <div className="page-not-found-container">
      <Container className="page-not-found-card">
        <h1>404</h1>
        <p>Page Not Found</p>
        <Link to="/">
          <Button variant="primary">Go to Homepage</Button>
        </Link>
      </Container>
    </div>
  );
};

export default PageNotFound;
