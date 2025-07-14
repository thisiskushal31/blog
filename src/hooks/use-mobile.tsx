// use-mobile.tsx - Hook to detect if the user is on a mobile device based on window width.
// Used for responsive UI logic throughout the app.
// If detection fails, an error is logged and a fallback is used.
import * as React from "react"

const MOBILE_BREAKPOINT = 768

/**
 * useIsMobile - Hook to determine if the current device is mobile.
 * @returns true if mobile, false otherwise (fallback: false on error)
 */
export function useIsMobile() {
  try {
    const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

    React.useEffect(() => {
      const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
      const onChange = () => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      }
      mql.addEventListener("change", onChange)
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      return () => mql.removeEventListener("change", onChange)
    }, [])

    return !!isMobile
  } catch (err) {
    // Log the error and return false as fallback
    // eslint-disable-next-line no-console
    console.error('Error in useIsMobile hook:', err);
    return false;
  }
}
