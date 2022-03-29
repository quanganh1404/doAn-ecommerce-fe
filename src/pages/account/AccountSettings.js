import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Input, Layout, message, Popover } from "antd";
import Title from "antd/lib/typography/Title";
import { Header } from "antd/lib/layout/layout";
import Text from "antd/lib/typography/Text";
import Avatar from "antd/lib/avatar/avatar";
import { UserOutlined } from "@ant-design/icons";
import { Store } from "../../utils/Store";
import axios from "axios";
import AdminLayout from "../../components/AdminLayout";

const { Content, Footer } = Layout;

function AccountSettings() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      setIsAuthenticated(true);
      setLoading(false);
      if (userInfo.role === "ADMIN") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [isAuthenticated]);

  if (loading) {
    return (
      <AdminLayout menuSelection="dashboard">
        <h1>Đang tải trang ...</h1>
      </AdminLayout>
    );
  }

  const avatarContent = (
    <div>
      {isAdmin ? (
        <div>
          <a href="/">Admin Dashboard</a>
          <br />
        </div>
      ) : (
        ""
      )}
      {isAuthenticated ? (
        <div>
          <a href={`${process.env.REACT_APP_FE_HOST}/account/setting`}>
            Cài đặt tài khoản
          </a>
          <br />
          <a href="/">Lịch sử đặt hàng</a>
          <br />
          <a href={`${process.env.REACT_APP_FE_HOST}/logout`}>Đăng xuất</a>
        </div>
      ) : (
        <a href={`${process.env.REACT_APP_FE_HOST}/login`}>Đăng nhập</a>
      )}
    </div>
  );

  const EditUserHandler = async (data) => {
    console.log(data);
    await axios.patch(
      `${process.env.REACT_APP_BE_HOST}/users/${userInfo._id}`,
      {
        email: data?.email,
        name: data?.name,
        phoneNum: parseInt(data?.phoneNum),
      }
    );
    message.success("Update success");
  };

  return (
    <div>
      <Layout className="layout">
        <Header style={{ padding: 15 }}>
          <Title level={3} style={{ color: "white", float: "left" }}>
            <a href="/"> VN Specialties</a>
          </Title>
          <Popover
            placement="topRight"
            content={avatarContent}
            title="Tài khoản"
          >
            <Avatar
              style={{ float: "right" }}
              icon={<UserOutlined />}
              src="./user.png"
            />
          </Popover>
        </Header>

        {isAuthenticated ? (
          <>
            <Content style={{ padding: "10px 50px" }}>
              <div className="site-layout-content">
                <Text strong>Cài đặt tài khoản của {userInfo.name}</Text>
                <div
                  className="form"
                  style={{ width: "32%", margin: "auto", padding: "25px" }}
                >
                  <Form name="basic" onFinish={EditUserHandler}>
                    <Form.Item
                      initialValue={userInfo.email}
                      name="email"
                      label="Email"
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="name"
                      label={"Họ và tên"}
                      initialValue={userInfo.name}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="phoneNum"
                      label="Số điện thoại"
                      initialValue={userInfo.phoneNum}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="submit"
                      >
                        Cập nhập
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </Content>
          </>
        ) : (
          <Text>
            Bấm vào <a href="/login">đây</a> để đăng nhập
          </Text>
        )}
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </div>
  );
}

export default AccountSettings;
