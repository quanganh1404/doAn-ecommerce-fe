import { useParams } from "react-router-dom";
import React, { Fragment, useContext, useState } from "react";
import LayoutAntd from "../../components/Layout";
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
import { Store } from "../../utils/Store";
import ProductCard from "../../components/ProductCard";

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
      setNumberOfProducts(response.data.data.length);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <LayoutAntd menuSelection={category}>
        <h1>Product is loading ...</h1>
      </LayoutAntd>
    );
  }

  const pageChangeHandler = (value) => {
    setIndexPage(value);
  };

  const defaultPageSize = 6;

  return (
    <div>
      <LayoutAntd menuSelection={category}>
        <Breadcrumb style={{ float: "left", margin: "16px 0" }}>
          <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item>Sản phẩm</Breadcrumb.Item>
          <Breadcrumb.Item>Danh mục</Breadcrumb.Item>
          <Breadcrumb.Item>{categoryName}</Breadcrumb.Item>
        </Breadcrumb>
        <Divider orientation="left">Sản phẩm</Divider>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ padding: 10 }}>
          {getProductByCategory.map((data, i) => (
            <Fragment key={`${data.slug}-fragment`}>
              {i >= (indexPage - 1) * defaultPageSize &&
              i <= (indexPage - 1) * defaultPageSize + defaultPageSize - 1 ? (
                <Col
                  className="gutter-row"
                  key={`${data.slug}-row`}
                  span={8}
                  style={{ marginTop: "10px" }}
                >
                  <ProductCard data={data} />
                </Col>
              ) : (
                ""
              )}
            </Fragment>
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

export default ProductsByCategory;
