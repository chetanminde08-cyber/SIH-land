import { useEffect, useRef } from 'react'; import { MapContainer, TileLayer } from 'react-leaflet'; import L from 'leaflet'; import '@geoman-io/leaflet-geoman-free';
export default function MapSelector({ center, onPolygon }) { const mapRef=useRef(); const layerRef=useRef();
 useEffect(()=>{ const map=mapRef.current; if(!map)return; map.setView(center,14); },[center]);
 const ready=map=>{ mapRef.current=map; map.pm.addControls({ position:'topright', drawMarker:false,drawCircle:false,drawCircleMarker:false,drawText:false,drawPolyline:false,drawRectangle:false,cutPolygon:false,rotateMode:false }); const update=e=>{ if(layerRef.current && layerRef.current!==e.layer) map.removeLayer(layerRef.current); layerRef.current=e.layer; const latlngs=e.layer.getLatLngs()[0]; onPolygon(latlngs); }; map.on('pm:create',update); map.on('pm:edit',update); map.on('pm:remove',()=>onPolygon(null)); };
 return <MapContainer center={center} zoom={13} className="map" whenReady={({target})=>ready(target)}><TileLayer attribution="© OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/></MapContainer>;
}
