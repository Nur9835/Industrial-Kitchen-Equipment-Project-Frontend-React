import React, { useState } from "react";
import axios from 'axios';


function SıgnUp({ onClose }) {

  const [userData, setUserData] = useState({
    name: "",
    contactNumber: "",
    email: "",
    password: ""
  })
  const [message, setMessage] = useState("");
  const apiUrl = 'http://localhost:8080'; 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSignup = async () => {
    try {
      console.log("userData: ",userData);
      const response = await axios.post(`${apiUrl}/user/signup`, userData);
      if (response.status === 200) {
        console.log('Signup success:', response.data);

        setMessage("Sign up successful!");
        setUserData({
          name: "",
          contactNumber: "",
          email: "",
          password: ""
        });
      }
    } catch (error) {
      console.error('Signup error:', error.response.data);
     setMessage("Sign up failed. Please check your input and try again.");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-1/2 h-1/2 p-4 rounded-lg relative"> 
        <button onClick={onClose} 
        className="text-gray-500   text-2xl absolute top-2 right-2">
          &times; 
        </button>
        <h2 className="text-xl text-center font-bold mb-4">Sign Up</h2>

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
              value={userData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="w-3/4 rounded-md p-2 border border-gray-400"
              required
            />
          </div>

          <div className="mb-2 flex items-center justify-center">
            <input
              type="contactNumber"
              name="contactNumber"
              placeholder="Enter your contact number"
              value={userData.contactNumber}
              onChange={handleInputChange}
              className="w-3/4 rounded-md p-2 border border-gray-400"
              required
            />
          </div>

          <div className="mb-2 flex items-center justify-center">
            <input
                    type="email"
                    name="email"
              placeholder="Enter your email"
              value={userData.email}
              onChange={handleInputChange}
              className="w-3/4 rounded-md p-2 border border-gray-400"
              required
            />
          </div>
          <div className="mb-2 flex items-center justify-center">
            <input
                 type="password" 
                 name="password"
              placeholder="Enter your password"
              value={userData.password}
              onChange={handleInputChange}
              className="w-3/4 rounded-md p-2 border border-gray-400"
              required
            />
          </div>

          <div className="mb-2 flex items-center justify-center">
          <button
     onClick={handleSignup}
      className="bg-black hover:scale-105  hover:ring-2 hover:ring-gray-700    text-white font-bold py-2 px-4 rounded hover:opacity-90"

    > Sıgn Up </button>
          </div>

      
        </div>
      </div>
    </div>
  );
}

export default SıgnUp;
