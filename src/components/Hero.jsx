import { useEffect, useState } from "react";

const BASE_URL = "https://librawebapi-production.up.railway.app";

const Admin = () => {
  const [judul, setJudul] = useState("");
  const [penulis, setPenulis] = useState("");
  const [tahun, setTahun] = useState("");
  const [kategori, setKategori] = useState("");

  const [cover, setCover] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [preview, setPreview] = useState(null);

  const [books, setBooks] = useState([]);
  const [pdfView, setPdfView] = useState(null);


  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editBookId, setEditBookId] = useState(null);
  const [editPreview, setEditPreview] = useState(null);

  const token = localStorage.getItem("token");

  const loadBooks = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/books`);
      const data = await res.json();
      setBooks(data);
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
    if (cover) formData.append("cover", cover);
    if (pdf) formData.append("pdf", pdf);

    try {
      const res = await fetch(`${BASE_URL}/api/books`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error("Gagal menambahkan buku");

      alert("Buku berhasil ditambahkan!");

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

  const handleDownload = async (pdfPath) => {
    try {
      const response = await fetch(`${BASE_URL}/${pdfPath.replace(/\\/g, "/")}`);
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

  const handleDelete = async (id) => {
    if (!confirm("Yakin hapus buku ini?")) return;

    try {
      await fetch(`${BASE_URL}/api/books/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      loadBooks();
    } catch (err) {
      console.error("Gagal menghapus:", err);
    }
  };


  const openEdit = (book) => {
    setEditBookId(book.id);
    setJudul(book.title);
    setPenulis(book.author);
    setTahun(book.year);
    setKategori(book.category);

  
    setEditPreview(`${BASE_URL}/${book.cover_path.replace(/\\/g, "/")}`);

    setCover(null);
    setPdf(null);

    setIsEditOpen(true);
  };

  
  const handleEditCover = (e) => {
    const file = e.target.files[0];
    setCover(file);
    setEditPreview(URL.createObjectURL(file));
  };


  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", judul);
    formData.append("author", penulis);
    formData.append("year", tahun);
    formData.append("category", kategori);

    if (cover) formData.append("cover", cover);
    if (pdf) formData.append("pdf", pdf);

    try {
      const res = await fetch(`${BASE_URL}/api/books/${editBookId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error("Gagal update buku");

      alert("Buku berhasil diperbarui!");
      setIsEditOpen(false);
      loadBooks();
    } catch (err) {
      console.error(err);
      alert("Gagal update buku");
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Admin <span className="text-orange-500">Dashboard</span>
      </h1>

   
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

        <label className="block mb-2 text-sm">Cover Buku</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleCoverChange}
          className="mb-3 w-full text-gray-300"
        />

        {preview && (
          <img
            src={preview}
            className="w-32 h-44 object-cover rounded-md border border-gray-600 mb-4"
          />
        )}

        <label className="block mb-2 text-sm">File PDF Buku</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setPdf(e.target.files[0])}
          className="mb-6 w-full text-gray-300"
        />

        <button className="w-full bg-gradient-to-r from-green-400 to-blue-500 py-3 rounded-lg font-bold">
          Tambahkan Buku
        </button>
      </form>

 
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Daftar <span className="text-orange-400">Buku</span>
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-gray-800 p-4 rounded-xl shadow-md border border-teal-700/30"
          >
            {book.cover_path && (
              <img
                src={`${BASE_URL}/${book.cover_path.replace(/\\/g, "/")}`}
                className="w-full h-48 object-cover rounded mb-3"
              />
            )}

            <div className="text-sm text-gray-200 space-y-1">
              <p><span className="text-teal-400 font-semibold">Nama:</span> {book.title}</p>
              <p><span className="text-teal-400 font-semibold">Author:</span> {book.author}</p>
              <p><span className="text-teal-400 font-semibold">Kategori:</span> {book.category}</p>
              <p><span className="text-teal-400 font-semibold">Tahun:</span> {book.year}</p>
            </div>

            <div className="flex gap-3 mt-3 flex-wrap">
              <button
                onClick={() => openEdit(book)}
                className="bg-yellow-500 px-3 py-1 rounded text-sm"
              >
                Edit
              </button>

              {book.pdf_path && (
                <button
                  className="bg-indigo-500 px-3 py-1 rounded text-sm"
                  onClick={() =>
                    setPdfView(`${BASE_URL}/${book.pdf_path.replace(/\\/g, "/")}`)
                  }
                >
                  Baca
                </button>
              )}

              {book.pdf_path && (
                <button
                  className="bg-blue-500 px-3 py-1 rounded text-sm"
                  onClick={() => handleDownload(book.pdf_path)}
                >
                  Unduh
                </button>
              )}

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

 
      {isEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl mb-4">Edit Buku</h2>

            <form onSubmit={handleUpdate}>
              <label className="block mb-2 text-sm">Judul</label>
              <input
                className="w-full p-2 mb-3 bg-gray-700 rounded"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
              />

              <label className="block mb-2 text-sm">Penulis</label>
              <input
                className="w-full p-2 mb-3 bg-gray-700 rounded"
                value={penulis}
                onChange={(e) => setPenulis(e.target.value)}
              />

              <label className="block mb-2 text-sm">Tahun</label>
              <input
                className="w-full p-2 mb-3 bg-gray-700 rounded"
                value={tahun}
                onChange={(e) => setTahun(e.target.value)}
              />

              <label className="block mb-2 text-sm">Kategori</label>
              <input
                className="w-full p-2 mb-3 bg-gray-700 rounded"
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
              />

              <label className="block mb-2 text-sm">Ganti Cover</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleEditCover}
                className="mb-3 w-full text-gray-300"
              />

              {editPreview && (
                <img
                  src={editPreview}
                  className="w-32 h-44 object-cover rounded border mb-4"
                />
              )}

              <label className="block mb-2 text-sm">Ganti PDF</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setPdf(e.target.files[0])}
                className="mb-4 w-full text-gray-300"
              />

              <div className="flex gap-3 mt-4">
                <button className="bg-green-600 px-4 py-2 rounded">
                  Simpan
                </button>

                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="bg-red-600 px-4 py-2 rounded"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    
      {pdfView && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col z-50">
          <button
            onClick={() => setPdfView(null)}
            className="absolute top-4 right-4 bg-red-600 px-4 py-2 rounded text-white font-bold"
          >
            ✕ Tutup
          </button>

          <iframe
            src={pdfView}
            className="w-full h-full border-none"
            title="PDF Viewer"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Admin;
