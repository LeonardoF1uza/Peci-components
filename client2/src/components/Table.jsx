import React, { useState, useEffect } from "react";
import cn from "classnames";
import { tableCss, mainCss } from "../styling/index.js";

const Table = ({ data, columns, onButtonClick, button }) => {
  const handleButtonClick = (item) => {
    onButtonClick(item);
  };

  return (
    <div className={cn(mainCss.position)}>
      <table className={cn(tableCss.tab)}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className={cn(tableCss[column.id])}>
                {column.title}
              </th>
            ))}
            {button && <th className={cn(tableCss.add)}>Adicionar</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map((column, columnIndex) => (
                <td key={columnIndex}>{item[column.id]}</td>
              ))}
              {button && (
                <td>
                  <button onClick={() => handleButtonClick(item)}>
                    Adicionar
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;