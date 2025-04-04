import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sciFiCardVariants = cva(
  "bg-[var(--cyber-blue)]/75 backdrop-filter backdrop-blur-md border border-[var(--cyber-cyan)]/30 shadow-[0_0_10px_rgba(10,255,255,0.3)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(10,255,255,0.5),0_0_30px_rgba(10,255,255,0.3)] hover:-translate-y-1",
  {
    variants: {
      variant: {
        default: "",
        purple: "border-[var(--cyber-purple)]/30 shadow-[0_0_10px_rgba(124,58,237,0.3)] hover:shadow-[0_0_15px_rgba(124,58,237,0.5),0_0_30px_rgba(124,58,237,0.3)]",
        orange: "border-[var(--cyber-orange)]/30 shadow-[0_0_10px_rgba(249,115,22,0.3)] hover:shadow-[0_0_15px_rgba(249,115,22,0.5),0_0_30px_rgba(249,115,22,0.3)]",
        green: "border-[var(--cyber-green)]/30 shadow-[0_0_10px_rgba(16,185,129,0.3)] hover:shadow-[0_0_15px_rgba(16,185,129,0.5),0_0_30px_rgba(16,185,129,0.3)]",
      },
      radius: {
        default: "rounded-lg",
        full: "rounded-full",
        none: "rounded-none",
      },
      padding: {
        default: "p-6",
        none: "p-0",
        sm: "p-3",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      radius: "default",
      padding: "default",
    },
  }
);

export interface SciFiCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sciFiCardVariants> {}

const SciFiCard = React.forwardRef<HTMLDivElement, SciFiCardProps>(
  ({ className, variant, radius, padding, ...props }, ref) => {
    return (
      <div
        className={cn(sciFiCardVariants({ variant, radius, padding, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
SciFiCard.displayName = "SciFiCard";

export { SciFiCard, sciFiCardVariants };
