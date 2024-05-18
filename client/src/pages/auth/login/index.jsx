import React, { useState } from "react";
import { Form, Button, Container, Col } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "./index.css";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { apiCall } from "../../apicall";
import { useAuth } from "../../../context/AuthContext";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuthUser } = useAuth();

  const loginSchema = Yup.object({
    email: Yup.string().required(),
    password: Yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const loginSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await apiCall.login(data);
      const userDetail = response.result.userDetail;
      localStorage.setItem(
        "_user",
        JSON.stringify({
          ...userDetail,
        })
      );
      const { password, ...remData } = userDetail;
      setAuthUser(remData);
      navigate("/");
      toast.success(`${userDetail.fullName}, Welcome!!`);
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
          <h2>Login</h2>
          <hr />
          <Form onSubmit={handleSubmit(loginSubmit)}>
            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                {...register("email", { required: true })}
                placeholder="Enter your email"
                isInvalid={!!errors.email}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">
                {errors?.email?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                {...register("password", { required: true })}
                placeholder="Enter your password"
                isInvalid={!!errors.password}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">
                {errors?.password?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="mt-4"
              disabled={loading}
            >
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
