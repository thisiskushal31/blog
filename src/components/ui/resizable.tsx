// resizable.tsx - Reusable Resizable panel component for the blog app UI.
// Used for layouts with adjustable panels (sidebars, editors, etc).
// If rendering fails, an error is logged and a fallback UI is shown.
import * as React from "react";
import * as ResizablePrimitive from "@radix-ui/react-resizable-panels";
import { cn } from "@/lib/utils";

const ResizablePanelGroup = ({ className, ...props }: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => {
  try {
    return <ResizablePrimitive.PanelGroup className={cn(className)} {...props} />;
  } catch (err) {
    console.error("Error rendering ResizablePanelGroup:", err);
    return null;
  }
};

const ResizablePanel = React.forwardRef<
  React.ElementRef<typeof ResizablePrimitive.Panel>,
  React.ComponentPropsWithoutRef<typeof ResizablePrimitive.Panel>
>(({ className, ...props }, ref) => {
  try {
    return <ResizablePrimitive.Panel ref={ref} className={cn(className)} {...props} />;
  } catch (err) {
    console.error("Error rendering ResizablePanel:", err);
    return null;
  }
});
ResizablePanel.displayName = ResizablePrimitive.Panel.displayName;

const ResizableHandle = ({ className, ...props }: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle>) => {
  try {
    return <ResizablePrimitive.PanelResizeHandle className={cn(className)} {...props} />;
  } catch (err) {
    console.error("Error rendering ResizableHandle:", err);
    return null;
  }
};

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
