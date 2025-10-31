import { actionTypes } from '../state/appReducer';

function WatchlistPanel({ watchlist, dispatch }) { 
  

  const handleRemove = (id) => {
    dispatch({ type: actionTypes.REMOVE_WATCHLIST, payload: id }); 
  };


  const handleClear = () => {
    if (window.confirm("Tüm listeyi temizlemek istediğinizden emin misiniz?")) {
        dispatch({ type: actionTypes.CLEAR_WATCHLIST }); 
    }
  };

  return (
    <aside className="watchlist-panel">
      <h3>🎥🍿 Gösterime Girecekler ({watchlist.length})</h3> 
      
      {watchlist.length === 0 ? (
        <p>Listeniz boş. Lütfen listeden dizi ekleyin.</p>
      ) : (
        <>
          <button onClick={handleClear} className="clear-button">Listeyi Temizle</button>
          <ul className="watchlist-list">
            {watchlist.map(item => (
              <li key={item.id}>
              
                <Link to={`/show/${item.id}`} className="watchlist-item-name">{item.name}</Link>
                
              
                <button onClick={() => handleRemove(item.id)} className="remove-button">
                  X
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </aside>
  );
}

export default WatchlistPanel;