import React from "react";
import {Link} from "react-router-dom";

function AdminProductCard({id, imageUrl, title, description, size, price, name, quantity, onEdit}) {

  const handleEditProduct = () => {
    onEdit({
      id,
      imageUrl,
      title,
      description,
      size,
      price,
      name,
      quantity
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
        <h3>{title}</h3>
        <div style={{textAlign: "left"}}>
          <p style={{height: "100px"}}>{description ?? "No description yet."}</p>
          <p>Size : {size}</p>
          <p>Price : RM{price}</p>
        </div>
        <div
            style={{
              marginBottom: "20px",
            }}
        >
          <button
              onClick={handleEditProduct}
              style={{
                backgroundColor: "blue",
                color: "white",
                padding: "10px 18px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
          >
            Edit this Product
          </button>
        </div>
      </div>
  );
}

export default AdminProductCard;
