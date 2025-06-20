// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cagnotte_maman/" element={<Home />} />
        <Route path="*" element={<div>Not Found : cliquez <a href='https://fardellatimothe.github.io/cagnotte_maman/'>ici</a> pour accéder à la cagnotte</div>} />
      </Routes>
    </Router>
  );
}

export default App;
