import "./App.css";
import AllProducts from "./components/products/AllProducts";
import ViewProduct from "./components/products/ViewProduct";
import SearchProduct from "./components/products/SearchProduct";
import ProductByCategory from "./components/categories/ProductsByCategory";
import { Route, Routes } from "react-router-dom";
import { Fragment } from "react";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import CartView from "./components/cart/CartView";
import SortProducts from "./components/products/SortProducts";
import AccountSettings from "./components/account/AccountSettings";

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
          <Route path="login" element={<Login />} />
          <Route path="account/setting" element={<AccountSettings />} />
          <Route path="logout" element={<Logout />} />
        </Fragment>
      </Routes>
    </div>
  );
}

export default App;
