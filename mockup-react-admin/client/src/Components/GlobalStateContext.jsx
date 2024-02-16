// GlobalStateContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const storedCartItems = localStorage.getItem('cartItems');
      console.log('Stored Cart Items:', storedCartItems);

      if (storedCartItems) {
        const parsedCartItems = JSON.parse(storedCartItems);
        setCartItems(parsedCartItems);
        console.log('Updated Cart Items:', parsedCartItems);
        console.log('Success');
      }
    };

    fetchData();
  }, []);

  const updateCartItemQuantity = (reference, quantity) => {
    setCartItems(prevCartItems => {
      return prevCartItems.map(item => {
        if (item.reference === reference) {
          return { ...item, quantity: item.quantity + quantity };
        }
        return item;
      });
    });
  };

  const selectFromWarehouse = () => {
    if (!selectedWarehouse) {
      return [];
    }

    return cartItems
      .filter(item => item.warehouse === selectedWarehouse)
      .map(({ reference, quantity }) => ({ reference, quantity }));
  };


  const setWarehouse = (warehouse) => {
    setSelectedWarehouse(warehouse);
  };

  const addToCart = (product) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = [...prevCartItems, product];
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      console.log('Updated Cart Items:', updatedCartItems);
      return updatedCartItems;
    });
  };
  const removeFromCart = (product) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = [...prevCartItems, product];
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      console.log('Updated Cart Items:', updatedCartItems);
      return updatedCartItems;
    });
  };
  return (
    <GlobalStateContext.Provider value={{ cartItems, addToCart, updateCartItemQuantity,
    selectFromWarehouse, setWarehouse, selectedWarehouse }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};