import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/globals.css";

// Load Google Maps API
const loadGoogleMapsScript = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";
  if (!apiKey) {
    console.error("Google Maps API key not found. Map functionality will be limited.");
  }
  
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
  script.async = true;
  script.defer = true;
  script.id = "google-maps-script";
  document.head.appendChild(script);
};

loadGoogleMapsScript();

createRoot(document.getElementById("root")!).render(<App />);
