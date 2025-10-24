import Link from 'next/link';
import { enhancements } from '@/data/vehicles';

export default function Enhancements() {
  const additionalServices = [
    {
      id: 'airport-delivery',
      name: 'Airport Delivery & Pickup',
      description: 'We deliver your rental car directly to the airport and pick it up when you\'re done',
      price: 0,
      priceType: 'Complimentary',
      icon: 'local_airport',
    },
    {
      id: 'hotel-delivery',
      name: 'Hotel Delivery',
      description: 'Have your rental car delivered to your hotel or accommodation',
      price: 25,
      priceType: 'One-time',
      icon: 'hotel',
    },
    {
      id: 'baby-seat',
      name: 'Baby/Toddler Seat',
      description: 'Safe and secure seating for infants and toddlers',
      price: 5,
      priceType: 'Per Day',
      icon: 'child_care',
    },
    {
      id: 'cooler',
      name: 'Ice Cooler',
      description: 'Keep your drinks cold on beach trips',
      price: 10,
      priceType: 'One-time',
      icon: 'ac_unit',
    },
    {
      id: 'beach-gear',
      name: 'Beach Equipment',
      description: 'Umbrella, chairs, and beach towels',
      price: 15,
      priceType: 'Per Day',
      icon: 'beach_access',
    },
    {
      id: 'phone-mount',
      name: 'Phone Mount',
      description: 'Secure phone holder for navigation',
      price: 3,
      priceType: 'One-time',
      icon: 'phone_iphone',
    },
  ];

  const insuranceOptions = [
    {
      name: 'Basic Insurance',
      description: 'Standard coverage included with all rentals',
      features: [
        'Third-party liability coverage',
        'Basic collision damage waiver',
        'Theft protection',
      ],
      price: 'Included',
      recommended: false,
    },
    {
      name: 'Premium Insurance',
      description: 'Enhanced coverage for complete peace of mind',
      features: [
        'Zero deductible',
        'Full collision damage waiver',
        'Personal accident insurance',
        'Extended roadside assistance',
        'Coverage for tires and windshield',
      ],
      price: '$20/day',
      recommended: true,
    },
    {
      name: 'Super Coverage',
      description: 'Maximum protection for worry-free travel',
      features: [
        'All Premium features',
        'Personal effects coverage',
        'Medical expenses coverage',
        'Lost key replacement',
        'Priority roadside service',
      ],
      price: '$35/day',
      recommended: false,
    },
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero */}
      <div className="gradient-bg text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Rental Enhancements</h1>
          <p className="text-xl text-blue-50 max-w-3xl">
            Enhance your rental experience with our additional services and equipment
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Popular Add-ons */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Add-Ons
            </h2>
            <p className="text-lg text-gray-600">
              Make your trip more comfortable and convenient
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...enhancements, ...additionalServices].map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="material-icons text-primary" style={{ fontSize: '32px' }}>
                    {item.icon || 'add_circle'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary">
                    {typeof item.price === 'number' ? `$${item.price}` : item.price}
                  </div>
                  <div className="text-sm text-gray-600">
                    {item.priceType === 'daily' ? 'Per Day' : item.priceType}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insurance Options */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Insurance Options
            </h2>
            <p className="text-lg text-gray-600">
              Choose the level of protection that's right for you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {insuranceOptions.map((option, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-md overflow-hidden ${
                  option.recommended ? 'ring-2 ring-accent transform scale-105' : ''
                }`}
              >
                {option.recommended && (
                  <div className="bg-accent text-white text-center py-2 font-bold text-sm">
                    RECOMMENDED
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{option.name}</h3>
                  <p className="text-gray-600 mb-6">{option.description}</p>

                  <div className="mb-6">
                    <div className="text-3xl font-bold text-primary mb-1">{option.price}</div>
                    {option.price !== 'Included' && (
                      <div className="text-sm text-gray-600">Per rental day</div>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-700">
                        <span className="material-icons text-green-500 mr-2 flex-shrink-0" style={{ fontSize: '20px' }}>
                          check_circle
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/reservations"
                    className={`block w-full text-center font-semibold px-6 py-3 rounded-lg transition-all ${
                      option.recommended
                        ? 'btn-secondary'
                        : 'btn-outline'
                    }`}
                  >
                    Select Plan
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Important Information</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <span className="material-icons text-primary mr-2">info</span>
                Rental Requirements
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="material-icons mr-2 text-primary" style={{ fontSize: '18px' }}>
                    arrow_right
                  </span>
                  <span>Valid driver's license required</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons mr-2 text-primary" style={{ fontSize: '18px' }}>
                    arrow_right
                  </span>
                  <span>Minimum age: 25 years old</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons mr-2 text-primary" style={{ fontSize: '18px' }}>
                    arrow_right
                  </span>
                  <span>Credit card for security deposit</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons mr-2 text-primary" style={{ fontSize: '18px' }}>
                    arrow_right
                  </span>
                  <span>Proof of insurance (if declining coverage)</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <span className="material-icons text-primary mr-2">local_gas_station</span>
                Fuel Policy
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="material-icons mr-2 text-primary" style={{ fontSize: '18px' }}>
                    arrow_right
                  </span>
                  <span>Pick up vehicle with full tank</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons mr-2 text-primary" style={{ fontSize: '18px' }}>
                    arrow_right
                  </span>
                  <span>Return vehicle with full tank</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons mr-2 text-primary" style={{ fontSize: '18px' }}>
                    arrow_right
                  </span>
                  <span>Refueling service available at $25 + fuel cost</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <span className="material-icons text-primary mr-2">cancel</span>
                Cancellation Policy
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="material-icons mr-2 text-primary" style={{ fontSize: '18px' }}>
                    arrow_right
                  </span>
                  <span>Free cancellation up to 48 hours before pickup</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons mr-2 text-primary" style={{ fontSize: '18px' }}>
                    arrow_right
                  </span>
                  <span>50% charge for cancellations within 48 hours</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons mr-2 text-primary" style={{ fontSize: '18px' }}>
                    arrow_right
                  </span>
                  <span>No refund for no-shows</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <span className="material-icons text-primary mr-2">build</span>
                Roadside Assistance
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="material-icons mr-2 text-primary" style={{ fontSize: '18px' }}>
                    arrow_right
                  </span>
                  <span>24/7 emergency support</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons mr-2 text-primary" style={{ fontSize: '18px' }}>
                    arrow_right
                  </span>
                  <span>Free towing service</span>
                </li>
                <li className="flex items-start">
                  <span className="material-icons mr-2 text-primary" style={{ fontSize: '18px' }}>
                    arrow_right
                  </span>
                  <span>Vehicle replacement if needed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 gradient-bg text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Book Your Rental?
          </h2>
          <p className="text-xl mb-8 text-blue-50">
            Add enhancements during the reservation process
          </p>
          <Link href="/reservations" className="btn-secondary text-lg px-8 py-4 inline-flex items-center">
            <span className="material-icons mr-2">event</span>
            Make a Reservation
          </Link>
        </div>
      </div>
    </div>
  );
}
