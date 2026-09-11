import NewsCard from './NewsCard.jsx';

function NewsGrid({ articles = [], depth = 'standard', isBookmarked, onToggleBookmark }) {
  const columns =
    depth === 'quick'
      ? 'grid-cols-1'
      : depth === 'detailed'
        ? 'grid-cols-1 lg:grid-cols-2'
        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  return (
    <div className={`grid gap-4 ${columns}`}>
      {articles.map((article) => (
        <NewsCard
          key={article.id}
          article={article}
          depth={depth}
          isBookmarked={isBookmarked ? isBookmarked(article.id) : false}
          onToggleBookmark={onToggleBookmark}
        />
      ))}
    </div>
  );
}

export default NewsGrid;