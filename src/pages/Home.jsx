import { useEffect, useState } from "react";
import defaultProducts from "../data/products";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";

function Home({ addToCart, setPage, viewProduct, setSelectedCategory }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const savedProducts =
      JSON.parse(localStorage.getItem("fluffy_products")) ||
      defaultProducts;

    setProducts(savedProducts);
  }, []);

  const popularProducts = products.slice(0, 4);

  const handleCategorySelect = (categoryName) => {
    if (setSelectedCategory) {
      setSelectedCategory(categoryName);
    }
    setPage("products");
  };

  return (
    <div>
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="container-fluid px-5">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="hero-content">
                <span className="badge bg-warning text-dark mb-3 px-3 py-2">
                  🌿 100% Organic & Fresh
                </span>

                <h1 className="hero-title">
                  Fresh Groceries Delivered To Your Door
                </h1>

                <p className="hero-text">
                  Organic fruits, vegetables, dairy products, beverages,
                  and everyday essentials at affordable prices.
                </p>

                <div className="d-flex gap-3 mt-4">
                  <button
                    className="btn btn-warning btn-lg px-5 fw-bold"
                    onClick={() => {
                      if (setSelectedCategory) setSelectedCategory("All");
                      setPage("products");
                    }}
                  >
                    Shop Fresh →
                  </button>

                  <button
                    className="btn btn-outline-light btn-lg px-4"
                    onClick={() => {
                      if (setSelectedCategory) setSelectedCategory("All");
                      setPage("products");
                    }}
                  >
                    Explore Products
                  </button>
                </div>

                {/* STATS */}
                <div className="row mt-5 text-white">
                  <div className="col-4">
                    <h3>500+</h3>
                    <small>Products</small>
                  </div>

                  <div className="col-4">
                    <h3>1000+</h3>
                    <small>Orders</small>
                  </div>

                  <div className="col-4">
                    <h3>24/7</h3>
                    <small>Support</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <div className="container mt-5">
        <h3 className="mb-4">Shop By Category</h3>

        <div className="row">
          <div className="col-md-3 col-6 mb-3" onClick={() => handleCategorySelect("Fruits")}>
            <CategoryCard title="Fruits" icon="🍎" />
          </div>

          <div className="col-md-3 col-6 mb-3" onClick={() => handleCategorySelect("Dairy")}>
            <CategoryCard title="Dairy" icon="🥛" />
          </div>

          <div className="col-md-3 col-6 mb-3" onClick={() => handleCategorySelect("Beverages")}>
            <CategoryCard title="Beverages" icon="🥤" />
          </div>

          <div className="col-md-3 col-6 mb-3" onClick={() => handleCategorySelect("Snacks")}>
            <CategoryCard title="Snacks" icon="🍟" />
          </div>
        </div>


        {/* POPULAR PRODUCTS */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Popular Products</h3>

          <button
            className="btn btn-outline-success"
            onClick={() => {
              if (setSelectedCategory) setSelectedCategory("All");
              setPage("products");
            }}
          >
            View All
          </button>
        </div>

        <div className="row">
          {popularProducts.map((product) => (
            <div className="col-md-3 mb-4" key={product.id}>
              <ProductCard
                product={product}
                addToCart={addToCart}
                viewProduct={viewProduct}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;