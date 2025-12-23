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

  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "success",
    onConfirm: null,
  });

  const token = localStorage.getItem("token");
  const normalizePath = (p) => p?.replace(/\\/g, "/");

  const showPopup = (message, type = "success", onConfirm = null) => {
    setPopup({ show: true, message, type, onConfirm });
  };

  const closePopup = () => {
    setPopup({ show: false, message: "", type: "success", onConfirm: null });
  };

  const loadBooks = async () => {
    const res = await fetch(`${BASE_URL}/api/books`);
    const data = await res.json();
    setBooks(data);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  /* ===== TAMBAH ===== */
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

    await fetch(`${BASE_URL}/api/books`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    showPopup("Buku berhasil ditambahkan 🎉");
    setJudul("");
    setPenulis("");
    setTahun("");
    setKategori("");
    setCover(null);
    setPdf(null);
    setPreview(null);
    loadBooks();
  };

  /* ===== HAPUS ===== */
  const handleDelete = (id) => {
    showPopup("Yakin ingin menghapus buku ini?", "confirm", async () => {
      await fetch(`${BASE_URL}/api/books/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      loadBooks();
    });
  };

  /* ===== EDIT ===== */
  const openEdit = (book) => {
    setEditBookId(book.id);
    setJudul(book.title);
    setPenulis(book.author);
    setTahun(book.year);
    setKategori(book.category);
    setEditPreview(`${BASE_URL}/${normalizePath(book.cover_path)}`);
    setIsEditOpen(true);
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

    await fetch(`${BASE_URL}/api/books/${editBookId}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    setIsEditOpen(false);
    loadBooks();
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">
        Admin <span className="text-orange-500">Dashboard</span>
      </h1>

      {/* ===== FORM TAMBAH ===== */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-xl mb-10 max-w-xl mx-auto space-y-4"
      >
        <input className="w-full p-3 bg-gray-700 rounded" placeholder="Judul Buku" value={judul} onChange={(e) => setJudul(e.target.value)} />
        <input className="w-full p-3 bg-gray-700 rounded" placeholder="Penulis" value={penulis} onChange={(e) => setPenulis(e.target.value)} />
        <input type="number" className="w-full p-3 bg-gray-700 rounded" placeholder="Tahun" value={tahun} onChange={(e) => setTahun(e.target.value)} />
        <input className="w-full p-3 bg-gray-700 rounded" placeholder="Kategori" value={kategori} onChange={(e) => setKategori(e.target.value)} />

        {/* === UPLOAD COVER (FIX UI) === */}
        <div>
          <label className="block mb-1 text-sm">Cover Buku</label>
          <label className="block w-full text-center py-3 bg-gray-700 rounded cursor-pointer hover:bg-gray-600">
            Upload Cover
            <input type="file" accept="image/*" hidden onChange={handleCoverChange} />
          </label>
          {preview && <img src={preview} className="w-28 mt-2 rounded" />}
        </div>

        {/* === UPLOAD PDF (FIX UI) === */}
        <div>
          <label className="block mb-1 text-sm">File PDF Buku</label>
          <label className="block w-full text-center py-3 bg-gray-700 rounded cursor-pointer hover:bg-gray-600">
            Upload PDF
            <input type="file" accept="application/pdf" hidden onChange={(e) => setPdf(e.target.files[0])} />
          </label>
          {pdf && <p className="text-xs mt-1 text-gray-400">{pdf.name}</p>}
        </div>

        <button className="w-full bg-green-500 py-3 rounded font-bold">
          Tambahkan Buku
        </button>
      </form>

      {/* ===== LIST ===== */}
      <div className="grid md:grid-cols-3 gap-6">
        {books.map((b) => (
          <div key={b.id} className="bg-gray-800 p-4 rounded">
            <img src={`${BASE_URL}/${normalizePath(b.cover_path)}`} className="h-44 w-full object-cover rounded mb-2" />
            <p className="font-bold">{b.title}</p>
            <p className="text-sm">{b.author}</p>

            <div className="flex gap-2 mt-3 flex-wrap">
              <button onClick={() => openEdit(b)} className="bg-yellow-500 px-3 py-1 rounded">Edit</button>
              <button onClick={() => setPdfView(`${BASE_URL}/${normalizePath(b.pdf_path)}`)} className="bg-indigo-500 px-3 py-1 rounded">Baca</button>
              <button onClick={() => handleDelete(b.id)} className="bg-red-600 px-3 py-1 rounded">Hapus</button>
            </div>
          </div>
        ))}
      </div>

      {/* ===== PDF VIEW ===== */}
      {pdfView && (
        <div className="fixed inset-0 bg-black/90 z-50">
          <button onClick={() => setPdfView(null)} className="absolute top-4 right-4 bg-red-600 px-3 py-2 rounded">✕</button>
          <iframe src={pdfView} className="w-full h-full" />
        </div>
      )}

      {/* ===== POPUP ===== */}
      {popup.show && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded w-80 text-center">
            <p className="mb-4">{popup.message}</p>
            {popup.type === "confirm" ? (
              <div className="flex justify-center gap-4">
                <button onClick={() => { popup.onConfirm(); closePopup(); }} className="bg-red-600 px-4 py-2 rounded">Ya</button>
                <button onClick={closePopup} className="bg-gray-600 px-4 py-2 rounded">Batal</button>
              </div>
            ) : (
              <button onClick={closePopup} className="bg-green-500 px-4 py-2 rounded">OK</button>
            )}
          </div>
        </div>
      )}

      {isEditOpen && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Edit Buku</h2>

              <form onSubmit={handleUpdate} className="space-y-3">
                <input
                  className="w-full p-2 bg-gray-700 rounded"
                  placeholder="Judul"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                />

                <input
                  className="w-full p-2 bg-gray-700 rounded"
                  placeholder="Penulis"
                  value={penulis}
                  onChange={(e) => setPenulis(e.target.value)}
                />

                <input
                  type="number"
                  className="w-full p-2 bg-gray-700 rounded"
                  placeholder="Tahun"
                  value={tahun}
                  onChange={(e) => setTahun(e.target.value)}
                />

                <input
                  className="w-full p-2 bg-gray-700 rounded"
                  placeholder="Kategori"
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                />

                {/* GANTI COVER */}
                <div>
                  <label className="block text-sm mb-1">Ganti Cover</label>
                  <label className="block w-full text-center py-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-600">
                    Upload Cover Baru
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => {
                        setCover(e.target.files[0]);
                        setEditPreview(URL.createObjectURL(e.target.files[0]));
                      }}
                    />
                  </label>

                  {editPreview && (
                    <img
                      src={editPreview}
                      className="w-28 mt-2 rounded"
                    />
                  )}
                </div>

                {/* GANTI PDF */}
                <div>
                  <label className="block text-sm mb-1">Ganti PDF</label>
                  <label className="block w-full text-center py-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-600">
                    Upload PDF Baru
                    <input
                      type="file"
                      accept="application/pdf"
                      hidden
                      onChange={(e) => setPdf(e.target.files[0])}
                    />
                  </label>
                  {pdf && <p className="text-xs mt-1 text-gray-400">{pdf.name}</p>}
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="submit"
                    className="bg-green-600 px-4 py-2 rounded font-semibold"
                  >
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
    </div>
  );
};

export default Admin;
