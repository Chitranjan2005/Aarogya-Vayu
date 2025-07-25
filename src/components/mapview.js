import React, { useEffect, useRef } from 'react';
import useGeolocation from '../hooks/livelocation';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
});

const MapView = () => {
  const mapRef = useRef(null);
  const { lat, lon, address } = useGeolocation();

  useEffect(() => {
    if (lat && lon && !mapRef.current) {
      const mapElement = L.DomUtil.get('map');
      if (mapElement && mapElement._leaflet_id) {
        mapElement._leaflet_id = null;
      }

      mapRef.current = L.map('map').setView([lat, lon], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapRef.current);

      const marker = L.marker([lat, lon]).addTo(mapRef.current);
      marker.bindPopup(address || "Your Location").openPopup();
    }
  }, [lat, lon, address]);

  return <div id="map" style={{ height: '500px', width: '100%' }}>
  </div>;
};

export default MapView;
