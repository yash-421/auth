'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Popup from '../../../components/Popup';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; fullName?: string; password?: string }>({});
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState<'success' | 'error'>('success');
  const [popupTitle, setPopupTitle] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  function validate() {
    const newErrors: typeof errors = {};

    // Full name validation
    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (fullName.length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }



  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validate()) return;

    console.log(API_URL, { email, fullName, password });
    

    try {
      const res = await fetch(`${API_URL}/api/v1/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, full_name: fullName, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('Backend error:', data);
        setPopupType('error');
        setPopupTitle('Signup Failed');
        setPopupMessage(data.detail || data.message || 'Signup failed. Please try again.');
        setPopupOpen(true);
        return;
      }

      setPopupType('success');
      setPopupTitle('Account Created');
      setPopupMessage(data.message || 'Your account has been created successfully!');
      setPopupOpen(true);
      
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      setTimeout(() => {
        router.push('/login');
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
          <span className="eyebrow">Get started</span>
          <h1>Signup</h1>
          <p className="section-copy">
            Create your account to test the full authentication flow.
          </p>
        </div>

        <form onSubmit={onSubmit} className="auth-form">
          {/* Full Name */}
          <label className="field">
            <span>Full name</span>
            <input
              className="text-input"
              placeholder="Jane Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            {errors.fullName && <p className="error">{errors.fullName}</p>}
          </label>

          {/* Email */}
          <label className="field">
            <span>Email</span>
            <input
              className="text-input"
              placeholder="you@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </label>

          {/* Password */}
          <label className="field">
            <span>Password</span>
            <input
              className="text-input"
              placeholder="Minimum 8 characters"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </label>

          <button type="submit" className="primary-button primary-button--full">
            Create account
          </button>
        </form>

        <p className="footnote">
          Already registered?{' '}
          <Link href="/login" className="inline-link">
            Login instead
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