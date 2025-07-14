// alert.tsx - Reusable Alert component for the blog app UI.
// Used to display important messages, warnings, or errors to the user.
// If rendering fails, an error is logged and a fallback UI is shown.
import * as React from "react"
import { cn } from "@/lib/utils"

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(({ className, ...props }, ref) => {
  // Only wrap the rendering logic in try/catch for error boundaries
  try {
    return (
      <div ref={ref} role="alert" className={cn("relative w-full rounded-lg border border-destructive bg-destructive/10 px-4 py-3 text-destructive", className)} {...props} />
    )
  } catch (err) {
    // Log the error and show a fallback UI
    // eslint-disable-next-line no-console
    console.error("Error rendering Alert:", err)
    return null
  }
})
Alert.displayName = "Alert"

export { Alert }
