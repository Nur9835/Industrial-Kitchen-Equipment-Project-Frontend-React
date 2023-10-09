import React, { useState } from "react";
import axios from 'axios';

function Login({ onClose }) {

  
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const apiUrl = 'http://localhost:8080';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${apiUrl}/user/login`, userData);
      if (response.status === 200) {
      //  console.log('Login success:', response.data);
        const token = response.data.toke; 
        console.log('Token', token);
        localStorage.setItem("token", token);
         window.location.href = "/dashboard";
         setMessage("Log In successful!");
      }
    } catch (error) {
      console.error('Login error:', error.response.data);
      setMessage("Log In failed. Please check your input and try again.");

    }


    
  };


  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
     
      <div className="bg-white w-1/2 h-1/2 p-4 rounded-lg relative">
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl absolute top-2 right-2">
          &times; 
        </button>
        <h2 className="text-xl font-bold  text-center  mb-4">Login</h2>
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
         onClick={handleLogin}
      className="bg-black hover:scale-105  hover:ring-2 hover:ring-gray-700   text-white font-bold py-2 px-4 rounded  hover:opacity-90"
    > Login </button>
       
          </div>


        </div>
      </div>
    </div>
  );
}

export default Login;
