import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function ProductCard({ id, imageUrl, title, description, size, price, quantity }) {
  const cartId = useSelector((state) => state.user.cartId);

  const addToCart = () => {
    console.log("Item added to cart");
    // TODO: add-to-cart logic
    const cartItem = {
      cartId: cartId,
      productId: id,
      quantity: 1,
    }
    fetch("http://localhost:8080/api/carts/item/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItem),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Item added to cart:", data);
        alert("Item added to cart!");
      })
      .catch((error) => {
        console.error("Error adding item to cart:", error);
      });
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "4px",
        padding: "10px",
        maxWidth: "400px",
      }}
    >
      <img
        src={imageUrl}
        style={{
          width: "100%",
          height: "300px",
          minWidth: "200px",
          maxWidth: "250px",
        }}
      />
      <h3 style={{height: "150px"}}>{title}</h3>
      <div style={{ textAlign: "left" }}>
        <p style={{ height: "200px" }}>
          {description ?? "No description yet."}
        </p>
        <p>Quantity: {quantity ===0 ? "Unavailable": quantity}</p>
        <p>Size : {size}</p>
        <p>Price : RM{price}</p>
      </div>
      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <Link
          to={`/products/${id}`}
          state={{ id, imageUrl, title, description, size, price, quantity }}
        >
          <button
            style={{
              backgroundColor: "blue",
              color: "white",
              padding: "10px 18px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            View Details
          </button>
        </Link>
      </div>
      <button
        onClick={addToCart}
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}
export default ProductCard;
