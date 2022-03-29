import { Button, Input, message, PageHeader } from "antd";
import Text from "antd/lib/typography/Text";
import axios from "axios";
import React, { useState } from "react";
import AdminLayout from "../../../components/AdminLayout";

function AddCategory() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const OnAddCategoryHandler = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BE_HOST}/category`, {
        name: name,
        description: description,
      });
      message.success("Thêm danh mục thành công");
    } catch (err) {
      console.log(err);
      message.error("Thêm danh mục thất bại");
    }
  };
  return (
    <div>
      <AdminLayout menuSelection="category">
        <PageHeader
          //   className="site-page-header-responsive"
          onBack={() => window.history.back()}
          title="Thêm sản phẩm"
          subTitle={"Mới"}
          extra={
            <Button
              style={{ float: "right" }}
              type="primary"
              onClick={OnAddCategoryHandler}
            >
              Thêm
            </Button>
          }
        >
          <Text strong>Tên sản phẩm:</Text>
          <Input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Tên sản phẩm"
          />
          <Text strong>Mô tả:</Text>
          <Input
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            placeholder="Mô tả"
          />
        </PageHeader>
      </AdminLayout>
    </div>
  );
}

export default AddCategory;
