import './App.scss';

import React, { Suspense } from 'react';
import { RecoilRoot } from 'recoil';

import Header from './components/layout/Header/Header';
import Dashboard from './features/Dashboard/Dashboard';

function Loading() {
  return <div className="Loading">Carregando...</div>;
}

function App() {
  return (
    <RecoilRoot>
      <Header />
      <Suspense fallback={<Loading />}>
        <Dashboard />
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
