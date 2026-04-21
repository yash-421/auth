'use client';

import { useEffect, useState } from 'react';

interface User {
  id: number;
  email: string;
  full_name: string;
  is_active: boolean;
}

export default function DashboardPage() {
  const [me, setMe] = useState<User | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';


  useEffect(() => {
    // First, try to get user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setMe(JSON.parse(storedUser));
    }

    // Then fetch fresh data from API
    const token = localStorage.getItem('access_token');
    if (!token) return;

    fetch(`${API_URL}/api/v1/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        setMe(data);
        localStorage.setItem('user', JSON.stringify(data));
      })
      .catch(() => setMe(null));
  }, []);

  const profilePreview = me
    ? JSON.stringify(me, null, 2)
    : 'No profile loaded yet. Sign in to fetch your user details from the API.';

  return (
    <main className="dashboard-page">
      <section className="dashboard-card">
        <div className="section-heading">
          <span className="eyebrow">Private area</span>
          {me ? (
            <h1>Welcome to Dashboard, {me.full_name}!</h1>
          ) : (
            <h1>Dashboard</h1>
          )}
          <p className="section-copy">
            This screen keeps the same visual language as the auth flow and gives your API
            response room to breathe.
          </p>
        </div>
        <div className="dashboard-grid">
          <article className="info-card">
            <span className="feature-label">Session</span>
            <h2>Profile response</h2>
            <p>Your authenticated user payload appears below once a token is available.</p>
          </article>
          <article className="info-card">
            <span className="feature-label">Endpoint</span>
            <h2>`/api/v1/users/me`</h2>
            <p>The panel updates after the client requests your backend using the saved token.</p>
          </article>
        </div>
        <pre className="code-panel">{profilePreview}</pre>
      </section>
    </main>
  );
}
