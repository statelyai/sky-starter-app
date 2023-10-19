import { useState } from 'react';
import Counter from './examples/counter';
import Home from './home';

type Page = 'home' | 'counter';

function getComponent(page: Page) {
  switch (page) {
    case 'home':
      return <Home />;
    case 'counter':
      return <Counter />;
    default:
      return <Home />;
  }
}

export default function App() {
  const [page, setPage] = useState<Page>('home');

  return (
    <div className="app">
      <div className="app-header">
        <p className="sky-header">Stately Sky Starter ⛅</p>
        <button onClick={() => setPage(page !== 'home' ? 'home' : 'counter')}>
          {page === 'home' ? 'Try counter example' : 'Home'}
        </button>
      </div>
      {getComponent(page)}
    </div>
  );
}
