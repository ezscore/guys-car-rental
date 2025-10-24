// HQ Rental API Types

export interface HQRentalReservationRequest {
  brand_id: string;
  pick_up_date: string; // yyyy-mm-dd
  return_date: string; // yyyy-mm-dd
  pick_up_time: string; // HH:mm
  return_time: string; // HH:mm
  vehicle_class_id: string;
  pick_up_location?: string;
  return_location?: string;
  pick_up_location_custom?: string;
  return_location_custom?: string;
  customer_id?: string;
  customer_first_name?: string;
  customer_last_name?: string;
  customer_email?: string;
  customer_phone_number?: string;
  customer_birthdate?: string; // yyyy-mm-dd
  customer_driver_license_number?: string;
  customer_driver_license_expiration_date?: string; // yyyy-mm-dd
  customer_street?: string;
  customer_city?: string;
  customer_state?: string;
  customer_zip?: string;
  customer_country?: string; // ISO alpha-2
  additional_charges?: number[];
  currency?: string;
  rate_code?: string;
  skip_confirmation_email?: boolean;
  walk_in_customer?: boolean;
}

export interface HQRentalReservation {
  id: string;
  confirmation_number: string;
  status: string;
  pick_up_date: string;
  return_date: string;
  pick_up_time: string;
  return_time: string;
  vehicle_class_id: string;
  customer_id: string;
  total_amount: number;
  currency: string;
  created_at: string;
  updated_at: string;
}

export interface HQRentalAPIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  status_code?: number;
  errors?: {
    error_message?: string;
  };
}

export interface FrontendReservationData {
  // Dates & Location
  pickupLocation: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;

  // Vehicle
  vehicleGroup: string;

  // Customer Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  driversLicense: string;
  birthdate: string;
  licenseExpiration: string;

  // Address
  street: string;
  city: string;
  state: string;
  zip: string;

  // Enhancements
  selectedEnhancements: string[];
  specialRequests: string;
}
