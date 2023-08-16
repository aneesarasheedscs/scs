import React from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import {
  GoogleOutlined,
  AppleOutlined,
  FacebookOutlined,
  UserOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

const SignupForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    form.resetFields();
    message.success("Successfully Login 🥳");
  };

  return (
    <div className="form">
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          className="field"
          name="firstName"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input placeholder="First Name" size="large" />
        </Form.Item>

        <Form.Item
          className="field"
          name="lastName"
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input placeholder="Last Name" size="large" />
        </Form.Item>

        <Form.Item
          className="field"
          name="username"
          rules={[{ required: true, message: "Please input your login ID!" }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Login ID"
            size="large"
          />
        </Form.Item>

        <Form.Item
          className="field"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
            size="large"
          />
        </Form.Item>

        <Form.Item
          className="field"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email address!" },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
        </Form.Item>

        <Form.Item
          className="field"
          name="phone"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input
            prefix={<PhoneOutlined />}
            placeholder="Phone Number"
            size="large"
          />
        </Form.Item>

        <Form.Item>
          <Form.Item name="remember" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a
            className="login-form-forgot"
            style={{
              color: "#1ebe928",
              fontWeight: "bold",
              fontSize: "15px",
              fontFamily: "helvetica",
            }}
            href=""
          >
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="submit"
            style={{
              color: "white",
              background: "#1ebe92",
              border: "none",
              fontSize: "17px",
              fontWeight: "bold",
              textTransform: "inherit",
              cursor: "pointer",
              borderRadius: "30px",
              padding: "9px 36px",
              width: "51%",
              height: "20%",
              transition: "all 0.3s ease-in-out",
            }}
          >
            Create Account
          </Button>
        </Form.Item>
        <p style={{ marginTop: "10px", fontSize: "15px", fontWeight: "bold" }}>
          By Signing up, you
          <span>
            <a href="" style={{ textDecoration: "none", color: "red" }}>
              &nbsp;&nbsp;agree to the Terms{" "}
              <span className="condition">and Conditions</span>
            </a>
            <span className="or">&nbsp;&nbsp; OR</span>
          </span>
        </p>
        {/* <h4 style={{ marginLeft: "24%", marginTop: "20px" }}>OR</h4> */}
        <div className="multiple">
          <Button
            className="hover1"
            style={{
              background: "#dc3545",
              color: "white",
              // padding: "10px 15px",
              borderRadius: "10px",
              transition: "all 0.3s ease-in-out",
              padding: "9px 36px",
              fontWeight: "bold",
              width: "37%",
              height: "3.1rem",
            }}
          >
            <GoogleOutlined className="google" />
            &nbsp;Continue with <span className="goo">&nbsp;Google</span>
          </Button>

          <Button
            className="hover2"
            style={{
              background: "#263f75",
              color: "white",
              // padding: "5px",
              borderRadius: "10px",
              transition: "all 0.3s ease-in-out",
              padding: "9px 36px",
              fontWeight: "bold",
              marginLeft: "10px",
              width: "2px",
              height: "3.1rem",
              fontSize: "22px",
            }}
          >
            <FacebookOutlined
              style={{ fontSize: "1.7rem", marginLeft: "-0.7rem" }}
            />
          </Button>

          <Button
            className="hover3"
            style={{
              background: "#132133",
              color: "white",
              // padding: "5px",
              borderRadius: "10px",
              transition: "all 0.3s ease-in-out",
              padding: "9px 36px",
              fontWeight: "bold",
              fontSize: "20px",
              marginLeft: "10px",
              height: "3.1rem",
              width: "2px",
            }}
          >
            <AppleOutlined
              style={{
                fontSize: "1.7rem",
                marginLeft: "-0.7rem",
                marginBottom: "2rem",
              }}
            />
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignupForm;
