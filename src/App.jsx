// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Birthday-Fund-Template/" element={<Home />} />
        <Route path="*" element={<div>Not Found : cliquez <a href='https://teamssutxo.github.io/Birthday-Fund-Template/'>ici</a> pour accéder à la cagnotte</div>} />
      </Routes>
    </Router>
  );
}

export default App;
