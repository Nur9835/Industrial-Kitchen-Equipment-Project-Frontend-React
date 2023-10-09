import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignupModal from "./SıgnUp"; 
import LoginModal from "./Login"; 

function Header() {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const openSignupModal = () => {
    setShowSignupModal(true);
  };

  const closeSignupModal = () => {
    setShowSignupModal(false);
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
<header className="p-4 flex justify-between items-center" style={{ backgroundColor: "#000" }}>
      <div className="flex items-center space-x-2">
      <img src="logo.jpg" alt="" className=" rounded-full  w-32 h-32" />


        <h1 className="text-white text-lg p-2 font-semibold">Industrial Kitchen Equipment</h1>
      </div>
      <div className="flex flex-row space-x-2">
        <button onClick={openSignupModal} className="text-white hover:opacity-60 focus:underline mr-2">
          Sign Up
        </button>
        <button onClick={openLoginModal} className="text-white hover:opacity-60 focus:underline">
          Login
        </button>
      </div>

      {showSignupModal && <SignupModal onClose={closeSignupModal} />}
      {showLoginModal && <LoginModal onClose={closeLoginModal} />}
    </header>
  );
}

export default Header;
