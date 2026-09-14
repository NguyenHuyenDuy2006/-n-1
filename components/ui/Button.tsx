"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, asChild, children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-normal ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-50 dark:focus-visible:ring-offset-surface-950 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary: "bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 shadow-shadow-md hover:shadow-shadow-lg hover:shadow-glow",
      secondary:
        "bg-surface-100 text-surface-900 hover:bg-surface-200 dark:bg-surface-800 dark:text-surface-50 dark:hover:bg-surface-700 border border-surface-200 dark:border-surface-700",
      ghost: "bg-transparent text-surface-600 hover:bg-surface-100 dark:text-surface-400 dark:hover:bg-surface-800",
      outline:
        "border-2 border-brand-600 text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950 dark:text-brand-400 dark:border-brand-400",
    };

    const sizes = {
      sm: "px-4 py-2 text-body-sm",
      md: "px-6 py-3 text-body",
      lg: "px-8 py-4 text-body-lg",
    };

    const Comp = asChild ? "span" : "button";

    const buttonProps = asChild
      ? { ...props, role: "button", tabIndex: 0 }
      : { ...props, type: props.type || "button" };

    return (
      <Comp
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...buttonProps}
      >
        {isLoading && (
          <svg
            className="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </Comp>
    );
  },
);

Button.displayName = "Button";
