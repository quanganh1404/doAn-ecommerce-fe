import { Col, Row } from "antd";
import React, { useContext, useEffect } from "react";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Input, Button } from "antd";
import { Store } from "../../utils/Store";
import axios from "axios";
import Cookies from "js-cookie";

function LoginForm() {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      window.location.href = `${process.env.REACT_APP_FE_HOST}`;
    }
  }, []);

  const onSubmit = async (values) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BE_HOST}/auth`,
        {
          email: values.email,
          password: values.password,
        }
      );

      dispatch({ type: "USER_LOGIN", payload: data });

      Cookies.set("userInfo", JSON.stringify(data));

      window.history.back();
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <Row className="login" justify="center" align="middle">
      <Col className="wrapper">
        <Row className="title" justify="center">
          <Col>
            <UserOutlined className="logo" />
          </Col>
          <Col>Đăng nhập tài khoản</Col>
        </Row>
        <div className="form">
          <Form name="basic" onFinish={onSubmit} autoComplete="off">
            Email
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Email không hợp lệ",
                },
              ]}
            >
              <Input addonAfter={<MailOutlined />} />
            </Form.Item>
            Mật khẩu
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Mật khẩu không được để trống",
                },
                {
                  min: 4,
                  message: "Mật khẩu tối thiểu 4 ký tự",
                },
                {
                  max: 32,
                  message: "Mật khẩu tối đa 32 ký tự",
                },
              ]}
            >
              <Input.Password type="password" addonAfter={<LockOutlined />} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="submit">
                Đăng nhập
              </Button>
            </Form.Item>
            <div className="reg">
              <span>Bạn chưa có tài khoản? </span>
              <a href={`${process.env.REACT_APP_FE_HOST}`}>Đăng ký</a>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  );
}

export default LoginForm;
