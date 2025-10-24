import Link from 'next/link';
import { Vehicle } from '@/types';

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  return (
    <div className="card overflow-hidden group">
      {/* Vehicle Image */}
      <div className="relative h-56 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
          <span className="material-icons text-primary group-hover:text-primary-dark transition-colors duration-500" style={{ fontSize: '140px' }}>
            directions_car
          </span>
        </div>
        {vehicle.featured && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-accent to-accent-dark text-white px-4 py-2 rounded-full text-xs font-black shadow-lg animate-pulse-glow">
            ⭐ FEATURED
          </div>
        )}
      </div>

      {/* Vehicle Info */}
      <div className="p-6">
        <div className="mb-4">
          <div className="text-sm text-accent font-black mb-2 tracking-wide">GROUP: {vehicle.group}</div>
          <h3 className="text-2xl font-black text-gray-900 group-hover:text-primary transition-colors duration-300">{vehicle.name}</h3>
        </div>

        {/* Equipment */}
        <div className="mb-4">
          <div className="text-sm text-gray-600 font-semibold mb-2">Equipment:</div>
          <div className="flex flex-wrap gap-2">
            {vehicle.equipment.map((item, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center text-sm text-gray-600">
            <span className="material-icons text-primary mr-2" style={{ fontSize: '20px' }}>
              person
            </span>
            <span>{vehicle.passengers} passengers</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="material-icons text-primary mr-2" style={{ fontSize: '20px' }}>
              door_front
            </span>
            <span>{vehicle.doors} doors</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="space-y-3 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 font-bold">Daily:</span>
            <span className="text-2xl font-black text-accent">US${vehicle.pricing.daily}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 font-bold">Weekly:</span>
            <span className="text-xl font-black text-primary">US${vehicle.pricing.weekly}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 font-bold">Monthly:</span>
            <span className="text-xl font-black text-primary">US${vehicle.pricing.monthly}</span>
          </div>
        </div>

        {/* Reserve Button */}
        <Link
          href={`/reservations?vehicle=${vehicle.group}`}
          className="block w-full text-center btn-secondary"
        >
          Reserve
        </Link>
      </div>
    </div>
  );
};

export default VehicleCard;
