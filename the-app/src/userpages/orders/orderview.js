import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Order() {
  const [orders, setOrders] = useState([]);
  const currentTime = new Date().getTime();
  const timeLimit = 40 * 1000;

  const fetchUserOrders = (userId) => {
    // Make an API call to fetch the user's appointments based on their ID
    fetch(`http://127.0.0.1:8000/api/getOrderByUserId?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        const ordersWithTimestamp = data.map((order) => ({
          ...order,
          timestamp: Date.parse(order.created_at), // Convert created_at to a timestamp
          isDeletable: currentTime - Date.parse(order.created_at) < timeLimit, // Add isDeletable property based on timestamp comparison
          remainingTime: Math.floor((Date.parse(order.created_at) + timeLimit - currentTime) / 1000),
        }));
        setOrders(ordersWithTimestamp);
      })
      .catch((error) => {
        console.error('Error fetching user orders:', error);
      });
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      console.log(userData); // Add this line to check the userData object            
      fetchUserOrders(userData.user.id); //Fetch test requests based on userId
    }
  }, []);

  const deleteOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('user'); // Get the user's authentication token
      await axios.delete(`http://127.0.0.1:8000/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });
      //fetchUserOrders(); // Fetch orders again after deleting
      // Update orders state by filtering out the deleted order
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setOrders((prevOrders) => {
        return prevOrders.map((order) => {
          if (order.isDeletable && order.remainingTime > 0) {
            return {
              ...order,
              remainingTime: order.remainingTime - 1,
            };
          }
          return order;
        });
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="container">
      <div className="back-to-top"></div>
      <div>
        <h1>Orders</h1>
        {orders.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Notes</th>
                <th>Total</th>
                <th>Product Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.email}</td>
                  <td>{order.phone}</td>
                  <td>{order.address}</td>
                  <td>{order.notes}</td>
                  <td>{order.total}</td>
                  <td>{order.product}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => deleteOrder(order.id, order.timestamp)}
                      disabled={!order.isDeletable || order.remainingTime === 0}
                    >
                      {order.isDeletable
                        ? order.remainingTime > 0
                          ? `Delete in ${order.remainingTime}s`
                          : 'Delete'
                        : 'Delete'}
                    </button>
                  </td>
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