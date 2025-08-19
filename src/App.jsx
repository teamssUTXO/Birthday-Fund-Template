// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Birthday-Fund-Template/" element={<Home />} />
        <Route path="*" element={<div>Not Found : click <a href='https://teamssutxo.github.io/Birthday-Fund-Template/'>here</a> to access the fund template</div>} />
      </Routes>
    </Router>
  );
}

export default App;
