import React, { useState} from 'react'
import {
  Route
} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import CustomerInfos from "./components/CustomerInfos/CustomerInfos";
import Sale from "./components/Sale/Sale";

const App = () => {
  const [currentCustomer, setCurrentCustomer] = useState({});
  return (
    
    <div>
      <NavBar />
        <Route path="/customers" component={() => <CustomerInfos currentCustomer={currentCustomer} setCurrentCustomer={setCurrentCustomer} />} />
        <Route path="/sale" component={() => <Sale />} />
       
    </div>
  );
}

export default App;
