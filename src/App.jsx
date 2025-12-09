import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import DetailBook from "./pages/DetailBook";
import ProtectedAdminRoute from "./components/Orbit/ProtectedAdminRoute";
import { useState } from "react";

const App = () => {
  const [searchParams, setSearchParams] = useState({ name: "", category: "" });

  return (
    <Router>
      <Navbar onSearch={(name, category) => setSearchParams({ name, category })} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero searchParams={searchParams} />
              <Footer />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/book/:id" element={<DetailBook />} />
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
