import React, { useEffect, useState } from "react";
import Orbit from "./Orbit/Orbit";
import api from "../api/api"; 

const Hero = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const res = await api.get("/api/books");
        setBooks(res.data);
      } catch (err) {
        console.error("Failed to fetch books:", err);
      }
    };
    loadBooks();
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section
        className="flex flex-col-reverse md:flex-row items-center justify-between min-h-screen px-6 md:px-12
         bg-gradient-to-r from-gray-800 to-teal-900 text-white"
      >
        {/* TEXT SECTION */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Welcome to <span className="text-orange-500">LibraWeb</span>
          </h1>
          <p className="text-lg sm:text-xl mb-6 leading-relaxed">
            Browse from our collection of ebooks Read books from anywhere, at
            anytime.
          </p>
          <a
            href="#learn-more"
            className=" inline-block text-sm md:text-base bg-gradient-to-r from-green-400 to-red-500
                 text-white px-6 py-3 rounded-full hover:opacity-90 transition duration-300"
          >
            Learn More
          </a>
        </div>

        <div className="w-full sm:w-3/4 md:w-1/2 flex justify-center items-center mt-8 md:mt-0">
          <Orbit />
        </div>
      </section>

      {/* BOOK LIST SECTION */}
      <section className="px-6 md:px-12 py-16 bg-gradient-to-br from-gray-900 to-teal-800 text-white">
        <div className="max-w-7xl mx-auto">
          {/* TITLE */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            Explore Our <span className="text-orange-400">Books</span>
          </h2>

          {/* BOOK GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {books.map((book) => (
              <div
                key={book.id}
                className="bg-gray-800/70 hover:bg-gray-700/70 transition rounded-xl p-4 shadow-md backdrop-blur-sm"
              >
                {/* COVER */}
                <div className="w-full h-56 bg-gray-700 rounded-lg overflow-hidden mb-4">
                  {book.cover_path ? (
                    <img
                      src={`${import.meta.env.VITE_BASE_URL}${book.cover_path}`}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      SIDAASOIDIASHDIDHSz
                    </div>
                  )}
                </div>

                {/* TEXT */}
                <h3 className="text-xl font-semibold mb-1">{book.title}</h3>
                <p className="text-sm text-gray-300 mb-2">by {book.author}</p>

                <p className="text-xs text-teal-300 mb-4">
                  {book.category} · {book.year}
                </p>

                {/* BUTTON */}
                <a
                  href={`/book/${book.id}`}
                  className="block text-center bg-teal-500 hover:bg-teal-600 transition text-white py-2 rounded-lg"
                >
                  View Detail
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
