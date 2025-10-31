import TVCard from './TVCard'; 

function TVList({ shows, dispatch }) { 
  return (
    <div className="tv-list">
      {shows.map(show => (
       
        <TVCard key={show.id} show={show} dispatch={dispatch} />
      ))}
    </div>
  );
}

export default TVList;