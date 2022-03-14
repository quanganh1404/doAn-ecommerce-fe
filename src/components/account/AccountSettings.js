import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";

const { Header, Content, Footer } = Layout;

function AccountSettings() {
  return (
    <div>
      <Layout className="layout">
        {/* <Header> */}
        <div className="logo" />
        <Menu mode="horizontal" defaultSelectedKeys={["2"]}>
          {new Array(15).fill(null).map((_, index) => {
            const key = index + 1;
            return <Menu.Item key={key}>{`nav ${key}`}</Menu.Item>;
          })}
        </Menu>
        {/* </Header> */}
        <Content style={{ padding: "10px 50px" }}>
          <div className="site-layout-content">Content</div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
      ,
    </div>
  );
}

export default AccountSettings;
