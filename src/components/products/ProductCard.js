import React, { useContext } from "react";
import { StarOutlined } from "@ant-design/icons";
import { Card, Rate, Typography } from "antd";
import Meta from "antd/lib/card/Meta";
import Text from "antd/lib/typography/Text";
import { Store } from "../../utils/Store";

const { Link } = Typography;

function ProductCard({ data }) {
  const { state, dispatch } = useContext(Store);
  const { cartItems, userInfo } = state;

  const OnClickAddToCardHandler = (data) => {
    const existItem = cartItems.find((x) => x._id === data._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (data.countInStock < quantity) {
      window.alert("Xin lỗi quý khách sản phẩm đã hết hàng");
      return;
    }

    window.alert("Đã thêm sản phẩm vào giỏ hàng");

    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...data, quantity: quantity },
    });

    window.location.href = "http://localhost:3000/cart";
  };

  return (
    <div>
      <Card
        hoverable
        href={`/view-product/${data.slug}`}
        style={{ width: "100%" }}
        key={`${data.slug}-card`}
        cover={
          <img
            alt="example"
            src={data.image}
            // src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        }
      >
        <Meta
          key={`${data.slug}-meta`}
          title={data.name}
          description={`Giá: ${data.price} VND`}
        />
        <Text type="danger">Số lượng còn lại: {data.countInStock}</Text>
        <br />

        <Rate defaultValue={data.rating} disabled />
        <br />
        <Link
          style={{
            float: "right",
          }}
          onClick={() => OnClickAddToCardHandler(data)}
        >
          Thêm vào giỏ hàng
        </Link>
        <br />
        <Link
          style={{ float: "right" }}
          key={`${data.slug}-link`}
          href={`/view-product/${data.slug}`}
        >
          Xem chi tiết
        </Link>
      </Card>
    </div>
  );
}

export default ProductCard;
