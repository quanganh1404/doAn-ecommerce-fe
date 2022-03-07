import { useParams } from "react-router-dom";
import React, { useState } from "react";
import LayoutAntd from "../Layout";
import axios from "axios";

function ProductsByCategory() {
  const { category } = useParams();
  const [getProductByCategory, setGetProductByCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useState(() => {
    async function fetchData() {
      const response = await axios.get(
        `http://localhost:8080/products/category/${category}`
      );
      setGetProductByCategory(response.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  console.log(getProductByCategory);

  if (loading) {
    return (
      <LayoutAntd>
        <h1>Product is loading ...</h1>
      </LayoutAntd>
    );
  }

  return <LayoutAntd menuSelection={category}></LayoutAntd>;
}

export default ProductsByCategory;
