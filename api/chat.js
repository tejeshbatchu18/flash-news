const MODEL = 'gemini-2.0-flash-lite';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server is missing GEMINI_API_KEY.' });
  }

  const { question, articles } = req.body || {};

  if (!Array.isArray(articles) || articles.length === 0) {
    return res.status(400).json({ error: 'No articles to summarise.' });
  }

  const context = articles
    .slice(0, 10)
    .map((a, i) => `${i + 1}. ${a.title} (${a.source}) — ${(a.description || '').slice(0, 200)}`)
    .join('\n');

  const prompt = `You are a news assistant for an app called Flash News.

Below are the headlines currently on the user's screen. Answer using ONLY these
headlines. Do not add facts from outside this list. If the answer is not in them,
say so plainly.

Keep it under 120 words, plain prose, no markdown headings, no bullet symbols.

HEADLINES:
${context}

QUESTION: ${question || 'Give a short overview of what is happening in this news.'}`;

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) return res.status(429).json({ error: 'AI rate limit reached. Try again in a minute.' });
      if (status === 400 || status === 403) return res.status(status).json({ error: 'AI key rejected or invalid.' });
      return res.status(502).json({ error: 'The AI service is unavailable right now.' });
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) return res.status(502).json({ error: 'The AI returned an empty response.' });

    return res.status(200).json({ text: text.trim() });
  } catch {
    return res.status(502).json({ error: 'Could not reach the AI service.' });
  }
}