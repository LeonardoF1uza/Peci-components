import React, { useState } from 'react';

import {AdmTable, EditAdmin , EntryAdmin,  RequestAdmin} from '../AdminComponents/index.jsx';

const Admin = () => {
  const [activeTable, setActiveTable] = useState(0);

  const toggleTable = (tableNumber) => {
    setActiveTable((prevTable) => (prevTable === tableNumber ? null : tableNumber));
  };
  const renderTable = () => {
    switch (activeTable) {
      case 1:
        return <AdmTable />;
      case 2:
        return<EntryAdmin></EntryAdmin>
      case 3:
        return <EditAdmin></EditAdmin>
      case 4:
        return <RequestAdmin></RequestAdmin>

      default:
        return null;
    }
  };

  return (
    <div id="Admin">
      <h1>Welcome Admin,</h1>
      <p>Welcome to the Admin Page!</p>
      <div className="buttons-container">
        <button className="btn butt my-2 my-sm-0" onClick={() => toggleTable(1)}>
          {activeTable === 1 ? 'Fechar Requisições' : 'Requisições'}
        </button>
        <button className="btn butt my-2 my-sm-0" onClick={() => toggleTable(2)}>
          {activeTable === 2 ? 'Fechar Entrada de Componentes' : 'Entrada de Componentes'}
        </button>
        <button className="btn butt my-2 my-sm-0" onClick={() => toggleTable(3)}>
          {activeTable === 3 ? 'Fechar Edição de Componentes' : 'Edição de Componentes'}
        </button>
        <button className="btn butt my-2 my-sm-0" onClick={() => toggleTable(4)}>
          {activeTable === 4 ? 'Fechar Requisitar Componentes' : 'Requisitar Componentes'}
        </button>
      </div>

      {renderTable()}
    </div>
  );
};

export default Admin;