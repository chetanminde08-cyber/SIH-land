import axios from 'axios'; import { distanceKm } from '../utils/geoCalculator.js';
const categories = { hospital: 'Hospital', school: 'School', marketplace: 'Market', railway: 'Railway station', highway: 'Major road', water: 'Water body' };
export async function getInfrastructure(lat, lng, radiusKm = 5) {
 const query = `[out:json][timeout:20];(nwr[amenity=hospital](around:${radiusKm*1000},${lat},${lng});nwr[amenity=school](around:${radiusKm*1000},${lat},${lng});nwr[amenity=marketplace](around:${radiusKm*1000},${lat},${lng});nwr[railway=station](around:${radiusKm*1000},${lat},${lng});way[highway~"trunk|primary"](around:${radiusKm*1000},${lat},${lng});nwr[natural=water](around:${radiusKm*1000},${lat},${lng}););out center;`;
 const endpoints = [process.env.OVERPASS_URL, 'https://overpass-api.de/api/interpreter', 'https://overpass.kumi.systems/api/interpreter', 'https://overpass.private.coffee/api/interpreter'].filter(Boolean);
 let response, lastError;
 for (const endpoint of endpoints) { try { response = await axios.post(endpoint, query, { headers: { 'Content-Type': 'text/plain' }, timeout: 18000 }); break; } catch (error) { lastError = error; } }
 if (!response) throw new Error(`OpenStreetMap infrastructure request unavailable: ${lastError?.code || 'service error'}`);
 const { data } = response;
 const nearest = {}; const features = [];
 for (const el of data.elements || []) { const p = [el.lon ?? el.center?.lon, el.lat ?? el.center?.lat]; if (!Number.isFinite(p[0])) continue; const tags = el.tags || {}; const key = tags.amenity === 'hospital' ? 'hospital' : tags.amenity === 'school' ? 'school' : tags.amenity === 'marketplace' ? 'marketplace' : tags.railway === 'station' ? 'railway' : tags.highway ? 'highway' : tags.natural === 'water' ? 'water' : null; if (!key) continue; const distance = distanceKm([lng,lat], p); if (!nearest[key] || distance < nearest[key].distance) nearest[key] = { name: tags.name || categories[key], distance: +distance.toFixed(1), lat:p[1], lng:p[0], type:key }; }
 Object.values(nearest).forEach(x => features.push(x)); return { nearby: features, source: 'OpenStreetMap via Overpass', confidence: features.length ? 'High' : 'Medium', available: true };
}
