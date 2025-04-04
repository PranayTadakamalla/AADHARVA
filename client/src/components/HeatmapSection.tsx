import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { apiRequest } from '@/lib/queryClient';

// Define types for safety
interface DataPoint {
  x: number;
  y: number;
  weight: number;
  color: string;
  sector: string;
}

export default function HeatmapSection() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [activeDataset, setActiveDataset] = useState<string>('water');
  const [loading, setLoading] = useState(true);

  // Different datasets for heatmap visualization
  const dataSets = {
    water: generateRandomDataPoints('water', '#0affff', 30),
    agriculture: generateRandomDataPoints('agriculture', '#10b981', 30),
    education: generateRandomDataPoints('education', '#7c3aed', 30),
    healthcare: generateRandomDataPoints('healthcare', '#f87171', 30),
    energy: generateRandomDataPoints('energy', '#facc15', 30),
    connectivity: generateRandomDataPoints('connectivity', '#f43f5e', 30)
  };

  // Initialize the heatmap when component mounts
  useEffect(() => {
    if (!mapRef.current) return;
    
    // Create the canvas
    initializeHeatmap();
    
    // Set loading to false
    setLoading(false);
  }, []);
  
  // Update the heatmap when dataset changes
  useEffect(() => {
    if (!mapRef.current || loading) return;
    
    // Re-render the heatmap with new dataset
    renderHeatmap(dataSets[activeDataset as keyof typeof dataSets]);
  }, [activeDataset, loading]);

  // Initialize the heatmap container with React-safe approach
  const initializeHeatmap = () => {
    if (!mapRef.current) return;
    
    const container = mapRef.current;
    
    // Use a reference to check if canvas already exists
    const existingCanvas = container.querySelector('#heatmap-canvas');
    if (!existingCanvas) {
      // Create a new canvas if it doesn't exist
      const canvas = document.createElement('canvas');
      canvas.id = 'heatmap-canvas';
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.pointerEvents = 'none';
      container.appendChild(canvas);
    }
    
    // Initialize with first dataset
    renderHeatmap(dataSets[activeDataset as keyof typeof dataSets]);
  };
  
  // Render the heatmap with provided data points
  const renderHeatmap = (dataPoints: DataPoint[]) => {
    if (!mapRef.current) return;
    
    const canvas = document.getElementById('heatmap-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear previous heatmap
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Get the color for the current dataset
    const color = dataPoints[0]?.color || '#0affff';
    
    // Draw each data point
    dataPoints.forEach(point => {
      const x = point.x / 100 * canvas.width;
      const y = point.y / 100 * canvas.height;
      const intensity = point.weight / 10; // Normalize weight to 0-1 scale
      
      // Create a radial gradient based on the intensity
      const gradient = ctx.createRadialGradient(
        x, y, 0, 
        x, y, 40 * intensity
      );
      
      gradient.addColorStop(0, `${color}cc`); // Semi-transparent
      gradient.addColorStop(0.5, `${color}66`); // More transparent
      gradient.addColorStop(1, `${color}00`); // Fully transparent
      
      // Draw the gradient circle
      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(x, y, 40 * intensity, 0, Math.PI * 2);
      ctx.fill();
    });
  };
  
  // Generate random data points for a given sector
  function generateRandomDataPoints(sector: string, color: string, count: number): DataPoint[] {
    const points: DataPoint[] = [];
    
    // Areas of India by region
    const regions = {
      north: { minX: 20, maxX: 40, minY: 10, maxY: 30 },
      south: { minX: 50, maxX: 70, minY: 65, maxY: 85 },
      east: { minX: 60, maxX: 80, minY: 30, maxY: 50 },
      west: { minX: 10, maxX: 30, minY: 40, maxY: 60 },
      central: { minX: 35, maxX: 55, minY: 35, maxY: 55 }
    };
    
    // Distribute points across regions
    for (let i = 0; i < count; i++) {
      const region = Object.values(regions)[Math.floor(Math.random() * 5)];
      const x = Math.random() * (region.maxX - region.minX) + region.minX;
      const y = Math.random() * (region.maxY - region.minY) + region.minY;
      const weight = Math.random() * 7 + 3; // Weight between 3 and 10
      
      points.push({ x, y, weight, color, sector });
    }
    
    return points;
  }

  // Create the dataset selector buttons
  const renderDatasetButtons = () => {
    const datasets = [
      { id: 'water', label: 'Water Resources', color: '#0affff' },
      { id: 'agriculture', label: 'Agriculture', color: '#10b981' },
      { id: 'education', label: 'Education', color: '#7c3aed' },
      { id: 'healthcare', label: 'Healthcare', color: '#f87171' },
      { id: 'energy', label: 'Energy', color: '#facc15' },
      { id: 'connectivity', label: 'Connectivity', color: '#f43f5e' },
    ];

    return (
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        {datasets.map((dataset) => (
          <Button
            key={dataset.id}
            onClick={() => setActiveDataset(dataset.id)}
            variant={activeDataset === dataset.id ? 'default' : 'outline'}
            className="text-xs"
            style={{
              borderColor: dataset.color,
              backgroundColor: activeDataset === dataset.id ? dataset.color : 'transparent',
              color: activeDataset === dataset.id ? 'black' : dataset.color,
            }}
          >
            {dataset.label}
          </Button>
        ))}
      </div>
    );
  };

  return (
    <section className="py-8">
      <div className="container">
        <div className="rounded-lg overflow-hidden border border-gray-800 bg-black/20 backdrop-blur-sm">
          <div className="p-4 md:p-6">
            <h2 className="text-2xl font-bold mb-2 text-cyan-400">Rural Development Heatmap</h2>
            <p className="text-gray-400 mb-4">
              Explore intensity of various rural development activities across India. Toggle between datasets to visualize different sectors.
            </p>
            
            {renderDatasetButtons()}
            
            <div 
              ref={mapRef} 
              className="w-full h-[500px] mt-4 bg-gray-900 rounded-md overflow-hidden relative"
            >
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
                </div>
              )}
            </div>
            
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Low Intensity</span>
                <div className="h-2 flex-grow mx-2 rounded-full" style={{
                  background: activeDataset === 'water' ? 'linear-gradient(to right, rgba(0, 255, 255, 0.3), rgba(0, 0, 255, 1))' :
                             activeDataset === 'agriculture' ? 'linear-gradient(to right, rgba(0, 255, 0, 0.3), rgba(0, 127, 0, 1))' :
                             activeDataset === 'education' ? 'linear-gradient(to right, rgba(128, 0, 255, 0.3), rgba(192, 0, 127, 1))' :
                             activeDataset === 'healthcare' ? 'linear-gradient(to right, rgba(255, 0, 128, 0.3), rgba(127, 0, 192, 1))' :
                             activeDataset === 'energy' ? 'linear-gradient(to right, rgba(255, 255, 0, 0.3), rgba(255, 127, 0, 1))' :
                             'linear-gradient(to right, rgba(255, 0, 0, 0.3), rgba(127, 0, 0, 1))'
                }}></div>
                <span className="text-xs text-gray-400">High Intensity</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
