import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const emailHref = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent("Trao đổi bài toán công nghệ")}`;

export function ContactSection() {
  return (
    <section
      id="contact"
      className="section bg-white dark:bg-surface-900 relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <div className="absolute inset-0 bg-grid-white dark:bg-grid opacity-30" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-500/3 to-transparent dark:from-transparent dark:via-brand-900/5 dark:to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 noise" aria-hidden="true" />

      <div className="relative container">
        <div className="grid lg:grid-cols-2 gap-space-4xl lg:gap-space-6xl items-start">
          <div>
            <p className="text-body text-brand-600 dark:text-brand-400 font-medium mb-4 animate-in">
              Bắt đầu trao đổi
            </p>
            <h2 id="contact-heading" className="text-display-md font-bold text-surface-950 dark:text-surface-50 mb-6 animate-in stagger-1">
              Bạn đang có một bài toán <span className="gradient-text">cần giải bằng công nghệ</span>?
            </h2>
            <p className="text-body-lg text-surface-600 dark:text-surface-400 mb-10 animate-in stagger-2">
              Chia sẻ nhu cầu của bạn với Synapse Codex để cùng trao đổi về hướng tiếp cận phù hợp.
            </p>

            <div className="space-y-6 animate-in stagger-3">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-950/30 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-brand-600 dark:text-brand-400" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-heading-sm font-semibold text-surface-900 dark:text-surface-100">Email</h3>
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-body text-surface-600 dark:text-surface-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-50 dark:bg-accent-950/30 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-accent-600 dark:text-accent-400" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-heading-sm font-semibold text-surface-900 dark:text-surface-100">Điện thoại</h3>
                  <a href={`tel:${siteConfig.contact.phone}`} className="text-body text-surface-600 dark:text-surface-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors">
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-surface-600 dark:text-surface-400" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-heading-sm font-semibold text-surface-900 dark:text-surface-100">Địa chỉ</h3>
                  <p className="text-body text-surface-600 dark:text-surface-400">{siteConfig.contact.address}</p>
                </div>
              </div>
            </div>
          </div>

          <Card variant="glass">
            <div className="p-6 lg:p-8 space-y-8">
              <div>
                <p className="text-body-sm font-medium uppercase tracking-[0.12em] text-brand-600 dark:text-brand-400 mb-3">
                  Trao đổi trực tiếp
                </p>
                <h3 className="text-heading-xl font-semibold text-surface-900 dark:text-surface-100 mb-3">
                  Chọn cách kết nối phù hợp với bạn
                </h3>
                <p className="text-body text-surface-600 dark:text-surface-400">
                  Gửi email với thông tin bài toán hoặc gọi trực tiếp để cùng trao đổi hướng tiếp cận.
                </p>
              </div>

              <div className="grid gap-4">
                <a
                  href={emailHref}
                  className="group flex items-center justify-between gap-4 rounded-xl border border-brand-200 bg-brand-50/70 p-4 text-brand-800 transition-colors hover:border-brand-400 hover:bg-brand-100 dark:border-brand-800 dark:bg-brand-950/40 dark:text-brand-100 dark:hover:border-brand-600 dark:hover:bg-brand-950/70"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <Mail className="h-5 w-5 flex-shrink-0 text-brand-600 dark:text-brand-400" aria-hidden="true" />
                    <span className="min-w-0">
                      <span className="block text-body-sm font-medium">Email</span>
                      <span className="block truncate text-body-sm opacity-80">{siteConfig.contact.email}</span>
                    </span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 flex-shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </a>

                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="group flex items-center justify-between gap-4 rounded-xl border border-accent-200 bg-accent-50/70 p-4 text-accent-800 transition-colors hover:border-accent-400 hover:bg-accent-100 dark:border-accent-800 dark:bg-accent-950/40 dark:text-accent-100 dark:hover:border-accent-600 dark:hover:bg-accent-950/70"
                >
                  <span className="flex items-center gap-3">
                    <Phone className="h-5 w-5 flex-shrink-0 text-accent-600 dark:text-accent-400" aria-hidden="true" />
                    <span>
                      <span className="block text-body-sm font-medium">Điện thoại</span>
                      <span className="block text-body-sm opacity-80">{siteConfig.contact.phone}</span>
                    </span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 flex-shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
              </div>

              <Button size="lg" asChild className="w-full whitespace-nowrap">
                <a href={emailHref} className="inline-flex items-center gap-2 whitespace-nowrap">
                  Mở email để trao đổi
                  <ArrowUpRight className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
