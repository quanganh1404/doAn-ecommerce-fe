import { Col, Divider, Pagination, Row } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LayoutAntd from "../../components/Layout";
import ProductCard from "../../components/ProductCard";

function SortProducts() {
  const { orderBy, type } = useParams();

  const [getProducts, setGetProducts] = useState([]);
  const [loading, setLoading] = useState([]);

  const [numberOfProducts, setNumberOfProducts] = useState(0);
  const [indexPage, setIndexPage] = useState(1);

  useState(() => {
    async function fetchData() {
      const response = await axios.get(
        `http://localhost:8080/products/sort/${orderBy}/${type}`
      );
      setGetProducts(response.data);

      setNumberOfProducts(response.data.length);
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

  const pageChangeHandler = (value) => {
    setIndexPage(value);
  };

  const defaultPageSize = 3;

  return (
    <div>
      <LayoutAntd>
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
                  <ProductCard data={data}></ProductCard>
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

export default SortProducts;
