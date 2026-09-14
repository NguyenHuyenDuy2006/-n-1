"use client";

import { useState } from "react";
import { Code, Users, RefreshCw, Brain, Mail, Megaphone, Check } from "lucide-react";
import { solutions } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function SolutionsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const _containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  const iconComponents = {
    code: Code,
    users: Users,
    "refresh-cw": RefreshCw,
    brain: Brain,
    mail: Mail,
    megaphone: Megaphone,
  };

  return (
    <section
      id="solutions"
      className="section bg-surface-50 dark:bg-surface-950"
      aria-labelledby="solutions-heading"
    >
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-space-6xl">
          <p className="text-body text-brand-600 dark:text-brand-400 font-medium mb-4 animate-in">
            Giải pháp của chúng tôi
          </p>
          <h2 id="solutions-heading" className="text-display-md font-bold text-surface-950 dark:text-surface-50 mb-6 animate-in stagger-1 text-balance">
            Các giải pháp số cho nhu cầu <span className="gradient-text">thực tế</span>
          </h2>
          <p className="text-body-lg text-surface-600 dark:text-surface-400 animate-in stagger-2">
            Mỗi giải pháp được thiết kế để giải quyết bài toán thực tế, không bán gói giải pháp có sẵn.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {solutions.map((solution, index) => {
            const Icon = iconComponents[solution.icon as keyof typeof iconComponents] || Code;
            const isActive = activeIndex === index;

            return (
              <motion.div
                key={solution.id}
                variants={itemVariants}
                className="group relative"
                onMouseEnter={() => setActiveIndex(index)}
              >
                <Card
                  variant="default"
                  className={cn(
                    "h-full relative overflow-hidden transition-all duration-slower hover:shadow-shadow-xl",
                    isActive ? "ring-2 ring-brand-500/30 shadow-shadow-xl shadow-glow" : "",
                  )}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
                  <div className="relative p-6 lg:p-8 h-full flex flex-col">
                    <div
                      className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-normal",
                        isActive
                          ? "bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-shadow-lg shadow-glow"
                          : "bg-surface-100 dark:bg-surface-800 text-brand-600 dark:text-brand-400 group-hover:bg-brand-500 group-hover:text-white",
                      )}
                    >
                      <Icon className="h-7 w-7" aria-hidden="true" />
                    </div>

                    <h3 className="text-heading-lg font-semibold text-surface-900 dark:text-surface-100 mb-3">
                      {solution.title}
                    </h3>
                    <p className="text-body text-surface-600 dark:text-surface-400 mb-6 flex-1">
                      {solution.description}
                    </p>

                    <ul className="space-y-3 mb-8" role="list">
                      {solution.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-body-sm text-surface-600 dark:text-surface-400 group-hover:text-surface-700 dark:group-hover:text-surface-300 transition-colors">
                          <Check className="h-5 w-5 flex-shrink-0 text-brand-500 mt-0.5" aria-hidden="true" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-space-5xl text-center animate-in stagger-3">
          <Button variant="outline" size="lg" asChild>
            <a href="#contact">Trao đổi giải pháp phù hợp</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
