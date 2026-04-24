import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import MapPage from './MapPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/map" element={<MapPage />} />
    </Routes>
  );
}
