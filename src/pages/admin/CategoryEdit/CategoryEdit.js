import { Button, Input, message, PageHeader } from "antd";
import Text from "antd/lib/typography/Text";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../../../components/AdminLayout";

function CategoryEdit() {
  const { _id } = useParams();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `${process.env.REACT_APP_BE_HOST}/category/${_id}`
      );
      setName(response.data.name);
      setDescription(response.data.description);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <AdminLayout menuSelection="category">
        <h1>Đang tải trang ...</h1>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout menuSelection="category">
      <PageHeader
        className="site-page-header-responsive"
        onBack={() => window.history.back()}
        title="Cập nhập danh mục"
        subTitle={_id}
        extra={
          <Button
            onClick={async () => {
              try {
                await axios.patch(
                  `${process.env.REACT_APP_BE_HOST}/category/${_id}`,
                  {
                    name: name,
                    description: description,
                  }
                );

                message.success("Cập nhập thành công");
              } catch (err) {
                console.log(err);
                message.error(err);
              }
            }}
            style={{ float: "right" }}
            type="primary"
          >
            Cập nhập
          </Button>
        }
      >
        <Text strong>Tên danh mục: </Text>
        <Input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Tên danh mục"
        />
        <Text strong>Mô tả: </Text>
        <Input
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          placeholder="Mô tả"
        />
        {/* <Text strong>Ảnh: </Text> */}
      </PageHeader>
    </AdminLayout>
  );
}

export default CategoryEdit;
