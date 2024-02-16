import React, { useState } from 'react';
import Table from "../components/Table.jsx";
import { mainCss } from "../styling/index.js";
import cn from "classnames";
import Dropdown from '../components/Dropdown.jsx';
import { TitleDiv, SearchBox } from "../components/smalComponents.jsx";
import { ICON_SHOPING } from "../assets/icons/index.js";
import Modal from "../components/Modal.jsx";

const ComponentsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [choice, setChoice] = useState({});

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    setSearchTerm(query);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleQuantitySubmit = (quantity) => {
    console.log("Quantidade inserida:", quantity);
  };

  const handleTableReturn = (tableData) => {
    console.log(tableData);
  };

  const adicionarItem = (item) => {
    setChoice(item);
    handleOpenModal();
  }

  const dados = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    Component: `Componente ${index + 1}`,
    pos: `Posição ${index + 1}`,
    ref: `Referência ${index + 1}`,
    amount: Math.floor(Math.random() * 10) + 1,
    price: (Math.random() * 100).toFixed(2),
  }));

  const filteredData = dados.filter(item => {
    return (
      item.Component.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ref.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <TitleDiv texto="Requesito de Componentes" subtexto="Armazem do Deti" />
      <div className={cn(mainCss.lineDiv)}>
        <div className={cn(mainCss.centerDrops)}>
          <SearchBox onSearch={handleSearch} />
          <Dropdown description="armazem:" />
          <Dropdown description="Familia:" />
        </div>
        <div className={cn(mainCss.iconDiv)}>
          <ICON_SHOPING className={cn(mainCss.icon)}/>             
          <div className={cn(mainCss.badge)}>3</div>
        </div> 
      </div>
      <Modal isOpen={isModalOpen} component={choice} onClose={handleCloseModal} onSubmit={handleQuantitySubmit} />
      
      <Table data={filteredData} onButtonClick={adicionarItem} /> {/* Passe a função adicionarItem como prop */}
    
    </div>
  );
}

export default ComponentsPage;
