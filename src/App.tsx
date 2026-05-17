import { HashRouter, Routes, Route } from 'react-router-dom';
import StarfieldBackground from './components/StarfieldBackground';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import Characters from './pages/Characters';

function App() {
  return (
    <HashRouter>
      <div className="relative min-h-screen bg-[#0a0e27] text-white overflow-x-hidden">
        <StarfieldBackground />
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result" element={<Result />} />
            <Route path="/characters" element={<Characters />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
