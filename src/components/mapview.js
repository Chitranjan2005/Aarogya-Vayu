// import React,{useEffect,useRef} from "react";
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// delete L.Icon.Default.prototype._get;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
//   iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
//   shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
// });
// const MapView =({location ,latitude,longitude}) =>{
//     const mapinstance =useRef(null);
//     const marker =useRef(null);
//     const mapcontainer =useRef(null);
//     useEffect(()=>{
//         if (typeof L ==='undefined'|| !mapcontainer.current) {
//             console.warn("Leaflet 'L' not found");
//             return;
//         }
//         if (!mapinstance.current) {
//             const coords=(latitude !== null && longitude !== null)?[latitude,longitude]:[22.3511148, 78.6677428];// Center of India
//             const zoom=(latitude !==null && longitude !== null)? 13:5;// Zoom out if default

//             mapinstance.current =L.map(mapcontainer.current).setView(coords,zoom);
//             L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
//                  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             }).addTo(mapinstance.current);
//         }
//         if (latitude !==null && longitude !== null) {
//             const coord=[latitude,longitude];
//             mapinstance.current.setView(coord,13);
//             if (marker.current) {
//                 marker.current.setLatLng(coord);
//             }else{
//                 marker.current=L.marker(coord).addTo(mapcontainer.current).bindPopup(`<b>${location||'Your Location'}</b>`).openPopup();
//             }
//         }else{
//             if (marker.current) {
//                 mapinstance.current.removeLayer(marker.current);
//                 marker.current= null;
//             }
//             if (mapinstance.current) {
//                 mapinstance.current.setView([22.3511148, 78.6677428],5)// Center of India, zoomed out
//             }
//         }
//         return()=>{
//             if (mapinstance.current) {
//                 mapinstance.current.remove();
//                 mapinstance.current =null;
//             }
//         };
//     },[latitude,longitude,location]);
    
//     return(
//         <div className="map-container-wrapper mt-8 rounded-lg shadow-lg overflow-hidden">
//             <div id="map-container" ref={mapcontainer} className="w-full h-[300px] md:h-[500px] bg=gray-200 dark:bg-gray-700 transition-colors duration-300">
//                 {(!latitude||longitude)&&(
//                     <p className="text-center text-gray-500 dark:text-gray-400 p-4">Map not available. Please allow location access or search for a city.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default MapView;