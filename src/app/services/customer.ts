// lib/customerService.ts
import api from "@/app/lib/api";
import { Customer } from "@/app/types/customer";

/*
  This function `getCustomers` performs an asynchronous HTTP GET request
  to fetch a list of customers from the API endpoint "/customers", sorted
  by creation date in descending order.

  Details:
  - Uses a pre-configured `api` axios instance to send the GET request.
  - The API response is expected to have the structure:
    {
      data: [
        {
          id: number,
          documentId: string,
          name: string,
          email: string,
          phone: string,
          createdAt: string,
          ...
        },
        ...
      ],
      meta: {...}
    }
  - The function maps over the array in `res.data.data` and extracts
    specific fields to shape each customer object according to the
    `Customer` TypeScript interface.

  - It returns a Promise resolving to an array of Customer objects,
    which can then be consumed by React components or other services.

  Summary:
  This service abstracts the API call and data transformation,
  providing clean customer data for the app.

  Note on Security:
  - The `id` field is a numeric or raw database identifier.
  - When using this ID in URLs (e.g., for detail or edit pages),
    exposing raw IDs can risk malicious URL manipulation or enumeration attacks.
  - To mitigate this, I will encrypting or encoding the ID before
    placing it in the URL (e.g., using JWT, base64, or other reversible encryption).
  - On the server side or API, you must decode/decrypt it back to the
    original ID to fetch the correct data.

  This adds an extra layer of obscurity and security against direct
  ID tampering in URLs.
*/

export async function getCustomers(): Promise<Customer[]> {
  const res = await api.get("/customers?sort=createdAt:desc");

  // I am mapping the API response data array to the Customer interface shape
  return res.data.data.map((item: any) => ({
    id: item.id,
    documentId: item.documentId,
    name: item.name,
    email: item.email,
    phone: item.phone,
    createdAt: item.createdAt,
  }));
}
