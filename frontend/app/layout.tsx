import Link from 'next/link';

import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <header className="topbar">
            <Link href="/" className="brand">
              AuthNest
            </Link>
            <nav className="topnav" aria-label="Primary">
              <Link href="/login" className="nav-link">
                Login
              </Link>
              <Link href="/signup" className="nav-link">
                Signup
              </Link>

            </nav>
          </header>
          <div className="page-frame">{children}</div>
        </div>
      </body>
    </html>
  );
}
