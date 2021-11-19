import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Header from "../../../components/Header/Header";
import { Link } from "react-router-dom";
import React, { SyntheticEvent } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const onFinish = async () => {
    const data = { email, password };
    axios
      .post("http://localhost:3001/api/users/login", {
        data,
        credentials: "include",
      })
      .then((response) => console.log(response));
  };

  const handleChangeEmail = React.useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const handleChangePassword = React.useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  return (
    <>
      <Header />
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="Email"
          rules={[{ required: true, message: "Nhập Email!" }]}
        >
          <Input
            onChange={handleChangeEmail}
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="mật khẩu"
          rules={[{ required: true, message: "Nhập Mật khẩu!" }]}
        >
          <Input
            onChange={handleChangePassword}
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Mật khẩu"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Nhớ tôi</Checkbox>
          </Form.Item>

          <Link to="/register">Quên mật khẩu</Link>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Đăng nhập
          </Button>
          Or <Link to="/register">Đăng ký!</Link>
        </Form.Item>

        <Link to="/admin-login">Bạn là quản trị viên?</Link>
      </Form>
    </>
  );
}
