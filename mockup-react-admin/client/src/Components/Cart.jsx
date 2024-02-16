import React, { useState } from 'react';
import { useGlobalState } from './GlobalStateContext';
import RequisitionForm from './RequisitionForm';
import Table from 'react-bootstrap/Table';
const Cart = () => {
  const { cartItems , selectedWarehouse, setWarehouse} = useGlobalState();


  const groupedData = cartItems.reduce((groups, item) => {
    const { warehouse } = item;
    groups[warehouse] = groups[warehouse] || [];
    groups[warehouse].push(item);
    return groups;
  }, {});

  const warehouseFinish = (warehouse) => {
    setWarehouse(warehouse);

  };
  // Render your shopping cart UI using cartItems
  return (
    <div>
      <h2>Requisições</h2>

    <div>
      {Object.keys(groupedData).map((warehouse, index) => (
        <div key={index} className="warehouse-section">
          <h2>{`Warehouse ${warehouse}`}</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Componente</th>
                <th>Posição</th>
                <th>Referência</th>
                <th>Quantidade</th>
                <th>Preço</th>
                <th>Remover</th>
              </tr>
            </thead>
            <tbody>
              {groupedData[warehouse].map((item, itemIndex) => (
                <tr key={itemIndex}>
                  <td>{item.warehouse}</td>
                  <td>{item.designation}</td>
                  <td>{item.position}</td>
                  <td>{item.reference}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}€</td>
                  <td><button>X</button></td>
                </tr>
              ))}
            </tbody>
          </Table>
          <button className="btn butt my-2 my-sm-0" onClick={() => warehouseFinish(warehouse)}>Completar requisição de {warehouse}</button>
          {selectedWarehouse === warehouse && (
              <div className="requisition-form-box">
                <RequisitionForm warehouse={selectedWarehouse} />
              </div>
            )}
        </div>
      ))}
    </div>

    </div>
  );
};
export default Cart;