

import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {


    const [categories, setCategories] = useState([]);
    const [filterText, setFilterText] = useState('');
  const apiUrl = 'https://industrial-kitchen-equipment-project.onrender.com';
    const [selectedCategoryName, setSelectedCategoryName] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);  


    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const response = await axios.get(`${apiUrl}/category/get`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
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
      }, [categories]);
    
    

  const contextValues = {
    categories, 
    setCategories,
    filterText, 
    setFilterText,
    apiUrl,
    selectedCategoryName,
     setSelectedCategoryName,
     selectedCategoryId, 
     setSelectedCategoryId,
  };

  return (

    <CategoryContext.Provider value={contextValues}>
      {children}
    </CategoryContext.Provider>
  );
};


export const useCategory = () => useContext(CategoryContext);
