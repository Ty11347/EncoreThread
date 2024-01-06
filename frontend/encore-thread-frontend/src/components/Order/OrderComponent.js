import React, { useEffect, useState } from 'react'
import './Order.css'
import { ORDER_STATUS_CANCELLED, ORDER_STATUS_PENDING, ORDER_STATUS_PROCESSING, ORDER_STATUS_SHIPPED } from './OrderConstant'
import { useNavigate } from 'react-router-dom'
import SuccessMessage from './SuccessMessage'
import { useSelector } from 'react-redux';

function OrderComponent({ showingHistory }) {
  const navigate = useNavigate()
  const userId = useSelector(state => state.user.user.id);
  const [orders, setOrders] = useState([])
  const [isCanceling, setIsCanceling] = useState(false)
  const [cancelId, setCancelId] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    fetch(`http://localhost:8080/api/orders/user/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (showingHistory) {
          data = data.filter((order) => order.orderStatus == ORDER_STATUS_SHIPPED || order.orderStatus == ORDER_STATUS_CANCELLED)
        }
        setOrders(data)
      })
      .catch((error) => console.error('Error fetching orders: ', error))
    !!orders[0] && setCancelId(orders[0].id)
  }, [])

  return (
    <div>
      <h1>
        Orders
      </h1>
      <div className="container">
        <table className='table'>
          <thead>
            <tr>
              <th className='th'>Order ID</th>
              <th className='th'>Order Date</th>
              <th className='th'>Order Total</th>
              <th className="th">Shipping Status</th>
              <th className="th">Address</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className='tr tr-hover' onClick={() => navigate(`/orders/${order.id}`, { state: { orderId: order.id, userId: order.userId, isAdmin: false } })}>
                <td>{order.id}</td>
                <td>{order.orderDate}</td>
                <td>{order.totalPrice}</td>
                <td className={`${order.orderStatus.toLowerCase()}`}>{order.orderStatus}</td>
                <td>{order.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="cancel-order-container">
          <div className="cancel-order-form-container">
            <button className="cancel-order-button"
              onClick={() => setIsCanceling(prev => !prev)}
            >
              Cancel Order
            </button>
            {
              isCanceling &&
              <form className="cancel-order-form"
                onSubmit={(e) => {
                  e.preventDefault()
                  const order = orders.filter((order) => order.id === parseInt(cancelId))[0]
                  if (order.orderStatus === ORDER_STATUS_PENDING || order.orderStatus === ORDER_STATUS_PROCESSING) {
                    fetch(`http://localhost:8080/api/orders/update`, {
                      method: 'PUT',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        ...order,
                        orderStatus: ORDER_STATUS_CANCELLED
                      })
                    })
                      .then((response) => response.json())
                      .then((data) => {
                        setOrders(prev => prev.map((order) => order.id === data.id ? data : order))
                        setIsSuccess(true)
                        setTimeout(() => setIsSuccess(false), 3000)
                      })
                      .catch((error) => console.error('Error cancelling order: ', error))
                  } else {
                    alert('Order cannot be cancelled')
                  }
                }}
              >
                <label htmlFor="orderId">Order ID</label>
                <select name="orderId" id="orderId" value={cancelId}
                  onChange={(e) => setCancelId(e.target.value)}
                >
                  {
                    orders.map((order) => <option key={order.id} value={order.id}>{order.id}</option>)
                  }
                </select>
                <label htmlFor="cancelReason">Reason for Cancellation</label>
                <textarea name="cancelReason" id="cancelReason" cols="30" rows="10"></textarea>
                <button className="cancel-order-button" type='submit'>Submit</button>
              </form>
            }
          </div>
          {
            isSuccess &&
            <SuccessMessage message={"Order cancelled successfully"}></SuccessMessage>
          }
        </div>
      </div>
    </div>
  )
}

export default OrderComponent