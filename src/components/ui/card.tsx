// card.tsx - Reusable Card component for the blog app UI.
// Used for displaying blog post previews and other content blocks.
// If rendering fails, an error is logged and a fallback UI is shown.
import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    // Only wrap the rendering logic in try/catch for error boundaries
    try {
      return (
        <div ref={ref} className={cn("rounded-xl border bg-card text-card-foreground shadow", className)} {...props} />
      )
    } catch (err) {
      // Log the error and show a fallback UI
      // eslint-disable-next-line no-console
      console.error("Error rendering Card:", err)
      return null
    }
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    try {
      return (
        <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
      )
    } catch (err) {
      console.error("Error rendering CardHeader:", err)
      return null
    }
  }
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    try {
      return (
        <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
      )
    } catch (err) {
      console.error("Error rendering CardContent:", err)
      return null
    }
  }
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
