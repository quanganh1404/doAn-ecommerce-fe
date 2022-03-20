import React, { useContext } from "react";
import { Card, message, Rate, Typography } from "antd";
import Meta from "antd/lib/card/Meta";
import Text from "antd/lib/typography/Text";
import { Store } from "../utils/Store";

const { Link } = Typography;

function ProductCard({ data }) {
  const { state, dispatch } = useContext(Store);
  const { cartItems } = state;

  const OnClickAddToCardHandler = (data) => {
    const existItem = cartItems.find((x) => x._id === data._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (data.countInStock < quantity) {
      message.info("Xin lỗi quý khách sản phẩm này đã hết hàng");
      return;
    }

    message.info("Đã thêm sản phẩm vào giỏ hàng");

    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...data, quantity: quantity },
    });
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
            style={{ height: 300 }}
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
        <Text key={`${data.slug}-quantity`} type="danger">
          Số lượng còn lại: {data.countInStock}
        </Text>
        <br />

        <Rate key={`${data.slug}-rate`} defaultValue={data.rating} disabled />
        <br />
        <Link
          style={{
            float: "right",
          }}
          key={`${data.slug}-addToCard`}
          onClick={() => OnClickAddToCardHandler(data)}
        >
          Thêm vào giỏ hàng
        </Link>
        <br />
        <Link
          style={{ float: "right" }}
          key={`${data.slug}-viewProduct`}
          href={`/view-product/${data.slug}`}
        >
          Xem chi tiết
        </Link>
      </Card>
    </div>
  );
}

export default ProductCard;
