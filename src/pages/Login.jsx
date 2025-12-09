import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/admin/login", { username, password });
      localStorage.setItem("token", res.data.token);
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-gray-800 to-teal-900 text-white p-6">
      <div className="bg-gray-900/70 backdrop-blur-lg border border-teal-700/40 p-10 rounded-2xl shadow-xl w-full max-w-md text-center">
        
        {!isLoggedIn ? (
          <>
            <h2 className="text-3xl font-bold mb-6">
              Admin <span className="text-orange-500">Login</span>
            </h2>

            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

            <form onSubmit={handleSubmit}>
              <label className="block text-sm mb-2 text-left">Username</label>
              <input
                type="text"
                value={username}
                placeholder="Masukkan username"
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white mb-5
                           focus:outline-none focus:border-orange-500 transition"
                required
              />

              <label className="block text-sm mb-2 text-left">Password</label>
              <input
                type="password"
                value={password}
                placeholder="Masukkan password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white mb-8
                           focus:outline-none focus:border-orange-500 transition"
                required
              />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-400 to-red-500 text-white py-3 rounded-full
                           font-semibold hover:opacity-90 transition duration-300"
              >
                Login
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6 text-green-400">
              Kamu sudah login 
            </h2>
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-semibold transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
