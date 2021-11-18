import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import AdminLogin from "./views/Admin/AdminLoginView/AdminLogin";
import Login from "./views/User/LoginView/Login";
import Register from "./views/User/RegisterView/Register";
import Home from "./views/User/HomeView/HomeView";
import ApartmentDetail from "./views/User/ApartmentView/ApartmentDetail/ApartmentDetail";
import ApartmentMaster from "./views/User/ApartmentView/ApartmentMaster/ApartmentMaster";
import ApartmentTypeMaster from "./views/User/ApartmentTypeView/ApartmentTypeMaster/ApartmentTypeMaster";
import "./App.scss";


export default function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/apartment-master" element={<ApartmentMaster />} />
            {/* <Route path="/apartment-detail" element={<ApartmentDetail slug={props} />} /> */}
            <Route path="/apartment-type-master" element={<ApartmentTypeMaster />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}
