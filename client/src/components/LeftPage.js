import React from 'react'
import { Link } from 'react-router-dom';
import { BiSolidDashboard } from 'react-icons/bi'; 
import { MdCategory } from 'react-icons/md';
import { FaShoppingBasket,FaMoneyBill } from 'react-icons/fa';
import { SiShopify} from 'react-icons/si';
import { HiUsers } from 'react-icons/hi';
import { IoLogOutSharp } from 'react-icons/io5';

const LeftPage = ({ role }) => {

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = "/";
  };

  return (
    <div className="w-270px min-h-screen p-4" style={{ background: '#000000' }}>
      <h2 className="text-xl font-bold mb-8 text-center relative">
        <span className="absolute left-0 top-0 bottom-0 w-2 bg-slate-500"></span>
        <span className="text-white ml-4">Industrial Kitchen Equipment</span>
      </h2>

      <div className="flex font-semibold flex-col items-center">
        <h3 className="text-xl text-white font-semibold text-center">{role}</h3>

        <div className="mt-4">
          <ul className="flex flex-col gap-8 mt-10">

            <Link to="/dashboard">
              <li className="flex items-center  hover:scale-105  hover:ring-black   hover:ring-3 ">
                <BiSolidDashboard className="w-6 h-6 mr-4 text-white" />
                <span className="text-base  text-white">Dashboard</span>
              </li>
            </Link>

            {role === 'admin' && (
              <Link to="/category">
                <li className="flex items-center  hover:scale-105  hover:ring-black   hover:ring-3 ">
                  <MdCategory className="w-6 h-6 mr-4 text-white" />
                  <span className="text-base text-white">Manage Category</span>
                </li>
              </Link>
            )}

            {role === 'admin' && (
              <Link to="/product">
                <li className="flex items-center  hover:scale-105  hover:ring-black   hover:ring-3 ">
                  <SiShopify className="w-6 h-6 mr-4 text-white" />
                  <span className="text-base text-white">Manage Product</span>
                </li>
              </Link>
            )}

            <Link to="/order">
              <li className="flex items-center  hover:scale-105  hover:ring-black   hover:ring-3 ">
                <FaShoppingBasket className="w-6 h-6 mr-4 text-white" />
                <span className="text-base text-white">Manage Order</span>
              </li>
            </Link>
            
            <Link to="/bill">
              <li className="flex items-center  hover:scale-105  hover:ring-black   hover:ring-3 ">
                <FaMoneyBill className="w-6 h-6 mr-4 text-white" />
                <span className="text-base text-white">View Bill</span>
              </li>
            </Link>

            {role === 'admin' && (
              <Link to="/users">
                <li className="flex items-center  hover:scale-105  hover:ring-black   hover:ring-3 ">
                  <HiUsers className="w-6 h-6 mr-4 text-white" />
                  <span className="text-base text-white">Manage Users</span>
                </li>
              </Link>
            )}

          </ul>
        </div>
        <div className="flex-grow"></div>

        <button onClick={handleLogout} className="flex  hover:scale-105  hover:ring-black   hover:ring-3  text-white items-center justify-center mt-28">
          <div>Logout</div>
          <IoLogOutSharp className="w-6 h-6 ml-5" />
        </button>
      </div>
    </div>
  )
}

export default LeftPage;
