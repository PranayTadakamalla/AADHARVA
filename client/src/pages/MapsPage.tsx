import React, { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SciFiCard } from "@/components/ui/sci-fi-card";
import { CyberButton } from "@/components/ui/cyber-button";
import { apiRequest } from "@/lib/queryClient";

// Add Google Maps type definitions
declare global {
  interface Window {
    google?: any;
    initMap?: () => void;
  }
}

export default function MapsPage() {
  const [activeTab, setActiveTab] = useState("projects");
  const [activeRegion, setActiveRegion] = useState("all");
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState({
    water: true,
    agriculture: true,
    education: true,
    healthcare: true,
    energy: true,
    connectivity: true,
    governance: true
  });
  
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  
  // Sample project data for the map
  const projectData = [
    { id: 1, type: "water", title: "Smart Water Monitoring System", lat: 27.1751, lng: 78.0421, region: "north", status: "Active", progress: 75 },
    { id: 2, type: "water", title: "Community Rainwater Harvesting", lat: 26.9124, lng: 75.7873, region: "north", status: "Active", progress: 60 },
    { id: 3, type: "agriculture", title: "Precision Farming Initiative", lat: 22.5726, lng: 88.3639, region: "east", status: "Active", progress: 80 },
    { id: 4, type: "agriculture", title: "IoT Crop Monitoring", lat: 24.8607, lng: 67.0011, region: "west", status: "Planning", progress: 25 },
    { id: 5, type: "education", title: "Rural Digital Classroom", lat: 12.9716, lng: 77.5946, region: "south", status: "Active", progress: 90 },
    { id: 6, type: "education", title: "Mobile Learning Lab", lat: 17.3850, lng: 78.4867, region: "south", status: "Active", progress: 85 },
    { id: 7, type: "healthcare", title: "Telemedicine Center", lat: 19.0760, lng: 72.8777, region: "west", status: "Active", progress: 95 },
    { id: 8, type: "healthcare", title: "Mobile Diagnostic Unit", lat: 28.7041, lng: 77.1025, region: "north", status: "Active", progress: 70 },
    { id: 9, type: "energy", title: "Solar Microgrid", lat: 13.0827, lng: 80.2707, region: "south", status: "Active", progress: 85 },
    { id: 10, type: "energy", title: "Community Biogas Plant", lat: 23.0225, lng: 72.5714, region: "west", status: "Planning", progress: 30 },
    { id: 11, type: "connectivity", title: "Rural Mesh Network", lat: 30.7333, lng: 76.7794, region: "north", status: "Active", progress: 65 },
    { id: 12, type: "connectivity", title: "Satellite Internet Hub", lat: 20.2961, lng: 85.8245, region: "east", status: "Planning", progress: 40 },
    { id: 13, type: "governance", title: "Community Decision Platform", lat: 25.5941, lng: 85.1376, region: "east", status: "Active", progress: 75 },
    { id: 14, type: "governance", title: "Rural E-Governance Center", lat: 15.2993, lng: 74.1240, region: "west", status: "Active", progress: 80 }
  ];
  
  // Project indicators for map markers
  const projectTypeColors: Record<string, string> = {
    water: "#0affff",      // cyan
    agriculture: "#10b981", // green
    education: "#7c3aed",   // purple
    healthcare: "#0affff",  // cyan
    energy: "#10b981",      // green
    connectivity: "#7c3aed", // purple
    governance: "#2563eb"   // blue
  };
  
  // Load Google Maps API
  const loadGoogleMapsScript = async () => {
    try {
      // Get API key from server
      const response = await fetch("/api/config/maps");
      const data = await response.json();
      const apiKey = data.apiKey;
      
      if (!apiKey) {
        setMapError("Google Maps API key not available");
        return;
      }
      
      // Check if Google Maps script is already loaded
      if (window.google && window.google.maps) {
        initMap();
        return;
      }
      
      // Create script element
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      
      // Set callback function
      window.initMap = () => {
        setIsMapLoaded(true);
        initMap();
      };
      
      script.onload = window.initMap;
      script.onerror = () => {
        setMapError("Failed to load Google Maps API");
      };
      
      // Append script to document
      document.head.appendChild(script);
    } catch (error) {
      console.error("Error loading Google Maps:", error);
      setMapError("Failed to load Google Maps API");
    }
  };
  
  const initMap = () => {
    if (!mapRef.current || !window.google || !window.google.maps) {
      console.error("Google Maps API not loaded");
      return;
    }
    
    // Center of India as default view
    const mapOptions = {
      center: { lat: 22.5726, lng: 79.5 },
      zoom: 5,
      mapTypeId: window.google.maps.MapTypeId.TERRAIN,
      styles: [
        { elementType: "geometry", stylers: [{ color: "#0f172a" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#0f172a" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#e5e7eb" }] },
        {
          featureType: "administrative.locality",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d1d5db" }],
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [{ color: "#93c5fd" }],
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#0c4a6e" }],
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [{ color: "#6ee7b7" }],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#1e293b" }],
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{ color: "#1e293b" }],
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d1d5db" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [{ color: "#334155" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ color: "#334155" }],
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [{ color: "#f8fafc" }],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#0c4a6e" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#93c5fd" }],
        },
      ],
    };
    
    googleMapRef.current = new window.google.maps.Map(mapRef.current, mapOptions);
    addMarkers();
    setIsMapLoaded(true);
  };
  
  const addMarkers = () => {
    if (!googleMapRef.current || !window.google || !window.google.maps) return;
    
    // Clear existing markers
    if (markersRef.current) {
      markersRef.current.forEach((marker: any) => marker.setMap(null));
    }
    markersRef.current = [];
    
    // Filter projects based on active region and filters
    const filteredProjects = projectData.filter(project => {
      const regionMatch = activeRegion === "all" || project.region === activeRegion;
      const typeMatch = activeFilters[project.type as keyof typeof activeFilters];
      return regionMatch && typeMatch;
    });
    
    // Add new markers
    filteredProjects.forEach(project => {
      const marker = new window.google.maps.Marker({
        position: { lat: project.lat, lng: project.lng },
        map: googleMapRef.current,
        title: project.title,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: projectTypeColors[project.type],
          fillOpacity: 0.8,
          strokeColor: projectTypeColors[project.type],
          strokeOpacity: 1,
          strokeWeight: 1,
          scale: 8
        }
      });
      
      // Add info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; max-width: 200px; color: #0f172a;">
            <h3 style="margin: 0 0 8px; font-weight: bold;">${project.title}</h3>
            <p style="margin: 0 0 5px;">Type: ${project.type.charAt(0).toUpperCase() + project.type.slice(1)}</p>
            <p style="margin: 0 0 5px;">Status: ${project.status}</p>
            <p style="margin: 0 0 5px;">Progress: ${project.progress}%</p>
            <button style="background: #2563eb; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; margin-top: 8px;" onclick="alert('Details would open here')">View Details</button>
          </div>
        `
      });
      
      marker.addListener("click", () => {
        infoWindow.open({
          anchor: marker,
          map: googleMapRef.current
        });
      });
      
      markersRef.current.push(marker);
    });
  };
  
  const toggleFilter = (filterType: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: !prev[filterType as keyof typeof prev]
    }));
  };
  
  // Initialize map when component mounts
  useEffect(() => {
    loadGoogleMapsScript();
    
    return () => {
      // Clean up markers
      if (markersRef.current) {
        markersRef.current.forEach((marker: any) => marker && marker.setMap && marker.setMap(null));
      }
      
      // Remove global callback
      if (window.initMap) {
        delete window.initMap;
      }
    };
  }, []);
  
  // Update markers when filters or region changes
  useEffect(() => {
    if (isMapLoaded && googleMapRef.current) {
      addMarkers();
    }
  }, [activeRegion, activeFilters, isMapLoaded]);
  
  // Stats data
  const statsData = {
    projects: 14,
    communities: 42,
    beneficiaries: "215,000",
    fundingMillions: 12.5
  };
  
  // Resource allocation data
  const resourceData = [
    { category: "Water", allocation: 22, color: "bg-[#0affff]" },
    { category: "Agriculture", allocation: 18, color: "bg-[#10b981]" },
    { category: "Education", allocation: 20, color: "bg-[#7c3aed]" },
    { category: "Healthcare", allocation: 15, color: "bg-[#0affff]" },
    { category: "Energy", allocation: 12, color: "bg-[#10b981]" },
    { category: "Connectivity", allocation: 8, color: "bg-[#7c3aed]" },
    { category: "Governance", allocation: 5, color: "bg-[#2563eb]" }
  ];

  return (
    <div className="bg-[var(--cyber-dark)] font-inter text-gray-100 min-h-screen overflow-x-hidden">
      <Header />
      <main className="container mx-auto py-8 px-4 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-rajdhani font-bold mb-2 text-[var(--cyber-cyan)] glowing-text">Rural Development Map</h1>
          <div className="cyber-line mb-8"></div>
          
          <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
            <CyberButton 
              variant={activeTab === "projects" ? "default" : "outline"} 
              onClick={() => setActiveTab("projects")}
            >
              Projects Map
            </CyberButton>
            <CyberButton 
              variant={activeTab === "analytics" ? "default" : "outline"} 
              onClick={() => setActiveTab("analytics")}
            >
              Impact Analytics
            </CyberButton>
            <CyberButton 
              variant={activeTab === "resources" ? "default" : "outline"} 
              onClick={() => setActiveTab("resources")}
            >
              Resource Allocation
            </CyberButton>
          </div>

          {activeTab === "projects" && (
            <SciFiCard>
              <h2 className="text-2xl font-rajdhani font-semibold text-[var(--cyber-cyan)] mb-4">Rural Development Projects</h2>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <CyberButton 
                  size="sm"
                  variant={activeRegion === "all" ? "default" : "outline"} 
                  onClick={() => setActiveRegion("all")}
                >
                  All Regions
                </CyberButton>
                <CyberButton 
                  size="sm"
                  variant={activeRegion === "north" ? "default" : "outline"} 
                  onClick={() => setActiveRegion("north")}
                >
                  Northern
                </CyberButton>
                <CyberButton 
                  size="sm"
                  variant={activeRegion === "south" ? "default" : "outline"} 
                  onClick={() => setActiveRegion("south")}
                >
                  Southern
                </CyberButton>
                <CyberButton 
                  size="sm"
                  variant={activeRegion === "east" ? "default" : "outline"} 
                  onClick={() => setActiveRegion("east")}
                >
                  Eastern
                </CyberButton>
                <CyberButton 
                  size="sm"
                  variant={activeRegion === "west" ? "default" : "outline"} 
                  onClick={() => setActiveRegion("west")}
                >
                  Western
                </CyberButton>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-8 gap-4 mb-4">
                <div className="md:col-span-2 bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-cyan)] mb-4">Project Filters</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full ${activeFilters.water ? 'bg-[#0affff]' : 'bg-gray-700'} mr-2`}></div>
                      <label className="flex-grow cursor-pointer" onClick={() => toggleFilter('water')}>
                        Water Projects
                      </label>
                      <input 
                        type="checkbox" 
                        className="form-checkbox h-5 w-5 text-[var(--cyber-cyan)]" 
                        checked={activeFilters.water}
                        onChange={() => toggleFilter('water')}
                      />
                    </div>
                    
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full ${activeFilters.agriculture ? 'bg-[#10b981]' : 'bg-gray-700'} mr-2`}></div>
                      <label className="flex-grow cursor-pointer" onClick={() => toggleFilter('agriculture')}>
                        Agriculture Projects
                      </label>
                      <input 
                        type="checkbox" 
                        className="form-checkbox h-5 w-5 text-[var(--cyber-green)]" 
                        checked={activeFilters.agriculture}
                        onChange={() => toggleFilter('agriculture')}
                      />
                    </div>
                    
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full ${activeFilters.education ? 'bg-[#7c3aed]' : 'bg-gray-700'} mr-2`}></div>
                      <label className="flex-grow cursor-pointer" onClick={() => toggleFilter('education')}>
                        Education Projects
                      </label>
                      <input 
                        type="checkbox" 
                        className="form-checkbox h-5 w-5 text-[var(--cyber-purple)]" 
                        checked={activeFilters.education}
                        onChange={() => toggleFilter('education')}
                      />
                    </div>
                    
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full ${activeFilters.healthcare ? 'bg-[#0affff]' : 'bg-gray-700'} mr-2`}></div>
                      <label className="flex-grow cursor-pointer" onClick={() => toggleFilter('healthcare')}>
                        Healthcare Projects
                      </label>
                      <input 
                        type="checkbox" 
                        className="form-checkbox h-5 w-5 text-[var(--cyber-cyan)]" 
                        checked={activeFilters.healthcare}
                        onChange={() => toggleFilter('healthcare')}
                      />
                    </div>
                    
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full ${activeFilters.energy ? 'bg-[#10b981]' : 'bg-gray-700'} mr-2`}></div>
                      <label className="flex-grow cursor-pointer" onClick={() => toggleFilter('energy')}>
                        Energy Projects
                      </label>
                      <input 
                        type="checkbox" 
                        className="form-checkbox h-5 w-5 text-[var(--cyber-green)]" 
                        checked={activeFilters.energy}
                        onChange={() => toggleFilter('energy')}
                      />
                    </div>
                    
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full ${activeFilters.connectivity ? 'bg-[#7c3aed]' : 'bg-gray-700'} mr-2`}></div>
                      <label className="flex-grow cursor-pointer" onClick={() => toggleFilter('connectivity')}>
                        Connectivity Projects
                      </label>
                      <input 
                        type="checkbox" 
                        className="form-checkbox h-5 w-5 text-[var(--cyber-purple)]" 
                        checked={activeFilters.connectivity}
                        onChange={() => toggleFilter('connectivity')}
                      />
                    </div>
                    
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full ${activeFilters.governance ? 'bg-[#2563eb]' : 'bg-gray-700'} mr-2`}></div>
                      <label className="flex-grow cursor-pointer" onClick={() => toggleFilter('governance')}>
                        Governance Projects
                      </label>
                      <input 
                        type="checkbox" 
                        className="form-checkbox h-5 w-5 text-[var(--cyber-blue-light)]" 
                        checked={activeFilters.governance}
                        onChange={() => toggleFilter('governance')}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <CyberButton onClick={() => setActiveFilters({
                      water: true,
                      agriculture: true,
                      education: true,
                      healthcare: true,
                      energy: true,
                      connectivity: true,
                      governance: true
                    })}>
                      Reset Filters
                    </CyberButton>
                  </div>
                </div>
                
                <div className="md:col-span-6">
                  <div 
                    ref={mapRef} 
                    className="w-full h-[500px] rounded-lg border border-[var(--cyber-cyan)] border-opacity-50"
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Total Projects</div>
                  <div className="text-3xl font-rajdhani text-[var(--cyber-cyan)]">{statsData.projects}</div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Communities</div>
                  <div className="text-3xl font-rajdhani text-[var(--cyber-green)]">{statsData.communities}</div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Beneficiaries</div>
                  <div className="text-3xl font-rajdhani text-[var(--cyber-purple)]">{statsData.beneficiaries}</div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Total Funding</div>
                  <div className="text-3xl font-rajdhani text-[var(--cyber-blue-light)]">${statsData.fundingMillions}M</div>
                </div>
              </div>
            </SciFiCard>
          )}

          {activeTab === "analytics" && (
            <SciFiCard>
              <h2 className="text-2xl font-rajdhani font-semibold text-[var(--cyber-cyan)] mb-4">Impact Analytics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg border border-[var(--cyber-cyan)] border-opacity-30">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-cyan)] mb-3">Water Impact</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm text-gray-400">Clean Water Access</div>
                        <div className="text-2xl font-rajdhani text-white">+28%</div>
                      </div>
                      <div className="w-16 h-16 rounded-full bg-[var(--cyber-cyan)] bg-opacity-20 flex items-center justify-center">
                        <i className="fas fa-tint text-2xl text-[var(--cyber-cyan)]"></i>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Households with clean water</span>
                        <span>3,850</span>
                      </div>
                      <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                        <div className="h-full bg-[var(--cyber-cyan)]" style={{ width: "78%" }}></div>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span>Water quality improvement</span>
                        <span>62%</span>
                      </div>
                      <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                        <div className="h-full bg-[var(--cyber-cyan)]" style={{ width: "62%" }}></div>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span>Reduction in water-borne illness</span>
                        <span>45%</span>
                      </div>
                      <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                        <div className="h-full bg-[var(--cyber-cyan)]" style={{ width: "45%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg border border-[var(--cyber-green)] border-opacity-30">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-green)] mb-3">Agriculture Impact</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm text-gray-400">Crop Yield Increase</div>
                        <div className="text-2xl font-rajdhani text-white">+32%</div>
                      </div>
                      <div className="w-16 h-16 rounded-full bg-[var(--cyber-green)] bg-opacity-20 flex items-center justify-center">
                        <i className="fas fa-seedling text-2xl text-[var(--cyber-green)]"></i>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Farms with smart irrigation</span>
                        <span>1,240</span>
                      </div>
                      <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                        <div className="h-full bg-[var(--cyber-green)]" style={{ width: "65%" }}></div>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span>Water usage efficiency</span>
                        <span>+38%</span>
                      </div>
                      <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                        <div className="h-full bg-[var(--cyber-green)]" style={{ width: "38%" }}></div>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span>Farmer income increase</span>
                        <span>28%</span>
                      </div>
                      <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                        <div className="h-full bg-[var(--cyber-green)]" style={{ width: "28%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg border border-[var(--cyber-purple)] border-opacity-30">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-purple)] mb-3">Education Impact</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm text-gray-400">Educational Access</div>
                        <div className="text-2xl font-rajdhani text-white">+45%</div>
                      </div>
                      <div className="w-16 h-16 rounded-full bg-[var(--cyber-purple)] bg-opacity-20 flex items-center justify-center">
                        <i className="fas fa-graduation-cap text-2xl text-[var(--cyber-purple)]"></i>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Students with digital access</span>
                        <span>4,250</span>
                      </div>
                      <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                        <div className="h-full bg-[var(--cyber-purple)]" style={{ width: "85%" }}></div>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span>Test score improvement</span>
                        <span>24%</span>
                      </div>
                      <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                        <div className="h-full bg-[var(--cyber-purple)]" style={{ width: "24%" }}></div>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span>Teacher training completion</span>
                        <span>92%</span>
                      </div>
                      <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                        <div className="h-full bg-[var(--cyber-purple)]" style={{ width: "92%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg border border-[var(--cyber-blue-light)] border-opacity-30">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-blue-light)] mb-3">Healthcare Impact</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm text-gray-400">Healthcare Access</div>
                        <div className="text-2xl font-rajdhani text-white">+35%</div>
                      </div>
                      <div className="w-16 h-16 rounded-full bg-[var(--cyber-blue-light)] bg-opacity-20 flex items-center justify-center">
                        <i className="fas fa-heartbeat text-2xl text-[var(--cyber-blue-light)]"></i>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Telehealth consultations</span>
                        <span>7,840</span>
                      </div>
                      <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                        <div className="h-full bg-[var(--cyber-blue-light)]" style={{ width: "78%" }}></div>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span>Vaccination rate increase</span>
                        <span>18%</span>
                      </div>
                      <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                        <div className="h-full bg-[var(--cyber-blue-light)]" style={{ width: "18%" }}></div>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span>Early diagnosis improvement</span>
                        <span>42%</span>
                      </div>
                      <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                        <div className="h-full bg-[var(--cyber-blue-light)]" style={{ width: "42%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Overall Impact Score</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-cyan)] mb-2">78/100</div>
                  <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[var(--cyber-cyan)] to-[var(--cyber-purple)]" style={{ width: "78%" }}></div>
                  </div>
                  <div className="text-sm text-gray-400 mt-2">Based on 7 key development indicators</div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Sustainability Rating</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-green)] mb-2">A-</div>
                  <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[var(--cyber-green)] to-[var(--cyber-cyan)]" style={{ width: "85%" }}></div>
                  </div>
                  <div className="text-sm text-gray-400 mt-2">92% of projects meet sustainability criteria</div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Community Satisfaction</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-purple)] mb-2">85%</div>
                  <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[var(--cyber-purple)] to-[var(--cyber-blue-light)]" style={{ width: "85%" }}></div>
                  </div>
                  <div className="text-sm text-gray-400 mt-2">Based on 2,450 community feedback responses</div>
                </div>
              </div>
            </SciFiCard>
          )}

          {activeTab === "resources" && (
            <SciFiCard>
              <h2 className="text-2xl font-rajdhani font-semibold text-[var(--cyber-cyan)] mb-4">Resource Allocation</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-cyan)] mb-3">Budget Allocation By Category</h3>
                  
                  <div className="space-y-4">
                    {resourceData.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{item.category}</span>
                          <span>{item.allocation}%</span>
                        </div>
                        <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                          <div className={`h-full ${item.color}`} style={{ width: `${item.allocation}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-cyan)] mb-3">Resource Distribution</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <div className="text-center">
                        <div className="text-sm text-gray-400 mb-1">Northern Region</div>
                        <div className="text-3xl font-rajdhani text-[var(--cyber-cyan)]">35%</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-400 mb-1">Southern Region</div>
                        <div className="text-3xl font-rajdhani text-[var(--cyber-green)]">28%</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-400 mb-1">Eastern Region</div>
                        <div className="text-3xl font-rajdhani text-[var(--cyber-purple)]">22%</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-400 mb-1">Western Region</div>
                        <div className="text-3xl font-rajdhani text-[var(--cyber-blue-light)]">15%</div>
                      </div>
                    </div>
                    
                    <div className="h-4 w-full rounded-full overflow-hidden flex">
                      <div className="bg-[var(--cyber-cyan)]" style={{ width: "35%" }}></div>
                      <div className="bg-[var(--cyber-green)]" style={{ width: "28%" }}></div>
                      <div className="bg-[var(--cyber-purple)]" style={{ width: "22%" }}></div>
                      <div className="bg-[var(--cyber-blue-light)]" style={{ width: "15%" }}></div>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Implementation Progress</span>
                      <span>72%</span>
                    </div>
                    <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[var(--cyber-cyan)] to-[var(--cyber-green)]" style={{ width: "72%" }}></div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>Budget Utilization</span>
                      <span>68%</span>
                    </div>
                    <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[var(--cyber-purple)] to-[var(--cyber-blue-light)]" style={{ width: "68%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-[var(--cyber-blue)] p-4 rounded-lg mb-6">
                <h3 className="text-xl font-rajdhani text-[var(--cyber-cyan)] mb-3">AI Resource Optimization Recommendations</h3>
                
                <div className="space-y-4">
                  <div className="p-3 border-l-4 border-[var(--cyber-cyan)]">
                    <h4 className="font-rajdhani text-[var(--cyber-cyan)] mb-1">Water Resource Reallocation</h4>
                    <p className="text-sm">Based on usage patterns and impact metrics, reallocate 5% of water resources from Northern to Western region for more efficient utilization.</p>
                  </div>
                  
                  <div className="p-3 border-l-4 border-[var(--cyber-green)]">
                    <h4 className="font-rajdhani text-[var(--cyber-green)] mb-1">Agriculture Investment Strategy</h4>
                    <p className="text-sm">Increase precision farming technology investment by 8% to maximize yield improvements in Eastern region based on soil and climate data analysis.</p>
                  </div>
                  
                  <div className="p-3 border-l-4 border-[var(--cyber-purple)]">
                    <h4 className="font-rajdhani text-[var(--cyber-purple)] mb-1">Education Tech Distribution</h4>
                    <p className="text-sm">Prioritize deployment of educational tablets to Southern region based on connectivity improvements and teacher readiness metrics.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <CyberButton onClick={() => alert("Resource allocation dashboard will open")}>
                  <i className="fas fa-sliders-h mr-2"></i> Allocation Dashboard
                </CyberButton>
                <CyberButton variant="outline" onClick={() => alert("Optimization wizard will open")}>
                  <i className="fas fa-magic mr-2"></i> Optimization Wizard
                </CyberButton>
              </div>
            </SciFiCard>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}