import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './pages/Main/Main';
import Navigation from './components/Navigation/Navigation';
import UncontrolledForm from './pages/UncontrolledForm/UncontrolledForm';
import ControlledForm from './pages/ControlledForm/ControlledForm';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/uncontrolled-form" element={<UncontrolledForm />} />
        <Route path="/controlled-form" element={<ControlledForm />} />
      </Routes>
    </Router>
  );
}

export default App;
