import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./OrderDetail.css";
import { ORDER_STATUS, ORDER_STATUS_CANCELLED, ORDER_STATUS_PENDING, ORDER_STATUS_PROCESSING, ORDER_STATUS_SHIPPED, ORDER_STATUS_SHIPPING } from "./OrderConstant";
import SuccessMessage from "./SuccessMessage";
import ReviewCardByUserIdAndProductId from "../Review/ReviewCardByUserIdAndProductId";

function OrderDetail() {
  const location = useLocation();
  const [orderId, setOrderId] = useState(location.state.orderId);
  const userId = location.state.userId;
  const isAdmin = location.state.isAdmin;
  const [order, setOrder] = useState({});
  const [orderItems, setOrderItems] = useState([]);
  const [orderStatus, setOrderStatus] = useState(order.orderStatus);
  const [isStatusSuccess, setIsStatusSuccess] = useState(false);
  const [address, setAddress] = useState(""); 
  const [isAddressSuccess, setIsAddressSuccess] = useState(false);
  const [reviewExists, setReviewExists] = useState({});

  useEffect(() => {
    // get order
    fetch(`http://localhost:8080/api/orders/order/${orderId}`)
      .then((response) => response.json())
      .then((data) => setOrder(data))
      .catch((error) => console.log("Error fetching order: ", error));

    // get order details
    fetch(`http://localhost:8080/api/orderdetails/order/${orderId}`)
      .then((response) => response.json())
      .then((data) => setOrderItems(data))
      .catch((error) => console.log("Error fetching order items: ", error));
  }, [orderId]);

  useEffect(() => {
    setOrderStatus(order.orderStatus);
    setAddress(order.address);
  }, [order]);

  useEffect(() => {
    // console.log(orderItems);
  });

  useEffect(() => {
    const fetchReviews = async () => {
      const updatedReviewStatus = { ...reviewExists };

      for (const orderItem of orderItems) {
        try {
          const response = await fetch(
            `http://localhost:3000/api/reviews/get/user/product?userId=${userId}&productId=${orderItem.productId}`
          );

          if (response.ok) {
            const reviewData = await response.json();
            if (reviewData) {
              updatedReviewStatus[orderItem.productId] = true;
            }
          } else {
            throw new Error("Review not found");
          }
        } catch (error) {
          console.error("Error fetching review");
        }
      }
      setReviewExists(updatedReviewStatus);
    };

    fetchReviews();
  }, [orderId, userId, orderItems]);

  return (
    <div>
      <h1>Order {order.id}</h1>
      {isAdmin && (
        <div className="status-form-container">
          <form
            className="status-form"
            onSubmit={(e) => {
              e.preventDefault();
              fetch(`http://localhost:8080/api/orders/update`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...order, orderStatus: orderStatus }),
              })
                .then((response) => response.json())
                .then((data) => {
                  setOrder(data);
                  setOrderId(data.id);
                  setIsStatusSuccess(true);
                  setTimeout(() => setIsStatusSuccess(false), 3000);
                })
                .catch((error) =>
                  console.error("Error updating order status: ", error)
                );
            }}
          >
            <label htmlFor="orderStatus">Update Order Status</label>
            <select
              name="orderStatus"
              id="orderStatus"
              value={orderStatus}
              onChange={(e) => setOrderStatus(e.target.value)}
              required
            >
              {ORDER_STATUS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <button type="submit">Submit</button>
          </form>
          {isStatusSuccess && (
            <SuccessMessage
              message={"Order status updated successfully"}
            ></SuccessMessage>
          )}
        </div>
      )}
      <div className="outer-container">
        <div className="details-outer-container">
          <div className="details-container">
            {isAdmin && <p>Customer ID: {userId}</p>}
            <p>{order.orderStatus}</p>
            <p>{order.orderDate}</p>
            <p>Total Price: RM {order.totalPrice}</p>
            <p style={{width: "fit-content"}}>Address: </p>
            <p>{order.address}</p>
          </div>
        </div>
        {
          order.orderStatus === ORDER_STATUS_PENDING || order.orderStatus === ORDER_STATUS_PROCESSING
          ? <form 
              className="address-form"
              onSubmit={(e) => {
                e.preventDefault();
                fetch(`http://localhost:8080/api/orders/update`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ ...order, address: address }),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    setOrder(data);
                    setOrderId(data.id);
                    setIsAddressSuccess(true);
                    setTimeout(() => setIsAddressSuccess(false), 3000);
                  })
                  .catch((error) =>
                    console.error("Error updating address: ", error)
                  );
              }}
            >
              <label htmlFor="address">Change Address</label>
              <textarea name="address" id="address" cols="30" rows="10" value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
              <button type='submit'>Submit</button>
            </form>
          : order.orderStatus === ORDER_STATUS_SHIPPING
          ? <p className="disable-address">Unable to change address as order has been shipped out.</p>
          : order.orderStatus === ORDER_STATUS_SHIPPED
          ? <p className="disable-address">Unable to change address as order has been delivered.</p>
          : order.orderStatus === ORDER_STATUS_CANCELLED
          ? <p className="disable-address">Unable to change address as order has been cancelled.</p>
          : <p className="disable-address">Unable to change address.</p>
        }
      </div>
      <div className="outer-container">
        {isAddressSuccess && (
          <SuccessMessage
          message={"Address updated successfully"}
          ></SuccessMessage>
        )}
      </div>
      <div className="product-container">
        {orderItems.map((orderItem) => (
          <div key={orderItem.productName} className="product-card">
            <img
              src={orderItem.productImageURL}
              alt={orderItem.productName}
              className="product-image"
            />
            <h3>{orderItem.productName}</h3>
            <div className="product-description-container">
              <p style={{ height: "100px" }}>
                {orderItem.productDescription ?? "No description yet."}
              </p>
              <p>Price : RM {orderItem.price}</p>
              <p>Quantity : {orderItem.quantity}</p>
            </div>

            <h4>Total: RM {orderItem.price * orderItem.quantity}</h4>
            {
              !isAdmin &&
              orderStatus === ORDER_STATUS_SHIPPED &&
              (
                reviewExists[orderItem.productId] ? (
                  <div>
                    <h4>My Review</h4>
                    <ReviewCardByUserIdAndProductId
                      productId={orderItem.productId}
                      userId={userId}
                    />
                  </div>
                ) : (
                  <Link
                    to={`/add/reviews/${userId}/${orderItem.productId}`}
                    params={{ userId: userId, productId: orderItem.productId }}
                  >
                    <button type="button">Add Review</button>
                  </Link>
                )
              )
            }
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderDetail;
