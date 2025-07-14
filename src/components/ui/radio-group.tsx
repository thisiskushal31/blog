// radio-group.tsx - Reusable Radio Group component for the blog app UI.
// Used for selecting one option from a set in forms and settings.
// If rendering fails, an error is logged and a fallback UI is shown.
import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

const RadioGroup = RadioGroupPrimitive.Root;
const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  try {
    return (
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn("h-4 w-4 rounded-full border border-input bg-background text-primary shadow focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className)}
        {...props}
      />
    );
  } catch (err) {
    console.error("Error rendering RadioGroupItem:", err);
    return null;
  }
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
