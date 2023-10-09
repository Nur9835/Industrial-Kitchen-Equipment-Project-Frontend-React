import React, { useState, useEffect } from "react";
import { FiEdit } from 'react-icons/fi'; 
import { BiSolidFilePdf } from "react-icons/bi";
import { ImBin  } from "react-icons/im";
import { IoEyeSharp } from "react-icons/io5";
import axios from 'axios';
import { IoMdArrowBack } from 'react-icons/io';
import { useBill } from "../context/BillContext";

function Bill() {

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const{
  apiUrl,
  bills,setBills,
  selectedBill, setSelectedBill,
  deletingBillName, setdeletingBillName,
  deletingBillID, setdeletingBillID,
  fetchDeleteBill,
  filterText, setFilterText
}=useBill();


  const handleBackClick = () => {
    window.location.href = "/dashboard";
  };


  const openDeleteConfirmation = (bilName,billID) => {
    setdeletingBillID(billID);
    setdeletingBillName(bilName);
    setShowDeleteConfirmation(true);
  };

  const closeDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };


  const openDetailModal = (bill) => {
    setShowDetailModal(true);
    setSelectedBill(bill);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
  };

  const HandleDeleteProduct =() => {


fetchDeleteBill();
setShowDeleteConfirmation(false);
}


  return (
    <div className="min-h-screen flex flex-col items-center bg-slate-50  text-black">
      <div className='flex border bg-white rounded p-4 
       flex-row items-center justify-between  w-full mt-5  mb-4'>
      
           <IoMdArrowBack
          onClick={handleBackClick}
          className="text-black-500 hover:text-gray-400 cursor-pointer"
          style={{ fontSize: '24px' }}
        />
      
        <h1 className="text-2xl text-center font-bold flex-grow">VİEW BİLL</h1>

      </div>

      <div className='flex border bg-white rounded p-4  flex-row items-center justify-between w-full mt-5  mb-4'>
        <input
          className="w-1/3 rounded-md p-2  border-black border-2"
          placeholder='Filter Bill Name'
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>

      <div className='flex border bg-white rounded p-4  flex-row  tems-center justify-center  w-full mt-5  mb-4'>
        <table className="mt-4 w-full border  text-center">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Contact Number</th>
              <th className="px-4 py-2">Payment Method</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            
                {bills
                .filter(bill => bill.name.toLowerCase().includes(filterText.toLowerCase())) 
                .map((bill) => (
                    <tr key={bill.id}>
                  <td className="border px-4 py-2">{bill.name}</td>
                  <td className="border px-4 py-2">{bill.email}</td>
                  <td className="border px-4 py-2">{bill.contactNumber}</td>
                  <td className="border px-4 py-2">{bill.paymentMethod}</td>
                  <td className="border px-4 py-2">{bill.total}</td>
   

                  <td className="border px-4 py-2 space-x-3 justify-center flex flex-row  ">
                  <button   onClick={() => openDetailModal(bill)} 
  className="text-black-500 hover:text-gray-700"> 
         <IoEyeSharp  className="w-5 h-5 " />      
         </button>
         
         {/* <button 
  className="text-black-500 hover:text-gray-700">
  <BiSolidFilePdf  className="w-5 h-5 " />

                    </button> */}

                    <button 
   onClick={() => openDeleteConfirmation(bill.name,bill.id)} 
  className="text-black-500 hover:text-gray-700">
  <ImBin  className="w-5 h-5 " />
  </button>

                  </td>
                </tr>
                ))}
          </tbody>
        </table>
      </div>

      {showDeleteConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-1/3 p-4 rounded-lg relative">
            <h2 className="text-xl text-center font-semibold mb-4">
              Are you sure want to delete {deletingBillName} product ?</h2>
            <div className="mt-5 space-x-3 text-center">
         
                <button
                  onClick={HandleDeleteProduct}
                  className="bg-black text-white font-bold py-2 px-4 rounded mr-2"
                >
                  YES
                </button>

                <button
                  onClick={closeDeleteConfirmation}
                  className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded"
                >
                  NO
                </button>
              </div>
            </div>
          </div>
        )}


      {showDetailModal && (

    <div className="fixed top-0 left-0 w-full h-full flex items-center 
    justify-center bg-black bg-opacity-50">

    <div className="bg-white w-3/4 h-3/4  p-4 rounded-lg relative">
      <button onClick={closeDetailModal} className="text-black hover:text-gray-700 text-2xl absolute top-2 right-2">
        &times;
      </button>


      <h2 className="text-xl text-center font-semibold ">Bill Details</h2>
      <div className="mt-3 space-y-3">
        <div className="mb-2 flex  flex-col">
        <div className="flex flex-row p-1 border space-x-5">
          
        <label className="w-1/2 ">
        <span className="font-bold">Name: </span> 
     
        {selectedBill.name}
           </label>
        <label className="w-1/2 ">
        <span className="font-bold">Email: </span> 
        {selectedBill.email}
         </label>
        </div>


        <div className="flex flex-row p-1  border space-x-5">
        <label className="w-1/2 ">
        <span className="font-bold">Contact Number: </span> 
        {selectedBill.contactNumber} </label>
        <label className="w-1/2 ">
        <span className="font-bold">Payment Method: </span> 
        {selectedBill.paymentMethod} </label>
        </div>
        </div>
      </div>
      <div className="mt-5 space-y-3">


      <table className=" border mt-4 w-full  text-center">

      <thead>
  <tr>
    <th className="px-4 py-2">Name</th>
    <th className="px-4 py-2">Category</th>
    <th className="px-4 py-2">Price</th>
    <th className="px-4 py-2">Quantity</th>
    <th className="px-4 py-2">Total</th>
    <th className="px-4 py-2"></th>
  </tr>
</thead>

<tbody>
   
        <React.Fragment key={selectedBill.id}>
          {Object.keys(JSON.parse(selectedBill.productDetails)).map((productId, index) => {
            const product = JSON.parse(selectedBill.productDetails)[productId];
            return (
              <tr key={index}>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">{product.category}</td>
                <td className="border px-4 py-2">{product.price}</td>
                <td className="border px-4 py-2">{product.quantity}</td>
                <td className="border px-4 py-2">{product.total}</td>
     
          
              </tr>
            );
          })}
        </React.Fragment>
  
    </tbody>

        </table>
</div>
    </div>
  </div>
        )}

      </div>
    );
  }

export default Bill;
