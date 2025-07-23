import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a user name with special handling for specific names
 * Returns "tk" if the name is "tenzin kunsang" (case-insensitive)
 * Otherwise returns the original name
 */
export function formatUserName(name: string | null | undefined): string | null | undefined {
  if (!name) return name;
  
  if (name.toLowerCase().trim() === "tenzin kunsang") {
    return "tk";
  }
  
  return name;
}
