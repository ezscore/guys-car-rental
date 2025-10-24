'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Hero = () => {
  const router = useRouter();
  const [pickupLocation, setPickupLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/reservations?pickup=${pickupLocation}&from=${pickupDate}&to=${returnDate}`);
  };

  const locations = [
    'G.F.L Charles Airport',
    'Point Seraphine',
    'Hewanorra International Airport',
    'La Place Carenage',
  ];

  return (
    <div className="relative gradient-bg text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary-light/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="inline-block">
              <div className="bg-accent/20 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-accent/40 mb-6 animate-pulse-glow">
                <span className="text-accent-light font-black text-sm tracking-wider">🏆 CARIBBEAN'S #1 CAR RENTAL</span>
              </div>
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-none">
              <span className="block mb-4">UNBEATABLE</span>
              <span className="block bg-gradient-to-r from-white via-accent-light to-white bg-clip-text text-transparent">CAR RENTAL</span>
              <span className="block">DEALS</span>
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-blue-50">
              St. Lucia's Premier Car Rental Service
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/20">
                <span className="material-icons mr-3 text-yellow-400 text-3xl">verified</span>
                <div>
                  <p className="font-black text-sm">CERTIFIED</p>
                  <p className="text-xs text-blue-100">Caribbean's 1st</p>
                </div>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/20">
                <span className="material-icons mr-3 text-yellow-400 text-3xl">workspace_premium</span>
                <div>
                  <p className="font-black text-sm">25+ YEARS</p>
                  <p className="text-xs text-blue-100">Experience</p>
                </div>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/20">
                <span className="material-icons mr-3 text-yellow-400 text-3xl">support_agent</span>
                <div>
                  <p className="font-black text-sm">24/7</p>
                  <p className="text-xs text-blue-100">Support</p>
                </div>
              </div>
            </div>

            {/* Jazz Sponsorship Badge */}
            <div className="inline-block bg-white px-8 py-6 rounded-2xl border-2 border-accent shadow-2xl">
              <p className="text-accent font-black text-xs tracking-widest mb-2">PROUD SPONSOR OF</p>
              <p className="text-3xl font-black text-gray-900">ST. LUCIA JAZZ FESTIVAL</p>
              <p className="text-sm text-gray-600 mt-1">🎵 Supporting culture for 25+ years</p>
            </div>
          </div>

          {/* Quick Booking Widget */}
          <div className="glass-morphism rounded-3xl shadow-2xl p-10 border-2 border-white/30 animate-float">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-black text-gray-900">Reserve Your Perfect Car</h2>
              <span className="material-icons text-accent text-4xl">directions_car</span>
            </div>
            <form onSubmit={handleQuickSearch} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="material-icons text-primary inline-block mr-1 align-middle" style={{ fontSize: '18px' }}>
                    location_on
                  </span>
                  Pickup Location
                </label>
                <select
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="input text-gray-900"
                  required
                >
                  <option value="">Select location...</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <span className="material-icons text-primary inline-block mr-1 align-middle" style={{ fontSize: '18px' }}>
                      event
                    </span>
                    Pickup Date
                  </label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="input text-gray-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <span className="material-icons text-primary inline-block mr-1 align-middle" style={{ fontSize: '18px' }}>
                      event
                    </span>
                    Return Date
                  </label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    min={pickupDate || new Date().toISOString().split('T')[0]}
                    className="input text-gray-900"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="w-full btn-secondary text-lg py-4">
                <span className="material-icons mr-2 align-middle">search</span>
                Find Your Car
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-center text-sm text-gray-600">
              <span className="material-icons text-green-500 mr-2">check_circle</span>
              <span>Free cancellation • Best price guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="#F9FAFB"/>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
