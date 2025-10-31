function ErrorComponent({ message, onRetry }) {

  return (
    <div className="error-component">
      <h3>Hata Oluştu!</h3>
      <p>{message}</p>
      {onRetry && (
        <button onClick={onRetry}>Tekrar Dene</button>
      )}
    </div>
  );
}

export default ErrorComponent;