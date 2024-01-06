import React, { useState } from "react";
import { FaTrash, FaArrowRight } from "react-icons/fa"; // Import the delete icon from a library like react-icons

const CartItem = ({
  item,
  itemQuantity,
  cartItemId,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onDeleteCartItem,
  onOrderItem,
}) => {
  const [quantity, setQuantity] = useState(itemQuantity);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
    onIncreaseQuantity(cartItemId);
  };

  const handleDecrease = () => {
    if (quantity >= 1) {
      setQuantity(quantity - 1);
      onDecreaseQuantity(cartItemId);
    }
  };

  const handleDelete = () => {
    onDeleteCartItem(cartItemId, item.id);
  };

  const handleOrder = () => {
    onOrderItem(cartItemId, item.id, quantity, item.price);
  };

  return (
    <tr>
      <td>
        <img src={item.imageUrl} alt={item.name} width="100" height="100" />
      </td>
      <td>{item.name}</td>
      <td>${item.price}</td>
      <td style={{ minWidth: "300px" }}>
        <button className="quantity-button" onClick={handleDecrease}>
          -
        </button>
        <span className="quantity">{quantity}</span>
        <button className="quantity-button" onClick={handleIncrease}>
          +
        </button>
      </td>
      <td>${(quantity * item.price).toFixed(2)}</td>
      <td>
        <button className="delete-button" onClick={handleDelete}>
          <FaTrash className="delete-icon" />
        </button>
      </td>
      <td>
        <button className="order-button" onClick={handleOrder}>
          <FaArrowRight className="order-icon" />
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
