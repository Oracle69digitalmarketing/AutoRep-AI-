import React from 'react';
import Link from 'next/link';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <nav style={{ padding: '10px', borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
          <Link href="/" style={{ marginRight: '20px' }}>Home</Link>
          <Link href="/funnel-builder" style={{ marginRight: '20px' }}>Funnel Builder</Link>
          <Link href="/chat">Chat</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}