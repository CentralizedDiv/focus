import './App.scss';

import React, { Suspense } from 'react';
import { RecoilRoot } from 'recoil';

import Header from './components/Header/Header';
import VehiclesManagement from './features/VehiclesManagement/VehiclesManagement';

function App() {
  return (
    <RecoilRoot>
      <Header />
      <Suspense fallback="Loading...">
        <VehiclesManagement />
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
