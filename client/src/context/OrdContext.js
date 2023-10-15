

import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const OrdContext = createContext();

export const OrderProvider = ({ children }) => {
  
    const [order, setOrder] = useState({
        "name": '',
        "uuid": '',
        "email": '',
        "contactNumber": '',
        "paymentMethod": 'Cash',
        "totalAmount": 0,
        "productDetails": '{}',
        "createdBy": 'n'
      });
    
      const apiUrl = 'https://industrial-kitchen-equipment-project.onrender.com';
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedProductPrice, setSelectedProductPrice] = useState(null);
  const [selectedProductName, setSelectedProductName] = useState('');
  const [selectedProductCategory, setSelectedProductCategory] = useState('');
  const [selectedProductQuantity, setSelectedProductQuantity] = useState(0);
  const[bills,setBills]= useState([]);
  const [total, setTotal] = useState(0);
  const [totalBill, setTotalBill] = useState();

  const updatedOrder = {
    ...order,
   totalAmount: totalBill,
    productDetails: JSON.stringify({
       ...order.productDetails,
      [selectedProductId]: {
       name: selectedProductName,
        category: selectedProductCategory,
       price: selectedProductPrice,
       quantity: selectedProductQuantity,
        total: total,
      },
    }),
   };

   const calculateTotalAmount = () => {
    let totalAmount = 0;
    bills.forEach((bill) => {
      const productDetails = JSON.parse(bill.productDetails);
      Object.keys(productDetails).forEach((productId) => {
        const product = productDetails[productId];
        if (!isNaN(product.total)) {
          totalAmount += parseFloat(product.total);
        }
      });
    });
    return totalAmount.toFixed(2); 
  };



    const fetchBills = async () => {

        try {
          const response = await axios.post(`${apiUrl}/bill/generateReport`, updatedOrder, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              'Content-Type': 'application/json',
            },
          });
    
          if (response.status === 200) {

            setBills([...bills, updatedOrder]);
            setSelectedProductId('');
            setSelectedProductPrice(null);
            setSelectedProductCategory('');
            setSelectedProductQuantity(0);
            setTotal(0);
    
            setTotalBill(calculateTotalAmount());
          } else {
            console.error("Failed to generate report");
          }
        } catch (error) {
          console.error("Hata:", error.response);
        }
    
      }
    
    

  const contextValues = {
    apiUrl,
    bills,
    setBills,
    fetchBills:fetchBills,
    selectedCategoryId, 
    setSelectedCategoryId,
    selectedProductId, 
    setSelectedProductId,
    selectedProductPrice,
     setSelectedProductPrice,
    selectedProductName, 
    setSelectedProductName,
    selectedProductCategory,
     setSelectedProductCategory,
    selectedProductQuantity, 
    setSelectedProductQuantity,
   order, setOrder,
   total, setTotal,
   totalBill, setTotalBill,
updatedOrder,
calculateTotalAmount:calculateTotalAmount
  };

  return (

    <OrdContext.Provider value={contextValues}>
      {children}
    </OrdContext.Provider>
  );
};

export const useOrder = () => useContext(OrdContext);
