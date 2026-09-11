import { useEffect, useState } from 'react';
import Home from './pages/Home.jsx';
import SavedNews from './pages/SavedNews.jsx';

function currentRoute() {
  return window.location.hash === '#/saved' ? 'saved' : 'home';
}

function App() {
  const [route, setRoute] = useState(currentRoute);

  useEffect(() => {
    const onHashChange = () => setRoute(currentRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return route === 'saved' ? <SavedNews /> : <Home />;
}

export default App;