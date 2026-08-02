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
        ? "max-w-[800px]"
        : variant === "full"
        ? "w-full"
        : "max-w-[1400px]";

    return (
      <Component
        ref={ref}
        className={cn("mx-auto w-full px-6 sm:px-8 lg:px-12", maxWidthClass, className)}
        {...props}
      />
    )
  }
)
Container.displayName = "Container"

export { Container }
