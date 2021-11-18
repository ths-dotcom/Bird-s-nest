import { Link } from "react-router-dom";
import Header from "../../../components/Header/Header";
import "./HomeView.scss";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="container">
        <h1>Chim trên cây</h1>
        <h3>Một homestay nhỏ xinh giữa lòng Đà Lạt thơ mộng!</h3>
        <button>
          <Link className="link" to="/apartment-type-master">
            Xem căn hộ
          </Link>
        </button>
        <img
          src="https://cdn.dribbble.com/users/185738/screenshots/10637360/media/bd2ceb90ad7fec03d1f6943f5962dcc6.jpg?compress=1&resize=1200x900"
          alt="error"
        />
        {/* <img src="https://cdn.dribbble.com/users/1066220/screenshots/16679547/media/9f01e7ff9c8c386bd2dd22c5536bfee8.jpg?compress=1&resize=800x600" alt="error"/> */}
      </div>
    </div>
  );
}
