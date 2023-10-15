

import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  
  const apiUrl = 'https://industrial-kitchen-equipment-project.onrender.com';
  const [users, setUsers] = useState([]);
  const [filterText, setFilterText] = useState('');

  const toggle = (user, userId, userStatus) => {
    const newStatus = userStatus === "true" ? "false" : "true";
    console.log(user, "user");

    const fetchUpdateUser = async () => {
      try {
        const response = await axios.patch(`${apiUrl}/user/update`, {
          status: newStatus,
          id: userId,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}` 
          }
        });
        if (response.status === 200) {
          console.error("update başarılı");
        }
      } catch (error) {
        console.error('Error:', error.response.data);
      }
    };
    fetchUpdateUser();
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/user/get`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}` 
          }
        });
        if (response.status === 200) {
          setUsers(response.data);
        }
      } catch (error) {
        console.error('Error:', error.response.data);
      }
    };
    
    fetchUsers();
  }, [users]);


  const contextValues = {
    users,
    filterText,
    setFilterText,
    toggle:toggle,
  };

  return (

    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
