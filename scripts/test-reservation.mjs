// Test script to verify HQ Rental integration works
// Run with: node scripts/test-reservation.mjs

import http from 'http';

const API_BASE = 'localhost';
const API_PORT = 3005;

// Test reservation data
const testReservation = {
  // Dates & Location
  pickupLocation: 'G.F.L Charles Airport',
  pickupDate: '2025-12-01',
  pickupTime: '10:00',
  returnDate: '2025-12-07',
  returnTime: '10:00',

  // Vehicle
  vehicleGroup: 'ECAR',

  // Customer Info
  firstName: 'John',
  lastName: 'Doe',
  email: 'test@example.com',
  phone: '+17584517885',
  country: 'US',
  driversLicense: 'DL123456789',
  birthdate: '1990-01-15',
  licenseExpiration: '2028-01-15',

  // Address
  street: '123 Main Street',
  city: 'Castries',
  state: 'Saint Lucia',
  zip: '00000',

  // Enhancements
  selectedEnhancements: ['gps', 'child-seat'],
  specialRequests: 'This is a test reservation'
};

function makeRequest(data) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);

    const options = {
      hostname: API_BASE,
      port: API_PORT,
      path: '/api/reservations',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = http.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          resolve({
            statusCode: res.statusCode,
            data: JSON.parse(responseData)
          });
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function testReservationCreation() {
  console.log('🧪 Testing HQ Rental Integration...\n');
  console.log('=' .repeat(80));
  console.log('\n📝 Test Reservation Data:');
  console.log('-'.repeat(80));
  console.log(`Customer: ${testReservation.firstName} ${testReservation.lastName}`);
  console.log(`Email: ${testReservation.email}`);
  console.log(`Vehicle: ${testReservation.vehicleGroup}`);
  console.log(`Pickup: ${testReservation.pickupLocation} on ${testReservation.pickupDate}`);
  console.log(`Return: ${testReservation.returnDate}`);
  console.log(`Enhancements: ${testReservation.selectedEnhancements.join(', ')}`);

  console.log('\n\n🚀 Sending request to API...\n');

  try {
    const response = await makeRequest(testReservation);

    console.log('📊 Response Status:', response.statusCode);
    console.log('-'.repeat(80));

    if (response.data.success) {
      console.log('\n✅ SUCCESS! Reservation created in HQ Rental!\n');
      console.log('📋 Full Response:');
      console.log('-'.repeat(80));
      console.log(JSON.stringify(response.data, null, 2));
      console.log('\n📧 Confirmation email sent to:', testReservation.email);
      console.log('\n' + '='.repeat(80));
      console.log('🎉 Integration test PASSED! Your HQ Rental connection works!');
    } else {
      console.log('\n❌ FAILED! Reservation was not created.\n');
      console.log('Error:', response.data.error);
      console.log('\nFull Response:');
      console.log(JSON.stringify(response.data, null, 2));
      console.log('\n' + '='.repeat(80));
      console.log('⚠️  Integration test FAILED. Check the error above.');
    }

  } catch (error) {
    console.log('\n❌ ERROR! Could not connect to API.\n');
    console.error('Error:', error.message);
    console.log('\n' + '='.repeat(80));
    console.log('⚠️  Make sure the dev server is running on http://localhost:3005');
  }
}

testReservationCreation();
