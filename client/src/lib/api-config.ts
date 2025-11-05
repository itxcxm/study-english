/**
 * API Configuration Utility
 * Handles API base URL for both development and production environments
 */

/**
 * Get the API base URL
 * In production, this should be set via NEXT_PUBLIC_API_URL environment variable
 * Falls back to localhost for development
 */
export function getApiBaseUrl(): string {
  // In production, NEXT_PUBLIC_API_URL should be set to your production API URL
  // Example: https://api.yourdomain.com/api
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  // Development fallback
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:4000/api";
  }

  // Production fallback - should not reach here if env var is set correctly
  // This is a safety net that will cause errors if not configured properly
  console.error(
    "⚠️ NEXT_PUBLIC_API_URL is not set! Please configure it in your environment variables."
  );
  return "";
}

/**
 * Check if we're in production environment
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

