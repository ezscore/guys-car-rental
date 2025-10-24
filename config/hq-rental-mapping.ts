// HQ Rental API Mapping Configuration
// This maps your internal IDs to HQ Rental's system IDs

export const VEHICLE_CLASS_MAPPING: Record<string, string> = {
  // NOTE: HQ Rental currently only has one vehicle type (ID: 1 - "Car")
  // All vehicle groups are mapped to this type. You can create specific vehicle
  // classes in your HQ Rental dashboard and update these mappings later.
  'ECAR': '1', // Economy Car (4 Dr)
  'CCAR': '1', // Compact Car
  'ICAR': '1', // Midsize Car
  'SCAR': '1', // Fullsize Car
  'SFAR': '1', // Midsize Jeep
  'RFAR': '1', // Luxury Jeep
  'FGAR': '1', // Pickup Truck
  'FFAR': '1', // Large SUV
  'GFAR': '1', // Luxury Large SUV
  'MVAN': '1', // Minivan (Audi)
  'LCAR': '1', // Luxury Cars (e.g BMW)
};

export const LOCATION_MAPPING: Record<string, string> = {
  // Mapped to actual HQ Rental location IDs
  'G.F.L Charles Airport': '1', // George F. L. Charles Airport
  'Point Seraphine': '1', // Using Charles Airport as fallback (create in HQ Rental if needed)
  'Hewanorra International Airport': '2', // Hewanorra International Airport
  'La Place Carenage': '1', // Using Charles Airport as fallback (create in HQ Rental if needed)
};

export const ENHANCEMENT_MAPPING: Record<string, number> = {
  // Mapped to actual HQ Rental additional_charge IDs
  'gps': 8, // GPS Navigation (ID: 8 in HQ Rental)
  'child-seat': 5, // Child Safety Seat (ID: 5 in HQ Rental - "Child Seat")
  'additional-driver': 6, // Additional Driver (ID: 6 in HQ Rental)
  'insurance-premium': 3, // Premium Insurance (ID: 3 in HQ Rental - "CDW")
  'wifi': 0, // Mobile WiFi Hotspot (not found in HQ Rental - needs to be created)
};

// Helper functions
export function getVehicleClassId(vehicleGroup: string): string {
  const classId = VEHICLE_CLASS_MAPPING[vehicleGroup];
  if (!classId || classId.startsWith('PLACEHOLDER_')) {
    throw new Error(`Vehicle group ${vehicleGroup} not mapped to HQ Rental vehicle_class_id. Please update config/hq-rental-mapping.ts`);
  }
  return classId;
}

export function getLocationId(locationName: string): string {
  const locationId = LOCATION_MAPPING[locationName];
  if (!locationId || locationId.startsWith('PLACEHOLDER_')) {
    throw new Error(`Location ${locationName} not mapped to HQ Rental location ID. Please update config/hq-rental-mapping.ts`);
  }
  return locationId;
}

export function getEnhancementIds(enhancementIds: string[]): number[] {
  return enhancementIds
    .map(id => {
      const chargeId = ENHANCEMENT_MAPPING[id];
      if (chargeId === 0) {
        console.warn(`Enhancement ${id} not mapped to HQ Rental charge ID. Skipping.`);
        return null;
      }
      return chargeId;
    })
    .filter((id): id is number => id !== null);
}
