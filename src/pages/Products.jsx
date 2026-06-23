import { useEffect, useState } from "react";
import defaultProducts from "../data/products";
import ProductCard from "../components/ProductCard";

function Products({ addToCart, viewProduct, selectedCategory, setSelectedCategory }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 12;

  useEffect(() => {
    const savedProducts =
      JSON.parse(localStorage.getItem("fluffy_products")) || defaultProducts;

    const updatedProducts = savedProducts.map(product => {
      if (product.name && product.name.toLowerCase() === "croissant") {
        return {
          ...product,
          image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a"
        };
      }
      return product;
    });

    setProducts(updatedProducts);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category).filter(cat => cat && cat.trim() !== "")),
  ];

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const currentFilter = selectedCategory || "All";
    const matchCategory =
      currentFilter === "All" || 
      (product.category && product.category.trim() === currentFilter.trim());

    return matchSearch && matchCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleCategory = (e) => {
    if (setSelectedCategory) {
      setSelectedCategory(e.target.value);
    }
    setCurrentPage(1);
  };

  return (
    <div className="container mt-4">
      <h2>All Products</h2>

      <div className="row my-3">
        <div className="col-md-8 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search product..."
            value={search}
            onChange={handleSearch}
          />
        </div>

        <div className="col-md-4 mb-2">
          <select
            className="form-select"
            value={selectedCategory || "All"}
            onChange={handleCategory}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-muted">
        Showing {currentProducts.length} of {filteredProducts.length} products
      </p>

      <div className="row">
        {currentProducts.length === 0 ? (
          <div className="alert alert-warning">
            No products found.
          </div>
        ) : (
          currentProducts.map((product) => (
            <div className="col-md-3 mb-4" key={product.id}>
              <ProductCard
                product={product}
                addToCart={addToCart}
                viewProduct={viewProduct}
              />
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <nav className="mt-4 mb-5">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => changePage(currentPage - 1)}
              >
                Previous
              </button>
            </li>

            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index + 1}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => changePage(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}

            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => changePage(currentPage + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default Products;