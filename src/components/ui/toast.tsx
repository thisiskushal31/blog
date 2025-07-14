// toast.tsx - Reusable Toast component and primitives for showing notifications in the blog app UI.
// Used for success, error, and info messages. Integrates with the use-toast hook.
// If rendering fails, an error is logged and a fallback UI is shown.
import * as React from "react"
import * as ToastPrimitive from "@radix-ui/react-toast"
import { cn } from "@/lib/utils"

const Toast = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, children, ...props }, ref) => {
  // Only wrap the rendering logic in try/catch for error boundaries
  try {
    return (
      <div ref={ref} className={cn("pointer-events-auto flex w-full max-w-sm items-center gap-4 rounded-lg bg-background p-4 shadow-lg ring-1 ring-black/10", className)} {...props}>
        {children}
      </div>
    )
  } catch (err) {
    // Log the error and show a fallback UI
    // eslint-disable-next-line no-console
    console.error("Error rendering Toast:", err)
    return null
  }
})
Toast.displayName = "Toast"

// ToastProvider - Provides context for toasts
const ToastProvider = ({ children, ...props }: React.ComponentProps<typeof ToastPrimitive.Provider>) => {
  try {
    return <ToastPrimitive.Provider {...props}>{children}</ToastPrimitive.Provider>;
  } catch (err) {
    console.error("Error rendering ToastProvider:", err);
    return <>{children}</>;
  }
};
ToastProvider.displayName = "ToastProvider";

// ToastTitle - Title for the toast
const ToastTitle = React.forwardRef<React.ElementRef<typeof ToastPrimitive.Title>, React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>>(
  ({ className, ...props }, ref) => {
    try {
      return <ToastPrimitive.Title ref={ref} className={cn("font-semibold", className)} {...props} />;
    } catch (err) {
      console.error("Error rendering ToastTitle:", err);
      return null;
    }
  }
);
ToastTitle.displayName = ToastPrimitive.Title.displayName;

// ToastDescription - Description for the toast
const ToastDescription = React.forwardRef<React.ElementRef<typeof ToastPrimitive.Description>, React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>>(
  ({ className, ...props }, ref) => {
    try {
      return <ToastPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />;
    } catch (err) {
      console.error("Error rendering ToastDescription:", err);
      return null;
    }
  }
);
ToastDescription.displayName = ToastPrimitive.Description.displayName;

// ToastClose - Close button for the toast
const ToastClose = React.forwardRef<React.ElementRef<typeof ToastPrimitive.Close>, React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>>(
  ({ className, ...props }, ref) => {
    try {
      return <ToastPrimitive.Close ref={ref} className={cn("absolute right-2 top-2 rounded-sm p-1 text-muted-foreground hover:bg-accent hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", className)} {...props} />;
    } catch (err) {
      console.error("Error rendering ToastClose:", err);
      return null;
    }
  }
);
ToastClose.displayName = ToastPrimitive.Close.displayName;

// ToastViewport - Container for all toasts
const ToastViewport = React.forwardRef<React.ElementRef<typeof ToastPrimitive.Viewport>, React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>>(
  ({ className, ...props }, ref) => {
    try {
      return <ToastPrimitive.Viewport ref={ref} className={cn("fixed bottom-0 right-0 flex flex-col p-4 gap-2 w-96 max-w-full z-50 outline-none", className)} {...props} />;
    } catch (err) {
      console.error("Error rendering ToastViewport:", err);
      return null;
    }
  }
);
ToastViewport.displayName = ToastPrimitive.Viewport.displayName;

export { Toast, ToastProvider, ToastTitle, ToastDescription, ToastClose, ToastViewport }
