/**
 * The types folder will represent all the strongly type model as interface
 * This types will be added as referece from the componets
 * Route type defined as Strapi API response
 *
 *
 *
 */

export interface Route {
  id: number;
  documentId: string;
  name: string;
  duration_mins: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  price: number | null;
}
