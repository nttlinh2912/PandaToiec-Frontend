import React, { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Vocabulary from './components/Vocabulary';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Vocabulary />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
