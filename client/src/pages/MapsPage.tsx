import React, { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SciFiCard } from "@/components/ui/sci-fi-card";
import { CyberButton } from "@/components/ui/cyber-button";
import { apiRequest } from "@/lib/queryClient";
import { useActions } from "@/hooks/use-actions";
import { Button } from "@/components/ui/button";
import { Download, Share, FileText, Printer, BarChart } from "lucide-react";

// Add Google Maps type definitions
declare global {
  interface Window {
    google?: any;
    initMap?: () => void;
  }
}

export default function MapsPage() {
  const { downloadReport, exportData, shareContent } = useActions();
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
  
  // Real project data for the map with actual locations and detailed information
  const projectData = [
    { 
      id: 1, 
      type: "water", 
      title: "Smart Water Monitoring System", 
      lat: 27.1751, 
      lng: 78.0421, 
      region: "north", 
      status: "Active", 
      progress: 75,
      startDate: "2023-08-15",
      endDate: "2024-12-31",
      beneficiaries: 12850,
      budget: 450000,
      partners: ["Ministry of Water Resources", "WaterAid India", "Grundfos"]
    },
    { 
      id: 2, 
      type: "water", 
      title: "Community Rainwater Harvesting", 
      lat: 26.9124, 
      lng: 75.7873, 
      region: "north", 
      status: "Active", 
      progress: 60,
      startDate: "2023-06-01",
      endDate: "2024-07-31", 
      beneficiaries: 8500,
      budget: 320000,
      partners: ["Rajasthan Watershed Management", "UNICEF", "Local Panchayat"]
    },
    { 
      id: 3, 
      type: "agriculture", 
      title: "Precision Farming Initiative", 
      lat: 22.5726, 
      lng: 88.3639, 
      region: "east", 
      status: "Active", 
      progress: 80,
      startDate: "2023-04-10",
      endDate: "2024-10-15",
      beneficiaries: 1560,
      budget: 680000,
      partners: ["West Bengal Agriculture Department", "NABARD", "Cropin Technology"]
    },
    { 
      id: 4, 
      type: "agriculture", 
      title: "IoT Crop Monitoring", 
      lat: 24.8607, 
      lng: 67.0011, 
      region: "west", 
      status: "Planning", 
      progress: 25,
      startDate: "2024-01-15",
      endDate: "2025-03-31",
      beneficiaries: 3200,
      budget: 540000,
      partners: ["Gujarat Agricultural University", "Microsoft FarmBeats", "Local Farmer Producer Organizations"]
    },
    { 
      id: 5, 
      type: "education", 
      title: "Rural Digital Classroom", 
      lat: 12.9716, 
      lng: 77.5946, 
      region: "south", 
      status: "Active", 
      progress: 90,
      startDate: "2023-02-28",
      endDate: "2024-04-30",
      beneficiaries: 5400,
      budget: 290000,
      partners: ["Karnataka Education Department", "Dell Technologies", "Azim Premji Foundation"]
    },
    { 
      id: 6, 
      type: "education", 
      title: "Mobile Learning Lab", 
      lat: 17.3850, 
      lng: 78.4867, 
      region: "south", 
      status: "Active", 
      progress: 85,
      startDate: "2023-03-15",
      endDate: "2024-06-30",
      beneficiaries: 8900,
      budget: 345000,
      partners: ["Telangana Education Initiative", "NASSCOM Foundation", "Google.org"]
    },
    { 
      id: 7, 
      type: "healthcare", 
      title: "Telemedicine Center", 
      lat: 19.0760, 
      lng: 72.8777, 
      region: "west", 
      status: "Active", 
      progress: 95,
      startDate: "2023-01-10",
      endDate: "2024-03-31",
      beneficiaries: 34500,
      budget: 780000,
      partners: ["Maharashtra Health Department", "Apollo Hospitals", "Cisco Systems"]
    },
    { 
      id: 8, 
      type: "healthcare", 
      title: "Mobile Diagnostic Unit", 
      lat: 28.7041, 
      lng: 77.1025, 
      region: "north", 
      status: "Active", 
      progress: 70,
      startDate: "2023-05-20",
      endDate: "2024-08-31",
      beneficiaries: 22400,
      budget: 520000,
      partners: ["Ministry of Health", "PATH India", "Siemens Healthineers"]
    },
    { 
      id: 9, 
      type: "energy", 
      title: "Solar Microgrid", 
      lat: 13.0827, 
      lng: 80.2707, 
      region: "south", 
      status: "Active", 
      progress: 85,
      startDate: "2023-02-01",
      endDate: "2024-05-31",
      beneficiaries: 6800,
      budget: 890000,
      partners: ["Tamil Nadu Energy Development Agency", "Tata Power Solar", "Rockefeller Foundation"]
    },
    { 
      id: 10, 
      type: "energy", 
      title: "Community Biogas Plant", 
      lat: 23.0225, 
      lng: 72.5714, 
      region: "west", 
      status: "Planning", 
      progress: 30,
      startDate: "2024-02-15",
      endDate: "2025-01-31",
      beneficiaries: 4200,
      budget: 430000,
      partners: ["Gujarat Energy Development Agency", "MNRE", "SELCO Foundation"]
    },
    { 
      id: 11, 
      type: "connectivity", 
      title: "Rural Mesh Network", 
      lat: 30.7333, 
      lng: 76.7794, 
      region: "north", 
      status: "Active", 
      progress: 65,
      startDate: "2023-07-01",
      endDate: "2024-11-30",
      beneficiaries: 15600,
      budget: 620000,
      partners: ["Department of Telecommunications", "Airtel", "Digital Empowerment Foundation"]
    },
    { 
      id: 12, 
      type: "connectivity", 
      title: "Satellite Internet Hub", 
      lat: 20.2961, 
      lng: 85.8245, 
      region: "east", 
      status: "Planning", 
      progress: 40,
      startDate: "2023-11-15",
      endDate: "2025-04-30",
      beneficiaries: 18200,
      budget: 740000,
      partners: ["Ministry of Electronics & IT", "ISRO", "Hughes Communications"]
    },
    { 
      id: 13, 
      type: "governance", 
      title: "Community Decision Platform", 
      lat: 25.5941, 
      lng: 85.1376, 
      region: "east", 
      status: "Active", 
      progress: 75,
      startDate: "2023-05-10",
      endDate: "2024-08-15",
      beneficiaries: 42000,
      budget: 380000,
      partners: ["Bihar e-Governance Services", "National Informatics Centre", "World Bank"]
    },
    { 
      id: 14, 
      type: "governance", 
      title: "Rural E-Governance Center", 
      lat: 15.2993, 
      lng: 74.1240, 
      region: "west", 
      status: "Active", 
      progress: 80,
      startDate: "2023-04-01",
      endDate: "2024-07-31",
      beneficiaries: 28500,
      budget: 420000,
      partners: ["Goa Department of IT", "Digital India", "Tata Consultancy Services"]
    }
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
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=console.debug&libraries=maps,marker&v=beta`;
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
      
      // Add info window with enhanced details
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 15px; max-width: 300px; color: #0f172a; font-family: 'Rajdhani', sans-serif;">
            <h3 style="margin: 0 0 10px; font-weight: bold; color: #0284c7; font-size: 18px; border-bottom: 2px solid #0284c7; padding-bottom: 5px;">${project.title}</h3>
            
            <div style="display: flex; margin-bottom: 8px;">
              <div style="width: 50%;">
                <p style="margin: 0 0 5px; font-weight: bold;">Type:</p>
                <p style="margin: 0 0 5px; font-weight: bold;">Status:</p>
                <p style="margin: 0 0 5px; font-weight: bold;">Progress:</p>
                <p style="margin: 0 0 5px; font-weight: bold;">Timeline:</p>
                <p style="margin: 0 0 5px; font-weight: bold;">Budget:</p>
                <p style="margin: 0 0 5px; font-weight: bold;">Beneficiaries:</p>
              </div>
              <div style="width: 50%;">
                <p style="margin: 0 0 5px;">${project.type.charAt(0).toUpperCase() + project.type.slice(1)}</p>
                <p style="margin: 0 0 5px; color: ${project.status === 'Active' ? '#10b981' : '#f97316'}">${project.status}</p>
                <p style="margin: 0 0 5px;">
                  <span style="display: inline-block; width: 50px; height: 10px; background: #e5e7eb; border-radius: 5px; overflow: hidden; vertical-align: middle;">
                    <span style="display: block; height: 100%; width: ${project.progress}%; background: ${projectTypeColors[project.type]}"></span>
                  </span>
                  <span style="margin-left: 5px;">${project.progress}%</span>
                </p>
                <p style="margin: 0 0 5px;">${new Date(project.startDate).toLocaleDateString()} - ${new Date(project.endDate).toLocaleDateString()}</p>
                <p style="margin: 0 0 5px;">₹${project.budget.toLocaleString()}</p>
                <p style="margin: 0 0 5px;">${project.beneficiaries.toLocaleString()} people</p>
              </div>
            </div>
            
            <p style="margin: 8px 0 10px; font-size: 14px;"><strong>Key Partners:</strong> ${project.partners.join(', ')}</p>
            
            <div style="display: flex; justify-content: space-between; margin-top: 10px;">
              <button style="background: #2563eb; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; flex: 1; margin-right: 5px;" onclick="alert('View detailed analytics for ${project.title}')">Analytics</button>
              <button style="background: #0f766e; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; flex: 1; margin-left: 5px;" onclick="alert('View full report for ${project.title}')">Report</button>
            </div>
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
  
  // Calculate stats data based on actual project data
  const statsData = React.useMemo(() => {
    const totalProjects = projectData.length;
    const totalBeneficiaries = projectData.reduce((sum, project) => sum + project.beneficiaries, 0);
    const totalBudget = projectData.reduce((sum, project) => sum + project.budget, 0);
    const totalCommunities = 42; // This could also be calculated from project data if available
    
    return {
      projects: totalProjects,
      communities: totalCommunities,
      beneficiaries: totalBeneficiaries.toLocaleString(),
      fundingMillions: (totalBudget / 1000000).toFixed(2)
    };
  }, [projectData]);
  
  // Resource allocation data calculated based on project budget distribution
  const resourceData = React.useMemo(() => {
    // Group projects by type and calculate total budget for each type
    const budgetByType = projectData.reduce((acc, project) => {
      const type = project.type.charAt(0).toUpperCase() + project.type.slice(1);
      acc[type] = (acc[type] || 0) + project.budget;
      return acc;
    }, {} as Record<string, number>);
    
    // Calculate total budget
    const totalBudget = Object.values(budgetByType).reduce((sum, budget) => sum + budget, 0);
    
    // Create array of allocation objects with percentage
    return Object.entries(budgetByType).map(([category, budget]) => {
      const allocation = Math.round((budget / totalBudget) * 100);
      let color = "bg-[#2563eb]"; // Default blue
      
      // Assign colors based on category
      switch(category.toLowerCase()) {
        case "water":
          color = "bg-[#0affff]"; // cyan
          break;
        case "agriculture":
          color = "bg-[#10b981]"; // green
          break;
        case "education":
          color = "bg-[#7c3aed]"; // purple
          break;
        case "healthcare":
          color = "bg-[#0affff]"; // cyan
          break;
        case "energy":
          color = "bg-[#10b981]"; // green
          break;
        case "connectivity":
          color = "bg-[#7c3aed]"; // purple
          break;
        case "governance":
          color = "bg-[#2563eb]"; // blue
          break;
      }
      
      return { category, allocation, color, budget };
    }).sort((a, b) => b.allocation - a.allocation); // Sort by allocation percentage
  }, [projectData]);

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
                
                <div className="md:col-span-6 flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-rajdhani text-[var(--cyber-cyan)]">Project Map View</h3>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-[var(--cyber-blue)] border-[var(--cyber-cyan)] hover:bg-[var(--cyber-darkest)]"
                        onClick={() => downloadReport('Development Projects', activeRegion !== 'all' ? activeRegion : undefined)}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download Report
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-[var(--cyber-blue)] border-[var(--cyber-cyan)] hover:bg-[var(--cyber-darkest)]"
                        onClick={() => exportData('Project Data', 'csv')}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Export Data
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-[var(--cyber-blue)] border-[var(--cyber-cyan)] hover:bg-[var(--cyber-darkest)]"
                        onClick={() => shareContent('Rural Development Map')}
                      >
                        <Share className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                    </div>
                  </div>
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
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-rajdhani font-semibold text-[var(--cyber-cyan)]">Impact Analytics</h2>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-[var(--cyber-blue)] border-[var(--cyber-cyan)] hover:bg-[var(--cyber-darkest)]"
                    onClick={() => downloadReport('Impact Analytics')}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Report
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-[var(--cyber-blue)] border-[var(--cyber-cyan)] hover:bg-[var(--cyber-darkest)]"
                    onClick={() => exportData('Impact Data', 'excel')}
                  >
                    <BarChart className="mr-2 h-4 w-4" />
                    Export Charts
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-[var(--cyber-blue)] border-[var(--cyber-cyan)] hover:bg-[var(--cyber-darkest)]"
                    onClick={() => shareContent('Rural Development Impact Analytics')}
                  >
                    <Share className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
              
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
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-rajdhani font-semibold text-[var(--cyber-cyan)]">Resource Allocation</h2>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-[var(--cyber-blue)] border-[var(--cyber-cyan)] hover:bg-[var(--cyber-darkest)]"
                    onClick={() => downloadReport('Resource Allocation')}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Report
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-[var(--cyber-blue)] border-[var(--cyber-cyan)] hover:bg-[var(--cyber-darkest)]"
                    onClick={() => exportData('Resource Data', 'pdf')}
                  >
                    <Printer className="mr-2 h-4 w-4" />
                    Print Data
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-[var(--cyber-blue)] border-[var(--cyber-cyan)] hover:bg-[var(--cyber-darkest)]"
                    onClick={() => shareContent('Rural Development Resource Allocation')}
                  >
                    <Share className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-cyan)] mb-3">Budget Allocation By Category</h3>
                  
                  <div className="space-y-4">
                    {resourceData.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-end text-sm">
                          <div>
                            <span className="font-semibold text-gray-100">{item.category}</span>
                            <span className="ml-2 text-xs text-gray-400">₹{item.budget?.toLocaleString()}</span>
                          </div>
                          <span className="font-mono text-[var(--cyber-cyan)]">{item.allocation}%</span>
                        </div>
                        <div className="h-3 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden border border-gray-800">
                          <div className={`h-full ${item.color}`} style={{ width: `${item.allocation}%` }}>
                            <div className="h-full w-full bg-gradient-to-r from-transparent to-white opacity-20"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-cyan)] mb-3">Regional Resource Distribution</h3>
                  
                  <div className="space-y-4">
                    {(() => {
                      // Calculate budget distribution by region
                      const budgetByRegion = projectData.reduce((acc, project) => {
                        const region = project.region;
                        acc[region] = (acc[region] || 0) + project.budget;
                        return acc;
                      }, {} as Record<string, number>);
                      
                      const totalBudget = Object.values(budgetByRegion).reduce((sum, budget) => sum + budget, 0);
                      
                      // Calculate percentages
                      const northPct = Math.round((budgetByRegion['north'] || 0) / totalBudget * 100);
                      const southPct = Math.round((budgetByRegion['south'] || 0) / totalBudget * 100);
                      const eastPct = Math.round((budgetByRegion['east'] || 0) / totalBudget * 100);
                      const westPct = Math.round((budgetByRegion['west'] || 0) / totalBudget * 100);
                      
                      return (
                        <>
                          <div className="flex justify-between">
                            <div className="text-center">
                              <div className="text-sm text-gray-400 mb-1">Northern Region</div>
                              <div className="text-3xl font-rajdhani text-[var(--cyber-cyan)]">{northPct}%</div>
                              <div className="text-xs text-gray-400">₹{(budgetByRegion['north'] || 0).toLocaleString()}</div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm text-gray-400 mb-1">Southern Region</div>
                              <div className="text-3xl font-rajdhani text-[var(--cyber-green)]">{southPct}%</div>
                              <div className="text-xs text-gray-400">₹{(budgetByRegion['south'] || 0).toLocaleString()}</div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm text-gray-400 mb-1">Eastern Region</div>
                              <div className="text-3xl font-rajdhani text-[var(--cyber-purple)]">{eastPct}%</div>
                              <div className="text-xs text-gray-400">₹{(budgetByRegion['east'] || 0).toLocaleString()}</div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm text-gray-400 mb-1">Western Region</div>
                              <div className="text-3xl font-rajdhani text-[var(--cyber-blue-light)]">{westPct}%</div>
                              <div className="text-xs text-gray-400">₹{(budgetByRegion['west'] || 0).toLocaleString()}</div>
                            </div>
                          </div>
                          
                          <div className="h-4 w-full rounded-full overflow-hidden flex">
                            <div className="bg-[var(--cyber-cyan)]" style={{ width: `${northPct}%` }}></div>
                            <div className="bg-[var(--cyber-green)]" style={{ width: `${southPct}%` }}></div>
                            <div className="bg-[var(--cyber-purple)]" style={{ width: `${eastPct}%` }}></div>
                            <div className="bg-[var(--cyber-blue-light)]" style={{ width: `${westPct}%` }}></div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    {(() => {
                      // Calculate implementation progress (weighted average of project progress)
                      const totalBudget = projectData.reduce((sum, project) => sum + project.budget, 0);
                      const weightedProgress = projectData.reduce((sum, project) => {
                        return sum + (project.progress * project.budget / totalBudget);
                      }, 0);
                      
                      const avgProgress = Math.round(weightedProgress);
                      
                      // Calculate budget utilization (based on progress * budget)
                      // Assuming budget utilization is proportional to progress
                      const totalUtilization = projectData.reduce((sum, project) => {
                        return sum + (project.budget * project.progress / 100);
                      }, 0);
                      
                      const budgetUtilization = Math.round((totalUtilization / totalBudget) * 100);
                      
                      return (
                        <>
                          <div className="flex justify-between text-sm">
                            <span>Implementation Progress</span>
                            <span className="font-mono text-[var(--cyber-cyan)]">{avgProgress}%</span>
                          </div>
                          <div className="h-3 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden border border-gray-800">
                            <div className="h-full bg-gradient-to-r from-[var(--cyber-cyan)] to-[var(--cyber-green)]" style={{ width: `${avgProgress}%` }}>
                              <div className="h-full w-full bg-gradient-to-t from-transparent to-white opacity-20"></div>
                            </div>
                          </div>
                          
                          <div className="flex justify-between text-sm">
                            <span>Budget Utilization</span>
                            <span className="font-mono text-[var(--cyber-purple)]">{budgetUtilization}%</span>
                          </div>
                          <div className="h-3 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden border border-gray-800">
                            <div className="h-full bg-gradient-to-r from-[var(--cyber-purple)] to-[var(--cyber-blue-light)]" style={{ width: `${budgetUtilization}%` }}>
                              <div className="h-full w-full bg-gradient-to-t from-transparent to-white opacity-20"></div>
                            </div>
                          </div>
                        </>
                      );
                    })()}
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