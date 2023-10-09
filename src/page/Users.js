import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FiToggleLeft, FiToggleRight } from 'react-icons/fi';
import { IoMdArrowBack } from 'react-icons/io';
import { useUser } from "../context/UserContext";

function Users() {
  

  const { users, filterText, setFilterText, toggle } = useUser();

   const handleBackClick = () => {
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-slate-50  text-black">
    <div className='flex border bg-white rounded p-4  
    flex-row items-center justify-between w-full mt-5  mb-4'>
    <IoMdArrowBack
          onClick={handleBackClick}
          className="text-black-500 hover:text-gray-400 cursor-pointer"
          style={{ fontSize: '24px' }}
        />
        
        <h1 className="text-2xl font-bold flex-grow text-center">MANAGE USERS</h1>

      </div>
 
      <div className='flex border bg-white rounded p-4  flex-row items-center justify-between w-full mt-5  mb-4'>
        <input
         className="w-1/3 rounded-md p-2  border-black border-2"
         value={filterText}
         onChange={(e) => setFilterText(e.target.value)}
          placeholder='Filter User Name'
        />
      </div>
 
  <div className='flex border bg-white rounded p-4  flex-row items-center justify-between w-full mt-5  mb-4'>
     
  <table className="mt-4 w-full border text-center">
          <thead>
            <tr>
              <th className="px-4 py-2">User Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Contact Number</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
          {users
          .filter(user => user.name.toLowerCase().includes(filterText.toLowerCase())) 
          .map((user) => (
                  <tr key={user.id}> 
                  
                  <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>  
                <td className="border px-4 py-2">{user.contactNumber}</td>
                <td className="border px-4 py-2 space-x-4 ">

                <button
  className="text-black-500"
  onClick={() => toggle(user, user.id, user.status)}
>
  {user.status === 'true' ? (
    <FiToggleLeft className="w-6 h-6" />
  ) : (
    <FiToggleRight className="w-6 h-6" />
  )}
</button>
                  </td>
                  
                  
                    </tr>

))}
</tbody>

</table>

       </div>

</div>
  )
}

export default Users

