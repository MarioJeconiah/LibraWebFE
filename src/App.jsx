import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Admin from "./pages/Admin/Admin";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Main Page */}
        <Route path="/" element={
          <>
            <Hero />
            <Footer />
          </>
        } />

        {/* Hidden Admin Page */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <Admin />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
