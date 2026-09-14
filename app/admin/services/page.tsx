"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ServiceItem | null>(null);
  const [form, setForm] = useState({ title: "", description: "", icon: "code", features: "" });

  const loadServices = () => {
    fetch("http://localhost/api/services/read.php")
      .then((res) => res.json())
      .then((data) => data.status && setServices(data.data));
  };

  useEffect(() => {
    loadServices();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setForm({ title: "", description: "", icon: "code", features: "" });
    setModalOpen(true);
  };

  const openEditModal = (item: ServiceItem) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      description: item.description,
      icon: item.icon,
      features: item.features,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa dịch vụ này?")) return;
    const res = await fetch("http://localhost/api/services/delete.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (data.status) loadServices();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = editingItem
      ? "http://localhost/api/services/update.php"
      : "http://localhost/api/services/create.php";

    const payload = editingItem ? { ...form, id: editingItem.id } : form;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (data.status) {
      setModalOpen(false);
      loadServices();
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-5">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:underline mb-2">
              <ArrowLeft className="h-4 w-4" /> Về trang chủ
            </Link>
            <h1 className="text-2xl font-bold">Quản lý Dịch vụ (Admin CRUD)</h1>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 font-medium text-white hover:bg-cyan-500"
          >
            <Plus className="h-5 w-5" /> Thêm Dịch Vụ
          </button>
        </div>

        {/* Bảng danh sách dịch vụ */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="border-b border-slate-800 bg-slate-900 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Tên dịch vụ</th>
                <th className="px-6 py-4">Mô tả</th>
                <th className="px-6 py-4">Icon</th>
                <th className="px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {services.map((item) => (
                <tr key={item.id} className="border-b border-slate-800 hover:bg-slate-800/40">
                  <td className="px-6 py-4 font-bold text-slate-500">{item.id}</td>
                  <td className="px-6 py-4 font-semibold text-white">{item.title}</td>
                  <td className="px-6 py-4 max-w-sm truncate text-slate-400">{item.description}</td>
                  <td className="px-6 py-4">{item.icon}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(item)}
                      className="rounded p-1 text-cyan-400 hover:bg-cyan-500/10"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="rounded p-1 text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal Thêm / Sửa */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
              <h2 className="text-xl font-bold text-white mb-4">
                {editingItem ? "Sửa Dịch Vụ" : "Thêm Dịch Vụ Mới"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-300">Tiêu đề</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300">Mô tả</label>
                  <textarea
                    required
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300">Loại Icon</label>
                  <select
                    value={form.icon}
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-white"
                  >
                    <option value="code">Mã nguồn (Code)</option>
                    <option value="users">Khách hàng (Users)</option>
                    <option value="refresh-cw">Hạ tầng (RefreshCw)</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300">
                    Danh sách đặc điểm (Mỗi đặc điểm xuống 1 dòng)
                  </label>
                  <textarea
                    rows={4}
                    value={form.features}
                    onChange={(e) => setForm({ ...form, features: e.target.value })}
                    placeholder="Web app hiện đại&#10;Mobile app&#10;Phân quyền người dùng"
                    className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-white font-mono text-sm"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="rounded-lg px-4 py-2 text-slate-400 hover:bg-slate-800"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-cyan-600 px-5 py-2 font-medium text-white hover:bg-cyan-500"
                  >
                    Lưu thay đổi
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}