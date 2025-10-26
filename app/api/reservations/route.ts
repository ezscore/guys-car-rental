import { NextRequest, NextResponse } from 'next/server';
import type { FrontendReservationData } from '@/types/hq-rental';
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

// Generic API call helper with timeout
const callHQRentalAPI = async (
  endpoint: string,
  method: 'GET' | 'POST' = 'POST',
  payload?: Record<string, any>,
  timeoutMs: number = 30000 // 30 second timeout
): Promise<any> => {
  const { baseUrl, authToken } = getHQRentalConfig();

  try {
    const url = new URL(`${baseUrl}${endpoint}`);

    // For GET requests, add payload as query params
    if (method === 'GET' && payload) {
      Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const options: RequestInit = {
      method,
      headers: {
        'Authorization': `Basic ${authToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    // For POST requests, add payload as body
    if (method === 'POST' && payload) {
      options.body = JSON.stringify(payload);
    }

    // Create timeout promise
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error(`Request to ${endpoint} timed out after ${timeoutMs}ms`)), timeoutMs);
    });

    // Race between fetch and timeout
    const response = await Promise.race([
      fetch(url.toString(), options),
      timeoutPromise
    ]) as Response;

    const data = await response.json();

    if (data.success) {
      return { success: true, data: data.data };
    } else {
      return {
        success: false,
        error: data.errors?.error_message || 'API request failed',
        status_code: data.status_code
      };
    }
  } catch (error) {
    console.error(`HQ Rental API Error [${endpoint}]:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      endpoint
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

    // Map locations and vehicle class
    const pickupLocationId = getLocationId(formData.pickupLocation);
    const returnLocationId = getLocationId(formData.pickupLocation); // Same as pickup for now
    const vehicleClassId = getVehicleClassId(formData.vehicleGroup);

    // ============================================
    // STEP 1 & 2: Validate Dates and Get Available Vehicle Classes
    // ============================================
    console.log('Step 1-2: Validating dates and checking vehicle availability...');

    const datesValidation = await callHQRentalAPI('car-rental/reservations/dates', 'POST', {
      brand_id: brandId,
      pick_up_date: formData.pickupDate,
      pick_up_time: formData.pickupTime,
      return_date: formData.returnDate,
      return_time: formData.returnTime,
      pick_up_location: pickupLocationId,
      return_location: returnLocationId
    });

    if (!datesValidation.success) {
      console.error('STEP 1-2 FAILED - Dates validation:', datesValidation.error);
      return NextResponse.json(
        {
          success: false,
          error: `Step 1-2 Failed: ${datesValidation.error || 'Invalid dates or location'}`,
          step: 'dates_validation'
        },
        { status: 400 }
      );
    }

    // Debug: Log the full response
    console.log('Dates validation response:', JSON.stringify(datesValidation.data, null, 2));

    // Check if selected vehicle class is available
    const availableClasses = datesValidation.data?.applicable_classes || [];
    console.log('Available vehicle classes:', availableClasses);
    console.log('Looking for vehicle class ID:', vehicleClassId);

    const selectedClass = availableClasses.find((c: any) => String(c.vehicle_class_id) === vehicleClassId);
    console.log('Selected class found:', selectedClass ? 'YES' : 'NO');

    if (!selectedClass) {
      console.error('Vehicle class not available. Available IDs:', availableClasses.map((c: any) => c.vehicle_class_id));
      return NextResponse.json(
        {
          success: false,
          error: 'The selected vehicle class is not available for these dates. Please try different dates or a different vehicle.'
        },
        { status: 400 }
      );
    }

    // ============================================
    // STEP 3 & 4: Get Additional Charges and Calculate Price
    // ============================================
    console.log('Step 3-4: Getting additional charges and calculating price...');

    const additionalChargesIds = getEnhancementIds(formData.selectedEnhancements);

    const priceCalculation = await callHQRentalAPI('car-rental/reservations/additional-charges', 'POST', {
      brand_id: brandId,
      pick_up_date: formData.pickupDate,
      pick_up_time: formData.pickupTime,
      return_date: formData.returnDate,
      return_time: formData.returnTime,
      pick_up_location: pickupLocationId,
      return_location: returnLocationId,
      vehicle_class_id: vehicleClassId,
      additional_charges: additionalChargesIds
    });

    if (!priceCalculation.success) {
      console.warn('Price calculation warning:', priceCalculation.error);
      // Continue anyway - price calculation is informational
    }

    // ============================================
    // STEP 5 & 6: Create Customer
    // ============================================
    console.log('Step 5-6: Creating customer...');

    const customerPayload = {
      brand_id: brandId,
      pick_up_date: formData.pickupDate,
      pick_up_time: formData.pickupTime,
      return_date: formData.returnDate,
      return_time: formData.returnTime,
      pick_up_location: pickupLocationId,
      return_location: returnLocationId,
      vehicle_class_id: vehicleClassId,
      contact_entity: 'person',
      field_2: formData.firstName,       // First Name
      field_3: formData.lastName,        // Last Name
      field_9: formData.email,           // Email
      field_8: formData.phone,           // Phone Number
      field_15: formData.birthdate,      // Birthdate
      field_254: formData.driversLicense, // Driver License Number
      field_256: formData.licenseExpiration, // License Expiration
      field_193: formData.street,        // Street Address
      field_194: '',                     // Street Address 2 (optional)
      field_195: formData.city,          // City
      field_196: formData.state,         // State
      field_198: formData.zip,           // Zip Code
      field_62: formData.country,        // Country (ISO code)
      field_273: '',                     // Nationality (optional)
      field_274: '',                     // Passport (optional)
      field_6: ''                        // Website (optional)
    };

    const customerResult = await callHQRentalAPI('car-rental/reservations/customer', 'POST', customerPayload);

    if (!customerResult.success) {
      console.error('STEP 5-6 FAILED - Customer creation:', customerResult.error);
      return NextResponse.json(
        {
          success: false,
          error: `Step 5-6 Failed: ${customerResult.error || 'Failed to create customer'}`,
          step: 'customer_creation',
          details: 'This may be caused by duplicate customer email or invalid data'
        },
        { status: 400 }
      );
    }

    const customerId = customerResult.data?.customer?.id;
    if (!customerId) {
      console.error('STEP 5-6 FAILED - Customer ID not returned');
      return NextResponse.json(
        {
          success: false,
          error: 'Step 5-6 Failed: Customer created but ID not returned',
          step: 'customer_creation'
        },
        { status: 500 }
      );
    }

    // ============================================
    // STEP 7: Upload Driver License (Skip for now - can add later)
    // ============================================
    console.log('Step 7: Skipping driver license upload (optional)');

    // ============================================
    // STEP 8: Confirm Reservation
    // ============================================
    console.log('Step 8: Confirming reservation...');

    const confirmationPayload = {
      customer_id: customerId,
      brand_id: brandId,
      pick_up_date: formData.pickupDate,
      pick_up_time: formData.pickupTime,
      return_date: formData.returnDate,
      return_time: formData.returnTime,
      vehicle_class_id: vehicleClassId,
      pick_up_location: pickupLocationId,
      return_location: returnLocationId,
      additional_charges: additionalChargesIds
    };

    const reservationResult = await callHQRentalAPI('car-rental/reservations/confirm', 'POST', confirmationPayload);

    if (reservationResult.success) {
      console.log('✓ STEP 8 SUCCESS - Reservation created successfully!');
      console.log('Reservation data:', JSON.stringify(reservationResult.data, null, 2));
      return NextResponse.json({
        success: true,
        reservation: reservationResult.data,
        message: 'Reservation created successfully!'
      });
    } else {
      console.error('STEP 8 FAILED - Reservation confirmation:', reservationResult.error);
      return NextResponse.json(
        {
          success: false,
          error: `Step 8 Failed: ${reservationResult.error || 'Failed to create reservation'}`,
          step: 'reservation_confirmation'
        },
        { status: reservationResult.status_code || 500 }
      );
    }

  } catch (error) {
    console.error('Reservation API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error'
      },
      { status: 500 }
    );
  }
}
