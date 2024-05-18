import React, { useState } from "react";
import { Form, Button, Container, Col } from "react-bootstrap";
import "./index.css";

const EditProfile = () => {
  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [profilePicture, setProfilePicture] = useState(
    "profile-picture-url.jpg"
  );

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicture(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ fullName, email, profilePicture });
  };

  return (
    <div className="edit-profile-container">
      <Col sm={12} md={{ offset: 0, span: 4 }}>
        <Container className="edit-profile-form">
          <h2>Edit Profile</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </Form.Group>
            <Form.Group controlId="formProfilePicture" className="mt-3">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control type="file" onChange={handleImageUpload} />
              {profilePicture && (
                <div className="mt-3">
                  <img
                    src={profilePicture}
                    alt="Profile"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              )}
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-4">
              Save Changes
            </Button>
          </Form>
        </Container>
      </Col>
    </div>
  );
};

export default EditProfile;
