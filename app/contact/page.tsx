'use client';

import { useState } from 'react';
import { locations } from '@/data/vehicles';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [captcha, setCaptcha] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    alert('Message sent! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
    setCaptcha('');
  };

  const contactInfo = {
    postal: 'GUY\'S CAR RENTAL, P.O. BOX GM888, CASTRIES, ST. LUCIA',
    phone: '1758 451- 7885, 1758 451- 7147',
    fax: '1758 453-2374',
    email: 'info@guyscarrental.com',
    hours: '6:00 a.m. to 12:00 p.m.',
  };

  return (
    <div className="bg-gray-50">
      {/* Hero */}
      <div className="gradient-bg text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-blue-50">
            Get in touch with Guy's Car Rental - We're here to help!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Details</h2>

              <div className="space-y-6">
                {/* Hours */}
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="material-icons text-primary">schedule</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900 mb-1">Hours of Operation</h3>
                    <p className="text-gray-600">{contactInfo.hours}</p>
                    <p className="text-sm text-gray-500 mt-1">6:00 a.m. to 12:00 Midnight</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="material-icons text-primary">phone</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900 mb-1">Telephone</h3>
                    <a href="tel:17584517885" className="text-primary hover:text-primary-dark">
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>

                {/* Fax */}
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="material-icons text-primary">print</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900 mb-1">Fax</h3>
                    <p className="text-gray-600">{contactInfo.fax}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="material-icons text-primary">email</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-primary hover:text-primary-dark"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                {/* Postal */}
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="material-icons text-primary">mail</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900 mb-1">Postal Address</h3>
                    <p className="text-gray-600">{contactInfo.postal}</p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="material-icons text-green-600">chat</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900 mb-1">WhatsApp</h3>
                    <a
                      href="https://wa.me/17584517885"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 font-medium"
                    >
                      Chat with us on WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex space-x-3">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-primary hover:bg-primary-dark rounded-full flex items-center justify-center transition-colors"
                  >
                    <span className="text-white font-bold">f</span>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-primary hover:bg-primary-dark rounded-full flex items-center justify-center transition-colors"
                  >
                    <span className="text-white font-bold">t</span>
                  </a>
                  <a
                    href="https://plus.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-accent hover:bg-accent-dark rounded-full flex items-center justify-center transition-colors"
                  >
                    <span className="text-white font-bold">g+</span>
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-accent hover:bg-accent-dark rounded-full flex items-center justify-center transition-colors"
                  >
                    <span className="material-icons text-white">play_arrow</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Locations */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Locations</h2>
              <div className="space-y-4">
                {locations.map((location, index) => (
                  <div key={location.id} className="flex items-start">
                    <span className="material-icons text-primary mr-3 mt-1">location_on</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{location.name}</h3>
                      <a
                        href={`https://www.google.com/maps?q=${location.coordinates[0]},${location.coordinates[1]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:text-primary-dark"
                      >
                        View on Google Maps →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input"
                    placeholder="+1 (758) 451-7885"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="input min-h-[150px]"
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                {/* Simple CAPTCHA */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Captcha Code *
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-200 px-6 py-3 rounded-lg font-mono text-2xl font-bold tracking-wider select-none">
                      2LWFC
                    </div>
                    <input
                      type="text"
                      value={captcha}
                      onChange={(e) => setCaptcha(e.target.value)}
                      className="input flex-1"
                      placeholder="Enter the code above"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Can't read the image?{' '}
                    <button type="button" className="text-primary hover:underline">
                      click here
                    </button>{' '}
                    to refresh.
                  </p>
                </div>

                <button type="submit" className="w-full btn-secondary text-lg py-4">
                  <span className="material-icons mr-2 align-middle">send</span>
                  Submit
                </button>
              </form>
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 h-96 flex items-center justify-center relative">
                <div className="text-center">
                  <span className="material-icons text-primary" style={{ fontSize: '72px' }}>
                    map
                  </span>
                  <p className="mt-4 text-gray-700 font-semibold">Interactive Map</p>
                  <p className="text-sm text-gray-600 mt-2 px-4">
                    Showing all 4 Guy's Car Rental locations in St. Lucia
                  </p>
                </div>

                {/* Location Markers */}
                {locations.map((location, index) => (
                  <div
                    key={location.id}
                    className="absolute bg-accent text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                    style={{
                      top: `${20 + index * 20}%`,
                      left: `${30 + (index % 2) * 40}%`,
                    }}
                  >
                    <span className="material-icons text-xs align-middle mr-1">place</span>
                    {location.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
