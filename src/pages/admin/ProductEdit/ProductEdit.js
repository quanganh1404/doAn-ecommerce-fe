import {
  Button,
  Input,
  InputNumber,
  message,
  PageHeader,
  Select,
  Upload,
} from "antd";
import { Option } from "antd/lib/mentions";
import Text from "antd/lib/typography/Text";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../../../components/AdminLayout";
import { UploadOutlined } from "@ant-design/icons";
import { Store } from "../../../utils/Store";
import UploadImage from "../../../components/upload/UploadImage";

function ProductEdit() {
  const { _id } = useParams();
  const { state, dispatch } = useContext(Store);
  const { imageLink } = state;

  const [getProduct, setGetProduct] = useState({});
  const [loading, setLoading] = useState(true);

  const [getProductName, setGetProductName] = useState("");
  const [getProductRating, setGetProductRating] = useState("");
  const [getProductCountInStock, setGetProductCountInStock] = useState("");
  const [getCategoryId, setGetCategoryId] = useState("");
  const [getProductPrice, setGetProductPrice] = useState("");
  const [getProductBrand, setGetProductBrand] = useState("");
  const [getProductDescription, setGetProductDescription] = useState("");
  const [getImage, setGetImage] = useState("");

  const [getCategoryName, setGetCategoryName] = useState("");
  const [allCategory, setAllCategory] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `${process.env.REACT_APP_BE_HOST}/products/${_id}`
      );
      setGetProduct(response.data);

      const category = await axios.get(
        `${process.env.REACT_APP_BE_HOST}/category/${response.data.categoryId}`
      );

      const allCategory = await axios.get(
        `${process.env.REACT_APP_BE_HOST}/category`
      );

      setGetCategoryName(category.data.name);
      setGetProductName(response.data.name);
      setGetProductCountInStock(response.data.countInStock);
      setGetProductPrice(response.data.price);
      setGetCategoryId(response.data.categoryId);
      setGetProductBrand(response.data.brand);
      setGetProductDescription(response.data.description);
      imageLink ? setGetImage(imageLink) : setGetImage(response.data.image);
      setGetProductRating(response.data.rating);
      setAllCategory(allCategory.data);
      setLoading(false);
    }
    fetchData();
  }, [_id, imageLink]);

  if (loading) {
    return (
      <AdminLayout menuSelection={"products"}>
        <h1>??ang t???i trang ...</h1>
      </AdminLayout>
    );
  }

  const handleChange = (value) => {
    setGetCategoryId(value);
  };

  const UpdateOnClickHandler = async () => {
    try {
      await axios.patch(`${process.env.REACT_APP_BE_HOST}/products/${_id}`, {
        categoryId: getCategoryId,
        image: getImage,
        name: getProductName,
        price: getProductPrice,
        description: getProductDescription,
        countInStock: getProductCountInStock,
        brand: getProductBrand,
        rating: getProductRating,
      });
      dispatch({ type: "CLEAR_IMAGE_LINK" });

      window.location.href = `${process.env.REACT_APP_FE_HOST}/admin/products`;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AdminLayout menuSelection="products">
      <PageHeader
        onBack={() => window.history.back()}
        title="C???p nh???p s???n ph???m"
        subTitle={_id}
        extra={
          <Button
            onClick={UpdateOnClickHandler}
            style={{ float: "right" }}
            type="primary"
          >
            C???p nh???p
          </Button>
        }
      >
        <br />
        <Text strong>T??n s???n ph???m: </Text>
        <Input
          value={getProductName}
          onChange={(e) => {
            setGetProductName(e.target.value);
          }}
          placeholder="T??n s???n ph???m"
        />
        <Text strong>Danh m???c: </Text>
        <Select
          defaultValue={getCategoryName}
          style={{ width: 200, padding: 5 }}
          onChange={handleChange}
        >
          {allCategory.map((category) => (
            <Option value={category._id}>{category.name}</Option>
          ))}
        </Select>

        <Text strong style={{ marginLeft: "10%" }}>
          ????nh gi??:{" "}
        </Text>
        <InputNumber
          min={1}
          max={5}
          defaultValue={getProductRating}
          onChange={(value) => {
            setGetProductRating(value);
          }}
        />
        <Text strong>/5</Text>

        <Text style={{ marginLeft: "10%" }} strong>
          H??ng t???n:
        </Text>
        <InputNumber
          defaultValue={getProductCountInStock}
          onChange={(value) => {
            setGetProductCountInStock(value);
          }}
        />

        <Text style={{ marginLeft: "10%" }} strong>
          Gi??:{" "}
        </Text>
        <InputNumber
          defaultValue={getProductPrice}
          onChange={(value) => {
            setGetProductPrice(value);
          }}
        />
        <br />
        <Text strong>H??ng: </Text>
        <Input
          value={getProductBrand}
          placeholder="H??ng"
          onChange={(e) => {
            setGetProductBrand(e.target.value);
          }}
        />
        <Text strong>M?? t???: </Text>
        <Input.TextArea
          value={getProductDescription}
          placeholder="M?? t???"
          onChange={(e) => setGetProductDescription(e.target.value)}
        />
        <Text strong>???nh: </Text>
        <br />
        <img style={{ width: "30%" }} src={getProduct.image} alt="" />

        <br />
        <UploadImage />
        <br />
      </PageHeader>
    </AdminLayout>
  );
}

export default ProductEdit;
