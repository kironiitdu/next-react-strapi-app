import { Route } from "@/app/types/route";

export async function getRoutes(): Promise<Route[]> {
  //Later on fucntion will be parameterized
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/routes`);

  if (!res.ok) {
    throw new Error("Failed to fetch routes");
  }

  const data = await res.json();
  const allRoutes: Route[] = data.data;

  // Filtering routes that have a numeric price (not null or 'N/A')
  const pricedRoutes = allRoutes.filter((route) => route.price !== null);

  return pricedRoutes;
}

// export async function getRoutes(): Promise<Route[]> {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/routes`, {
//     // headers: {
//     //   Authorization: `Bearer ${localStorage.getItem("token")}`,
//     // },
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch routes");
//   }

//   const data = await res.json();
//   return data.data;
// }
