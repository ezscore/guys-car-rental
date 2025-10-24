'use client';

import { useState, useMemo } from 'react';
import VehicleCard from '@/components/VehicleCard';
import VehicleFilter, { FilterState } from '@/components/VehicleFilter';
import { vehicles } from '@/data/vehicles';

export default function Fleet() {
  const [filters, setFilters] = useState<FilterState>({
    type: 'all',
    minPrice: 0,
    maxPrice: 500,
    minPassengers: 1,
    sortBy: 'price-asc',
  });

  const filteredAndSortedVehicles = useMemo(() => {
    let filtered = vehicles.filter((vehicle) => {
      // Filter by type
      if (filters.type !== 'all' && vehicle.type !== filters.type) {
        return false;
      }

      // Filter by price
      if (vehicle.pricing.daily > filters.maxPrice) {
        return false;
      }

      // Filter by passengers
      if (vehicle.passengers < filters.minPassengers) {
        return false;
      }

      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.pricing.daily - b.pricing.daily;
        case 'price-desc':
          return b.pricing.daily - a.pricing.daily;
        case 'passengers-desc':
          return b.passengers - a.passengers;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [filters]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="gradient-bg text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Fleet</h1>
          <p className="text-xl text-blue-50 max-w-3xl">
            Our fleet features a variety of vehicles equipped with the safety features and options travelers prefer. All vehicles are expertly serviced and maintained to meet the highest standards.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center bg-white/10 px-4 py-2 rounded-full">
              <span className="material-icons mr-2">price_check</span>
              <span>All prices in US Dollars</span>
            </div>
            <div className="flex items-center bg-white/10 px-4 py-2 rounded-full">
              <span className="material-icons mr-2">info</span>
              <span>Prices subject to change without notice</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fleet Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filter */}
          <div className="lg:col-span-1">
            <VehicleFilter onFilterChange={setFilters} />
          </div>

          {/* Vehicle Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredAndSortedVehicles.length} {filteredAndSortedVehicles.length === 1 ? 'Vehicle' : 'Vehicles'} Available
              </h2>
              <div className="flex items-center text-sm text-gray-600">
                <span className="material-icons mr-1" style={{ fontSize: '18px' }}>
                  info
                </span>
                <span>Scroll for more</span>
              </div>
            </div>

            {filteredAndSortedVehicles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAndSortedVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl shadow-md">
                <span className="material-icons text-gray-300 mb-4" style={{ fontSize: '72px' }}>
                  search_off
                </span>
                <h3 className="text-xl font-bold text-gray-700 mb-2">No vehicles found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters to see more options
                </p>
                <button
                  onClick={() =>
                    setFilters({
                      type: 'all',
                      minPrice: 0,
                      maxPrice: 500,
                      minPassengers: 1,
                      sortBy: 'price-asc',
                    })
                  }
                  className="btn-primary"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-icons text-primary" style={{ fontSize: '32px' }}>
                  verified_user
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">All Vehicles Insured</h3>
              <p className="text-gray-600">
                Full coverage insurance included with every rental
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-icons text-primary" style={{ fontSize: '32px' }}>
                  build
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Well Maintained</h3>
              <p className="text-gray-600">
                Regular servicing to ensure reliability and safety
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-icons text-primary" style={{ fontSize: '32px' }}>
                  support_agent
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Round-the-clock assistance for all our customers
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
