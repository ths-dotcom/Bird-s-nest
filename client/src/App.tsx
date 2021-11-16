import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./views/Admin/AdminLoginView/AdminLogin";
import Apartment from "./views/User/ApartmentView/Apartment/Apartment";
import Login from "./views/User/LoginView/Login";
import Register from "./views/User/RegisterView/Register";
import "./App.scss";
import Home from "./views/User/HomeView/HomeView";
import ApartmentDetail from "./views/User/ApartmentView/ApartmentDetai/ApartmentDetail";

export default function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apartments" element={<Apartment />} />
            <Route path="/apartments-detail" element={<ApartmentDetail />} />
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
