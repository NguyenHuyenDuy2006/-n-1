import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { siteConfig, footerLinks } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-950 border-t border-surface-800" role="contentinfo">
      <div className="container py-space-5xl lg:py-space-6xl">
        <div className="grid gap-space-4xl lg:grid-cols-2 xl:grid-cols-5">
          <div className="xl:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2 text-heading-lg font-semibold text-surface-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-950 rounded-lg" aria-label="Synapse Codex - Trang chủ">
              <Image src="/icons/synapse-icon.svg" alt="" width={36} height={36} className="h-9 w-9 object-contain" />
              <span>Synapse Codex</span>
            </Link>
            <p className="text-body text-surface-400 max-w-xs">
              Đối tác công nghệ cho doanh nghiệp Việt Nam. Chúng tôi xây dựng phần mềm, gia công hệ thống và dẫn dắt chuyển đổi số — từ bài toán ban đầu đến sản phẩm hoàn chỉnh.
            </p>
          </div>

          <nav aria-label="Giải pháp">
            <h3 className="text-heading-sm font-semibold text-surface-100 mb-4">Giải pháp</h3>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={`${link.href}-${link.label}`}>
                  <Link href={link.href} className="text-body text-surface-400 hover:text-surface-100 transition-colors duration-fast">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Dịch vụ">
            <h3 className="text-heading-sm font-semibold text-surface-100 mb-4">Dịch vụ</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={`${link.href}-${link.label}`}>
                  <Link href={link.href} className="text-body text-surface-400 hover:text-surface-100 transition-colors duration-fast">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Công ty">
            <h3 className="text-heading-sm font-semibold text-surface-100 mb-4">Công ty</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={`${link.href}-${link.label}`}>
                  <Link href={link.href} className="text-body text-surface-400 hover:text-surface-100 transition-colors duration-fast">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-heading-sm font-semibold text-surface-100 mb-4">Liên hệ</h3>
            <address className="not-italic space-y-3 text-body text-surface-400">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 mt-0.5 flex-shrink-0 text-surface-500" aria-hidden="true" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-surface-100 transition-colors duration-fast">{siteConfig.contact.email}</a>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 mt-0.5 flex-shrink-0 text-surface-500" aria-hidden="true" />
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-surface-100 transition-colors duration-fast">{siteConfig.contact.phone}</a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0 text-surface-500" aria-hidden="true" />
                <span>{siteConfig.contact.address}</span>
              </div>
            </address>
          </div>
        </div>

        <div className="mt-space-5xl pt-space-2xl border-t border-surface-800 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <p className="text-body-sm text-surface-500">
            © {currentYear} {siteConfig.legalName}. Bảo lưu mọi quyền.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-body-sm text-surface-500">
            {footerLinks.legal.map((link) => (
              <Link key={`${link.href}-${link.label}`} href={link.href} className="hover:text-surface-300 transition-colors duration-fast">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
