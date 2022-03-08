import { useParams } from "react-router-dom";
import React, { useState } from "react";
import LayoutAntd from "../Layout";
import axios from "axios";
import {
  Breadcrumb,
  Card,
  Col,
  Divider,
  Pagination,
  Row,
  Typography,
} from "antd";
import Meta from "antd/lib/card/Meta";
import Text from "antd/lib/typography/Text";
import { StarOutlined } from "@ant-design/icons";

const { Link } = Typography;

function ProductsByCategory() {
  const { category } = useParams();
  const [getProductByCategory, setGetProductByCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  const [numberOfProducts, setNumberOfProducts] = useState(0);
  const [indexPage, setIndexPage] = useState(1);
  const [categoryName, setCategoryName] = useState("");

  useState(() => {
    async function fetchData() {
      const response = await axios.get(
        `http://localhost:8080/products/category/${category}`
      );
      setGetProductByCategory(response.data.data);
      setCategoryName(response.data.categoryName);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <LayoutAntd>
        <h1>Product is loading ...</h1>
      </LayoutAntd>
    );
  }

  const defaultPageSize = 6;

  const pageChangeHandler = (value) => {
    setIndexPage(value);
  };

  return (
    <LayoutAntd menuSelection={category}>
      <Breadcrumb style={{ float: "left", margin: "16px 0" }}>
        <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item>Danh mục</Breadcrumb.Item>
        <Breadcrumb.Item>{categoryName}</Breadcrumb.Item>
      </Breadcrumb>
      <Divider orientation="left">Sản phẩm</Divider>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ padding: 10 }}>
        {getProductByCategory.map((data, i) => (
          <>
            {i >= (indexPage - 1) * defaultPageSize &&
            i <= (indexPage - 1) * defaultPageSize + defaultPageSize - 1 ? (
              <Col
                className="gutter-row"
                key={`${data.slug}-row`}
                span={8}
                style={{ marginTop: "10px" }}
              >
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
                  <Text type="danger">
                    Số lượng còn lại: {data.countInStock}
                  </Text>
                  <br />
                  {`Xếp hạng:
            ${data.rating} `}
                  <StarOutlined style={{ color: "#FFFF00" }} />
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
                </Card>
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
  );
}

export default ProductsByCategory;
