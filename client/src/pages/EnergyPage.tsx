import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SciFiCard } from "@/components/ui/sci-fi-card";
import { CyberButton } from "@/components/ui/cyber-button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export default function EnergyPage() {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample data for charts
  const energySourceData = [
    { name: 'Solar', value: 45 },
    { name: 'Biomass', value: 25 },
    { name: 'Micro-hydro', value: 15 },
    { name: 'Wind', value: 10 },
    { name: 'Traditional', value: 5 },
  ];

  const COLORS = ['#10b981', '#0affff', '#7c3aed', '#2563eb', '#f97316'];

  const energyTrendData = [
    { month: 'Jan', solarOutput: 120, consumption: 110 },
    { month: 'Feb', solarOutput: 140, consumption: 115 },
    { month: 'Mar', solarOutput: 160, consumption: 125 },
    { month: 'Apr', solarOutput: 180, consumption: 135 },
    { month: 'May', solarOutput: 200, consumption: 145 },
    { month: 'Jun', solarOutput: 220, consumption: 150 },
  ];

  const communityAdoptionData = [
    { village: 'Village A', adoption: 75 },
    { village: 'Village B', adoption: 45 },
    { village: 'Village C', adoption: 95 },
    { village: 'Village D', adoption: 60 },
    { village: 'Village E', adoption: 85 },
    { village: 'Village F', adoption: 70 },
  ];

  const impactData = [
    { year: '2020', co2Reduction: 25, economic: 15 },
    { year: '2021', co2Reduction: 45, economic: 25 },
    { year: '2022', co2Reduction: 65, economic: 40 },
    { year: '2023', co2Reduction: 85, economic: 65 },
    { year: '2024', co2Reduction: 110, economic: 90 },
  ];

  return (
    <div className="bg-[var(--cyber-dark)] font-inter text-gray-100 min-h-screen overflow-x-hidden">
      <Header />
      <main className="container mx-auto py-8 px-4 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-rajdhani font-bold mb-2 text-[var(--cyber-green)] glowing-text">Renewable Energy Network</h1>
          <div className="cyber-line mb-8"></div>
          
          <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
            <CyberButton 
              variant={activeTab === "overview" ? "default" : "outline"} 
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </CyberButton>
            <CyberButton 
              variant={activeTab === "solar" ? "default" : "outline"} 
              onClick={() => setActiveTab("solar")}
            >
              Solar Systems
            </CyberButton>
            <CyberButton 
              variant={activeTab === "microgrids" ? "default" : "outline"} 
              onClick={() => setActiveTab("microgrids")}
            >
              Microgrids
            </CyberButton>
            <CyberButton 
              variant={activeTab === "impact" ? "default" : "outline"} 
              onClick={() => setActiveTab("impact")}
            >
              Impact Data
            </CyberButton>
          </div>

          {activeTab === "overview" && (
            <SciFiCard>
              <h2 className="text-2xl font-rajdhani font-semibold text-[var(--cyber-green)] mb-4">Rural Energy Transformation</h2>
              <p className="mb-4">
                Our renewable energy initiative leverages AI optimization, IoT monitoring, and smart grid technology to bring 
                reliable, sustainable power to rural communities. By combining solar, biomass, micro-hydro, and wind resources 
                with intelligent distribution systems, we're enabling energy independence and supporting economic development.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-green)] mb-3">Energy Sources</h3>
                  <p className="mb-3">Distribution of renewable energy sources in rural communities</p>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={energySourceData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {energySourceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#10b981' }} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-green)] mb-3">Solar Output vs. Consumption</h3>
                  <p className="mb-3">Monthly solar energy generation compared to community usage</p>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={energyTrendData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="month" stroke="rgba(255,255,255,0.7)" />
                        <YAxis stroke="rgba(255,255,255,0.7)" />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#10b981' }} />
                        <Legend />
                        <Line type="monotone" dataKey="solarOutput" name="Solar Output (kWh)" stroke="#10b981" strokeWidth={2} />
                        <Line type="monotone" dataKey="consumption" name="Consumption (kWh)" stroke="#0affff" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-4">
                <CyberButton onClick={() => window.location.href = '/energy/systems'}>
                  <i className="fas fa-solar-panel mr-2"></i> View Energy Systems
                </CyberButton>
                <CyberButton variant="outline" onClick={() => window.location.href = '/energy/report'}>
                  <i className="fas fa-file-chart-line mr-2"></i> Generate Energy Report
                </CyberButton>
              </div>
            </SciFiCard>
          )}

          {activeTab === "solar" && (
            <SciFiCard>
              <h2 className="text-2xl font-rajdhani font-semibold text-[var(--cyber-green)] mb-4">Solar Power Systems</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Installed Capacity</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-green)] mb-1">840 kW</div>
                  <div className="text-sm text-gray-300">Across 35 communities</div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Energy Storage</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-cyan)] mb-1">1.2 MWh</div>
                  <div className="text-sm text-gray-300">Battery backup capacity</div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Annual Production</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-purple)] mb-1">1.5 GWh</div>
                  <div className="text-sm text-gray-300">Clean energy generated yearly</div>
                </div>
              </div>
              
              <div className="bg-[var(--cyber-blue)] p-4 rounded-lg mb-6">
                <h3 className="text-xl font-rajdhani text-[var(--cyber-green)] mb-3">Community Adoption</h3>
                <p className="mb-3">Percentage of community households connected to solar systems</p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={communityAdoptionData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="village" stroke="rgba(255,255,255,0.7)" />
                      <YAxis stroke="rgba(255,255,255,0.7)" />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#10b981' }} />
                      <Bar dataKey="adoption" fill="#10b981" name="Adoption Rate (%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg border border-[var(--cyber-green)] border-opacity-30">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-green)] mb-3">Active Solar Projects</h3>
                  
                  <div className="space-y-4">
                    <div className="border border-[var(--cyber-green)] border-opacity-20 p-3 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-rajdhani text-[var(--cyber-green)]">Eastern Region Solar Array</h4>
                        <span className="px-2 py-1 bg-[var(--cyber-green)] bg-opacity-20 text-[var(--cyber-green)] rounded text-xs">OPERATIONAL</span>
                      </div>
                      <p className="text-sm mb-2">Large-scale solar array providing power to 8 villages in the Eastern region.</p>
                      <div className="flex justify-between text-xs">
                        <span>Capacity: 240kW</span>
                        <span>Uptime: 99.2%</span>
                      </div>
                    </div>
                    
                    <div className="border border-[var(--cyber-green)] border-opacity-20 p-3 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-rajdhani text-[var(--cyber-green)]">Community Microgrid Network</h4>
                        <span className="px-2 py-1 bg-[var(--cyber-cyan)] bg-opacity-20 text-[var(--cyber-cyan)] rounded text-xs">EXPANDING</span>
                      </div>
                      <p className="text-sm mb-2">Distributed solar network with peer-to-peer energy sharing capabilities.</p>
                      <div className="flex justify-between text-xs">
                        <span>Capacity: 180kW</span>
                        <span>Communities: 12</span>
                      </div>
                    </div>
                    
                    <div className="border border-[var(--cyber-green)] border-opacity-20 p-3 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-rajdhani text-[var(--cyber-green)]">Agricultural Solar Pumps</h4>
                        <span className="px-2 py-1 bg-[var(--cyber-green)] bg-opacity-20 text-[var(--cyber-green)] rounded text-xs">OPERATIONAL</span>
                      </div>
                      <p className="text-sm mb-2">Solar-powered irrigation systems with AI-optimized water management.</p>
                      <div className="flex justify-between text-xs">
                        <span>Units: 85</span>
                        <span>Area Covered: 320 hectares</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg border border-[var(--cyber-green)] border-opacity-30">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-green)] mb-3">Technical Specifications</h3>
                  
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="w-10 h-10 bg-[var(--cyber-green)] bg-opacity-20 rounded-full flex items-center justify-center mr-3 shrink-0">
                        <i className="fas fa-solar-panel text-[var(--cyber-green)]"></i>
                      </div>
                      <div>
                        <h4 className="font-rajdhani text-white mb-1">Solar Panels</h4>
                        <p className="text-sm">High-efficiency monocrystalline panels with 22% conversion efficiency and 25-year lifespan. Special anti-dust coating for rural environments.</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-10 h-10 bg-[var(--cyber-green)] bg-opacity-20 rounded-full flex items-center justify-center mr-3 shrink-0">
                        <i className="fas fa-car-battery text-[var(--cyber-green)]"></i>
                      </div>
                      <div>
                        <h4 className="font-rajdhani text-white mb-1">Energy Storage</h4>
                        <p className="text-sm">Lithium iron phosphate batteries with 10-year warranty, optimized for high-cycle operations and extreme temperature conditions.</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-10 h-10 bg-[var(--cyber-green)] bg-opacity-20 rounded-full flex items-center justify-center mr-3 shrink-0">
                        <i className="fas fa-microchip text-[var(--cyber-green)]"></i>
                      </div>
                      <div>
                        <h4 className="font-rajdhani text-white mb-1">Smart Controllers</h4>
                        <p className="text-sm">AI-enabled control systems that optimize energy production, storage, and distribution based on weather forecasts and usage patterns.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <CyberButton onClick={() => alert("Solar system calculator will open")}>
                  <i className="fas fa-calculator mr-2"></i> System Calculator
                </CyberButton>
                <CyberButton variant="outline" onClick={() => alert("Maintenance schedule will be displayed")}>
                  <i className="fas fa-tools mr-2"></i> Maintenance Portal
                </CyberButton>
              </div>
            </SciFiCard>
          )}

          {activeTab === "microgrids" && (
            <SciFiCard>
              <h2 className="text-2xl font-rajdhani font-semibold text-[var(--cyber-green)] mb-4">Smart Microgrid Systems</h2>
              
              <div className="bg-[var(--cyber-blue)] p-4 rounded-lg mb-6">
                <h3 className="text-xl font-rajdhani text-[var(--cyber-green)] mb-3">Microgrid Operations</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border border-[var(--cyber-green)] border-opacity-30 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-rajdhani text-[var(--cyber-green)]">Eastern Grid</h4>
                      <span className="px-2 py-1 bg-[var(--cyber-green)] bg-opacity-20 text-[var(--cyber-green)] rounded text-xs">OPTIMAL</span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Energy Balance</span>
                          <span className="text-[var(--cyber-green)]">+15% surplus</span>
                        </div>
                        <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                          <div className="h-full bg-[var(--cyber-green)]" style={{ width: "85%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Storage</span>
                          <span className="text-[var(--cyber-green)]">82% charged</span>
                        </div>
                        <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                          <div className="h-full bg-[var(--cyber-cyan)]" style={{ width: "82%" }}></div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 mt-2">
                        <i className="fas fa-users mr-1"></i> 850 households connected
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-[var(--cyber-orange)] border-opacity-30 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-rajdhani text-[var(--cyber-orange)]">Western Grid</h4>
                      <span className="px-2 py-1 bg-[var(--cyber-orange)] bg-opacity-20 text-[var(--cyber-orange)] rounded text-xs">ATTENTION</span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Energy Balance</span>
                          <span className="text-[var(--cyber-orange)]">-8% deficit</span>
                        </div>
                        <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                          <div className="h-full bg-[var(--cyber-orange)]" style={{ width: "45%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Storage</span>
                          <span className="text-[var(--cyber-orange)]">38% charged</span>
                        </div>
                        <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                          <div className="h-full bg-[var(--cyber-orange)]" style={{ width: "38%" }}></div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 mt-2">
                        <i className="fas fa-users mr-1"></i> 620 households connected
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-[var(--cyber-cyan)] border-opacity-30 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-rajdhani text-[var(--cyber-cyan)]">Northern Grid</h4>
                      <span className="px-2 py-1 bg-[var(--cyber-cyan)] bg-opacity-20 text-[var(--cyber-cyan)] rounded text-xs">BALANCED</span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Energy Balance</span>
                          <span className="text-[var(--cyber-cyan)]">+2% surplus</span>
                        </div>
                        <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                          <div className="h-full bg-[var(--cyber-cyan)]" style={{ width: "65%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Storage</span>
                          <span className="text-[var(--cyber-cyan)]">64% charged</span>
                        </div>
                        <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                          <div className="h-full bg-[var(--cyber-cyan)]" style={{ width: "64%" }}></div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 mt-2">
                        <i className="fas fa-users mr-1"></i> 540 households connected
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg border border-[var(--cyber-green)] border-opacity-30">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-green)] mb-3">Smart Grid Features</h3>
                  
                  <div className="space-y-4">
                    <div className="border border-[var(--cyber-green)] border-opacity-20 p-3 rounded-lg">
                      <div className="flex items-center mb-2">
                        <i className="fas fa-exchange-alt text-[var(--cyber-green)] mr-2"></i>
                        <h4 className="font-rajdhani">Peer-to-Peer Energy Trading</h4>
                      </div>
                      <p className="text-sm">Blockchain-based platform allowing communities to buy and sell excess energy, creating local energy markets.</p>
                    </div>
                    
                    <div className="border border-[var(--cyber-green)] border-opacity-20 p-3 rounded-lg">
                      <div className="flex items-center mb-2">
                        <i className="fas fa-brain text-[var(--cyber-green)] mr-2"></i>
                        <h4 className="font-rajdhani">AI Load Balancing</h4>
                      </div>
                      <p className="text-sm">Intelligent algorithms that predict demand patterns and optimize energy distribution to prevent outages.</p>
                    </div>
                    
                    <div className="border border-[var(--cyber-green)] border-opacity-20 p-3 rounded-lg">
                      <div className="flex items-center mb-2">
                        <i className="fas fa-chart-line text-[var(--cyber-green)] mr-2"></i>
                        <h4 className="font-rajdhani">Predictive Maintenance</h4>
                      </div>
                      <p className="text-sm">IoT sensors and analytics that detect potential system failures before they occur, ensuring reliable operation.</p>
                    </div>
                    
                    <div className="border border-[var(--cyber-green)] border-opacity-20 p-3 rounded-lg">
                      <div className="flex items-center mb-2">
                        <i className="fas fa-shield-alt text-[var(--cyber-green)] mr-2"></i>
                        <h4 className="font-rajdhani">Resilient Design</h4>
                      </div>
                      <p className="text-sm">System architecture that can operate in island mode during disruptions, providing continuous power to critical facilities.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg border border-[var(--cyber-green)] border-opacity-30">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-green)] mb-3">AI Recommendations</h3>
                  
                  <div className="space-y-4">
                    <div className="p-3 border-l-4 border-[var(--cyber-orange)]">
                      <h4 className="font-rajdhani text-[var(--cyber-orange)] mb-1">Western Grid Alert</h4>
                      <p className="text-sm mb-2">Energy deficit detected. Recommended actions:</p>
                      <ul className="text-sm space-y-1 list-disc pl-4">
                        <li>Initiate load management protocol for non-essential services</li>
                        <li>Activate battery reserves during peak hours (17:00-21:00)</li>
                        <li>Deploy mobile solar array for temporary capacity boost</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 border-l-4 border-[var(--cyber-green)]">
                      <h4 className="font-rajdhani text-[var(--cyber-green)] mb-1">Eastern Grid Optimization</h4>
                      <p className="text-sm mb-2">Energy surplus detected. Recommended actions:</p>
                      <ul className="text-sm space-y-1 list-disc pl-4">
                        <li>Redirect 8% surplus to Western Grid through interconnection</li>
                        <li>Store excess energy in long-term storage facilities</li>
                        <li>Enable additional community services (water purification, etc.)</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 border-l-4 border-[var(--cyber-cyan)]">
                      <h4 className="font-rajdhani text-[var(--cyber-cyan)] mb-1">System Expansion Recommendation</h4>
                      <p className="text-sm mb-2">Based on current usage patterns and growth:</p>
                      <ul className="text-sm space-y-1 list-disc pl-4">
                        <li>Add 120kW additional capacity to Western Grid within 3 months</li>
                        <li>Upgrade energy storage in Northern Grid to accommodate seasonal variations</li>
                        <li>Implement advanced demand response systems in all communities</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <CyberButton onClick={() => alert("Grid control interface will open")}>
                  <i className="fas fa-sliders-h mr-2"></i> Grid Control Panel
                </CyberButton>
                <CyberButton variant="outline" onClick={() => alert("Alert management system will open")}>
                  <i className="fas fa-bell mr-2"></i> Alert Management
                </CyberButton>
              </div>
            </SciFiCard>
          )}

          {activeTab === "impact" && (
            <SciFiCard>
              <h2 className="text-2xl font-rajdhani font-semibold text-[var(--cyber-green)] mb-4">Impact Assessment</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">CO₂ Reduction</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-green)] mb-1">2,840</div>
                  <div className="text-sm text-gray-300">Tons of CO₂ avoided annually</div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Economic Benefit</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-cyan)] mb-1">$1.2M</div>
                  <div className="text-sm text-gray-300">Annual economic value generated</div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Productive Hours</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-purple)] mb-1">+4.2h</div>
                  <div className="text-sm text-gray-300">Daily productive hours added</div>
                </div>
              </div>
              
              <div className="bg-[var(--cyber-blue)] p-4 rounded-lg mb-6">
                <h3 className="text-xl font-rajdhani text-[var(--cyber-green)] mb-3">CO₂ Reduction & Economic Impact</h3>
                <p className="mb-3">Annual carbon reduction and economic benefits trend</p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={impactData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="year" stroke="rgba(255,255,255,0.7)" />
                      <YAxis stroke="rgba(255,255,255,0.7)" />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#10b981' }} />
                      <Legend />
                      <Bar dataKey="co2Reduction" name="CO₂ Reduction (tons)" fill="#10b981" />
                      <Bar dataKey="economic" name="Economic Benefit ($1000s)" fill="#0affff" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-[var(--cyber-blue)] p-4 rounded-lg mb-6">
                <h3 className="text-xl font-rajdhani text-[var(--cyber-green)] mb-3">Community Success Stories</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border border-[var(--cyber-green)] border-opacity-30 p-4 rounded-lg">
                    <h4 className="font-rajdhani text-[var(--cyber-green)] mb-2">Eastern Village Microbusiness Hub</h4>
                    <p className="text-sm mb-3">Access to reliable electricity enabled the launch of 15 new small businesses, including a computer training center, carpentry workshop, and food processing facility.</p>
                    <div className="text-xs text-gray-400">
                      <div className="mb-1"><i className="fas fa-briefcase mr-1"></i> 15 new businesses</div>
                      <div><i className="fas fa-users mr-1"></i> 45 new jobs created</div>
                    </div>
                  </div>
                  
                  <div className="border border-[var(--cyber-green)] border-opacity-30 p-4 rounded-lg">
                    <h4 className="font-rajdhani text-[var(--cyber-green)] mb-2">Northern Region Healthcare</h4>
                    <p className="text-sm mb-3">Reliable power enabled the establishment of a 24/7 cold chain for vaccines and medications, significantly improving healthcare outcomes for five communities.</p>
                    <div className="text-xs text-gray-400">
                      <div className="mb-1"><i className="fas fa-syringe mr-1"></i> 98% vaccination rate</div>
                      <div><i className="fas fa-heartbeat mr-1"></i> 35% improvement in care</div>
                    </div>
                  </div>
                  
                  <div className="border border-[var(--cyber-green)] border-opacity-30 p-4 rounded-lg">
                    <h4 className="font-rajdhani text-[var(--cyber-green)] mb-2">Southern Digital Education</h4>
                    <p className="text-sm mb-3">Consistent power supply allowed for the implementation of digital education programs, connecting rural students with global learning resources.</p>
                    <div className="text-xs text-gray-400">
                      <div className="mb-1"><i className="fas fa-graduation-cap mr-1"></i> 840 students benefiting</div>
                      <div><i className="fas fa-chart-line mr-1"></i> 28% test score improvement</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <CyberButton onClick={() => alert("Impact calculator will open")}>
                  <i className="fas fa-calculator mr-2"></i> Calculate Your Impact
                </CyberButton>
                <CyberButton variant="outline" onClick={() => alert("Case studies will be displayed")}>
                  <i className="fas fa-book mr-2"></i> View Case Studies
                </CyberButton>
              </div>
            </SciFiCard>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}