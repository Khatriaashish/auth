import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import HomeHeading from "./components/common/HomeHeading.jsx";
import Signup from "./pages/auth/signup/index.jsx";
import Login from "./pages/auth/login/index.jsx";
import ForgetPassword from "./pages/auth/password/ForgetPassword.jsx";
import SetPassword from "./pages/auth/password/SetPassword.jsx";
import UserProfile from "./pages/profile/index.jsx";
import EditProfile from "./pages/profile/ProfileEdit.jsx";
import PageNotFound from "./pages/common/PageNotFound.jsx";
import Logout from "./pages/auth/logout/index.jsx";
import ResetPassword from "./pages/auth/password/ResetPassword.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import Home from "./pages/home/Home.jsx";
import UserList from "./pages/home/UserList.jsx";

function App() {
  const ProtectedRoute = ({ children, role }) => {
    const { authUser } = useAuth();
    if (!authUser) {
      return <Navigate to="/login" />;
    }

    if (role && authUser.role !== role) {
      return <Navigate to="/" />;
    }
    return children;
  };

  const PublicRoute = ({ children }) => {
    const { authUser } = useAuth();
    return !authUser ? children : <Navigate to="/" />;
  };
  return (
    <>
      <HomeHeading />
      <Toaster />
      <Routes>
        {/*Home Page*/}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* role based authorization - admin */}
        <Route
          path="/list-user"
          element={
            <ProtectedRoute role="admin">
              <UserList />
            </ProtectedRoute>
          }
        />

        {/* Registration */}
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route path="/activate/:token" element={<SetPassword />} />

        {/* Reset Password */}
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgetPassword />
            </PublicRoute>
          }
        />
        <Route path="/reset/:resetToken" element={<ResetPassword />} />

        {/* login */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />

        {/*Logout*/}
        <Route
          path="/logout"
          element={
            <ProtectedRoute>
              <Logout />
            </ProtectedRoute>
          }
        />

        {/*Page not found */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
