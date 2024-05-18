import React, { useEffect } from "react";
import { Form, Button } from "react-bootstrap";

import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const SetPasswordForm = ({ handler, error }) => {
  const yupSchema = Yup.object({
    password: Yup.string().matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      "Password must contain one uppercase, one lowercase, one numeral, one special character and 8-20 characters are only allowed"
    ),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Password doesn't match"
    ),
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(yupSchema),
  });

  useEffect(() => {
    Object.keys(error).forEach((key) => {
      setError(key, { type: "manual", message: error[key]?.message });
    });
  }, [error, setError]);
  return (
    <Form onSubmit={handleSubmit(handler)}>
      <Form.Group controlId="formPassword" className="mt-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          {...register("password", { required: true })}
          placeholder="Enter your password"
          isInvalid={!!errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {errors?.password?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formConfirmPassword" className="mt-3">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          {...register("confirmPassword", { required: true })}
          placeholder="Re-Enter your password"
          isInvalid={!!errors.confirmPassword}
        />
        <Form.Control.Feedback type="invalid">
          {errors?.confirmPassword?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-4">
        Set
      </Button>
    </Form>
  );
};

export default SetPasswordForm;
