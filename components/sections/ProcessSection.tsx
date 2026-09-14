"use client";

import { motion } from "framer-motion";
import { processSteps } from "@/lib/constants";
import { Card } from "@/components/ui/Card";

export function ProcessSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <section
      id="process"
      className="section bg-surface-50 dark:bg-surface-950 relative"
      aria-labelledby="process-heading"
    >
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-space-6xl">
          <p className="text-body text-brand-600 dark:text-brand-400 font-medium mb-4 animate-in">
            Quy trình làm việc
          </p>
          <h2 id="process-heading" className="text-display-md font-bold text-surface-950 dark:text-surface-50 mb-6 animate-in stagger-1 lg:whitespace-nowrap">
            Các bước từ <span className="gradient-text">trao đổi đến triển khai</span>
          </h2>
          <p className="text-body-lg text-surface-600 dark:text-surface-400 animate-in stagger-2">
            Quy trình minh bạch, đảm bảo chất lượng. Khách hàng nắm được tiến trình từng bước.
          </p>
        </div>

        <motion.div
          className="relative space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          role="list"
        >
          {processSteps.map((step, _index) => (
            <motion.article
              key={step.step}
              variants={itemVariants}
              role="listitem"
              className="relative"
            >
              <Card variant="hover" className="group">
                <div className="p-6 lg:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-heading-lg font-semibold text-surface-900 dark:text-surface-100 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-body text-surface-600 dark:text-surface-400 mb-4">
                        {step.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Kết quả bàn giao">
                        {step.deliverables.map((deliverable, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-body-sm font-medium bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 rounded-full border border-surface-200 dark:border-surface-700"
                          >
                            {deliverable}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-space-6xl text-center animate-in">
          <p className="text-body text-surface-600 dark:text-surface-400 mb-4">
            Muốn hiểu rõ hơn về cách chúng tôi làm việc?
          </p>
          <a href="#contact" className="link font-medium">
            Trao đổi trực tiếp để thảo luận
          </a>
        </div>
      </div>
    </section>
  );
}
