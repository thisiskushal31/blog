// tooltip.tsx - Reusable Tooltip component for displaying contextual information on hover/focus.
// Used for providing extra info or hints in the blog app UI.
// If rendering fails, an error is logged and a fallback UI is shown.
import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cn } from "@/lib/utils"

export interface TooltipProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root> {
  content: React.ReactNode; // Tooltip content
  children: React.ReactNode; // Element to wrap with tooltip
}

const Tooltip = ({ content, children, ...props }: TooltipProps) => {
  // Only wrap the rendering logic in try/catch for error boundaries
  try {
    return (
      <TooltipPrimitive.Root {...props}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content className={cn("z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95", "data-[state=delayed-open]:data-[side=top]:slide-in-from-bottom-2", "data-[state=delayed-open]:data-[side=bottom]:slide-in-from-top-2", "data-[state=delayed-open]:data-[side=left]:slide-in-from-right-2", "data-[state=delayed-open]:data-[side=right]:slide-in-from-left-2")}>{content}</TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    )
  } catch (err) {
    // Log the error and show a fallback UI
    // eslint-disable-next-line no-console
    console.error("Error rendering Tooltip:", err)
    return <>{children}</>
  }
}

// TooltipProvider - Provides context for all tooltips in the app
const TooltipProvider = ({ children, ...props }: React.ComponentProps<typeof TooltipPrimitive.Provider>) => {
  try {
    return <TooltipPrimitive.Provider {...props}>{children}</TooltipPrimitive.Provider>;
  } catch (err) {
    console.error("Error rendering TooltipProvider:", err);
    return <>{children}</>;
  }
};
TooltipProvider.displayName = "TooltipProvider";

export { Tooltip, TooltipProvider };
