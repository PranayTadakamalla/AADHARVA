import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SciFiCard } from "@/components/ui/sci-fi-card";
import { CyberButton } from "@/components/ui/cyber-button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

export default function AgriculturePage() {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample data for charts
  const yieldData = [
    { year: '2020', traditional: 65, aiEnhanced: 78 },
    { year: '2021', traditional: 68, aiEnhanced: 88 },
    { year: '2022', traditional: 63, aiEnhanced: 95 },
    { year: '2023', traditional: 69, aiEnhanced: 105 },
    { year: '2024', traditional: 72, aiEnhanced: 120 },
  ];

  const cropDistributionData = [
    { name: 'Maize', value: 35 },
    { name: 'Rice', value: 25 },
    { name: 'Vegetables', value: 20 },
    { name: 'Fruits', value: 15 },
    { name: 'Other', value: 5 },
  ];

  const soilHealthData = [
    { month: 'Jan', ph: 6.2, nitrogen: 65, phosphorus: 45 },
    { month: 'Feb', ph: 6.3, nitrogen: 68, phosphorus: 48 },
    { month: 'Mar', ph: 6.4, nitrogen: 72, phosphorus: 51 },
    { month: 'Apr', ph: 6.5, nitrogen: 75, phosphorus: 55 },
    { month: 'May', ph: 6.7, nitrogen: 80, phosphorus: 60 },
    { month: 'Jun', ph: 6.8, nitrogen: 82, phosphorus: 62 },
  ];

  const climateResilienceData = [
    { subject: 'Drought Resistance', A: 75, B: 40 },
    { subject: 'Flood Resistance', A: 60, B: 30 },
    { subject: 'Disease Resistance', A: 85, B: 50 },
    { subject: 'Pest Resistance', A: 70, B: 45 },
    { subject: 'Heat Tolerance', A: 65, B: 35 },
    { subject: 'Cold Tolerance', A: 60, B: 40 },
  ];

  return (
    <div className="bg-[var(--cyber-dark)] font-inter text-gray-100 min-h-screen overflow-x-hidden">
      <Header />
      <main className="container mx-auto py-8 px-4 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-rajdhani font-bold mb-2 text-[var(--cyber-green)] glowing-text">Smart Agriculture Systems</h1>
          <div className="cyber-line mb-8"></div>
          
          <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
            <CyberButton 
              variant={activeTab === "overview" ? "default" : "outline"} 
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </CyberButton>
            <CyberButton 
              variant={activeTab === "crops" ? "default" : "outline"} 
              onClick={() => setActiveTab("crops")}
            >
              Crop Management
            </CyberButton>
            <CyberButton 
              variant={activeTab === "soil" ? "default" : "outline"} 
              onClick={() => setActiveTab("soil")}
            >
              Soil Analytics
            </CyberButton>
            <CyberButton 
              variant={activeTab === "climate" ? "default" : "outline"} 
              onClick={() => setActiveTab("climate")}
            >
              Climate Resilience
            </CyberButton>
          </div>

          {activeTab === "overview" && (
            <SciFiCard>
              <h2 className="text-2xl font-rajdhani font-semibold text-[var(--cyber-green)] mb-4">AI-Augmented Farming Systems</h2>
              <p className="mb-4">
                Our precision agriculture platform leverages AI, IoT sensors, and data analytics to optimize crop yield,
                reduce water usage, and enhance resilience to climate change. Smart monitoring systems provide real-time
                insights into soil health, moisture levels, and plant growth patterns, enabling data-driven decision making
                for rural farmers.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-green)] mb-3">Yield Comparison</h3>
                  <p className="mb-3">Traditional farming vs. AI-enhanced farming yield per hectare (quintals)</p>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={yieldData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="year" stroke="rgba(255,255,255,0.7)" />
                        <YAxis stroke="rgba(255,255,255,0.7)" />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#10b981' }} />
                        <Legend />
                        <Line type="monotone" dataKey="traditional" stroke="#7c3aed" strokeWidth={2} />
                        <Line type="monotone" dataKey="aiEnhanced" stroke="#10b981" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-green)] mb-3">Crop Distribution</h3>
                  <p className="mb-3">Current distribution of crops in monitored rural areas.</p>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={cropDistributionData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" />
                        <YAxis stroke="rgba(255,255,255,0.7)" />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#10b981' }} />
                        <Bar dataKey="value" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-4">
                <CyberButton onClick={() => window.location.href = '/agriculture/recommendations'}>
                  <i className="fas fa-leaf mr-2"></i> Get Crop Recommendations
                </CyberButton>
                <CyberButton variant="outline" onClick={() => window.location.href = '/agriculture/report'}>
                  <i className="fas fa-file-alt mr-2"></i> Generate Yield Report
                </CyberButton>
              </div>
            </SciFiCard>
          )}

          {activeTab === "crops" && (
            <SciFiCard>
              <h2 className="text-2xl font-rajdhani font-semibold text-[var(--cyber-green)] mb-4">Smart Crop Management</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Active Monitoring</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-green)] mb-1">1,240</div>
                  <div className="text-sm text-gray-300">Hectares under AI monitoring</div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Resource Efficiency</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-cyan)] mb-1">38%</div>
                  <div className="text-sm text-gray-300">Reduction in water usage</div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Yield Improvement</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-purple)] mb-1">27%</div>
                  <div className="text-sm text-gray-300">Average increase with AI</div>
                </div>
              </div>
              
              <div className="bg-[var(--cyber-blue)] p-4 rounded-lg mb-6">
                <h3 className="text-xl font-rajdhani text-[var(--cyber-green)] mb-3">Current Crop Monitoring Status</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="border border-[var(--cyber-green)] border-opacity-30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-rajdhani text-[var(--cyber-green)]">Rice Fields (Eastern Region)</h4>
                      <span className="px-2 py-1 bg-[var(--cyber-green)] bg-opacity-20 text-[var(--cyber-green)] rounded text-xs">HEALTHY</span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Growth Stage</span>
                          <span>Flowering (75%)</span>
                        </div>
                        <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                          <div className="h-full bg-[var(--cyber-green)]" style={{ width: "75%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Soil Moisture</span>
                          <span>Optimal</span>
                        </div>
                        <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                          <div className="h-full bg-[var(--cyber-cyan)]" style={{ width: "85%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Disease Risk</span>
                          <span>Low</span>
                        </div>
                        <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                          <div className="h-full bg-[var(--cyber-purple)]" style={{ width: "20%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-[var(--cyber-orange)] border-opacity-30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-rajdhani text-[var(--cyber-orange)]">Maize Fields (Western Region)</h4>
                      <span className="px-2 py-1 bg-[var(--cyber-orange)] bg-opacity-20 text-[var(--cyber-orange)] rounded text-xs">ATTENTION</span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Growth Stage</span>
                          <span>Vegetative (45%)</span>
                        </div>
                        <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                          <div className="h-full bg-[var(--cyber-green)]" style={{ width: "45%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Soil Moisture</span>
                          <span>Below optimal</span>
                        </div>
                        <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                          <div className="h-full bg-[var(--cyber-orange)]" style={{ width: "40%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Pest Risk</span>
                          <span>Moderate</span>
                        </div>
                        <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                          <div className="h-full bg-[var(--cyber-orange)]" style={{ width: "60%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <CyberButton onClick={() => alert("Irrigation control systems will be displayed")}>
                  <i className="fas fa-tint mr-2"></i> Manage Irrigation
                </CyberButton>
                <CyberButton variant="outline" onClick={() => alert("Pest control recommendations will be displayed")}>
                  <i className="fas fa-bug mr-2"></i> Pest Control Advisor
                </CyberButton>
              </div>
            </SciFiCard>
          )}

          {activeTab === "soil" && (
            <SciFiCard>
              <h2 className="text-2xl font-rajdhani font-semibold text-[var(--cyber-green)] mb-4">Soil Health Analytics</h2>
              
              <div className="bg-[var(--cyber-blue)] p-4 rounded-lg mb-6">
                <h3 className="text-xl font-rajdhani text-[var(--cyber-green)] mb-3">Soil Composition Trends</h3>
                <p className="mb-3">Real-time monitoring of key soil health indicators over time.</p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={soilHealthData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="month" stroke="rgba(255,255,255,0.7)" />
                      <YAxis stroke="rgba(255,255,255,0.7)" />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#10b981' }} />
                      <Legend />
                      <Line type="monotone" dataKey="ph" stroke="#0affff" strokeWidth={2} name="pH Level" />
                      <Line type="monotone" dataKey="nitrogen" stroke="#10b981" strokeWidth={2} name="Nitrogen Content" />
                      <Line type="monotone" dataKey="phosphorus" stroke="#7c3aed" strokeWidth={2} name="Phosphorus Content" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Organic Matter</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-green)] mb-1">3.8%</div>
                  <div className="text-sm text-gray-300">+0.7% in last 6 months</div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Microbial Activity</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-cyan)] mb-1">72/100</div>
                  <div className="text-sm text-gray-300">Healthy soil ecosystem</div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Carbon Sequestration</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-purple)] mb-1">+15%</div>
                  <div className="text-sm text-gray-300">Improvement with regenerative practices</div>
                </div>
              </div>
              
              <div className="bg-[var(--cyber-blue)] p-4 rounded-lg mb-6">
                <h3 className="text-xl font-rajdhani text-[var(--cyber-green)] mb-3">AI Soil Recommendations</h3>
                
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <div className="text-[var(--cyber-green)] mr-2"><i className="fas fa-check-circle"></i></div>
                    <div>Based on current pH levels, recommend adding 200kg/ha of lime to the Eastern region fields.</div>
                  </li>
                  <li className="flex items-start">
                    <div className="text-[var(--cyber-orange)] mr-2"><i className="fas fa-exclamation-triangle"></i></div>
                    <div>Northern fields show signs of nitrogen deficiency. Consider organic nitrogen amendments.</div>
                  </li>
                  <li className="flex items-start">
                    <div className="text-[var(--cyber-cyan)] mr-2"><i className="fas fa-info-circle"></i></div>
                    <div>Rotation with legume crops recommended for 30% of Western region to improve nitrogen fixation.</div>
                  </li>
                  <li className="flex items-start">
                    <div className="text-[var(--cyber-purple)] mr-2"><i className="fas fa-lightbulb"></i></div>
                    <div>Soil compaction detected in Southern fields. Implement targeted aeration before next planting season.</div>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <CyberButton onClick={() => alert("Soil test request form will be displayed")}>
                  <i className="fas fa-flask mr-2"></i> Request Soil Test
                </CyberButton>
                <CyberButton variant="outline" onClick={() => alert("Custom amendment calculator will be displayed")}>
                  <i className="fas fa-calculator mr-2"></i> Amendment Calculator
                </CyberButton>
              </div>
            </SciFiCard>
          )}

          {activeTab === "climate" && (
            <SciFiCard>
              <h2 className="text-2xl font-rajdhani font-semibold text-[var(--cyber-green)] mb-4">Climate Resilience</h2>
              
              <div className="bg-[var(--cyber-blue)] p-4 rounded-lg mb-6">
                <h3 className="text-xl font-rajdhani text-[var(--cyber-green)] mb-3">Crop Resilience Comparison</h3>
                <p className="mb-3">Traditional varieties vs. AI-selected climate-resilient varieties.</p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart outerRadius={90} data={climateResilienceData}>
                      <PolarGrid stroke="rgba(255,255,255,0.1)" />
                      <PolarAngleAxis dataKey="subject" stroke="rgba(255,255,255,0.7)" />
                      <PolarRadiusAxis stroke="rgba(255,255,255,0.7)" />
                      <Radar name="AI-Selected Varieties" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                      <Radar name="Traditional Varieties" dataKey="B" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.3} />
                      <Legend />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#10b981' }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg border border-[var(--cyber-green)] border-opacity-30">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-green)] mb-3">Climate Prediction</h3>
                  <p className="mb-4">AI-powered seasonal forecasts to help with planting decisions.</p>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Next 3 Months Forecast:</span>
                        <span className="text-[var(--cyber-orange)]">Drier than normal</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <i className="fas fa-sun text-[var(--cyber-orange)]"></i>
                        <div className="h-2 flex-grow bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[var(--cyber-cyan)] to-[var(--cyber-orange)]" style={{ width: "70%" }}></div>
                        </div>
                        <span className="text-xs">+70%</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Temperature Trend:</span>
                        <span className="text-[var(--cyber-orange)]">2.1°C above average</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <i className="fas fa-temperature-high text-[var(--cyber-orange)]"></i>
                        <div className="h-2 flex-grow bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[var(--cyber-green)] to-[var(--cyber-orange)]" style={{ width: "85%" }}></div>
                        </div>
                        <span className="text-xs">+85%</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Extreme Weather Risk:</span>
                        <span className="text-[var(--cyber-purple)]">Moderate</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <i className="fas fa-cloud-showers-heavy text-[var(--cyber-purple)]"></i>
                        <div className="h-2 flex-grow bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[var(--cyber-green)] to-[var(--cyber-purple)]" style={{ width: "55%" }}></div>
                        </div>
                        <span className="text-xs">+55%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg border border-[var(--cyber-green)] border-opacity-30">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-green)] mb-3">Adaptation Strategies</h3>
                  <p className="mb-4">AI-recommended practices to build climate resilience.</p>
                  
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-[var(--cyber-green)] mr-2"><i className="fas fa-seedling"></i></span>
                      <div>
                        <span className="font-semibold block">Drought-resistant Varieties</span>
                        <span className="text-sm">Switch 40% of maize cultivation to drought-resistant varieties.</span>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <span className="text-[var(--cyber-cyan)] mr-2"><i className="fas fa-tint"></i></span>
                      <div>
                        <span className="font-semibold block">Water Conservation</span>
                        <span className="text-sm">Implement drip irrigation in 60% of vegetable production.</span>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <span className="text-[var(--cyber-purple)] mr-2"><i className="fas fa-layer-group"></i></span>
                      <div>
                        <span className="font-semibold block">Intercropping</span>
                        <span className="text-sm">Introduce shade-providing companion crops in 35% of fields.</span>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <span className="text-[var(--cyber-orange)] mr-2"><i className="fas fa-calendar-alt"></i></span>
                      <div>
                        <span className="font-semibold block">Adjusted Planting Schedule</span>
                        <span className="text-sm">Delay rice planting by 15 days based on climate predictions.</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <CyberButton onClick={() => alert("Climate prediction dashboard will open")}>
                  <i className="fas fa-cloud-sun-rain mr-2"></i> Detailed Climate Forecast
                </CyberButton>
                <CyberButton variant="outline" onClick={() => alert("Resilience planning tool will open")}>
                  <i className="fas fa-shield-alt mr-2"></i> Create Resilience Plan
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