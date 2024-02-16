import React, { useState } from "react";
import Table from "../components/Table.jsx";
import { mainCss, smalComponentCss } from "../styling/index.js";
import cn from "classnames";
import Dropdown from "../components/Dropdown.jsx";
import { TitleDiv, SearchBox } from "../components/smalComponents.jsx";
import { ICON_SHOPING } from "../assets/icons/index.js";

const ListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleTableReturn = (tableData) => {
    console.log(tableData);
  };

  const dados = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    Component: `Componente ${index + 1}`,
    pos: `Posição ${index + 1}`,
    ref: `Referência ${index + 1}`,
    amount: Math.floor(Math.random() * 10) + 1,
    price: (Math.random() * 100).toFixed(2),
    add: Math.floor(Math.random() * 10) + 1,
  }));

  // Filtrar dados com base no termo de pesquisa e nos campos "Component" e "Ref"
  const filteredData = dados.filter((item) => {
    return (
      item.Component.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ref.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <TitleDiv
        texto="Lista de componentes para requesição"
        subtexto="Armazem do Deti"
      />
      <div className={cn(mainCss.lineDiv)}></div>
      <div className={cn(smalComponentCss.lineDiv2)}></div>
      <Table data={filteredData} onTableReturn={handleTableReturn} />

      <div className={cn(mainCss.lineDiv)}>
        <button className={cn(smalComponentCss.BottonRight)} type="submit">
          Requesitar
        </button>
      </div>
    </div>
  );
};

export default ListPage;
