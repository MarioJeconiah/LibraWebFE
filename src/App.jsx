import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import DetailBook from "./pages/DetailBook";
import ProtectedAdminRoute from "./components/Orbit/ProtectedAdminRoute";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>

        {/* Main Page */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Footer />
            </>
          }
        />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* DetailBook Page */}
        <Route path="/book/:id" element={<DetailBook />} />

        {/* Admin Page with Protection */}
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
};

export default App;
