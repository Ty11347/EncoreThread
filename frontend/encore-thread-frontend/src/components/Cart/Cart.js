import React, { useState, useEffect } from "react";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import "./Cart.css"; // Import CSS for styling


const Cart = () => {
  const user = useSelector((state) => state.user.user);
  const cartId = useSelector((state) => state.user.cartId);
  const [cartItems, setCartItems] = useState([]);
  const userId = user?.id;
  const navigate  = useNavigate();

  // Function to increase the quantity of a specific item
  const increaseQuantity = (cartItemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.cartItemId === cartItemId) {
        var updatedItem = { ...item, quantity: item.quantity + 1 };
        updateCartItems(updatedItem);
        return updatedItem;
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  // Function to decrease the quantity of a specific item
  const decreaseQuantity = (cartItemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.cartItemId === cartItemId && item.quantity >= 1) {
        var updatedItem = { ...item, quantity: item.quantity - 1 };
        updateCartItems(updatedItem);
        return updatedItem;
      }
      return item;
    });
    const filteredCartItems = updatedCartItems.filter(
      (item) => item.quantity !== 0
    );
    setCartItems(filteredCartItems);
  };

  // Calculate the overall total
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  };

  const overallTotal = calculateTotal();

  useEffect(() => {
    if (user) {
      fetchCartItems(userId);
    }
  }, [userId]);

  const fetchCartItems = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/carts/items/${userId}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const cartItems = await response.json();
        setCartItems(cartItems);
      } else {
        console.error("Failed to fetch cart items", response.status);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const updateCartItems = async (cartItem) => {
    console.log("cartItem updated: ", cartItem);
    await fetch("http://localhost:8080/api/carts/item/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItem),
    });
  };

  const clearCart = async () => {
    try {
      const response = await fetch(
          `http://localhost:8080/api/carts/delete/${cartId}`,
          {
            method: "DELETE",
          }
      );
      if (response.ok) {
        setCartItems([]);
      } else {
        console.error("Failed to clear cart", response.status);
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const checkoutOrder = async () => {
    await handleProductQuantityChange()
    // navigate('/transaction', { state: { userId, user, cartItems, cartId } });
  };

  const handleProductQuantityChange = async () => {
    try {
      for (const item of cartItems) {
        const response = await fetch("http://localhost:8080/api/admin/products/quantity/" +
            item.productId + "?quantityChange=-" + item.quantity,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
            });

        // if stock insufficient
        if (response.status === 409) {
          const availableQuantity = await response.text();
          console.error("Insufficient stock for product ID:", item.productId);
          alert("Insufficient stock for product ID " + item.productId +
              ": " + availableQuantity);
          return;
        } else if (!response.ok) {
          console.error("Error updating product quantity for product ID:", item.productId);
          return;
        }
      }

      navigate('/transaction', { state: { userId, user, cartItems, cartId } });

    } catch (e) {
      console.error("Error updating product quantity:", e);
    }
  };

  if (cartItems == null || cartItems.length === 0) {
    return <div className="cart">Your cart is empty.</div>;
  }
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <table className="cart-items">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price per item</th>
            <th>Quantity</th>
            <th>Total for item</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <CartItem
              key={item.cartItemId}
              item={item}
              onIncreaseQuantity={increaseQuantity}
              onDecreaseQuantity={decreaseQuantity}
            />
          ))}
        </tbody>
      </table>
      <div className="cart-total">
        <strong>Overall Total:</strong> ${overallTotal}
      </div>
      <div
        class="row"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          height: "100%",
        }}
      >
        <button className="clear-button" onClick={clearCart}>
          Clear
        </button>
        <button className="checkout-button" onClick={checkoutOrder}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
