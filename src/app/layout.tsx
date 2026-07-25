import type { Metadata } from 'next';
import './globals.css';
import { ClickToComponent } from '@/components/ClickToComponent';

export const metadata: Metadata = {
  title: 'CodeCanvas Labs — Visual AI & Workflow Pipeline Engine',
  description: 'Architect, simulate, and deploy high-speed visual AI pipelines with zero layout shift and sub-11ms execution latency.',
  keywords: ['AI Pipeline', 'Visual Workflows', 'Next.js 14', 'Gemini AI Engine', 'Developer Tools', 'SaaS Landing Page'],
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
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#090A0F] text-[#F9FAFB] antialiased selection:bg-cyan-500/30">
        {children}
        <ClickToComponent />
      </body>
    </html>
  );
}
