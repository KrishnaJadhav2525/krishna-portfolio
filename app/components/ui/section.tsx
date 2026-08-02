import * as React from "react"
import { cn } from "@/lib/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
  variant?: "narrow" | "wide" | "full"
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, as: Component = "section", variant = "wide", ...props }, ref) => {
    const maxWidthClass =
      variant === "narrow"
        ? "max-w-[720px]"
        : variant === "full"
        ? "max-w-[1400px]"
        : "max-w-[1200px]";

    return (
      <Component
        ref={ref}
        className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", maxWidthClass, className)}
        {...props}
      />
    )
  }
)
Container.displayName = "Container"

export { Container }
