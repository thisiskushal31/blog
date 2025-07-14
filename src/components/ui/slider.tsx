// slider.tsx - Reusable Slider component for selecting numeric values in the blog app UI.
// Used for forms, filters, and settings.
// If rendering fails, an error is logged and a fallback UI is shown.
import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"

export interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  value?: number[]; // Current slider value(s)
  onValueChange?: (value: number[]) => void; // Change handler
  children?: React.ReactNode;
}

const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(({ value, onValueChange, className, children, ...props }, ref) => {
  // Only wrap the rendering logic in try/catch for error boundaries
  try {
    return (
  <SliderPrimitive.Root
    ref={ref}
        value={value}
        onValueChange={onValueChange}
        className={cn("relative flex w-full touch-none select-none items-center", className)}
    {...props}
  >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-muted">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
        {children}
  </SliderPrimitive.Root>
    )
  } catch (err) {
    // Log the error and show a fallback UI
    // eslint-disable-next-line no-console
    console.error("Error rendering Slider:", err)
    return null
  }
})
Slider.displayName = "Slider"

export { Slider }
