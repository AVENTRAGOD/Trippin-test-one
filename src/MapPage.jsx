import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Navigation } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import MarkerClusterGroup from 'react-leaflet-cluster';
import RoutingControl from './RoutingControl';
import { provinces, districts } from './utils/sriLankaRegions';

// Fix for default leaflet marker icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons
const hospitalIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const touristIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const policeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const transportIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const getMarkerIcon = (feature) => {
  const props = feature.properties || {};
  if (props.amenity === 'hospital' || props.healthcare === 'hospital') return hospitalIcon;
  if (props.amenity === 'police') return policeIcon;
  if (props.amenity === 'bus_station' || props.public_transport === 'station' || props.railway === 'station') return transportIcon;
  return touristIcon;
};

function LocationMarker({ userLocation, setUserLocation }) {
  useMapEvents({
    click(e) {
      setUserLocation([e.latlng.lat, e.latlng.lng]);
    },
  });

  return userLocation === null ? null : (
    <Marker position={userLocation} icon={userIcon}>
      <Popup>Your Location (Start)</Popup>
    </Marker>
  );
}

function FlyToMap({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center && zoom) {
      map.flyTo(center, zoom, { duration: 1.5 });
    }
  }, [center, zoom, map]);
  return null;
}

export default function MapPage() {
  const [hospitals, setHospitals] = useState(null);
  const [tourists, setTourists] = useState(null);
  const [attractions, setAttractions] = useState(null);
  
  const [userLocation, setUserLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [distance, setDistance] = useState(null);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [mapCenter, setMapCenter] = useState([7.8731, 80.7718]);
  const [mapZoom, setMapZoom] = useState(7);

  useEffect(() => {
    // Fetch GeoJSON data
    fetch('/hospital.geojson').then(r => r.json()).then(data => setHospitals(data));
    fetch('/tourist.geojson').then(r => r.json()).then(data => setTourists(data));
    fetch('/toursit_attactions.geojson').then(r => r.json()).then(data => setAttractions(data));
  }, []);

  const handleProvinceChange = (e) => {
    const provId = e.target.value;
    setSelectedProvince(provId);
    setSelectedDistrict(""); // Reset district
    if (provId) {
      const prov = provinces.find(p => p.id === provId);
      if (prov) {
        setMapCenter(prov.center);
        setMapZoom(prov.zoom);
      }
    } else {
      setMapCenter([7.8731, 80.7718]);
      setMapZoom(7);
    }
  };

  const handleDistrictChange = (e) => {
    const distId = e.target.value;
    setSelectedDistrict(distId);
    if (distId) {
      const dist = districts.find(d => d.id === distId);
      if (dist) {
        setMapCenter(dist.center);
        setMapZoom(dist.zoom);
      }
    } else if (selectedProvince) {
      const prov = provinces.find(p => p.id === selectedProvince);
      if (prov) {
        setMapCenter(prov.center);
        setMapZoom(prov.zoom);
      }
    }
  };

  const handleGetCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setMapCenter([latitude, longitude]);
          setMapZoom(13); // Zoom in closer for user location
        },
        (error) => {
          console.error("Error getting location:", error);
          let msg = "Unable to get your location.";
          if (error.code === error.PERMISSION_DENIED) {
            msg += " Please enable location permissions in your browser.";
          }
          alert(msg);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const filteredDistricts = selectedProvince 
    ? districts.filter(d => d.province === selectedProvince) 
    : districts;

  const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.name) {
      layer.bindPopup(() => {
        const div = document.createElement('div');
        div.innerHTML = `
          <strong>${feature.properties.name}</strong><br/>
          <button style="margin-top: 5px; padding: 5px 10px; background: #F05442; color: white; border: none; cursor: pointer; border-radius: 4px;">Navigate Here</button>
        `;
        const btn = div.querySelector('button');
        btn.onclick = () => {
          if (feature.geometry.type === 'Point') {
            const coords = feature.geometry.coordinates;
            // GeoJSON coordinates are [lng, lat], Leaflet wants [lat, lng]
            setDestination([coords[1], coords[0]]);
            setDistance(null); // Reset until calculated
          }
        };
        return div;
      });
    }
  };

  return (
    <div className="relative w-full h-screen bg-[#E5E3DF] overflow-hidden">
      
      {/* Floating UI Overlay */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-[1000] flex flex-col gap-4 max-w-[340px] w-full pointer-events-none">
        
        {/* Navbar Card */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 flex justify-between items-center pointer-events-auto border border-white/20 transition-all duration-300 hover:shadow-2xl">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="h-8 object-contain drop-shadow-sm" />
            <span className="font-playfair font-bold text-xl text-[#2A2B31] tracking-tight">Sri Lanka Map</span>
          </Link>
          <Link to="/" className="text-[#4A4D55] hover:text-[#F05442] font-inter text-sm font-semibold transition-colors flex items-center gap-1 bg-gray-100/50 px-3 py-1.5 rounded-full">
            &larr; Home
          </Link>
        </div>

        {/* Filter & Routing Card */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 pointer-events-auto border border-white/20 transition-all duration-300 hover:shadow-2xl">
          <h3 className="font-playfair font-bold text-2xl text-[#2A2B31] mb-5">Explore Regions</h3>
          
          <div className="flex flex-col gap-4">
            <div className="relative">
              <select 
                value={selectedProvince} 
                onChange={handleProvinceChange}
                className="w-full p-3.5 bg-white border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#F05442]/50 focus:border-[#F05442] text-[#33353D] font-inter text-sm shadow-sm transition-all cursor-pointer font-medium"
              >
                <option value="">All Provinces</option>
                {provinces.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>
            
            <div className="relative">
              <select 
                value={selectedDistrict} 
                onChange={handleDistrictChange}
                className="w-full p-3.5 bg-white border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#F05442]/50 focus:border-[#F05442] text-[#33353D] font-inter text-sm shadow-sm transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                disabled={!selectedProvince}
              >
                <option value="">All Districts</option>
                {filteredDistricts.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>
          </div>

          {(userLocation || destination) && (
            <div className="mt-6 pt-5 border-t border-gray-200/50">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 bg-gray-50/80 p-2.5 rounded-lg border border-gray-100">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm"></div>
                  <span className="text-[11px] font-inter text-gray-500 uppercase tracking-widest font-bold">Start</span>
                  <div className="flex items-center gap-2 ml-auto">
                    <button 
                      onClick={handleGetCurrentLocation}
                      title="Use current location"
                      className="p-1.5 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors border border-blue-100 flex items-center justify-center"
                    >
                      <Navigation size={14} fill="currentColor" />
                    </button>
                    <span className="text-sm font-inter font-semibold text-[#2A2B31]">{userLocation ? 'Set' : 'Select on map'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-gray-50/80 p-2.5 rounded-lg border border-gray-100">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F05442] shadow-sm"></div>
                  <span className="text-[11px] font-inter text-gray-500 uppercase tracking-widest font-bold">Destination</span>
                  <span className="text-sm font-inter font-semibold text-[#2A2B31] ml-auto">{destination ? 'Selected' : 'Click a marker'}</span>
                </div>
                
                {distance && (
                  <div className="mt-2 bg-gradient-to-r from-[#F05442]/10 to-[#F05442]/5 rounded-xl p-4 flex justify-between items-center border border-[#F05442]/20">
                     <span className="text-sm font-inter font-bold text-[#F05442] uppercase tracking-wide">Distance</span>
                     <span className="font-playfair font-bold text-2xl text-[#F05442] drop-shadow-sm">{distance} km</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Map Guide / Legend */}
          <div className="mt-6 pt-5 border-t border-gray-200/50">
            <h4 className="text-[10px] font-inter font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Map Guide</h4>
            <div className="grid grid-cols-2 gap-y-3 gap-x-2">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                <span className="text-[11px] font-inter text-[#4A4D55] font-medium">Attractions</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <span className="text-[11px] font-inter text-[#4A4D55] font-medium">Hospitals</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-violet-500"></div>
                <span className="text-[11px] font-inter text-[#4A4D55] font-medium">Police</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>
                <span className="text-[11px] font-inter text-[#4A4D55] font-medium">Transport</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Helper text bubble */}
        <div className="bg-[#2A2B31]/90 backdrop-blur-md rounded-xl shadow-lg p-3 pointer-events-auto border border-white/10 hidden sm:block">
          <p className="text-xs font-inter text-white/90 text-center leading-relaxed">
            Click anywhere to set starting location.<br/>Click a marker to navigate.
          </p>
        </div>
      </div>

      {/* Fullscreen Map */}
      <div className="absolute inset-0 z-0">
        <MapContainer 
          center={[7.8731, 80.7718]} 
          zoom={7} 
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          
          <FlyToMap center={mapCenter} zoom={mapZoom} />
          <LocationMarker userLocation={userLocation} setUserLocation={setUserLocation} />

          <MarkerClusterGroup chunkedLoading>
            {hospitals && (
              <GeoJSON 
                data={hospitals} 
                pointToLayer={(feature, latlng) => L.marker(latlng, { icon: getMarkerIcon(feature) })}
                onEachFeature={onEachFeature}
              />
            )}
            
            {tourists && (
              <GeoJSON 
                data={tourists} 
                pointToLayer={(feature, latlng) => L.marker(latlng, { icon: getMarkerIcon(feature) })}
                onEachFeature={onEachFeature}
              />
            )}

            {attractions && (
              <GeoJSON 
                data={attractions} 
                pointToLayer={(feature, latlng) => L.marker(latlng, { icon: getMarkerIcon(feature) })}
                onEachFeature={onEachFeature}
              />
            )}
          </MarkerClusterGroup>

          {userLocation && destination && (
            <RoutingControl 
              startPos={userLocation} 
              endPos={destination} 
              onDistanceCalculated={setDistance} 
            />
          )}
        </MapContainer>
      </div>
    </div>
  );
}
