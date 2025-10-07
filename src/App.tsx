import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { DataProvider } from './store/DataContext';
import HomePage from './pages/HomePage';
import StudyPage from './pages/StudyPage';
import QuizPage from './pages/QuizPage';
import StatsPage from './pages/StatsPage';
import './App.css';

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="app">
          <nav className="nav">
            <Link to="/" className="nav-link">홈</Link>
            <Link to="/study" className="nav-link">학습</Link>
            <Link to="/quiz" className="nav-link">퀴즈</Link>
            <Link to="/stats" className="nav-link">통계</Link>
          </nav>
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/study/:deckId" element={<StudyPage />} />
              <Route path="/study" element={<StudyPage />} />
              <Route path="/quiz/:deckId" element={<QuizPage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/stats" element={<StatsPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;

