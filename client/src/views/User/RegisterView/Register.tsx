import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import React, { SyntheticEvent } from "react";

import Header from "../../../components/Header/Header";
import { Message } from "../../../models/Message/Message";

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

export default function Register() {
  const [form] = Form.useForm();
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [tel, setTel] = React.useState(0);
  const [address, setAddress] = React.useState("");

  const [message, setMessage] = React.useState();

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

  const onFinish =  async  () => {
    const data = { email, password, username, tel, address };
    console.log(data);

    axios
      .post("http://localhost:3001/api/users/signup", { data })
      .then((response) => console.log("hello" + response));
  };

  return (
    <>
      {" "}
      <Header />
      <Form
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
          <Button type="primary" htmlType="submit">
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
