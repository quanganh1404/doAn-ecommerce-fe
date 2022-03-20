import React, { useContext, useEffect, useState } from "react";
import { Layout, Menu, Avatar, Button, Popover, Typography } from "antd";
import { UserOutlined, MessageOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import { Store } from "../utils/Store";
import { Link } from "react-router-dom";
import axios from "axios";

const { Text } = Typography;
const { Header, Content, Footer, Sider } = Layout;

function LayoutAntd({ children, menuSelection = "users" }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [getData, setGetData] = useState({});

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      setIsAuthenticated(true);
      if (userInfo.role === "ADMIN") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const avatarContent = (
    <div>
      {isAuthenticated ? (
        <div>
          <a href="http://localhost:3000/account/setting">Cài đặt tài khoản</a>
          <br />
          <a href="/">Lịch sử đặt hàng</a>
          <br />
          <a href="http://localhost:3000/logout">Đăng xuất</a>
        </div>
      ) : (
        <a href="http://localhost:3000/login">Đăng nhập</a>
      )}
    </div>
  );

  const onClickMenu = (value) => {
    window.location.href = `http://localhost:3000/admin/${value.keyPath[0]}`;
  };

  return (
    <>
      <Layout>
        <Header style={{ padding: 15 }}>
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

          <Title level={3} style={{ color: "white", float: "left" }}>
            <a href="/"> VN Specialties</a>
          </Title>
        </Header>
        <Layout>
          <Sider>
            <Menu
              defaultSelectedKeys={menuSelection}
              mode="inline"
              theme="dark"
              onClick={onClickMenu}
            >
              <Menu.Item key="dashboard">Dashboard</Menu.Item>
              <Menu.Item key="users">Tài khoản</Menu.Item>
              <Menu.Item key="products">Sản phẩm</Menu.Item>
              <Menu.Item key="category">Danh mục</Menu.Item>
              <Menu.Item key="orders">Orders</Menu.Item>
              <Menu.Item key="chat">Chat</Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content style={{ padding: "0 50px" }}>
              <div
                style={{
                  margin: "16px 0",
                  background: "#fff",
                  padding: 24,
                  minHeight: 580,
                }}
                className="site-layout-content"
              >
                {children}
              </div>
            </Content>
            <Footer
              style={{
                textAlign: "center",
              }}
            >
              <Text strong>
                Alright serve ©2022 Created by AdamNguyen.qa@gmail.com
              </Text>
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

export default LayoutAntd;
