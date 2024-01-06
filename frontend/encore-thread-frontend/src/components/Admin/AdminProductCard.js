import React from "react";
import {Link} from "react-router-dom";

function AdminProductCard({id, imageUrl, title, description, size, price, name, quantity, onEdit, refreshProducts}) {

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

  const handleDeleteProduct = async () => {
    const userConfirmed = window.confirm("Are you sure you want to delete this product? Id: " + id);

    if (userConfirmed) {
      try {
        const response = await fetch("http://localhost:8080/api/admin/products/" + id, {
          method: "DELETE"
        });

        if (response.ok) {
          console.log("Product deleted successfully.");
          refreshProducts();
        } else {
          console.error("Error deleting product:", response.status);
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
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

          <br/>

          <button
              onClick={handleDeleteProduct}
              style={{
                backgroundColor: "blue",
                color: "white",
                padding: "10px 18px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginTop: "15px",
              }}
          >
            Delete this Product
          </button>
        </div>
      </div>
  );
}

export default AdminProductCard;
