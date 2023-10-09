import React, { useState, useEffect } from "react";
import { BsPencilFill } from "react-icons/bs";
import { ImBin  } from "react-icons/im";
import AddProduct from "../components/AddProduct";
import EditProduct from "../components/EditProduct";
import axios from 'axios';
import { FiToggleLeft, FiToggleRight } from 'react-icons/fi';
import { IoMdArrowBack } from 'react-icons/io';
import { useProduct } from "../context/ProductContext";
function Product() {
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);

  const{
    apiUrl,
    products, 
    setProducts,
    filterText, 
    setFilterText,
    selectedProductName, 
    setSelectedProductName,
    selectedProductDescription,
    setSelectedProductDescription,
    selectedCategoryName,
    setSelectedCategoryName,
    selectedProductPrice,
    setSelectedProductPrice,
    selectedProductID,
    setSelectedProductID,
    selectedCategoryID,
    setSelectedCategoryID,
  }=useProduct();

  const toggle = (product,productId,productStatus) => {

    const newStatus = productStatus === "true" ? "false" : "true";

 console.log(newStatus,"newStatus2");
console.log(products,"products");

const fetchUpdateProducts = async () => {
  try {

    const response = await axios.patch(`${apiUrl}/product/updateStatus`, {
      status:newStatus,
      id: productId,

    },{
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
  fetchUpdateProducts();
   
   };

   const handleBackClick = () => {
    window.location.href = "/dashboard";
  };

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deletingProductName, setDeletingProductName] = useState('');
  const [deletingProductID, setDeletingProductID] = useState();

  const openshowAddProductModal = () => {
    setShowAddProductModal(true);
  };

  const closeshowAddProductModal = () => {
    setShowAddProductModal(false);
  };

  const openshowEditProductModal = (productName,productID,categoryName,productDescription,productPrice) => {
    setShowEditProductModal(true);
    setSelectedProductName(productName);
    setSelectedProductDescription(productDescription);
    setSelectedCategoryName(categoryName);
    setSelectedProductPrice(productPrice);
    setSelectedProductID(productID);
  };

  const closeshowEditProductModal = () => {
    setShowEditProductModal(false);
  };

  const openDeleteConfirmation = (productName,productID) => {
    setDeletingProductID(productID);
    setDeletingProductName(productName);
    setShowDeleteConfirmation(true);
  };

  const closeDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };


  const HandleDeleteProduct =() => {
      const fetchDeleteProducts = async () => {
    try {
      const response = await axios.delete(`${apiUrl}/product/delete/${deletingProductID}`, {
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
  fetchDeleteProducts();
 setShowDeleteConfirmation(false);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/product/get`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}` 
          }
        });
        if (response.status === 200) {
          setProducts(response.data);
        }
      } catch (error) {
        console.error('Error:', error.response.data);
      }
    };
    fetchProducts();
  }, [products]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-slate-50  text-black">
      <div className='flex border bg-white rounded p-4  flex-row items-center justify-between w-full mt-5  mb-4'>
      <IoMdArrowBack
          onClick={handleBackClick}
          className="text-black-500 hover:text-gray-400 cursor-pointer"
          style={{ fontSize: '24px' }}
        />
       
        <h1 className="text-2xl font-bold">MANAGE PRODUCT</h1>
        <button
          onClick={openshowAddProductModal}
          className="bg-black hover:scale-105  hover:ring-2 hover:ring-gray-700  text-white font-bold py-2 px-4 rounded"
        >
          Add Product
        </button>
        {showAddProductModal && <AddProduct onClose={closeshowAddProductModal} />}
      </div>

      <div className='flex border bg-white rounded p-4  flex-row items-center justify-between w-full mt-5  mb-4'>
        <input
          className="w-1/3 rounded-md p-2  border-black border-2"
          placeholder='Filter Product Name'
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>

      <div className='flex border bg-white rounded p-4  flex-row  tems-center justify-center  w-full mt-5  mb-4'>
        <table className="mt-4 w-full border text-center">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products
              .filter(product => product.name.toLowerCase().includes(filterText.toLowerCase())) 
              .map((product) => (
                <tr key={product.id}>
                  <td className="border px-4 py-2">{product.name}</td>
                  <td className="border px-4 py-2">{product.categoryName}</td>
                  <td className="border px-4 py-2">{product.description}</td>
                  <td className="border px-4 py-2">{product.price}</td>

                  <td className="border px-4 py-2 space-x-4 ">
                  <button 
  onClick={() => openshowEditProductModal(product.name, product.id,product.categoryName,product.description ,product.price,product.categoryId)} 
  className="text-black-500 hover:text-gray-700"
> <BsPencilFill   className="w-5 h-5 " />
                    </button>
                    {showEditProductModal && (
              <       EditProduct
             selectedProductName={selectedProductName}
              selectedProductDescription={selectedProductDescription}
             selectedCategoryName={selectedCategoryName}
              selectedProductPrice={selectedProductPrice}
              selectedCategoryID={selectedCategoryID}
              selectedProductID={selectedProductID}
                onClose={closeshowEditProductModal}
                className="w-5 h-5 " />  
                 )} 
                 
<button 
  onClick={() => openDeleteConfirmation(product.name,product.id)} 
  className="text-black-500 hover:text-gray-700">
  <ImBin  className="w-5 h-5 " />
  </button>
        <button   className="text-black-500 "      onClick={() => toggle(product,product.id,product.status)}    >
        {product.status==="true" ? <FiToggleLeft   className="w-6 h-6 " /> 
        : <FiToggleRight className="w-6 h-6 " /> }
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
              Are you sure want to delete {deletingProductName} product ?</h2>
            <div className="mt-5 space-x-3 text-center">
         
                <button
                  onClick={HandleDeleteProduct}
                  className="bg-black hover:scale-105  hover:ring-2 hover:ring-gray-700  text-white font-bold py-2 px-4 rounded mr-2"
                >
                  YES
                </button>

                <button
                  onClick={closeDeleteConfirmation}
                  className="bg-gray-300 hover:scale-105  hover:ring-2 hover:ring-gray-700   text-gray-700 font-bold py-2 px-4 rounded"
                >
                  NO
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  export default Product;
 
  
  