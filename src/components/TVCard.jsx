import { Link } from 'react-router-dom';
import { actionTypes } from '../state/appReducer';

function TVCard({ show, dispatch }) {

  const { id, name, image, genres, language, rating, summary } = show;


  const handleAddToWatchlist = () => {
    
    dispatch({ type: actionTypes.ADD_WATCHLIST, payload: show }); 
  };


  const cleanSummary = summary 
    ? summary.replace(/<[^>]+>/g, '').substring(0, 100) + '...'
    : 'Özet mevcut değil.';
    
  const imageUrl = image?.medium || 'https://via.placeholder.com/210x295?text=Poster+Yok'; // Poster 

  return (
    <div className="tv-card">
      <img src={imageUrl} alt={name} className="card-poster" />
      <div className="card-content">
        <h4>{name}</h4>
        <p className="meta">
          Tür: {genres?.join(', ') || 'N/A'} 
          <br/>
          Dil:{language}  | 
          Puan: {rating?.average ? rating.average : 'N/A'} 
        </p>
        <p className="summary-text">{cleanSummary}</p>
        
        <div className="card-actions">
       
          <Link to={`/show/${id}`} className="button detail-button">Detay</Link>
          
      
          <button onClick={handleAddToWatchlist} className="button watchlist-button">
            Kısa Listeye Ekle
          </button>
        </div>
      </div>
    </div>
  );
}

export default TVCard;