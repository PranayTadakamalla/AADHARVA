import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getGeminiResponse } from "./gemini";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create HTTP server
  const httpServer = createServer(app);

  // Google Maps API Key endpoint
  app.get("/api/config/maps", (req, res) => {
    // Get API key from environment variables in Vite format
    // @ts-ignore - Vite environment variable access
    const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.VITE_GOOGLE_MAPS_API_KEY || "AIzaSyACkxwm1rk-A1vSettc-eDQ6ci7bR7T3Vk";
    
    if (!apiKey || apiKey.trim() === "") {
      return res.status(404).json({ 
        error: "Google Maps API key not configured", 
        message: "Please provide a valid Google Maps API key to enable the map functionality.",
        fallbackAvailable: true
      });
    }
    
    console.log("Providing Google Maps API key to client");
    return res.json({ apiKey, status: "success" });
  });

  // Gemini AI API endpoints
  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { message } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }
      
      const response = await getGeminiResponse(message);
      
      return res.json({ response });
    } catch (error) {
      console.error("Error in Gemini API:", error);
      return res.status(500).json({ 
        error: "Failed to get response from Gemini AI",
        details: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });
  
  // Google Maps API endpoints
  app.get("/api/maps/locations", (req, res) => {
    const { region, filters } = req.query;
    
    // Sample data for rural locations
    const locations = [
      { 
        id: 1, 
        name: "Rajgarh Village", 
        lat: 28.7041, 
        lng: 77.1025, 
        region: "NORTH",
        type: "water",
        details: "Water purification facility serving 500 households" 
      },
      { 
        id: 2, 
        name: "Dhanbad Rural Hub", 
        lat: 23.7957, 
        lng: 86.4304, 
        region: "EAST",
        type: "agriculture",
        details: "Smart farming initiative with 200 farmers" 
      },
      { 
        id: 3, 
        name: "Madurai Outpost", 
        lat: 9.9252, 
        lng: 78.1198, 
        region: "SOUTH",
        type: "education",
        details: "Education hub serving 12 villages and 300 students" 
      },
      { 
        id: 4, 
        name: "Ahmedabad Center", 
        lat: 23.0225, 
        lng: 72.5714, 
        region: "WEST",
        type: "healthcare",
        details: "Rural healthcare center providing services to 15 villages" 
      },
      { 
        id: 5, 
        name: "Nagpur Installation", 
        lat: 21.1458, 
        lng: 79.0882, 
        region: "CENTRAL",
        type: "energy",
        details: "Solar micro-grid powering 8 rural communities" 
      },
      { 
        id: 6, 
        name: "Varanasi Networks", 
        lat: 25.3176, 
        lng: 82.9739, 
        region: "NORTH",
        type: "connectivity",
        details: "Internet connectivity hub servicing 12 rural areas" 
      },
      { 
        id: 7, 
        name: "Thiruvananthapuram Center", 
        lat: 8.5241, 
        lng: 76.9366, 
        region: "SOUTH",
        type: "governance",
        details: "Digital governance center serving 25 villages" 
      }
    ];
    
    // Filter based on query parameters
    let filteredLocations = locations;
    
    if (region && region !== 'all') {
      filteredLocations = filteredLocations.filter(loc => 
        loc.region.toLowerCase() === String(region).toLowerCase()
      );
    }
    
    if (filters) {
      const filterTypes = String(filters).split(',');
      filteredLocations = filteredLocations.filter(loc => 
        filterTypes.includes(loc.type)
      );
    }
    
    return res.json(filteredLocations);
  });

  // Maps analytics data for visualization
  app.get("/api/maps/analytics", (req, res) => {
    // Analytics data for maps and charts
    const analyticsData = {
      regionProgress: [
        { name: 'North', water: 65, agriculture: 78, education: 42, healthcare: 55, energy: 40, connectivity: 38, governance: 50 },
        { name: 'South', water: 75, agriculture: 65, education: 60, healthcare: 70, energy: 55, connectivity: 50, governance: 62 },
        { name: 'East', water: 60, agriculture: 70, education: 45, healthcare: 50, energy: 42, connectivity: 35, governance: 45 },
        { name: 'West', water: 70, agriculture: 72, education: 55, healthcare: 60, energy: 50, connectivity: 45, governance: 55 },
        { name: 'Central', water: 55, agriculture: 68, education: 50, healthcare: 45, energy: 38, connectivity: 30, governance: 40 },
      ],
      budgetAllocation: [
        { name: 'Water', value: 25, color: '#36A2EB' },
        { name: 'Agriculture', value: 20, color: '#4BC0C0' },
        { name: 'Education', value: 15, color: '#9966FF' },
        { name: 'Healthcare', value: 18, color: '#FF6384' },
        { name: 'Energy', value: 12, color: '#FFCD56' },
        { name: 'Connectivity', value: 5, color: '#FF9F40' },
        { name: 'Governance', value: 5, color: '#C9CBCF' },
      ],
      implementationProgress: [
        { name: 'North', completed: 65, inProgress: 20, planned: 15 },
        { name: 'South', completed: 70, inProgress: 15, planned: 15 },
        { name: 'East', completed: 55, inProgress: 25, planned: 20 },
        { name: 'West', completed: 60, inProgress: 20, planned: 20 },
        { name: 'Central', completed: 50, inProgress: 30, planned: 20 },
      ],
      timeline: [
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
      ],
      kpis: {
        totalCommunities: 1250,
        communityGrowth: 12.5,
        activeProjects: 418,
        projectGrowth: 8.3,
        totalBudget: 24.5,
        budgetGrowth: 15.2,
        impactScore: 8.4,
        impactGrowth: 0.5
      }
    };
    
    return res.json(analyticsData);
  });

  return httpServer;
}
