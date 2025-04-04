// Maps utility functions and helpers
interface MapPoint {
  lat: number;
  lng: number;
  color: string;
  type: string;
  title: string;
}

// Function to initialize Google Maps with API key
export const initMap = (mapElement: HTMLElement, center = { lat: 20.5937, lng: 78.9629 }, zoom = 5): void => {
  if (!mapElement) return;
  
  try {
    if (!window.google) {
      console.error("Google Maps API not loaded");
      createMockMap(mapElement);
      return;
    }
    
    const mapOptions = {
      zoom,
      center,
      styles: getMapStyles(),
      mapTypeControl: false,
      streetViewControl: false
    };
    
    const map = new window.google.maps.Map(mapElement, mapOptions);
    return map;
  } catch (error) {
    console.error("Error loading Google Maps:", error);
    createMockMap(mapElement);
  }
};

// Add map marker with enhanced styling and info window
export function addMapMarker(map: any, position: { lat: number, lng: number }, options: { 
  title?: string, 
  color?: string, 
  type?: string,
  content?: string
}): void {
  if (!map) return;
  
  try {
    const marker = new window.google.maps.Marker({
      position,
      map,
      title: options.title || '',
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        fillColor: options.color || '#36A2EB',
        fillOpacity: 0.9,
        strokeWeight: 0,
        scale: 10
      }
    });
    
    if (options.content) {
      const infoWindow = new window.google.maps.InfoWindow({
        content: options.content
      });
      
      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });
    }
    
    return marker;
  } catch (error) {
    console.error("Error adding map marker:", error);
  }
}

// Get predefined map styles for dark theme
export function getMapStyles() {
  return [
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
}

// Create a visual mock map if Google Maps fails to load
function createMockMap(mapElement: HTMLElement): void {
  if (!mapElement) return;
  
  mapElement.innerHTML = '';
  mapElement.style.backgroundColor = '#0e1626';
  mapElement.style.position = 'relative';
  mapElement.style.overflow = 'hidden';
  
  // Create a simple grid pattern
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
  
  // Add message about missing API
  const message = document.createElement('div');
  message.style.position = 'absolute';
  message.style.top = '50%';
  message.style.left = '50%';
  message.style.transform = 'translate(-50%, -50%)';
  message.style.color = '#8ec3b9';
  message.style.fontWeight = 'bold';
  message.style.backgroundColor = 'rgba(13, 18, 30, 0.8)';
  message.style.padding = '16px';
  message.style.borderRadius = '8px';
  message.style.border = '1px solid rgba(0, 191, 255, 0.5)';
  message.textContent = 'Map data visualization (API key required)';
  mapElement.appendChild(message);
  
  // Add mock points representing projects
  const mockPoints = [
    { x: 30, y: 20, color: '#36A2EB', title: 'Water Project' },
    { x: 70, y: 30, color: '#4BC0C0', title: 'Agriculture Hub' },
    { x: 50, y: 75, color: '#9966FF', title: 'Education Center' },
    { x: 25, y: 60, color: '#FF6384', title: 'Healthcare Facility' },
    { x: 80, y: 45, color: '#FFCD56', title: 'Energy Installation' },
  ];
  
  mockPoints.forEach(point => {
    addMapPoint(mapElement, point.x, point.y, point.color, point.title);
  });
  
  // Add a region label
  addRegionLabel(mapElement, 50, 10, 'NORTH REGION');
  addRegionLabel(mapElement, 50, 90, 'SOUTH REGION');
  addRegionLabel(mapElement, 10, 50, 'WEST REGION');
  addRegionLabel(mapElement, 90, 50, 'EAST REGION');
}

// Add a point to the mock map
function addMapPoint(mapElement: HTMLElement, x: number, y: number, color: string, title: string): void {
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
  
  // Add keyframes for animation
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes pulse {
      0% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 0.5;
      }
      100% {
        transform: translate(-50%, -50%) scale(2.5);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
  
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
    tooltip.classList.add('map-tooltip');
    mapElement.appendChild(tooltip);
  });
  
  point.addEventListener('mouseout', () => {
    const tooltips = mapElement.querySelectorAll('.map-tooltip');
    tooltips.forEach(t => t.remove());
  });
}

// Add region label to the mock map
function addRegionLabel(mapElement: HTMLElement, x: number, y: number, label: string): void {
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
}

// Get all locations data from API
export async function getLocations(filters?: string[], region?: string): Promise<any[]> {
  try {
    let url = '/api/maps/locations';
    const params = new URLSearchParams();
    
    if (region && region !== 'all') {
      params.append('region', region);
    }
    
    if (filters && filters.length > 0) {
      params.append('filters', filters.join(','));
    }
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch locations');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
}