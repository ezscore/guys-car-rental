'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home', icon: 'home' },
    { href: '/about', label: 'About Us', icon: 'info' },
    { href: '/fleet', label: 'Our Fleet', icon: 'directions_car' },
    { href: '/contact', label: 'Contact', icon: 'phone' },
    { href: '/enhancements', label: 'Rental Enhancements', icon: 'add_circle' },
  ];

  return (
    <>
      <nav className="nav-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div className="relative w-20 h-16 transition-transform group-hover:scale-110 duration-300">
                <Image
                  src="/logo.png"
                  alt="Guy's Car Rental"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* Reserve Now Button - Always Visible */}
              <Link
                href="/reservations"
                className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-accent to-accent-dark text-white font-black px-8 py-4 rounded-full transition-all duration-500 hover:shadow-2xl hover:scale-110 hover:-translate-y-1"
              >
                <span className="material-icons">event</span>
                <span>RESERVE NOW</span>
              </Link>

              {/* Hamburger Menu Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-3 rounded-full bg-gradient-to-r from-primary to-primary-light text-white hover:scale-110 transition-all duration-300 hover:shadow-lg"
                aria-label="Menu"
              >
                <span className="material-icons text-3xl">
                  {menuOpen ? 'close' : 'menu'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Slide-out Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Slide-out Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-500 ease-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Menu Header */}
          <div className="gradient-bg text-white p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-black">Menu</h2>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <span className="material-icons text-3xl">close</span>
              </button>
            </div>
            <p className="text-blue-100 text-sm">Explore Guy's Car Rental</p>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-2">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="material-icons text-primary text-2xl">{link.icon}</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>

            {/* Mobile Reserve Button */}
            <Link
              href="/reservations"
              onClick={() => setMenuOpen(false)}
              className="sm:hidden mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-accent to-accent-dark text-white font-black px-8 py-5 rounded-full transition-all duration-500 hover:shadow-2xl hover:scale-105"
            >
              <span className="material-icons">event</span>
              <span>RESERVE NOW</span>
            </Link>
          </div>

          {/* Menu Footer */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Need help?</span>
                <a
                  href="tel:17584517885"
                  className="flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors"
                >
                  <span className="material-icons">phone</span>
                  <span>Call Us</span>
                </a>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Quick chat</span>
                <a
                  href="https://wa.me/17584517885"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-green-600 font-bold hover:text-green-700 transition-colors"
                >
                  <span className="material-icons">chat</span>
                  <span>WhatsApp</span>
                </a>
              </div>
              <div className="pt-4 border-t border-gray-300">
                <div className="flex justify-center space-x-3">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-primary hover:bg-primary-dark rounded-full flex items-center justify-center transition-colors"
                  >
                    <span className="text-white font-bold text-sm">f</span>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-primary hover:bg-primary-dark rounded-full flex items-center justify-center transition-colors"
                  >
                    <span className="text-white font-bold text-sm">t</span>
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-accent hover:bg-accent-dark rounded-full flex items-center justify-center transition-colors"
                  >
                    <span className="material-icons text-white text-sm">play_arrow</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
