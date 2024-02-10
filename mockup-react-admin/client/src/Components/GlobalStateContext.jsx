// GlobalStateContext.js
import React, { createContext, useContext, useState } from 'react';

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  // Add more variables as needed

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  return (
    <GlobalStateContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};