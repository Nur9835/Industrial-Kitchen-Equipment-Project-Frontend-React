import React, { useState, useEffect } from "react";
import axios from 'axios';
import { ImBin  } from "react-icons/im";
import jsPDF from 'jspdf';
import { IoMdArrowBack } from 'react-icons/io';

import { useCategory } from "../context/CategoryContext";
import {useOrder} from "../context/OrdContext"

function Order() {

  const{categories, setCategories}=useCategory();

  const{
    apiUrl,
    bills,
    setBills,
    fetchBills:fetchBills,
    selectedCategoryId, 
    setSelectedCategoryId,
    selectedProductId, 
    setSelectedProductId,
    selectedProductPrice,
     setSelectedProductPrice,
    selectedProductName, 
    setSelectedProductName,
    selectedProductCategory,
     setSelectedProductCategory,
    selectedProductQuantity, 
    setSelectedProductQuantity,
    order, 
    setOrder,
    total, 
    setTotal,
    totalBill, 
    setTotalBill,
    updatedOrder,
    calculateTotalAmount
  }=useOrder();

  const [products, setProducts] = useState([]);


const [categorySelected, setCategorySelected] = useState(false);
const [productSelected, setproductSelected] = useState(false);




const handleDeleteBill = async (productId) => {
  const updatedProductDetails = { ...order.productDetails };
  if (updatedProductDetails.hasOwnProperty(productId)) {
    delete updatedProductDetails[productId];
    setOrder({ ...order, productDetails: updatedProductDetails });
  }

};

  const handleProductChange = (e) => {
    const selectedId = e.target.value;
    setSelectedProductId(selectedId);
    setTotal(0);
    setproductSelected(true);
  };

  const handleCategoryChange = (e) => {
   const selectedValue = e.target.value;
   const [categoryId, categoryName] = selectedValue.split('-');
   setSelectedCategoryId(categoryId);
   setSelectedProductCategory(categoryName);
   setCategorySelected(true);
 };


 useEffect(() => {
  if (!categorySelected && categories.length > 0) {
     const defaultCategoryId= categories[0].id;
     const defaultCategoryName =categories[0].name;
     
    setSelectedCategoryId(defaultCategoryId);
    setSelectedProductCategory(defaultCategoryName);
    setCategorySelected(true);
  }
}, [categorySelected, categories]);


useEffect(() => {
  if (products.length > 0) {
     const defaultProductId= products[0].id;
     const defaultProductName =products[0].name;
     
    setSelectedProductId(defaultProductId);
    setSelectedProductName(defaultProductName);
    setproductSelected(true); 
  }
}, [productSelected, products]);

 const handleQuantityChange = (e) => {
  const quantity = parseInt(e.target.value, 10) || 0;
  setSelectedProductQuantity(quantity);


  if (!isNaN(selectedProductPrice)) {
    setTotal(quantity * selectedProductPrice);
  }
};

useEffect(() => {

  const fetchProductPrice = async () => {
    try {
      const response = await axios.get(`${apiUrl}/product/getById/${selectedProductId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      if (response.status === 200) {
        setSelectedProductPrice(response.data.price);
        setSelectedProductName(response.data.name);
        

        if (!isNaN(selectedProductQuantity)) {
          setTotal(selectedProductQuantity * response.data.price);
        }
      }
    } catch (error) {
      console.error('Error:', error.response.data);
    }
  };

  fetchProductPrice();
}, [selectedProductId]);




  useEffect(() => {


    const fetchProductsCategory = async () => {
      try {
        const response = await axios.get(`${apiUrl}/product/getByCategory/${selectedCategoryId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });
        if (response.status === 200) {
          setProducts(response.data);
        }
      } catch (error) {
        console.error('Error:', error.response.data);
      }
    };

    fetchProductsCategory();
  }, [selectedCategoryId]);




  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder({
      ...order,
      [name]: value,
    });
  };

  


  const productDetailsString = `${selectedProductId}:${JSON.stringify({
    name: selectedProductName,
    category: selectedProductCategory,
    price: selectedProductPrice,
    quantity: selectedProductQuantity,
    total: total,
  })}`;
  
  const updatedOrder3 = {
    ...order,
    totalAmount: totalBill,
    productDetails: `{${productDetailsString}}`,
  };


  const getPdf = async () => {
    try {

      console.log("sseee",updatedOrder3)

      const response = await axios.post(
       `${apiUrl}/bill/getPdf`, 
       updatedOrder3,
        {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, 
       },
         responseType: 'blob', 
       }
      );
   
      if (response.status === 200) {

      const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');

     }
    } catch (error) {
      console.error("Hata:", error);
     }
    };






    const addProductToOrder = () => {


      if (selectedProductId && selectedProductQuantity > 0) {
        const updatedProductDetails = { ...order.productDetails };
        updatedProductDetails[selectedProductId] = {
          name: selectedProductName,
          category: selectedProductCategory,
          price: selectedProductPrice,
          quantity: selectedProductQuantity,
          total: total,
        };
   
        const newTotalBill = Object.values(updatedProductDetails).reduce(
        (acc, product) => acc + parseFloat(product.total),
        0
       );


      setOrder({ ...order, productDetails: updatedProductDetails });

       setTotalBill(newTotalBill.toFixed(2));

      }
    };


const handleOrderSubmit = async () => {

addProductToOrder();

};

const pdf = async () => {
  const pdf = new jsPDF();

  const title = 'COMMERCIAL INVOICE';
  const customerName = order.name;
  const email = order.email;
  const contactNumber = order.contactNumber;
  const paymentMethod = order.paymentMethod;
  const total = totalBill;
  const productDetailsTitle = 'Product Details:';
  const customerDetailsTitle = 'Customer Details:';
  const tableHeaders = ['Name', 'Category', 'Quantity', 'Price', 'Sub Total'];
  const billTitle='Thank you for visiting. Please visit again!';

  let yOffset = 20; 

  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold'); 
  pdf.text(105, yOffset, title, 'center');

  yOffset += 10;

  pdf.setFontSize(14);
  pdf.text(8, yOffset, customerDetailsTitle);

  yOffset += 15;

  pdf.setFontSize(12);

  pdf.text(8, yOffset, `Name: ${customerName}`);
  yOffset += 10;

  pdf.text(8, yOffset, `Email: ${email}`);
  yOffset += 10;

  pdf.text(8, yOffset, `Contact Number: ${contactNumber}`);
  yOffset += 10; 

  pdf.text(8, yOffset, `Payment Method: ${paymentMethod}`);
  yOffset += 10; 

  yOffset += 10;

  pdf.setFontSize(14);
  pdf.text(8, yOffset, productDetailsTitle);

  yOffset += 10;


  pdf.setFontSize(10);
  pdf.setFillColor(	255, 250 ,240);
  pdf.rect(8, yOffset, 195, 10, 'F'); 
  pdf.setTextColor(0, 0, 0); 
  pdf.setFont('helvetica', 'bold'); 

  let xPosition = 25;
  tableHeaders.forEach((header) => {
    pdf.text(xPosition, yOffset + 8, header);
    xPosition += 40;
  });

  yOffset += 10;


  pdf.setFont('helvetica', 'normal'); 
  Object.keys(order.productDetails).forEach((productId) => {
    const product = order.productDetails[productId];
    pdf.rect(8, yOffset, 195, 10); 
    pdf.text(10, yOffset + 8, product.name.toString());
    pdf.text(65, yOffset + 8, product.category.toString()); 
    pdf.text(105, yOffset + 8, product.quantity.toString()); 
    pdf.text(145, yOffset + 8, product.price.toString());
    pdf.text(185, yOffset + 8, product.total.toString()); 
    yOffset += 10;
  });


  yOffset += 10;
  pdf.setFont('helvetica', 'bold'); 
  pdf.text(10, yOffset, `Total: ${total}`);
  yOffset += 10; 


const imgX = 140 ;
  const imgY =  20;
  const imgWidth = 80;
  const imgHeight = 40;
  
  pdf.addImage('fatura.png', 'PNG', imgX, imgY, imgWidth, imgHeight);


  pdf.text(10, yOffset, billTitle);
  console.log(order.uuid);
  //const pdfFileName = `${uuidbill}.pdf`; 
  const pdfFileName = `COMMERCIAL_INVOICE.pdf`; 
  // const serverFilePath = '/server/report/${pdfFileName}';
  const serverFilePath = `/server/report/${pdfFileName}`;

  const savePdfResponse = await axios.post(
    `${apiUrl}/bill/savePdf`,
    { pdfData: pdf.output('blob'), filePath: serverFilePath }, 
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (savePdfResponse.status === 200) {

  pdf.save(pdfFileName);
    return serverFilePath;
  } else {
    console.error("Failed to save PDF on server");
  }


  
};


const handleBillPdf = async (e) => {

 try{
  await fetchBills();


  setOrder({ ...order, productDetails: {} }); 

pdf();

setBills([]);
setTotalBill(0);
setSelectedProductId('');
setSelectedProductPrice(null);
setSelectedProductCategory('');
setSelectedProductQuantity(0);
setTotal(0);

e.preventDefault();

 }



 catch (error) {
  console.error('Hata:', error);
}


}

useEffect(() => {

  setOrder({ ...order, productDetails: {} });
  setTotalBill(0);


}, []);


const handleBackClick = () => {

  window.location.href = "/dashboard";
};

  return (
    <div className="min-h-screen flex flex-col items-center bg-slate-50  text-black">
      <div className='flex border bg-white rounded p-4  flex-row items-center justify-between w-full mt-5  mb-4'>
       
      <IoMdArrowBack
          onClick={handleBackClick}
          className="text-black-500 hover:text-gray-400 cursor-pointer"
          style={{ fontSize: '24px' }}
        />
        
       
       
        <h1 className="text-2xl font-bold">MANAGE ORDER</h1>
        <button
          onClick={handleBillPdf}
          className="bg-black text-white hover:scale-105  hover:ring-2 hover:ring-gray-700 font-bold py-2 px-4 rounded"
        >
          Submit & Get Bill
        </button>
      </div>

      <div className='flex border bg-white rounded p-4  flex-col  w-full mt-5  mb-4'>
        <h1 className="text-2xl font-bold">Customer Details:</h1>
        <div className="flex flex-row ">
          <div className="w-1/4 p-2">
            <input
              onChange={handleInputChange}
              name="name"
              type="text"
              className="w-full border rounded-lg p-2"
              placeholder="Name"
            />
          </div>
          <div className
="w-1/4 p-2">
<input
  type="text"
  name="email"
  onChange={handleInputChange}
  className="w-full border rounded-lg p-2"
  placeholder="Email"
/>
</div>
<div className="w-1/4 p-2">
<input
  type="text"
  name="contactNumber"
  onChange={handleInputChange}
  className="w-full border rounded-lg p-2"
  placeholder="Contact Number"
/>
</div>
<div className="w-1/4 p-2">
<select
  name="paymentMethod"
  onChange={handleInputChange}
  placeholder="Payment Method"
  className="w-full border rounded-lg p-2"
>
  <option value="Cash">Cash</option>
  <option value="Credit Card">Credit Card</option>
  <option value="Debit Card">Debit Card</option>
</select>
</div>
</div>
</div>

<div className='flex border bg-white rounded space-y-4 p-4 flex-col w-full mt-5 mb-4'>
<h1 className="text-2xl font-bold">Select Product:</h1>
<div className="flex flex-row ">
<div className="w-1/4 p-2">
<select
  name="categoryId"
  onChange={handleCategoryChange}

  placeholder="Select category"
value={`${selectedCategoryId}-${selectedProductCategory}`}
  className="w-full rounded-md p-2 border border-gray-400"
  required
>
  <option value="" disabled>Select a category</option>
  {categories.map((category) => (
   <option key={category.id} value={`${category.id}-${category.name}`}>
      {category.name}
    </option>
  ))}
</select>
</div>

<div className="w-1/4 p-2">
<select
  onChange={handleProductChange}
  className="w-full border rounded-lg p-2"
  placeholder="Payment Method"
>
  <option value="" disabled>Select a product</option>
  {products.map((product) => (
    <option key={product.id} value={product.id}>
      {product.name}
    </option>
  ))}
</select>
</div>

<div className="w-1/4 p-2">
<input
  type="text"
  name="selectedProductPrice"
  value={selectedProductPrice}
  className="w-full border rounded-lg p-2"
  placeholder="Price"
/>
</div>

<div className="w-1/4 p-2">
<input
  type="number"
  value={selectedProductQuantity}
  onChange={handleQuantityChange} 

  className="w-full border rounded-lg p-2"
  placeholder="Quantity"
/>
</div>

<div className="w-1/4 p-2">
<input
  type="text"
  value={total}
  onChange={(e) => setTotal(e.target.value)}
  name="total"
  className="w-full border rounded-lg p-2"
  placeholder="Total"
/>
</div>
</div>

<div className="flex flex-row text-start justify-between p-2 w-full">
<button
onClick={handleOrderSubmit}
className="bg-black hover:scale-105  hover:ring-2 hover:ring-gray-700  text-white font-bold py-2 px-4 rounded"
>
Add
</button>
<button
className="bg-black  text-white font-bold py-2 px-4 rounded"
>
Total Amount: {totalBill}
</button>
</div>
</div>

<div className='flex border bg-white rounded p-4 flex-row items-center justify-center w-full mt-5 mb-4'>

<table className="mt-4 w-full border text-center">

<thead>
  <tr>
    <th className="px-4 py-2">Name</th>
    <th className="px-4 py-2">Category</th>
    <th className="px-4 py-2">Price</th>
    <th className="px-4 py-2">Quantity</th>
    <th className="px-4 py-2">Total</th>

  </tr>
</thead>
<tbody>

  {Object.keys(order.productDetails).map((productId) => {
  const product = order.productDetails[productId];
  return (
    <tr key={productId}>
    <td className="border px-4 py-2">{product.name}</td>
    <td className="border px-4 py-2">{product.category}</td>
    <td className="border px-4 py-2">{product.price}</td>
    <td className="border px-4 py-2">{product.quantity}</td>
    <td className="border px-4 py-2">{product.total}</td>
    <td className="border px-4 py-2" rowSpan={product.length}>
                    <button
                      onClick={() => handleDeleteBill(productId)}
                      className="text-black-500 hover:text-gray-700"
                    >
                      <ImBin className="w-5 h-5" />
                    </button>
                  </td>
</tr>

  );
})}

</tbody>

</table>
</div>
</div>
);
}

export default Order;
