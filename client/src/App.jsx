import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomeHeading from "./components/common/HomeHeading.jsx";
import Signup from "./pages/auth/signup/index.jsx";
import Login from "./pages/auth/login/index.jsx";

function App() {
  return (
    <>
      <HomeHeading />
      <Routes>
        {/*Home Page*/}
        <Route path="/" element={<h1>Home</h1>} />

        {/* Registration */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/activate/:token" element={<h1>Activate Token</h1>} />

        {/* Reset Password */}
        <Route path="/forget-password" element={<h1>Forget Password</h1>} />
        <Route path="/reset/:token" element={<h1>Reset</h1>} />

        {/* login */}
        <Route path="/login" element={<Login />} />

        {/* Profile */}
        <Route path="/profile" element={<h1>Profile</h1>} />
        <Route path="/edit-profile" element={<h1>Edit profile</h1>} />

        {/*Logout*/}
        <Route path="/logout" element={<h1>Logout</h1>} />

        {/*Page not found */}
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </>
  );
}

export default App;
