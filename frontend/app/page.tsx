"use client";

import { useEffect, useState } from "react";
import {
  getAllData,
  createData,
  updateData,
  deleteData,
} from "../services/api";

type DataType = {
  id: number;
  nama: string;
  nilai: number;
  status?: string;
};

export default function Home() {
  const [data, setData] = useState<DataType[]>([]);
  const [form, setForm] = useState({ nama: "", nilai: "" });
  const [editId, setEditId] = useState<number | null>(null);

  const fetchData = async () => {
    try {
      const res = await getAllData();
      setData(res?.data || []);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editId !== null) {
        await updateData(editId, {
          nama: form.nama,
          nilai: Number(form.nilai),
        });
        setEditId(null);
      } else {
        await createData({
          nama: form.nama,
          nilai: Number(form.nilai),
        });
      }

      setForm({ nama: "", nilai: "" });
      fetchData();
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const handleEdit = (item: DataType) => {
    setForm({ nama: item.nama, nilai: String(item.nilai) });
    setEditId(item.id);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteData(id);
      fetchData();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <main style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
        Sistem Informasi Bantuan Sosial
      </h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Nama"
          value={form.nama}
          onChange={(e) => setForm({ ...form, nama: e.target.value })}
          style={{ border: "1px solid #ccc", padding: "8px", width: "100%", marginBottom: "10px" }}
        />

        <input
          type="number"
          placeholder="Nilai"
          value={form.nilai}
          onChange={(e) => setForm({ ...form, nilai: e.target.value })}
          style={{ border: "1px solid #ccc", padding: "8px", width: "100%", marginBottom: "10px" }}
        />

        <button type="submit" style={{ padding: "8px 16px" }}>
          {editId !== null ? "Update" : "Tambah"}
        </button>
      </form>

      {/* TABLE */}
      <table border={1} cellPadding={10} width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Nilai</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td align="center">{item.id}</td>
              <td align="center">{item.nama}</td>
              <td align="center">{item.nilai}</td>
              <td
                align="center"
                style={{
                  color: item.status === "lulus" ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {item.status}
              </td>
              <td align="center">
                <button onClick={() => handleEdit(item)}>Edit</button>{" "}
                <button onClick={() => handleDelete(item.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}