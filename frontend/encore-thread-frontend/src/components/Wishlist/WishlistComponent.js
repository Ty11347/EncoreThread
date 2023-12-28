import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import WishlistCard from "./WishlistCard";

const WishlistComponent = () => {
  const [wishlist, setWishlist] = useState([]);
  const { userId } = useParams();

  const fetchWishlist = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/wishlist/${userId}`
      );
      if (response.ok) {
        const data = await response.json();
        setWishlist(data);
      } else {
        console.error("Failed to fetch wishlist");
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeFromWishlist = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/wishlist/remove/${userId}?productId=${productId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setWishlist(wishlist.filter((product) => product.id !== productId));
      } else {
        // Handle errors
        console.error("Failed to remove from wishlist");
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  return (
    <div>
      {wishlist.map((product) => (
        <WishlistCard
          key={product.id}
          product={product}
          removeFromWishlist={() => removeFromWishlist(product.id)}
        />
      ))}
    </div>
  );
};

export default WishlistComponent;
