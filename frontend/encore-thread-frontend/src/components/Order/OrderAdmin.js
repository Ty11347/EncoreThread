import React, { useEffect, useState } from 'react'
import "./Order.css"
import { ORDER_STATUS, ORDER_STATUS_PENDING } from './OrderConstant'
import { useNavigate } from 'react-router-dom'
import SuccessMessage from './SuccessMessage'

function OrderAdmin() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [isCreating, setIsCreating] = useState(false)
  const [orderStatus, setOrderStatus] = useState(ORDER_STATUS_PENDING)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    fetch("http://localhost:8080/api/orders")
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders: ", error))
  }, [])

  return (
    <div>
      <h1>Orders</h1>
      <div className='container'>
        <div className="new-order-container">
          <div className="new-order-form-container">
            <button className='new-order-button'
              onClick={() => setIsCreating(prev => !prev)}
            >
              Add Order
            </button>
            {
              isCreating && (
                <form className='new-order-form'
                  onSubmit={(e) => {
                    e.preventDefault()
                    const date = new Date(e.target.orderDate.value)
                    let orderDate = new Date()
                    orderDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate())
                    const newOrder = {
                      userId: e.target.userId.value,
                      orderDate: orderDate.toISOString(),
                      totalPrice: e.target.totalPrice.value,
                      orderStatus: orderStatus,
                    }
                    console.log(newOrder)
                    fetch('http://localhost:8080/api/orders', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(newOrder)
                    })
                      .then((response) => response.json())
                      .then((data) => {
                        setOrders(prev => [...prev, data])
                        setIsSuccess(true)
                        setTimeout(() => setIsSuccess(false), 3000)
                      })
                      .catch((error) => console.error('Error creating order: ', error))
                  }}
                >
                  <label htmlFor="userId">User ID <span className="required">*</span></label>
                  <input type="text" id="userId" name="userId" required />
                  <label htmlFor="orderDate">Order Date <span className="required">*</span></label>
                  <input type="date" id="orderDate" name="orderDate" defaultValue={new Date().toISOString().slice(0, 10)} required />
                  <label htmlFor="totalPrice">Total Price <span className="required">*</span></label>
                  <input type="text" id="totalPrice" name="totalPrice" required />
                  <label htmlFor="orderStatus">Order Status <span className="required">*</span></label>
                  <select name="orderStatus" id="orderStatus" value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)} required>
                    {
                      ORDER_STATUS.map((status) => <option key={status} value={status}>{status}</option>)
                    }
                  </select>
                  <button type="submit">Submit</button>
                </form>
              )
            }
          </div>
          {
            isSuccess &&
            <SuccessMessage message={"Order created successfully"}></SuccessMessage>
          }
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th className='th'>Order ID</th>
              <th className='th'>Customer ID</th>
              <th className='th'>Order Date</th>
              <th className='th'>Order Total</th>
              <th className="th">Shipping Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className='tr tr-hover' onClick={() => navigate(`/orders/${order.id}`, { state: { orderId: order.id, userId: order.userId, isAdmin: true } })}>
                <td>{order.id}</td>
                <td>{order.userId}</td>
                <td>{order.orderDate}</td>
                <td>{order.totalPrice}</td>
                <td className={`${order.orderStatus.toLowerCase()}`}>{order.orderStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderAdmin