"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, X, LogOut, User as UserIcon } from "lucide-react";
import { navigation } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface UserProfile {
  id?: number;
  username?: string;
  full_name?: string;
  role?: string;
}

export function Header() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    // 1. Kiểm tra trạng thái cuộn trang
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 2. Đọc thông tin người dùng từ localStorage khi tải trang
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Lỗi đọc dữ liệu người dùng:", e);
      }
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
    setIsMobileMenuOpen(false);
    router.push("/login");
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-normal",
        isScrolled
          ? "bg-surface-50/80 dark:bg-surface-950/80 backdrop-blur-xl border-b border-surface-200/50 dark:border-surface-800/50 shadow-shadow-sm"
          : "bg-transparent",
      )}
      role="banner"
    >
      <nav className="container" aria-label="Main navigation">
        <div className={cn("flex items-center justify-between transition-[height] duration-normal", isScrolled ? "h-14 lg:h-16" : "h-16 lg:h-20")}>
          <Link
            href="/"
            className={cn("flex items-center gap-2 text-heading-lg font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 rounded-lg", isScrolled ? "text-surface-900 dark:text-surface-50 focus-visible:ring-offset-surface-50 dark:focus-visible:ring-offset-surface-950" : "text-surface-50 focus-visible:ring-offset-surface-950")}
            aria-label="Synapse Codex - Trang chủ"
          >
            <Image src="/icons/synapse-icon.svg" alt="" width={36} height={36} className="h-9 w-9 object-contain" priority />
            <span>Synapse Codex</span>
          </Link>

          {/* Menu máy tính */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {navigation.map((item) => (
              <Link
                key={`desktop-${item.href}`}
                href={item.href}
                className={cn("text-body-sm font-medium hover:text-brand-300 transition-colors duration-fast relative after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-brand-400 after:transition-all hover:after:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 rounded", isScrolled ? "text-surface-600 dark:text-surface-400 focus-visible:ring-offset-surface-50 dark:focus-visible:ring-offset-surface-950" : "text-surface-300 focus-visible:ring-offset-surface-950")}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Nút thao tác trên máy tính */}
          <div className="hidden lg:flex lg:items-center lg:gap-3">
            {currentUser ? (
              <div className="flex items-center gap-4">
                <span className={cn("flex items-center gap-2 text-sm font-medium", isScrolled ? "text-surface-700 dark:text-surface-200" : "text-surface-100")}>
                  <UserIcon className="h-4 w-4 text-cyan-400" />
                  Xin chào, <span className="font-semibold text-cyan-400">{currentUser.full_name || currentUser.username}</span>
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className={cn("flex items-center gap-1 text-red-400 hover:bg-red-500/10 hover:text-red-300", isScrolled ? "" : "hover:bg-white/10")}
                >
                  <LogOut className="h-4 w-4" />
                  Đăng xuất
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className={isScrolled ? "text-surface-700 dark:text-surface-200" : "text-surface-100 hover:bg-white/10 hover:text-white"}
                >
                  <Link href="/login">Đăng nhập</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/register">Đăng ký</Link>
                </Button>
              </>
            )}
          </div>

          {/* Nút Menu Mobile */}
          <button
            className={cn("lg:hidden p-2 rounded-lg hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500", isScrolled ? "text-surface-600 dark:text-surface-400 dark:hover:bg-surface-800" : "text-surface-300")}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Đóng menu" : "Mở menu"}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Menu mở rộng trên Mobile */}
        <div
          id="mobile-menu"
          className={cn(
            "lg:hidden overflow-hidden rounded-b-2xl border-x border-b transition-all duration-normal ease-out-expo",
            isMobileMenuOpen ? "max-h-[36rem] opacity-100 pb-6" : "max-h-0 border-transparent opacity-0",
            isScrolled
              ? "border-surface-200/80 bg-surface-50/95 dark:border-surface-800/80 dark:bg-surface-950/95"
              : "border-white/10 bg-surface-950/95",
          )}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="space-y-1 px-2 pt-4">
            {navigation.map((item) => (
              <Link
                key={`mobile-${item.href}`}
                href={item.href}
                className={cn(
                  "block rounded-xl px-3 py-3 text-body font-medium transition-colors duration-fast",
                  isScrolled
                    ? "text-surface-700 hover:bg-surface-100 hover:text-surface-950 dark:text-surface-300 dark:hover:bg-surface-800 dark:hover:text-white"
                    : "text-surface-200 hover:bg-white/10 hover:text-white",
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className={cn(
              "mt-3 flex flex-col gap-3 border-t pt-4",
              isScrolled ? "border-surface-200 dark:border-surface-800" : "border-white/10",
            )}>
              {currentUser ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-2 text-sm text-surface-200">
                    <UserIcon className="h-4 w-4 text-cyan-400" />
                    Xin chào, <span className="font-semibold text-cyan-400">{currentUser.full_name || currentUser.username}</span>
                  </div>
                  <Button variant="secondary" className="w-full text-red-400 hover:text-red-300" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Đăng xuất
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="secondary"
                    className={cn(
                      "w-full",
                      isScrolled ? "text-surface-900 dark:text-white" : "border-white/20 bg-white/10 text-white hover:bg-white/20",
                    )}
                    asChild
                  >
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>Đăng nhập</Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>Đăng ký</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}