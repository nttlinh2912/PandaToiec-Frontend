import React, { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Vocabulary from './components/Vocabulary';
import Navbar from './components/Nav/Navbar';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vocabulary" element={<Vocabulary />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
