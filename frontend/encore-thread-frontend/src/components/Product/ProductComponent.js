import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const ProductsComponent = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const resetFilter = () => {
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setSelectedSize("");
  };

  const handleMinPriceChange = (value) => {
    const minValue = parseInt(value, 10);
    const maxValue = parseInt(maxPrice, 10);

    if (maxPrice !== "" && minValue > maxValue) {
      setMinPrice(maxPrice);
      setMaxPrice(value);
    } else {
      setMinPrice(value);
    }
  };

  const handleMaxPriceChange = (value) => {
    const minValue = parseInt(minPrice, 10);
    const maxValue = parseInt(value, 10);

    if (minPrice !== "" && maxValue < minValue) {
      setMaxPrice(minPrice);
      setMinPrice(value);
    } else {
      setMaxPrice(value);
    }
  };

  const filteredProducts = products.filter((product) => {
    const title = product.name.toLowerCase();
    const includesSearchTerm = title.includes(searchTerm.toLowerCase());
    const matchesSize = selectedSize ? product.size === selectedSize : true;
    const withinMinPrice = minPrice
      ? product.price >= parseInt(minPrice)
      : true;
    const withinMaxPrice = maxPrice
      ? product.price <= parseInt(maxPrice)
      : true;

    return (
      includesSearchTerm && matchesSize && withinMinPrice && withinMaxPrice
    );
  });

  //style
  const contentStyle = {
    flexGrow: "1",
    padding: "20px",
    alignItems: "start",
    flexDirection: "column",
    display: "flex",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
  };

  const filterContainerStyles = {
    width: "200px",
    margin: "30px",
  };

  const filterContentStyles = {
    flexGrow: "1",
    alignItems: "start",
    flexDirection: "column",
    display: "flex",
  };

  const numberStyle = { padding: "8px", width: "60px" };
  const buttonStyle = {
    padding: "8px 10px",
    border: "1px solid gray",
    borderRadius: "4px",
    marginTop: "24px",
    cursor: "pointer",
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={contentStyle}>
        <div style={gridStyle}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              imageUrl={product.imageUrl}
              title={product.name}
              description={product.description}
              size={product.size}
              price={product.price}
              onAddToCart={() => console.log("Add to Cart clicked", product.id)}
            />
          ))}
        </div>
      </div>
      <div style={filterContainerStyles}>
        <div style={filterContentStyles}>
          <h3>Search Product</h3>
          <input
            type="text"
            style={{ padding: "10px" }}
            placeholder="Search products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div style={filterContentStyles}>
          <h3>Price Range</h3>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => handleMinPriceChange(e.target.value)}
              style={numberStyle}
            />
            <div style={{ margin: "0 5px" }}>to</div>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => handleMaxPriceChange(e.target.value)}
              style={numberStyle}
            />
          </div>
        </div>
        <div style={filterContentStyles}>
          <h3>Size</h3>
          <div>
            <input
              type="checkbox"
              checked={selectedSize === "Small"}
              onChange={() => setSelectedSize("Small")}
            />
            <label>Small</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={selectedSize === "Medium"}
              onChange={() => setSelectedSize("Medium")}
            />
            <label>Medium</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={selectedSize === "Large"}
              onChange={() => setSelectedSize("Large")}
            />
            <label>Large</label>
          </div>

          <button style={buttonStyle} onClick={resetFilter}>
            Reset Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsComponent;
