import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <h1>Auth Starter</h1>
      <p>
        <Link href="/login">Login</Link> | <Link href="/signup">Signup</Link> |{' '}
        <Link href="/dashboard">Dashboard</Link>
      </p>
    </main>
  );
}
