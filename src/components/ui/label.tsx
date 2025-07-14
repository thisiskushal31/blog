// label.tsx - Reusable Label component for form fields in the blog app UI.
// Used for accessibility and form labeling.
// If rendering fails, an error is logged and a fallback UI is shown.
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  try {
    return <LabelPrimitive.Root ref={ref} className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)} {...props} />;
  } catch (err) {
    console.error("Error rendering Label:", err);
    return null;
  }
});
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
