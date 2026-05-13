import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './HomePage';
import MapPage from './MapPage';
import AboutPage from './AboutPage';
import ExperiencesPage from './ExperiencesPage';
import AdventurePage from './AdventurePage';
import CulturePage from './CulturePage';
import WildLifePage from './WildLifePage';
import ArchitecturePage from './ArchitecturePage';

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/experiences" element={<ExperiencesPage />} />
      <Route path="/adventure" element={<AdventurePage />} />
      <Route path="/culture" element={<CulturePage />} />
      <Route path="/wildlife" element={<WildLifePage />} />
      <Route path="/architecture" element={<ArchitecturePage />} />
    </Routes>
  );
}
