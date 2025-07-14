// skeleton.tsx - Reusable Skeleton component for loading placeholders in the blog app UI.
// Used to indicate loading state for content blocks, cards, etc.
// If rendering fails, an error is logged and a fallback UI is shown.
import * as React from "react"
import { cn } from "@/lib/utils"

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

const Skeleton = ({ className, ...props }: SkeletonProps) => {
  // Only wrap the rendering logic in try/catch for error boundaries
  try {
    return (
      <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />
    )
  } catch (err) {
    // Log the error and show a fallback UI
    // eslint-disable-next-line no-console
    console.error("Error rendering Skeleton:", err)
    return null
  }
}

export { Skeleton }
