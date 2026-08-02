import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:outline-[1.5px] focus-visible:outline-[var(--color-fg)] focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-fg)] text-[var(--color-bg)] hover:opacity-90 active:scale-[0.98]",
        destructive: "bg-red-600 text-white hover:bg-red-700 active:scale-[0.98]",
        outline: "border border-[var(--color-border-strong)] text-[var(--color-fg)] bg-transparent hover:bg-[var(--color-surface-hover)] active:scale-[0.98]",
        secondary: "border border-[var(--color-border)] text-[var(--color-fg)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] active:scale-[0.98]",
        ghost: "text-[var(--color-muted)] hover:text-[var(--color-fg)] underline underline-offset-4 decoration-[var(--color-border-strong)] bg-transparent",
        link: "text-[var(--color-fg)] underline underline-offset-4 hover:opacity-80 bg-transparent",
        premium: "bg-[var(--color-fg)] text-[var(--color-bg)] hover:opacity-90 active:scale-[0.98]",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-6 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
