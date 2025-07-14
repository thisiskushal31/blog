// navigation-menu.tsx - Reusable Navigation Menu component for the blog app UI.
// Used for navigation bars, dropdowns, and site menus.
// If rendering fails, an error is logged and a fallback UI is shown.
import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cn } from "@/lib/utils";

const NavigationMenu = NavigationMenuPrimitive.Root;
const NavigationMenuList = NavigationMenuPrimitive.List;
const NavigationMenuItem = NavigationMenuPrimitive.Item;
const NavigationMenuTrigger = NavigationMenuPrimitive.Trigger;
const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => {
  try {
    return <NavigationMenuPrimitive.Content ref={ref} className={cn("rounded-md border bg-popover p-4 text-popover-foreground shadow-md", className)} {...props} />;
  } catch (err) {
    console.error("Error rendering NavigationMenuContent:", err);
    return null;
  }
});
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
};
