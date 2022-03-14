import React, { useContext, useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Breadcrumb,
  Avatar,
  Button,
  Popover,
  Input,
  Typography,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  MessageOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import axios from "axios";
import { Store } from "../utils/Store";

const { Text } = Typography;
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { Search } = Input;

function LayoutAntd({ children, menuSelection = "Products" }) {
  const [getCategories, setGetCategories] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:8080/category");
      setGetCategories(response.data);
    }
    fetchData();
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

  const ChatBoxTitle = <span>Chat Box</span>;

  const ChatBox = (
    <div
      style={{
        background: "#fff",
        padding: 10,
        minHeight: 400,
      }}
      className="site-layout-content"
    >
      Chào bạn bạn cần hỗ trợ về điều gì?
    </div>
  );

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

  const onSearch = (value) => {
    if (value) {
      window.location.href = `http://localhost:3000/find-product/${value}`;
    }
  };

  const onClickMenu = (value) => {
    if (value.keyPath.includes("Products"))
      window.location.href = "http://localhost:3000";
    if (value.keyPath.includes("category")) {
      window.location.href = `http://localhost:3000/${value.keyPath[1]}/${value.keyPath[0]}`;
    }
    if (value.keyPath.includes("Cart")) {
      window.location.href = `http://localhost:3000/cart`;
    }
    if (value.keyPath.includes("sort")) {
      window.location.href = `http://localhost:3000/${value.keyPath[1]}/${value.keyPath[0]}/-1`;
    }
    console.log(value.keyPath);
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

          <Search
            placeholder="Tìm kiếm sản phẩm"
            onSearch={onSearch}
            enterButton
            style={{ width: "50%" }}
          />

          <Title level={3} style={{ color: "white", float: "left" }}>
            <a href="/"> VN Specialties</a>
          </Title>
        </Header>
        <Layout>
          <Sider>
            <Menu
              defaultSelectedKeys={[menuSelection]}
              mode="inline"
              defaultOpenKeys={["about-us", "category", "sort"]}
              theme="dark"
              onClick={onClickMenu}
            >
              <Menu.Item key="Home">Trang chủ</Menu.Item>
              <Menu.Item key="Products">Sản phẩm</Menu.Item>
              <Menu.Item key="Cart">Giỏ hàng</Menu.Item>
              <SubMenu
                key="about-us"
                icon={<PieChartOutlined />}
                title="Thông tin"
              >
                <Menu.ItemGroup key="About-Us" title="Về chúng tôi">
                  <Menu.Item key="contact">Liên hệ chúng tôi</Menu.Item>
                  <Menu.Item key="send-feedback">Gửi phản hồi</Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>

              <SubMenu key="category" icon={<MailOutlined />} title="Danh mục">
                <Menu.ItemGroup key="category" title="Nơi sản xuất">
                  {getCategories.map((data) => (
                    <Menu.Item key={data._id}>{data.name}</Menu.Item>
                  ))}
                </Menu.ItemGroup>
              </SubMenu>

              <SubMenu key="sort" icon={<MailOutlined />} title="Sắp xếp theo">
                <Menu.ItemGroup key="price" title="Sắp xếp">
                  <Menu.Item key="price">Giá cả</Menu.Item>
                  <Menu.Item key="rating">Sao</Menu.Item>
                  <Menu.Item key="countInStock">Số lượng hàng</Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout>
            <Content style={{ padding: "0 50px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item></Breadcrumb.Item>
              </Breadcrumb>
              <div
                style={{
                  background: "#fff",
                  padding: 24,
                  minHeight: 580,
                }}
                className="site-layout-content"
              >
                {children}
              </div>
              <div
                style={{
                  width: 10,
                  position: "fixed",
                  right: "5%",
                  top: "90%",
                }}
              >
                <Popover
                  placement="rightBottom"
                  title={ChatBoxTitle}
                  content={ChatBox}
                  trigger="click"
                >
                  <Button
                    shape="circle"
                    icon={<MessageOutlined />}
                    size="large"
                  />
                </Popover>
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
