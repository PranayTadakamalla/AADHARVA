import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SciFiCard } from "@/components/ui/sci-fi-card";
import { CyberButton } from "@/components/ui/cyber-button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';

export default function WaterPage() {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample data for charts
  const waterQualityData = [
    { month: 'Jan', quality: 65 },
    { month: 'Feb', quality: 59 },
    { month: 'Mar', quality: 70 },
    { month: 'Apr', quality: 85 },
    { month: 'May', quality: 75 },
    { month: 'Jun', quality: 72 },
    { month: 'Jul', quality: 68 },
    { month: 'Aug', quality: 82 },
    { month: 'Sep', quality: 91 },
    { month: 'Oct', quality: 78 },
    { month: 'Nov', quality: 65 },
    { month: 'Dec', quality: 71 },
  ];

  const waterAccessData = [
    { name: 'Village A', access: 75 },
    { name: 'Village B', access: 45 },
    { name: 'Village C', access: 90 },
    { name: 'Village D', access: 60 },
    { name: 'Village E', access: 30 },
    { name: 'Village F', access: 85 },
  ];

  const waterSourceData = [
    { name: 'Wells', value: 35 },
    { name: 'Rainwater', value: 20 },
    { name: 'Rivers', value: 15 },
    { name: 'Piped Water', value: 30 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="bg-[var(--cyber-dark)] font-inter text-gray-100 min-h-screen overflow-x-hidden">
      <Header />
      <main className="container mx-auto py-8 px-4 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-rajdhani font-bold mb-2 text-[var(--cyber-cyan)] glowing-text">Water Resources Management</h1>
          <div className="cyber-line mb-8"></div>
          
          <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
            <CyberButton 
              variant={activeTab === "overview" ? "default" : "outline"} 
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </CyberButton>
            <CyberButton 
              variant={activeTab === "projects" ? "default" : "outline"} 
              onClick={() => setActiveTab("projects")}
            >
              Projects
            </CyberButton>
            <CyberButton 
              variant={activeTab === "data" ? "default" : "outline"} 
              onClick={() => setActiveTab("data")}
            >
              Data Analysis
            </CyberButton>
            <CyberButton 
              variant={activeTab === "tech" ? "default" : "outline"} 
              onClick={() => setActiveTab("tech")}
            >
              Technology
            </CyberButton>
          </div>

          {activeTab === "overview" && (
            <SciFiCard>
              <h2 className="text-2xl font-rajdhani font-semibold text-[var(--cyber-cyan)] mb-4">Clean Water Access Initiative</h2>
              <p className="mb-4">
                Our AI-powered water management system helps rural communities gain access to clean water through 
                smart monitoring of water sources, predictive maintenance, and quality assessment. By leveraging 
                Internet of Things (IoT) sensors and machine learning, we're able to predict water scarcity events
                and optimize distribution systems for maximum efficiency.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-cyan)] mb-3">Water Quality Monitoring</h3>
                  <p className="mb-3">Real-time trends in water quality across monitored rural areas.</p>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={waterQualityData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="month" stroke="rgba(255,255,255,0.7)" />
                        <YAxis stroke="rgba(255,255,255,0.7)" />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#0affff' }} />
                        <Area type="monotone" dataKey="quality" stroke="#0affff" fill="rgba(10, 255, 255, 0.2)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-cyan)] mb-3">Water Access By Village</h3>
                  <p className="mb-3">Percentage of population with access to clean water sources.</p>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={waterAccessData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" />
                        <YAxis stroke="rgba(255,255,255,0.7)" />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#0affff' }} />
                        <Bar dataKey="access" fill="#0affff" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-[var(--cyber-blue)] p-4 rounded-lg">
                <h3 className="text-xl font-rajdhani text-[var(--cyber-cyan)] mb-3">Water Sources Distribution</h3>
                <p className="mb-3">Types of water sources used across rural communities.</p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={waterSourceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {waterSourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#0affff' }} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-4">
                <CyberButton onClick={() => window.location.href = '/water/solutions'}>
                  <i className="fas fa-lightbulb mr-2"></i> View Solutions
                </CyberButton>
                <CyberButton variant="outline" onClick={() => window.location.href = '/water/report'}>
                  <i className="fas fa-file-alt mr-2"></i> Generate Report
                </CyberButton>
              </div>
            </SciFiCard>
          )}

          {activeTab === "projects" && (
            <SciFiCard>
              <h2 className="text-2xl font-rajdhani font-semibold text-[var(--cyber-cyan)] mb-4">Active Water Projects</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg border border-[var(--cyber-cyan)] border-opacity-30">
                  <div className="flex justify-between mb-2">
                    <h3 className="text-xl font-rajdhani text-[var(--cyber-cyan)]">Smart Well Monitoring</h3>
                    <span className="px-2 py-1 bg-[var(--cyber-green)] bg-opacity-20 text-[var(--cyber-green)] rounded text-xs">ACTIVE</span>
                  </div>
                  <p className="mb-4">IoT-enabled well monitoring systems with predictive maintenance capabilities.</p>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>Progress</span>
                    <span>78%</span>
                  </div>
                  <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[var(--cyber-cyan)] to-[var(--cyber-blue-light)]" style={{ width: "78%" }}></div>
                  </div>
                  <div className="mt-4 flex justify-between text-sm">
                    <span>Location: Eastern Region</span>
                    <span>Villages: 12</span>
                  </div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg border border-[var(--cyber-cyan)] border-opacity-30">
                  <div className="flex justify-between mb-2">
                    <h3 className="text-xl font-rajdhani text-[var(--cyber-cyan)]">Rainwater Harvesting</h3>
                    <span className="px-2 py-1 bg-[var(--cyber-purple)] bg-opacity-20 text-[var(--cyber-purple)] rounded text-xs">PLANNING</span>
                  </div>
                  <p className="mb-4">Community-based rainwater collection systems with filtration capabilities.</p>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>Progress</span>
                    <span>25%</span>
                  </div>
                  <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[var(--cyber-purple)] to-[var(--cyber-blue-light)]" style={{ width: "25%" }}></div>
                  </div>
                  <div className="mt-4 flex justify-between text-sm">
                    <span>Location: Southern Region</span>
                    <span>Villages: 8</span>
                  </div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg border border-[var(--cyber-cyan)] border-opacity-30">
                  <div className="flex justify-between mb-2">
                    <h3 className="text-xl font-rajdhani text-[var(--cyber-cyan)]">Purification Stations</h3>
                    <span className="px-2 py-1 bg-[var(--cyber-green)] bg-opacity-20 text-[var(--cyber-green)] rounded text-xs">ACTIVE</span>
                  </div>
                  <p className="mb-4">AI-optimized water purification stations using solar energy.</p>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>Progress</span>
                    <span>62%</span>
                  </div>
                  <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[var(--cyber-cyan)] to-[var(--cyber-blue-light)]" style={{ width: "62%" }}></div>
                  </div>
                  <div className="mt-4 flex justify-between text-sm">
                    <span>Location: Northern Region</span>
                    <span>Villages: 6</span>
                  </div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg border border-[var(--cyber-cyan)] border-opacity-30">
                  <div className="flex justify-between mb-2">
                    <h3 className="text-xl font-rajdhani text-[var(--cyber-cyan)]">Distribution Network</h3>
                    <span className="px-2 py-1 bg-[var(--cyber-orange)] bg-opacity-20 text-[var(--cyber-orange)] rounded text-xs">PROPOSED</span>
                  </div>
                  <p className="mb-4">Smart water distribution network with leak detection and pressure optimization.</p>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>Progress</span>
                    <span>10%</span>
                  </div>
                  <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[var(--cyber-orange)] to-[var(--cyber-blue-light)]" style={{ width: "10%" }}></div>
                  </div>
                  <div className="mt-4 flex justify-between text-sm">
                    <span>Location: Western Region</span>
                    <span>Villages: 15</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-4">
                <CyberButton onClick={() => alert("Project proposal tool will open")}>
                  <i className="fas fa-plus-circle mr-2"></i> New Project
                </CyberButton>
                <CyberButton variant="outline" onClick={() => alert("Projects dashboard will open in full screen")}>
                  <i className="fas fa-th-large mr-2"></i> View All Projects
                </CyberButton>
              </div>
            </SciFiCard>
          )}

          {activeTab === "data" && (
            <SciFiCard>
              <h2 className="text-2xl font-rajdhani font-semibold text-[var(--cyber-cyan)] mb-4">Water Resources Data Analysis</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Water Coverage</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-cyan)] mb-1">67%</div>
                  <div className="text-sm text-gray-300">+5.2% from last year</div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Quality Index</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-green)] mb-1">76/100</div>
                  <div className="text-sm text-gray-300">+12 points improvement</div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Resource Sustainability</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-orange)] mb-1">58%</div>
                  <div className="text-sm text-gray-300">Needs attention in 4 regions</div>
                </div>
              </div>
              
              <div className="bg-[var(--cyber-blue)] p-4 rounded-lg mb-6">
                <h3 className="text-xl font-rajdhani text-[var(--cyber-cyan)] mb-3">AI Predictive Analysis</h3>
                <p>Based on current trends and AI forecasting, the following insights have been generated:</p>
                
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <div className="text-[var(--cyber-green)] mr-2"><i className="fas fa-check-circle"></i></div>
                    <div>Water quality is expected to improve by 15% in the next 6 months with current interventions.</div>
                  </li>
                  <li className="flex items-start">
                    <div className="text-[var(--cyber-orange)] mr-2"><i className="fas fa-exclamation-triangle"></i></div>
                    <div>Three villages in the Eastern region are at risk of water scarcity during the upcoming dry season.</div>
                  </li>
                  <li className="flex items-start">
                    <div className="text-[var(--cyber-cyan)] mr-2"><i className="fas fa-info-circle"></i></div>
                    <div>Groundwater levels in the Western region show signs of recovery following conservation efforts.</div>
                  </li>
                  <li className="flex items-start">
                    <div className="text-[var(--cyber-purple)] mr-2"><i className="fas fa-lightbulb"></i></div>
                    <div>Recommendation: Deploy two additional purification stations in the Southern region for optimal coverage.</div>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <CyberButton onClick={() => alert("Data export will start")}>
                  <i className="fas fa-download mr-2"></i> Export Data
                </CyberButton>
                <CyberButton variant="outline" onClick={() => alert("Advanced analysis dashboard will open")}>
                  <i className="fas fa-chart-line mr-2"></i> Advanced Analysis
                </CyberButton>
              </div>
            </SciFiCard>
          )}

          {activeTab === "tech" && (
            <SciFiCard>
              <h2 className="text-2xl font-rajdhani font-semibold text-[var(--cyber-cyan)] mb-4">Water Technology Solutions</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg border border-[var(--cyber-cyan)] border-opacity-30">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-cyan)] mb-3">IoT Sensor Network</h3>
                  <p className="mb-4">Wireless sensor networks that monitor water quality, flow rates, and usage patterns in real-time.</p>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Deployment Status</span>
                    <span className="text-sm text-[var(--cyber-green)]">Operational</span>
                  </div>
                  <div className="mb-4 flex space-x-2">
                    <span className="px-2 py-1 bg-[var(--cyber-blue-light)] bg-opacity-30 rounded-full text-xs">pH Sensors</span>
                    <span className="px-2 py-1 bg-[var(--cyber-blue-light)] bg-opacity-30 rounded-full text-xs">Flow Meters</span>
                    <span className="px-2 py-1 bg-[var(--cyber-blue-light)] bg-opacity-30 rounded-full text-xs">Level Detectors</span>
                  </div>
                  <button 
                    className="text-[var(--cyber-cyan)] hover:underline text-sm flex items-center"
                    onClick={() => alert("Tech details will be displayed")}
                  >
                    View technical specifications <i className="fas fa-chevron-right ml-1"></i>
                  </button>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg border border-[var(--cyber-cyan)] border-opacity-30">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-purple)] mb-3">AI Water Prediction</h3>
                  <p className="mb-4">Machine learning algorithms that predict water quality changes, consumption patterns, and potential issues.</p>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Deployment Status</span>
                    <span className="text-sm text-[var(--cyber-purple)]">Beta Testing</span>
                  </div>
                  <div className="mb-4 flex space-x-2">
                    <span className="px-2 py-1 bg-[var(--cyber-purple)] bg-opacity-30 rounded-full text-xs">Predictive Models</span>
                    <span className="px-2 py-1 bg-[var(--cyber-purple)] bg-opacity-30 rounded-full text-xs">Anomaly Detection</span>
                  </div>
                  <button 
                    className="text-[var(--cyber-purple)] hover:underline text-sm flex items-center"
                    onClick={() => alert("Tech details will be displayed")}
                  >
                    View technical specifications <i className="fas fa-chevron-right ml-1"></i>
                  </button>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg border border-[var(--cyber-cyan)] border-opacity-30">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-green)] mb-3">Solar Purification</h3>
                  <p className="mb-4">Solar-powered water purification systems with remote monitoring and control capabilities.</p>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Deployment Status</span>
                    <span className="text-sm text-[var(--cyber-green)]">Operational</span>
                  </div>
                  <div className="mb-4 flex space-x-2">
                    <span className="px-2 py-1 bg-[var(--cyber-green)] bg-opacity-30 rounded-full text-xs">UV Treatment</span>
                    <span className="px-2 py-1 bg-[var(--cyber-green)] bg-opacity-30 rounded-full text-xs">Filtration</span>
                    <span className="px-2 py-1 bg-[var(--cyber-green)] bg-opacity-30 rounded-full text-xs">Solar Panels</span>
                  </div>
                  <button 
                    className="text-[var(--cyber-green)] hover:underline text-sm flex items-center"
                    onClick={() => alert("Tech details will be displayed")}
                  >
                    View technical specifications <i className="fas fa-chevron-right ml-1"></i>
                  </button>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg border border-[var(--cyber-cyan)] border-opacity-30">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-orange)] mb-3">Mobile Water Management</h3>
                  <p className="mb-4">Smartphone application for community water managers to monitor resources and systems.</p>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Deployment Status</span>
                    <span className="text-sm text-[var(--cyber-orange)]">Development</span>
                  </div>
                  <div className="mb-4 flex space-x-2">
                    <span className="px-2 py-1 bg-[var(--cyber-orange)] bg-opacity-30 rounded-full text-xs">Android</span>
                    <span className="px-2 py-1 bg-[var(--cyber-orange)] bg-opacity-30 rounded-full text-xs">iOS</span>
                    <span className="px-2 py-1 bg-[var(--cyber-orange)] bg-opacity-30 rounded-full text-xs">Offline Mode</span>
                  </div>
                  <button 
                    className="text-[var(--cyber-orange)] hover:underline text-sm flex items-center"
                    onClick={() => alert("Tech details will be displayed")}
                  >
                    View technical specifications <i className="fas fa-chevron-right ml-1"></i>
                  </button>
                </div>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-4">
                <CyberButton onClick={() => alert("Tech proposal form will open")}>
                  <i className="fas fa-robot mr-2"></i> Propose New Technology
                </CyberButton>
                <CyberButton variant="outline" onClick={() => alert("Knowledge base will open")}>
                  <i className="fas fa-book mr-2"></i> Technology Knowledge Base
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