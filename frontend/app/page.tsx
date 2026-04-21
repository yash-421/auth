import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="hero-page">
      <section className="hero-card">
        <span className="eyebrow">Authentication starter</span>
        <h1>Ship your auth flow with a frontend that feels finished.</h1>
        <p className="hero-copy">
          Clean entry points, focused forms, and a dashboard that no longer looks like placeholder
          UI. The flow stays lightweight, but the presentation now feels intentional.
        </p>
        <div className="hero-actions">
          <Link href="/signup" className="primary-button">
            Create account
          </Link>
          <Link href="/login" className="secondary-button">
            Sign in
          </Link>
        </div>
        <div className="feature-grid">
          <article className="feature-card">
            <span className="feature-label">Fast start</span>
            <h2>Auth pages with a shared visual system.</h2>
            <p>Login, signup, and dashboard now follow the same layout, spacing, and colors.</p>
          </article>
          <article className="feature-card">
            <span className="feature-label">Readable UI</span>
            <h2>Better contrast, cards, and form controls.</h2>
            <p>Inputs, buttons, and panels are styled to feel like part of the same product.</p>
          </article>
          <article className="feature-card">
            <span className="feature-label">Ready next</span>
            <h2>Simple structure for future components.</h2>
            <p>
              The new class-based markup makes it much easier to extend the frontend without
              fighting inline styles.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
