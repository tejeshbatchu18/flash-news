import { useState } from 'react';

const SUGGESTIONS = ['Summarise this feed', 'What are the main themes?', 'Anything about sport?'];

function AiOverview({ articles = [] }) {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  async function ask(text) {
    if (articles.length === 0) {
      setStatus('error');
      setError('Load some headlines first.');
      return;
    }

    setStatus('loading');
    setError('');
    setAnswer('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text, articles }),
      });

      if (response.status === 404) {
        throw new Error('AI overview needs the Vercel dev server or the deployed site.');
      }

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Something went wrong.');

      setAnswer(data.text);
      setStatus('done');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  }

  const busy = status === 'loading';

  return (
    <div className="fixed right-4 bottom-4 z-20 flex flex-col items-end gap-3">
      {open && (
        <div className="flex max-h-[30rem] w-80 max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-slate-900">AI overview</p>
              <p className="text-xs text-slate-500">Based only on the headlines shown</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close AI overview"
              className="rounded px-2 py-1 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
            >
              Close
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3">
            {status === 'idle' && (
              <p className="text-sm text-slate-600">
                Ask a question about the {articles.length} headlines currently loaded.
              </p>
            )}

            {busy && (
              <div className="space-y-2" role="status" aria-busy="true">
                <span className="sr-only">Generating overview…</span>
                <div className="h-3 w-full animate-pulse rounded bg-slate-200" />
                <div className="h-3 w-5/6 animate-pulse rounded bg-slate-200" />
                <div className="h-3 w-4/6 animate-pulse rounded bg-slate-200" />
              </div>
            )}

            {status === 'done' && (
              <p className="text-sm leading-relaxed whitespace-pre-line text-slate-800">{answer}</p>
            )}

            {status === 'error' && (
              <p role="alert" className="rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-800">
                {error}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 border-t border-slate-200 px-4 pt-3">
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                disabled={busy}
                onClick={() => ask(suggestion)}
                className="rounded-full border border-slate-300 px-2.5 py-1 text-xs text-slate-600 transition hover:border-slate-400 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 disabled:opacity-50"
              >
                {suggestion}
              </button>
            ))}
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (question.trim()) ask(question.trim());
            }}
            className="flex gap-2 p-4 pt-3"
          >
            <label htmlFor="ai-question" className="sr-only">Ask about the news</label>
            <input
              id="ai-question"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              maxLength={200}
              placeholder="Ask about these headlines…"
              className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm placeholder:text-slate-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
            />
            <button
              type="submit"
              disabled={busy}
              className="rounded-lg bg-rose-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-rose-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {busy ? '…' : 'Ask'}
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="rounded-full bg-rose-700 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-rose-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
      >
        {open ? 'Hide AI' : 'AI overview'}
      </button>
    </div>
  );
}

export default AiOverview;