"use client";

import { useEffect, useState } from "react";
import { 
  Code, 
  Users, 
  RefreshCw, 
  Brain, 
  Mail, 
  Megaphone, 
  Check, 
  Loader2 
} from "lucide-react";

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string | null;
}

export function ServicesSection() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost/synapse-codex-main/backend/read.php")
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return res.json();
      })
      .then((data) => {
        if (data.status && Array.isArray(data.data)) {
          setServices(data.data);
        } else {
          setServices([]);
        }
      })
      .catch((err) => {
        console.error("Lỗi lấy dữ liệu services:", err);
        setServices([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Bổ sung đầy đủ mapping cho các loại icon theo giao diện mẫu
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "brain":
        return <Brain className="h-6 w-6 text-cyan-500" />;
      case "mail":
        return <Mail className="h-6 w-6 text-cyan-500" />;
      case "megaphone":
        return <Megaphone className="h-6 w-6 text-cyan-500" />;
      case "users":
        return <Users className="h-6 w-6 text-cyan-500" />;
      case "refresh-cw":
        return <RefreshCw className="h-6 w-6 text-cyan-500" />;
      default:
        return <Code className="h-6 w-6 text-cyan-500" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-slate-900/50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Dịch vụ của chúng tôi</h2>
          <p className="mt-2 text-slate-400">
            Các giải pháp công nghệ đáp ứng toàn diện nhu cầu doanh nghiệp
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-2 py-20 text-slate-400">
            <Loader2 className="h-5 w-5 animate-spin text-cyan-500" />
            <span>Đang tải danh sách dịch vụ...</span>
          </div>
        ) : services.length === 0 ? (
          <p className="text-center text-slate-500 py-12">Chưa có dịch vụ nào trong cơ sở dữ liệu.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-2xl border border-cyan-500/20 bg-white dark:bg-slate-950 p-8 shadow-sm transition hover:shadow-cyan-500/10 hover:shadow-xl"
              >
                <div>
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10">
                    {renderIcon(item.icon)}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {item.description}
                  </p>
                </div>

                <ul className="mt-8 space-y-3 border-t border-slate-200 dark:border-slate-800 pt-6">
                  {(item.features ?? "")
                    .split("\n")
                    .filter(Boolean)
                    .map((feat, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300"
                      >
                        <Check className="h-4 w-4 text-cyan-500 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Nút hành động bổ sung theo bản thiết kế */}
        <div className="mt-14 text-center">
          <button className="rounded-xl border border-cyan-500 px-7 py-3 text-sm font-semibold text-cyan-400 hover:bg-cyan-500/10 transition">
            Trao đổi giải pháp phù hợp
          </button>
        </div>
      </div>
    </section>
  );
}