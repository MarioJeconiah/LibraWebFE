import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";

const DetailBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await api.get(`/api/books/${id}`);
        setBook(res.data);
      } catch (err) {
        console.error("Failed to fetch book:", err);
      }
    };

    fetchBook();
  }, [id]);

  if (!book) return <p className="text-center text-white mt-20">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-teal-800 text-white px-6 py-16">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* COVER */}
        <div className="w-full flex justify-center">
          <img
            src={`${BASE_URL}/${book.cover_path}`}
            alt={book.title}
            className="rounded-lg shadow-xl h-[400px] object-cover"
          />
        </div>

        {/* DETAILS */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{book.title}</h1>
          <p className="text-lg text-gray-300 mb-2">
            <strong>Author:</strong> {book.author}
          </p>
          <p className="text-md text-teal-300 mb-2">
            <strong>Category:</strong> {book.category}
          </p>
          <p className="text-md text-gray-400 mb-6">
            <strong>Year:</strong> {book.year}
          </p>

          {/* DOWNLOAD BUTTON */}
          {book.pdf_path && (
            <a
              href={`${BASE_URL}/${book.pdf_path}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg mb-4 text-center"
            >
              Download PDF
            </a>
          )}

          {/* BACK BUTTON */}
          <Link
            to="/"
            className="block bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg text-center"
          >
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
};

export default DetailBook;
