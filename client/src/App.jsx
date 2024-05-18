import { Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <>
      <HomeHeading />
      <Toaster />
      <Routes>
        {/*Home Page*/}
        <Route path="/" element={<h1>Home</h1>} />

        {/* Registration */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/activate/:token" element={<SetPassword />} />

        {/* Reset Password */}
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/reset/:token" element={<SetPassword />} />

        {/* login */}
        <Route path="/login" element={<Login />} />

        {/* Profile */}
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/edit-profile" element={<EditProfile />} />

        {/*Logout*/}
        <Route path="/logout" element={<Logout />} />

        {/*Page not found */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
