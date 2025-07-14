// sidebar.tsx - Reusable Sidebar component for the blog app UI.
// Used for navigation, filtering, and layout side panels.
// If rendering fails, an error is logged and a fallback UI is shown.
import * as React from "react";
import { cn } from "@/lib/utils";

const Sidebar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  try {
    return <div ref={ref} className={cn("w-64 bg-muted p-4 shadow-lg", className)} {...props} />;
  } catch (err) {
    console.error("Error rendering Sidebar:", err);
    return null;
  }
});
Sidebar.displayName = "Sidebar";

export { Sidebar };
