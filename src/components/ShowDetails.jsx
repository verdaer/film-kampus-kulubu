

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from './status/LoadingSpinner.jsx'; 
import ErrorComponent from './status/ErrorComponent'; 

function ShowDetail() {
 
  const { id } = useParams();

 
  const [show, setShow] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  useEffect(() => {
 
    if (!id) return;

    setLoading(true);
    setError(null);
    setShow(null);
    setEpisodes([]);

    const source = axios.CancelToken.source();

    const fetchDetails = async () => {
      try {
      
        const showUrl = `https://api.tvmaze.com/shows/${id}`;
        const showResponse = await axios.get(showUrl, { cancelToken: source.token });
        setShow(showResponse.data);

        
        const episodesUrl = `https://api.tvmaze.com/shows/${id}/episodes`;
        const episodesResponse = await axios.get(episodesUrl, { cancelToken: source.token });
        setEpisodes(episodesResponse.data);

        setLoading(false);
      } catch (err) {
        if (axios.isCancel(err)) return;
        setError("Detaylar yüklenirken bir hata oluştu.");
        setLoading(false);
      }
    };

    fetchDetails();

    
    return () => {
      source.cancel('Detay isteği iptal edildi.');
    };
  }, [id]); 

  
  if (loading) {
    return <LoadingSpinner message="Dizi detayları yükleniyor..." />;
  }

  
  if (error || !show) {
    
    return (
        <ErrorComponent 
            message={error || "Dizi bulunamadı."} 
            onRetry={() => window.location.reload()} 
        />
    );
  }

  
  return (
    <div className="show-detail-container">
      <Link to="/" className="back-button">← Ana Listeye Dön</Link>
      
      <div className="show-info">
        <img 
          src={show.image?.original || 'placeholder.jpg'} 
          alt={show.name} 
          className="show-poster-detail" 
        />
        <div className="show-header">
          <h2>{show.name}</h2>
          <p>
            Tür: {show.genres?.join(', ') || 'Belirtilmemiş'} | 
            Dil: {show.language} | 
            Puan: {show.rating?.average ? `${show.rating.average} / 10` : 'N/A'}
          </p>
          <div className="summary" dangerouslySetInnerHTML={{ __html: show.summary }} />
        </div>
      </div>

  
      <div className="episodes-list">
        <h3>Bölümler ({episodes.length} adet)</h3>
        {episodes.length === 0 ? (
          <p>Bu dizi için bölüm bilgisi bulunmamaktadır.</p>
        ) : (
          <ul>
            {episodes.map(episode => (
              <li key={episode.id}>
                🖤 S{episode.season}.E{episode.number} 🖤- {episode.name} 
                <span className="episode-airdate"> ({episode.airdate})</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ShowDetail;