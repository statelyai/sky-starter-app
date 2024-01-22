import { useEffect, useState } from 'react';
import Counter from './examples/counter';
import Inspection from './examples/inspection';
import TrafficLight from './examples/trafficLight/trafficLight';
import Home from './home';

const pages = ['home', 'counter', 'trafficlight', 'inspection'] as const;
type Page = (typeof pages)[number];

function getComponent(page: Page) {
  switch (page) {
    case 'home':
      return <Home />;
    case 'counter':
      return <Counter />;
    case 'trafficlight':
      return <TrafficLight />;
    case 'inspection':
      return <Inspection />;
  }
}

function getPage() {
  if (typeof window !== 'undefined') {
    const queryParams = new URLSearchParams(window.location.search);
    const pageQueryParam = queryParams.get('page');
    if (pageQueryParam && pages.includes(pageQueryParam as Page)) {
      return pageQueryParam as Page;
    }
  }
  return 'home';
}

function setPageQueryParam(page: Page) {
  if (typeof window !== 'undefined') {
    window.history.replaceState(
      null,
      '',
      `?page=${page}` + window.location.hash,
    );
  }
}

export default function App() {
  const [page, setPage] = useState<Page>(getPage());
  useEffect(() => setPageQueryParam(page), [page]);

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
