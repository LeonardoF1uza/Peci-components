import React, { useState, useEffect } from "react";
import { smalComponentCss } from "../styling/index.js";
import cn from "classnames";
import { TitleDiv2 } from "../components/smalComponents.jsx";
import { mainCss } from "../styling/index.js";

const Modal = ({ isOpen, onClose, onSubmit, component }) => {
  console.log(component);

  const [maxQuantity, setMaxQuantity] = useState(component.amount);
  const [quantity, setQuantity] = useState(1);
  const [invalidValue, setInvalidValue] = useState(false);

  const str0 = "insira quantidade de " + component.ref + ":";
  const str1 = "quantidade máxima: " + maxQuantity;

  useEffect(() => {
    setMaxQuantity(component.amount);
  }, [component]);

  const handleChange = (event) => {
    const value = parseInt(event.target.value);
    setQuantity(value);
    setInvalidValue(false); // Limpa a mensagem de erro ao alterar o valor do input
  };

  const handleSubmit = () => {
    // Verifica se a quantidade é válida apenas ao confirmar o envio
    if (quantity <= 0 || quantity > maxQuantity || isNaN(quantity)) {
      setInvalidValue(true); // Define que o valor é inválido
      return; // Sai da função sem enviar a quantidade
    }
    onSubmit(quantity);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div
      className={cn(smalComponentCss.modal, {
        [smalComponentCss.open]: isOpen,
      })}
    >
      <div className={cn(smalComponentCss.modalContent)}>
        <TitleDiv2 texto={str0} subtexto={str1} />

        <div className={cn(smalComponentCss.centerDrops)}>
          <input
            className={cn(smalComponentCss.inputs)}
            type="number"
            value={quantity}
            onChange={handleChange}
          />
          <button
            className={cn(smalComponentCss.submitBotton)}
            onClick={handleSubmit}
          >
            Confirmar
          </button>
          <button
            className={cn(smalComponentCss.submitBotton)}
            onClick={handleCancel}
          >
            Cancelar
          </button>
          <div className={cn(smalComponentCss.alignBotoms)}></div>
        </div>

        {invalidValue && <p className={cn(smalComponentCss.redText)}>Quantidade inválida!</p>}
      </div>
    </div>
  );
};

export default Modal;
