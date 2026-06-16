function ProductCard({ product, addToCart, viewProduct }) {
  return (
    <div className="product-card h-100">
      <div className="product-img-box">
        <img
          src={product.image}
          alt={product.name}
          className="product-img"
        />
      </div>

      <div className="product-body">
        <span className="product-category">
          {product.category}
        </span>

        <h5 className="product-name">
          {product.name}
        </h5>

        <p className="product-price">
          ${product.price}
        </p>

        <div className="d-grid gap-2">
          <button
            className="btn btn-outline-success"
            onClick={() => viewProduct(product)}
          >
            View Detail
          </button>

          <button
            className="btn organic-btn"
            onClick={() => addToCart(product)}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;