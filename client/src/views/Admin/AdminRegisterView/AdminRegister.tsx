import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";

import axiosClient from "../../../config/axiosClient";
import "./AdminRegister.scss";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default function AdminRegister() {
  const [form] = Form.useForm();
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [tel, setTel] = React.useState(0);
  const [address, setAddress] = React.useState("");

  const [isSignUp, setSignUp] = React.useState("false");

  const handleOnChangeUsername = React.useCallback((e) => {
    setUsername(e.target.value);
  }, []);
  const handleOnChangeEmail = React.useCallback((e) => {
    setEmail(e.target.value);
  }, []);
  const handleOnChangePassword = React.useCallback((e) => {
    setPassword(e.target.value);
  }, []);
  const handleOnChangeTel = React.useCallback((e) => {
    setTel(e.target.value);
  }, []);
  const handleOnChangeAddress = React.useCallback((e) => {
    setAddress(e.target.value);
  }, []);

  const onFinish = async () => {
    const data = { email, password, username, tel, address };

    axiosClient.post("/admins/signup", { data }).then((response) => {
      setSignUp(response.data.success);
    });
    isSignUp ? alert("Successful") : alert("Email đã được đăng kí");
  };

  return (
    <div className="admin-register-container"> 
      <h1 className="admin-title">ADMIN - ĐĂNG KÝ TÀI KHOẢN</h1>
      <Form
        className="admin-register"
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="username"
          label="Họ và tên"
          rules={[
            {
              required: true,
              message: "Nhập họ và tên!",
              whitespace: true,
            },
          ]}
        >
          <Input onChange={handleOnChangeUsername} />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "sai định dạng Email",
            },
            {
              required: true,
              message: "Nhập Email!",
            },
          ]}
        >
          <Input onChange={handleOnChangeEmail} />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[
            {
              required: true,
              message: "Nhập lại mật khẩu!",
            },
          ]}
          hasFeedback
        >
          <Input.Password onChange={handleOnChangePassword} />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Nhắc lại mật khẩu"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Nhập mật khẩu!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu không khớp"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="tel"
          label="Điện thoại"
          rules={[{ required: true, message: "Nhập Điện thoại" }]}
        >
          <Input style={{ width: "100%" }} onChange={handleOnChangeTel} />
        </Form.Item>

        <Form.Item
          name="address"
          label="Địa chỉ"
          rules={[
            {
              required: true,
              message: "Nhập địa chỉ!",
              whitespace: true,
            },
          ]}
        >
          <Input onChange={handleOnChangeAddress} />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Đồng ý với các điều khoản?")),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>Tôi đồng ý với các điều khoản</Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button htmlType="submit">Đăng ký</Button>
        </Form.Item>
      </Form>

      <Link className="admin-register-link" to="/admin-login">Chuyen den dang nhap</Link>
    </div>
  );
}
