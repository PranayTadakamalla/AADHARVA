import { apiRequest } from "./queryClient";

// Function to get a response from Gemini API
export const getGeminiResponse = async (message: string): Promise<string> => {
  try {
    // Call our backend to interact with Gemini API
    const data = await apiRequest({
      method: "POST", 
      path: "/api/gemini/chat", 
      body: { message }
    });
    
    if (data.error) {
      console.error("Gemini API error:", data.error);
      return "I'm sorry, I encountered an error processing your request.";
    }
    
    return data.response;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "I'm sorry, I encountered an error. Please try again later.";
  }
};

// Function to simulate Gemini responses for demo purposes (backup in case API isn't available)
export const getSimulatedResponse = (message: string): string => {
  const lowerCaseMessage = message.toLowerCase();
  
  if (lowerCaseMessage.includes("water") || lowerCaseMessage.includes("drinking")) {
    return "Our AI water quality system uses sensors to monitor contamination levels in real-time. It can detect harmful substances, predict water shortages, and optimize distribution. I can help set up a monitoring station in your village and connect you with our water management team.";
  }
  
  if (lowerCaseMessage.includes("farm") || lowerCaseMessage.includes("agriculture") || lowerCaseMessage.includes("crop")) {
    return "AADHARVA's agricultural AI analyzes soil conditions, weather patterns, and crop health to provide personalized recommendations for farmers. Our system has shown a 23% increase in yield and 15% reduction in water usage across pilot villages.";
  }
  
  if (lowerCaseMessage.includes("education") || lowerCaseMessage.includes("school") || lowerCaseMessage.includes("learn")) {
    return "Our education platform connects rural students with quality learning resources through low-bandwidth solutions. We provide personalized learning paths, virtual classrooms, and skill development programs especially designed for areas with limited connectivity.";
  }
  
  if (lowerCaseMessage.includes("health") || lowerCaseMessage.includes("disease") || lowerCaseMessage.includes("medical")) {
    return "AADHARVA's health monitoring system uses predictive analytics to identify potential disease outbreaks before they spread. We connect rural communities with telemedicine services and provide emergency response coordination during health crises.";
  }
  
  if (lowerCaseMessage.includes("climate") || lowerCaseMessage.includes("environment") || lowerCaseMessage.includes("sustainable")) {
    return "Our climate initiative uses satellite data and ground sensors to monitor environmental changes, suggesting sustainable practices for each community's unique ecosystem. We've helped implement rainwater harvesting and solar energy solutions in over 50 villages.";
  }
  
  return "I'm here to help with solutions for rural development challenges including water access, agricultural support, education resources, healthcare, and sustainable practices. Could you tell me more about the specific challenge you're facing?";
};
