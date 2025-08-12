import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookmarkProvider } from './BookmarkContext';
import Navbar from './Navbar';
import Home from './Home';
import ResultPage from './ResultPage';
import SavedProducts from './SavedProducts';



function App() {
  const appStyle = {
    backgroundImage: "url('/background.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    minWidth: '100vw',
    width: '100%',
    height: 'auto',
    paddingTop: '60px',
  };

  return (
    <BookmarkProvider>
      <Router>
        <div className="App" style={appStyle}>
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
