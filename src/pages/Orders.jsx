import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("fluffy_orders")) || [];

    setOrders(savedOrders);
  }, []);

  const clearOrders = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear all orders?"
    );

    if (confirmClear) {
      localStorage.removeItem("fluffy_orders");
      setOrders([]);
      setSelectedOrder(null);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Order History</h2>

        {orders.length > 0 && (
          <button
            className="btn btn-danger"
            onClick={clearOrders}
          >
            Clear Orders
          </button>
        )}
      </div>

      {orders.length === 0 ? (
        <div className="alert alert-info mt-3">
          No orders found.
        </div>
      ) : (
        <div className="table-responsive mt-3">
          <table className="table table-bordered">
            <thead className="table-success">
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Payment</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.customerName}</td>
                  <td>{order.phone}</td>
                  <td>{order.paymentMethod}</td>
                  <td>${order.total.toFixed(2)}</td>
                  <td>
                    <span className="badge bg-warning text-dark">
                      {order.status}
                    </span>
                  </td>
                  <td>{order.date}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => setSelectedOrder(order)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedOrder && (
        <div className="card shadow-sm mt-4">
          <div className="card-header bg-success text-white">
            Order Detail #{selectedOrder.id}
          </div>

          <div className="card-body">
            <p>
              <strong>Customer:</strong> {selectedOrder.customerName}
            </p>

            <p>
              <strong>Phone:</strong> {selectedOrder.phone}
            </p>

            <p>
              <strong>Address:</strong> {selectedOrder.address}
            </p>

            <p>
              <strong>Payment:</strong> {selectedOrder.paymentMethod}
            </p>

            <h5>Items</h5>

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                </tr>
              </thead>

              <tbody>
                {selectedOrder.items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price}</td>
                    <td>
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h5 className="text-end">
              Total: ${selectedOrder.total.toFixed(2)}
            </h5>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;