import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
function Footer() {
  return (
    <footer className="bg-black py-4 text-white">
      <div className="container  flex flex-col  justify-center  items-center space-y-2  mx-auto text-center">

        <div className='flex flex-row space-x-2'>
        <a href="https://linkedin.com/in/nurkiliç" 
        className="text-white hover:text-gray-300">
            <FaLinkedin className="w-6 h-6 rounded-full" />
          </a>
          <a href="https://github.com/Nur9835" className="text-white hover:text-gray-300">
            <FaGithub className="w-6 h-6 rounded-full" />
          </a>
          <a href="mailto:hnk9833@gmail.com" className="text-white hover:text-gray-300">
            <FaEnvelope className="w-6 h-6 rounded-full" />
          </a>
     
        </div>
        <p>&copy; 2023 Copyright: NUR KILIÇ </p>
 
      </div>
    </footer>
  );
}

export default Footer;
