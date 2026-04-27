import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import MapPage from './MapPage';
import AboutPage from './AboutPage';
import ExperiencesPage from './ExperiencesPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/experiences" element={<ExperiencesPage />} />
    </Routes>
  );
}
