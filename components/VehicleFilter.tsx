'use client';

import { useState } from 'react';

interface VehicleFilterProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  type: string;
  minPrice: number;
  maxPrice: number;
  minPassengers: number;
  sortBy: string;
}

const VehicleFilter = ({ onFilterChange }: VehicleFilterProps) => {
  const [filters, setFilters] = useState<FilterState>({
    type: 'all',
    minPrice: 0,
    maxPrice: 500,
    minPassengers: 1,
    sortBy: 'price-asc',
  });

  const handleFilterUpdate = (key: keyof FilterState, value: string | number) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters: FilterState = {
      type: 'all',
      minPrice: 0,
      maxPrice: 500,
      minPassengers: 1,
      sortBy: 'price-asc',
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Filter Vehicles</h3>
        <button
          onClick={resetFilters}
          className="text-sm text-primary hover:text-primary-dark font-semibold"
        >
          Reset
        </button>
      </div>

      {/* Vehicle Type */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          <span className="material-icons text-primary inline-block mr-1 align-middle" style={{ fontSize: '18px' }}>
            category
          </span>
          Vehicle Type
        </label>
        <select
          value={filters.type}
          onChange={(e) => handleFilterUpdate('type', e.target.value)}
          className="input"
        >
          <option value="all">All Types</option>
          <option value="economy">Economy</option>
          <option value="compact">Compact</option>
          <option value="midsize">Midsize</option>
          <option value="fullsize">Fullsize</option>
          <option value="suv">SUV/Jeep</option>
          <option value="luxury">Luxury</option>
          <option value="van">Van</option>
          <option value="pickup">Pickup Truck</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          <span className="material-icons text-primary inline-block mr-1 align-middle" style={{ fontSize: '18px' }}>
            payments
          </span>
          Daily Price Range
        </label>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="500"
            value={filters.maxPrice}
            onChange={(e) => handleFilterUpdate('maxPrice', parseInt(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>$0</span>
            <span className="font-semibold text-primary">Up to ${filters.maxPrice}</span>
          </div>
        </div>
      </div>

      {/* Passengers */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          <span className="material-icons text-primary inline-block mr-1 align-middle" style={{ fontSize: '18px' }}>
            people
          </span>
          Minimum Passengers
        </label>
        <select
          value={filters.minPassengers}
          onChange={(e) => handleFilterUpdate('minPassengers', parseInt(e.target.value))}
          className="input"
        >
          <option value="1">Any</option>
          <option value="4">4+</option>
          <option value="5">5+</option>
          <option value="7">7+</option>
        </select>
      </div>

      {/* Sort By */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          <span className="material-icons text-primary inline-block mr-1 align-middle" style={{ fontSize: '18px' }}>
            sort
          </span>
          Sort By
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => handleFilterUpdate('sortBy', e.target.value)}
          className="input"
        >
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="passengers-desc">Passengers: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
        </select>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="text-sm text-gray-600 space-y-2">
          <div className="flex items-center">
            <span className="material-icons text-green-500 mr-2" style={{ fontSize: '18px' }}>
              check_circle
            </span>
            <span>Free cancellation</span>
          </div>
          <div className="flex items-center">
            <span className="material-icons text-green-500 mr-2" style={{ fontSize: '18px' }}>
              check_circle
            </span>
            <span>Best price guarantee</span>
          </div>
          <div className="flex items-center">
            <span className="material-icons text-green-500 mr-2" style={{ fontSize: '18px' }}>
              check_circle
            </span>
            <span>24/7 customer support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleFilter;
