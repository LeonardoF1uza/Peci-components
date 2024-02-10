import React from 'react';
import { useGlobalState } from '../Components/GlobalStateContext';

const Cart = () => {
  const { cartItems } = useGlobalState();

  // Render your shopping cart UI using cartItems
  return (
    <div>
      <h2>Requisições</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};
export default Cart;