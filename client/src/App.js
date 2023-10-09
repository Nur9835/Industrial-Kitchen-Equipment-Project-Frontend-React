import React from "react";
import Home from "./page/Home";
import Dashboard from "./page/Dashboard";
import Order from "./page/Order";
import Product from "./page/Product";
import Category from "./page/Category";
import Bill from "./page/Bill";
import Users from "./page/Users";
import { UserProvider } from "./context/UserContext";
import{ CategoryProvider } from "./context/CategoryContext";
import { ProductProvider } from "./context/ProductContext";
import { OrderProvider } from "./context/OrdContext";
import { BillProvider } from "./context/BillContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
        <UserProvider> 
          <ProductProvider> 
          <CategoryProvider>
            <OrderProvider> 
              <BillProvider>
            <Router>
       <Routes>
       <Route exact path="/" element={ <div>  <Home/>  </div>   } />
       <Route path="/dashboard" element={<Dashboard />} />
       <Route path="/order" element={<Order />} />
       <Route path="/product" element={<Product />} />
       <Route path="/category" element={<Category />} />
       <Route path="/bill" element={<Bill />} />
       <Route path="/users" element={<Users />} />
      </Routes>
       </Router>
       </BillProvider>
       </OrderProvider>
       </CategoryProvider>
       </ProductProvider>
       </UserProvider>
    </div>
  );
}

export default App;
