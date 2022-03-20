import { Col, Row, Statistic, Typography } from "antd";
import Text from "antd/lib/typography/Text";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import BarChart from "../../../components/BarChart";
import { Store } from "../../../utils/Store";

function AdminHome() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({});

  const { Title } = Typography;

  useEffect(() => {
    async function fetchData() {
      const products = await axios.get("http://localhost:8080/products");
      const orders = await axios.get("http://localhost:8080/orders");
      const users = await axios.get("http://localhost:8080/users");

      const productQuantity = products.data.length;
      const userQuantity = users.data.length;
      const orderQuantity = orders.data.length;
      let total = 0;

      orders.data.forEach((order) => {
        order.orderItems.forEach(
          (item) => (total = total + item.quantity * item.price)
        );
      });

      setData({
        productQuantity: productQuantity,
        userQuantity: userQuantity,
        orderQuantity: orderQuantity,
        total: total,
      });

      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <AdminLayout menuSelection="dashboard">
        <h1>Đang tải trang ...</h1>
      </AdminLayout>
    );
  }

  return (
    <div>
      <AdminLayout menuSelection="dashboard">
        <Text strong>Chào mừng {userInfo.name} đã quay trở lại</Text>
        <Row gutter={16} style={{ padding: 10 }}>
          <Col span={12}>
            <Statistic
              title="Số sản phẩm hiện có"
              value={data.productQuantity}
            />
          </Col>
          <Col span={12}>
            <Statistic title="Tài khoản hoạt động" value={data.userQuantity} />
          </Col>
          <Col span={12}>
            <Statistic title="Tổng số đơn hàng" value={data.orderQuantity} />
          </Col>
          <Col span={12}>
            <Statistic
              title="Tổng doanh thu"
              value={`${data.total}`}
              precision={2}
            />
            VND
          </Col>
        </Row>
        <Title level={2}>Biểu đồ doanh thu trong năm nay</Title>
        <BarChart />
      </AdminLayout>
    </div>
  );
}

export default AdminHome;
