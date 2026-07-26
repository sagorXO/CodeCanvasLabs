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
  title: 'Saied Sagar — AI Systems Architect & Full-Stack Engineering Studio',
  description: 'Architecting enterprise AI workflows, high-performance web applications, and sub-11ms edge infrastructures for industry leaders.',
  keywords: ['Saied Sagar', 'AI Engineer', 'Full-Stack Developer', 'Next.js 14', 'Gemini AI Engine', 'Three.js 3D', 'WebAssembly', 'Portfolio Studio'],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Saied Sagar — Senior AI Systems Architect & Engineering Studio',
    description: 'Bespoke AI system architecture, high-speed web apps, and enterprise software engineering.',
    url: 'https://saiedsagar.dev',
    siteName: 'Saied Sagar Studio',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://saiedsagar.dev/#person',
      'name': 'Saied Sagar',
      'jobTitle': 'Senior AI Systems Architect & Lead Software Engineer',
      'url': 'https://saiedsagar.dev',
      'sameAs': [
        'https://github.com/sagorXO',
        'https://linkedin.com/in/saiedsagar',
        'https://twitter.com/saiedsagar'
      ]
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://saiedsagar.dev/#service',
      'name': 'Saied Sagar Studio — Systems Engineering',
      'priceRange': '$$$$ ($5,000 - $25,000+)',
      'description': 'Bespoke enterprise AI workflows, Next.js web applications, and sub-11ms Wasm edge engineering.'
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark scroll-smooth ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`min-h-screen bg-[#090A0F] text-[#F9FAFB] antialiased ${inter.className}`}>
        {children}
        <ClickToComponent />
      </body>
    </html>
  );
}
