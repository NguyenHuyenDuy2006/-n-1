"use client";

import { useEffect, useState } from "react";
import { Code, Users, RefreshCw, Check } from "lucide-react";

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

  const renderIcon = (iconName: string) => {
    switch (iconName) {
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
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Dịch vụ của chúng tôi</h2>
          <p className="mt-2 text-slate-400">
            Các giải pháp công nghệ đáp ứng toàn diện nhu cầu doanh nghiệp
          </p>
        </div>

        {loading ? (
          <p className="text-center text-slate-400">Đang tải danh sách dịch vụ...</p>
        ) : services.length === 0 ? (
          <p className="text-center text-slate-500">Chưa có dịch vụ nào trong cơ sở dữ liệu.</p>
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
      </div>
    </section>
  );
}