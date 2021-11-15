import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AdminLogin from "./views/Admin/AdminLoginView/AdminLogin";
import Apartment from "./views/User/ApartmentView/Apartment";
import Login from "./views/User/LoginView/Login";
import Register from "./views/User/RegisterView/Register";
import "./App.scss";
import Home from "./views/User/Home/Home";

export default function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Router>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/apartment" element={<Apartment />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            {/* <Route path="/apartment-type" element={<ApartmentType />} /> */}
          </Routes>
        </Router>
      </div>
    </div>
  );
}
