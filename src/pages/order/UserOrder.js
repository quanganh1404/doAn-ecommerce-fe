import { Button, Space, Table } from "antd";
import Text from "antd/lib/typography/Text";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import LayoutAntd from "../../components/Layout";
import { Store } from "../../utils/Store";

function UserOrder() {
  const [loading, setLoading] = useState(true);
  const [getData, setGetData] = useState([]);

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `${process.env.REACT_APP_BE_HOST}/orders/users/${userInfo._id}`
      );

      setLoading(false);
      setGetData(response.data);
    }
    fetchData();
  }, [loading]); // Or [] if effect doesn't need props or state

  if (loading) {
    return (
      <LayoutAntd>
        <h1>Product is loading ...</h1>
      </LayoutAntd>
    );
  }

  const columns = [
    {
      title: "Thời gian",
      dataIndex: "createdAt",
    },
    {
      title: "Trạng thái",
      dataIndex: "isDelivered",
      render: (text) => (text ? "Đã nhận hàng" : "Chưa nhận hàng"),
    },
    {
      title: "Thanh toán",
      dataIndex: "isPaid",
      render: (text) =>
        text ? "Đã thanh thanh toán" : "Chưa thanh thanh toán",
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "paymentMethod",
      render: (text) => (text === "BANKING" ? "Chuyển khoản" : "Tiền mặt"),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      render: (text) => `${text} VNĐ`,
      sorter: {
        compare: (a, b) => a.totalPrice - b.totalPrice,
        multiple: 1,
      },
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a href={`${process.env.REACT_APP_FE_HOST}/order/${record._id}`}>
            Xem
          </a>
        </Space>
      ),
    },
  ];

  const data = getData;

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <LayoutAntd menuSelection="cart">
      <h3>Lịch sử đặt hàng</h3>
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </LayoutAntd>
  );
}

export default UserOrder;
