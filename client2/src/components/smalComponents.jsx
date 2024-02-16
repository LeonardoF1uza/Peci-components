import React, { useState }  from 'react';
import cn from 'classnames';
import { smalComponentCss } from '../styling/index.js';



const TitleDiv = ({ texto, subtexto }) => {
  return (
    <div className={cn(smalComponentCss.position)}>
      <p className={cn(smalComponentCss.title)}>{texto}</p>
      <p className={cn(smalComponentCss.subTitle)}>{subtexto}</p>
    </div>
  );
};

const TitleDiv2 = ({ texto, subtexto }) => {
  return (
    <div className={cn(smalComponentCss.position2)}>
      <p className={cn(smalComponentCss.title2)}>{texto}</p>
      <p className={cn(smalComponentCss.subTitle2)}>{subtexto}</p>
    </div>
  );
};



const SearchBox = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Passa a consulta para a função de pesquisa externa
    onSearch(query);
  };

  return (
    
    <form className ={cn(smalComponentCss.SearchBox)} onSubmit={handleSubmit}>
      <input
        className={cn(smalComponentCss.inputs)}
        type="text"
        placeholder="Digite sua busca..."
        value={query}
        onChange={handleInputChange}
      />
        
      <button className={cn(smalComponentCss.submitBotton)} type="submit">search</button>
    </form>
  );
};



export { SearchBox, TitleDiv, TitleDiv2 }; 
