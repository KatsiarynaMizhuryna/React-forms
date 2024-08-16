import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import FirstForm from './pages/FirstForm/FirstForm';
import SecondForm from './pages/SecondForm/SecondForm';
import Main from './pages/Main/Main';
import Navigation from './components/Navigation/Navigation';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/first-form" element={<FirstForm />} />
        <Route path="/second-form" element={<SecondForm />} />
      </Routes>
    </Router>
  );
}

export default App;
