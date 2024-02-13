
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import addToCart from '../assets/addtocart.png';
function CompTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/api/components')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const getData = async (value) => {

    let urlWithParameters = 'http://localhost:5001/api/components';
    if(value!==''){
        // Construct the URL with parameters
        urlWithParameters += `/search?q=${encodeURIComponent(value)}`;
    }
    // Make the fetch call
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
        // Handle the API response data
        setData(data);
      })
      .catch(error => {
        // Handle errors during the fetch
        console.error('Fetch error:', error);
      });
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
            {/* Add more table headers based on your API response */}
            <th>Posição</th>
            <th>Referência</th>
            <th>Quantidade</th>
            <th>Preço</th>
            <th>Adicionar</th>
            {/* Add more headers as needed */}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.component_id}</td>
              <td>{item.name}</td>
              {/* Render other columns based on your API response */}
              <td>{item.position}</td>
              <td>{item.reference}</td>
              <td>{item.quantity}</td>
              <td>{item.price}€</td>
              <td><input type="number"></input><button><img  src={addToCart} id="addtocart"/></button></td>
              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default CompTable;
