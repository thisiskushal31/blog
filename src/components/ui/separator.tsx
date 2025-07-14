// separator.tsx - Reusable Separator component for dividing content sections.
// Used for visual separation of UI blocks in the blog app.
// If rendering fails, an error is logged and a fallback UI is shown.
import * as React from "react"
import { cn } from "@/lib/utils"

export interface SeparatorProps extends React.HTMLAttributes<HTMLHRElement> {}

const Separator = React.forwardRef<HTMLHRElement, SeparatorProps>(({ className, ...props }, ref) => {
  // Only wrap the rendering logic in try/catch for error boundaries
  try {
    return (
      <hr ref={ref} className={cn("border-t border-muted-foreground/20 my-4", className)} {...props} />
    );
  } catch (err) {
    // Log the error and show a fallback UI
    // eslint-disable-next-line no-console
    console.error("Error rendering Separator:", err);
    return null;
  }
});
Separator.displayName = "Separator";

export { Separator };
