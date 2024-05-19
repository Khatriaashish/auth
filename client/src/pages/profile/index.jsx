import React from "react";
import { Badge, Button, Container, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import "./index.css";
import image from "../../assets/images/background.jpg";
import { useAuth } from "../../context/AuthContext";
import { extractDate } from "../../utils/extractDate";
import swal from "sweetalert2";
import toast from "react-hot-toast";
import { apiCall } from "../apicall";

const UserProfile = () => {
  const { authUser, setAuthUser } = useAuth();

  const handleDelete = async () => {
    try {
      let response = await apiCall.deleteAccount();
      setAuthUser(null);
      toast.success("Deleted! Its sad to see you go");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <div className="profile-container">
        <Col sm={12} md={{ offset: 0, span: 4 }}>
          <Container className="profile-card">
            <NavLink to={"/"} className={"btn btn-sm btn-ghost float-start"}>
              <FaArrowLeft /> &nbsp; Dashboard
            </NavLink>
            <br />
            <NavLink to="/edit-profile">
              <FaEdit className="edit-icon" size={20} />
            </NavLink>
            <img src={authUser.image} alt="Profile" />
            <h2>{authUser.fullName}</h2>
            <p>{authUser.email}</p>
            <p>{authUser.role}</p>
            <p>Member Since {extractDate(authUser.createdAt)}</p>
            <Badge bg={authUser.status === "active" ? "success" : "danger"}>
              {authUser.status}
            </Badge>
            <Button
              variant="danger"
              onClick={(e) => {
                e.preventDefault();
                swal
                  .fire({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#3085d6",
                  })
                  .then((result) => {
                    if (result.isConfirmed) {
                      handleDelete();
                    }
                  });
              }}
            >
              Delete Account
            </Button>
          </Container>
        </Col>
      </div>
    </div>
  );
};

export default UserProfile;
