export interface Vehicle {
  id: string;
  group: string;
  name: string;
  type: 'economy' | 'compact' | 'midsize' | 'fullsize' | 'suv' | 'luxury' | 'van' | 'pickup';
  equipment: string[];
  passengers: number;
  doors: number;
  pricing: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  imageUrl: string;
  featured?: boolean;
}

export interface Location {
  id: string;
  name: string;
  coordinates: [number, number]; // [lat, lng]
}

export interface Reservation {
  pickupLocation: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  vehicleGroup: string;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
  };
  enhancements: string[];
  specialRequests?: string;
}

export interface Enhancement {
  id: string;
  name: string;
  description: string;
  price: number;
  priceType: 'daily' | 'one-time';
}
