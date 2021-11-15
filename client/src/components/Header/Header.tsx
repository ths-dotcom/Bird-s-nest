import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import "./Header.scss";

export default function Header() {
  return (
    <div>
      <Row>
        <Col span={18}>
          <Link className="link" to="/home">
            Trang chủ
          </Link>
          <Link className="link" to="/apartment">
            Căn hộ
          </Link>
          <Link className="link" to="/apartment-type">
            Loại căn hộ
          </Link>
        </Col>
        <Col span={6}>
          <Link className="link" to="/login">
            Đăng ký
          </Link>
          <Link className="link" to="/register">
            Đăng nhập
          </Link>
        </Col>
      </Row>
    </div>
  );
}
