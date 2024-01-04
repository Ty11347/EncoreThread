import React, { useState, useEffect } from "react";
import CartItem from "./CartItem";
import "./Cart.css"; // Import CSS for styling

const Cart = () => {
  // Sample cart data (you can replace this with actual data)
  const initialCart = {
    cart_id: 1,
    user_id: 123,
    created_at: "2024-01-04 10:00:00",
    updated_at: "2024-01-04 14:30:00",
    status: "pending",
  };

  // Sample cart items data (you can replace this with actual data)
  const initialCartItems = [
    {
      cart_item_id: 1,
      cart_id: 1,
      product_id: 101,
      quantity: 2,
      price: 20,
      added_at: "2024-01-04 11:15:00",
    },
    {
      cart_item_id: 2,
      cart_id: 1,
      product_id: 102,
      quantity: 1,
      price: 30,
      added_at: "2024-01-04 12:45:00",
    },
  ];

  const [cart, setCart] = useState(initialCart);
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Function to increase the quantity of a specific item
  const increaseQuantity = (cartItemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.cart_item_id === cartItemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  // Function to decrease the quantity of a specific item
  const decreaseQuantity = (cartItemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.cart_item_id === cartItemId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  // Calculate the overall total
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const overallTotal = calculateTotal();

  useEffect(() => {
    // You can fetch cart data and cart items from an API here
    // and update the state using setCart and setCartItems
  }, []);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <div className="cart-status">
        <p>Status: {cart.status}</p>
        <p>Created At: {cart.created_at}</p>
        <p>Updated At: {cart.updated_at}</p>
      </div>
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
              key={item.cart_item_id}
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
      <button className="checkout-button">Checkout</button>
    </div>
  );
};

export default Cart;
