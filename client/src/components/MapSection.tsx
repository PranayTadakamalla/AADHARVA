import React, { useEffect, useRef, useState } from "react";
import { SciFiCard } from "@/components/ui/sci-fi-card";
import { CyberButton } from "@/components/ui/cyber-button";
import { initMap } from "@/lib/maps";
import { apiRequest } from "@/lib/queryClient";

// Declare Google Maps types to avoid TypeScript errors
interface Window {
  google: any;
  initMap?: () => void;
  initGoogleMap?: () => void;
}

export default function MapSection() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [activeRegion, setActiveRegion] = useState("NORTH REGION");
  const [googleMapLoaded, setGoogleMapLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [heatmapInstance, setHeatmapInstance] = useState<any>(null);
  const [filters, setFilters] = useState({
    water: true,
    agriculture: true,
    education: true,
    health: true,
    climate: false,
  });

  useEffect(() => {
    const loadGoogleMaps = async () => {
      try {
        // Try to load Google Maps with API key from backend
        const response = await apiRequest({
          path: '/api/config/maps',
          method: 'GET'
        });
        
        // Check if response exists and has the apiKey property
        if (response && typeof response === 'object' && 'apiKey' in response) {
          // Load Google Maps script and initialize map when loaded
          const loadMapScript = () => {
            return new Promise<void>((resolve, reject) => {
              // Check if Google Maps is already loaded
              if (window.google && window.google.maps) {
                resolve();
                return;
              }
              
              // Create script element
              const script = document.createElement('script');
              script.src = `https://maps.googleapis.com/maps/api/js?key=${response.apiKey}&libraries=visualization`;
              script.async = true;
              script.defer = true;
              
              // Set up callbacks
              script.onload = () => resolve();
              script.onerror = () => {
                console.error('Error loading Google Maps script');
                reject(new Error('Failed to load Google Maps'));
              };
              
              // Add script to document
              document.head.appendChild(script);
            });
          };
          
          // Load the script then initialize the map
          await loadMapScript();
          
          // Now initialize the map once script is loaded
          if (window.google && window.google.maps && mapRef.current) {
            // Create map instance
            const map = new window.google.maps.Map(mapRef.current, {
              center: { lat: 20.5937, lng: 78.9629 }, // Center on India
              zoom: 5,
              styles: getMapStyles(),
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: false,
            });
            
            setMapInstance(map);
            setGoogleMapLoaded(true);
            
            // Add markers based on active filters
            addMarkers(map);
            
            // Create heatmap layer
            const heatmapData = getHeatmapData();
            const heatmap = new window.google.maps.visualization.HeatmapLayer({
              data: heatmapData,
              map: map,
              radius: 30,
              opacity: 0.7,
              gradient: [
                'rgba(0, 255, 255, 0)',
                'rgba(0, 255, 255, 1)',
                'rgba(0, 191, 255, 1)',
                'rgba(0, 127, 255, 1)',
                'rgba(0, 63, 255, 1)',
                'rgba(0, 0, 255, 1)',
              ]
            });
            
            setHeatmapInstance(heatmap);
          }
        } else {
          console.error('Google Maps API key not found, using fallback map');
          useFallbackMap();
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
        useFallbackMap();
      }
    };
    
    loadGoogleMaps();
    
    return () => {
      // No cleanup needed here as we're no longer using window.initGoogleMap
    };
  }, []);
  
  // Update markers when filters change
  useEffect(() => {
    if (googleMapLoaded && mapInstance) {
      // Clear existing markers
      if (mapInstance._markers) {
        mapInstance._markers.forEach((marker: any) => marker.setMap(null));
      }
      
      // Add new markers based on filters
      addMarkers(mapInstance);
    }
  }, [filters, googleMapLoaded, mapInstance]);
  
  // Update markers when region changes
  useEffect(() => {
    if (googleMapLoaded && mapInstance) {
      // Pan to region
      const regionCoords = getRegionCoordinates(activeRegion);
      mapInstance.panTo(regionCoords);
      mapInstance.setZoom(6);
      
      // Update heatmap data based on region
      if (heatmapInstance) {
        const heatmapData = getHeatmapData(activeRegion);
        heatmapInstance.setData(heatmapData);
      }
    }
  }, [activeRegion, googleMapLoaded, mapInstance]);
  
  // Use our fallback map implementation
  const useFallbackMap = () => {
    if (mapRef.current) {
      initMap(mapRef.current);
    }
  };
  
  // Add markers to the map
  const addMarkers = (map: any) => {
    // Skip if Google Maps is not loaded
    if (!window.google) return;
    
    // Initialize markers array if not exists
    if (!map._markers) {
      map._markers = [];
    }
    
    // Get filtered project data
    const projects = getProjectData().filter(project => 
      filters[project.type as keyof typeof filters]
    );
    
    // Create markers for each project
    projects.forEach(project => {
      if (project.region === activeRegion) {
        const marker = new window.google.maps.Marker({
          position: { lat: project.lat, lng: project.lng },
          map: map,
          title: project.name,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: getColorForType(project.type),
            fillOpacity: 0.8,
            strokeWeight: 2,
            strokeColor: getColorForType(project.type),
          }
        });
        
        // Add info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 10px; max-width: 200px;">
              <h3 style="color: #0affff; margin-bottom: 5px; font-weight: bold;">${project.name}</h3>
              <p style="font-size: 12px; margin-bottom: 5px;">${project.details}</p>
              <div style="font-size: 11px; color: #a0aec0;">
                <span>Type: ${project.type.charAt(0).toUpperCase() + project.type.slice(1)}</span>
              </div>
            </div>
          `
        });
        
        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
        
        map._markers.push(marker);
      }
    });
  };
  
  // Get color for project type
  const getColorForType = (type: string): string => {
    switch (type) {
      case 'water': return '#0affff'; 
      case 'agriculture': return '#f97316';
      case 'education': return '#7c3aed';
      case 'health': return '#10b981';
      case 'climate': return '#facc15';
      default: return '#0affff';
    }
  };
  
  // Get coordinates for a region
  const getRegionCoordinates = (region: string): {lat: number, lng: number} => {
    switch (region) {
      case 'NORTH REGION': return {lat: 28.7041, lng: 77.1025};
      case 'SOUTH REGION': return {lat: 13.0827, lng: 80.2707};
      case 'EAST REGION': return {lat: 22.5726, lng: 88.3639};
      case 'WEST REGION': return {lat: 19.0760, lng: 72.8777};
      default: return {lat: 20.5937, lng: 78.9629}; // Center of India
    }
  };
  
  // Get heatmap data
  const getHeatmapData = (region?: string): any[] => {
    // Skip if Google Maps is not loaded
    if (!window.google) return [];
    
    // Filter projects by region if specified
    const projects = getProjectData().filter(project => 
      !region || project.region === region
    );
    
    // Convert to heatmap data points
    return projects.map(project => ({
      location: new window.google.maps.LatLng(project.lat, project.lng),
      weight: project.intensity || 5
    }));
  };
  
  // Get project data
  const getProjectData = () => {
    return [
      { 
        name: "Rajgarh Water Purification", 
        lat: 28.7041, lng: 77.1025, 
        region: "NORTH REGION",
        type: "water",
        details: "Water purification facility serving 500 households",
        intensity: 8
      },
      { 
        name: "Jaisalmer Rainwater Capture", 
        lat: 27.0238, lng: 74.2179, 
        region: "NORTH REGION",
        type: "water",
        details: "Community rainwater harvesting system",
        intensity: 5
      },
      { 
        name: "Amritsar Smart Farming", 
        lat: 31.6340, lng: 74.8723, 
        region: "NORTH REGION",
        type: "agriculture",
        details: "IoT-enabled precision agriculture project",
        intensity: 7
      },
      { 
        name: "Lucknow Digital School", 
        lat: 26.8467, lng: 80.9462, 
        region: "NORTH REGION",
        type: "education",
        details: "Virtual classroom connecting 15 rural schools",
        intensity: 6
      },
      { 
        name: "Delhi Rural Health Initiative", 
        lat: 28.4162, lng: 77.5183, 
        region: "NORTH REGION",
        type: "health",
        details: "Mobile medical services for 12 villages",
        intensity: 9
      },
      { 
        name: "Chennai Water Management", 
        lat: 13.0827, lng: 80.2707, 
        region: "SOUTH REGION",
        type: "water",
        details: "Smart water distribution network",
        intensity: 7
      },
      { 
        name: "Kochi Sustainable Farming", 
        lat: 9.9312, lng: 76.2673, 
        region: "SOUTH REGION",
        type: "agriculture",
        details: "Organic farming training center",
        intensity: 6
      },
      { 
        name: "Hyderabad Solar Irrigation", 
        lat: 17.3850, lng: 78.4867, 
        region: "SOUTH REGION",
        type: "agriculture",
        details: "Solar-powered irrigation systems for small farms",
        intensity: 8
      },
      { 
        name: "Bangalore Rural Education Hub", 
        lat: 12.9716, lng: 77.5946, 
        region: "SOUTH REGION",
        type: "education",
        details: "Interactive learning center with satellite internet",
        intensity: 9
      },
      { 
        name: "Kochi Telemedicine Center", 
        lat: 10.1632, lng: 76.1951, 
        region: "SOUTH REGION",
        type: "health",
        details: "Remote healthcare services for coastal villages",
        intensity: 7
      },
      { 
        name: "Kolkata Water Treatment", 
        lat: 22.5726, lng: 88.3639, 
        region: "EAST REGION",
        type: "water",
        details: "Advanced filtration system for arsenic removal",
        intensity: 9
      },
      { 
        name: "Dhanbad Agriculture Tech", 
        lat: 23.7957, lng: 86.4304, 
        region: "EAST REGION",
        type: "agriculture",
        details: "Smart farming initiative with 200 farmers",
        intensity: 6
      },
      { 
        name: "Guwahati Digital Literacy", 
        lat: 26.1445, lng: 91.7362, 
        region: "EAST REGION",
        type: "education",
        details: "Mobile computer labs serving remote villages",
        intensity: 7
      },
      { 
        name: "Patna Rural Clinic", 
        lat: 25.5941, lng: 85.1376, 
        region: "EAST REGION",
        type: "health",
        details: "Primary healthcare facility with telemedicine capabilities",
        intensity: 8
      },
      { 
        name: "Mumbai Coastal Water", 
        lat: 19.0760, lng: 72.8777, 
        region: "WEST REGION",
        type: "water",
        details: "Desalination project for coastal communities",
        intensity: 8
      },
      { 
        name: "Ahmedabad Drip Irrigation", 
        lat: 23.0225, lng: 72.5714, 
        region: "WEST REGION",
        type: "agriculture",
        details: "Water-efficient farming technologies",
        intensity: 7
      },
      { 
        name: "Pune Rural School Network", 
        lat: 18.5204, lng: 73.8567, 
        region: "WEST REGION",
        type: "education",
        details: "Digital education hub connecting 25 rural schools",
        intensity: 9
      },
      { 
        name: "Surat Mobile Health", 
        lat: 21.1702, lng: 72.8311, 
        region: "WEST REGION",
        type: "health",
        details: "Mobile diagnostic unit serving rural communities",
        intensity: 6
      },
      { 
        name: "Jaipur Solar Village", 
        lat: 26.9124, lng: 75.7873, 
        region: "WEST REGION",
        type: "climate",
        details: "100% renewable energy microgrid for rural area",
        intensity: 8
      }
    ];
  };
  
  const handleFilterChange = (name: string) => {
    setFilters({
      ...filters,
      [name]: !filters[name as keyof typeof filters],
    });
  };

  const handleRegionChange = (region: string) => {
    setActiveRegion(region);
  };
  
  // Custom map styles for sci-fi appearance
  function getMapStyles() {
    return [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#070b14"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8ec3b9"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#0f172a"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#0affff"
          },
          {
            "weight": 0.5
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#0f172a"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#0affff"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#0a0e17"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#0c1526"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#6b9a76"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#2563eb"
          },
          {
            "lightness": -30
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#2563eb"
          },
          {
            "lightness": -40
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#000614"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#0affff"
          }
        ]
      }
    ];
  }

  return (
    <section id="map-section" className="mb-12">
      <div className="flex items-center mb-6">
        <h2 className="font-rajdhani uppercase text-2xl font-bold text-[var(--cyber-cyan)] tracking-wider">Rural Deployment Map</h2>
        <div className="cyber-line flex-grow ml-4"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <SciFiCard className="p-6 rounded-lg lg:col-span-1">
          <h3 className="font-rajdhani text-lg font-medium mb-4">Region Selection</h3>

          <div className="space-y-4">
            <RegionButton 
              name="NORTH REGION" 
              active={activeRegion === "NORTH REGION"} 
              onClick={() => handleRegionChange("NORTH REGION")} 
            />
            <RegionButton 
              name="SOUTH REGION" 
              active={activeRegion === "SOUTH REGION"} 
              onClick={() => handleRegionChange("SOUTH REGION")} 
            />
            <RegionButton 
              name="EAST REGION" 
              active={activeRegion === "EAST REGION"} 
              onClick={() => handleRegionChange("EAST REGION")} 
            />
            <RegionButton 
              name="WEST REGION" 
              active={activeRegion === "WEST REGION"} 
              onClick={() => handleRegionChange("WEST REGION")} 
            />
          </div>

          <div className="cyber-line my-4"></div>

          <h3 className="font-rajdhani text-lg font-medium mb-4">Filter By Solution</h3>

          <div className="space-y-2">
            <FilterCheckbox 
              label="Water Access Solutions" 
              checked={filters.water} 
              onChange={() => handleFilterChange("water")} 
            />
            <FilterCheckbox 
              label="Agricultural Support" 
              checked={filters.agriculture} 
              onChange={() => handleFilterChange("agriculture")} 
            />
            <FilterCheckbox 
              label="Education Hubs" 
              checked={filters.education} 
              onChange={() => handleFilterChange("education")} 
            />
            <FilterCheckbox 
              label="Health Centers" 
              checked={filters.health} 
              onChange={() => handleFilterChange("health")} 
            />
            <FilterCheckbox 
              label="Climate Initiatives" 
              checked={filters.climate} 
              onChange={() => handleFilterChange("climate")} 
            />
          </div>
        </SciFiCard>

        <SciFiCard className="p-6 rounded-lg lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-rajdhani text-lg font-medium">Interactive Map</h3>
            <div className="flex space-x-2">
              <button className="p-2 text-sm rounded bg-[var(--cyber-blue-light)]/20 text-[var(--cyber-cyan)] border border-[var(--cyber-cyan)]/30">
                <i className="fas fa-plus"></i>
              </button>
              <button className="p-2 text-sm rounded bg-[var(--cyber-blue-light)]/20 text-[var(--cyber-cyan)] border border-[var(--cyber-cyan)]/30">
                <i className="fas fa-minus"></i>
              </button>
              <button className="p-2 text-sm rounded bg-[var(--cyber-blue-light)]/20 text-[var(--cyber-cyan)] border border-[var(--cyber-cyan)]/30">
                <i className="fas fa-sync-alt"></i>
              </button>
            </div>
          </div>

          <div 
            ref={mapRef} 
            className="h-[500px] w-full rounded-lg border border-[var(--cyber-cyan)]/30 shadow-[0_0_10px_rgba(10,255,255,0.3)]"
          ></div>

          <div className="mt-4 p-3 bg-[var(--cyber-blue-light)]/10 rounded-lg border border-[var(--cyber-cyan)]/20 text-sm">
            <div className="flex items-center text-[var(--cyber-cyan)] mb-2">
              <i className="fas fa-info-circle mr-2"></i>
              <span>Currently viewing: {activeRegion}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div><i className="fas fa-tint text-[var(--cyber-cyan)] mr-1"></i> Water projects: 14</div>
              <div><i className="fas fa-seedling text-[var(--cyber-orange)] mr-1"></i> Agriculture projects: 8</div>
              <div><i className="fas fa-graduation-cap text-[var(--cyber-purple)] mr-1"></i> Education hubs: 11</div>
              <div><i className="fas fa-heartbeat text-[var(--cyber-green)] mr-1"></i> Health centers: 6</div>
            </div>
          </div>
        </SciFiCard>
      </div>
    </section>
  );
}

interface RegionButtonProps {
  name: string;
  active: boolean;
  onClick: () => void;
}

function RegionButton({ name, active, onClick }: RegionButtonProps) {
  return (
    <CyberButton
      variant={active ? "default" : "secondary"}
      className="w-full justify-start"
      size="sm"
      onClick={onClick}
    >
      <i className="fas fa-map-marker-alt mr-2"></i>
      {name}
    </CyberButton>
  );
}

interface FilterCheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

function FilterCheckbox({ label, checked, onChange }: FilterCheckboxProps) {
  return (
    <label className="flex items-center space-x-2 text-sm cursor-pointer">
      <input
        type="checkbox"
        className="form-checkbox text-[var(--cyber-cyan)] rounded border-gray-600 bg-[var(--cyber-dark)] focus:ring-[var(--cyber-cyan)]"
        checked={checked}
        onChange={onChange}
      />
      <span>{label}</span>
    </label>
  );
}
