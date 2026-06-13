import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../context/ThemeProvider';
import { AuthProvider } from '../context/AuthContext';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { RouteGuard } from '../components/auth/RouteGuard';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TruthGuard AI - Detect Deepfakes & Verify Content',
  description: 'State-of-the-art verification platform dedicated to combating deepfakes, audio voice cloning, synthetic manipulation, and online disinformation.',
  keywords: ['deepfake detection', 'content verification', 'fact check', 'artificial intelligence', 'fake news', 'voice cloning'],
  openGraph: {
    title: 'TruthGuard AI - Digital Trust Platform',
    description: 'AI-powered detection system built to identify manipulated media and safeguard truth.',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            <RouteGuard>
              <main className="flex-grow pt-[78px]">{children}</main>
            </RouteGuard>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
