import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {

  const apiUrl = 'http://localhost:8080';
  
  const [products, setProducts] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [selectedProductName, setSelectedProductName] = useState('');
  const [selectedProductDescription,setSelectedProductDescription]=useState('');
  const [selectedCategoryName,setSelectedCategoryName]=useState('');
  const [selectedProductPrice,setSelectedProductPrice]=useState(null);
  const [selectedCategoryID,setSelectedCategoryID]=useState(null);
  const [selectedProductID,setSelectedProductID]=useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/product/get`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}` 
          }
        });
        if (response.status === 200) {
          setProducts(response.data);
        }
      } catch (error) {
        console.error('Error:', error.response.data);
      }
    };
    fetchProducts();
  }, [products]);




  const values = {
    apiUrl,
    products, 
    setProducts,
    filterText, 
    setFilterText,
    selectedProductName, 
    setSelectedProductName,
    selectedProductDescription,
    setSelectedProductDescription,
    selectedCategoryName,
    setSelectedCategoryName,
    selectedProductPrice,
    setSelectedProductPrice,
    selectedProductID,
    setSelectedProductID,
    selectedCategoryID,
    setSelectedCategoryID,

  };



  
  return (
    <ProductContext.Provider value={values}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct= () => useContext(ProductContext);

