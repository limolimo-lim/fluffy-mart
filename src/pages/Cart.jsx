function Cart({ cart, updateQuantity, removeFromCart, onCheckoutClick }) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-4">
      <h2>Shopping Cart</h2>

      {cart.length === 0 ? (
        <div className="alert alert-warning mt-3">
          Your cart is empty.
        </div>
      ) : (
        <>
          <table className="table table-bordered mt-3">
            <thead className="table-success">
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th width="180">Quantity</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      -
                    </button>

                    <span className="mx-3">{item.quantity}</span>

                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h4 className="text-end">
            Total: ${total.toFixed(2)}
          </h4>

          <div className="text-end">
            <button
              className="btn btn-success"
              onClick={onCheckoutClick}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;