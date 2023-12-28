import React from "react";
import { Link } from "react-router-dom";

function WishlistCard({ product, removeFromWishlist }) {
  //style
  const buttonStyle = {
    backgroundColor: "blue",
    color: "white",
    padding: "10px 10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <div style={{ textAlign: "left" }}>
      <div style={{ display: "flex", alignContent: "center", margin: "20px" }}>
        <img
          src={product.imageUrl}
          style={{
            width: "200px",
            height: "300px",
            borderRadius: "4px",
          }}
        />
        <div style={{ margin: "20px", width: "400px" }}>
          <h3>{product.name}</h3>
          <p>{product.description?? "No description yet."}</p>
          <div>
            <Link
              to={`/products/${product.id}`}
              state={{
                id: product.id,
                imageUrl: product.imageUrl,
                title: product.name,
                description: product.description ?? "No description yet.",
                size: product.size,
                price: product.price,
              }}
            >
              <button
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  padding: "10px 12px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pooriteinter",
                }}
              >
                View Details
              </button>
            </Link>
          </div>
        </div>
        <div>
          <button style={buttonStyle} onClick={() => removeFromWishlist()}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default WishlistCard;
