function ProductDetail({ product, addToCart, setPage }) {
  if (!product) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">
          Product not found.
        </div>

        <button
          className="btn btn-success"
          onClick={() => setPage("products")}
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <button
        className="btn btn-outline-success mb-4"
        onClick={() => setPage("products")}
      >
        Back
      </button>

      <div className="row">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded shadow"
            style={{ height: "400px", width: "100%", objectFit: "cover" }}
          />
        </div>

        <div className="col-md-6">
          <h2>{product.name}</h2>

          <p className="text-muted">
            Category: {product.category}
          </p>

          <h3 className="text-success">
            ${product.price}
          </h3>

          <p className="mt-3">
            This product is available at Fluffy Mart. It is fresh,
            high quality, and suitable for daily use.
          </p>

          <button
            className="btn btn-success btn-lg"
            onClick={() => addToCart(product)}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;