import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full bg-transparent border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-subtle)] focus:outline-none focus:border-[var(--color-fg)] disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-150",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
