const earth = 6378137;
const rad = d => d * Math.PI / 180;
export function validatePolygon(geometry) {
  const ring = geometry?.coordinates?.[0];
  if (geometry?.type !== 'Polygon' || !Array.isArray(ring) || ring.length < 4) throw Object.assign(new Error('Draw a valid land boundary with at least three points.'), { status: 400 });
  if (!ring.every(([lng, lat]) => Number.isFinite(lng) && Number.isFinite(lat) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180)) throw Object.assign(new Error('The land boundary contains invalid coordinates.'), { status: 400 });
  return ring;
}
export function polygonAreaHectares(geometry) {
  const ring = validatePolygon(geometry); let total = 0;
  for (let i = 0; i < ring.length - 1; i++) { const [x1, y1] = ring[i], [x2, y2] = ring[i + 1]; total += rad(x2 - x1) * (2 + Math.sin(rad(y1)) + Math.sin(rad(y2))); }
  return Math.abs(total * earth * earth / 2) / 10000;
}
export function centroid(geometry) { const ring = validatePolygon(geometry); const points = ring.slice(0, -1); return [points.reduce((s, p) => s + p[0], 0) / points.length, points.reduce((s, p) => s + p[1], 0) / points.length]; }
export const distanceKm = (a, b) => { const dLat = rad(b[1]-a[1]), dLng = rad(b[0]-a[0]); const h = Math.sin(dLat/2)**2 + Math.cos(rad(a[1])) * Math.cos(rad(b[1])) * Math.sin(dLng/2)**2; return 2 * 6371 * Math.asin(Math.sqrt(h)); };
