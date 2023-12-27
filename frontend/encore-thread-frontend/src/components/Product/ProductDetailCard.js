import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ProductDetailCard() {
  const location = useLocation();
  const product = location.state;
  const navigate = useNavigate();

  const [wishlistAdded, setWishlistAdded] = useState(false);

  const addToWishlist = () => {
    // TODO: Wishlist Logic
    // addToUserWishlist(user.id, product.id);
    setWishlistAdded(true);
  };

  const removeFromWishlist = () => {
    setWishlistAdded(false);
  };

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
          <p>{product.description}</p>
          <p>
            <strong>Size:</strong> {product.size}
          </p>
          <p>
            <strong>Price:</strong> {product.price}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailCard;
