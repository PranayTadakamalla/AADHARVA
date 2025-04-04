import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import WaterPage from "@/pages/WaterPage";
import AgriculturePage from "@/pages/AgriculturePage";
import EducationPage from "@/pages/EducationPage";
import HealthcarePage from "@/pages/HealthcarePage";
import EnergyPage from "@/pages/EnergyPage";
import ConnectivityPage from "@/pages/ConnectivityPage";
import GovernancePage from "@/pages/GovernancePage";
import MapsPage from "@/pages/MapsPage";
import AssistantPage from "@/pages/AssistantPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/water" component={WaterPage} />
      <Route path="/agriculture" component={AgriculturePage} />
      <Route path="/education" component={EducationPage} />
      <Route path="/healthcare" component={HealthcarePage} />
      <Route path="/energy" component={EnergyPage} />
      <Route path="/connectivity" component={ConnectivityPage} />
      <Route path="/governance" component={GovernancePage} />
      <Route path="/maps" component={MapsPage} />
      <Route path="/assistant" component={AssistantPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
