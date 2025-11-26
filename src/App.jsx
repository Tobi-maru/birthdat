import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Cake from './pages/Cake';
import Wishes from './pages/Wishes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/cake" element={<Cake />} />
        <Route path="/wishes" element={<Wishes />} />
      </Routes>
    </Router>
  );
}

export default App;
