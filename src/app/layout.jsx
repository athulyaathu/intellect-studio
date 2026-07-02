import { Inter, JetBrains_Mono } from 'next/font/google';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import '../index.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'Intellect Studio',
    template: '%s — Intellect Studio',
  },
  description:
    'Intellect Studio — Creative design & development studio crafting high-performance digital experiences.',
  keywords: ['design studio', 'web development', 'digital experiences', 'creative agency'],
  authors: [{ name: 'Intellect Studio' }],
  creator: 'Intellect Studio',
  metadataBase: new URL('https://intellectstudio.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://intellectstudio.com',
    siteName: 'Intellect Studio',
    title: 'Intellect Studio',
    description: 'Creative design & development studio crafting high-performance digital experiences.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Intellect Studio',
    description: 'Creative design & development studio crafting high-performance digital experiences.',
    creator: '@intellectstudio',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FDFBF7',
};

/**
 * RootLayout
 * ----------
 * Single source of truth for Navbar and Footer across all three routes:
 *   /         → homepage (VRPortal + sections)
 *   /portfolio → full-screen draggable portfolio
 *   /teams     → team roster
 *
 * Navbar is scroll-aware (hides until past the VRPortal runway on the
 * homepage; visible immediately on inner pages). Footer is always rendered
 * after the page content on all routes.
 *
 * NOTE on FooterSection.jsx (src/components/sections/):
 *   That is the teammate's full-bleed dark CONTACT/CTA section — a content
 *   section, not a layout component. It stays in App.jsx among the page
 *   sections. This Footer (layout/Footer.jsx) is the site-wide bottom bar
 *   (brand + navigation + copyright). Both serve different purposes.
 */
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen antialiased" style={{ backgroundColor: 'var(--page-bg)', color: 'var(--text-strong)' }}>
        <div className="flex min-h-screen flex-col">
          <Navbar />

          <main className="flex-1 pt-20">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
