import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "hover" | "glass";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      default:
        "rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 overflow-hidden transition-colors duration-normal hover:border-brand-300 dark:hover:border-brand-700",
      hover:
        "rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 overflow-hidden transition-colors duration-normal hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-shadow-lg",
      glass:
        "rounded-2xl bg-white/5 dark:bg-surface-900/5 backdrop-blur-xl border border-white/10 dark:border-surface-800/50 overflow-hidden",
    };

    return (
      <div ref={ref} className={cn(variants[variant], className)} {...props}>
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("px-6 py-4 border-b border-surface-200 dark:border-surface-800", className)} {...props} />
  ),
);

CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-heading-md font-semibold text-surface-900 dark:text-surface-100", className)} {...props} />
  ),
);

CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("mt-1 text-body text-surface-600 dark:text-surface-400", className)} {...props} />
  ),
);

CardDescription.displayName = "CardDescription";

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("px-6 py-4", className)} {...props} />
  ),
);

CardContent.displayName = "CardContent";

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-6 py-4 border-t border-surface-200 dark:border-surface-800 bg-surface-50/50 dark:bg-surface-900/50", className)}
      {...props}
    />
  ),
);

CardFooter.displayName = "CardFooter";
