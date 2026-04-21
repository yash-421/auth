'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Popup from '../../../components/Popup';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState<'success' | 'error'>('success');
  const [popupTitle, setPopupTitle] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setPopupType('error');
        setPopupTitle('Login Failed');
        setPopupMessage(data.detail || data.message || 'Invalid credentials. Please try again.');
        setPopupOpen(true);
        return;
      }

      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      setPopupType('success');
      setPopupTitle('Login Successful');
      setPopupMessage(data.message || 'Welcome back! Redirecting to dashboard...');
      setPopupOpen(true);

      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (err) {
      console.log('Network error:', err);
      setPopupType('error');
      setPopupTitle('Connection Error');
      setPopupMessage('Cannot connect to server. Please try again later.');
      setPopupOpen(true);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="section-heading">
          <span className="eyebrow">Welcome back</span>
          <h1>Login</h1>
          <p className="section-copy">
            Sign in to continue into your account and load the protected dashboard.
          </p>
        </div>
        <form onSubmit={onSubmit} className="auth-form">
          <label className="field">
            <span>Email</span>
            <input
              className="text-input"
              placeholder="you@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="field">
            <span>Password</span>
            <input
              className="text-input"
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="primary-button primary-button--full">
            Login
          </button>
        </form>
        <p className="footnote">
          New here?{' '}
          <Link href="/signup" className="inline-link">
            Create an account
          </Link>
          .
        </p>
      </section>

      <Popup
        isOpen={popupOpen}
        type={popupType}
        title={popupTitle}
        message={popupMessage}
        onClose={() => setPopupOpen(false)}
      />
    </main>
  );
}
