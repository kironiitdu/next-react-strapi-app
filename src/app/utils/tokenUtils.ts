// src/utils/tokenUtils.ts

/**
 * Save a JWT token to localStorage
 * @param token - JWT token string
 */

export function saveToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
}

/**
 * Get the JWT token from localStorage
 * @returns the token string or null
 */
export function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
}

/**
 * Remove the JWT token from localStorage
 */
export function clearToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
}
