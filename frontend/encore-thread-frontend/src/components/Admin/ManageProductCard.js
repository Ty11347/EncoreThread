import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

function ManageProductCard({editedProduct, setEditedProduct, handleSetProducts}) {
  const navigate = useNavigate()
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (editedProduct) {
      document.getElementById('productName').value = editedProduct.name || '';
      document.getElementById('description').value =
          editedProduct.description || '';
      document.getElementById('price').value = editedProduct.price || '';
      document.getElementById('size').value = editedProduct.size || 'Small';
      document.getElementById('quantity').value =
          editedProduct.quantity || '';
      setPreviewImage(editedProduct.imageUrl || null);
    }
  }, [editedProduct]);


  const handleCancelEdit = () => {
    // 重置表单字段
    document.getElementById('productName').value = '';
    document.getElementById('description').value = '';
    document.getElementById('price').value = '';
    document.getElementById('size').value = 'Small';
    document.getElementById('quantity').value = '';
    setPreviewImage(null);

    setEditedProduct(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const imageFile = e.target.image.files[0];
    if (!editedProduct) {

      if (!imageFile) {
        window.alert('Please upload a product image.');
        return; // Do not proceed with form submission
      }
    }

    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(imageFile);
    }

    const updatedProduct = {
      name: e.target.productName.value,
      description: e.target.description.value,
      price: e.target.price.value,
      size: e.target.size.value,
      quantity: e.target.quantity.value,
      imageUrl: previewImage,
    };

    console.log(updatedProduct);

    const url = editedProduct
        ? `http://localhost:8080/api/admin/products/${editedProduct.id}`
        : 'http://localhost:8080/api/admin/products';

    const method = editedProduct ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    })
        .then((response) => response.json())
        .then((data) => {
          e.target.reset();
          setPreviewImage(null);

          window.alert('Product submitted successfully!');

          // refresh product list
          fetch("http://localhost:8080/api/products")
              .then((response) => response.json())
              .then((data) => {
                handleSetProducts(data);
                setEditedProduct(null);
              })
              .catch((error) => console.error("Error fetching data: ", error));
        })
        .catch((error) => {
          console.error('Error creating/editing product: ', error);
          window.alert('Error creating/editing product. Please try again.');
        });
  };


  return (
      <form className='manage-product-form'
            onSubmit={handleFormSubmit}
      >
        <h3>{editedProduct ? 'Update Product' : 'Add New Product'}</h3>

        <label htmlFor="productName">Product Name <span className="required">*</span></label>
        <input type="text" id="productName" name="productName" className="input-field" required/>

        <label htmlFor="description">Description <span className="required">*</span></label>
        <textarea id="description" name="description" className="input-field" required/>

        <label htmlFor="price">Price <span className="required">*</span></label>
        <input type="text" id="price" name="price" className="input-field" required/>

        <label htmlFor="size">Size <span className="required">*</span></label>
        <select id="size" name="size" className="input-field" required>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>

        <label htmlFor="quantity">Quantity <span className="required">*</span></label>
        <input type="text" id="quantity" name="quantity" className="input-field" required/>

        <label htmlFor="image">Upload Product Image
          {!editedProduct && (
              <span className="required">*</span>
          )}
        </label>
        <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            className="input-field"
            onChange={(e) => {
              const imageFile = e.target.files[0];

              if (imageFile) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setPreviewImage(reader.result);
                };
                reader.readAsDataURL(imageFile);
              } else {
                setPreviewImage(null);
              }
            }}
        />

        {previewImage && (
            <img
                src={previewImage}
                alt="Product Preview"
                style={{maxWidth: '100%', maxHeight: '200px', marginTop: '10px', marginBottom: '10px'}}
            />
        )}

        <button type="submit">{editedProduct ? 'Update' : 'Submit'}</button>

        {editedProduct && (
            <button type="button" onClick={handleCancelEdit}>
              Cancel Edit
            </button>
        )}
      </form>
  )
}

export default ManageProductCard
