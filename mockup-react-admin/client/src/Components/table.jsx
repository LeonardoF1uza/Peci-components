import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { useGlobalState } from './GlobalStateContext';
import addToCartimg from '../assets/addtocartimg.png';


function CompTable() {
  const { addToCart, cartItems, updateCartItemQuantity } = useGlobalState();
  const [data, setData] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isOperationSuccess, setOperationSuccess] = useState(false);
  const [isOperationError, setOperationError] = useState(false);
  const [popupIndex, setPopupIndex] = useState(null);

  const openPopup = (item) => {
    setPopupOpen(true);
    setSelectedItem(item);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setSelectedItem(null);
    setOperationSuccess(false);
    setOperationError(false);
  };

  useEffect(() => {
    fetch(import.meta.env.VITE_SERVER + '/api/components')
      .then(response => response.json())
      .then(data =>{ setData(data);
        console.log(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const getData = async (value) => {
    let urlWithParameters = import.meta.env.VITE_SERVER + '/api/components';
    if (value !== '') {
      urlWithParameters += `/search?q=${encodeURIComponent(value)}`;
    }

    fetch(urlWithParameters, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {

        setData(data);
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  };

  const handleAddToCart = (item, quantity) => {
    // Ensure the quantity is a positive number before adding to the global cart
    const validQuantity = Math.max(1, Math.floor(quantity));

    // Check if the item is already in the cart based on the reference
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.reference === item.reference);
    const updatedCartItems = [...cartItems];
    if (existingItemIndex !== -1) {
      if (updatedCartItems[existingItemIndex].quantity + validQuantity > item.quantity){
        setOperationError(true);
      } else {
        // Item already exists in the cart, update its quantity

        updatedCartItems[existingItemIndex].quantity += validQuantity;

        // Update the global cart with the modified items
        updateCartItemQuantity(updatedCartItems);
        setOperationSuccess(true);
      }
    } else {
      if (validQuantity > item.quantity){
        setOperationError(true);
      } else {
        // Item not found in the cart, add it with the specified quantity
        item.quantity= validQuantity;
        const itemWithQuantity = { ...item };

        // Add the item to the global cart
        addToCart(itemWithQuantity);
        setOperationSuccess(true);
      }
    }


    console.log(cartItems);
  };

  return (
    <>
      <input id='searchval' placeholder='Procurar Componente'></input>
      <button className="btn butt my-2 my-sm-0" onClick={() => getData(document.getElementById('searchval').value)}>Search</button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Componente</th>
            <th>Posição</th>
            <th>Referência</th>
            <th>Quantidade</th>
            <th>Preço</th>
            <th>Adicionar</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.warehouse}</td>
              <td>{item.designation}</td>
              <td>{item.position}</td>
              <td>{item.reference}</td>
              <td>{item.quantity}</td>
              <td>{item.price}€</td>
              <td>
                <input type="number" defaultValue={1} id={`popup-quantity-${index}`} />
                <button onClick={() => {
                  setPopupIndex(index);
                  openPopup(item)}}>
                  <img src={addToCartimg} alt="Add to Cart" id="addtocart" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {isPopupOpen && selectedItem && (
        <div className="popup-overlay">
          <div className="popup-content">
            {isOperationSuccess ? (
              <>
                <p>Operação concluída com sucesso!</p>
                <button className="btn butt my-2 my-sm-0" onClick={closePopup}>Fechar</button>
              </>
            ) :
            isOperationError?(
              <>
                <p>Quantidade adicionada superior ao stock!</p>
                <button className="btn butt my-2 my-sm-0" onClick={closePopup}>Fechar</button>
              </>):
            (
              <>
                <p>Adicionar {document.getElementById(`popup-quantity-${popupIndex}`).value + '  '+selectedItem.designation} ao carrinho?</p>
                {/* Add other details you want to display in the popup */}

                <button className="btn butt my-2 my-sm-0" onClick={() => handleAddToCart(selectedItem, document.getElementById(`popup-quantity-${popupIndex}`).value)}>
                  Adicionar ao carrinho
                </button>
                <button className="btn butt my-2 my-sm-0" onClick={closePopup}>Fechar</button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default CompTable;
