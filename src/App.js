import "./App.css";
import AllProducts from "./components/products/AllProducts";
import ViewProduct from "./components/products/ViewProduct";
import SearchProduct from "./components/products/SearchProduct";
import ProductByCategory from "./components/categories/ProductsByCategory";
import { Route, Routes } from "react-router-dom";
import { Fragment } from "react";
import Login from "./components/auth/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Fragment>
          <Route path="/" element={<AllProducts />}></Route>
          <Route path="view-product/:productSlug" element={<ViewProduct />} />
          <Route path="find-product/:search" element={<SearchProduct />} />
          <Route path="category/:category" element={<ProductByCategory />} />
          <Route path="login" element={<Login />} />
        </Fragment>
      </Routes>
    </div>
  );
}

export default App;
