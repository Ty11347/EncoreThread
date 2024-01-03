import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductDetailCard from "../Product/ProductDetailCard";
import ProductComponent from "../Product/ProductComponent";
import WishlistComponent from "../Wishlist/WishlistComponent";
import OrderAdmin from "../Order/OrderAdmin";
import OrderComponent from "../Order/OrderComponent";
import OrderDetail from "../Order/OrderDetail";
import Register from "../../Register";
import Login from "../../Login";
import MainProfile from "../UserProfile/MainProfile";
import ReviewCard from "../Review/ReviewCard";
import AddReviewCard from "../Review/AddReviewCard";
import EditReviewCard from "../Review/EditReviewCard";
import '../../App.css';

const Sidebar = () => {
  return (
    <nav style={{ display: "flex", justifyContent: "space-around", background: "#faf8f8", padding: "10px 0" }}>
      <ul style={{ listStyle: "none", display: "flex", margin: 0, padding: 0 }}>
        {/* <li>
          <a href="/" className="buttonStyle">Home</a>
        </li> */}
        <li>
          <a href="/products" className="buttonStyle">Products</a>
        </li>
        <li>
          <a href="/admin/orders" className="buttonStyle">Orders-Admin</a>
        </li>
        {/* <li>
          <a href="/orders" className="buttonStyle">Orders-Users</a>
        </li> */}
        <li>
          <a href="/register" className="buttonStyle">Register</a>
        </li>
        {/* <li>
          <a href="/userProfile" className="buttonStyle">Main Profile</a>
        </li>         */}
        <li>
          <a href="/login" className="buttonStyle">Login</a>
        </li>
        <li>
          <a href="/login" className="buttonStyle">Logout</a>
        </li>
      </ul>
    </nav>
  );
};

const TopLevelPage = () => {
  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Sidebar />
        <div style={{ width: "100%" }}>
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
              <Route path="/reviews" element={<ReviewCard />} />
              <Route path="/edit/:reviewId" element={<EditReviewCard/>} />
              <Route path="/add/reviews/:userId/:productId" element={<AddReviewCard />} />
              <Route path="/:userId/wishlist" element={<WishlistComponent/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/login" element={<Login/>} />
              <Route  path="/user/:userId" element={<MainProfile/>} />
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
