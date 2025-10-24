export default function About() {
  const achievements = [
    {
      year: '1999-Present',
      title: 'Proud Sponsor of Saint Lucia Jazz',
      description: 'Supporting St. Lucia Jazz Festival for 25 years',
      icon: 'music_note',
    },
    {
      year: '2000',
      title: 'Excellence Business Award',
      description: "Presented by Kafalou '99 for outstanding service",
      icon: 'emoji_events',
    },
    {
      year: '2013',
      title: 'Education Support',
      description: 'Contributed towards the Graduation of Students from the Ciceron Secondary School',
      icon: 'school',
    },
    {
      year: '2015',
      title: 'Community Contribution',
      description: 'Donated to the Good Shepard Church in Babonneau Fundraising Activity',
      icon: 'church',
    },
    {
      year: '2015',
      title: 'Sports Support',
      description: 'Donated to the Dunnotter School Sports Committee',
      icon: 'sports_soccer',
    },
    {
      year: 'Ongoing',
      title: "Caribbean's 1st Certified Operator",
      description: 'First certified car rental operator in the Caribbean',
      icon: 'verified',
    },
    {
      year: 'Ongoing',
      title: 'Loushan Revellers Sponsor',
      description: 'Proud sponsor of Loushan Revellers for many years',
      icon: 'celebration',
    },
    {
      year: 'Ongoing',
      title: 'Sports Broadcasting Partner',
      description: 'Partners with Line and Length in broadcasting of sports',
      icon: 'sports_baseball',
    },
  ];

  const values = [
    {
      title: 'Quality Service',
      description: 'Professional yet personalized service highly rated by our customers',
      icon: 'stars',
    },
    {
      title: 'Local Expertise',
      description: 'Fully local owned and operated with deep knowledge of St. Lucia',
      icon: 'location_city',
    },
    {
      title: 'Well-Maintained Fleet',
      description: 'Current models expertly serviced to meet the highest standards',
      icon: 'build_circle',
    },
    {
      title: 'Strategic Locations',
      description: 'Conveniently located at airports, cruise terminals, and tourist areas',
      icon: 'place',
    },
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="gradient-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Guy's Car Rental</h1>
          <p className="text-xl md:text-2xl text-blue-50 max-w-3xl mx-auto">
            Trendsetter of the St Lucian car rental industry since 1999
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* About St. Lucia Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About St. Lucia</h2>
            <div className="prose prose-lg text-gray-700 space-y-4">
              <p>
                Guy's Car Rental is a fully local owned and operated entity. Guy's is a company that prides itself as the trendsetter of the St Lucian car rental industry providing a professional yet personalized service highly rated by our customers.
              </p>
              <p>
                Our fleet is complete with a wide range of well maintained and current models vehicle to meet your every need whether you are the business executive or vacationer. Guy's caters to your every need in pure comfort at the most attractive rate.
              </p>
              <p>
                Guy's Car Rental is strategically located at the epicenter of the business and tourism capital. With location at the George FL Charles airport, twenty four hour hotlines at the cruise ship terminals, airport terminal and Rodney Bay.
              </p>
              <p>
                Guy's Car Rental would like to thank you for making St. Lucia your destination of choice and for selecting Guy's as your preferred car rental provider.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <span className="material-icons text-primary" style={{ fontSize: '120px' }}>
                  landscape
                </span>
                <p className="mt-4 text-xl font-semibold text-gray-700">Beautiful St. Lucia</p>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-6 left-6 right-6 bg-white rounded-xl shadow-xl p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary">25+</div>
                  <div className="text-sm text-gray-600">Years</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">4</div>
                  <div className="text-sm text-gray-600">Locations</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">100+</div>
                  <div className="text-sm text-gray-600">Vehicles</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20 mt-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">What makes Guy's Car Rental different</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-icons text-primary" style={{ fontSize: '32px' }}>
                    {value.icon}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Timeline */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Achievements</h2>
            <p className="text-xl text-gray-600">Milestones and contributions to St. Lucia</p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-primary-light to-primary hidden md:block"></div>

            <div className="space-y-12">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg z-10"></div>

                  {/* Content */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
                      <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="material-icons text-primary" style={{ fontSize: '24px' }}>
                            {achievement.icon}
                          </span>
                        </div>
                        <div className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                          {achievement.year}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{achievement.title}</h3>
                      <p className="text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sponsorships Banner */}
        <div className="bg-gradient-to-r from-accent to-accent-dark text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Caribbean's 1st Certified Car Rental Operator</h2>
          <p className="text-xl mb-6">
            And also a proud sponsor of Loushan Revellers for many years
          </p>
          <p className="text-lg">
            Partner with Line and Length in broadcasting of sports
          </p>

          <div className="mt-8 pt-8 border-t border-white/30">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="material-icons text-yellow-300" style={{ fontSize: '48px' }}>
                music_note
              </span>
              <h3 className="text-2xl font-bold">OFFICIAL SPONSOR OF ST. LUCIA JAZZ</h3>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="gradient-bg text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Experience the Guy's Difference
          </h2>
          <p className="text-xl mb-8 text-blue-50">
            Book with St. Lucia's most trusted car rental company
          </p>
          <a href="/reservations" className="btn-secondary text-lg px-8 py-4 inline-flex items-center">
            <span className="material-icons mr-2">event</span>
            Make a Reservation
          </a>
        </div>
      </div>
    </div>
  );
}
