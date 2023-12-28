import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductDetailCard from "../Product/ProductDetailCard";
import ProductComponent from "../Product/ProductComponent";
import WishlistComponent from "../Wishlist/WishlistComponent";

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
      </ul>
    </nav>
  );
};

const TopLevelPage = () => {
  return (
    <Router>
      <div style={{ display: "flex" }}>
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
