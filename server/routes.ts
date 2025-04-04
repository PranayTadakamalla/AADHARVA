import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getGeminiResponse } from "./gemini";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create HTTP server
  const httpServer = createServer(app);

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
        region: "NORTH REGION",
        type: "water",
        details: "Water purification facility serving 500 households" 
      },
      { 
        id: 2, 
        name: "Dhanbad Rural Hub", 
        lat: 23.7957, 
        lng: 86.4304, 
        region: "EAST REGION",
        type: "agriculture",
        details: "Smart farming initiative with 200 farmers" 
      },
      { 
        id: 3, 
        name: "Madurai Outpost", 
        lat: 9.9252, 
        lng: 78.1198, 
        region: "SOUTH REGION",
        type: "education",
        details: "Education hub serving 12 villages and 300 students" 
      }
    ];
    
    // Filter based on query parameters
    let filteredLocations = locations;
    
    if (region) {
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

  return httpServer;
}
