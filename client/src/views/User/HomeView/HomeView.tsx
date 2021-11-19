import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import Header from "../../../components/Header/Header";
import "./HomeView.scss";
import Footer from './../../../components/Footer/Footer';

export default function Home() {
  return (
    <div>
      <Header />
      <div className="container">
        <Row>
          <Col className="col-1" lg={8}>
            {" "}
            <h1>Homestay...! Chim trên cây </h1>
            <h3>Một homestay nhỏ xinh giữa lòng Đà Lạt thơ mộng!</h3>
            <button>
              <Link className="link" to="/apartment-type-master">
                Xem căn hộ
              </Link>
            </button>
          </Col>
          <Col className="col-2" lg={16}>
            <div className="anh-1">
              <img
                src="https://cdn.dribbble.com/users/1066220/screenshots/16679547/media/9f01e7ff9c8c386bd2dd22c5536bfee8.jpg"
                alt="error"
              />
            </div>
            {/* <div className="anh-2">
              <img
                src="https://cdn.dribbble.com/users/5098213/screenshots/16634517/media/bc59cbb7fb4ac3a13620d1a20b52bb22.jpg?compress=1&resize=1600x1200"
                alt="error"
              />
            </div>

            <div className="anh-3">
              <img
                src="https://cdn.dribbble.com/users/4954323/screenshots/16678018/media/324025ebbf6d0a6178b7f9ef72d7b499.png?compress=1&resize=1600x1200"
                alt="error"
              />
            </div> */}
          </Col>
        </Row>
      </div>
      <Footer/>
    </div>
  );
}
