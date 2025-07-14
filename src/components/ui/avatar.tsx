// avatar.tsx - Reusable Avatar component for displaying user profile images or initials.
// Used for author avatars and user profile pictures in the blog app.
// If rendering fails, an error is logged and a fallback UI is shown.
import * as React from "react"
import { cn } from "@/lib/utils"

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string; // Image source URL
  alt?: string; // Alt text for the image
  fallback?: React.ReactNode; // Fallback content if image fails
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(({ src, alt, fallback, className, ...props }, ref) => {
  // Only wrap the rendering logic in try/catch for error boundaries
  try {
    return (
      <div ref={ref} className={cn("inline-flex items-center justify-center rounded-full bg-muted overflow-hidden", className)} {...props}>
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        ) : fallback ? (
          fallback
        ) : (
          <span className="text-muted-foreground">?</span>
        )}
      </div>
    );
  } catch (err) {
    // Log the error and show a fallback UI
    // eslint-disable-next-line no-console
    console.error("Error rendering Avatar:", err);
    return <div className={cn("inline-flex items-center justify-center rounded-full bg-muted overflow-hidden", className)}><span className="text-muted-foreground">?</span></div>;
  }
});
Avatar.displayName = "Avatar";

export { Avatar };
