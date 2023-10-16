import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import Loading from './loading';
import './main.css';

const LazyApp = lazy(() => import('./app'));

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <LazyApp />
    </Suspense>
  </React.StrictMode>,
);
