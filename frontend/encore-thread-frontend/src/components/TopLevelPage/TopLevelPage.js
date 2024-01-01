import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductDetailCard from "../Product/ProductDetailCard";
import ProductComponent from "../Product/ProductComponent";
import WishlistComponent from "../Wishlist/WishlistComponent";
import Register from "../../Register";
import Login from "../../Login";
import MainProfile from "../UserProfile/MainProfile";
import ReviewCard from "../Review/ReviewCard";
import AddReviewCard from "../Review/AddReviewCard";
import EditReviewCard from "../Review/EditReviewCard";

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
          <a href="/reviews">Reviews</a>
        </li>
        <li>
          <a href="/add/reviews">Add Reviews</a>
        </li>
        <li>
          <a href="/register">Register</a>
        </li>
        <li>
          <a href="/login">Login</a>
        </li>
        <li>
          <a href="/userProfile">MainProfile</a>
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
              <Route exact path="/" element={<HomeComponent />} />
              <Route path="/products" element={<ProductComponent />} />
              <Route path="/products/:productId" element={<ProductDetailCard />} />
              <Route path="/reviews" element={<ReviewCard />} />
              <Route path="/edit/:reviewId" element={<EditReviewCard/>} />
              <Route path="/add/reviews" element={<AddReviewCard />} />
              <Route path="/:userId/wishlist" element={<WishlistComponent/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/user/:userId" element={<MainProfile/>} />
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
