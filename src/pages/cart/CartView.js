import { Breadcrumb, Button, Table, Typography } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../../utils/Store";
import LayoutAntd from "../../components/Layout";

const { Text } = Typography;

function CartView() {
  const { state, dispatch } = useContext(Store);
  const { cartItems, userInfo } = state;

  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchData() {
      let totalPrice = 0;
      await cartItems.map((data) => (totalPrice += data.price));
      setTotal(totalPrice);
    }
    fetchData();
  }, []);

  const RemoveItemHandler = (record) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: record });
    window.location.href = "/cart";
  };

  const columns = [
    {
      title: "Ảnh sản phẩm",
      key: "image",
      render: (text) => (
        <a href={`view-product/${text.slug}`}>
          <img
            alt={`${text.image}`}
            src={text.image}
            style={{ width: 50 }}
          ></img>
        </a>
      ),
    },
    {
      title: "Tên sản phẩm",
      key: "name",
      render: (text) => {
        return <a href={`view-product/${text.slug}`}>{text.name}</a>;
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price", //+ text.price * text.quantity),
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => {
        return (
          <Button onClick={() => RemoveItemHandler(record)}>
            <Text>Xóa</Text>
          </Button>
        );
      },
    },
  ];

  return (
    <LayoutAntd menuSelection="Cart">
      <Breadcrumb style={{ margin: "16px 0", textAlign: "left" }}>
        <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item>Giỏ hàng</Breadcrumb.Item>
      </Breadcrumb>
      <Typography.Title level={1} style={{ margin: 0 }}>
        {userInfo ? <Text>Giỏ hàng của {userInfo.name}</Text> : ""}
      </Typography.Title>
      <br />
      <br />

      {userInfo ? (
        cartItems.length > 0 ? (
          <div>
            <Table columns={columns} dataSource={cartItems} />
            <div>
              <div style={{ display: "grid" }}>
                <Text strong style={{}}>
                  Tổng số tiền bạn phải thanh toán là <Text mark>{total}</Text>{" "}
                  VND
                </Text>
                <br />
                <Button style={{ float: "right" }} type="primary">
                  Thanh toán
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            Giỏ hàng của bạn đang trống.
            <a href="/">Chọn sản phẩm</a> ngay
          </div>
        )
      ) : (
        <div>
          <a href="/login">Đăng nhập</a> để xem giỏ hàng
        </div>
      )}
    </LayoutAntd>
  );
}

export default CartView;
