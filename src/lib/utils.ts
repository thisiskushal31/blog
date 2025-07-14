// utils.ts - Utility functions for the blog app.
// Provides class name merging (cn) for Tailwind and conditional classes.
// If the utility fails, an error is logged and a fallback is returned.
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * cn - Merge class names conditionally and with Tailwind support.
 * @param inputs - Any number of class values (strings, arrays, objects)
 * @returns A single merged className string, or an empty string on error.
 */
export function cn(...inputs: ClassValue[]) {
  try {
    return twMerge(clsx(inputs))
  } catch (err) {
    // Log the error and return an empty string as fallback
    // eslint-disable-next-line no-console
    console.error("Error in cn utility:", err);
    return "";
  }
}
