import { Col, Row } from "antd";
import React from "react";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Input, Button, Checkbox } from "antd";

function LoginForm() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onSubmit = (values) => {
    console.log(values);
    window.history.back();
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
          {/* {auth.error && <Alert message={auth.error} type="error" showIcon />} */}
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
                  min: 8,
                  message: "Mật khẩu tối thiểu 8 ký tự",
                },
                {
                  max: 32,
                  message: "Mật khẩu tối đa 32 ký tự",
                },
              ]}
            >
              <Input.Password type="password" addonAfter={<LockOutlined />} />
            </Form.Item>
            {/* <div className='forgot' onClick={()=> history.push('/forgot')}><a>Quên mật khẩu</a></div> */}
            <Form.Item>
              <Button
                // onClick={dispatch(setLoading(true))}
                // loading={auth.isLoading}
                type="primary"
                htmlType="submit"
                className="submit"
              >
                Đăng nhập
              </Button>
            </Form.Item>
            <div className="reg">
              <span>Bạn chưa có tài khoản? </span>
              <a href="http://localhost:3000">Đăng ký</a>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  );
}

export default LoginForm;
