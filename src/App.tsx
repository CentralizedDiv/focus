import './App.scss';

import React from 'react';
import { RecoilRoot } from 'recoil';

import Drawer from './components/Drawer/Drawer';
import Header from './components/Header/Header';
import VehiclesManagement from './features/VehiclesManagement/VehiclesManagement';

function App() {
  return (
    <RecoilRoot>
      <Header />
      <Drawer />
      <VehiclesManagement />
    </RecoilRoot>
  );
}

export default App;
