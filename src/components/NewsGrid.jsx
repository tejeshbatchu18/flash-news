import NewsCard from './NewsCard.jsx';

// Renders the list of articles. Data wiring comes later.
function NewsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <NewsCard />
    </div>
  );
}

export default NewsGrid;
