// app/layout.js
import Link from "next/link";
import "./globals.css";

export const metadata = { title: "Mini Carbon" };

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{ fontFamily: "system-ui", margin: 0 }}>
        <nav style={{
          display: "flex",
          gap: 12,
          padding: 12,
          borderBottom: "1px solid #eee",
          position: "sticky",
          top: 0,
          background: "green"
        }}>
          <Link href="/">Accueil</Link>
          <Link href="/about">À propos</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
