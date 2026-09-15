"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Plus, 
  CheckCircle2, 
  Clock, 
  UserCheck, 
  FolderKanban,
  Sliders,
  Calendar
} from "lucide-react";

interface User {
  id: number;
  username: string;
}

interface Task {
  id: number;
  project_id: number;
  assigned_to: number;
  assignee_name?: string;
  title: string;
  description: string;
  status: "todo" | "in_progress" | "review" | "completed";
  progress: number;
  due_date: string;
}

export default function ProjectManagementPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeProject] = useState({ id: 1, name: "Xây dựng Website Synapse Codex" });

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assigned_to: "",
    due_date: "",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resTasks, resUsers] = await Promise.all([
        fetch(`http://localhost/synapse-codex-main/backend/get_tasks.php?project_id=${activeProject.id}`),
        fetch(`http://localhost/synapse-codex-main/backend/get_users.php`),
      ]);
      const dataTasks = await resTasks.json();
      const dataUsers = await resUsers.json();

      if (dataTasks?.status) setTasks(dataTasks.data);
      if (dataUsers?.status) setUsers(dataUsers.data);
    } catch {
      // Dữ liệu mẫu hiển thị khi API backend chưa khởi chạy
      setUsers([
        { id: 1, username: "Nguyễn Huyền Duy" },
        { id: 2, username: "Lý Giỏi" },
      ]);
      setTasks([
        {
          id: 1,
          project_id: 1,
          assigned_to: 1,
          assignee_name: "Nguyễn Huyền Duy",
          title: "Xây dựng giao diện Phân công công việc",
          description: "Tạo trang quản lý dự án, modal gán task và thanh kéo tiến độ",
          status: "in_progress",
          progress: 80,
          due_date: "2026-09-20",
        },
        {
          id: 2,
          project_id: 1,
          assigned_to: 2,
          assignee_name: "Lý Giỏi",
          title: "Thiết kế API và bảng phân công Tasks",
          description: "Tạo bảng tasks, projects và viết 4 endpoint kết nối MySQL",
          status: "todo",
          progress: 25,
          due_date: "2026-09-22",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateProgress = async (taskId: number, newProgress: number) => {
    let newStatus: Task["status"] = "in_progress";
    if (newProgress === 100) newStatus = "completed";
    if (newProgress === 0) newStatus = "todo";

    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, progress: newProgress, status: newStatus } : t))
    );

    try {
      await fetch("http://localhost/synapse-codex-main/backend/update_task.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: taskId, progress: newProgress, status: newStatus }),
      });
    } catch (err) {
      console.error("Lỗi cập nhật tiến độ:", err);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTaskPayload = {
      project_id: activeProject.id,
      ...formData,
      progress: 0,
      status: "todo",
    };

    try {
      const res = await fetch("http://localhost/synapse-codex-main/backend/create_task.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTaskPayload),
      });
      const data = await res.json();
      if (data?.status) {
        setIsOpenModal(false);
        setFormData({ title: "", description: "", assigned_to: "", due_date: "" });
        fetchData();
        return;
      }
    } catch {
      // Cập nhật giao diện tạm thời nếu backend chưa sẵn sàng
      const selectedUser = users.find((u) => u.id === Number(formData.assigned_to));
      setTasks((prev) => [
        ...prev,
        {
          id: Date.now(),
          project_id: activeProject.id,
          assigned_to: Number(formData.assigned_to),
          assignee_name: selectedUser?.username || "Thành viên",
          title: formData.title,
          description: formData.description,
          status: "todo",
          progress: 0,
          due_date: formData.due_date,
        },
      ]);
      setFormData({ title: "", description: "", assigned_to: "", due_date: "" });
      setIsOpenModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <div className="flex items-center gap-4 mb-3">
            <Link
              href="/admin/services"
              className="inline-flex items-center gap-1.5 text-sm text-cyan-400 hover:text-cyan-300 transition"
            >
              <ArrowLeft className="h-4 w-4" /> Quản lý Dịch vụ
            </Link>
            <span className="text-slate-600">|</span>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition"
            >
              Về trang chủ
            </Link>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
            <div>
              <div className="flex items-center gap-3">
                <FolderKanban className="h-8 w-8 text-cyan-500" />
                <h1 className="text-3xl font-bold text-white">{activeProject.name}</h1>
              </div>
              <p className="text-slate-400 mt-1">
                Theo dõi tiến độ, phân bổ công việc và quản lý trách nhiệm từng thành viên
              </p>
            </div>
            <button
              onClick={() => setIsOpenModal(true)}
              className="flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-2.5 font-medium text-white hover:bg-cyan-500 transition shadow-lg shadow-cyan-600/20"
            >
              <Plus className="h-5 w-5" /> Phân công Task mới
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-400">Đang tải bảng công việc...</div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-16 text-slate-500 border border-dashed border-slate-800 rounded-2xl">
            Chưa có task nào trong dự án này. Bấm nút phía trên để tạo task đầu tiên.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-sm hover:border-slate-700 transition"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                        task.status === "completed"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : task.status === "in_progress"
                          ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      {task.status === "completed" ? (
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      ) : (
                        <Clock className="h-3.5 w-3.5" />
                      )}
                      {task.status === "completed"
                        ? "Hoàn thành"
                        : task.status === "in_progress"
                        ? "Đang xử lý"
                        : "Chờ thực hiện"}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" /> {task.due_date || "Không hạn"}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2">{task.title}</h3>
                  <p className="text-sm text-slate-400 line-clamp-2 mb-4">{task.description}</p>

                  <div className="flex items-center gap-2 text-sm text-slate-300 py-2 px-3 rounded-lg bg-slate-800/60 mb-4">
                    <UserCheck className="h-4 w-4 text-cyan-400" />
                    <span>Phụ trách: <strong className="text-white">{task.assignee_name || `User #${task.assigned_to}`}</strong></span>
                  </div>
                </div>

                <div className="border-t border-slate-800 pt-4 mt-2">
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Sliders className="h-3.5 w-3.5" /> Kéo đổi tiến độ:
                    </span>
                    <span className="font-semibold text-cyan-400">{task.progress}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={task.progress}
                    onChange={(e) => handleUpdateProgress(task.id, Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isOpenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-4">Phân công công việc mới</h2>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-300 mb-1">Tiêu đề Task *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Thiết kế Database"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-1">Gán cho thành viên *</label>
                <select
                  required
                  value={formData.assigned_to}
                  onChange={(e) => setFormData({ ...formData, assigned_to: e.target.value })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="">-- Chọn thành viên phụ trách --</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.username} (ID: #{u.id})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-1">Mô tả chi tiết</label>
                <textarea
                  rows={3}
                  placeholder="Nội dung công việc cần làm..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-1">Hạn hoàn thành (Deadline)</label>
                <input
                  type="date"
                  value={formData.due_date}
                  onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsOpenModal(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-cyan-600 rounded-lg text-white font-medium hover:bg-cyan-500 transition"
                >
                  Tạo & Gán việc
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}