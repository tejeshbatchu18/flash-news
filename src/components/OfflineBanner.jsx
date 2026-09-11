import { useEffect, useState } from 'react';

function OfflineBanner() {
  const [online, setOnline] = useState(() => navigator.onLine);

  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  if (online) return null;

  return (
    <div role="status" className="bg-amber-400 px-4 py-2 text-center text-sm font-medium text-amber-950">
      You’re offline — news can’t refresh right now.
    </div>
  );
}

export default OfflineBanner;