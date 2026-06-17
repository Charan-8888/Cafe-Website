type FallbackProps = {
  onReset: () => void;
};

export default function Fallback({ onReset }: FallbackProps) {
  return (
    <section className="status-page">
      <span className="section-subtitle">Something went wrong</span>
      <h1>We could not load this cafe page.</h1>
      <p>Please return to the booking flow or refresh the app.</p>
      <button className="btn btn-primary" type="button" onClick={onReset}>
        Try again
      </button>
    </section>
  );
}
