import { useState, useEffect } from 'react';

const useGeolocation = () => {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;
        setLat(latitude);
        setLon(longitude);

        console.log(latitude, longitude);

        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude};`

        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            setAddress(data.display_name);
            console.log(data.display_name);
          });
      },
      (err) => {
        console.error("Geolocation error:", err);
      }
    );
  }, []);

  return { lat, lon, address };
};

export default useGeolocation;