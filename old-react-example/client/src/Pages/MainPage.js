import React from 'react';
import Navegationbar from './components/navbar.js';
import CompTable from './components/table.js';
import './css/navbar.css';

const MainPage = () => {

  return (
      <div>
        <Navegationbar></Navegationbar>
        <CompTable></CompTable>
    </div>
  );
};

export default MainPage;