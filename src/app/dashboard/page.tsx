'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardPage from '@/components/DashboardPage';
import { getToken } from "../utils/tokenUtils";

export default function Dashboard() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null); // null = loading

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace('/login');
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  // Render nothing on server and during loading on client to avoid hydration mismatch
  if (isAuthorized === null) return null;

  return <DashboardPage />;
}
