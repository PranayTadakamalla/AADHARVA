import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cyberButtonVariants = cva(
  "relative overflow-hidden transition-all duration-300 inline-flex items-center justify-center font-rajdhani tracking-wide",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--cyber-cyan)]/10 text-[var(--cyber-cyan)] border border-[var(--cyber-cyan)]/30 hover:bg-[var(--cyber-cyan)]/20",
        outline:
          "bg-transparent border border-[var(--cyber-cyan)]/50 text-[var(--cyber-cyan)]/80 hover:text-[var(--cyber-cyan)] hover:bg-[var(--cyber-cyan)]/10 transition-colors",
        secondary:
          "bg-transparent border border-gray-500 hover:border-[var(--cyber-cyan)]/30 text-gray-300 hover:text-[var(--cyber-cyan)] transition-colors",
        purple:
          "bg-[var(--cyber-purple)]/10 text-[var(--cyber-purple)] border border-[var(--cyber-purple)]/30 hover:bg-[var(--cyber-purple)]/20",
        orange:
          "bg-[var(--cyber-orange)]/10 text-[var(--cyber-orange)] border border-[var(--cyber-orange)]/30 hover:bg-[var(--cyber-orange)]/20",
        green:
          "bg-[var(--cyber-green)]/10 text-[var(--cyber-green)] border border-[var(--cyber-green)]/30 hover:bg-[var(--cyber-green)]/20",
        solid:
          "bg-[var(--cyber-cyan)] text-[var(--cyber-dark)] border border-[var(--cyber-cyan)]/70",
      },
      size: {
        default: "px-6 py-3 text-base",
        sm: "px-4 py-2 text-sm",
        lg: "px-8 py-4 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface CyberButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof cyberButtonVariants> {
  asChild?: boolean;
}

const CyberButton = React.forwardRef<HTMLButtonElement, CyberButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(cyberButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {props.children}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-500 ease-in-out" />
      </button>
    );
  }
);
CyberButton.displayName = "CyberButton";

export { CyberButton, cyberButtonVariants };
