'use client';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [me, setMe] = useState<unknown>(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(setMe)
      .catch(() => setMe(null));
  }, []);

  return (
    <main>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(me, null, 2)}</pre>
    </main>
  );
}
