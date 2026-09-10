"use client";

import { Monitor, Server, Database, Mail, Megaphone, GraduationCap, Check } from "lucide-react";
import { services } from "@/lib/constants";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";

const serviceIcons = {
  "management-software": Database,
  "website-development": Monitor,
  "hosting-infrastructure": Server,
  "google-workspace": Mail,
  "google-ads": Megaphone,
  "ai-training": GraduationCap,
};

export function ServicesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  return (
    <section
      id="services"
      className="section bg-white dark:bg-surface-900"
      aria-labelledby="services-heading"
    >
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-space-6xl">
          <p className="text-body text-brand-600 dark:text-brand-400 font-medium mb-4 animate-in">
            Dịch vụ cốt lõi
          </p>
          <h2 id="services-heading" className="text-display-md font-bold text-surface-950 dark:text-surface-50 mb-6 animate-in stagger-1 text-balance lg:whitespace-nowrap">
            Dịch vụ số cho từng <span className="gradient-text">nhu cầu thực tế</span>
          </h2>
          <p className="text-body-lg text-surface-600 dark:text-surface-400 animate-in stagger-2">
            Đồng hành cùng doanh nghiệp, cửa hàng và tổ chức trong xây dựng, vận hành và phát triển trên nền tảng số.
          </p>
        </div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          role="list"
        >
          {services.map((service, _index) => {
            const Icon = serviceIcons[service.id as keyof typeof serviceIcons] || Server;

            return (
              <motion.article
                key={service.id}
                variants={itemVariants}
                role="listitem"
                className="group"
              >
                <Card variant="hover" className="h-full">
                  <div className="p-6 lg:p-8 h-full flex flex-col">
                    <div className="w-12 h-12 rounded-xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center mb-6 group-hover:bg-brand-500 group-hover:text-white transition-all duration-normal">
                      <Icon className="h-6 w-6 text-brand-600 dark:text-brand-400 group-hover:text-white transition-colors" aria-hidden="true" />
                    </div>

                    <h3 className="text-heading-md font-semibold text-surface-900 dark:text-surface-100 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-body text-surface-600 dark:text-surface-400 mb-6 flex-1">
                      {service.description}
                    </p>

                    <div className="space-y-3 mb-6">
                      <div>
                        <p className="text-body-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Công nghệ:</p>
                        <div className="flex flex-wrap gap-2">
                          {service.tech.map((t, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 text-caption font-medium bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 rounded-full border border-surface-200 dark:border-surface-700"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-body-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Sản phẩm bàn giao:</p>
                        <div className="flex flex-wrap gap-2">
                          {service.deliverables.map((d, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 text-caption font-medium bg-brand-50 dark:bg-brand-950/30 text-brand-700 dark:text-brand-300 rounded-full"
                            >
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-2" role="list">
                      {service.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-center gap-2 text-body-sm text-surface-500 dark:text-surface-400">
                          <Check className="h-4 w-4 text-brand-500 flex-shrink-0" aria-hidden="true" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
