import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './OrderDetail.css'
import { ORDER_STATUS } from './OrderConstant'
import SuccessMessage from './SuccessMessage'

function OrderDetail() {
  const location = useLocation()
  const [orderId, setOrderId] = useState(location.state.orderId)
  const userId = location.state.userId
  const isAdmin = location.state.isAdmin
  const [order, setOrder] = useState({})
  const [orderItems, setOrderItems] = useState([])
  const [orderStatus, setOrderStatus] = useState(order.orderStatus)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    // get order
    fetch(`http://localhost:8080/api/orders/order/${orderId}`)
      .then((response) => response.json())
      .then((data) => setOrder(data))
      .catch((error) => console.log('Error fetching order: ', error))

    // get order details
    fetch(`http://localhost:8080/api/orderdetails/order/${orderId}`)
      .then((response) => response.json())
      .then((data) => setOrderItems(data))
      .catch((error) => console.log('Error fetching order items: ', error))
  }, [orderId])

  useEffect(() => {
    setOrderStatus(order.orderStatus)
  }, [order])

  return (
    <div>
      <h1>Order {order.id}</h1>
      <div className="status-form-container">
        <form className="status-form" onSubmit={(e) => {
          e.preventDefault()
          fetch(`http://localhost:8080/api/orders/update`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({...order, orderStatus: orderStatus})
          })
            .then((response) => response.json())
            .then((data) => {
              setOrder(data)
              setOrderId(data.id)
              setIsSuccess(true)
              setTimeout(() => setIsSuccess(false), 3000)
            })
            .catch((error) => console.error('Error updating order status: ', error))
        }}>
          <label htmlFor="orderStatus">Update Order Status</label>
          <select name="orderStatus" id="orderStatus" value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)} required>
            {
              ORDER_STATUS.map((status) => <option key={status} value={status}>{status}</option>)
            }
          </select>
          <button type="submit">Submit</button>
        </form>
        {
          isSuccess &&
          <SuccessMessage message={"Order status updated successfully"}></SuccessMessage>
        }
      </div>
      <div className='details-outer-container'>
        <div className='details-container'>
          {
            isAdmin &&
            <p>Customer ID: {userId}</p>
          }
          <p>{order.orderStatus}</p>
          <p>{order.orderDate}</p>
          <p>Total Price: RM {order.totalPrice}</p>
        </div>
      </div>
      <div className="product-container">
        {
          orderItems.map((orderItem) =>
            <div key={orderItem.productName} className='product-card'>
              <img
                src={orderItem.productImageURL}
                alt={orderItem.productName}
                className='product-image'
              />
              <h3>{orderItem.productName}</h3>
              <div className='product-description-container'>
                <p style={{ height: "100px" }}>{orderItem.productDescription ?? "No description yet."}</p>
                <p>Price : RM {orderItem.price}</p>
                <p>Quantity : {orderItem.quantity}</p>
              </div>
              <h4>Total: RM {orderItem.price * orderItem.quantity}</h4>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default OrderDetail