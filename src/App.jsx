import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Translator from './components/Translator';
import RandomStringGenerator from './components/RandomStringGenerator';
import Home from './Home';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage, faRandom, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <header className="flex flex-col md:flex-row justify-between items-center p-4 border-b bg-white shadow-sm">
        <div className="flex justify-between w-full md:w-auto">
          <Link to="/" className="text-3xl font-bold cursor-pointer px-4 md:px-10">TextTools</Link>
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="lg" />
          </button>
        </div>
        <nav className={`flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 px-4 md:px-14 text-center md:text-left ${menuOpen ? 'block' : 'hidden'} md:flex`}>
          <Link to="/translator" className="text-gray-700 hover:text-gray-900 font-medium flex items-center gap-2">
            <FontAwesomeIcon icon={faLanguage} /> <span>Translator</span>
          </Link>
          <Link to="/random-string" className="text-gray-700 hover:text-gray-900 font-medium flex items-center gap-2">
            <FontAwesomeIcon icon={faRandom} /> <span>Random String</span>
          </Link>
        </nav>
      </header>
      <div className="p-4 md:p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/translator" element={<Translator />} />
          <Route path="/random-string" element={<RandomStringGenerator />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
