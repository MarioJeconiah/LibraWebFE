import { useEffect, useState } from "react";
import api from "../api/api";

const Admin = () => {
  const [judul, setJudul] = useState("");
  const [penulis, setPenulis] = useState("");
  const [tahun, setTahun] = useState("");
  const [kategori, setKategori] = useState("");

  const [cover, setCover] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [preview, setPreview] = useState(null);

  const [books, setBooks] = useState([]);

  // Ambil token dari localStorage
  const token = localStorage.getItem("token");

  const loadBooks = async () => {
    try {
      const res = await api.get("/api/books");
      setBooks(res.data);
    } catch (err) {
      console.error("Gagal mengambil buku:", err);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    setCover(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", judul);
    formData.append("author", penulis);
    formData.append("year", tahun);
    formData.append("category", kategori);
    formData.append("cover", cover);
    formData.append("pdf", pdf);

    try {
      await api.post("/api/books", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Buku berhasil ditambahkan");
      setJudul("");
      setPenulis("");
      setTahun("");
      setKategori("");
      setCover(null);
      setPdf(null);
      setPreview(null);

      loadBooks();
    } catch (err) {
      console.error(err);
      alert("Gagal menambahkan buku");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin hapus buku ini?")) return;

    try {
      await api.delete(`/api/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      loadBooks();
    } catch (err) {
      console.error("Gagal menghapus:", err);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Admin <span className="text-orange-500">Dashboard</span>
      </h1>

      {/* ADD BOOK FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-xl mb-10 shadow-lg border border-teal-600/40 max-w-xl mx-auto"
      >
        <h3 className="text-xl font-semibold mb-4 text-teal-400">Tambah Buku</h3>

        <label className="block mb-2 text-sm">Judul Buku</label>
        <input
          type="text"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          required
          className="w-full p-3 rounded bg-gray-700 border border-gray-600 mb-4"
        />

        <label className="block mb-2 text-sm">Penulis</label>
        <input
          type="text"
          value={penulis}
          onChange={(e) => setPenulis(e.target.value)}
          required
          className="w-full p-3 rounded bg-gray-700 border border-gray-600 mb-4"
        />

        <label className="block mb-2 text-sm">Tahun</label>
        <input
          type="number"
          value={tahun}
          onChange={(e) => setTahun(e.target.value)}
          required
          className="w-full p-3 rounded bg-gray-700 border border-gray-600 mb-4"
        />

        <label className="block mb-2 text-sm">Kategori</label>
        <input
          type="text"
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          required
          className="w-full p-3 rounded bg-gray-700 border border-gray-600 mb-4"
        />

        {/* COVER UPLOAD */}
        <label className="block mb-2 text-sm">Cover Buku (JPG/PNG)</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleCoverChange}
          required
          className="mb-3 w-full text-gray-300"
        />

        {preview && (
          <img
            src={preview}
            alt="Preview Cover"
            className="w-32 h-44 object-cover rounded-md border border-gray-600 mb-4"
          />
        )}

        {/* PDF UPLOAD */}
        <label className="block mb-2 text-sm">File PDF Buku</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setPdf(e.target.files[0])}
          required
          className="mb-6 w-full text-gray-300"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-400 to-blue-500 py-3 rounded-lg font-bold"
        >
          Tambahkan Buku
        </button>
      </form>

      {/* BOOK LIST */}
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Daftar <span className="text-orange-400">Buku</span>
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-gray-800 p-4 rounded-xl shadow-md border border-teal-700/30"
          >
            <img
              src={`${import.meta.env.VITE_BASE_URL}${book.cover_path}`}
              className="w-full h-48 object-cover rounded mb-3"
            />

            <h3 className="font-semibold text-lg">{book.title}</h3>
            <p className="text-sm text-gray-300">{book.author}</p>

            <div className="flex gap-3 mt-3">
              <a
                href={`${import.meta.env.VITE_BASE_URL}${book.pdf_path}`}
                target="_blank"
                className="bg-blue-500 px-3 py-1 rounded text-sm"
              >
                PDF
              </a>
              <button
                onClick={() => handleDelete(book.id)}
                className="bg-red-600 px-3 py-1 rounded text-sm"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
