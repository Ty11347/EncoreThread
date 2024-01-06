import React from 'react';
import {useNavigate} from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const handleCheckOrderClick = () => {
    navigate('/orders');
  };
  return (
      <div>
        <h2>Payment Successful</h2>
        <p>Thank you for your purchase!</p>
        <p>Your payment was successful, and your order has been confirmed.</p>
        <button onClick={handleCheckOrderClick}>Check My Order</button>
      </div>
  );
};

export default PaymentSuccess;
