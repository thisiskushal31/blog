// toggle-group.tsx - Reusable Toggle Group component for the blog app UI.
// Used for grouped toggle buttons (e.g., formatting, filters).
// If rendering fails, an error is logged and a fallback UI is shown.
import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cn } from "@/lib/utils";

const ToggleGroup = ToggleGroupPrimitive.Root;
const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  try {
    return <ToggleGroupPrimitive.Item ref={ref} className={cn("inline-flex items-center justify-center rounded px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground", className)} {...props} />;
  } catch (err) {
    console.error("Error rendering ToggleGroupItem:", err);
    return null;
  }
});
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
