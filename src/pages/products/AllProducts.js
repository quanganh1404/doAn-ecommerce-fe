import React, { Fragment, useContext } from "react";
import "./../../App.css";
import { Breadcrumb, Col, Divider, Pagination, Row, Typography } from "antd";
import LayoutAntd from "./../../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import Meta from "antd/lib/card/Meta";
import { StarOutlined } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import { Store } from "../../utils/Store";
import ProductCard from "../../components/ProductCard";

const { Link } = Typography;

function AllProducts() {
  const [loading, setLoading] = useState(true);
  const [getProducts, setGetProducts] = useState([]);
  const [numberOfProducts, setNumberOfProducts] = useState(0);
  const [indexPage, setIndexPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `${process.env.REACT_APP_BE_HOST}/products`
      );

      setGetProducts(response.data);
      setNumberOfProducts(response.data.length);
      setLoading(false);
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

  const defaultPageSize = 6;

  const pageChangeHandler = (value) => {
    setIndexPage(value);
  };

  return (
    <>
      <LayoutAntd>
        <Breadcrumb style={{ float: "left", margin: "16px 0" }}>
          <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item>Sản phẩm</Breadcrumb.Item>
        </Breadcrumb>
        <Divider orientation="left">Sản phẩm</Divider>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ padding: 10 }}>
          {getProducts.map((data, i) => (
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
    </>
  );
}

export default AllProducts;
