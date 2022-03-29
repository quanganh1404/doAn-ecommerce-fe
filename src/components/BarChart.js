import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BarChart as BarC,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import AdminLayout from "../components/AdminLayout";

function BarChart() {
  const [getData, setGetData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `${process.env.REACT_APP_BE_HOST}/orders/dashboard`
      );
      setGetData(response.data.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <AdminLayout menuSelection="dashboard">
        <h1>Đang tải trang ...</h1>
      </AdminLayout>
    );
  }
  return (
    <>
      <BarC
        width={1100}
        height={500}
        data={getData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="thang" name="Tháng" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" name="Doanh Thu (VND)" fill="#8884d8" />
      </BarC>
    </>
  );
}

export default BarChart;
