// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<div style={{ textAlign: 'center' }}>Page non trouvée ❓</div>} />
      </Routes>
    </Router>
  );
}

export default App;
