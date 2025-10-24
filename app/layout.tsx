import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Guy's Car Rental - St. Lucia's Premier Car Rental Service",
  description: "Guy's Car Rental is a fully local owned and operated car rental company in St. Lucia. Caribbean's 1st certified car rental operator with locations at all major airports and cruise terminals.",
  keywords: 'car rental, St. Lucia, vehicle rental, airport car rental, Caribbean car rental',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
