export async function getGeminiResponse(message: string): Promise<string> {
  try {
    // Using process.env for server-side access to environment variables
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.warn("Gemini API key not found, using fallback responses");
      return getSimulatedResponse(message);
    }
    
    // Format the message for the Gemini API
    const body = {
      contents: [
        {
          parts: [
            {
              text: `You are AADHARVA, an AI assistant specializing in rural development solutions. 
              Focus on these areas: clean water access, farmer livelihoods, girl child education, 
              natural resource management, health crisis prevention, climate change practices, and 
              gender equality in employment. Provide helpful, concise information about these topics.
              
              User query: ${message}`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 800,
      }
    };
    
    // Make the API call to Gemini
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", errorText);
      throw new Error(`Gemini API error: ${response.status} ${errorText}`);
    }
    
    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
      return data.candidates[0].content.parts[0].text;
    }
    
    throw new Error("Unexpected response format from Gemini API");
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return getSimulatedResponse(message);
  }
}

// Fallback responses in case API is unavailable
function getSimulatedResponse(message: string): string {
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
}
