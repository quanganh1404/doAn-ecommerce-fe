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
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import UploadImage from "../../../components/upload/UploadImage";
import { Store } from "../../../utils/Store";

function AddProduct() {
  const { state, dispatch } = useContext(Store);
  const { imageLink } = state;

  const [loading, setLoading] = useState(true);
  const [getAllCategory, setGetAllCategory] = useState(true);

  const [newName, setNewName] = useState("");
  const [newCategoryId, setNewCategoryId] = useState("");
  const [newPrice, setNewPrice] = useState(0);
  const [newQuantity, setNewQuantity] = useState(0);
  const [newRating, setNewRating] = useState(0);
  const [newBrand, setNewBrand] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImageLink, setNewImageLink] = useState(imageLink);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `${process.env.REACT_APP_BE_HOST}/category`
      );
      setGetAllCategory(response.data);
      setNewImageLink(imageLink);
      setLoading(false);
    }
    fetchData();
  }, [imageLink]);

  if (loading) {
    return (
      <AdminLayout menuSelection={"products"}>
        <h1>Đang tải trang ...</h1>
      </AdminLayout>
    );
  }

  const OnAddProductHandler = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BE_HOST}/products`, {
        categoryId: newCategoryId,
        image: newImageLink,
        name: newName,
        price: newPrice,
        description: newDescription,
        countInStock: newQuantity,
        brand: newBrand,
        rating: newRating,
      });

      dispatch({ type: "CLEAR_IMAGE_LINK" });
      message.success("Tạo sản phẩm thành công");
    } catch (err) {
      message.error(err);
    }
  };

  return (
    <AdminLayout menuSelection="products">
      <PageHeader
        // className="site-page-header-responsive"
        onBack={() => window.history.back()}
        title="Thêm sản phẩm"
        subTitle={"Mới"}
        extra={
          <Button
            style={{ float: "right" }}
            type="primary"
            onClick={OnAddProductHandler}
          >
            Thêm
          </Button>
        }
      >
        <Text strong>Tên sản phẩm:</Text>
        <Input
          onChange={(e) => {
            setNewName(e.target.value);
          }}
          placeholder="Tên sản phẩm"
        />
        <Text strong>Tên danh mục:</Text>
        <Select
          placeholder="Hãy chọn danh mục"
          style={{ width: 200, padding: 5 }}
          onChange={(e) => {
            setNewCategoryId(e);
          }}
        >
          {getAllCategory.map((category) => (
            <Option value={category._id}>{category.name}</Option>
          ))}
        </Select>
        <br />
        <Text strong style={{ marginLeft: "10%" }}>
          Giá:{" "}
        </Text>
        <InputNumber
          onChange={(value) => {
            setNewPrice(value);
          }}
        />
        <Text strong style={{ marginLeft: "10%" }}>
          Số lượng:
        </Text>
        <InputNumber
          onChange={(value) => {
            setNewQuantity(value);
          }}
        />
        <Text strong style={{ marginLeft: "10%" }}>
          Đánh giá:{" "}
        </Text>
        <InputNumber
          min={0}
          max={5}
          defaultValue={1}
          onChange={(value) => {
            setNewRating(value);
          }}
        />{" "}
        /5
        <br />
        <Text strong>Hãng</Text>
        <br />
        <Input
          onChange={(e) => {
            setNewBrand(e.target.value);
          }}
          placeholder="Hãng"
        />
        <Text strong>Mô tả:</Text>
        <br />
        <Input
          onChange={(e) => {
            setNewDescription(e.target.value);
          }}
          placeholder="Mô tả"
        />
        <Text strong>Ảnh</Text>
        <UploadImage />
      </PageHeader>
    </AdminLayout>
  );
}

export default AddProduct;
