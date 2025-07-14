// toggle.tsx - Reusable Toggle component for the blog app UI.
// Used for on/off switches, formatting, and feature toggles.
// If rendering fails, an error is logged and a fallback UI is shown.
import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cn } from "@/lib/utils";

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>
>(({ className, ...props }, ref) => {
  try {
    return <TogglePrimitive.Root ref={ref} className={cn("inline-flex items-center justify-center rounded px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground", className)} {...props} />;
  } catch (err) {
    console.error("Error rendering Toggle:", err);
    return null;
  }
});
Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle };
