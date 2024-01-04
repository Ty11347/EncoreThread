import React, { useState } from "react";

const CartItem = ({ item, onIncreaseQuantity, onDecreaseQuantity }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
    onIncreaseQuantity(item.cart_item_id); // Notify the parent component about the quantity change
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      onDecreaseQuantity(item.cart_item_id); // Notify the parent component about the quantity change
    }
  };

  return (
    <tr>
      <td>{item.product_id}</td>
      <td>${item.price}</td>
      <td>
      <button className="quantity-button" onClick={handleDecrease}>-</button>
        <span className="quantity">{quantity}</span>
        <button className="quantity-button" onClick={handleIncrease}>+</button>
      </td>
      <td>${quantity * item.price}</td>
    </tr>
  );
};

export default CartItem;
