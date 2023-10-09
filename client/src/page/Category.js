import React, { useState, useEffect } from "react";
import { FiEdit } from 'react-icons/fi';
import AddCategory from "../components/AddCategory";
import EditCategory from "../components/EditCategory";
import axios from 'axios';
import { IoMdArrowBack } from 'react-icons/io';
import { useCategory } from "../context/CategoryContext";


function Category() {
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showAEditCategoryModal, setshowAEditCategoryModal] = useState(false);


const{categories, 
  setCategories,
  filterText, 
  setFilterText,
  selectedCategoryName, 
  setSelectedCategoryName,
  selectedCategoryId, setSelectedCategoryId,}=useCategory();

  const openshowAddCategoryModal = () => {
    setShowAddCategoryModal(true);
  };

  const closeshowAddCategoryModal = () => {
    setShowAddCategoryModal(false);
  };

  const openshowEditCategoryModal = (categoryName, categoryId) => {
    setshowAEditCategoryModal(true);
    setSelectedCategoryName(categoryName);
    setSelectedCategoryId(categoryId);
  };

  const closeshowEditCategoryModal = () => {
    setshowAEditCategoryModal(false);
  };

  const handleBackClick = () => {
    window.location.href = "/dashboard";
  };


  return (
    <div className="min-h-screen flex flex-col items-center bg-slate-50  text-black">
      <div className='flex border bg-white rounded p-4  flex-row items-center justify-between w-full mt-5  mb-4'>
        
    
      <IoMdArrowBack
          onClick={handleBackClick}
          className="text-black-500 hover:text-gray-400 cursor-pointer"
          style={{ fontSize: '24px' }}
        />
        
        <h1 className="text-2xl font-bold">MANAGE CATEGORY</h1>
        <button
          onClick={openshowAddCategoryModal}
          className="bg-black text-white font-bold py-2 px-4 rounded  hover:scale-105  hover:ring-2 hover:ring-gray-700 "
        >
          Add Category
        </button>
        {showAddCategoryModal && <AddCategory onClose={closeshowAddCategoryModal} />}
      </div>

      <div className='flex border bg-white rounded p-4  flex-row items-center justify-between w-full mt-5  mb-4'>
        <input
           className="w-1/3 rounded-md p-2  border-black border-2"
          placeholder='Filter Category Name'
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>


      <div className='flex border bg-white rounded p-4  flex-row items-center justify-between w-full mt-5  mb-4'>
        <table className="mt-4 border w-full text-center">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories
              .filter(category => category.name.toLowerCase().includes(filterText.toLowerCase())) 
              .map((category) => (
                <tr key={category.id}>
                  <td className="border px-4 py-2">{category.name}</td>
                  <td className="border px-4 py-2">
                  <button 
  onClick={() => openshowEditCategoryModal(category.name, category.id)} 
  className="text-black-500 hover:text-black-300"
>
                      <FiEdit />
                    </button>
                    {showAEditCategoryModal && (
              <EditCategory
              selectedCategoryName={selectedCategoryName}
               selectedCategoryId={selectedCategoryId}
                onClose={closeshowEditCategoryModal}
               />
                 )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Category;
