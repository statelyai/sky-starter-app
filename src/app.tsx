import { useState } from 'react';
import Counter from './examples/counter';
import TrafficLight from './examples/trafficLight/trafficLight';
import Home from './home';

const pages = ['home', 'counter', 'traffic light'] as const;
type Page = (typeof pages)[number];

function getComponent(page: Page) {
  switch (page) {
    case 'home':
      return <Home />;
    case 'counter':
      return <Counter />;
    case 'traffic light':
      return <TrafficLight />;
  }
}

export default function App() {
  const [page, setPage] = useState<Page>('home');

  return (
    <div className="app">
      <div className="app-header">
        <p className="sky-header">Stately Sky Starter ⛅</p>
        <div className="app-pages">
          {pages.map((p) => (
            <button
              key={p}
              className={p === page ? 'app-active-page' : 'app-page'}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      {getComponent(page)}
    </div>
  );
}
