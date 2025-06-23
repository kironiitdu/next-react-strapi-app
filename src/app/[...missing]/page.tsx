import { notFound } from 'next/navigation';

export default function CatchAllNotFound() {
  notFound(); // Triggers your custom not-found.tsx
}
