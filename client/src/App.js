import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// components
import Navbar from './components/Navbar'
import Home from './pages/Home';
import Members from './pages/Members';
import Books from './pages/Books';

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/members" element={<Members />} />
          <Route path="/books" element={<Books />} />
        </Routes>
      </Router>

    </>
  );
}

export default App;
