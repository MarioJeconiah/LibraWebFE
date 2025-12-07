  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Admin from "./pages/admin";
import ProtectedAdminRoute from "./components/Orbit/ProtectedAdminRoute";

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
