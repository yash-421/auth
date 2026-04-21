export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'sans-serif' }}>{children}</body>
    </html>
  );
}
