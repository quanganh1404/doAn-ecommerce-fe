import "./App.css";
import AllProducts from "./pages/products/AllProducts";
import ViewProduct from "./pages/products/ViewProduct";
import SearchProduct from "./pages/products/SearchProduct";
import ProductByCategory from "./pages/categories/ProductsByCategory";
import { Route, Routes } from "react-router-dom";
import { Fragment } from "react";
import Login from "./pages/auth/Login";
import Logout from "./pages/auth/Logout";
import CartView from "./pages/cart/CartView";
import SortProducts from "./pages/products/SortProducts";
import AccountSettings from "./pages/account/AccountSettings";

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
