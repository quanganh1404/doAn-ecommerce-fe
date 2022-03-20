import { message, PageHeader } from "antd";
import Text from "antd/lib/typography/Text";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../../../components/AdminLayout";
import { Switch } from "antd";

function UserEdit() {
  const { _id } = useParams();

  const [getUser, setGetUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState();

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`http://localhost:8080/users/${_id}`);
      setGetUser(response.data);
      response.data.role === "ADMIN" ? setIsAdmin(true) : setIsAdmin(false);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <AdminLayout menuSelection="users">
        <h1>Đang tải trang ...</h1>
      </AdminLayout>
    );
  }

  async function onChange(checked) {
    setIsAdmin(checked);

    const update = await axios.patch(`http://localhost:8080/users/${_id}`, {
      role: !isAdmin ? "ADMIN" : "CUSTOMER",
    });

    message.success(update.data.message);
  }

  return (
    <AdminLayout menuSelection="user">
      <PageHeader
        className="site-page-header-responsive"
        onBack={() => window.history.back()}
        title="Cấp quyền tài khoản"
        subTitle={_id}
      >
        <br />
        <Text strong>Tên chủ tài khoản: {getUser.name}</Text>
        <br />
        <Text strong>Email: {getUser.email}</Text>
        <br />
        <br />
        <Text strong>Cấp quyền quản trị: </Text>
        <Switch defaultChecked={isAdmin} onChange={onChange} />
      </PageHeader>
    </AdminLayout>
  );
}

export default UserEdit;
