import './App.scss';

import React, { Suspense } from 'react';
import { RecoilRoot } from 'recoil';

import Header from './components/layout/Header/Header';
import VehiclesManagement from './features/Vehicles/VehiclesManagement';

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
