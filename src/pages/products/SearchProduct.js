import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LayoutAntd from "../../components/Layout";
import Text from "antd/lib/typography/Text";
import { Breadcrumb, Card, Col, Pagination, Row, Typography } from "antd";
import { StarOutlined } from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import { Store } from "../../utils/Store";
import ProductCard from "../../components/ProductCard";

const { Link } = Typography;

function SearchProduct() {
  const [getProduct, setGetProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [numberOfProducts, setNumberOfProducts] = useState(0);
  const [indexPage, setIndexPage] = useState(1);

  const { search } = useParams();

  const { state, dispatch } = useContext(Store);
  const { cartItems } = state;

  useEffect(() => {
    const fetchData = async (search) => {
      const response = await axios.get(
        `${process.env.REACT_APP_BE_HOST}/products/search/${search}`
      );

      setGetProduct(response.data);
      setNumberOfProducts(response.data.length);
      setLoading(false);
    };
    fetchData(search);
  }, []);

  if (loading) {
    return (
      <LayoutAntd>
        <h1>Product is loading ...</h1>
      </LayoutAntd>
    );
  }

  const defaultPageSize = 1;

  const pageChangeHandler = (value) => {
    setIndexPage(value);
  };

  const OnClickAddToCardHandler = (data) => {
    const existItem = cartItems.find((x) => x._id === data._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }

    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...data, quantity: quantity },
    });
  };

  return (
    <div>
      <LayoutAntd>
        <Breadcrumb style={{ float: "left", margin: "16px 0" }}>
          <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item>Sản phẩm</Breadcrumb.Item>
          <Breadcrumb.Item>Tìm kiếm</Breadcrumb.Item>
        </Breadcrumb>
        <br />
        <br />
        <br />
        <Text strong style={{ fontSize: "20px" }}>
          Tìm kiếm sản phẩm "{search}"{" "}
        </Text>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ padding: 10 }}>
          {getProduct.map((data, i) => (
            <>
              {i >= (indexPage - 1) * defaultPageSize &&
              i <= (indexPage - 1) * defaultPageSize + defaultPageSize - 1 ? (
                <Col
                  className="gutter-row"
                  key={`${data.slug}-row`}
                  span={8}
                  style={{ marginTop: "10px" }}
                >
                  <ProductCard data={data}></ProductCard>
                  {/* <Card
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
                      description={data.category}
                    />
                    Price: {data.price}VND
                    <br />
                    Rate:
                    {data.rating}
                    <StarOutlined style={{ color: "#FFFF00" }} />
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
                      style={{
                        marginLeft: "70%",
                      }}
                      key={`${data.slug}-link`}
                      href={`/view-product/${data.slug}`}
                    >
                      Xem chi tiết
                    </Link>
                  </Card> */}
                </Col>
              ) : (
                ""
              )}
            </>
          ))}
        </Row>
        <Pagination
          style={{ justifyContent: "center", textAlign: "center" }}
          defaultCurrent={1}
          total={numberOfProducts}
          defaultPageSize={defaultPageSize}
          onChange={pageChangeHandler}
        />
      </LayoutAntd>
    </div>
  );
}

export default SearchProduct;
