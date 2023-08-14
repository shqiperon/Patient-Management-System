import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

function Order() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div>
    <div className='container py-4'>
      <h1>Orders</h1>
      {orders.length > 0 ? (
        <table className="table" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '8px' }}>ID</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Email</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Phone</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Address</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Notes</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td style={{ border: '1px solid black', padding: '8px' }}>{order.id}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{order.email}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{order.phone}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{order.address}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{order.notes}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
    </div>
  );
}

export default Order;
