function ErrorState({ message, onRetry }) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-3 rounded-lg border border-rose-200 bg-rose-50 px-6 py-14 text-center"
    >
      <h2 className="text-base font-semibold text-rose-900">Couldn’t load the news</h2>

      <p className="max-w-sm text-sm text-rose-800">
        {message || 'Something went wrong while fetching articles.'}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-1 rounded-lg bg-rose-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
        >
          Try again
        </button>
      )}
    </div>
  );
}

export default ErrorState;