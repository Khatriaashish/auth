import React, { useState } from "react";
import { Form, Button, Container, Col } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "../login/index.css";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiCall } from "../../apicall.js";
import { toast } from "react-hot-toast";

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const yupSchema = Yup.object({
    email: Yup.string().email().required(),
  });

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(yupSchema),
  });

  const handler = async (data) => {
    try {
      setLoading(true);
      const response = await apiCall.forgetPassword(data);
      setMessage(response.message);
      toast.success(response.message);
      navigate("/login");
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
  return (
    <div className="login-container">
      <Col sm={12} md={{ offset: 0, span: 4 }}>
        <Container className="login-form">
          <h2>Forgot your password?</h2>
          <hr />
          {message ? (
            <center className="small text-warning">{response.message}</center>
          ) : (
            <center className="small">Enter your email to continue</center>
          )}

          <Form onSubmit={handleSubmit(handler)}>
            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: true })}
                isInvalid={!!errors.email}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">
                {errors?.email?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="mt-4"
              disabled={loading}
            >
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
