import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Order.css"

function OrderAdmin() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetch("http://localhost:8080/api/orders")
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders: ", error))
  }, [])

  return (
    <div>
      <h1>Orders (Admin)</h1>
      <div className='container'>
        <table className='table'>
          <thead>
            <tr>
              <th className='th'>Order ID</th>
              <th className='th'>Customer ID</th>
              <th className='th'>Order Date</th>
              <th className='th'>Order Total</th>
              <th className="th">Shipping Status</th>
              <th className="th">Address</th>
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
                <td>{order.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderAdmin