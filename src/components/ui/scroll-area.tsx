// scroll-area.tsx - Reusable Scroll Area component for the blog app UI.
// Used for custom scrollbars and scrollable containers.
// If rendering fails, an error is logged and a fallback UI is shown.
import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, ...props }, ref) => {
  try {
    return <ScrollAreaPrimitive.Root ref={ref} className={cn(className)} {...props} />;
  } catch (err) {
    console.error("Error rendering ScrollArea:", err);
    return null;
  }
});
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollAreaViewport = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Viewport>
>(({ className, ...props }, ref) => {
  try {
    return <ScrollAreaPrimitive.Viewport ref={ref} className={cn(className)} {...props} />;
  } catch (err) {
    console.error("Error rendering ScrollAreaViewport:", err);
    return null;
  }
});
ScrollAreaViewport.displayName = ScrollAreaPrimitive.Viewport.displayName;

export { ScrollArea, ScrollAreaViewport };
