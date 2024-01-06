import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReviewCard from "../Review/ReviewCard";
import { useSelector } from "react-redux";
import ReviewCardByUserIdAndProductId from "../Review/ReviewCardByUserIdAndProductId";

function ProductDetailCard() {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = useSelector((state) => state.user.user.id);
  const product = location.state;
  const [wishlistAdded, setWishlistAdded] = useState(false);

  const addToWishlist = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/wishlist/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId, productId: product.id }),
      });

      if (response.ok) {
        setWishlistAdded(true);
      } else {
        console.error("Failed to add to wishlist");
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const removeFromWishlist = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/wishlist/remove/${userId}?productId=${product.id}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        setWishlistAdded(false);
      } else {
        console.error("Failed to remove from wishlist");
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  const checkWishlistStatus = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/wishlist/check/${userId}/${product.id}`
      );
      if (response.ok) {
        const isInWishlist = await response.json();
        setWishlistAdded(isInWishlist);
      } else {
        console.error("Failed to check wishlist status");
      }
    } catch (error) {
      console.error("Error checking wishlist status:", error);
    }
  };

  useEffect(() => {
    checkWishlistStatus();
  }, []); // Empty dependency array to run only on component mount

  const back = () => {
    navigate(-1);
  };

  const buttonStyle = {
    backgroundColor: "blue",
    color: "white",
    padding: "10px 18px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          margin: "8px",
          justifyContent: "space-between",
        }}
      >
        <div>
          <button style={buttonStyle} onClick={back}>
            Back
          </button>
        </div>
        <div>
          {wishlistAdded ? (
            <button style={buttonStyle} onClick={removeFromWishlist}>
              Remove from Wishlist
            </button>
          ) : (
            <button style={buttonStyle} onClick={addToWishlist}>
              Add to Wishlist
            </button>
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          padding: "10px",
        }}
      >
        <div style={{ flex: "1", marginRight: "10px" }}>
          <img
            src={product.imageUrl}
            alt={product.title}
            style={{ width: "100%", height: "auto", borderRadius: "4px" }}
          />
        </div>
        <div style={{ flex: "2" }}>
          <h3>{product.title}</h3>
          <p style={{ textAlign: "left" }}>{product.description}</p>
          <table
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <tr>
              <td>
                <strong>Size:</strong>
              </td>
              <td>{product.size}</td>
            </tr>
            <tr>
              <td>
                <strong>Price:</strong>
              </td>
              <td>{product.price}</td>
            </tr>
            <tr>
              <td>
                <strong>Quantity:</strong>
              </td>
              <td>{product.quantity}</td>
            </tr>
          </table>
        </div>
      </div>
      <h3 style={{ textAlign: "left", marginLeft: "20px" }}>
        Product Feedback
      </h3>
      <ReviewCard productId={product.id} />
    </div>
  );
}

export default ProductDetailCard;
