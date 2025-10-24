import Link from 'next/link';
import Hero from '@/components/Hero';
import VehicleCard from '@/components/VehicleCard';
import { vehicles } from '@/data/vehicles';

export default function Home() {
  const featuredVehicles = vehicles.filter((v) => v.featured);

  const achievements = [
    'Proud Sponsor of Saint Lucia Jazz for 25 years',
    'Excellence Business Award in 2000 Presented by Kafalou \'99',
    'Contributed towards the Graduation of Students in 2013 from the Ciceron Secondary School',
    'Donated to the Good Shepard Church in Babonneau Fundraising Activity in June 2015',
    'Donated to the Dunnotter School Sports Committee in 2015',
    "Guy's is the Caribbean's 1st certified car rental operator",
    "Guy's has been a proud sponsor of Loushan Revellers for many years",
    "Guy's also partners with Line and Length in broadcasting of sports",
  ];

  return (
    <>
      <Hero />

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">About Guy's Car Rental</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Guy's Car Rental is a fully local owned and operated entity. Guy's is a company that prides itself as the trendsetter of the St Lucian car rental industry providing a professional yet personalized service highly rated by our customers.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Our fleet is complete with a wide range of well maintained and current models vehicle to meet your every need whether you are the business executive or vacationer. Guy's caters to your every need in pure comfort at the most attractive rate.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Guy's Car Rental is strategically located at the epicenter of the business and tourism capital. With location at the George FL Charles airport, twenty four hour hotlines at the cruise ship terminals, airport terminal and Rodney Bay.
              </p>
              <Link href="/about" className="btn-primary">
                Learn More About Us
              </Link>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-primary to-primary-light rounded-2xl p-8 text-white">
                <div className="flex items-center mb-6">
                  <span className="material-icons text-yellow-300 mr-3" style={{ fontSize: '48px' }}>
                    emoji_events
                  </span>
                  <h3 className="text-2xl font-bold">Caribbean's 1st Certified</h3>
                </div>
                <p className="text-lg mb-6">
                  Car rental operator and also a proud sponsor of Loushan Revellers for many years
                </p>
                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">25+</div>
                    <div className="text-sm text-blue-100">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">4</div>
                    <div className="text-sm text-blue-100">Locations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">100+</div>
                    <div className="text-sm text-blue-100">Vehicles</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Featured Vehicles</h2>
            <p className="section-subtitle">
              Explore our most popular car rentals
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/fleet" className="btn-primary text-lg px-8 py-4">
              <span className="material-icons mr-2 align-middle">directions_car</span>
              View Full Fleet
            </Link>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Achievements</h2>
            <p className="section-subtitle">
              Proud moments and milestones over the years
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-start bg-gradient-to-r from-primary/5 to-transparent p-6 rounded-lg border-l-4 border-primary">
                <span className="material-icons text-primary mr-4 mt-1 flex-shrink-0">
                  star
                </span>
                <p className="text-gray-700 leading-relaxed">{achievement}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-bg text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Explore St. Lucia?
          </h2>
          <p className="text-xl mb-8 text-blue-50">
            Book your perfect rental car today and experience the island in comfort
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/reservations" className="bg-accent hover:bg-accent-dark text-white font-bold px-8 py-4 rounded-lg text-lg transition-colors inline-flex items-center justify-center">
              <span className="material-icons mr-2">event</span>
              Make a Reservation
            </Link>
            <Link href="/fleet" className="bg-white text-primary hover:bg-gray-100 font-bold px-8 py-4 rounded-lg text-lg transition-colors inline-flex items-center justify-center">
              <span className="material-icons mr-2">directions_car</span>
              View Our Fleet
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
