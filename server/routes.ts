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

  return httpServer;
}
