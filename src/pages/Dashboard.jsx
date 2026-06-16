import { useEffect, useState } from "react";
import defaultProducts from "../data/products";

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });

  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("fluffy_orders")) || [];

    const savedProducts =
      JSON.parse(localStorage.getItem("fluffy_products")) || defaultProducts;

    setOrders(savedOrders);
    setProducts(savedProducts);
  }, []);

  const saveProducts = (updatedProducts) => {
    setProducts(updatedProducts);
    localStorage.setItem(
      "fluffy_products",
      JSON.stringify(updatedProducts)
    );
  };

  const addProduct = (e) => {
    e.preventDefault();

    const product = {
      id: Date.now(),
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      category: newProduct.category,
      image: newProduct.image || "https://via.placeholder.com/400",
    };

    saveProducts([...products, product]);

    setNewProduct({
      name: "",
      price: "",
      category: "",
      image: "",
    });
  };

  const deleteProduct = (id) => {
    const confirmDelete = window.confirm("Delete this product?");

    if (confirmDelete) {
      saveProducts(products.filter((product) => product.id !== id));
    }
  };
  const resetData = () => {
  const confirmReset = window.confirm(
    "Reset all products, cart, and orders?"
  );

  if (confirmReset) {
    localStorage.removeItem("fluffy_products");
    localStorage.removeItem("fluffy_cart");
    localStorage.removeItem("fluffy_orders");

    setProducts(defaultProducts);
    setOrders([]);

    alert("Data reset successfully!");
  }
};
  const startEdit = (product) => {
    setEditProduct({ ...product });
  };

  const updateProduct = (e) => {
    e.preventDefault();

    const updatedProducts = products.map((product) =>
      product.id === editProduct.id
        ? {
            ...editProduct,
            price: parseFloat(editProduct.price),
          }
        : product
    );

    saveProducts(updatedProducts);
    setEditProduct(null);
  };

  const totalOrders = orders.length;

  const totalSales = orders.reduce(
    (sum, order) => sum + order.total,
    0
  );

  const totalCustomers = new Set(
    orders.map((order) => order.phone)
  ).size;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
  <h2>Admin Dashboard</h2>

  <button
    className="btn btn-outline-danger"
    onClick={resetData}
  >
    Reset Data
  </button>
</div>

      <div className="row mt-4">
        <div className="col-md-3 mb-3">
          <div className="card bg-success text-white shadow-sm">
            <div className="card-body">
              <h5>Total Products</h5>
              <h2>{products.length}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card bg-primary text-white shadow-sm">
            <div className="card-body">
              <h5>Total Orders</h5>
              <h2>{totalOrders}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card bg-warning text-dark shadow-sm">
            <div className="card-body">
              <h5>Total Sales</h5>
              <h2>${totalSales.toFixed(2)}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card bg-danger text-white shadow-sm">
            <div className="card-body">
              <h5>Customers</h5>
              <h2>{totalCustomers}</h2>
            </div>
          </div>
        </div>
      </div>

      <h4 className="mt-4">Add Product</h4>

      <form className="card card-body shadow-sm" onSubmit={addProduct}>
        <div className="row">
          <div className="col-md-3 mb-2">
            <input
              className="form-control"
              placeholder="Product name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              required
            />
          </div>

          <div className="col-md-2 mb-2">
            <input
              type="number"
              step="0.01"
              className="form-control"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              required
            />
          </div>

          <div className="col-md-3 mb-2">
            <input
              className="form-control"
              placeholder="Category"
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
              required
            />
          </div>

          <div className="col-md-3 mb-2">
            <input
              className="form-control"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
          </div>

          <div className="col-md-1 mb-2">
            <button className="btn btn-success w-100">Add</button>
          </div>
        </div>
      </form>

      {editProduct && (
        <>
          <h4 className="mt-4">Edit Product</h4>

          <form className="card card-body shadow-sm" onSubmit={updateProduct}>
            <div className="row">
              <div className="col-md-3 mb-2">
                <input
                  className="form-control"
                  value={editProduct.name}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      name: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="col-md-2 mb-2">
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  value={editProduct.price}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      price: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="col-md-3 mb-2">
                <input
                  className="form-control"
                  value={editProduct.category}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      category: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="col-md-3 mb-2">
                <input
                  className="form-control"
                  value={editProduct.image}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      image: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-md-1 mb-2">
                <button className="btn btn-primary w-100">
                  Save
                </button>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-secondary mt-2"
              onClick={() => setEditProduct(null)}
            >
              Cancel Edit
            </button>
          </form>
        </>
      )}

      <h4 className="mt-4">Manage Products</h4>

      <table className="table table-bordered mt-3">
        <thead className="table-success">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </td>

              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>

              <td>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => startEdit(product)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteProduct(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4 className="mt-4">Recent Orders</h4>

      {orders.length === 0 ? (
        <div className="alert alert-info">
          No order data yet.
        </div>
      ) : (
        <table className="table table-bordered mt-3">
          <thead className="table-success">
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.slice(-5).reverse().map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.customerName}</td>
                <td>{order.phone}</td>
                <td>${order.total.toFixed(2)}</td>
                <td>
                  <span className="badge bg-warning text-dark">
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;