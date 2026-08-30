import axios from 'axios';
const kmPerDegree = 111.32;
export async function getTerrain(lat, lng) {
  const delta = 0.003; const locations = [[lat,lng],[lat+delta,lng],[lat-delta,lng],[lat,lng+delta],[lat,lng-delta]].map(p=>p.join(',')).join('|');
  const { data } = await axios.get('https://api.open-elevation.com/api/v1/lookup', { params: { locations }, timeout: 15000 }); const values = (data.results || []).map(x=>x.elevation).filter(Number.isFinite); if (values.length < 2) throw new Error('Elevation samples unavailable');
  const elevation = values[0]; const variation = Math.max(...values)-Math.min(...values); const sampleDistance = delta*kmPerDegree*1000; const slope = +(Math.atan(variation/sampleDistance)*180/Math.PI).toFixed(1); const terrain = slope < 3 ? 'Flat' : slope < 8 ? 'Gently sloping' : slope < 15 ? 'Sloping' : 'Steep';
  return { elevation: Math.round(elevation), slope, terrain, elevationRange: `${Math.round(Math.min(...values))}–${Math.round(Math.max(...values))} m`, source: 'Open-Elevation (five-point terrain sample)', confidence: 'Medium', available:true };
}
