import React, { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { CyberButton } from "@/components/ui/cyber-button";
import { SciFiCard } from "@/components/ui/sci-fi-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { applyFilters, exportData } from "@/lib/actions";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Google Maps types definition for TypeScript
declare global {
  interface Window {
    google?: any;
    initMap?: () => void;
  }
}

// Data for visualizations
const regionData = [
  { name: 'North', water: 65, agriculture: 78, education: 42, healthcare: 55, energy: 40, connectivity: 38, governance: 50 },
  { name: 'South', water: 75, agriculture: 65, education: 60, healthcare: 70, energy: 55, connectivity: 50, governance: 62 },
  { name: 'East', water: 60, agriculture: 70, education: 45, healthcare: 50, energy: 42, connectivity: 35, governance: 45 },
  { name: 'West', water: 70, agriculture: 72, education: 55, healthcare: 60, energy: 50, connectivity: 45, governance: 55 },
  { name: 'Central', water: 55, agriculture: 68, education: 50, healthcare: 45, energy: 38, connectivity: 30, governance: 40 },
];

const budgetAllocationData = [
  { name: 'Water', value: 25, color: '#36A2EB' },
  { name: 'Agriculture', value: 20, color: '#4BC0C0' },
  { name: 'Education', value: 15, color: '#9966FF' },
  { name: 'Healthcare', value: 18, color: '#FF6384' },
  { name: 'Energy', value: 12, color: '#FFCD56' },
  { name: 'Connectivity', value: 5, color: '#FF9F40' },
  { name: 'Governance', value: 5, color: '#C9CBCF' },
];

const implementationProgress = [
  { name: 'North', completed: 65, inProgress: 20, planned: 15 },
  { name: 'South', completed: 70, inProgress: 15, planned: 15 },
  { name: 'East', completed: 55, inProgress: 25, planned: 20 },
  { name: 'West', completed: 60, inProgress: 20, planned: 20 },
  { name: 'Central', completed: 50, inProgress: 30, planned: 20 },
];

const timelineData = [
  { month: 'Jan', deployments: 5 },
  { month: 'Feb', deployments: 8 },
  { month: 'Mar', deployments: 12 },
  { month: 'Apr', deployments: 15 },
  { month: 'May', deployments: 20 },
  { month: 'Jun', deployments: 22 },
  { month: 'Jul', deployments: 28 },
  { month: 'Aug', deployments: 30 },
  { month: 'Sep', deployments: 35 },
  { month: 'Oct', deployments: 40 },
  { month: 'Nov', deployments: 42 },
  { month: 'Dec', deployments: 45 },
];

// Heatmap data generation
interface DataPoint {
  x: number;
  y: number;
  weight: number;
  color: string;
  sector: string;
}

const sectorColors = {
  water: "#36A2EB",
  agriculture: "#4BC0C0",
  education: "#9966FF",
  healthcare: "#FF6384",
  energy: "#FFCD56",
  connectivity: "#FF9F40",
  governance: "#C9CBCF"
};

function generateRandomDataPoints(sector: string, color: string, count: number): DataPoint[] {
  const result: DataPoint[] = [];
  for (let i = 0; i < count; i++) {
    result.push({
      x: Math.floor(Math.random() * 100),
      y: Math.floor(Math.random() * 100),
      weight: Math.random() * 10,
      color,
      sector
    });
  }
  return result;
}

export default function MapsPage() {
  const [activeRegion, setActiveRegion] = useState<string>("all");
  const [activeFilters, setActiveFilters] = useState<{[key: string]: boolean}>({
    water: true,
    agriculture: true,
    education: true,
    healthcare: true,
    energy: true,
    connectivity: true,
    governance: true
  });
  const [density, setDensity] = useState<number>(5);
  const [heatmapData, setHeatmapData] = useState<DataPoint[]>([]);
  const [year, setYear] = useState<number>(2023);
  const [timeScale, setTimeScale] = useState<string>("yearly");
  const mapRef = useRef<HTMLDivElement>(null);
  const heatmapCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Generate heatmap data when filters change
    let newData: DataPoint[] = [];
    
    Object.entries(activeFilters).forEach(([sector, isActive]) => {
      if (isActive) {
        const color = sectorColors[sector as keyof typeof sectorColors];
        // Density controls how many points to generate
        const points = generateRandomDataPoints(sector, color, Math.floor(density * 5));
        newData = [...newData, ...points];
      }
    });
    
    setHeatmapData(newData);
  }, [activeFilters, density]);

  useEffect(() => {
    // Render heatmap
    renderHeatmap();
  }, [heatmapData]);

  useEffect(() => {
    // Check if we already have the map script loaded
    if (document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]')) {
      if (window.google && mapRef.current) {
        initializeMap();
      } else {
        createMockMap();
      }
      return;
    }
    
    try {
      // Initialize Google Maps if API is loaded
      if (window.google && mapRef.current) {
        initializeMap();
      } else {
        // Load Google Maps API with fallback
        window.initMap = () => {
          if (mapRef.current) {
            try {
              initializeMap();
            } catch (error) {
              console.error("Error initializing Google Maps:", error);
              createMockMap();
            }
          }
        };
        
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""}&callback=initMap&libraries=visualization,marker`;
        script.async = true;
        script.defer = true;
        script.onerror = () => {
          console.error("Google Maps API failed to load");
          createMockMap();
        };
        document.head.appendChild(script);
        
        // Set a timeout to create mock map if Google Maps takes too long
        const timeout = setTimeout(() => {
          if (!window.google && mapRef.current) {
            createMockMap();
          }
        }, 3000);
        
        return () => clearTimeout(timeout);
      }
    } catch (error) {
      console.error("Error setting up map:", error);
      createMockMap();
    }
  }, [activeRegion, activeFilters]);

  const initializeMap = () => {
    if (!mapRef.current) return;

    // Center on India
    const center = { lat: 20.5937, lng: 78.9629 };
    const mapOptions = {
      zoom: 5,
      center,
      styles: getMapStyles(),
      mapTypeControl: false,
      streetViewControl: false,
      mapId: 'RURAL_DEV_MAP'
    };

    const map = new window.google.maps.Map(mapRef.current, mapOptions);

    // Initialize heatmap if data is available
    if (activeFilters.water || activeFilters.agriculture || activeFilters.healthcare) {
      initializeHeatmap(map);
    }

    // Add markers for different project types
    addMarkers(map);
  };

  const initializeHeatmap = (map: any) => {
    if (!window.google) return;
    
    // Generate heatmap data based on active filters
    const heatmapData = [];
    
    // Add more data points if water is active
    if (activeFilters.water) {
      // Northern water projects
      heatmapData.push(
        {location: new window.google.maps.LatLng(29.2, 78.1), weight: 0.7},
        {location: new window.google.maps.LatLng(28.9, 76.2), weight: 0.5},
        {location: new window.google.maps.LatLng(30.7, 76.8), weight: 0.8}
      );
    }
    
    // Add agriculture hotspots
    if (activeFilters.agriculture) {
      // Agricultural belt
      heatmapData.push(
        {location: new window.google.maps.LatLng(22.8, 87.2), weight: 0.9},
        {location: new window.google.maps.LatLng(23.5, 88.4), weight: 0.7},
        {location: new window.google.maps.LatLng(21.9, 85.7), weight: 0.6},
        {location: new window.google.maps.LatLng(23.2, 77.3), weight: 0.4}
      );
    }
    
    // Add healthcare data
    if (activeFilters.healthcare) {
      // Healthcare centers
      heatmapData.push(
        {location: new window.google.maps.LatLng(18.5, 73.8), weight: 0.5},
        {location: new window.google.maps.LatLng(17.2, 78.3), weight: 0.6},
        {location: new window.google.maps.LatLng(13.1, 80.2), weight: 0.7}
      );
    }
    
    // Only create heatmap if we have data
    if (heatmapData.length > 0) {
      const heatmap = new window.google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        map: map,
        radius: 20,
        opacity: 0.6,
      });
      
      // Adjust gradient based on active sectors
      let gradient = [
        'rgba(0, 255, 255, 0)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 127, 255, 1)',
        'rgba(0, 63, 255, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(0, 0, 223, 1)',
        'rgba(0, 0, 191, 1)',
        'rgba(0, 0, 159, 1)',
        'rgba(0, 0, 127, 1)',
        'rgba(63, 0, 91, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(255, 0, 0, 1)'
      ];
      
      if (activeFilters.agriculture && !activeFilters.water && !activeFilters.healthcare) {
        gradient = ['rgba(0,0,0,0)', 'rgba(0,255,0,1)'];
      } else if (activeFilters.water && !activeFilters.agriculture && !activeFilters.healthcare) {
        gradient = ['rgba(0,0,0,0)', 'rgba(0,0,255,1)'];
      } else if (activeFilters.healthcare && !activeFilters.water && !activeFilters.agriculture) {
        gradient = ['rgba(0,0,0,0)', 'rgba(255,0,0,1)'];
      }
      
      heatmap.set('gradient', gradient);
    }
  };

  const addMarkers = (map: any) => {
    // Sample project locations
    const projects = [
      { 
        position: { lat: 28.7041, lng: 77.1025 }, 
        title: "Water Purification System",
        type: "water",
        region: "north",
        details: "Provides clean drinking water to over 5,000 villagers"
      },
      { 
        position: { lat: 19.0760, lng: 72.8777 }, 
        title: "Solar Power Grid",
        type: "energy",
        region: "west",
        details: "Generates 25kW of clean energy powering 120 households"
      },
      { 
        position: { lat: 13.0827, lng: 80.2707 }, 
        title: "Digital Literacy Center",
        type: "education",
        region: "south",
        details: "Trained over 2,000 rural students in digital skills"
      },
      { 
        position: { lat: 22.5726, lng: 88.3639 }, 
        title: "Agricultural Innovation Hub",
        type: "agriculture",
        region: "east",
        details: "Increased crop yields by 45% through smart farming techniques"
      },
      { 
        position: { lat: 17.3850, lng: 78.4867 }, 
        title: "Telemedicine Center",
        type: "healthcare",
        region: "south",
        details: "Provided remote healthcare to 8,500 patients"
      },
      { 
        position: { lat: 23.0225, lng: 72.5714 }, 
        title: "Internet Connectivity Tower",
        type: "connectivity",
        region: "west",
        details: "Brings high-speed internet to 12 villages, benefiting 9,000 people"
      },
      { 
        position: { lat: 26.9124, lng: 75.7873 }, 
        title: "e-Governance Kiosk",
        type: "governance",
        region: "north",
        details: "Processed over 15,000 government service applications"
      },
      { 
        position: { lat: 25.5941, lng: 85.1376 }, 
        title: "Community Water Treatment Plant",
        type: "water",
        region: "east",
        details: "Serves 8 villages with clean water infrastructure"
      },
      { 
        position: { lat: 15.3173, lng: 75.7139 }, 
        title: "Micro-Solar Grids",
        type: "energy",
        region: "south",
        details: "Decentralized power for 32 remote households" 
      },
      { 
        position: { lat: 31.1471, lng: 75.3412 }, 
        title: "Smart Farming Initiative",
        type: "agriculture",
        region: "north",
        details: "IoT sensors monitoring 450 acres of farmland"
      },
      { 
        position: { lat: 21.1458, lng: 79.0882 }, 
        title: "Mobile Health Unit",
        type: "healthcare",
        region: "central",
        details: "Provided healthcare services to over 10,000 villagers"
      },
      { 
        position: { lat: 27.0238, lng: 74.2179 }, 
        title: "Rural Internet Hub",
        type: "connectivity",
        region: "north",
        details: "Digital skills training for 1,500 rural youths"
      },
      { 
        position: { lat: 12.9716, lng: 77.5946 }, 
        title: "AI Education Center",
        type: "education",
        region: "south",
        details: "Advanced technology training for rural students"
      },
      { 
        position: { lat: 23.2599, lng: 77.4126 }, 
        title: "Digital Governance Center",
        type: "governance",
        region: "central",
        details: "Digitized land records for 45 villages"
      }
    ];

    // Filter projects by region and type
    const filteredProjects = projects.filter(project => {
      const regionMatch = activeRegion === "all" || project.region === activeRegion.toLowerCase();
      const typeMatch = activeFilters[project.type];
      return regionMatch && typeMatch;
    });

    // Add markers for filtered projects
    filteredProjects.forEach(project => {
      const markerColor = sectorColors[project.type as keyof typeof sectorColors];
      
      try {
        // Try to use advanced marker if available
        if (window.google.maps.marker && window.google.maps.marker.AdvancedMarkerElement) {
          const advancedMarker = new window.google.maps.marker.AdvancedMarkerElement({
            map,
            position: project.position,
            title: project.title,
            content: buildAdvancedMarkerContent(markerColor)
          });
          
          advancedMarker.addListener('click', () => {
            showInfoWindow(map, project, advancedMarker);
          });
          
        } else {
          // Fallback to regular marker
          const marker = new window.google.maps.Marker({
            position: project.position,
            map,
            title: project.title,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: markerColor,
              fillOpacity: 0.9,
              strokeWeight: 0,
              scale: 10
            }
          });
          
          marker.addListener("click", () => {
            showInfoWindow(map, project, marker);
          });
        }
      } catch (error) {
        console.error("Error creating marker:", error);
        // Last resort fallback
        const marker = new window.google.maps.Marker({
          position: project.position,
          map,
          title: project.title
        });
        
        marker.addListener("click", () => {
          showInfoWindow(map, project, marker);
        });
      }
    });
  };
  
  // Helper function to build advanced marker element
  const buildAdvancedMarkerContent = (color: string) => {
    const container = document.createElement('div');
    container.className = 'custom-marker';
    container.style.width = '24px';
    container.style.height = '24px';
    container.style.borderRadius = '50%';
    container.style.backgroundColor = color;
    container.style.border = '2px solid white';
    container.style.boxShadow = '0 0 8px rgba(0, 0, 0, 0.3)';
    
    // Add pulse effect
    const pulse = document.createElement('div');
    pulse.style.position = 'absolute';
    pulse.style.top = '0';
    pulse.style.left = '0';
    pulse.style.right = '0';
    pulse.style.bottom = '0';
    pulse.style.borderRadius = '50%';
    pulse.style.backgroundColor = color;
    pulse.style.opacity = '0.5';
    pulse.style.animation = 'pulse 2s infinite';
    
    container.appendChild(pulse);
    return container;
  };
  
  // Helper function to show info window with consistent styling
  const showInfoWindow = (map: any, project: any, marker: any) => {
    // Create info window content with styling
    const content = `
      <div style="font-family: 'Arial', sans-serif; padding: 12px; max-width: 250px;">
        <h3 style="margin: 0 0 8px; color: #0066cc; font-size: 16px; border-bottom: 1px solid #eee; padding-bottom: 5px;">
          ${project.title}
        </h3>
        <p style="margin: 8px 0; font-size: 13px; line-height: 1.4;">
          <strong>Type:</strong> <span style="text-transform: capitalize;">${project.type}</span>
        </p>
        <p style="margin: 8px 0; font-size: 13px; line-height: 1.4;">
          <strong>Region:</strong> <span style="text-transform: capitalize;">${project.region}</span>
        </p>
        <p style="margin: 8px 0; font-size: 13px; line-height: 1.4;">
          ${project.details || 'Details not available'}
        </p>
        <div style="margin-top: 10px; font-size: 12px; color: #666; text-align: right;">
          Rural Development Project
        </div>
      </div>
    `;
    
    // Create and open the info window
    const infoWindow = new window.google.maps.InfoWindow({
      content: content,
      maxWidth: 300
    });
    
    infoWindow.open(map, marker);
  };

  const renderHeatmap = () => {
    const canvas = heatmapCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw data points
    heatmapData.forEach(point => {
      const x = point.x * canvas.width / 100;
      const y = point.y * canvas.height / 100;
      
      // Draw gradient circle
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, point.weight * 5);
      gradient.addColorStop(0, point.color);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(x, y, point.weight * 5, 0, Math.PI * 2);
      ctx.fill();
    });
  };
  
  // Create a visual mock map with data points when Google Maps is unavailable
  const createMockMap = () => {
    if (!mapRef.current) return;
    console.log("Creating mock map visualization");
    
    const mapElement = mapRef.current;
    mapElement.innerHTML = '';
    mapElement.style.backgroundColor = '#0e1626';
    mapElement.style.position = 'relative';
    mapElement.style.overflow = 'hidden';
    
    // Create a grid pattern
    for (let i = 0; i < 20; i++) {
      const horizontalLine = document.createElement('div');
      horizontalLine.style.position = 'absolute';
      horizontalLine.style.left = '0';
      horizontalLine.style.right = '0';
      horizontalLine.style.top = `${i * 5}%`;
      horizontalLine.style.height = '1px';
      horizontalLine.style.backgroundColor = 'rgba(75, 104, 120, 0.3)';
      mapElement.appendChild(horizontalLine);
      
      const verticalLine = document.createElement('div');
      verticalLine.style.position = 'absolute';
      verticalLine.style.top = '0';
      verticalLine.style.bottom = '0';
      verticalLine.style.left = `${i * 5}%`;
      verticalLine.style.width = '1px';
      verticalLine.style.backgroundColor = 'rgba(75, 104, 120, 0.3)';
      mapElement.appendChild(verticalLine);
    }
    
    // Add map title/label
    const mapTitle = document.createElement('div');
    mapTitle.style.position = 'absolute';
    mapTitle.style.top = '5%';
    mapTitle.style.left = '50%';
    mapTitle.style.transform = 'translateX(-50%)';
    mapTitle.style.color = '#8ec3b9';
    mapTitle.style.fontSize = '16px';
    mapTitle.style.fontWeight = 'bold';
    mapTitle.textContent = 'Rural Development Projects Map';
    mapElement.appendChild(mapTitle);
    
    // Add mock project points based on the actual data and filters
    const mockProjects = [
      { x: 30, y: 20, color: '#36A2EB', title: 'Water Project - North', type: 'water', region: 'north' },
      { x: 70, y: 30, color: '#4BC0C0', title: 'Agriculture Hub - West', type: 'agriculture', region: 'west' },
      { x: 50, y: 75, color: '#9966FF', title: 'Education Center - South', type: 'education', region: 'south' },
      { x: 25, y: 60, color: '#FF6384', title: 'Healthcare Facility - East', type: 'healthcare', region: 'east' },
      { x: 80, y: 45, color: '#FFCD56', title: 'Energy Installation - Central', type: 'energy', region: 'central' },
      { x: 15, y: 35, color: '#FF9F40', title: 'Connectivity Hub - North', type: 'connectivity', region: 'north' },
      { x: 60, y: 65, color: '#C9CBCF', title: 'Governance Center - South', type: 'governance', region: 'south' },
      { x: 40, y: 40, color: '#36A2EB', title: 'Water Distribution - Central', type: 'water', region: 'central' },
      { x: 75, y: 15, color: '#4BC0C0', title: 'Smart Farming - North', type: 'agriculture', region: 'north' },
      { x: 20, y: 80, color: '#9966FF', title: 'Digital Classroom - West', type: 'education', region: 'west' },
      { x: 85, y: 70, color: '#FF6384', title: 'Mobile Clinic - East', type: 'healthcare', region: 'east' },
      { x: 45, y: 25, color: '#FFCD56', title: 'Solar Grid - South', type: 'energy', region: 'south' },
      { x: 65, y: 85, color: '#FF9F40', title: 'Internet Tower - Central', type: 'connectivity', region: 'central' },
      { x: 35, y: 55, color: '#C9CBCF', title: 'e-Governance Center - West', type: 'governance', region: 'west' }
    ];
    
    // Filter projects based on current selections
    const filteredProjects = mockProjects.filter(project => {
      const regionMatch = activeRegion === "all" || project.region === activeRegion.toLowerCase();
      const typeMatch = activeFilters[project.type];
      return regionMatch && typeMatch;
    });
    
    // Add filtered points to the map
    filteredProjects.forEach(project => {
      addMockMapPoint(mapElement, project.x, project.y, project.color, project.title, project.type);
    });
    
    // Add region labels
    addMockMapRegionLabel(mapElement, 50, 10, 'NORTH REGION');
    addMockMapRegionLabel(mapElement, 50, 90, 'SOUTH REGION');
    addMockMapRegionLabel(mapElement, 10, 50, 'WEST REGION');
    addMockMapRegionLabel(mapElement, 90, 50, 'EAST REGION');
    addMockMapRegionLabel(mapElement, 50, 50, 'CENTRAL REGION');
  };
  
  // Add a point to the mock map
  const addMockMapPoint = (mapElement: HTMLElement, x: number, y: number, color: string, title: string, type: string) => {
    const point = document.createElement('div');
    point.style.position = 'absolute';
    point.style.left = `${x}%`;
    point.style.top = `${y}%`;
    point.style.width = '12px';
    point.style.height = '12px';
    point.style.borderRadius = '50%';
    point.style.backgroundColor = color;
    point.style.transform = 'translate(-50%, -50%)';
    point.style.boxShadow = `0 0 8px ${color}`;
    point.style.cursor = 'pointer';
    point.title = title;
    point.className = 'map-point';
    point.dataset.type = type;
    
    // Add pulse effect
    const pulse = document.createElement('div');
    pulse.style.position = 'absolute';
    pulse.style.left = '50%';
    pulse.style.top = '50%';
    pulse.style.width = '100%';
    pulse.style.height = '100%';
    pulse.style.borderRadius = '50%';
    pulse.style.backgroundColor = color;
    pulse.style.transform = 'translate(-50%, -50%)';
    pulse.style.opacity = '0.5';
    pulse.style.animation = 'pulse 2s infinite';
    
    point.appendChild(pulse);
    mapElement.appendChild(point);
    
    // Add tooltip on hover
    point.addEventListener('mouseover', () => {
      const tooltip = document.createElement('div');
      tooltip.textContent = title;
      tooltip.style.position = 'absolute';
      tooltip.style.left = `${x}%`;
      tooltip.style.top = `${y - 5}%`;
      tooltip.style.backgroundColor = 'rgba(13, 18, 30, 0.9)';
      tooltip.style.color = '#fff';
      tooltip.style.padding = '4px 8px';
      tooltip.style.borderRadius = '4px';
      tooltip.style.fontSize = '12px';
      tooltip.style.transform = 'translate(-50%, -100%)';
      tooltip.style.zIndex = '10';
      tooltip.style.border = '1px solid rgba(0, 191, 255, 0.5)';
      tooltip.className = 'map-tooltip';
      mapElement.appendChild(tooltip);
    });
    
    point.addEventListener('mouseout', () => {
      const tooltips = mapElement.querySelectorAll('.map-tooltip');
      tooltips.forEach(t => t.remove());
    });
    
    // Add click interaction for info popup
    point.addEventListener('click', () => {
      // Remove any existing popups
      const existingPopups = mapElement.querySelectorAll('.map-popup');
      existingPopups.forEach(p => p.remove());
      
      // Create info popup
      const popup = document.createElement('div');
      popup.className = 'map-popup';
      popup.style.position = 'absolute';
      popup.style.left = `${x}%`;
      popup.style.top = `${y}%`;
      popup.style.transform = 'translate(-50%, -120%)';
      popup.style.backgroundColor = 'rgba(13, 18, 30, 0.95)';
      popup.style.color = '#fff';
      popup.style.padding = '10px';
      popup.style.borderRadius = '4px';
      popup.style.minWidth = '200px';
      popup.style.zIndex = '20';
      popup.style.border = '1px solid rgba(0, 191, 255, 0.5)';
      popup.style.boxShadow = '0 0 15px rgba(0, 191, 255, 0.2)';
      
      // Popup content
      popup.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <h3 style="margin: 0; color: var(--cyber-cyan);">${title}</h3>
          <button class="close-btn" style="background: none; border: none; color: #fff; cursor: pointer;">×</button>
        </div>
        <p style="margin: 4px 0;">Type: ${type}</p>
        <p style="margin: 4px 0;">Status: Active</p>
        <p style="margin: 4px 0;">Region: ${title.split(' - ')[1]}</p>
      `;
      
      mapElement.appendChild(popup);
      
      // Add close button functionality
      const closeBtn = popup.querySelector('.close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          popup.remove();
        });
      }
      
      // Close popup when clicking outside
      document.addEventListener('click', function closePopup(e) {
        if (!popup.contains(e.target as Node) && !(e.target as Element).classList.contains('map-point')) {
          popup.remove();
          document.removeEventListener('click', closePopup);
        }
      });
    });
  };
  
  // Add region label to the mock map
  const addMockMapRegionLabel = (mapElement: HTMLElement, x: number, y: number, label: string) => {
    const regionLabel = document.createElement('div');
    regionLabel.textContent = label;
    regionLabel.style.position = 'absolute';
    regionLabel.style.left = `${x}%`;
    regionLabel.style.top = `${y}%`;
    regionLabel.style.transform = 'translate(-50%, -50%)';
    regionLabel.style.color = 'rgba(142, 195, 185, 0.7)';
    regionLabel.style.fontSize = '14px';
    regionLabel.style.fontWeight = 'bold';
    regionLabel.style.textShadow = '0 0 5px rgba(0,0,0,0.5)';
    mapElement.appendChild(regionLabel);
  };

  const toggleFilter = (sector: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [sector]: !prev[sector]
    }));

    // Apply filters and recreate map if we're using mock map
    applyFilters(sector, !activeFilters[sector]);
    if (mapRef.current && !window.google) {
      createMockMap();
    }
  };

  const getMapStyles = () => [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#1d2c4d"
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
          "color": "#1a3646"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#4b6878"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#64779e"
        }
      ]
    },
    {
      "featureType": "administrative.province",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#4b6878"
        }
      ]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#334e87"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#304a7d"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#98a5be"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#98a5be"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#0e1626"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#4e6d70"
        }
      ]
    }
  ];

  // Filter components
  const RegionButton = ({ name, active, onClick }: { name: string, active: boolean, onClick: () => void }) => (
    <button
      className={`px-4 py-2 rounded-md text-sm font-medium border ${
        active 
          ? "bg-[var(--cyber-cyan)]/20 text-[var(--cyber-cyan)] border-[var(--cyber-cyan)]/50" 
          : "bg-transparent text-gray-400 border-gray-700 hover:bg-[var(--cyber-cyan)]/10 hover:text-[var(--cyber-cyan)]/80"
      } transition-all duration-200`}
      onClick={onClick}
    >
      {name}
    </button>
  );

  const FilterCheckbox = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: () => void }) => (
    <div className="flex items-center space-x-2 cursor-pointer" onClick={onChange}>
      <div className={`w-4 h-4 rounded border ${checked ? 'bg-[var(--cyber-cyan)] border-[var(--cyber-cyan)]' : 'bg-transparent border-gray-500'} flex items-center justify-center transition-colors duration-200`}>
        {checked && <span className="text-[10px] text-black">✓</span>}
      </div>
      <span className={`text-sm ${checked ? 'text-gray-200' : 'text-gray-400'}`}>{label}</span>
    </div>
  );

  return (
    <div className="bg-[var(--cyber-dark)] font-inter text-gray-100 min-h-screen overflow-x-hidden">
      <Header />
      <main className="container mx-auto py-8 px-4 lg:px-8">
        <div className="flex items-center mb-6">
          <h1 className="font-rajdhani uppercase text-2xl font-bold text-[var(--cyber-cyan)] tracking-wider">Rural Development Analysis</h1>
          <div className="cyber-line flex-grow ml-4"></div>
        </div>

        <Tabs defaultValue="map" className="w-full">
          <TabsList className="mb-6 bg-[var(--cyber-dark-accent)] p-1 border border-[var(--cyber-cyan)]/30">
            <TabsTrigger value="map" className="data-[state=active]:bg-[var(--cyber-cyan)]/20 data-[state=active]:text-[var(--cyber-cyan)]">Interactive Map</TabsTrigger>
            <TabsTrigger value="heatmap" className="data-[state=active]:bg-[var(--cyber-cyan)]/20 data-[state=active]:text-[var(--cyber-cyan)]">Sector Density Heatmap</TabsTrigger>
            <TabsTrigger value="charts" className="data-[state=active]:bg-[var(--cyber-cyan)]/20 data-[state=active]:text-[var(--cyber-cyan)]">Analytics Dashboard</TabsTrigger>
          </TabsList>

          {/* MAP VIEW */}
          <TabsContent value="map" className="space-y-6">
            {/* Map filters */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="bg-[var(--cyber-dark-accent)] p-4 rounded-lg border border-[var(--cyber-cyan)]/20 flex-1">
                <h3 className="text-lg font-medium mb-3 text-[var(--cyber-cyan)]">Region Filter</h3>
                <div className="flex flex-wrap gap-2">
                  <RegionButton name="ALL REGIONS" active={activeRegion === "all"} onClick={() => setActiveRegion("all")} />
                  <RegionButton name="NORTH" active={activeRegion === "north"} onClick={() => setActiveRegion("north")} />
                  <RegionButton name="SOUTH" active={activeRegion === "south"} onClick={() => setActiveRegion("south")} />
                  <RegionButton name="EAST" active={activeRegion === "east"} onClick={() => setActiveRegion("east")} />
                  <RegionButton name="WEST" active={activeRegion === "west"} onClick={() => setActiveRegion("west")} />
                  <RegionButton name="CENTRAL" active={activeRegion === "central"} onClick={() => setActiveRegion("central")} />
                </div>
              </div>

              <div className="bg-[var(--cyber-dark-accent)] p-4 rounded-lg border border-[var(--cyber-cyan)]/20 flex-1">
                <h3 className="text-lg font-medium mb-3 text-[var(--cyber-cyan)]">Sector Filter</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <FilterCheckbox label="WATER" checked={activeFilters.water} onChange={() => toggleFilter("water")} />
                  <FilterCheckbox label="AGRICULTURE" checked={activeFilters.agriculture} onChange={() => toggleFilter("agriculture")} />
                  <FilterCheckbox label="EDUCATION" checked={activeFilters.education} onChange={() => toggleFilter("education")} />
                  <FilterCheckbox label="HEALTHCARE" checked={activeFilters.healthcare} onChange={() => toggleFilter("healthcare")} />
                  <FilterCheckbox label="ENERGY" checked={activeFilters.energy} onChange={() => toggleFilter("energy")} />
                  <FilterCheckbox label="CONNECTIVITY" checked={activeFilters.connectivity} onChange={() => toggleFilter("connectivity")} />
                  <FilterCheckbox label="GOVERNANCE" checked={activeFilters.governance} onChange={() => toggleFilter("governance")} />
                </div>
              </div>
            </div>

            {/* Map container */}
            <div className="w-full h-[500px] bg-[var(--cyber-dark-accent)] border border-[var(--cyber-cyan)]/20 rounded-lg overflow-hidden relative">
              <div ref={mapRef} className="w-full h-full" />
              
              {/* Map overlay */}
              <div className="absolute bottom-4 right-4 bg-[var(--cyber-dark)] bg-opacity-80 p-3 rounded-lg border border-[var(--cyber-cyan)]/30">
                <h4 className="text-sm font-medium text-[var(--cyber-cyan)] mb-2">Legend</h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  {Object.entries(sectorColors).map(([key, color]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
                      <span className="text-xs capitalize">{key}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 justify-end">
              <CyberButton onClick={() => exportData("map", "png")} variant="default">
                Export as PNG
              </CyberButton>
              <CyberButton onClick={() => exportData("map", "pdf")} variant="default">
                Export as PDF
              </CyberButton>
            </div>
          </TabsContent>

          {/* HEATMAP VIEW */}
          <TabsContent value="heatmap" className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="bg-[var(--cyber-dark-accent)] p-4 rounded-lg border border-[var(--cyber-cyan)]/20 flex-1">
                <h3 className="text-lg font-medium mb-3 text-[var(--cyber-cyan)]">Sector Filter</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <FilterCheckbox label="WATER" checked={activeFilters.water} onChange={() => toggleFilter("water")} />
                  <FilterCheckbox label="AGRICULTURE" checked={activeFilters.agriculture} onChange={() => toggleFilter("agriculture")} />
                  <FilterCheckbox label="EDUCATION" checked={activeFilters.education} onChange={() => toggleFilter("education")} />
                  <FilterCheckbox label="HEALTHCARE" checked={activeFilters.healthcare} onChange={() => toggleFilter("healthcare")} />
                  <FilterCheckbox label="ENERGY" checked={activeFilters.energy} onChange={() => toggleFilter("energy")} />
                  <FilterCheckbox label="CONNECTIVITY" checked={activeFilters.connectivity} onChange={() => toggleFilter("connectivity")} />
                  <FilterCheckbox label="GOVERNANCE" checked={activeFilters.governance} onChange={() => toggleFilter("governance")} />
                </div>
              </div>
              
              <div className="bg-[var(--cyber-dark-accent)] p-4 rounded-lg border border-[var(--cyber-cyan)]/20 flex-1">
                <h3 className="text-lg font-medium mb-3 text-[var(--cyber-cyan)]">Data Density</h3>
                <Slider
                  value={[density]}
                  onValueChange={(value) => setDensity(value[0])}
                  min={1}
                  max={10}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between mt-2 text-xs text-gray-400">
                  <span>Low Density</span>
                  <span>High Density</span>
                </div>
              </div>
            </div>

            {/* Heatmap canvas */}
            <div className="relative w-full h-[600px] bg-[var(--cyber-dark-accent)] border border-[var(--cyber-cyan)]/20 rounded-lg overflow-hidden">
              <canvas 
                ref={heatmapCanvasRef} 
                width={800} 
                height={600} 
                className="w-full h-full object-cover"
              />
              
              {/* Heatmap legend */}
              <div className="absolute bottom-4 right-4 bg-[var(--cyber-dark)] bg-opacity-80 p-3 rounded-lg border border-[var(--cyber-cyan)]/30">
                <h4 className="text-sm font-medium text-[var(--cyber-cyan)] mb-2">Density Legend</h4>
                <div className="flex flex-col space-y-1">
                  {Object.entries(sectorColors).map(([key, color]) => (
                    activeFilters[key] && (
                      <div key={key} className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
                        <span className="text-xs capitalize">{key}</span>
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 justify-end">
              <CyberButton onClick={() => exportData("heatmap", "png")} variant="default">
                Export as PNG
              </CyberButton>
              <CyberButton onClick={() => exportData("heatmap", "pdf")} variant="default">
                Export as PDF
              </CyberButton>
            </div>
          </TabsContent>

          {/* ANALYTICS DASHBOARD */}
          <TabsContent value="charts" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <SciFiCard className="p-5 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-[var(--cyber-cyan)]">Development Progress by Region</h3>
                    <Select defaultValue="all" onValueChange={(value) => setActiveRegion(value)}>
                      <SelectTrigger className="w-[150px] border-[var(--cyber-cyan)]/30 bg-[var(--cyber-dark)]">
                        <SelectValue placeholder="Region" />
                      </SelectTrigger>
                      <SelectContent className="border-[var(--cyber-cyan)]/30 bg-[var(--cyber-dark)]">
                        <SelectItem value="all">All Regions</SelectItem>
                        <SelectItem value="north">North</SelectItem>
                        <SelectItem value="south">South</SelectItem>
                        <SelectItem value="east">East</SelectItem>
                        <SelectItem value="west">West</SelectItem>
                        <SelectItem value="central">Central</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={regionData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="name" stroke="#aaa" />
                        <YAxis stroke="#aaa" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(13, 18, 30, 0.9)', 
                            border: '1px solid rgba(0, 191, 255, 0.5)' 
                          }} 
                        />
                        <Legend />
                        <Bar dataKey="water" name="Water" fill="#36A2EB" />
                        <Bar dataKey="agriculture" name="Agriculture" fill="#4BC0C0" />
                        <Bar dataKey="education" name="Education" fill="#9966FF" />
                        <Bar dataKey="healthcare" name="Healthcare" fill="#FF6384" />
                        <Bar dataKey="energy" name="Energy" fill="#FFCD56" />
                        <Bar dataKey="connectivity" name="Connectivity" fill="#FF9F40" />
                        <Bar dataKey="governance" name="Governance" fill="#C9CBCF" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </SciFiCard>
              </div>

              <div>
                <SciFiCard className="p-5 h-full">
                  <h3 className="text-lg font-medium text-[var(--cyber-cyan)] mb-4">Budget Allocation</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={budgetAllocationData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {budgetAllocationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(13, 18, 30, 0.9)', 
                            border: '1px solid rgba(0, 191, 255, 0.5)' 
                          }} 
                          formatter={(value) => [`${value}%`, 'Budget Allocation']}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </SciFiCard>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SciFiCard className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-[var(--cyber-cyan)]">Implementation Progress</h3>
                  <Select defaultValue="2023" onValueChange={(value) => setYear(parseInt(value))}>
                    <SelectTrigger className="w-[100px] border-[var(--cyber-cyan)]/30 bg-[var(--cyber-dark)]">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent className="border-[var(--cyber-cyan)]/30 bg-[var(--cyber-dark)]">
                      <SelectItem value="2021">2021</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2024">2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={implementationProgress}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      stackOffset="expand"
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="name" stroke="#aaa" />
                      <YAxis stroke="#aaa" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(13, 18, 30, 0.9)', 
                          border: '1px solid rgba(0, 191, 255, 0.5)' 
                        }} 
                      />
                      <Legend />
                      <Bar dataKey="completed" name="Completed" stackId="a" fill="#4BC0C0" />
                      <Bar dataKey="inProgress" name="In Progress" stackId="a" fill="#FFCD56" />
                      <Bar dataKey="planned" name="Planned" stackId="a" fill="#FF6384" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </SciFiCard>

              <SciFiCard className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-[var(--cyber-cyan)]">Deployment Timeline</h3>
                  <Select defaultValue="yearly" onValueChange={setTimeScale}>
                    <SelectTrigger className="w-[120px] border-[var(--cyber-cyan)]/30 bg-[var(--cyber-dark)]">
                      <SelectValue placeholder="Time Scale" />
                    </SelectTrigger>
                    <SelectContent className="border-[var(--cyber-cyan)]/30 bg-[var(--cyber-dark)]">
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={timelineData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="month" stroke="#aaa" />
                      <YAxis stroke="#aaa" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(13, 18, 30, 0.9)', 
                          border: '1px solid rgba(0, 191, 255, 0.5)' 
                        }} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="deployments" 
                        stroke="#36A2EB" 
                        fill="url(#colorDeployments)" 
                        name="Deployments" 
                      />
                      <defs>
                        <linearGradient id="colorDeployments" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#36A2EB" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#36A2EB" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </SciFiCard>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <SciFiCard className="p-4">
                <h3 className="text-sm text-gray-400 mb-1">Total Communities</h3>
                <div className="text-2xl font-bold text-[var(--cyber-cyan)]">1,250</div>
                <div className="text-sm text-[var(--cyber-green)] mt-2">
                  <span className="inline-block mr-1">↑</span>
                  12.5% increase
                </div>
              </SciFiCard>
              
              <SciFiCard className="p-4">
                <h3 className="text-sm text-gray-400 mb-1">Active Projects</h3>
                <div className="text-2xl font-bold text-[var(--cyber-cyan)]">418</div>
                <div className="text-sm text-[var(--cyber-green)] mt-2">
                  <span className="inline-block mr-1">↑</span>
                  8.3% increase
                </div>
              </SciFiCard>
              
              <SciFiCard className="p-4">
                <h3 className="text-sm text-gray-400 mb-1">Total Budget</h3>
                <div className="text-2xl font-bold text-[var(--cyber-cyan)]">$24.5M</div>
                <div className="text-sm text-[var(--cyber-green)] mt-2">
                  <span className="inline-block mr-1">↑</span>
                  15.2% increase
                </div>
              </SciFiCard>
              
              <SciFiCard className="p-4">
                <h3 className="text-sm text-gray-400 mb-1">Impact Score</h3>
                <div className="text-2xl font-bold text-[var(--cyber-cyan)]">8.4/10</div>
                <div className="text-sm text-[var(--cyber-green)] mt-2">
                  <span className="inline-block mr-1">↑</span>
                  0.5 points
                </div>
              </SciFiCard>
            </div>

            {/* Export buttons */}
            <div className="flex flex-wrap gap-3 justify-end">
              <CyberButton onClick={() => exportData("analytics", "csv")} variant="default">
                Export as CSV
              </CyberButton>
              <CyberButton onClick={() => exportData("analytics", "pdf")} variant="default">
                Export as PDF
              </CyberButton>
              <CyberButton onClick={() => exportData("analytics", "excel")} variant="default">
                Export as Excel
              </CyberButton>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}