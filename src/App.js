import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Fragment } from "react";

import AllProducts from "./pages/products/AllProducts";
import ViewProduct from "./pages/products/ViewProduct";
import SearchProduct from "./pages/products/SearchProduct";
import ProductByCategory from "./pages/categories/ProductsByCategory";
import Login from "./pages/auth/Login";
import Logout from "./pages/auth/Logout";
import CartView from "./pages/cart/CartView";
import SortProducts from "./pages/products/SortProducts";
import AccountSettings from "./pages/account/AccountSettings";
import CheckoutView from "./pages/checkout/CheckoutView";
import CheckoutDone from "./pages/checkout/CheckoutDone";
import AdminDashboard from "./pages/admin/dashboard/AdminDashboard";
import AdminDashboardHome from "./pages/admin/dashboard/AdminHome";
import ProductEdit from "./pages/admin/ProductEdit/ProductEdit";
import OrderDetail from "./pages/admin/OrderDetail/OrderDetail";
import UserEdit from "./pages/admin/UserEdit/UserEdit";
import CategoryEdit from "./pages/admin/CategoryEdit/CategoryEdit";
import AddProduct from "./pages/admin/ProductEdit/AddProduct";
import AddCategory from "./pages/admin/CategoryEdit/AddCategory";

function App() {
  return (
    <div className="App">
      <Routes>
        <Fragment>
          <Route path="/" element={<AllProducts />}></Route>
          <Route path="view-product/:productSlug" element={<ViewProduct />} />
          <Route path="find-product/:search" element={<SearchProduct />} />
          <Route path="category/:category" element={<ProductByCategory />} />
          <Route path="sort/:orderBy/:type" element={<SortProducts />} />
          <Route path="cart" element={<CartView />} />
          <Route path="checkout" element={<CheckoutView />} />
          <Route path="checkout/done" element={<CheckoutDone />} />
          <Route path="login" element={<Login />} />
          <Route path="account/setting" element={<AccountSettings />} />
          <Route path="logout" element={<Logout />} />
          <Route path="admin/:option" element={<AdminDashboard />} />
          <Route path="admin/dashboard" element={<AdminDashboardHome />} />
          <Route path="admin/product/:_id" element={<ProductEdit />} />
          <Route path="add/product/" element={<AddProduct />} />
          <Route path="add/category/" element={<AddCategory />} />
          <Route path="admin/user/:_id" element={<UserEdit />} />
          <Route path="admin/category/:_id" element={<CategoryEdit />} />
          <Route path="admin/order/:_id" element={<OrderDetail />} />
        </Fragment>
      </Routes>
    </div>
  );
}

export default App;
