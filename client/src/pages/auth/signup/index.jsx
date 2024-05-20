import React, { useEffect, useState } from "react";
import { Form, Button, Container, Col } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "./index.css";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ImageUploader from "../../../components/common/ImageUploader";
import placeholder from "../../../assets/images/image-placeholder.jpg";
import { apiCall } from "../../apicall.js";
import { toast } from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [thumb, setThumb] = useState();
  const [loading, setLoading] = useState(false);
  const [signed, setSigned] = useState(false);
  const signUpSchema = Yup.object({
    fullName: Yup.string().min(2).required(),
    email: Yup.string().email().required(),
  });

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const signUpHandler = async (data) => {
    try {
      setLoading(true);
      const response = await apiCall.signUp(data);
      toast.success(response.message);
      setSigned(true);
    } catch (error) {
      toast.error(error.message);
      error.result.map((obj) => {
        const keys = Object.keys(obj);
        setError(keys[0], { message: obj[keys[0]] });
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSigned(false);
  }, []);
  return (
    <div className="signup-container">
      <Col sm={12} md={{ offset: 0, span: 4 }}>
        <Container className="signup-form">
          <h2>Sign Up</h2>
          <hr />
          {signed ? (
            <>
              <h3>
                <strong>Check Email for further processing......</strong>
              </h3>
            </>
          ) : (
            <>
              <Form onSubmit={handleSubmit(signUpHandler)}>
                <Form.Group controlId="formFullName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("fullName", { required: true })}
                    placeholder="Enter your full name"
                    isInvalid={!!errors.fullName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.fullName?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formEmail" className="mt-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="Enter your email"
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formImageUpload" className="mt-3">
                  <Form.Label>Upload Profile Image</Form.Label>
                  <ImageUploader
                    loading={loading}
                    setThumb={setThumb}
                    setError={setError}
                    setValue={setValue}
                  />
                  <div className="mt-3">
                    <img
                      src={thumb ? URL.createObjectURL(thumb) : placeholder}
                      alt="Profile"
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-4">
                  Sign Up
                </Button>
              </Form>
              <NavLink to="/login" className="form-link">
                Already signed up? Log in
              </NavLink>
            </>
          )}
        </Container>
      </Col>
    </div>
  );
};

export default Signup;
