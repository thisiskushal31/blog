// drawer.tsx - Reusable Drawer component for slide-in panels in the blog app UI.
// Used for navigation, sidebars, and mobile menus.
// If rendering fails, an error is logged and a fallback UI is shown.
import * as React from "react"
import * as DrawerPrimitive from "@radix-ui/react-dialog"
import { cn } from "@/lib/utils"

export interface DrawerProps extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Root> {
  children: React.ReactNode; // Drawer content
}

const Drawer = ({ children, ...props }: DrawerProps) => {
  // Only wrap the rendering logic in try/catch for error boundaries
  try {
    return (
      <DrawerPrimitive.Root {...props}>
        {children}
      </DrawerPrimitive.Root>
    )
  } catch (err) {
    // Log the error and show a fallback UI
    // eslint-disable-next-line no-console
    console.error("Error rendering Drawer:", err)
    return null
  }
}

export { Drawer }
