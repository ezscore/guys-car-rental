import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="gradient-bg text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Postal Address */}
          <div>
            <h3 className="text-xl font-bold mb-4">POSTAL:</h3>
            <p className="mb-2">GUY'S CAR RENTAL, P.O. BOX GM888,</p>
            <p className="mb-2">CASTRIES, ST. LUCIA</p>
            <div className="mt-4">
              <p className="mb-1">
                <span className="font-semibold">Telephone:</span> 1758 451- 7885, 1758 451- 7147
              </p>
              <p className="mb-1">
                <span className="font-semibold">Fax:</span> 1758 453-2374
              </p>
              <p>
                <span className="font-semibold">Email:</span>{' '}
                <a href="mailto:info@guyscarrental.com" className="hover:underline">
                  info@guyscarrental.com
                </a>
              </p>
            </div>
            <div className="flex space-x-3 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <span className="text-white font-bold">f</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <span className="text-white font-bold">t</span>
              </a>
              <a
                href="https://plus.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <span className="text-white font-bold">g+</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <span className="material-icons text-white">play_arrow</span>
              </a>
            </div>
          </div>

          {/* Hours & Locations */}
          <div>
            <h3 className="text-xl font-bold mb-4">HOURS OF OPERATION</h3>
            <p className="mb-6">6:00 a.m. to 12:00 p.m.</p>

            <h3 className="text-xl font-bold mb-4">LOCATIONS</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="material-icons mr-2 mt-0.5">location_on</span>
                <span>G.F.L Charles Airport</span>
              </li>
              <li className="flex items-start">
                <span className="material-icons mr-2 mt-0.5">location_on</span>
                <span>Point Seraphine</span>
              </li>
              <li className="flex items-start">
                <span className="material-icons mr-2 mt-0.5">location_on</span>
                <span>Hewanorra International Airport</span>
              </li>
              <li className="flex items-start">
                <span className="material-icons mr-2 mt-0.5">location_on</span>
                <span>La Place Carenage</span>
              </li>
            </ul>
          </div>

          {/* Quick Links & Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">QUICK LINKS</h3>
            <ul className="space-y-2 mb-6">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/fleet" className="hover:underline">
                  Our Fleet
                </Link>
              </li>
              <li>
                <Link href="/reservations" className="hover:underline">
                  Make a Reservation
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact Us
                </Link>
              </li>
            </ul>

            <div>
              <h3 className="text-xl font-bold mb-4">NEWSLETTER</h3>
              <p className="mb-3 text-sm">Stay updated with our latest offers</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none"
                />
                <button className="bg-accent hover:bg-accent-dark px-6 py-2 rounded-r-lg font-semibold transition-colors">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sponsorship Banner */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="bg-accent text-center py-4 rounded-lg">
            <p className="font-bold text-lg">Caribbean's 1st Certified car rental operator</p>
            <p className="text-sm mt-1">
              and also a proud sponsor of Loushan Revellers for many years,
            </p>
            <p className="text-sm">Partner with Line and Length in broadcasting of sports.</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-white/20 text-center text-sm">
          <p>Guy's Car Rental © {new Date().getFullYear()} All Rights Reserved</p>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/17584517885"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-50 group"
        aria-label="Contact us on WhatsApp"
      >
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.304-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        <span className="absolute -top-10 right-0 bg-gray-900 text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Chat with us!
        </span>
      </a>
    </footer>
  );
};

export default Footer;
