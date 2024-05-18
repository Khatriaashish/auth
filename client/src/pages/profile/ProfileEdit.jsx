import React, { useState } from "react";
import { Form, Button, Container, Col } from "react-bootstrap";
import "./index.css";
import { useAuth } from "../../context/AuthContext";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ImageUploader from "../../components/common/ImageUploader";
import { toast } from "react-hot-toast";
import { apiCall } from "../apicall";
import { NavLink, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const EditProfile = () => {
  const { authUser } = useAuth();

  const [thumb, setThumb] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const handler = async (data) => {
    try {
      console.log(data);
      setLoading(true);
      const response = await apiCall.updateProfile(data);
      navigate("/profile");
      toast.success(response.message);
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
    <div className="edit-profile-container">
      <Col sm={12} md={{ offset: 0, span: 4 }}>
        <Container className="edit-profile-form">
          <NavLink to={"/profile"} className={"btn btn-sm btn-ghost"}>
            <FaArrowLeft /> &nbsp; Go to Profile
          </NavLink>
          <h2>Edit Profile</h2>
          <Form onSubmit={handleSubmit(handler)}>
            <Form.Group controlId="formFullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={authUser.fullName}
                {...register("fullName", { required: true })}
                placeholder="Enter your full name"
                isInvalid={!!errors.fullName}
                disabled={loading}
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
                value={authUser.email}
                placeholder="Enter your email"
                isInvalid={!!errors.email}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">
                {errors?.email?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formProfilePicture" className="mt-3">
              <Form.Label>Profile Picture</Form.Label>
              <ImageUploader
                loading={loading}
                setThumb={setThumb}
                setError={setError}
                setValue={setValue}
              />{" "}
              {authUser && authUser.image && (
                <div className="mt-3">
                  <img
                    src={
                      thumb
                        ? URL.createObjectURL(thumb)
                        : import.meta.env.VITE_IMAGE_URL +
                          "/users/" +
                          authUser.image
                    }
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
            <Button
              variant="primary"
              type="submit"
              className="mt-4"
              disabled={loading}
            >
              Save Changes
            </Button>
          </Form>
        </Container>
      </Col>
    </div>
  );
};

export default EditProfile;
