import React, {useState} from "react";
import "./PaymentPage.css";
import {useNavigate, useLocation} from 'react-router-dom';

const PaymentPage = () => {
  const navigate = useNavigate();
  const {userId, user, cartItems, cartId} = useLocation().state;
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");

  const clearCart = async () => {
    try {
      for(const item of cartItems) {
        const response = await fetch(
          "http://localhost:8080/api/carts/item/delete",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
          }
        );
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const handleProceed = () => {
    if (
        cardholderName.trim() === '' ||
        cardNumber.trim() === '' ||
        expiryMonth === '' ||
        expiryYear.trim() === '' ||
        cvv.trim() === ''
    ) {
      alert('Please fill in all required fields.');
    } else {
      console.log('Payment details submitted:', {
        cardholderName,
        cardNumber,
        expiryMonth,
        expiryYear,
        cvv,
      });

      handleUpdateOrder().then(r => navigate('/payment-success'));
    }
  };

  const handleUpdateOrder = async () => {
    try {
      const orderData = {
        userId: userId,
        orderStatus: "Processing",
        address: user.address ?? "1234 Main St, San Francisco, CA 94123",
        orderDate: new Date().toISOString(),
        productIds: cartItems.map((item) => item.productId),
        quantities: cartItems.map((item) => item.quantity),
        prices: cartItems.map((item) => item.price),
      };
      const response = await fetch("http://localhost:8080/api/orders/dto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        console.log("Order placed successfully!");
        clearCart();
      } else {
        console.error("Failed to create order", response.status);
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  }

  const formatCardNumber = (value) => {
    const numericValue = value.replace(/\D/g, '');
    let formattedValue = numericValue.replace(/(\d{4})/g, '$1 ').trim();
    formattedValue = formattedValue.slice(0, 19);
    setCardNumber(formattedValue);
  };

  const handleCardNumberChange = (e) => {
    formatCardNumber(e.target.value);
  };

  const handleExpiryYearChange = (e) => {
    const numericValue = e.target.value.replace(/\D/g, '').slice(0, 4);
    setExpiryYear(numericValue);
  };

  const handleCvvChange = (e) => {
    const numericValue = e.target.value.replace(/\D/g, '').slice(0, 3);
    setCvv(numericValue);
  };

  const handleExpiryMonthChange = (e) => {
    setExpiryMonth(e.target.value);
  };

  const monthOptions = [
    {value: '01', label: 'Jan'},
    {value: '02', label: 'Feb'},
    {value: '03', label: 'Mar'},
    {value: '04', label: 'Apr'},
    {value: '05', label: 'May'},
    {value: '06', label: 'Jun'},
    {value: '07', label: 'Jul'},
    {value: '08', label: 'Aug'},
    {value: '09', label: 'Sep'},
    {value: '10', label: 'Oct'},
    {value: '11', label: 'Nov'},
    {value: '12', label: 'Dec'}
  ];

  return (
      <div className="payment-container">
        <form>
          <div className="card-form">
            <h2 className="card-title">Payment</h2>
            <h3 className="card-sub-title">Enter your card information</h3>
            <div className="card-input">
              <label htmlFor="cardholderName" className="card-label">Name</label>
              <input
                  type="text"
                  id="cardholderName"
                  value={cardholderName}
                  required
                  onChange={(e) => setCardholderName(e.target.value)}
              />
            </div>
            <div className="card-input">
              <label htmlFor="cardNumber" className="card-label">Card Number</label>
              <input
                  type="text"
                  id="cardNumber"
                  value={cardNumber}
                  required
                  onChange={handleCardNumberChange}
              />
            </div>
            <div className="card-input-row">
              <div className="card-input" id="card-select-id">
                <label htmlFor="expiryMonth" className="card-label">
                  Month
                </label>
                <select
                    id="expiryMonth"
                    value={expiryMonth}
                    onChange={handleExpiryMonthChange}
                    className="card-input card-input-select"
                    required
                >
                  <option value="" disabled></option>
                  {monthOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                  ))}
                </select>
              </div>
              <div className="card-input">
                <label htmlFor="expiryYear" className="card-label">Year</label>
                <input
                    type="text"
                    id="expiryYear"
                    value={expiryYear}
                    required
                    onChange={handleExpiryYearChange}
                />
              </div>
              <div className="card-input">
                <label htmlFor="cvv" className="card-label">CVV</label>
                <input
                    type="text"
                    id="cvv"
                    value={cvv}
                    required
                    onChange={handleCvvChange}
                />
              </div>
            </div>
            <button type="button" className="pay-btn" onClick={handleProceed}>
              Make Payment
            </button>
          </div>
        </form>
      </div>
  );
};

export default PaymentPage;
