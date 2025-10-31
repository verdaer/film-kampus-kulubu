import React from 'react';
import { actionTypes } from '../state/appReducer';

function SearchBox({ currentQuery, dispatch }) {
  const [input, setInput] = React.useState(currentQuery);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: actionTypes.SET_QUERY, payload: input });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="Dizi Adı Ara..."
      />
      <button type="submit">Arama</button>
    </form>
  );
}

export default SearchBox; 