

export const initialState = {
  loading: false, 
  error: null,    
  shows: [],      
  query: 'love', 
  page: 1,        
  pageSize: 6,    
  filters: {      
    genre: '',
    language: '',
    minRating: 0,
  },
  watchlist: [],     
};

export const actionTypes = {
  FETCH_INIT: 'FETCH_INIT',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAILURE: 'FETCH_FAILURE',
  SET_QUERY: 'SET_QUERY',
  SET_FILTERS: 'SET_FILTERS',
  SET_PAGE: 'SET_PAGE',
  SET_PAGE_SIZE: 'SET_PAGE_SIZE',
  ADD_WATCHLIST: 'ADD_WATCHLIST',
  REMOVE_WATCHLIST: 'REMOVE_WATCHLIST',
  CLEAR_WATCHLIST: 'CLEAR_WATCHLIST',
};

export function appReducer(state, action) {
  switch (action.type) {
    case actionTypes.FETCH_INIT:
      return { ...state, loading: true, error: null };

    case actionTypes.FETCH_SUCCESS:
  
      return { ...state, loading: false, shows: action.payload, error: null, page: 1 };

    case actionTypes.FETCH_FAILURE:
      return { ...state, loading: false, error: action.payload, shows: [] };

    case actionTypes.SET_QUERY:

      return { ...state, query: action.payload };

    case actionTypes.SET_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.payload }, page: 1 };
    
    case actionTypes.SET_PAGE:
    
        return { ...state, page: action.payload };

    case actionTypes.ADD_WATCHLIST:
 
      if (state.watchlist.some(item => item.id === action.payload.id)) {
        return state;
      }
      return { ...state, watchlist: [...state.watchlist, action.payload] };

    case actionTypes.REMOVE_WATCHLIST:
      return {
        ...state,
        watchlist: state.watchlist.filter(item => item.id !== action.payload),
      };
    
    case actionTypes.CLEAR_WATCHLIST:
        return { ...state, watchlist: [] };

    default:
      throw new Error(`Bilinmeyen aksiyon tipi: ${action.type}`);
  }
}