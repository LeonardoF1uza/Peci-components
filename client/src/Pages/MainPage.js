import React, { useState, useEffect } from 'react';
import Navegationbar from './components/navbar.js';
import CompTable from './components/table.js';
const MainPage = () => {

  return (
      <div>
        <Navegationbar></Navegationbar>
        <CompTable></CompTable>
    </div>
  );
};

export default MainPage;