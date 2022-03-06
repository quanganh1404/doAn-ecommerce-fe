import React from "react";
import "./../../App.css";
import {
  Breadcrumb,
  Card,
  Col,
  Divider,
  Pagination,
  Row,
  Typography,
} from "antd";
import LayoutAntd from "./../Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import Meta from "antd/lib/card/Meta";
import { StarOutlined } from "@ant-design/icons";

const { Link } = Typography;

function AllProducts() {
  const [loading, setLoading] = useState(true);
  const [getProducts, setGetProducts] = useState([]);
  const [numberOfProducts, setNumberOfProducts] = useState(0);
  const [indexPage, setIndexPage] = useState(1);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:8080/products");

      setGetProducts(response.data);
      setNumberOfProducts(response.data.length);
      setLoading(false);
    }
    fetchData();
  }, []); // Or [] if effect doesn't need props or state

  if (loading) {
    return <h4>Product is loading ...</h4>;
  }

  const defaultPageSize = 6;

  const pageChangeHandler = (value) => {
    setIndexPage(value);
  };

  return (
    <>
      <LayoutAntd>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item>Sản phẩm</Breadcrumb.Item>
        </Breadcrumb>
        <Divider orientation="left">Sản phẩm</Divider>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ padding: 10 }}>
          {getProducts.map((data, i) => (
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
                    Price: {data.price}$
                    <br />
                    Rate:
                    {data.rating}
                    <StarOutlined style={{ color: "#FFFF00" }} />
                    <br />
                    <Link
                      style={{
                        marginLeft: "70%",
                      }}
                      key={`${data.slug}-link`}
                      href="https://ant.design"
                      target="_blank"
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
    </>
  );
}

export default AllProducts;
