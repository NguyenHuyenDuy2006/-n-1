"use client";

import { motion } from "framer-motion";
import { approach } from "@/lib/constants";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  return (
    <section
      id="about"
      className="section bg-surface-50 dark:bg-surface-950"
      aria-labelledby="about-heading"
    >
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-space-4xl lg:gap-space-6xl items-start">
          <div>
            <p className="text-body text-brand-600 dark:text-brand-400 font-medium mb-4 animate-in">
              Về Synapse Codex
            </p>
            <h2 id="about-heading" className="text-display-md font-bold text-surface-950 dark:text-surface-50 mb-6 animate-in stagger-1">
              Cách tiếp cận <span className="gradient-text">của chúng tôi</span>
            </h2>
            <p className="text-body-lg text-surface-600 dark:text-surface-400 mb-8 animate-in stagger-2">
              Chúng tôi tập trung vào việc hiểu bài toán thực tế của doanh nghiệp và xây dựng giải pháp
              phù hợp — từ khâu trao đổi nhu cầu đến triển khai và phát triển tiếp theo.
            </p>

            <div className="flex flex-wrap gap-3 animate-in stagger-3">
              <span className="px-4 py-2 text-body-sm font-medium bg-brand-50 dark:bg-brand-950/30 text-brand-700 dark:text-brand-300 rounded-full border border-brand-200 dark:border-brand-800">
                Tập trung vào bài toán thực tế
              </span>
              <span className="px-4 py-2 text-body-sm font-medium bg-accent-50 dark:bg-accent-950/30 text-accent-700 dark:text-accent-300 rounded-full border border-accent-200 dark:border-accent-800">
                Linh hoạt theo nhu cầu
              </span>
              <span className="px-4 py-2 text-body-sm font-medium bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 rounded-full border border-surface-200 dark:border-surface-700">
                Chú trọng khả năng phát triển
              </span>
              <span className="px-4 py-2 text-body-sm font-medium bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 rounded-full border border-surface-200 dark:border-surface-700">
                Đồng hành trong quá trình phát triển
              </span>
            </div>

            <div className="mt-space-6xl pt-space-6xl border-t border-surface-200 dark:border-surface-800 text-center">
              <h3 className="text-heading-xl font-semibold text-surface-900 dark:text-surface-100 mb-4 animate-in">
                Sẵn sàng trao đổi bài toán của bạn?
              </h3>
              <p className="text-body-lg text-surface-600 dark:text-surface-400 mb-8 animate-in stagger-1">
                Chia sẻ nhu cầu với Synapse Codex để cùng thảo luận về hướng tiếp cận phù hợp.
              </p>
              <Button size="lg" asChild className="animate-in stagger-2">
                <a href="#contact">Liên hệ với chúng tôi</a>
              </Button>
            </div>
          </div>

          <div>
            <motion.div
              className="grid gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              role="list"
            >
              {approach.map((item, _index) => (
                <motion.article
                  key={item.title}
                  variants={itemVariants}
                  role="listitem"
                >
                  <Card variant="hover" className="group">
                    <div className="p-6 lg:p-8">
                      <h3 className="text-heading-md font-semibold text-surface-900 dark:text-surface-100 mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-body text-surface-600 dark:text-surface-400">
                        {item.description}
                      </p>
                    </div>
                  </Card>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
