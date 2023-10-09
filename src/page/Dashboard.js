import React, { useState, useEffect } from "react";
import LeftPage from '../components/LeftPage'
import { BiSolidDashboard } from 'react-icons/bi'; 
import { MdCategory } from 'react-icons/md';
import { FaShoppingBasket,FaMoneyBill } from 'react-icons/fa';
import {SiShopify} from 'react-icons/si';
import { HiUsers  } from 'react-icons/hi';
import { IoLogOutSharp } from 'react-icons/io5';
import axios from 'axios';
import jwt_decode from "jwt-decode";


const Dashboard = () => {

  const [dashboardData, setDashboardData] = useState({
    category: 0,
    product: 0,
    user:0,
    bill: 0

  });


  const apiUrl = 'http://localhost:8080';
  const token = localStorage.getItem('token');
  let role;
  if (token) {
    try {

      const decodedToken = jwt_decode(token);
       role = decodedToken.role;
console.log(decodedToken)
    } catch (error) {
      console.error('Token decoding error:', error);
    }
  } else {
    console.log('Token not found in localStorage.');
  }





  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axios.get(`${apiUrl}/dashboard/details`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}` 
          }
        });
        if (response.status === 200) {
                setDashboardData(response.data);
        }
      } catch (error) {
        console.error('Error:', error.response.data);
      }
    };
    fetchDashboard();
  }, []);




    return (
  <div className="flex">
 <LeftPage role={role} />
  
    <div className="flex-1 flex-col p-4 bg-white"  
  style={{
    background: '#ffff',
  }}>
  
      <div className="flex-grow relative justify-center items-center   mb-28 " >
  

  
     <div className="py-10 "     style={{
  
      }}>
  
  
  
  <div className="flex flex-col md:flex-row md:flex-wrap gap-4 ml-4">


    <div className="w-full md:w-64 h-55  rounded-lg shadow-md inline-block"
       style={{
        background: '#f3f3f3',
      }}
    >
      <div className="text-start pt-2 flex flex-col space-y-2">
        <div className="text-lg font-semibold">
          <img src="33.png" alt="Page 1" className=" mt-1 w-15 h-12 ml-3" />
        </div>
        <h className="ml-3 font-bold ">Total Category</h>
        <h3 className="text-right mr-3 text-2xl font-bold">{dashboardData.category}</h3>
        
      </div>

      <div className="text-center py-4  ">


      {role==='admin' && (
      <button onClick={()=>{   window.location.href = "/category"}}
      className="bg-white-400    hover:ring-2 hover:ring-gray-500  hover:scale-105   hover:opacity-70   text-black   border border-black  font-bold py-2 px-4 rounded"
    > View Category </button>
    )}

      </div>
    </div>
  
    <div
      className="w-full md:w-64 h-55  rounded-lg shadow-md inline-block"
      style={{
        background: '#f3f3f3',
      }}
    >
      <div className="text-start pt-2 flex flex-col space-y-2">
        <div className="text-lg font-semibold">
          <img src="2.png" alt="Page 1" className="mt-1 w-15 h-12 ml-3" />
        </div>
        <h className="ml-3 font-bold">Total Product</h>
        <h3 className="text-right mr-3 text-2xl font-bold">{dashboardData.product}</h3>
      </div>
      <div className="text-center py-4">


      {role==='admin' && (

              <button onClick={()=>{   window.location.href = "/product"}}
      className="bg-white-400 text-black   border border-black   hover:scale-105  hover:ring-2 hover:ring-gray-500  hover:opacity-70  font-bold py-2 px-4 rounded"
    > View Product </button>
    )}

      </div>
    </div>
  
    <div
      className="w-full md:w-64 h-55 rounded-lg shadow-md inline-block"
      style={{
        background: '#f3f3f3',
      }}
    >
      <div className="text-start pt-2 flex flex-col space-y-2">
        <div className="text-lg font-semibold">
          <img src="dolar.jpg" alt="Page 1" className=" mt-1 w-15 h-12 ml-3" />
        </div>
        <h className="ml-3 font-bold">Total Bill</h>
        <h3 className="text-right mr-3 text-2xl font-bold">{dashboardData.bill}</h3>
      </div>
      <div className="text-center py-4">
      <button onClick={()=>{   window.location.href = "/bill"}}
      className="bg-white-400  text-black  hover:ring-2 hover:scale-105  hover:ring-gray-500  hover:opacity-70  border border-black font-bold py-2 px-4 rounded"
    > View Bill </button>

        
      </div>
    </div>
  
    <div
      className="w-full md:w-64 h-55 rounded-lg shadow-md inline-block"
      style={{
      //  background: 'linear-gradient(to right, #FEAF00, #F8D442)',
      background: '#f3f3f3',
      }}
    >
      <div className="text-start pt-2 flex flex-col space-y-2">
        <div className="text-lg font-semibold">
          <img src="user.png" alt="Page 1" className="w-15 h-12 ml-3" />
        </div>
        <h className="ml-3 font-bold">Users</h>
        <h3 className="text-right mr-3 text-2xl   font-bold">{dashboardData.user}</h3>
      </div>
      <div className="text-center py-4">

      {role==='admin' && (

      <button onClick={()=>{   window.location.href = "/users"}}
      className="bg-white-400  text-black hover:scale-105  hover:ring-2 hover:ring-gray-500  hover:opacity-70 
        border border-black  font-bold py-2 px-4 rounded"
    > View Users  </button>
    )}
      </div>
    </div>
  </div>
  
  
  
  </div>
  
  
  
  </div>
  
    </div>
  
  </div>
  
  
  
    );
  };
  
  export default Dashboard;