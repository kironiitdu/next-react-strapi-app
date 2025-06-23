/**
 * Removing login user from localStorage
 */
export function removeUser(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
  }
}
