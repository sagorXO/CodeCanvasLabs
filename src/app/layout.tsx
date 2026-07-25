import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClickToComponent } from '@/components/ClickToComponent';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'CodeCanvas Labs — Visual AI & Workflow Pipeline Engine',
  description: 'Architect, simulate, and deploy high-speed visual AI pipelines with zero layout shift and sub-11ms execution latency.',
  keywords: ['AI Pipeline', 'Visual Workflows', 'Next.js 14', 'Gemini AI Engine', 'Developer Tools', 'SaaS Landing Page'],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'CodeCanvas Labs — Visual AI & Workflow Pipeline Engine',
    description: 'Architect, simulate, and deploy high-speed visual AI pipelines with zero layout shift and sub-11ms execution latency.',
    url: 'https://codecanvas.io',
    siteName: 'CodeCanvas Labs',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark scroll-smooth ${inter.variable}`}>
      <body className={`min-h-screen bg-[#090A0F] text-[#F9FAFB] antialiased ${inter.className}`}>
        {children}
        <ClickToComponent />
      </body>
    </html>
  );
}
