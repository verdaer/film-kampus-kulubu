function LoadingSpinner({ message }) {
   return (
    <div className="loading-spinner">
      <p>{message || "Veriler yükleniyor, lütfen bekleyin..."}</p>
    </div>
  );
}

export default LoadingSpinner;