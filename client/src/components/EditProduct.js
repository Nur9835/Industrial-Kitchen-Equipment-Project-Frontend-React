import React, { useState, useEffect } from "react";
import axios from 'axios';

function EditProduct({ onClose, selectedProductName, selectedProductDescription, selectedCategoryName, selectedProductPrice,setSelectedCategoryID,selectedProductID }) {

  const [productName, setProductName] = useState(selectedProductName);
  const [productDescription, setProductDescription] = useState(selectedProductDescription);
 const [categoryName, setCategoryName] = useState(selectedCategoryName);
  const [productPrice, setProductPrice] = useState(selectedProductPrice);
  const [selectedCategoryId, setSelectedCategoryId] = useState(setSelectedCategoryID);
  const [productID ,setProductID] = useState(selectedProductID);
  const apiUrl = 'https://industrial-kitchen-equipment-project.onrender.com';
  const [categories, setCategories] = useState([]);

  

  const handleUpdateProduct = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.patch(`${apiUrl}/product/update`, {
        id: productID,
        name: productName,
        categoryId: selectedCategoryId,
        description: productDescription,
        price: productPrice,
     
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log('Ürün Başarıyla Güncellendi:', response.data.message);
        window.alert('Product successfully updated');
        onClose();
      }
    } catch (error) {
      console.error('Ürün Güncellenirken Bir Hata Oluştu:', error.response.data);
      window.alert("An error occurred while updating the product. Please check your input and try again.");
    }
  };

  useEffect(() => {
 const fetchCategories = async () => {
      try {
        const response = await axios.get(`${apiUrl}/category/get`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });
        if (response.status === 200) {
          setCategories(response.data);
          const selectedCategory = response.data.find(category => category.name === selectedCategoryName);
          if (selectedCategory) {
            setSelectedCategoryId(selectedCategory.id);
            setCategoryName(selectedCategory.name);
          }
        }
      } catch (error) {
        console.error('Error:', error.response.data);
      }
    };
    fetchCategories();
  }, [selectedCategoryName]); 
  


  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-1/2 h-1/2 p-4 rounded-lg relative">
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl absolute top-2 right-2">
          &times;
        </button>
        <h2 className="text-xl text-center font-semibold mb-4">EDIT PRODUCT</h2>
        <div className="mt-5 space-y-5">
          <div className="mb-2 flex items-center justify-center">
            <input
              type="text"
              name="productName"
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-3/4 rounded-md p-2 border border-gray-400"
              required
            />
          </div>
          <div className="mb-2 flex items-center justify-center ">
            <input
              type="text"
              name="price"
              placeholder="Enter product price"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              className="w-3/4 rounded-md p-2 border border-gray-400"
              required
            />
            </div>
            <div className="mb-2 flex items-center justify-center ">
              <select
              name="categoryId"
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              value={setSelectedCategoryId}
              className="w-3/4 rounded-md p-2 border border-gray-400"
              required
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            </div>
 
          <div className="mb-2 flex items-center justify-center">
            <input
              type="text"
              name="description"
              value={productDescription}
              placeholder="Enter product description"
              onChange={(e) => setProductDescription(e.target.value)}
              className="w-3/4 rounded-md p-2 border border-gray-400"
              required
            />
          </div>
          <div className="mb-2 flex items-center justify-center">
            <button
              onClick={handleUpdateProduct}
              className="bg-black hover:scale-105  hover:ring-2 hover:ring-gray-700  text-white font-bold py-2 px-4 rounded"
            >
              Update 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
