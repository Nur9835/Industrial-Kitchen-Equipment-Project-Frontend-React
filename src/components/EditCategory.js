import React, { useState } from "react";
import axios from 'axios';
import { useCategory } from "../context/CategoryContext";

function EditCategory({ onClose ,selectedCategoryName ,selectedCategoryId}) {

  const [categoryName, setCategoryName] = useState(selectedCategoryName);
  const [categoryId,setCategoryId]=useState(selectedCategoryId);

  const{apiUrl}=useCategory();

  const handleInputChange = (e) => {
    setCategoryName(e.target.value);
  };


  const handleEditCategory = async () => {
    try {
        const token = localStorage.getItem("token");

      const response = await axios.patch(`${apiUrl}/category/update`, 
      { name: categoryName,
        id:categoryId,
       },
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );
    
      if (response.status === 200) {
        console.log('Kategori Başarıyla Güncellendi:', response.data.message);
        window.alert('Category successfully updated');
        onClose(); 
      }
    } catch (error) {
      console.error('Kategori Güncellenirken Bir Hata Oluştu:', error.response.data);
      window.alert("An error occurred while updating the category. Please check your input and try again.");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-1/2 h-1/2 p-4 rounded-lg relative">
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl absolute top-2 right-2">
          &times;
        </button>
        <h2 className="text-xl text-center font-semibold mb-4">EDİT CATEGORY</h2>
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
          <div className="mb-2 flex items-center justify-center">
            <button
              onClick={handleEditCategory}
              className="bg-black text-white font-bold py-2 px-4 rounded  hover:scale-105  hover:ring-2 hover:ring-gray-700 "
            >
              Update 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCategory;

