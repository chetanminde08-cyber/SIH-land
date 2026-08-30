const clamp = n => Math.max(0, Math.min(100, Math.round(n)));
const lookup = (items, type) => items?.find(x => x.type === type)?.distance;
const closeScore = (distance, ideal = 2) => distance == null ? 45 : clamp(100 - (distance / ideal) * 35);
export function makeRecommendations({ areaHectares, climate, terrain, infrastructure, water, zoning, currentUse }) {
 const n = infrastructure.nearby || []; const road = lookup(n,'highway'), market = lookup(n,'marketplace'), railway = lookup(n,'railway');
 const sun = clamp(((climate.dailySunHours || 4) - 2.5) * 15); const flat = clamp(100 - (terrain.slope || 5) * 7); const size = clamp(25 + Math.min(areaHectares, 20) * 4);
 const solar = clamp(sun*.35 + flat*.2 + size*.2 + closeScore(road,5)*.1 + (water.availability === 'Limited' ? 90 : 70)*.1 + (zoning.category === 'Unknown' ? 55 : 75)*.05);
 const warehouse = clamp(closeScore(road,1)*.3 + closeScore(market,4)*.2 + closeScore(railway,8)*.15 + size*.15 + 58*.2);
 const agriculture = clamp((water.availability === 'Good' ? 90 : water.availability === 'Moderate' ? 70 : 48)*.3 + (climate.weeklyRainfall >= 5 ? 78 : 63)*.2 + flat*.15 + 72*.2 + closeScore(market,8)*.15);
 const residential = clamp(closeScore(road,2)*.2 + closeScore(lookup(n,'hospital'),5)*.15 + closeScore(lookup(n,'school'),4)*.15 + closeScore(market,5)*.15 + flat*.15 + 52*.2);
 const commercial = clamp(closeScore(road,1.5)*.27 + closeScore(market,3)*.25 + size*.13 + 55*.2 + flat*.15);
 const industrial = clamp(closeScore(road,2)*.3 + closeScore(railway,8)*.18 + size*.17 + flat*.15 + 50*.2);
 const recreation = clamp((water.nearbyWater ? 85 : 52)*.2 + flat*.2 + 65*.25 + closeScore(road,5)*.15 + 55*.2);
 const community = clamp(closeScore(road,3)*.2 + closeScore(lookup(n,'hospital'),5)*.15 + closeScore(lookup(n,'school'),4)*.15 + size*.15 + flat*.15 + 58*.2);
 const records = [
  ['Solar Farm',solar,['strong solar resource','mostly flat terrain', areaHectares >= 2 ? 'adequate parcel size' : 'compact site footprint']],
  ['Warehouse / Logistics',warehouse,['road access', market ? 'market proximity' : 'local connectivity data', railway ? 'rail reach' : 'site access']],
  ['Agriculture',agriculture,['water availability', 'climate conditions', 'market access']],
  ['Residential / Mixed Use',residential,['local services proximity','road connectivity','flat terrain']],
  ['Commercial',commercial,['road connectivity','market proximity','site accessibility']],
  ['Industrial',industrial,['transport connectivity','site area','flat terrain']],
  ['Recreation / Eco-Tourism',recreation,['site environment','access','terrain']],
  ['Community Infrastructure',community,['service access','road connectivity','site area']]
 ].map(([use,score,reasons]) => ({ use, score, reasons, breakdown: { Location: use === 'Solar Farm' ? sun : closeScore(road,3), Infrastructure: use === 'Agriculture' ? closeScore(market,8) : closeScore(road,2), Water: water.availability === 'Good' ? 90 : water.availability === 'Moderate' ? 70 : 48, Sustainability: use === 'Solar Farm' ? 88 : use === 'Agriculture' ? 82 : 68, 'Site condition': flat } }));
 return records.sort((a,b) => b.score-a.score);
}
