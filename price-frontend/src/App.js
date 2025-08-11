import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookmarkProvider } from './BookmarkContext';
import Navbar from './Navbar';
import Home from './Home';
import ResultPage from './ResultPage';
import SavedProducts from './SavedProducts';

function App() {
  return (
    <BookmarkProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/saved" element={<SavedProducts />} />
          </Routes>
        </div>
      </Router>
    </BookmarkProvider>
  );
}

export default App;