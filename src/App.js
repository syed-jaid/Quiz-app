import React from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import HomePage from './components/app/home/home';
import Play from './components/app/play/play';
import Auth from './components/app/auth/auth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/play" element={<Play />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
