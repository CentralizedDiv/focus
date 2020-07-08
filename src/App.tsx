import './App.scss';

import React from 'react';
import { RecoilRoot } from 'recoil';

import Header from './components/Header/Header';
import VehiclesManagement from './features/VehiclesManagement/VehiclesManagement';

function App() {
  return (
    <RecoilRoot>
      <Header />
      <VehiclesManagement />
    </RecoilRoot>
  );
}

export default App;
