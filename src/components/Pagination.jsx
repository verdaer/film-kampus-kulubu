function Pagination({ currentPage, totalPages, onPageChange }) {

  if (totalPages <= 1) return null;


  const navigate = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="pagination">

      <button onClick={() => navigate(1)} disabled={currentPage === 1}>
        İlk
      </button>
      
      <button onClick={() => navigate(currentPage - 1)} disabled={currentPage === 1}>
        Geri
      </button>

      <span className="page-info">
        Sayfa  {currentPage} 💫 ／  {totalPages}💫
      </span>

      <button onClick={() => navigate(currentPage + 1)} disabled={currentPage === totalPages}>
        İleri
      </button>
     
      <button onClick={() => navigate(totalPages)} disabled={currentPage === totalPages}>
        Son
      </button>
    </div>
  );
}

export default Pagination;