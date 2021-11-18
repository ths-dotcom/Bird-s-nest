import './App.scss';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AdminLogin from './views/Admin/AdminLoginView/AdminLogin';
import ApartmentTypeMaster from './views/User/ApartmentTypeView/ApartmentTypeMaster/ApartmentTypeMaster';
import ApartmentDetail from './views/User/ApartmentView/ApartmentDetail/ApartmentDetail';
import ApartmentMaster from './views/User/ApartmentView/ApartmentMaster/ApartmentMaster';
import Home from './views/User/HomeView/HomeView';
import Login from './views/User/LoginView/Login';
import Register from './views/User/RegisterView/Register';

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
            <Route path="apartment-master" element={<ApartmentMaster />}>
              <Route path=":slug" element={<ApartmentDetail />} />
            </Route>
            <Route path="apartment-type-master" element={<ApartmentTypeMaster />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}
