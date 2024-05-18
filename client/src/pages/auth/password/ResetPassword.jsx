import React, { useEffect, useState } from "react";
import { Form, Button, Container, Col, Spinner } from "react-bootstrap";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "../login/index.css";
import toast from "react-hot-toast";
import SetPasswordForm from "../../../components/auth/SetPasswordForm";
import { apiCall } from "../../apicall";

const ResetPassword = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const params = useParams();

  const resetPasswordHandler = async (data) => {
    try {
      let response = await apiCall.resetPassword(params.resetToken, data);

      toast.success(response.message);
      navigate("/login");
    } catch (except) {
      toast.error(except.message);
      error.result.map((obj) => {
        const keys = Object.keys(obj);
        setError(keys[0], { message: obj[keys[0]] });
      });
      navigate("/");
    }
  };

  const verifyToken = async () => {
    try {
      const verified = await apiCall.getActivationTokenVerify(params.token);
      setLoading(false);
    } catch (except) {
      console.log("exception", except);
      toast.error(except.message);
      navigate("/login");
    }
  };

  useEffect(() => {
    verifyToken();
  }, [params]);
  return (
    <div className="login-container">
      <Col sm={12} md={{ offset: 0, span: 4 }}>
        <Container className="login-form">
          <h2>Reset Password</h2>
          <hr />
          {loading ? (
            <>
              <div className="text-center">
                <Spinner variant="dark" />
              </div>
            </>
          ) : (
            <>
              <SetPasswordForm handler={resetPasswordHandler} error={error} />
            </>
          )}
        </Container>
      </Col>
    </div>
  );
};

export default ResetPassword;
