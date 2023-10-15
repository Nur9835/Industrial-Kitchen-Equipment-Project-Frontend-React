import React, { useState } from "react";
import axios from 'axios';
import { useCategory } from "../context/CategoryContext";
function AddCategory({ onClose }) {

  const [categoryName, setCategoryName] = useState("");
  const [message, setMessage] = useState("");

  const{apiUrl}=useCategory();
  
  const handleInputChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleAddCategory = async () => {
    try {
        const token = localStorage.getItem("token");
      const response = await axios.post(`${apiUrl}/category/add`, 
      { name: categoryName },
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );
    
      if (response.status === 200) {
        console.log('Kategori Başarıyla Eklendi:', response.data.message);
        window.alert("Category successfully added");
        onClose(); 
      }
    } catch (error) {
      console.error('Kategori Eklenirken Bir Hata Oluştu:', error.response.data);
      window.alert("An error occurred while adding the category. Please check your input and try again.");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-1/2 h-1/2 p-4 rounded-lg relative">
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl absolute top-2 right-2">
          &times;
        </button>
        <h2 className="text-xl text-center font-semibold mb-4">ADD CATEGORY</h2>

        <div className="mb-2 flex items-center justify-center">
            {message && (
              <div className={message.includes("failed") ? "text-red-500" : "text-green-500"}>
                {message}
              </div>
            )}
          </div>
       

        <div className="mt-5 space-y-3">
          <div className="mb-2 flex items-center justify-center">
            <input
              type="text"
              name="name"
              placeholder="Enter category name"
              value={categoryName}
              onChange={handleInputChange}
              className="w-3/4 rounded-md p-2 border border-gray-400"
              required
            />
          </div>
          <div className=" flex  items-center justify-center">
            <button
              onClick={handleAddCategory}
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

export default AddCategory;
