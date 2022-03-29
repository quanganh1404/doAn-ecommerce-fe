import { PageHeader, Table } from "antd";
import Text from "antd/lib/typography/Text";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LayoutAntd from "../../components/Layout";
import { Store } from "../../utils/Store";

function UserOrderDetail() {
  const { _id } = useParams();
  const [loading, setLoading] = useState(true);
  const [getData, setGetData] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `${process.env.REACT_APP_BE_HOST}/orders/${_id}`
      );

      if (response.data) setLoading(false);
      setGetData(response.data);
    }
    fetchData();
  }, []); // Or [] if effect doesn't need props or state

  if (loading) {
    return (
      <LayoutAntd>
        <h1>Product is loading ...</h1>
      </LayoutAntd>
    );
  }

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
    <LayoutAntd>
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
        <Text strong>
          Trả tiền:
          {getData.isPaid ? " Đã trả tiền" : " Chưa trả tiền"}
        </Text>
        <br />
        {getData.shippingAdress ? (
          <>
            <Text strong>Tên đầy đủ: {getData.shippingAdress.fullName}</Text>
            <br />
            <Text strong>Số điện thoại: {getData.shippingAdress.phoneNum}</Text>
            <br />
            <Text strong>
              Địa chỉ:
              {`${getData.shippingAdress.address} ${getData.shippingAdress.street} ${getData.shippingAdress.city}`}
            </Text>
          </>
        ) : (
          ""
        )}
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
    </LayoutAntd>
  );
}

export default UserOrderDetail;
