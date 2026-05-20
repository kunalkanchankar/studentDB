import React, { useEffect, useState } from "react";
import axios from "axios";

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/orders")
      .then(res => setOrders(res.data));
  }, []);

  return (
    <div>
      <h2>Order History</h2>

      {orders.map(order => (
        <div key={order._id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <p>Food: {order.foodName}</p>
          <p>Price: ₹{order.price}</p>
          <p>Quantity: {order.quantity}</p>
          <p>Total: ₹{order.totalAmount}</p>
          <p>Time: {new Date(order.timestamp).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default OrderHistory;