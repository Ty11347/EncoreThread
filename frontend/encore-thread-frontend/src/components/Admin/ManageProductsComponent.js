import React, {useEffect, useState} from "react";
import ManageProductCard from "./ManageProductCard";
import AdminProductCard from "./AdminProductCard";
import './ManageProduct.css'

const ManageProductsComponent = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editedProduct, setEditedProduct] = useState(null);
  const fetchProducts = () => {
    fetch("http://localhost:8080/api/products")
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
        })
        .catch((error) => console.error("Error fetching data: ", error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEditProduct = (product) => {
    setEditedProduct(product);
    console.log(product);
  };

  const handleSetProducts = (newProducts) => {
    setProducts(newProducts);
  };

  const filteredProducts = products.filter((product) => {
    const title = product.name.toLowerCase();
    return title.includes(searchTerm.toLowerCase());
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
    margin: "10px 30px 10px 30px",
  };

  const filterContentStyles = {
    flexGrow: "1",
    alignItems: "start",
    flexDirection: "column",
    display: "flex",
  };

  return (
      <div style={{display: "flex"}}>
        <div style={contentStyle}>
          <div style={gridStyle}>
            {filteredProducts.map((product) => (
                <AdminProductCard
                    key={product.id}
                    id={product.id}
                    imageUrl={product.imageUrl}
                    title={product.name}
                    description={product.description}
                    size={product.size}
                    price={product.price}
                    name={product.name}
                    quantity={product.quantity}
                    onEdit={handleEditProduct}
                    refreshProducts={fetchProducts}
                />
            ))}
          </div>
        </div>
        <div style={filterContainerStyles}>
          <div style={filterContentStyles}>
            <h3>Search Product</h3>
            <input
                type="text"
                style={{padding: "10px"}}
                placeholder="Search products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>


          {/*Edit form*/}
          <ManageProductCard
              editedProduct={editedProduct}
              setEditedProduct={setEditedProduct}
              handleSetProducts={handleSetProducts}
          />
        </div>
      </div>
  );
};

export default ManageProductsComponent;
