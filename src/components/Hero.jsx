import { useEffect, useState } from "react";
import Orbit from "./Orbit/Orbit";

const BASE_URL = "https://librawebapi-production.up.railway.app";

const Hero = ({ searchParams }) => {
  const [books, setBooks] = useState([]);

  const loadBooks = async () => {
    try {
      let url = `${BASE_URL}/api/books`;

      // Jika ada parameter pencarian → gunakan endpoint filter
      if (searchParams?.name || searchParams?.category) {
        url = `${BASE_URL}/api/books/filter?`;
        if (searchParams.name) url += `name=${searchParams.name}&`;
        if (searchParams.category) url += `category=${searchParams.category}&`;
      }

      const res = await fetch(url);
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      console.error("Failed to fetch books:", err);
    }
  };

  useEffect(() => {
    loadBooks();
  }, [searchParams]);

  const normalizePath = (path) => path?.replace(/\\/g, "/");

  const getFileUrl = (path) => {
    if (!path) return null;
    const normalized = normalizePath(path);
    return `${BASE_URL}/${normalized}`;
  };

  const handleDownload = async (pdfPath) => {
    try {
      const response = await fetch(getFileUrl(pdfPath));
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = pdfPath.split("/").pop();
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Gagal mengunduh PDF:", err);
    }
  };

  return (
    <>

      <section className="flex flex-col-reverse md:flex-row items-center justify-between min-h-screen px-6 md:px-12 bg-gradient-to-r from-gray-800 to-teal-900 text-white">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Welcome to <span className="text-orange-500">LibraWeb</span>
          </h1>
          <p className="text-lg sm:text-xl mb-6 leading-relaxed">
            Browse our eBook collection anytime, anywhere.
          </p>
          <a
            href="#books"
            className="inline-block bg-gradient-to-r from-green-400 to-red-500 px-6 py-3 rounded-full hover:opacity-90 transition"
          >
            Explore
          </a>
        </div>
        <div className="w-full sm:w-3/4 md:w-1/2 flex justify-center mt-8 md:mt-0">
          <Orbit />
        </div>
      </section>

      {/* BOOK LIST SECTION */}
      <section id="books" className="px-6 md:px-12 py-16 bg-gradient-to-br from-gray-900 to-teal-800 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            Explore Our <span className="text-orange-400">Books</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {books.map((book) => (
              <div
                key={book.id}
                className="bg-gray-800/70 hover:bg-gray-700/70 transition rounded-xl p-4 shadow-md backdrop-blur-sm"
              >
                <div className="w-full h-100 bg-gray-700 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                  {book.cover_path ? (
                    <img
                      src={getFileUrl(book.cover_path)}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400">No Cover</span>
                  )}
                </div>

                <div className="text-sm mb-4">
                  <p>
                    <span className="font-semibold text-teal-300">Name:</span> {book.title}
                  </p>
                  <p>
                    <span className="font-semibold text-teal-300">Author:</span> {book.author}
                  </p>
                  <p>
                    <span className="font-semibold text-teal-300">Category:</span> {book.category}
                  </p>
                  <p>
                    <span className="font-semibold text-teal-300">Year:</span> {book.year}
                  </p>
                </div>

                <div className="flex gap-2">
                  {book.pdf_path && (
                    <button
                      className="flex-1 bg-indigo-500 hover:bg-indigo-600 transition text-white py-2 rounded-lg text-sm"
                      onClick={() => window.open(getFileUrl(book.pdf_path), "_blank")}
                    >
                      Baca
                    </button>
                  )}

                  {book.pdf_path && (
                    <button
                      className="flex-1 bg-blue-500 hover:bg-blue-600 transition text-white py-2 rounded-lg text-sm"
                      onClick={() => handleDownload(book.pdf_path)}
                    >
                      Unduh
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
