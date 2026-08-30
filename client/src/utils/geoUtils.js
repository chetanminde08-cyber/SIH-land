export const areaFromLatLngs = points => { const r=6378137; let sum=0; for(let i=0;i<points.length;i++){ const a=points[i],b=points[(i+1)%points.length]; sum+=(b.lng-a.lng)*(2+Math.sin(a.lat*Math.PI/180)+Math.sin(b.lat*Math.PI/180)); } return Math.abs(sum*r*r/2)/10000; };
export const formatArea = h => `${(h*2.47105).toFixed(2)} acres · ${h.toFixed(2)} hectares`;
