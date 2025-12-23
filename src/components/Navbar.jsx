import React, { useState, useEffect } from "react";
import { FaTimes, FaBars } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  /* ================= LOGIN CHECK ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
    setIsOpen(false);
  };

  const handleLogin = () => {
    navigate("/login");
    setIsOpen(false);
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const handleSearch = () => {
    onSearch(searchText, category);
    setIsSearchOpen(false);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full border-b border-gray-700 z-50 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* BRAND */}
          <a
            href="/"
            className="text-2xl font-bold bg-clip-text text-transparent bg-emerald-400"
          >
            LibraWeb
          </a>

          {/* ================= DESKTOP ================= */}
          <div className="hidden md:flex items-center space-x-6 relative">

            {/* SEARCH ICON */}
            <CiSearch
              className="text-white text-xl cursor-pointer hover:text-purple-500 transition"
              onClick={toggleSearch}
            />

            {/* SEARCH DROPDOWN */}
            {isSearchOpen && (
              <div className="absolute top-10 right-0 bg-gray-900 p-4 rounded-lg shadow-xl w-64 space-y-3 border border-gray-600">
                <input
                  type="text"
                  placeholder="Nama buku..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-sm text-white"
                />

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-sm text-white"
                >
                  <option value="">Semua Kategori</option>
                  <option value="Novel">Novel</option>
                  <option value="Komik">Komik</option>
                  <option value="Edu">Edu</option>
                  <option value="Sci-Fi">Sci-Fi</option>
                </select>

                <button
                  onClick={handleSearch}
                  className="w-full bg-indigo-500 hover:bg-indigo-600 text-white rounded-md py-2"
                >
                  Search
                </button>
              </div>
            )}

            {/* LOGIN / LOGOUT BUTTON */}
            {!isLoggedIn ? (
              <button
                onClick={handleLogin}
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full text-sm font-semibold"
              >
                Login
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full text-sm font-semibold"
              >
                Logout
              </button>
            )}

            {/* CONTACT */}
            <a
              href="https://wa.me/6282162488554"
              target="_blank"
              rel="noreferrer noopener"
            >
              <button
                className="text-sm bg-gradient-to-r from-green-400 to-red-500 text-white
                px-4 py-2 rounded-full hover:opacity-90 shadow-lg transition"
              >
                Contact Us
              </button>
            </a>
          </div>

          {/* ================= MOBILE TOGGLE ================= */}
          <button className="md:hidden text-white text-2xl" onClick={toggleMenu}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {isOpen && (
          <div className="md:hidden bg-gray-800 mt-2 p-4 rounded-lg border border-gray-700 space-y-4">

            <input
              type="text"
              placeholder="Nama Buku..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-sm text-white"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-sm text-white"
            >
              <option value="">Semua Kategori</option>
              <option value="Novel">Novel</option>
              <option value="Komik">Komik</option>
              <option value="Edu">Edu</option>
              <option value="Sci-Fi">Sci-Fi</option>
            </select>

            <button
              onClick={handleSearch}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white rounded-md py-2"
            >
              Search
            </button>

            {/* LOGIN / LOGOUT MOBILE */}
            {!isLoggedIn ? (
              <button
                onClick={handleLogin}
                className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded-full font-semibold"
              >
                Login
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-full font-semibold"
              >
                Logout
              </button>
            )}

            <a
              href="https://wa.me/6282162488554"
              target="_blank"
              rel="noreferrer noopener"
            >
              <button
                className="w-full bg-gradient-to-r from-green-400 to-red-500 text-white
                px-4 py-2 rounded-full hover:opacity-90 shadow-lg transition"
              >
                Contact Us
              </button>
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
