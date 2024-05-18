import { createContext, useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";
import { apiCall } from "../pages/apicall";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getLoggedInUser = async () => {
    try {
      const response = await apiCall.profile();
      const { password, ...remData } = response.result;
      setAuthUser(remData);
    } catch (error) {
      localStorage.removeItem("_au");
      localStorage.removeItem("_rt");
      localStorage.removeItem("_user");
      setAuthUser(null);
      toast.error("Session Expired");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let token = localStorage.getItem("_au");
    if (!token) {
      setLoading(false);
    } else getLoggedInUser();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ authUser, getLoggedInUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
