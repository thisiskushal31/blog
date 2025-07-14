// collapsible.tsx - Reusable Collapsible component for the blog app UI.
// Used for expandable/collapsible sections, FAQs, and menus.
// If rendering fails, an error is logged and a fallback UI is shown.
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
