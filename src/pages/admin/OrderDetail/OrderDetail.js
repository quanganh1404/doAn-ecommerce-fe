import { Button, Input, PageHeader, Space, Switch, Table } from "antd";
import Text from "antd/lib/typography/Text";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../../../components/AdminLayout";
import { Store } from "../../../utils/Store";

function OrderDetail() {
  const { _id } = useParams();

  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [getData, setGetData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isPaid, setIsPaid] = useState(true);

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`http://localhost:8080/orders/${_id}`);
      setGetData(response.data);
      setIsPaid(response.isPaid);
      setLoading(false);
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

  if (loading) {
    return (
      <AdminLayout menuSelection={"orders"}>
        <h1>Đang tải trang ...</h1>
      </AdminLayout>
    );
  }

  console.log(getData);

  const productColumns = [
    { title: "Mã sản phẩm", dataIndex: "productId" },
    { title: "Giá sản phẩm", dataIndex: "price" },
    { title: "Số lượng", dataIndex: "quantity" },
    {
      title: "Thành tiền",
      render: (text) => `${text.quantity * text.price} VND`,
    },
  ];

  return (
    <div>
      <AdminLayout menuSelection="orders">
        <PageHeader
          className="site-page-header-responsive"
          onBack={() => window.history.back()}
          title="Xem đặt hàng"
          subTitle={_id}
          footer={
            <>
              <br />
              <Text strong>
                Tổng đơn hàng:
                {getData.totalPrice} VND
              </Text>
            </>
          }
        >
          <Text strong>Người order: {getData.userId}</Text>
          <br />
          <Text strong>
            Trả tiền:
            {getData.isPaid ? " Đã trả tiền" : " Chưa trả tiền"}
          </Text>
          <br />
          <Text strong>Tên đầy đủ: {getData.shippingAdress.fullName}</Text>
          <br />
          <Text strong>Số điện thoại: {getData.shippingAdress.phoneNum}</Text>
          <br />
          <Text strong>
            Địa chỉ:{" "}
            {`${getData.shippingAdress.address} ${getData.shippingAdress.street} ${getData.shippingAdress.city}`}
          </Text>
          <br />
          <Text strong>
            Tình trạng:
            {getData.paymentMethod === "BANKING"
              ? getData.isPaid === true
                ? getData.isDelivered
                  ? " Đã nhận hàng"
                  : " Đang vận chuyển"
                : " Chưa thanh toán"
              : getData.isDelivered
              ? " Đã nhận hàng"
              : " Đang vận chuyển"}
          </Text>
          <br />
          <Text strong>
            Ngày tạo đơn:
            {getData.createdAt}
          </Text>

          <br />
          <Text strong>
            Phương thức thanh toán:
            {getData.paymentMethod === "CASH"
              ? " Gửi tiền khi nhận hàng"
              : " Chuyển khoản"}
          </Text>

          <br />
          <br />
          <Text strong>Chi tiết:</Text>
          <br />
          <Table
            columns={productColumns}
            dataSource={getData.orderItems}
            bordered
            scroll={true}
          />
        </PageHeader>
      </AdminLayout>
    </div>
  );
}

export default OrderDetail;
