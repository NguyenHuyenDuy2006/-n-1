"use client";

import { motion } from "framer-motion";
import { Database, Globe, Smartphone, Workflow, GitBranch, Layers } from "lucide-react";
import { problemsWeSolve } from "@/lib/constants";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const problemIcons = {
  database: Database,
  globe: Globe,
  smartphone: Smartphone,
  workflow: Workflow,
  "git-branch": GitBranch,
  layers: Layers,
};

export function ProblemsSection() {
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
      id="problems"
      className="section bg-white dark:bg-surface-900"
      aria-labelledby="problems-heading"
    >
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-space-4xl">
          <div className="max-w-2xl">
            <p className="text-body text-brand-600 dark:text-brand-400 font-medium mb-4 animate-in">
              Bài toán chúng tôi hỗ trợ
            </p>
            <h2 id="problems-heading" className="text-display-md font-bold text-surface-950 dark:text-surface-50 mb-6 animate-in stagger-1">
              Các nhóm bài toán phổ biến <span className="gradient-text">có thể giải quyết</span>
            </h2>
            <p className="text-body-lg text-surface-600 dark:text-surface-400 animate-in stagger-2">
              Synapse Codex hỗ trợ doanh nghiệp giải quyết các bài toán công nghệ phổ biến dưới đây.
              Nếu bài toán của bạn không nằm trong danh sách, hãy liên hệ để chúng tôi cùng thảo luận.
            </p>
          </div>
        </div>

        <motion.div
          className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          role="list"
        >
          {problemsWeSolve.map((problem, _index) => {
            const Icon = problemIcons[problem.icon as keyof typeof problemIcons] || Database;

            return (
              <motion.article
                key={problem.id}
                variants={itemVariants}
                role="listitem"
              >
                <Card variant="hover" className="h-full flex flex-col">
                  <div className="p-6 lg:p-8 h-full flex flex-col">
                    <div className="w-12 h-12 rounded-xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center mb-6">
                      <Icon className="h-6 w-6 text-brand-600 dark:text-brand-400" aria-hidden="true" />
                    </div>

                    <h3 className="text-heading-md font-semibold text-surface-900 dark:text-surface-100 mb-3">
                      {problem.title}
                    </h3>
                    <p className="text-body text-surface-600 dark:text-surface-400 mb-6 flex-1">
                      {problem.description}
                    </p>

                  </div>
                </Card>
              </motion.article>
            );
          })}
        </motion.div>

        <div className="mt-space-4xl text-center animate-in">
          <p className="text-body text-surface-600 dark:text-surface-400 mb-4">
            Bài toán của bạn chưa có trong danh sách? Hãy cho chúng tôi biết để cùng thảo luận.
          </p>
          <Button size="lg" asChild>
            <a href="#contact">Trao đổi bài toán của bạn</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
