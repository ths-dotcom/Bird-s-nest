import { Button, Checkbox, Form, Input, Select } from "antd";
import Header from "../../../components/Header/Header";

const { Option } = Select;

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

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+84</Option>
      </Select>
    </Form.Item>
  );

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
          name="name"
          label="Họ và tên"
          rules={[
            {
              required: true,
              message: "Nhập họ và tên!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="username"
          label="Tên đăng nhập"
          rules={[
            {
              required: true,
              message: "Nhập tên đăng nhập!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[
            {
              required: true,
              message: "Nhập lại  mật khẩu!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
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
          name="phone"
          label="Điện thoại"
          rules={[{ required: true, message: "Nhập Điện thoại" }]}
        >
          <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
        </Form.Item>

        {/* <Form.Item
      name="birthday"
      label="Ngày sinh"
      rules={[
        {
          // required: true,
          message: "Chọn",
        },
      ]}
    >
      <DatePicker format="DD-MM-yyyy" />
    </Form.Item> */}

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "sai định dạng Email",
            },
            {
              // required: true,
              message: "Nhập Email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Giới tính"
          rules={[{ /* required: true,  */ message: "Chọn Giới tính" }]}
        >
          <Select>
            <Option value="male">Nam</Option>
            <Option value="female">Nữ </Option>
            <Option value="other">Khác</Option>
          </Select>
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
