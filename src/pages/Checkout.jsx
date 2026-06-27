import { useEffect } from "react";

function Checkout({ cart, setCart, setPage, user }) {
  useEffect(() => {
    if (!user) {
      alert("Please log in to view the checkout page.");
      setPage("login");
    }
  }, [user, setPage]);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = (e) => {
    e.preventDefault();

    const form = e.target;

    const newOrder = {
      id: Date.now(),
      customerName: user?.fullName || user?.username || form.customerName.value,
      phone: form.phone.value,
      address: form.address.value,
      paymentMethod: form.paymentMethod.value,
      items: cart,
      total: total,
      status: "Pending",
      date: new Date().toLocaleString(),
    };

    const oldOrders =
      JSON.parse(localStorage.getItem("fluffy_orders")) || [];

    localStorage.setItem(
      "fluffy_orders",
      JSON.stringify([...oldOrders, newOrder])
    );

    localStorage.removeItem("fluffy_cart");
    setCart([]);

    alert("Order placed successfully!");
    setPage("orders");
  };

  if (cart.length === 0) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">
          Your cart is empty.
        </div>

        <button
          className="btn btn-success"
          onClick={() => setPage("home")}
        >
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Checkout</h2>

      <div className="row mt-3">
        <div className="col-md-7">
          <form onSubmit={placeOrder}>
            <div className="mb-3">
              <label className="form-label">Customer Name</label>
              <input
                name="customerName"
                className="form-control bg-light"
                value={user?.fullName || user?.username || ""}
                readOnly
                required
              />
            </div>

            {user?.email && (
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                  className="form-control bg-light"
                  value={user.email}
                  readOnly
                  disabled
                />
              </div>
            )}

            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                name="phone"
                className="form-control"
                defaultValue={user?.phone || ""}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Delivery Address (Current Location)</label>
              <textarea
                name="address"
                className="form-control"
                required
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Payment Method</label>
              <select
                name="paymentMethod"
                className="form-select"
                required
              >
                <option value="Cash on Delivery">
                  Cash on Delivery
                </option>
                <option value="ABA">
                  ABA
                </option>
                <option value="KHQR">
                  KHQR
                </option>
              </select>
            </div>

            <button className="btn btn-success">
              Place Order
            </button>
          </form>
        </div>

        <div className="col-md-5">
          <div className="card shadow-sm">
            <div className="card-header bg-success text-white">
              Order Summary
            </div>

            <div className="card-body">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between"
                >
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}

              <hr />

              <h5 className="text-end">
                Total: ${total.toFixed(2)}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;