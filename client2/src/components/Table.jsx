// Importe useState se não estiver já importado
import React, { useState } from 'react'; 
import cn from 'classnames';
import { tableCss, mainCss } from '../styling/index.js';

const Table = ({ data, onButtonClick }) => { 
  const handleButtonClick = (item) => {
    // Chame a função passada como prop, passando o item como argumento
    onButtonClick(item);
  };

  return (
    <div className={cn(mainCss.position)}>
      <table className={cn(tableCss.tab)}>
        <thead>
          <tr>
            <th className={cn(tableCss.id)}>#</th>
            <th className={cn(tableCss.Component)}>Componente</th>
            <th className={cn(tableCss.pos)}>Posição</th>
            <th className={cn(tableCss.ref)}>Referência</th>
            <th className={cn(tableCss.amount)}>Quantidade</th>
            <th className={cn(tableCss.price)}>Preço</th>
            <th className={cn(tableCss.add)}>Ação</th> {/* Mudar o nome da coluna para "Ação" */}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td className={cn(tableCss.ComponentColumn)}>{item.Component}</td>
              <td>{item.pos}</td>
              <td>{item.ref}</td>
              <td>{item.amount}</td>
              <td>{item.price}</td>
              <td> {/* Renderize um botão ou o conteúdo padrão com base no tipo de item */}
                {Number.isInteger(item.add) ? (
                  item.add // Renderize o conteúdo padrão se for uma string
                ) : (
                  <button onClick={() => handleButtonClick(item)}>Adicionar</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
