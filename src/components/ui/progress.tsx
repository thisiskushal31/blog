// progress.tsx - Reusable Progress component for showing progress bars in the blog app UI.
// Used for loading indicators, upload progress, and completion status.
// If rendering fails, an error is logged and a fallback UI is shown.
import * as React from "react"
import { cn } from "@/lib/utils"

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number; // Progress value (0-100)
  max?: number; // Maximum value (default: 100)
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(({ value = 0, max = 100, className, ...props }, ref) => {
  // Only wrap the rendering logic in try/catch for error boundaries
  try {
    return (
      <div ref={ref} className={cn("relative h-2 w-full overflow-hidden rounded-full bg-muted", className)} {...props}>
        <div
          className="h-full bg-primary transition-all"
          style={{ width: `${Math.min(Math.max(value, 0), max) / max * 100}%` }}
        />
      </div>
    )
  } catch (err) {
    // Log the error and show a fallback UI
    // eslint-disable-next-line no-console
    console.error("Error rendering Progress:", err)
    return null
  }
})
Progress.displayName = "Progress"

export { Progress }
