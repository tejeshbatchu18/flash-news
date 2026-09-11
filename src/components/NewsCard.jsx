import { useState } from 'react';
import { formatRelativeTime } from '../utils/formatDate.js';

function NewsCard({ article, depth = 'standard' }) {
  const [imageFailed, setImageFailed] = useState(false);

  const quick = depth === 'quick';
  const detailed = depth === 'detailed';
  const showImage = !quick && article.image && !imageFailed;

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white transition hover:border-slate-300 hover:shadow-sm">
      {showImage && (
        <img
          src={article.image}
          alt=""
          loading="lazy"
          onError={() => setImageFailed(true)}
          className={`w-full object-cover ${detailed ? 'h-56' : 'h-40'}`}
        />
      )}

      {!quick && !showImage && (
        <div className="flex h-40 w-full items-center justify-center bg-slate-100 text-xs text-slate-400">
          No image
        </div>
      )}

      <div className={`flex flex-1 flex-col gap-2 ${quick ? 'p-3' : 'p-4'}`}>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="truncate font-medium text-slate-700">{article.source}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={article.publishedAt} className="whitespace-nowrap">
            {formatRelativeTime(article.publishedAt)}
          </time>
        </div>

        <h3
          className={`font-semibold text-slate-900 ${
            quick
              ? 'line-clamp-2 text-sm leading-snug'
              : detailed
                ? 'text-base leading-snug'
                : 'line-clamp-3 text-sm leading-snug'
          }`}
        >
          {article.title}
        </h3>

        {!quick && (
          <p className={`text-sm text-slate-600 ${detailed ? '' : 'line-clamp-2'}`}>
            {article.description}
          </p>
        )}

        {detailed && article.content && (
          <p className="text-sm leading-relaxed text-slate-700">{article.content}</p>
        )}

        
          <a href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-auto pt-2 font-medium text-rose-700 underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 ${
            quick ? 'text-xs' : 'text-sm'
          }`}
        >
          {quick ? 'Open' : 'Read full article'}
        </a>
      </div>
    </article>
  );
}

export default NewsCard;