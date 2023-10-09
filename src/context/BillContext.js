

import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const BillContext = createContext();

export const BillProvider = ({ children }) => {
  
  const apiUrl = 'http://localhost:8080';
  const[bills,setBills]= useState([]);
  const [selectedBill, setSelectedBill] = useState(null); 
  const [deletingBillName, setdeletingBillName] = useState('');
  const [deletingBillID, setdeletingBillID] = useState();
  const [filterText, setFilterText] = useState('');


  const fetchDeleteBill = async () => {
    try {
      const response = await axios.delete(`${apiUrl}/bill/delete/${deletingBillID}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}` 
        }
      });
      if (response.status === 200) {
        
      }
    } catch (error) {
      console.error('Error:', error.response.data);
    }
  };


  useEffect(() => {

    const fetchBills = async () => {
      try {
        const response = await axios.get(`${apiUrl}/bill/getBills`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });
        if (response.status === 200) {
          setBills(response.data);
  
        }
      } catch (error) {
        console.error('Error:', error.response.data);
      }
    };
    
    fetchBills();
  
  }, [bills]);


  const contextValues = {
    apiUrl,
    bills,setBills,
    selectedBill, setSelectedBill,
    deletingBillName, setdeletingBillName,
    deletingBillID, setdeletingBillID,
    fetchDeleteBill:fetchDeleteBill,
    filterText, setFilterText
  };

  return (

    <BillContext.Provider value={contextValues}>
      {children}
    </BillContext.Provider>
  );
};

export const useBill = () => useContext(BillContext);
