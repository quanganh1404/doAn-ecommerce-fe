import { Button, message, Space, Table } from "antd";
import Text from "antd/lib/typography/Text";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../../../components/AdminLayout";
import { Store } from "../../../utils/Store";
import { CheckOutlined, ExclamationOutlined } from "@ant-design/icons";

function AdminDashboard() {
  const { option } = useParams();

  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [getData, setGetData] = useState({});
  const [loading, setLoading] = useState(true);

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`http://localhost:8080/${option}`);
      setGetData(response.data);
      setLoading(false);
    }
    fetchData();

    if (userInfo) {
      setIsAuthenticated(true);
      if (userInfo.role === "ADMIN") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  if (loading) {
    return (
      <AdminLayout menuSelection={option}>
        <h1>Đang tải trang ...</h1>
      </AdminLayout>
    );
  }

  // (Math.random() + 1).toString(36).substring(3);

  const IsPaidHander = async (record) => {
    await axios.get(`http://localhost:8080/orders/paid/${record._id}`);
    message.success("Cập nhập thanh toán thành công");
  };

  const userColumns = [
    {
      title: "Email",
      dataIndex: "email",
      key: (Math.random() + 1).toString(36).substring(7),
    },
    { title: "Tên", dataIndex: "name", key: "" },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNum",
      key: "",
      render: (text) => <Text>0{text}</Text>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "",
      render: (text) => (text === "ONLINE" ? "Trực tuyến" : "Ngoại tuyến"),
    },
    {
      title: "Quyền",
      dataIndex: "role",
      key: "",
      render: (text) => (text === "ADMIN" ? "Đã cấp quyền" : "Không có quyền"),
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a href={`/admin/user/${record._id}`}>Cấp quyền</a>
          <a
            href={`/admin/${option}`}
            onClick={async () => {
              await axios.delete(
                `http://localhost:8080/${option}/${record._id}`
              );
            }}
          >
            Xóa
          </a>
        </Space>
      ),
    },
  ];

  const productColumns = [
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "description",
      render: (text) => <img alt={text} src={text} style={{ width: 50 }} />,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <a
          href={`http://localhost:3000/view-product/${text
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "")}`}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Đánh giá",
      dataIndex: "rating",
      key: "rating",
      render: (text) => {
        return <Text>{text} / 5</Text>;
      },
    },
    {
      title: "Danh mục",
      dataIndex: "categoryId",
      key: "category",
      render: (text) => {
        return (
          <a href={`http://localhost:3000/admin/category/${text}`}>{text}</a>
        );
      },
    },
    {
      title: "Còn",
      dataIndex: "countInStock",
      key: "countInStock",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Giá (VND)",
      dataIndex: "price",
      key: "price",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a
            href={`/admin/product/${record._id}`}
            onClick={() => console.log(record)}
          >
            Sửa
          </a>

          <a
            href={`/admin/${option}`}
            onClick={async () =>
              await axios.delete(`http://localhost:8080/products/${record._id}`)
            }
          >
            Xóa
          </a>
        </Space>
      ),
    },
  ];

  const categoryColumns = [
    { title: "Tên danh mục", dataIndex: "name", key: "name" },
    { title: "Mô tả", dataIndex: "description", key: "description" },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a href={`http://localhost:3000/admin/category/${record._id}`}>Sửa</a>
          <a
            href="category"
            onClick={async () => {
              try {
                message.success("Xóa thành công");
                await axios.delete(
                  `http://localhost:8080/category/${record._id}`
                );
              } catch (err) {
                message.error(err);
              }
            }}
          >
            Xóa
          </a>
        </Space>
      ),
    },
  ];

  const orderColumns = [
    { title: "Mã đơn", dataIndex: "_id", key: "_id" },
    {
      title: "Tài khoản",
      dataIndex: "userId",
      key: "userId",
      render: (text) => (
        <a href={`http://localhost:3000/admin/user/${text}`}>{text}</a>
      ),
    },
    {
      title: "Thanh toán",
      dataIndex: "isPaid",
      key: "isPaid",
      render: (text) =>
        text === true ? <CheckOutlined /> : <ExclamationOutlined />,
    },

    {
      title: "Ngày tạo đơn",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        const date = new Date(text);

        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "shippingAdress",
      key: "phoneNum",
      render: (text) => {
        return text?.phoneNum ? `0${text?.phoneNum}` : "";
      },
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (text) => (text === "CASH" ? "Tiền mặt" : "Chuyển khoản"),
    },
    {
      title: "Tổng tiền (VND)",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text) => {
        return `${text} `;
      },
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a href="/admin/orders" onClick={() => IsPaidHander(record)}>
            Thanh toán
          </a>
          <a href={`http://localhost:3000/admin/order/${record._id}`}>Xem</a>
          <a
            href="orders"
            onClick={async () => {
              await axios.delete(`http://localhost:8080/orders/${record._id}`);
            }}
          >
            Xóa
          </a>
        </Space>
      ),
    },
  ];

  return (
    <AdminLayout menuSelection={option}>
      {option === "products" ? (
        <div>
          <h3>Quản lý sản phẩm</h3>
          <Button
            onClick={() => {
              window.location.href = "http://localhost:3000/add/product";
            }}
            type="primary"
            style={{ float: "right" }}
          >
            Thêm sản phẩm
          </Button>
          <br />
          <br />
          <Table
            style={{ textAlignLast: "center" }}
            columns={productColumns}
            dataSource={getData}
            bordered
            scroll={true}
          />
        </div>
      ) : (
        ""
      )}
      {option === "users" ? (
        <>
          <h3>Quản lý tài khoản</h3>
          <Table
            style={{ textAlignLast: "center" }}
            columns={userColumns}
            dataSource={getData}
            bordered
            scroll={true}
          />
        </>
      ) : (
        ""
      )}
      {option === "orders" ? (
        <>
          <h3>Quản lý đặt hàng</h3>
          <Table
            style={{ textAlignLast: "center" }}
            columns={orderColumns}
            dataSource={getData}
            bordered
            scroll={true}
          />
        </>
      ) : (
        ""
      )}
      {option === "category" ? (
        <>
          <h3>Quản lý danh mục</h3>
          <Button
            onClick={() => {
              window.location.href = "/add/category/";
            }}
            type="primary"
            style={{ float: "right" }}
          >
            Thêm danh mục
          </Button>
          <br />
          <br />
          <Table
            style={{ textAlignLast: "center" }}
            columns={categoryColumns}
            dataSource={getData}
            bordered
            scroll={true}
          />
        </>
      ) : (
        ""
      )}
    </AdminLayout>
  );
}

export default AdminDashboard;
