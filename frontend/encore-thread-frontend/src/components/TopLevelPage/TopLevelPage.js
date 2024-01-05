import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
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
import AdminManageProduct from "../Admin/ManageProductsComponent";
import PaymentPage from "../Transaction/PaymentPage";
import PaymentSuccess from "../Transaction/PaymentSuccess";

import '../../App.css';
import { useSelector } from 'react-redux';
import Cart from "../Cart/Cart";


const Navbar = () => {
  const user = useSelector(state => state.user.user);
  const userId = user?.id;
  const [isAdmin, setIsAdmin]=useState(false);

  const checkUserRole = async(userId)=>{
    try{
      const response = await fetch(
        `http://localhost:8080/api/user/${userId}/role`,{
          method: 'GET',
          headers: {
            'Accept': 'text/plain', // Changed to expect plain text
          }
        }
      );
      if (response.ok){
        const role = await response.text();
        setIsAdmin(role === 'Admin');
      }else{
        console.error("Failed to fetch user role", response.status);
      }
    }catch(error){
      console.error("Error fetching user role:", error);
    }
  };

  useEffect(()=>{
    if(user){
      checkUserRole(userId);
    }
  },[user, userId]);

  if (user) {
    return (
        <nav style={{display: "flex", justifyContent: "space-around", background: "#faf8f8", padding: "10px 0"}}>
          <ul style={{listStyle: "none", display: "flex", margin: 0, padding: 0}}>
            {!isAdmin && (
                <li>
                  <Link to={`/products`} className="buttonStyle">
                    Products
                  </Link>
                </li>
            )}
            {isAdmin && (
                <li>
                  <Link to={`/admin`} className="buttonStyle">
                    Manage Products
                  </Link>
                </li>
            )}
            {isAdmin && (
                <li>
                  <Link to={`/admin/orders`} className="buttonStyle">
                    Orders
                  </Link>
                </li>
            )}
            {!isAdmin && (
                <li>
                  <Link to={`/orders`} className="buttonStyle">
                    Orders
                  </Link>
                </li>
            )}

            <li>
              <Link to={`/cart`} className="buttonStyle">
                Cart
              </Link>
            </li>

            <li>
              <Link to={`/user/${userId}`} className="buttonStyle">
                Main Profile
              </Link>
            </li>

            <li>
              <Link to={`/transaction`} className="buttonStyle">
                Transaction
              </Link>
            </li>

            <li>
              <a href="/login" className="buttonStyle">Logout</a>
            </li>
          </ul>
        </nav>
    );
  } else {
    return (
      <nav style={{ display: "flex", justifyContent: "space-around", background: "#faf8f8", padding: "10px 0" }}>
        <ul style={{ listStyle: "none", display: "flex", margin: 0, padding: 0 }}>
          <li>
            <a href="/register" className="buttonStyle">Register</a>
          </li>
          <li>
            <a href="/login" className="buttonStyle">Login</a>
          </li>
        </ul>
      </nav>
    );
  }
};

const TopLevelPage = () => {
  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
        <div style={{ width: "100%" }}>
          <main>
            <Routes>
              {/*here to add page components*/}
              <Route exact path="/" />
              <Route path="/products" element={<ProductComponent />} />
              <Route path="/products/:productId" element={<ProductDetailCard />} />s
              <Route path="/admin/orders" element={<OrderAdmin />} />
              <Route path="/orders" element={<OrderComponent />} />
              <Route path="/orders/:orderId" element={<OrderDetail />} />
              <Route path="/reviews" element={<ReviewCard />} />
              <Route path="/edit/:reviewId" element={<EditReviewCard />} />
              <Route path="/add/reviews/:userId/:productId" element={<AddReviewCard />} />
              <Route path="/:userId/wishlist" element={<WishlistComponent/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/user/:userId" element={<MainProfile/>} />
              <Route path="/admin" element={<AdminManageProduct/>} />
              <Route path="/cart" element={<Cart/>} />
              <Route path="/transaction" element={<PaymentPage/>} />
              <Route path="/payment-success" element={<PaymentSuccess/>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default TopLevelPage;
