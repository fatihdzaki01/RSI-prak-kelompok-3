"use client";

import { useEffect, useState } from "react";

type Mahasiswa = {
  id: number;
  nama: string;
  nilai: number;
  status: string;
};

const getGrade = (nilai: number) => {
  if (nilai >= 85) return { label: "A", color: "#10B981" };
  if (nilai >= 75) return { label: "B", color: "#3B82F6" };
  if (nilai >= 65) return { label: "C", color: "#F59E0B" };
  if (nilai >= 55) return { label: "D", color: "#F97316" };
  return { label: "E", color: "#EF4444" };
};

export default function Home() {
  const [data, setData] = useState<Mahasiswa[]>([]);
  const [nama, setNama] = useState("");
  const [nilai, setNilai] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

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
    if (!nama.trim() || !nilai) return;
    setSubmitting(true);
    await fetch("http://127.0.0.1:8000/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama, nilai: Number(nilai) }),
    });
    setNama("");
    setNilai("");
    setSubmitting(false);
    fetchData();
  };

  const handleDelete = async (id: number) => {
    await fetch(`http://127.0.0.1:8000/data/${id}`, { method: "DELETE" });
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama: editNama, nilai: Number(editNilai) }),
    });
    setEditId(null);
    fetchData();
  };

  const totalLulus = data.filter((d) => d.status === "lulus").length;
  const avgNilai = data.length ? Math.round(data.reduce((a, b) => a + b.nilai, 0) / data.length) : 0;

  return (
    <div style={{ fontFamily: "'Sora', sans-serif" }}>
      {/* PAGE HEADER */}
      <div className="mb-10">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-4"
          style={{
            background: "rgba(59,130,246,0.1)",
            border: "1px solid rgba(59,130,246,0.2)",
            color: "#60A5FA",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          <span>◆</span> Sistem Manajemen Akademik
        </div>
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
          Dashboard Mahasiswa
        </h1>
        <p className="text-slate-400 text-sm">
          Kelola data nilai dan status kelulusan mahasiswa secara real-time.
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Total Mahasiswa", value: data.length, icon: "👥", accent: "#3B82F6" },
          { label: "Mahasiswa Lulus", value: totalLulus, icon: "✅", accent: "#10B981" },
          { label: "Tidak Lulus", value: data.length - totalLulus, icon: "❌", accent: "#EF4444" },
          { label: "Rata-rata Nilai", value: avgNilai, icon: "📊", accent: "#F59E0B" },
        ].map((stat, i) => (
          <div
            key={i}
            className="rounded-2xl p-5 flex flex-col gap-2"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="text-xl">{stat.icon}</div>
            <div className="text-2xl font-bold" style={{ color: stat.accent }}>
              {stat.value}
            </div>
            <div className="text-xs text-slate-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* MAIN GRID */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* FORM PANEL */}
        <div
          className="rounded-2xl p-6"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(10px)",
          }}
        >
          <h2 className="font-semibold text-white mb-1 text-base">Tambah Data</h2>
          <p className="text-xs text-slate-500 mb-5">Input data mahasiswa baru</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">Nama Mahasiswa</label>
              <input
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Contoh: Budi Santoso"
                className="w-full text-sm text-white placeholder-slate-600 outline-none rounded-xl px-4 py-3"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(59,130,246,0.5)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">Nilai (0–100)</label>
              <input
                type="number"
                value={nilai}
                onChange={(e) => setNilai(e.target.value)}
                placeholder="Contoh: 85"
                min="0"
                max="100"
                className="w-full text-sm text-white placeholder-slate-600 outline-none rounded-xl px-4 py-3"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(59,130,246,0.5)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
              />
              {/* GRADE PREVIEW */}
              {nilai && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-slate-500">Grade:</span>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{
                      background: `${getGrade(Number(nilai)).color}20`,
                      color: getGrade(Number(nilai)).color,
                    }}
                  >
                    {getGrade(Number(nilai)).label}
                  </span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all"
              style={{
                background: submitting
                  ? "rgba(59,130,246,0.3)"
                  : "linear-gradient(135deg, #3B82F6, #6366F1)",
                boxShadow: submitting ? "none" : "0 0 24px rgba(59,130,246,0.3)",
                cursor: submitting ? "not-allowed" : "pointer",
              }}
            >
              {submitting ? "Menyimpan..." : "+ Tambah Mahasiswa"}
            </button>
          </form>

          {/* LEGEND */}
          <div
            className="mt-6 rounded-xl p-4"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            <p className="text-xs text-slate-500 mb-3 font-medium">Skala Grade</p>
            <div className="space-y-2">
              {[
                { grade: "A", range: "85–100", color: "#10B981" },
                { grade: "B", range: "75–84", color: "#3B82F6" },
                { grade: "C", range: "65–74", color: "#F59E0B" },
                { grade: "D", range: "55–64", color: "#F97316" },
                { grade: "E", range: "0–54", color: "#EF4444" },
              ].map((g) => (
                <div key={g.grade} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-5 h-5 rounded flex items-center justify-center text-xs font-bold"
                      style={{ background: `${g.color}20`, color: g.color }}
                    >
                      {g.grade}
                    </span>
                    <span className="text-xs text-slate-400">{g.range}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LIST PANEL */}
        <div className="md:col-span-2 space-y-3">

          {/* HEADER ROW */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold text-white text-base">Daftar Mahasiswa</h2>
            <span
              className="text-xs px-2.5 py-1 rounded-full"
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.4)",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {data.length} records
            </span>
          </div>

          {loading ? (
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-24 rounded-2xl animate-pulse"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                />
              ))}
            </div>
          ) : data.length === 0 ? (
            <div
              className="rounded-2xl p-10 text-center"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px dashed rgba(255,255,255,0.08)",
              }}
            >
              <div className="text-3xl mb-3">📭</div>
              <p className="text-slate-500 text-sm">Belum ada data mahasiswa.</p>
              <p className="text-slate-600 text-xs mt-1">Tambahkan menggunakan form di kiri.</p>
            </div>
          ) : (
            data.map((item: Mahasiswa) => {
              const grade = getGrade(item.nilai);
              const isEditing = editId === item.id;

              return (
                <div
                  key={item.id}
                  className="rounded-2xl p-5 group transition-all"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: isEditing
                      ? "1px solid rgba(59,130,246,0.4)"
                      : "1px solid rgba(255,255,255,0.06)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {isEditing ? (
                    <div>
                      <p className="text-xs text-blue-400 mb-3 font-medium">Mode Edit</p>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <label className="text-xs text-slate-500 block mb-1">Nama</label>
                          <input
                            value={editNama}
                            onChange={(e) => setEditNama(e.target.value)}
                            className="w-full text-sm text-white outline-none rounded-xl px-3 py-2"
                            style={{
                              background: "rgba(255,255,255,0.07)",
                              border: "1px solid rgba(59,130,246,0.3)",
                            }}
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-500 block mb-1">Nilai</label>
                          <input
                            type="number"
                            value={editNilai}
                            onChange={(e) => setEditNilai(e.target.value)}
                            className="w-full text-sm text-white outline-none rounded-xl px-3 py-2"
                            style={{
                              background: "rgba(255,255,255,0.07)",
                              border: "1px solid rgba(59,130,246,0.3)",
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdate(item.id)}
                          className="px-4 py-2 rounded-lg text-sm font-medium text-white"
                          style={{ background: "linear-gradient(135deg, #10B981, #059669)" }}
                        >
                          Simpan
                        </button>
                        <button
                          onClick={() => setEditId(null)}
                          className="px-4 py-2 rounded-lg text-sm font-medium"
                          style={{
                            background: "rgba(255,255,255,0.06)",
                            color: "rgba(255,255,255,0.6)",
                          }}
                        >
                          Batal
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* AVATAR */}
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                          style={{
                            background: `${grade.color}15`,
                            border: `1px solid ${grade.color}30`,
                            color: grade.color,
                          }}
                        >
                          {item.nama.slice(0, 2).toUpperCase()}
                        </div>

                        {/* INFO */}
                        <div>
                          <div className="font-semibold text-white text-sm mb-1">{item.nama}</div>
                          <div className="flex items-center gap-2 flex-wrap">
                            {/* NILAI */}
                            <span
                              className="text-xs px-2 py-0.5 rounded-full font-mono font-semibold"
                              style={{
                                background: `${grade.color}15`,
                                color: grade.color,
                              }}
                            >
                              {item.nilai} pts
                            </span>
                            {/* GRADE */}
                            <span
                              className="text-xs px-2 py-0.5 rounded-full font-bold"
                              style={{
                                background: `${grade.color}20`,
                                color: grade.color,
                                fontFamily: "'JetBrains Mono', monospace",
                              }}
                            >
                              Grade {grade.label}
                            </span>
                            {/* STATUS */}
                            <span
                              className="text-xs px-2 py-0.5 rounded-full capitalize"
                              style={
                                item.status === "lulus"
                                  ? { background: "rgba(16,185,129,0.1)", color: "#34D399" }
                                  : { background: "rgba(239,68,68,0.1)", color: "#F87171" }
                              }
                            >
                              {item.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* ACTIONS */}
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 rounded-lg text-sm transition-all"
                          style={{
                            background: "rgba(245,158,11,0.1)",
                            color: "#FCD34D",
                            border: "1px solid rgba(245,158,11,0.2)",
                          }}
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 rounded-lg text-sm transition-all"
                          style={{
                            background: "rgba(239,68,68,0.1)",
                            color: "#F87171",
                            border: "1px solid rgba(239,68,68,0.2)",
                          }}
                          title="Hapus"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  )}

                  {/* NILAI PROGRESS BAR */}
                  {!isEditing && (
                    <div className="mt-3">
                      <div
                        className="h-1 rounded-full overflow-hidden"
                        style={{ background: "rgba(255,255,255,0.06)" }}
                      >
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${item.nilai}%`,
                            background: `linear-gradient(90deg, ${grade.color}80, ${grade.color})`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}