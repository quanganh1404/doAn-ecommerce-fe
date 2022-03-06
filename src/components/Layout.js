import React, { useState } from "react";
import { Layout, Menu, Breadcrumb, Avatar, Button, Popover, Input } from "antd";
import {
  UserOutlined,
  MailOutlined,
  MessageOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import Title from "antd/lib/typography/Title";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { Search } = Input;

function LayoutAntd({ children }) {
  const text = <span>Chat Box</span>;
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
      <a href="/">Đăng nhập</a>
      <br />
      <a href="/">Admin Dashboard</a>
      <br />
      <a href="/">Cài đặt tài khoản</a>
      <br />
      <a href="/">Giỏ hàng</a>
      <br />
      <a href="/">Lịch sử đặt hàng</a>
      <br />
      <a href="/">Đăng xuất</a>
    </div>
  );

  const onSearch = (value) => {
    console.log(value);
  };

  const onClickMenu = (value) => {
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
            style={{ width: "50%", marginLeft: "10%" }}
          />

          <Title level={3} style={{ color: "white", float: "left" }}>
            VN Specialties
          </Title>
        </Header>
        <Layout>
          <Sider>
            <Menu
              defaultSelectedKeys={["Dashboard"]}
              mode="inline"
              theme="dark"
              onClick={onClickMenu}
            >
              <Menu.Item key="Dashboard">Dashboard</Menu.Item>
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
                  <Menu.Item key="Northern">Miền bắc</Menu.Item>
                  <Menu.Item key="Central">Miền trung</Menu.Item>
                  <Menu.Item key="Southern">Miền nam</Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>

              <SubMenu key="sort" icon={<MailOutlined />} title="Sắp xếp theo">
                <Menu.ItemGroup key="price" title="Sắp xếp">
                  <Menu.Item key="price-sort">Giá cả</Menu.Item>
                  <Menu.Item key="star-sort">Sao</Menu.Item>
                  <Menu.Item key="quantity-sort">Đang bán</Menu.Item>
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
                  right: "10%",
                  top: "90%",
                }}
              >
                <Popover
                  placement="rightBottom"
                  title={text}
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
            <Footer style={{ textAlign: "center" }}>
              Alright serve ©2022 Created by AdamNguyen.qa
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

export default LayoutAntd;
