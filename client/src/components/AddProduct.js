import React, { useState, useEffect } from "react";
import axios from 'axios';

function AddProduct({ onClose }) {

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
  });

  const [categories, setCategories] = useState([]);
  const apiUrl = 'https://industrial-kitchen-equipment-project.onrender.com';

  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleAddProduct = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(`${apiUrl}/product/add`, {
        ...product,
        categoryId: selectedCategoryId, 
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log('Ürün Başarıyla Eklendi:', response.data.message);
        onClose();
        window.alert('Product successfully added');
      }
    } catch (error) {
      console.error('Ürün Eklenirken Bir Hata Oluştu:', error.response.data);
      window.alert('An error occurred while adding the product. Please check your input and try again.');
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
        }
      } catch (error) {
        console.error('Error:', error.response.data);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-1/2 h-1/2 p-4 rounded-lg relative">
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl absolute top-2 right-2">
          &times;
        </button>
        <h2 className="text-xl text-center font-semibold mb-4">ADD PRODUCT</h2>
        <div className="mt-5 space-y-5">

          <div className="mb-2 flex items-center justify-center">
            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              value={product.name}
              onChange={handleChange}
              className="w-3/4 rounded-md p-2 border border-gray-400"
              required
            />
            
          </div>
          <div className="mb-2 flex items-center justify-center">
          <input
              type="text"
              name="price"
              placeholder="Enter product price"
              value={product.price}
              onChange={handleChange}
              className="w-3/4 rounded-md p-2 border border-gray-400"
              required
            />
            </div>


          <div className="mb-2 flex items-center justify-center">
     
            <select
              name="categoryId"
              onChange={(e) => setSelectedCategoryId(e.target.value)} 
              placeholder="Select category"
              value={selectedCategoryId}
              className="w-3/4 rounded-md p-2 border border-gray-400"
              required
            >
              <option value="" disabled>Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>



          <div className="mb-2 flex items-center justify-center">
            <input
              type="text"
              name="description"
              placeholder="Enter product description"
              onChange={handleChange}
              className="w-3/4 rounded-md p-2 border border-gray-400"
              required
            />
          </div>

          <div className="mb-2 flex items-center justify-center">
            <button
              onClick={handleAddProduct}
              className="bg-black hover:scale-105  hover:ring-2 hover:ring-gray-700  text-white font-bold py-2 px-4 rounded"
            >
              Add 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
