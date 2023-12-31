import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductDetailCard from "../Product/ProductDetailCard";
import ProductComponent from "../Product/ProductComponent";
import WishlistComponent from "../Wishlist/WishlistComponent";
import OrderAdmin from "../Order/OrderAdmin";
import OrderComponent from "../Order/OrderComponent";
import OrderDetail from "../Order/OrderDetail";

const Sidebar = () => {
  return (
    <nav>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/products">Products</a>
        </li>
        <li>
          <a href="/admin/orders">Orders - Admin</a>
        </li>
        <li>
          <a href="/orders">Orders - User</a>
        </li>
      </ul>
    </nav>
  );
};

const TopLevelPage = () => {
  return (
    <Router>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <div style={{ width: "20%", background: "#f0f0f0" }}>
          <Sidebar />
        </div>
        <div style={{ width: "80%" }}>
          <main>
            <Routes>
              {/*here to add page components*/}
              <Route exact path="/" element={<HomeComponent />} />
              <Route path="/products" element={<ProductComponent />} />
              <Route path="/products/:productId" element={<ProductDetailCard />} />
              <Route path="/:userId/wishlist" element={<WishlistComponent/>} />
              <Route path="/admin/orders" element={<OrderAdmin/>}/>
              <Route path="/orders" element={<OrderComponent/>}/>
              <Route path="/orders/:orderId" element={<OrderDetail/>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

// temp use
const HomeComponent = () => <div>Home Page Component</div>;

export default TopLevelPage;
