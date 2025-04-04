interface MapPoint {
  lat: number;
  lng: number;
  color: string;
  type: string;
  title: string;
}

// Sample data points for the map
const sampleLocations: MapPoint[] = [
  { lat: 20.5937, lng: 78.9629, color: "#0affff", type: "water", title: "Water Purification Plant" },
  { lat: 21.1458, lng: 79.0882, color: "#0affff", type: "water", title: "Community Well Project" },
  { lat: 19.7515, lng: 75.7139, color: "#0affff", type: "water", title: "Rainwater Harvesting" },
  { lat: 28.7041, lng: 77.1025, color: "#f97316", type: "agriculture", title: "Smart Farming Initiative" },
  { lat: 26.8467, lng: 80.9462, color: "#f97316", type: "agriculture", title: "Crop Monitoring Station" },
  { lat: 13.0827, lng: 80.2707, color: "#f97316", type: "agriculture", title: "Agricultural Training Center" },
  { lat: 22.5726, lng: 88.3639, color: "#7c3aed", type: "education", title: "Digital Learning Hub" },
  { lat: 17.3850, lng: 78.4867, color: "#7c3aed", type: "education", title: "Girl Child Education Center" },
  { lat: 23.2599, lng: 77.4126, color: "#7c3aed", type: "education", title: "Rural School Enhancement" },
  { lat: 18.5204, lng: 73.8567, color: "#10b981", type: "health", title: "Mobile Health Clinic" },
  { lat: 30.7333, lng: 76.7794, color: "#10b981", type: "health", title: "Telemedicine Center" },
  { lat: 25.5941, lng: 85.1376, color: "#10b981", type: "health", title: "Disease Monitoring Station" }
];

// Function to initialize the map with Google Maps API
export const initMap = (mapElement: HTMLElement): void => {
  // Check if Google Maps API is loaded
  if (typeof google === "undefined" || !google.maps) {
    console.error("Google Maps API not loaded");
    createMockMap(mapElement);
    return;
  }

  try {
    // Initialize the map
    const map = new google.maps.Map(mapElement, {
      center: { lat: 22.5726, lng: 78.9629 }, // Center of India
      zoom: 5,
      styles: getMapStyles(), // Custom sci-fi map styles
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false
    });

    // Add markers for sample locations
    sampleLocations.forEach(location => {
      const marker = new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: map,
        title: location.title,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: location.color,
          fillOpacity: 0.8,
          strokeColor: location.color,
          strokeWeight: 2,
          scale: 8
        }
      });

      // Add info window for each marker
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; max-width: 200px; color: black;">
            <h3 style="margin: 0 0 5px; font-weight: bold;">${location.title}</h3>
            <p style="margin: 0; font-size: 12px;">Type: ${location.type}</p>
            <p style="margin: 5px 0 0; font-size: 12px;">Status: Active</p>
          </div>
        `
      });

      marker.addListener("click", () => {
        infoWindow.open({
          anchor: marker,
          map,
        });
      });
    });
  } catch (error) {
    console.error("Error initializing Google Maps:", error);
    createMockMap(mapElement);
  }
};

// Fallback function to create a mock map if Google Maps fails to load
function createMockMap(mapElement: HTMLElement): void {
  mapElement.style.position = "relative";
  mapElement.style.backgroundImage = "url('https://images.unsplash.com/photo-1612875895579-b9abb445e8b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2F0ZWxsaXRlJTIwbWFwfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60')";
  mapElement.style.backgroundSize = "cover";
  mapElement.style.backgroundPosition = "center";
  
  // Add stylized grid overlay
  const overlay = document.createElement("div");
  overlay.style.position = "absolute";
  overlay.style.inset = "0";
  overlay.style.backgroundImage = "radial-gradient(circle, rgba(10, 255, 255, 0.2) 1px, transparent 1px)";
  overlay.style.backgroundSize = "20px 20px";
  overlay.style.pointerEvents = "none";
  mapElement.appendChild(overlay);
  
  // Add points for simulated deployment locations
  addMapPoint(mapElement, 25, 30, "#0affff", "Water project");
  addMapPoint(mapElement, 40, 60, "#f97316", "Agriculture project");
  addMapPoint(mapElement, 70, 40, "#7c3aed", "Education hub");
  addMapPoint(mapElement, 50, 70, "#10b981", "Health center");
  addMapPoint(mapElement, 80, 20, "#0affff", "Water project");
  addMapPoint(mapElement, 30, 80, "#7c3aed", "Education hub");

  // Display warning about map loading
  const warning = document.createElement("div");
  warning.style.position = "absolute";
  warning.style.bottom = "10px";
  warning.style.left = "10px";
  warning.style.right = "10px";
  warning.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  warning.style.color = "#0affff";
  warning.style.padding = "10px";
  warning.style.borderRadius = "5px";
  warning.style.fontSize = "12px";
  warning.style.textAlign = "center";
  warning.innerHTML = "Google Maps could not be loaded. Displaying visualization instead.";
  mapElement.appendChild(warning);
}

function addMapPoint(mapElement: HTMLElement, x: number, y: number, color: string, title: string): void {
  const point = document.createElement("div");
  point.style.position = "absolute";
  point.style.left = `${x}%`;
  point.style.top = `${y}%`;
  point.style.width = "12px";
  point.style.height = "12px";
  point.style.borderRadius = "50%";
  point.style.backgroundColor = color;
  point.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;
  point.style.transform = "translate(-50%, -50%)";
  point.style.animation = "pulse 2s infinite";
  point.title = title;
  
  // Add tooltip capabilities
  point.addEventListener("mouseenter", function() {
    const tooltip = document.createElement("div");
    tooltip.className = "map-tooltip";
    tooltip.style.position = "absolute";
    tooltip.style.left = `calc(${x}% + 10px)`;
    tooltip.style.top = `${y}%`;
    tooltip.style.backgroundColor = "rgba(15, 23, 42, 0.9)";
    tooltip.style.color = "#fff";
    tooltip.style.padding = "5px 10px";
    tooltip.style.borderRadius = "4px";
    tooltip.style.fontSize = "12px";
    tooltip.style.zIndex = "100";
    tooltip.style.whiteSpace = "nowrap";
    tooltip.textContent = title;
    mapElement.appendChild(tooltip);
    point.dataset.tooltip = "active";
  });
  
  point.addEventListener("mouseleave", function() {
    const tooltip = mapElement.querySelector(".map-tooltip");
    if (tooltip) {
      mapElement.removeChild(tooltip);
    }
    delete point.dataset.tooltip;
  });
  
  mapElement.appendChild(point);
}

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
