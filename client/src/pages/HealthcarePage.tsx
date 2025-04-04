import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SciFiCard } from "@/components/ui/sci-fi-card";
import { CyberButton } from "@/components/ui/cyber-button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

export default function HealthcarePage() {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample data for charts
  const accessTrendData = [
    { year: '2020', healthcareAccess: 45 },
    { year: '2021', healthcareAccess: 52 },
    { year: '2022', healthcareAccess: 60 },
    { year: '2023', healthcareAccess: 68 },
    { year: '2024', healthcareAccess: 75 },
  ];

  const telemedicineData = [
    { month: 'Jan', consultations: 120 },
    { month: 'Feb', consultations: 140 },
    { month: 'Mar', consultations: 180 },
    { month: 'Apr', consultations: 220 },
    { month: 'May', consultations: 275 },
    { month: 'Jun', consultations: 310 },
  ];

  const healthIssuesData = [
    { name: 'Respiratory', value: 35 },
    { name: 'Gastrointestinal', value: 25 },
    { name: 'Maternal Health', value: 18 },
    { name: 'Cardiovascular', value: 12 },
    { name: 'Other', value: 10 },
  ];

  const COLORS = ['#0affff', '#10b981', '#7c3aed', '#f97316', '#2563eb'];

  const aiDiagnosticData = [
    { month: 'Jan', accuracy: 85 },
    { month: 'Feb', accuracy: 86 },
    { month: 'Mar', accuracy: 88 },
    { month: 'Apr', accuracy: 90 },
    { month: 'May', accuracy: 92 },
    { month: 'Jun', accuracy: 93 },
  ];

  return (
    <div className="bg-[var(--cyber-dark)] font-inter text-gray-100 min-h-screen overflow-x-hidden">
      <Header />
      <main className="container mx-auto py-8 px-4 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-rajdhani font-bold mb-2 text-[var(--cyber-cyan)] glowing-text">Rural Healthcare Network</h1>
          <div className="cyber-line mb-8"></div>
          
          <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
            <CyberButton 
              variant={activeTab === "overview" ? "default" : "outline"} 
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </CyberButton>
            <CyberButton 
              variant={activeTab === "telemedicine" ? "default" : "outline"} 
              onClick={() => setActiveTab("telemedicine")}
            >
              Telemedicine
            </CyberButton>
            <CyberButton 
              variant={activeTab === "diagnosis" ? "default" : "outline"} 
              onClick={() => setActiveTab("diagnosis")}
            >
              AI Diagnostics
            </CyberButton>
            <CyberButton 
              variant={activeTab === "analytics" ? "default" : "outline"} 
              onClick={() => setActiveTab("analytics")}
            >
              Health Analytics
            </CyberButton>
          </div>

          {activeTab === "overview" && (
            <SciFiCard>
              <h2 className="text-2xl font-rajdhani font-semibold text-[var(--cyber-cyan)] mb-4">Rural Healthcare Transformation</h2>
              <p className="mb-4">
                Our integrated healthcare platform combines telemedicine, AI-powered diagnostics, and data analytics to bring quality 
                healthcare to remote rural communities. By leveraging technology, we're overcoming geographical barriers 
                and bridging the healthcare access gap between urban and rural areas.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-cyan)] mb-3">Healthcare Access Trend</h3>
                  <p className="mb-3">Percentage of rural population with access to healthcare services</p>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={accessTrendData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="year" stroke="rgba(255,255,255,0.7)" />
                        <YAxis stroke="rgba(255,255,255,0.7)" />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#0affff' }} />
                        <Area type="monotone" dataKey="healthcareAccess" stroke="#0affff" fill="rgba(10, 255, 255, 0.2)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-cyan)] mb-3">Common Health Issues</h3>
                  <p className="mb-3">Distribution of primary health concerns in rural communities</p>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={healthIssuesData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {healthIssuesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#0affff' }} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-4">
                <CyberButton onClick={() => window.location.href = '/healthcare/facilities'}>
                  <i className="fas fa-hospital mr-2"></i> View Healthcare Facilities
                </CyberButton>
                <CyberButton variant="outline" onClick={() => window.location.href = '/healthcare/report'}>
                  <i className="fas fa-file-medical-alt mr-2"></i> Generate Health Report
                </CyberButton>
              </div>
            </SciFiCard>
          )}

          {activeTab === "telemedicine" && (
            <SciFiCard>
              <h2 className="text-2xl font-rajdhani font-semibold text-[var(--cyber-cyan)] mb-4">Telemedicine Network</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Active Consultations</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-cyan)] mb-1">1,425</div>
                  <div className="text-sm text-gray-300">Monthly average</div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Specialist Network</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-purple)] mb-1">48</div>
                  <div className="text-sm text-gray-300">Connected specialists</div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Response Time</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-green)] mb-1">4.2h</div>
                  <div className="text-sm text-gray-300">Average response time</div>
                </div>
              </div>
              
              <div className="bg-[var(--cyber-blue)] p-4 rounded-lg mb-6">
                <h3 className="text-xl font-rajdhani text-[var(--cyber-cyan)] mb-3">Telemedicine Consultations</h3>
                <p className="mb-3">Monthly remote healthcare consultations</p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={telemedicineData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="month" stroke="rgba(255,255,255,0.7)" />
                      <YAxis stroke="rgba(255,255,255,0.7)" />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#0affff' }} />
                      <Line type="monotone" dataKey="consultations" stroke="#0affff" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg border border-[var(--cyber-cyan)] border-opacity-30">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-cyan)] mb-3">How It Works</h3>
                  
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="w-10 h-10 bg-[var(--cyber-cyan)] bg-opacity-20 rounded-full flex items-center justify-center mr-3 shrink-0">
                        <span className="font-rajdhani font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="font-rajdhani text-white mb-1">Local Health Kiosks</h4>
                        <p className="text-sm">Solar-powered, internet-connected health kiosks installed in village centers provide the physical infrastructure for telemedicine sessions.</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-10 h-10 bg-[var(--cyber-cyan)] bg-opacity-20 rounded-full flex items-center justify-center mr-3 shrink-0">
                        <span className="font-rajdhani font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="font-rajdhani text-white mb-1">Appointment Scheduling</h4>
                        <p className="text-sm">Community health workers help patients schedule appointments with appropriate specialists through our mobile application.</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-10 h-10 bg-[var(--cyber-cyan)] bg-opacity-20 rounded-full flex items-center justify-center mr-3 shrink-0">
                        <span className="font-rajdhani font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="font-rajdhani text-white mb-1">Virtual Consultation</h4>
                        <p className="text-sm">Patients connect with healthcare providers through high-quality, bandwidth-optimized video conferencing with diagnostic data sharing.</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-10 h-10 bg-[var(--cyber-cyan)] bg-opacity-20 rounded-full flex items-center justify-center mr-3 shrink-0">
                        <span className="font-rajdhani font-bold">4</span>
                      </div>
                      <div>
                        <h4 className="font-rajdhani text-white mb-1">Follow-up Care</h4>
                        <p className="text-sm">Digital prescriptions, treatment plans, and follow-up appointments are managed through our integrated care platform.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg border border-[var(--cyber-cyan)] border-opacity-30">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-cyan)] mb-3">Available Specialties</h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="border border-[var(--cyber-cyan)] border-opacity-20 p-3 rounded-lg">
                      <div className="flex items-center mb-2">
                        <i className="fas fa-heartbeat text-[var(--cyber-cyan)] mr-2"></i>
                        <h4 className="font-rajdhani">General Medicine</h4>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Wait Time: ~2 hours</span>
                        <span className="text-[var(--cyber-green)]">Available</span>
                      </div>
                    </div>
                    
                    <div className="border border-[var(--cyber-cyan)] border-opacity-20 p-3 rounded-lg">
                      <div className="flex items-center mb-2">
                        <i className="fas fa-baby text-[var(--cyber-cyan)] mr-2"></i>
                        <h4 className="font-rajdhani">Pediatrics</h4>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Wait Time: ~4 hours</span>
                        <span className="text-[var(--cyber-green)]">Available</span>
                      </div>
                    </div>
                    
                    <div className="border border-[var(--cyber-cyan)] border-opacity-20 p-3 rounded-lg">
                      <div className="flex items-center mb-2">
                        <i className="fas fa-venus text-[var(--cyber-cyan)] mr-2"></i>
                        <h4 className="font-rajdhani">Women's Health</h4>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Wait Time: ~3 hours</span>
                        <span className="text-[var(--cyber-green)]">Available</span>
                      </div>
                    </div>
                    
                    <div className="border border-[var(--cyber-cyan)] border-opacity-20 p-3 rounded-lg">
                      <div className="flex items-center mb-2">
                        <i className="fas fa-lungs text-[var(--cyber-cyan)] mr-2"></i>
                        <h4 className="font-rajdhani">Respiratory</h4>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Wait Time: ~5 hours</span>
                        <span className="text-[var(--cyber-green)]">Available</span>
                      </div>
                    </div>
                    
                    <div className="border border-[var(--cyber-cyan)] border-opacity-20 p-3 rounded-lg">
                      <div className="flex items-center mb-2">
                        <i className="fas fa-brain text-[var(--cyber-cyan)] mr-2"></i>
                        <h4 className="font-rajdhani">Mental Health</h4>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Wait Time: ~6 hours</span>
                        <span className="text-[var(--cyber-green)]">Available</span>
                      </div>
                    </div>
                    
                    <div className="border border-[var(--cyber-cyan)] border-opacity-20 p-3 rounded-lg">
                      <div className="flex items-center mb-2">
                        <i className="fas fa-tooth text-[var(--cyber-cyan)] mr-2"></i>
                        <h4 className="font-rajdhani">Dental</h4>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Wait Time: ~8 hours</span>
                        <span className="text-[var(--cyber-orange)]">Limited</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <CyberButton onClick={() => alert("Telemedicine appointment scheduling will open")}>
                  <i className="fas fa-calendar-plus mr-2"></i> Schedule Consultation
                </CyberButton>
                <CyberButton variant="outline" onClick={() => alert("Specialist directory will be displayed")}>
                  <i className="fas fa-user-md mr-2"></i> View Specialists
                </CyberButton>
              </div>
            </SciFiCard>
          )}

          {activeTab === "diagnosis" && (
            <SciFiCard>
              <h2 className="text-2xl font-rajdhani font-semibold text-[var(--cyber-cyan)] mb-4">AI Diagnostic Platform</h2>
              
              <div className="bg-[var(--cyber-blue)] p-4 rounded-lg mb-6">
                <h3 className="text-xl font-rajdhani text-[var(--cyber-cyan)] mb-3">Diagnostic Accuracy</h3>
                <p className="mb-3">AI diagnostic system accuracy improvement over time</p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={aiDiagnosticData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="month" stroke="rgba(255,255,255,0.7)" />
                      <YAxis stroke="rgba(255,255,255,0.7)" domain={[80, 100]} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#0affff' }} />
                      <Line type="monotone" dataKey="accuracy" stroke="#0affff" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Cases Analyzed</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-cyan)] mb-1">12,450</div>
                  <div className="text-sm text-gray-300">For model training and optimization</div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Conditions Identified</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-purple)] mb-1">85+</div>
                  <div className="text-sm text-gray-300">Common rural health conditions</div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Early Detection Rate</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-green)] mb-1">32%</div>
                  <div className="text-sm text-gray-300">Increase compared to traditional methods</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg border border-[var(--cyber-cyan)] border-opacity-30">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-cyan)] mb-3">Diagnostic Tools</h3>
                  
                  <div className="space-y-4">
                    <div className="border border-[var(--cyber-cyan)] border-opacity-20 p-3 rounded-lg">
                      <h4 className="font-rajdhani text-[var(--cyber-cyan)] mb-2">Smart Stethoscope</h4>
                      <p className="text-sm mb-3">AI-enhanced stethoscope that captures, analyzes, and transmits heart and lung sounds for remote diagnosis.</p>
                      <div className="flex justify-between text-xs">
                        <span>Accuracy: 94%</span>
                        <span className="text-[var(--cyber-green)]">25 deployed</span>
                      </div>
                    </div>
                    
                    <div className="border border-[var(--cyber-cyan)] border-opacity-20 p-3 rounded-lg">
                      <h4 className="font-rajdhani text-[var(--cyber-cyan)] mb-2">Mobile Ultrasound</h4>
                      <p className="text-sm mb-3">Portable ultrasound device with AI analysis for common diagnostic imaging needs.</p>
                      <div className="flex justify-between text-xs">
                        <span>Accuracy: 89%</span>
                        <span className="text-[var(--cyber-green)]">18 deployed</span>
                      </div>
                    </div>
                    
                    <div className="border border-[var(--cyber-cyan)] border-opacity-20 p-3 rounded-lg">
                      <h4 className="font-rajdhani text-[var(--cyber-cyan)] mb-2">Dermatology Scanner</h4>
                      <p className="text-sm mb-3">High-resolution imaging system for skin conditions with AI-powered analysis and classification.</p>
                      <div className="flex justify-between text-xs">
                        <span>Accuracy: 92%</span>
                        <span className="text-[var(--cyber-green)]">22 deployed</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg border border-[var(--cyber-cyan)] border-opacity-30">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-cyan)] mb-3">AI Analysis Process</h3>
                  
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="w-10 h-10 bg-[var(--cyber-cyan)] bg-opacity-20 rounded-full flex items-center justify-center mr-3 shrink-0">
                        <i className="fas fa-notes-medical text-[var(--cyber-cyan)]"></i>
                      </div>
                      <div>
                        <h4 className="font-rajdhani text-white mb-1">Data Collection</h4>
                        <p className="text-sm">Patient symptoms, vital signs, and diagnostic images are collected using our specialized tools.</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-10 h-10 bg-[var(--cyber-cyan)] bg-opacity-20 rounded-full flex items-center justify-center mr-3 shrink-0">
                        <i className="fas fa-wifi text-[var(--cyber-cyan)]"></i>
                      </div>
                      <div>
                        <h4 className="font-rajdhani text-white mb-1">Secure Transmission</h4>
                        <p className="text-sm">Data is encrypted and transmitted to our cloud infrastructure, with local processing for areas with limited connectivity.</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-10 h-10 bg-[var(--cyber-cyan)] bg-opacity-20 rounded-full flex items-center justify-center mr-3 shrink-0">
                        <i className="fas fa-brain text-[var(--cyber-cyan)]"></i>
                      </div>
                      <div>
                        <h4 className="font-rajdhani text-white mb-1">AI Analysis</h4>
                        <p className="text-sm">Our machine learning models analyze the data, identifying potential conditions and recommended next steps.</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-10 h-10 bg-[var(--cyber-cyan)] bg-opacity-20 rounded-full flex items-center justify-center mr-3 shrink-0">
                        <i className="fas fa-user-md text-[var(--cyber-cyan)]"></i>
                      </div>
                      <div>
                        <h4 className="font-rajdhani text-white mb-1">Human Verification</h4>
                        <p className="text-sm">Healthcare professionals review AI findings and provide final diagnosis and treatment plans.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <CyberButton onClick={() => alert("Diagnostic request form will be displayed")}>
                  <i className="fas fa-diagnoses mr-2"></i> Request Diagnosis
                </CyberButton>
                <CyberButton variant="outline" onClick={() => alert("System information will be displayed")}>
                  <i className="fas fa-info-circle mr-2"></i> How It Works
                </CyberButton>
              </div>
            </SciFiCard>
          )}

          {activeTab === "analytics" && (
            <SciFiCard>
              <h2 className="text-2xl font-rajdhani font-semibold text-[var(--cyber-cyan)] mb-4">Health Analytics Dashboard</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Data Points</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-cyan)] mb-1">8.2M</div>
                  <div className="text-sm text-gray-300">Health data points collected</div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Communities</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-purple)] mb-1">35</div>
                  <div className="text-sm text-gray-300">Communities monitored</div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Preventive Actions</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-green)] mb-1">145</div>
                  <div className="text-sm text-gray-300">Initiated this quarter</div>
                </div>
              </div>
              
              <div className="bg-[var(--cyber-blue)] p-4 rounded-lg mb-6">
                <h3 className="text-xl font-rajdhani text-[var(--cyber-cyan)] mb-3">Population Health Insights</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-[var(--cyber-cyan)] border-opacity-30 rounded-lg p-4">
                    <h4 className="font-rajdhani text-[var(--cyber-cyan)] mb-3">Emerging Health Trends</h4>
                    
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="text-[var(--cyber-orange)] mr-2 mt-1"><i className="fas fa-arrow-up"></i></div>
                        <div>
                          <span className="font-semibold block">Respiratory Issues</span>
                          <span className="text-sm">15% increase in respiratory concerns in Western region, correlated with seasonal agricultural activities.</span>
                        </div>
                      </li>
                      
                      <li className="flex items-start">
                        <div className="text-[var(--cyber-green)] mr-2 mt-1"><i className="fas fa-arrow-down"></i></div>
                        <div>
                          <span className="font-semibold block">Waterborne Illness</span>
                          <span className="text-sm">32% decrease in communities with newly installed water purification systems.</span>
                        </div>
                      </li>
                      
                      <li className="flex items-start">
                        <div className="text-[var(--cyber-cyan)] mr-2 mt-1"><i className="fas fa-exclamation-circle"></i></div>
                        <div>
                          <span className="font-semibold block">Nutritional Deficiencies</span>
                          <span className="text-sm">Pattern of vitamin D and calcium deficiencies detected in Northern communities.</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="border border-[var(--cyber-cyan)] border-opacity-30 rounded-lg p-4">
                    <h4 className="font-rajdhani text-[var(--cyber-cyan)] mb-3">AI-Generated Recommendations</h4>
                    
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="text-[var(--cyber-purple)] mr-2 mt-1"><i className="fas fa-lightbulb"></i></div>
                        <div>
                          <span className="font-semibold block">Preventive Campaign</span>
                          <span className="text-sm">Launch respiratory health awareness campaign in agricultural regions before harvest season.</span>
                        </div>
                      </li>
                      
                      <li className="flex items-start">
                        <div className="text-[var(--cyber-purple)] mr-2 mt-1"><i className="fas fa-lightbulb"></i></div>
                        <div>
                          <span className="font-semibold block">Nutrition Program</span>
                          <span className="text-sm">Implement targeted nutrition supplement program in Northern villages with fortified staple foods.</span>
                        </div>
                      </li>
                      
                      <li className="flex items-start">
                        <div className="text-[var(--cyber-purple)] mr-2 mt-1"><i className="fas fa-lightbulb"></i></div>
                        <div>
                          <span className="font-semibold block">Mobile Clinics</span>
                          <span className="text-sm">Reallocate mobile healthcare units to Eastern region based on seasonal disease pattern predictions.</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-[var(--cyber-blue)] p-4 rounded-lg mb-6">
                <h3 className="text-xl font-rajdhani text-[var(--cyber-cyan)] mb-3">Early Warning System</h3>
                <p className="mb-4">AI-powered system that analyzes health data to predict and prevent disease outbreaks in rural areas.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border border-[var(--cyber-green)] border-opacity-30 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-rajdhani text-[var(--cyber-green)]">Southern Region</h4>
                      <span className="px-2 py-1 bg-[var(--cyber-green)] bg-opacity-20 text-[var(--cyber-green)] rounded text-xs">NORMAL</span>
                    </div>
                    <p className="text-sm mb-2">All health indicators within normal seasonal ranges.</p>
                    <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--cyber-green)]" style={{ width: "20%" }}></div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs">
                      <span>Alert Level: Low</span>
                      <span>20%</span>
                    </div>
                  </div>
                  
                  <div className="border border-[var(--cyber-orange)] border-opacity-30 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-rajdhani text-[var(--cyber-orange)]">Eastern Region</h4>
                      <span className="px-2 py-1 bg-[var(--cyber-orange)] bg-opacity-20 text-[var(--cyber-orange)] rounded text-xs">ATTENTION</span>
                    </div>
                    <p className="text-sm mb-2">Elevated gastrointestinal symptoms reported in two villages.</p>
                    <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--cyber-orange)]" style={{ width: "65%" }}></div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs">
                      <span>Alert Level: Moderate</span>
                      <span>65%</span>
                    </div>
                  </div>
                  
                  <div className="border border-[var(--cyber-cyan)] border-opacity-30 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-rajdhani text-[var(--cyber-cyan)]">Western Region</h4>
                      <span className="px-2 py-1 bg-[var(--cyber-cyan)] bg-opacity-20 text-[var(--cyber-cyan)] rounded text-xs">MONITORING</span>
                    </div>
                    <p className="text-sm mb-2">Seasonal respiratory conditions being actively monitored.</p>
                    <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--cyber-cyan)]" style={{ width: "45%" }}></div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs">
                      <span>Alert Level: Low</span>
                      <span>45%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <CyberButton onClick={() => alert("Full analytics dashboard will be displayed")}>
                  <i className="fas fa-chart-network mr-2"></i> Detailed Analytics
                </CyberButton>
                <CyberButton variant="outline" onClick={() => alert("Report generation tool will be displayed")}>
                  <i className="fas fa-file-chart-line mr-2"></i> Generate Health Report
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