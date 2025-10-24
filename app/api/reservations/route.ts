import { NextRequest, NextResponse } from 'next/server';
import type {
  FrontendReservationData,
  HQRentalReservationRequest,
  HQRentalAPIResponse,
  HQRentalReservation
} from '@/types/hq-rental';
import {
  getVehicleClassId,
  getLocationId,
  getEnhancementIds
} from '@/config/hq-rental-mapping';

// HQ Rental API Configuration
const API_REGIONS: Record<string, string> = {
  'america': 'https://api.caagcrm.com/api/',
  'america-3': 'https://api-america-3.caagcrm.com/api-america-3/',
  'america-west': 'https://api-america-west.caagcrm.com/api-america-west/',
  'miami': 'https://api-miami.caagcrm.com/api-miami/',
  'europe': 'https://api-europe.caagcrm.com/api-europe/',
  'asia': 'https://api-asia.caagcrm.com/api-asia/'
};

const getHQRentalConfig = () => {
  const region = process.env.HQRENTAL_API_REGION || 'america';
  const tenantToken = process.env.HQRENTAL_TENANT_TOKEN;
  const userToken = process.env.HQRENTAL_USER_TOKEN;
  const brandId = process.env.HQRENTAL_BRAND_ID || '1';

  if (!tenantToken || !userToken) {
    throw new Error('HQ Rental API credentials not configured');
  }

  const baseUrl = API_REGIONS[region];
  const authToken = Buffer.from(`${tenantToken}:${userToken}`).toString('base64');

  return { baseUrl, authToken, brandId };
};

const callHQRentalAPI = async (
  endpoint: string,
  payload: HQRentalReservationRequest
): Promise<HQRentalAPIResponse<HQRentalReservation>> => {
  const { baseUrl, authToken } = getHQRentalConfig();

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    // HQ Rental API returns a wrapper with success, status_code, errors, and data
    if (data.success) {
      return {
        success: true,
        data: data.data
      };
    } else {
      return {
        success: false,
        error: data.errors?.error_message || 'API request failed',
        status_code: data.status_code
      };
    }
  } catch (error) {
    console.error('HQ Rental API Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

export async function POST(request: NextRequest) {
  try {
    const formData: FrontendReservationData = await request.json();
    const { brandId } = getHQRentalConfig();

    // Validate required fields
    if (!formData.pickupDate || !formData.returnDate || !formData.vehicleGroup) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Map frontend data to HQ Rental API format
    let payload: HQRentalReservationRequest;

    try {
      payload = {
        brand_id: brandId,

        // Dates & Times
        pick_up_date: formData.pickupDate,
        return_date: formData.returnDate,
        pick_up_time: formData.pickupTime,
        return_time: formData.returnTime,

        // Vehicle & Location (with mapping)
        vehicle_class_id: getVehicleClassId(formData.vehicleGroup),
        pick_up_location: getLocationId(formData.pickupLocation),
        return_location: getLocationId(formData.pickupLocation), // Same as pickup for now

        // Customer Information
        customer_first_name: formData.firstName,
        customer_last_name: formData.lastName,
        customer_email: formData.email,
        customer_phone_number: formData.phone,
        customer_birthdate: formData.birthdate,
        customer_driver_license_number: formData.driversLicense,
        customer_driver_license_expiration_date: formData.licenseExpiration,

        // Address
        customer_street: formData.street,
        customer_city: formData.city,
        customer_state: formData.state,
        customer_zip: formData.zip,
        customer_country: formData.country,

        // Enhancements
        additional_charges: getEnhancementIds(formData.selectedEnhancements),

        // Default settings
        currency: 'USD',
        skip_confirmation_email: false,
        walk_in_customer: false
      };
    } catch (mappingError) {
      return NextResponse.json(
        {
          success: false,
          error: mappingError instanceof Error ? mappingError.message : 'Mapping error occurred'
        },
        { status: 400 }
      );
    }

    // Call HQ Rental API
    const result = await callHQRentalAPI('car-rental/reservations/confirm', payload);

    if (result.success) {
      return NextResponse.json({
        success: true,
        reservation: result.data,
        message: 'Reservation created successfully!'
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Failed to create reservation'
        },
        { status: result.status_code || 500 }
      );
    }

  } catch (error) {
    console.error('Reservation API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      },
      { status: 500 }
    );
  }
}
