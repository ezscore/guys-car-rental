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

    req.on('error', reject);
    req.end();
  });
}

async function main() {
  console.log('Checking vehicles in HQ Rental...\n');

  const response = await fetchData('fleets/vehicles?per_page=100');
  const vehicles = response.fleets_vehicles || [];

  console.log('Total vehicles found:', vehicles.length);
  console.log('');

  if (vehicles.length > 0) {
    console.log('Vehicles:');
    const toShow = Math.min(10, vehicles.length);
    for (let i = 0; i < toShow; i++) {
      const v = vehicles[i];
      console.log(`  - ${v.license_plate} (Type: ${v.vehicle_type_id}, Status: ${v.status})`);
    }
    if (vehicles.length > 10) {
      console.log(`  ... and ${vehicles.length - 10} more`);
    }
  } else {
    console.log('No vehicles found!');
  }
}

main();
