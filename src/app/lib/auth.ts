/**
 * Will call API reference here
 * Call the auth API endpoint and pass the value
 *
 *
 *
 *
 */
import api from "./api";

export async function loginUser(identifier: string, password: string) {
  console.log("From auth.ts" + identifier);
  const response = await api.post("/auth/local", {
    identifier,
    password,
  });

  return response.data; // contains jwt + user
}
