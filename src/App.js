import React, { useState, useEffect, useCallback } from 'react';
import './assets/styles/main.css';
import Header from './components/header';
import SearchBar from './components/searchbar';
import AQIDisplay from './components/aqidisplay';
import MapView from './components/mapview';
import Footer from './components/footer';
import useGeolocation from './hooks/livelocation';
import 'leaflet/dist/leaflet.css';


function App() {
  const { address } = useGeolocation();

  

  const[darkmode, setdarkmode] = useState(false);

  const toggledarkmode =() =>{
    setdarkmode(prevMode => !prevMode);
  };
  const [currentlocation, setcurrentlocation] = useState('');
  const[aqidata, setaqidata] = useState(null);

   const handlesearch = useCallback((location) => {
    console.log("DEBUG: handleSearch called with location:", location);
    setcurrentlocation(location);
    setaqidata(null); 

    setTimeout(() => {
      const simulateddata = {
        value: Math.floor(Math.random() * 400) + 50,
        pm25: (Math.random() * 100).toFixed(1),
        pm10: (Math.random() * 150).toFixed(1),
        no2: (Math.random() * 50).toFixed(1),
        so2: (Math.random() * 30).toFixed(1),
        o3: (Math.random() * 60).toFixed(1),
        co: (Math.random() * 5).toFixed(1),
        lastUpdated: new Date().toLocaleString(),
      };
      setaqidata(simulateddata);

    }, 1000);
  },[setcurrentlocation,setaqidata]);

const {locationLoading,latitude,longitude} = useGeolocation(handlesearch);
   return (
   <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 font-inter ${darkmode ? 'dark' : ''}`}>
      <Header darkmode={darkmode} toggledarkmode={toggledarkmode}/>
       <main className="container mx-auto p-4">
         {locationLoading && (
          <div className="text-center text-lg text-gray-600 dark:text-gray-300 mt-4">Getting your current location...</div>
        )}
        <SearchBar onSearch={handlesearch} />
        {!locationLoading && (
          <>
            {console.log("DEBUG: AQIDisplay receiving location:", currentlocation, "and aqiData:", aqidata)}
            <AQIDisplay location={currentlocation} aqidata={aqidata} />
             <div>
      <h1>My Leaflet Map</h1>
      <MapView />
    </div>
    <div>
      <h2>📍 Your Current Address</h2>
      <p>{address || "Fetching your address..."}</p>
    </div>

            
          </>
        )}
      </main>
      <Footer/>
    </div>
  );
  
};

export default App;
