import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center font-mono text-[10px] tracking-wider uppercase transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--color-fg)] select-none",
  {
    variants: {
      variant: {
        default:
          "border border-[var(--color-border-strong)] bg-[var(--color-fg)] text-[var(--color-bg)] px-2 py-0.5 font-medium",
        secondary:
          "border border-[var(--color-border)] text-[var(--color-muted)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-fg)] hover:border-[var(--color-border-strong)] px-2 py-0.5",
        destructive:
          "border border-red-500/30 text-red-500 bg-transparent px-2 py-0.5",
        outline:
          "border border-[var(--color-border)] text-[var(--color-fg)] px-2 py-0.5",
        glass:
          "border border-[var(--color-border)] text-[var(--color-subtle)] px-2 py-0.5",
      },
    },
    defaultVariants: {
      variant: "secondary",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
