import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LayoutAntd from "../../components/Layout";
import { PageHeader, Tabs, Button, Statistic, Descriptions, Rate } from "antd";
import axios from "axios";
import Text from "antd/lib/typography/Text";
import { Store } from "../../utils/Store";

const { TabPane } = Tabs;

function ViewProduct() {
  const [getProduct, setGetProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [getCategory, setGetCategory] = useState("");

  const { productSlug } = useParams();

  const { state, dispatch } = useContext(Store);
  const { cartItems } = state;

  useEffect(() => {
    async function fetchData(productSlug) {
      const response = await axios.get(
        `http://localhost:8080/products/slug/${productSlug}`
      );

      setGetProduct(response.data);

      const responseCategory = await axios.get(
        `http://localhost:8080/category/${response.data.categoryId}`
      );

      setGetCategory(responseCategory.data.name);
      setLoading(false);
    }

    fetchData(productSlug);
  }, []); // Or [] if effect doesn't need props or state

  if (loading) {
    return (
      <LayoutAntd>
        <h1>Product is loading ...</h1>
      </LayoutAntd>
    );
  }

  const renderContent = (column = 2) => (
    <Descriptions size="small" column={column}>
      <Descriptions.Item label="Tên sản phẩm">
        {getProduct.name}
      </Descriptions.Item>
      <Descriptions.Item label="Danh mục">
        <a>{getCategory}</a>
      </Descriptions.Item>
      <Descriptions.Item label="Ngày sản xuất">
        {getProduct.createdAt}
      </Descriptions.Item>
      <Descriptions.Item label="Đánh giá">
        <Rate
          style={{ marginTop: -10 }}
          disabled
          defaultValue={getProduct.rating}
        />
      </Descriptions.Item>
      <Descriptions.Item label="Nơi sản xuất">
        {getProduct.brand}
      </Descriptions.Item>
    </Descriptions>
  );

  const extraContent = (
    <div
      style={{
        display: "flex",
        width: "max-content",
        justifyContent: "flex-end",
      }}
    >
      {getProduct.countInStock > 0 ? (
        <Statistic
          title="Trạng thái"
          value="Còn hàng"
          style={{
            marginRight: 32,
          }}
        />
      ) : (
        <Statistic
          title="Trạng thái"
          value="Đã hết hàng"
          style={{
            marginRight: 32,
          }}
        />
      )}
      <Statistic
        title="Số lượng tồn"
        value={getProduct.countInStock}
        style={{
          marginRight: 32,
        }}
      />
      <Statistic title="Giá" prefix="VND" value={getProduct.price} />
    </div>
  );

  const Content = ({ children, extra }) => (
    <div className="content">
      <div className="main">{children}</div>
      <div className="extra">{extra}</div>
    </div>
  );

  const AddToCard = () => {
    const existItem = cartItems.find((x) => x._id === getProduct._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (getProduct.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }

    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...getProduct, quantity: quantity },
    });
  };

  return (
    <div>
      <LayoutAntd>
        <PageHeader
          className="site-page-header-responsive"
          onBack={() => window.history.back()}
          title="Sản phẩm"
          subTitle={productSlug}
          extra={[
            <Button onClick={AddToCard} key="1" type="primary">
              Thêm vào giỏ hàng
            </Button>,
          ]}
          footer={
            <Tabs defaultActiveKey="1">
              <TabPane tab="Ảnh" key="Image">
                <img alt="example" src={getProduct.image} />
              </TabPane>
              <TabPane tab="Chi tiết" key="Detail">
                {getProduct.description}
                <br />
                <br />
                <Text strong>Cảm ơn bạn đã ủng hộ VN Specialties</Text>
              </TabPane>
            </Tabs>
          }
        >
          <Content extra={extraContent}>{renderContent()}</Content>
        </PageHeader>
      </LayoutAntd>
    </div>
  );
}

export default ViewProduct;
