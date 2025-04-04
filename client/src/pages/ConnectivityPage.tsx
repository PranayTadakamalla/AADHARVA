import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SciFiCard } from "@/components/ui/sci-fi-card";
import { CyberButton } from "@/components/ui/cyber-button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export default function ConnectivityPage() {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample data for charts
  const coverageData = [
    { year: '2020', coverage: 35 },
    { year: '2021', coverage: 48 },
    { year: '2022', coverage: 62 },
    { year: '2023', coverage: 78 },
    { year: '2024', coverage: 85 },
  ];

  const technologyData = [
    { name: 'Satellite', value: 40 },
    { name: 'Mesh Network', value: 25 },
    { name: 'Mobile 4G', value: 20 },
    { name: 'Fixed Wireless', value: 15 },
  ];

  const COLORS = ['#0affff', '#10b981', '#7c3aed', '#2563eb', '#f97316'];

  const usageData = [
    { category: 'Education', bandwidth: 35 },
    { category: 'Healthcare', bandwidth: 25 },
    { category: 'Agriculture', bandwidth: 15 },
    { category: 'Business', bandwidth: 12 },
    { category: 'Government', bandwidth: 8 },
    { category: 'Personal', bandwidth: 5 },
  ];

  const speedData = [
    { month: 'Jan', download: 8.2, upload: 2.1 },
    { month: 'Feb', download: 8.8, upload: 2.3 },
    { month: 'Mar', download: 9.5, upload: 2.5 },
    { month: 'Apr', download: 10.2, upload: 2.7 },
    { month: 'May', download: 11.8, upload: 3.1 },
    { month: 'Jun', download: 12.5, upload: 3.5 },
  ];

  return (
    <div className="bg-[var(--cyber-dark)] font-inter text-gray-100 min-h-screen overflow-x-hidden">
      <Header />
      <main className="container mx-auto py-8 px-4 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-rajdhani font-bold mb-2 text-[var(--cyber-purple)] glowing-text">Rural Connectivity Network</h1>
          <div className="cyber-line mb-8"></div>
          
          <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
            <CyberButton 
              variant={activeTab === "overview" ? "default" : "outline"} 
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </CyberButton>
            <CyberButton 
              variant={activeTab === "infrastructure" ? "default" : "outline"} 
              onClick={() => setActiveTab("infrastructure")}
            >
              Infrastructure
            </CyberButton>
            <CyberButton 
              variant={activeTab === "services" ? "default" : "outline"} 
              onClick={() => setActiveTab("services")}
            >
              Digital Services
            </CyberButton>
            <CyberButton 
              variant={activeTab === "metrics" ? "default" : "outline"} 
              onClick={() => setActiveTab("metrics")}
            >
              Performance Metrics
            </CyberButton>
          </div>

          {activeTab === "overview" && (
            <SciFiCard>
              <h2 className="text-2xl font-rajdhani font-semibold text-[var(--cyber-purple)] mb-4">Rural Connectivity Initiative</h2>
              <p className="mb-4">
                Our rural connectivity program bridges the digital divide by implementing innovative, sustainable internet
                solutions for underserved communities. Through a combination of satellite technology, wireless mesh networks,
                and AI-optimized traffic management, we're enabling digital inclusion and creating opportunities for rural
                development.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-purple)] mb-3">Connectivity Coverage</h3>
                  <p className="mb-3">Percentage of rural population with internet access</p>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={coverageData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="year" stroke="rgba(255,255,255,0.7)" />
                        <YAxis stroke="rgba(255,255,255,0.7)" />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#7c3aed' }} />
                        <Area type="monotone" dataKey="coverage" stroke="#7c3aed" fill="rgba(124, 58, 237, 0.2)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-purple)] mb-3">Connection Technologies</h3>
                  <p className="mb-3">Distribution of technologies providing connectivity</p>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={technologyData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {technologyData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#7c3aed' }} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-4">
                <CyberButton onClick={() => window.location.href = '/connectivity/map'}>
                  <i className="fas fa-map-marked-alt mr-2"></i> Coverage Map
                </CyberButton>
                <CyberButton variant="outline" onClick={() => window.location.href = '/connectivity/report'}>
                  <i className="fas fa-file-alt mr-2"></i> Generate Connectivity Report
                </CyberButton>
              </div>
            </SciFiCard>
          )}

          {activeTab === "infrastructure" && (
            <SciFiCard>
              <h2 className="text-2xl font-rajdhani font-semibold text-[var(--cyber-purple)] mb-4">Connectivity Infrastructure</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Access Points</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-purple)] mb-1">145</div>
                  <div className="text-sm text-gray-300">Deployed across regions</div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Network Uptime</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-green)] mb-1">99.2%</div>
                  <div className="text-sm text-gray-300">Monthly average</div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Coverage Area</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-cyan)] mb-1">8,500 km²</div>
                  <div className="text-sm text-gray-300">Connected territory</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg border border-[var(--cyber-purple)] border-opacity-30">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-purple)] mb-3">Core Technologies</h3>
                  
                  <div className="space-y-4">
                    <div className="border border-[var(--cyber-purple)] border-opacity-20 p-3 rounded-lg">
                      <div className="flex items-center mb-2">
                        <i className="fas fa-satellite-dish text-[var(--cyber-purple)] mr-2"></i>
                        <h4 className="font-rajdhani">Low-Orbit Satellite Links</h4>
                      </div>
                      <p className="text-sm">High-bandwidth satellite connections providing backbone connectivity to remote regions with minimal latency.</p>
                      <div className="flex justify-between text-xs mt-2">
                        <span>Status: Operational</span>
                        <span>Units: 8</span>
                      </div>
                    </div>
                    
                    <div className="border border-[var(--cyber-purple)] border-opacity-20 p-3 rounded-lg">
                      <div className="flex items-center mb-2">
                        <i className="fas fa-project-diagram text-[var(--cyber-purple)] mr-2"></i>
                        <h4 className="font-rajdhani">Wireless Mesh Network</h4>
                      </div>
                      <p className="text-sm">Self-organizing, self-healing mesh networks that extend connectivity within communities with minimal infrastructure.</p>
                      <div className="flex justify-between text-xs mt-2">
                        <span>Status: Expanding</span>
                        <span>Nodes: 85</span>
                      </div>
                    </div>
                    
                    <div className="border border-[var(--cyber-purple)] border-opacity-20 p-3 rounded-lg">
                      <div className="flex items-center mb-2">
                        <i className="fas fa-broadcast-tower text-[var(--cyber-purple)] mr-2"></i>
                        <h4 className="font-rajdhani">Long-Range WiFi</h4>
                      </div>
                      <p className="text-sm">Modified WiFi systems with high-gain antennas capable of transmitting signals up to 10km in clear conditions.</p>
                      <div className="flex justify-between text-xs mt-2">
                        <span>Status: Operational</span>
                        <span>Towers: 32</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg border border-[var(--cyber-purple)] border-opacity-30">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-purple)] mb-3">Sustainable Infrastructure</h3>
                  
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="w-10 h-10 bg-[var(--cyber-green)] bg-opacity-20 rounded-full flex items-center justify-center mr-3 shrink-0">
                        <i className="fas fa-solar-panel text-[var(--cyber-green)]"></i>
                      </div>
                      <div>
                        <h4 className="font-rajdhani text-white mb-1">Solar-Powered Nodes</h4>
                        <p className="text-sm">90% of network infrastructure operates on solar power with battery backup, ensuring reliability even in areas with inconsistent electricity.</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-10 h-10 bg-[var(--cyber-green)] bg-opacity-20 rounded-full flex items-center justify-center mr-3 shrink-0">
                        <i className="fas fa-wind text-[var(--cyber-green)]"></i>
                      </div>
                      <div>
                        <h4 className="font-rajdhani text-white mb-1">Weather-Resilient Design</h4>
                        <p className="text-sm">Equipment designed to withstand extreme weather conditions including monsoon rains, high winds, and temperature fluctuations.</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-10 h-10 bg-[var(--cyber-green)] bg-opacity-20 rounded-full flex items-center justify-center mr-3 shrink-0">
                        <i className="fas fa-recycle text-[var(--cyber-green)]"></i>
                      </div>
                      <div>
                        <h4 className="font-rajdhani text-white mb-1">Modular Construction</h4>
                        <p className="text-sm">Equipment built with replaceable, upgradable components to extend lifespan and reduce electronic waste in rural areas.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-[var(--cyber-blue)] p-4 rounded-lg mb-6">
                <h3 className="text-xl font-rajdhani text-[var(--cyber-purple)] mb-3">Network Management System</h3>
                <p className="mb-4">AI-powered network management with real-time monitoring, predictive maintenance, and automatic optimization.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border border-[var(--cyber-purple)] border-opacity-30 p-3 rounded-lg">
                    <div className="flex items-center mb-2">
                      <i className="fas fa-tachometer-alt text-[var(--cyber-purple)] mr-2"></i>
                      <h4 className="font-rajdhani">Performance Monitoring</h4>
                    </div>
                    <p className="text-sm">Real-time tracking of bandwidth, latency, packet loss, and connection quality across all network nodes.</p>
                  </div>
                  
                  <div className="border border-[var(--cyber-purple)] border-opacity-30 p-3 rounded-lg">
                    <div className="flex items-center mb-2">
                      <i className="fas fa-brain text-[var(--cyber-purple)] mr-2"></i>
                      <h4 className="font-rajdhani">Predictive Maintenance</h4>
                    </div>
                    <p className="text-sm">AI algorithms that predict equipment failures before they occur, enabling proactive maintenance.</p>
                  </div>
                  
                  <div className="border border-[var(--cyber-purple)] border-opacity-30 p-3 rounded-lg">
                    <div className="flex items-center mb-2">
                      <i className="fas fa-balance-scale text-[var(--cyber-purple)] mr-2"></i>
                      <h4 className="font-rajdhani">Traffic Optimization</h4>
                    </div>
                    <p className="text-sm">Intelligent bandwidth allocation that prioritizes essential services like telemedicine and education.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <CyberButton onClick={() => alert("Network status dashboard will open")}>
                  <i className="fas fa-server mr-2"></i> Network Status
                </CyberButton>
                <CyberButton variant="outline" onClick={() => alert("Coverage planning tool will open")}>
                  <i className="fas fa-expand-arrows-alt mr-2"></i> Coverage Planner
                </CyberButton>
              </div>
            </SciFiCard>
          )}

          {activeTab === "services" && (
            <SciFiCard>
              <h2 className="text-2xl font-rajdhani font-semibold text-[var(--cyber-purple)] mb-4">Digital Services</h2>
              
              <div className="bg-[var(--cyber-blue)] p-4 rounded-lg mb-6">
                <h3 className="text-xl font-rajdhani text-[var(--cyber-purple)] mb-3">Bandwidth Utilization</h3>
                <p className="mb-3">Distribution of bandwidth usage by service category</p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={usageData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis type="number" stroke="rgba(255,255,255,0.7)" />
                      <YAxis dataKey="category" type="category" stroke="rgba(255,255,255,0.7)" />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#7c3aed' }} />
                      <Bar dataKey="bandwidth" fill="#7c3aed" name="Bandwidth Usage (%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg border border-[var(--cyber-purple)] border-opacity-30">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-purple)] mb-3">Digital Service Hub</h3>
                  
                  <div className="space-y-4">
                    <div className="border border-[var(--cyber-purple)] border-opacity-20 p-3 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-rajdhani text-[var(--cyber-cyan)]">Educational Content Cache</h4>
                        <span className="px-2 py-1 bg-[var(--cyber-green)] bg-opacity-20 text-[var(--cyber-green)] rounded text-xs">ACTIVE</span>
                      </div>
                      <p className="text-sm mb-2">Local cache of educational resources including videos, interactive courses, and reference materials.</p>
                      <div className="flex justify-between text-xs">
                        <span>Storage: 8TB</span>
                        <span>Daily Users: ~450</span>
                      </div>
                    </div>
                    
                    <div className="border border-[var(--cyber-purple)] border-opacity-20 p-3 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-rajdhani text-[var(--cyber-cyan)]">Healthcare Database</h4>
                        <span className="px-2 py-1 bg-[var(--cyber-green)] bg-opacity-20 text-[var(--cyber-green)] rounded text-xs">ACTIVE</span>
                      </div>
                      <p className="text-sm mb-2">Secure storage of patient records, diagnostic data, and telemedicine session scheduling.</p>
                      <div className="flex justify-between text-xs">
                        <span>Records: 12,450</span>
                        <span>Communities: 18</span>
                      </div>
                    </div>
                    
                    <div className="border border-[var(--cyber-purple)] border-opacity-20 p-3 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-rajdhani text-[var(--cyber-cyan)]">Agricultural Information System</h4>
                        <span className="px-2 py-1 bg-[var(--cyber-green)] bg-opacity-20 text-[var(--cyber-green)] rounded text-xs">ACTIVE</span>
                      </div>
                      <p className="text-sm mb-2">Real-time weather, crop pricing, and farming best practices with offline access capability.</p>
                      <div className="flex justify-between text-xs">
                        <span>Users: 850</span>
                        <span>Data Points: 1.2M daily</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg border border-[var(--cyber-purple)] border-opacity-30">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-purple)] mb-3">Bandwidth Optimization</h3>
                  
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="w-10 h-10 bg-[var(--cyber-purple)] bg-opacity-20 rounded-full flex items-center justify-center mr-3 shrink-0">
                        <i className="fas fa-database text-[var(--cyber-purple)]"></i>
                      </div>
                      <div>
                        <h4 className="font-rajdhani text-white mb-1">Local Content Caching</h4>
                        <p className="text-sm">Intelligent caching system that stores frequently accessed content locally, reducing bandwidth usage by up to 60%.</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-10 h-10 bg-[var(--cyber-purple)] bg-opacity-20 rounded-full flex items-center justify-center mr-3 shrink-0">
                        <i className="fas fa-compress-arrows-alt text-[var(--cyber-purple)]"></i>
                      </div>
                      <div>
                        <h4 className="font-rajdhani text-white mb-1">Adaptive Compression</h4>
                        <p className="text-sm">Dynamic content compression that adapts based on available bandwidth and content type to ensure smooth service delivery.</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-10 h-10 bg-[var(--cyber-purple)] bg-opacity-20 rounded-full flex items-center justify-center mr-3 shrink-0">
                        <i className="fas fa-clock text-[var(--cyber-purple)]"></i>
                      </div>
                      <div>
                        <h4 className="font-rajdhani text-white mb-1">Scheduled Syncing</h4>
                        <p className="text-sm">Automated system that syncs large updates and content during off-peak hours to maximize bandwidth efficiency.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-[var(--cyber-blue)] p-4 rounded-lg mb-6">
                <h3 className="text-xl font-rajdhani text-[var(--cyber-purple)] mb-3">Digital Inclusion Program</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border border-[var(--cyber-purple)] border-opacity-30 p-3 rounded-lg">
                    <div className="flex items-center mb-2">
                      <i className="fas fa-laptop text-[var(--cyber-purple)] mr-2"></i>
                      <h4 className="font-rajdhani">Digital Literacy Training</h4>
                    </div>
                    <p className="text-sm">Community-based training programs teaching essential digital skills to residents of all ages.</p>
                    <div className="mt-2 text-xs text-gray-400">
                      <div><i className="fas fa-users mr-1"></i> 1,840 participants to date</div>
                      <div><i className="fas fa-map-marker-alt mr-1"></i> 28 villages covered</div>
                    </div>
                  </div>
                  
                  <div className="border border-[var(--cyber-purple)] border-opacity-30 p-3 rounded-lg">
                    <div className="flex items-center mb-2">
                      <i className="fas fa-tablet-alt text-[var(--cyber-purple)] mr-2"></i>
                      <h4 className="font-rajdhani">Device Access Program</h4>
                    </div>
                    <p className="text-sm">Subsidized tablet and laptop distribution with preloaded educational content and offline capabilities.</p>
                    <div className="mt-2 text-xs text-gray-400">
                      <div><i className="fas fa-tablet-alt mr-1"></i> 2,450 devices distributed</div>
                      <div><i className="fas fa-school mr-1"></i> 42 schools equipped</div>
                    </div>
                  </div>
                  
                  <div className="border border-[var(--cyber-purple)] border-opacity-30 p-3 rounded-lg">
                    <div className="flex items-center mb-2">
                      <i className="fas fa-users-cog text-[var(--cyber-purple)] mr-2"></i>
                      <h4 className="font-rajdhani">Community Tech Champions</h4>
                    </div>
                    <p className="text-sm">Local residents trained as technical support and digital literacy coaches for their communities.</p>
                    <div className="mt-2 text-xs text-gray-400">
                      <div><i className="fas fa-user-graduate mr-1"></i> 85 champions trained</div>
                      <div><i className="fas fa-hands-helping mr-1"></i> 1,250+ support sessions</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <CyberButton onClick={() => alert("Service status dashboard will open")}>
                  <i className="fas fa-chalkboard mr-2"></i> Service Dashboard
                </CyberButton>
                <CyberButton variant="outline" onClick={() => alert("Digital literacy resources will be displayed")}>
                  <i className="fas fa-graduation-cap mr-2"></i> Training Resources
                </CyberButton>
              </div>
            </SciFiCard>
          )}

          {activeTab === "metrics" && (
            <SciFiCard>
              <h2 className="text-2xl font-rajdhani font-semibold text-[var(--cyber-purple)] mb-4">Performance Metrics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Average Speed</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-cyan)] mb-1">12.5 Mbps</div>
                  <div className="text-sm text-gray-300">Download speed across network</div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Latency</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-green)] mb-1">85 ms</div>
                  <div className="text-sm text-gray-300">Average response time</div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Network Health</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-purple)] mb-1">96%</div>
                  <div className="text-sm text-gray-300">Overall system reliability</div>
                </div>
              </div>
              
              <div className="bg-[var(--cyber-blue)] p-4 rounded-lg mb-6">
                <h3 className="text-xl font-rajdhani text-[var(--cyber-purple)] mb-3">Network Speed Trends</h3>
                <p className="mb-3">Average download and upload speeds in Mbps</p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={speedData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="month" stroke="rgba(255,255,255,0.7)" />
                      <YAxis stroke="rgba(255,255,255,0.7)" />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#7c3aed' }} />
                      <Legend />
                      <Line type="monotone" dataKey="download" name="Download (Mbps)" stroke="#0affff" strokeWidth={2} />
                      <Line type="monotone" dataKey="upload" name="Upload (Mbps)" stroke="#7c3aed" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-[var(--cyber-blue)] p-4 rounded-lg mb-6">
                <h3 className="text-xl font-rajdhani text-[var(--cyber-purple)] mb-3">Regional Performance Monitoring</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border border-[var(--cyber-green)] border-opacity-30 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-rajdhani text-[var(--cyber-green)]">Eastern Region</h4>
                      <span className="px-2 py-1 bg-[var(--cyber-green)] bg-opacity-20 text-[var(--cyber-green)] rounded text-xs">EXCELLENT</span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Speed</span>
                          <span className="text-[var(--cyber-green)]">14.5 Mbps</span>
                        </div>
                        <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                          <div className="h-full bg-[var(--cyber-green)]" style={{ width: "85%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Reliability</span>
                          <span className="text-[var(--cyber-green)]">99.5%</span>
                        </div>
                        <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                          <div className="h-full bg-[var(--cyber-green)]" style={{ width: "99%" }}></div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 mt-2">
                        <i className="fas fa-users mr-1"></i> 850 active users
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-[var(--cyber-cyan)] border-opacity-30 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-rajdhani text-[var(--cyber-cyan)]">Western Region</h4>
                      <span className="px-2 py-1 bg-[var(--cyber-cyan)] bg-opacity-20 text-[var(--cyber-cyan)] rounded text-xs">GOOD</span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Speed</span>
                          <span className="text-[var(--cyber-cyan)]">10.8 Mbps</span>
                        </div>
                        <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                          <div className="h-full bg-[var(--cyber-cyan)]" style={{ width: "70%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Reliability</span>
                          <span className="text-[var(--cyber-cyan)]">98.2%</span>
                        </div>
                        <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                          <div className="h-full bg-[var(--cyber-cyan)]" style={{ width: "98%" }}></div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 mt-2">
                        <i className="fas fa-users mr-1"></i> 620 active users
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-[var(--cyber-orange)] border-opacity-30 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-rajdhani text-[var(--cyber-orange)]">Southern Region</h4>
                      <span className="px-2 py-1 bg-[var(--cyber-orange)] bg-opacity-20 text-[var(--cyber-orange)] rounded text-xs">NEEDS ATTENTION</span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Speed</span>
                          <span className="text-[var(--cyber-orange)]">8.2 Mbps</span>
                        </div>
                        <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                          <div className="h-full bg-[var(--cyber-orange)]" style={{ width: "55%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Reliability</span>
                          <span className="text-[var(--cyber-orange)]">92.8%</span>
                        </div>
                        <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                          <div className="h-full bg-[var(--cyber-orange)]" style={{ width: "93%" }}></div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 mt-2">
                        <i className="fas fa-users mr-1"></i> 485 active users
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-[var(--cyber-blue)] p-4 rounded-lg mb-6">
                <h3 className="text-xl font-rajdhani text-[var(--cyber-purple)] mb-3">AI-Generated Recommendations</h3>
                
                <div className="space-y-4">
                  <div className="p-3 border-l-4 border-[var(--cyber-orange)]">
                    <h4 className="font-rajdhani text-[var(--cyber-orange)] mb-1">Southern Region Upgrade</h4>
                    <p className="text-sm mb-2">Performance analysis indicates need for infrastructure enhancement:</p>
                    <ul className="text-sm space-y-1 list-disc pl-4">
                      <li>Add two additional satellite downlink stations to improve bandwidth</li>
                      <li>Deploy 8 new mesh network nodes to extend coverage in valleys</li>
                      <li>Upgrade firmware on 12 existing access points to improve efficiency</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 border-l-4 border-[var(--cyber-cyan)]">
                    <h4 className="font-rajdhani text-[var(--cyber-cyan)] mb-1">Western Region Optimization</h4>
                    <p className="text-sm mb-2">Traffic analysis recommends configuration changes:</p>
                    <ul className="text-sm space-y-1 list-disc pl-4">
                      <li>Adjust caching algorithms to better match local content usage patterns</li>
                      <li>Implement traffic prioritization during peak usage hours (19:00-22:00)</li>
                      <li>Migrate educational content to edge servers for faster access</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 border-l-4 border-[var(--cyber-green)]">
                    <h4 className="font-rajdhani text-[var(--cyber-green)] mb-1">Eastern Region Model</h4>
                    <p className="text-sm mb-2">Success analysis for potential replication:</p>
                    <ul className="text-sm space-y-1 list-disc pl-4">
                      <li>Document configuration and deployment strategies from Eastern region</li>
                      <li>Prepare knowledge transfer to Southern region technical team</li>
                      <li>Develop scaling plan for expanding successful topology to new areas</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <CyberButton onClick={() => alert("Full metrics dashboard will open")}>
                  <i className="fas fa-chart-line mr-2"></i> Detailed Metrics
                </CyberButton>
                <CyberButton variant="outline" onClick={() => alert("Speed test tool will open")}>
                  <i className="fas fa-tachometer-alt mr-2"></i> Run Speed Test
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