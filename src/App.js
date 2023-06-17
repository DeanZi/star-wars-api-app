import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FilmsPage from './FilmsPage';
import LandingPage from "./LandingPage";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<LandingPage />} />
                <Route path="/films" element={<FilmsPage />} />
            </Routes>
        </Router>
    );
};

export default App;