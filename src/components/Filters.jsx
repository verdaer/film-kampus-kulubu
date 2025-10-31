import React, { useState, useEffect, useMemo } from 'react';
import { actionTypes } from '../state/appReducer';

function Filters({ currentFilters, dispatch, allShows }) {

  const [localFilters, setLocalFilters] = useState(currentFilters);

  useEffect(() => {
    setLocalFilters(currentFilters);
  }, [currentFilters]);

  const { uniqueGenres, uniqueLanguages } = useMemo(() => {
    const genresSet = new Set();
    const languagesSet = new Set();

    allShows.forEach(show => {
   
      show.genres?.forEach(genre => genresSet.add(genre));
     
      if (show.language) {
        languagesSet.add(show.language);
      }
    });
    return {
      uniqueGenres: Array.from(genresSet).sort(),
      uniqueLanguages: Array.from(languagesSet).sort(),
    };
  }, [allShows]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    let newValue = value;
    if (name === 'minRating') {
   
        newValue = parseFloat(value);
    }

    const newFilters = { 
        ...localFilters, 
        [name]: newValue 
    };
    
    setLocalFilters(newFilters);

    dispatch({ 
        type: actionTypes.SET_FILTERS, 
        payload: newFilters 
    });
  };

  return (
    <div className="filters">
      <select name="genre" value={localFilters.genre} onChange={handleChange}>
        <option value="">Tüm Türler</option>
        {uniqueGenres.map(genre => (
          <option key={genre} value={genre}>{genre}</option>
        ))}
      </select>

      <select name="language" value={localFilters.language} onChange={handleChange}>
        <option value="">Tüm Diller</option>
        {uniqueLanguages.map(lang => (
          <option key={lang} value={lang}>{lang}</option>
        ))}
      </select>
      <select name="minRating" value={localFilters.minRating} onChange={handleChange}>
        <option value={0}>Min Puan (Hepsi)</option>
        {[7, 7.5, 8, 8.5, 9].map(rating => (
          <option key={rating} value={rating}>{rating} ve Üzeri</option>
        ))}
      </select>
    </div>
  );
}

export default Filters;