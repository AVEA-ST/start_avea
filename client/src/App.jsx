import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import all components
import HomePage from './components/HomePage.jsx';
import AboutPage from './components/AboutPage.jsx';
import ContactPage from './components/ContactPage.jsx';
import SearchPage from './components/SearchPage.jsx';
import DomainSelection from './components/DomainSelection.jsx';
import CourseDetail from './components/CourseDetail.jsx';
import Dashboard from './components/Dashboard.jsx';
import LoginPage from './components/LoginPage.jsx';
import Signup from './components/Signup.jsx';
import FAQ from './components/FAQ.jsx';
import Recommendations from './components/Recommendations.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/domains" element={<DomainSelection />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/recommendations" element={<Recommendations />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
