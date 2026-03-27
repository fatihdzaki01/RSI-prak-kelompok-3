"use client";

import { useEffect, useState } from "react";

type Mahasiswa = {
  id: number;
  nama: string;
  nilai: number;
  status: string;
};

export default function Home() {
  const [data, setData] = useState<Mahasiswa[]>([]);
  const [nama, setNama] = useState("");
  const [nilai, setNilai] = useState("");
  const [loading, setLoading] = useState(true);

  const [editId, setEditId] = useState<number | null>(null);
  const [editNama, setEditNama] = useState("");
  const [editNilai, setEditNilai] = useState("");

  const fetchData = () => {
    fetch("http://127.0.0.1:8000/data")
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch("http://127.0.0.1:8000/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nama,
        nilai: Number(nilai),
      }),
    });

    setNama("");
    setNilai("");
    fetchData();
  };

  const handleDelete = async (id: number) => {
    await fetch(`http://127.0.0.1:8000/data/${id}`, {
      method: "DELETE",
    });

    fetchData();
  };

  const handleEdit = (item: Mahasiswa) => {
    setEditId(item.id);
    setEditNama(item.nama);
    setEditNilai(item.nilai.toString());
  };

  const handleUpdate = async (id: number) => {
    await fetch(`http://127.0.0.1:8000/data/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nama: editNama,
        nilai: Number(editNilai),
      }),
    });

    setEditId(null);
    fetchData();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        📚 Data Mahasiswa
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-4 max-w-xl mx-auto mb-6"
      >
        <h2 className="text-xl font-semibold mb-3">Tambah Data</h2>

        <input
          type="text"
          placeholder="Nama"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          required
        />

        <input
          type="number"
          placeholder="Nilai"
          value={nilai}
          onChange={(e) => setNilai(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          required
        />

        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Tambah
        </button>
      </form>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid gap-4 max-w-xl mx-auto">
          {data.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-lg p-4"
            >
              {editId === item.id ? (
                <>
                  <input
                    value={editNama}
                    onChange={(e) => setEditNama(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                  />

                  <input
                    type="number"
                    value={editNilai}
                    onChange={(e) => setEditNilai(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                  />

                  <button
                    onClick={() => handleUpdate(item.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Simpan
                  </button>

                  <button
                    onClick={() => setEditId(null)}
                    className="bg-gray-400 text-white px-3 py-1 rounded"
                  >
                    Batal
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold">{item.nama}</h2>

                  <p className="text-gray-600">
                    Nilai: {item.nilai}
                  </p>

                  <p
                    className={`font-bold ${
                      item.status === "lulus"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.status}
                  </p>

                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Hapus
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}