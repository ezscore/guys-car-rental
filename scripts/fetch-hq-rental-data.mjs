// Script to fetch HQ Rental data for mapping configuration
// Run with: node scripts/fetch-hq-rental-data.js

import https from 'https';

const API_BASE = 'api.caagcrm.com';
const API_PATH = '/api/';
const TENANT_TOKEN = 'gSFgYpyygBDSzpQQRaKms5z6D0yITcp9knhGOxtk7RXUtrF7vf';
const USER_TOKEN = 'y1tET60zbPUlJBBz70Hyfh79K7DHsL3tAAy084bw4mOjhosV6e';

const authToken = Buffer.from(`${TENANT_TOKEN}:${USER_TOKEN}`).toString('base64');

function fetchData(endpoint) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: API_BASE,
      path: `${API_PATH}${endpoint}`,
      method: 'GET',
      headers: {
        'Authorization': `Basic ${authToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

async function main() {
  console.log('Fetching HQ Rental Data...\n');
  console.log('='.repeat(80));

  // Fetch Vehicle Types
  console.log('\n📦 VEHICLE TYPES / CLASSES:');
  console.log('-'.repeat(80));
  try {
    const response = await fetchData('fleets/vehicle-types');
    const vehicleTypes = response.fleets_vehicle_types || [];
    if (vehicleTypes.length > 0) {
      vehicleTypes.forEach(vt => {
        console.log(`ID: ${vt.id} | Label: ${vt.label} | Active: ${vt.active}`);
      });
    } else {
      console.log('No vehicle types found');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }

  // Fetch Locations
  console.log('\n\n📍 LOCATIONS:');
  console.log('-'.repeat(80));
  try {
    const response = await fetchData('fleets/locations');
    const locations = response.fleets_locations || [];
    if (locations.length > 0) {
      locations.forEach(loc => {
        console.log(`ID: ${loc.id} | Name: ${loc.name} | Is Airport: ${loc.is_airport} | Active: ${loc.active}`);
      });
    } else {
      console.log('No locations found');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }

  // Fetch Additional Charges
  console.log('\n\n💰 ADDITIONAL CHARGES:');
  console.log('-'.repeat(80));
  try {
    const response = await fetchData('fleets/additional-charges');
    const charges = response.fleets_additional_charges || [];
    if (charges.length > 0) {
      charges.forEach(charge => {
        console.log(`ID: ${charge.id} | Name: ${charge.name} | Type: ${charge.charge_type} | Mandatory: ${charge.mandatory?.length > 0 ? 'Yes' : 'No'}`);
      });
    } else {
      console.log('No additional charges found');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }

  console.log('\n' + '='.repeat(80));
  console.log('\n✅ Done! Use these IDs to update config/hq-rental-mapping.ts');
}

main();
