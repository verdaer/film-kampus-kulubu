

import React, { useReducer, useEffect, useMemo } from 'react';
import axios from 'axios'; 
import { Link } from 'react-router-dom';
import { initialState, appReducer, actionTypes } from '../state/appReducer';


import SearchBox from './SearchBox';       
import Filters from './Filters';           
import TVList from './TVList';             
import WatchlistPanel from './WatchlistPanel'; 
import Pagination from './Pagination';     
import Footer from './Footer';             
import LoadingSpinner from './status/LoadingSpinner'; 
import ErrorComponent from './status/ErrorComponent';
import EmptyState from './status/EmptyState';         

function Home() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { loading, error, shows, query, page, pageSize, filters } = state;

 
  useEffect(() => {
    if (!query) return;

    dispatch({ type: actionTypes.FETCH_INIT }); 

    const source = axios.CancelToken.source();

    const fetchShows = async () => {
      try {
        const url = `https://api.tvmaze.com/search/shows?q=${query}`;
        const response = await axios.get(url, { cancelToken: source.token });
        const showData = response.data.map(item => item.show);

        dispatch({ type: actionTypes.FETCH_SUCCESS, payload: showData }); 

      } catch (err) {
        if (axios.isCancel(err)) return;
        dispatch({ type: actionTypes.FETCH_FAILURE, payload: err.message }); 
      }
    };

    fetchShows();

    return () => {
      source.cancel('Yeni arama isteği geldi.');
    };
  }, [query]); 


  const { paginatedList, totalPages } = useMemo(() => {
    let currentShows = shows;

    
    if (filters.minRating > 0) {
        currentShows = currentShows.filter(show => (show.rating?.average || 0) >= filters.minRating);
    }
    if (filters.genre) {
        currentShows = currentShows.filter(show => show.genres?.includes(filters.genre));
    }
   

 
    const totalShows = currentShows.length;
    const calculatedTotalPages = Math.ceil(totalShows / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return {
        paginatedList: currentShows.slice(startIndex, endIndex),
        totalPages: calculatedTotalPages
    };
  }, [shows, filters, page, pageSize]); 


  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorComponent message={error} onRetry={() => dispatch({ type: actionTypes.SET_QUERY, payload: state.query })} />;
  }

  return (
    <div className="home-container">
      <header>
      
        <SearchBox currentQuery={query} dispatch={dispatch} />
        <Filters currentFilters={filters} dispatch={dispatch} allShows={shows} />
      </header>
      
      <main className="content-area">
        <div className="tv-list-area">
          {paginatedList.length === 0 ? (
            <EmptyState />
          ) : (
            <TVList shows={paginatedList} dispatch={dispatch} />
          )}
          
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => dispatch({ type: actionTypes.SET_PAGE, payload: newPage })}
           
          />
        </div>

        <WatchlistPanel watchlist={state.watchlist} dispatch={dispatch} />
      </main>

      <Footer name="Süleyman Demirel Üniversitesi Öğrencisi" />
    </div>
  );
}

export default Home;



