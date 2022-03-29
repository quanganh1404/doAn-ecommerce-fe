import { Breadcrumb, Form, Input, Button } from "antd";
import Text from "antd/lib/typography/Text";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useContext, useState } from "react";
import LayoutAntd from "../../components/Layout";
import { Store } from "../../utils/Store";

function CheckoutView() {
  const { state, dispatch } = useContext(Store);
  const { cartItems, userInfo } = state;

  const [total, setTotal] = useState(0);

  useState(() => {
    let totalPrice = 0;
    cartItems.forEach((data) => {
      totalPrice += data.price;
    });

    setTotal(totalPrice);
  }, [total]);

  const onSubmit = async (value) => {
    try {
      const products = cartItems.map((item) => {
        return {
          productId: item._id,
          price: item.price,
          quantity: item.quantity,
        };
      });

      if (products.length > 0) {
        await axios.post(`${process.env.REACT_APP_BE_HOST}/orders`, {
          userId: userInfo._id,
          shippingAdress: {
            fullName: value.fullName,
            address: value.address,
            street: value.street,
            city: value.city,
            phoneNum: parseInt(value.phoneNum),
          },

          paymentMethod: "CASH",
          orderItems: products,
          shippingPrice: 30000,
          taxPrice: (total * 8.5) / 100,
          totalPrice: (total * 108.5) / 100 + 30000,
        });
        dispatch({ type: "CHECKOUT_COMPLETE" });
        window.location.href = "/checkout/done";
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div>
      <LayoutAntd menuSelection="Cart">
        <Breadcrumb style={{ margin: "16px 0", textAlign: "left" }}>
          <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item>Giỏ hàng</Breadcrumb.Item>
          <Breadcrumb.Item>Đặt hàng</Breadcrumb.Item>
        </Breadcrumb>

        <Text style={{ fontSize: 30 }} strong>
          Thông tin đặt/nhận hàng
        </Text>
        <br />
        <br />
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={onSubmit}
        >
          <Form.Item
            name="fullName"
            label="Tên đầy đủ"
            rules={[
              {
                type: "string",
                required: true,
                message: "Nhập tên đầy đủ của bạn",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[
              {
                type: "string",
                required: true,
                message: "Nhập địa chỉ nhận hàng của bạn",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="street"
            label="Quận"
            rules={[
              {
                type: "string",
                required: true,
                message: "Nhập quận của bạn",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="city"
            label="Thành phố"
            rules={[
              {
                type: "string",
                required: true,
                message: "Nhập thành phố của bạn",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phoneNum"
            label="Số điện thoại"
            rules={[{ required: true, message: "Nhập số điện thoại" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Tiền sản phẩm">{total} VND</Form.Item>
          <Form.Item label="Thuế (8.5%)">{(total * 8.5) / 100} VND</Form.Item>
          <Form.Item label="Phí vận chuyển">{30000} VND</Form.Item>
          <Form.Item label="Tổng tiền">
            {(total * 108.5) / 100 + 30000} VND
          </Form.Item>

          <br />
          <Button type="primary" htmlType="submit" className="submit">
            Đặt hàng
          </Button>
        </Form>
      </LayoutAntd>
    </div>
  );
}

export default CheckoutView;
