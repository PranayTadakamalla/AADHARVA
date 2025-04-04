import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SciFiCard } from "@/components/ui/sci-fi-card";
import { CyberButton } from "@/components/ui/cyber-button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export default function GovernancePage() {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample data for charts
  const participationData = [
    { year: '2020', participation: 35 },
    { year: '2021', participation: 45 },
    { year: '2022', participation: 60 },
    { year: '2023', participation: 75 },
    { year: '2024', participation: 85 },
  ];

  const issueResolutionData = [
    { category: 'Water', resolved: 85, pending: 15 },
    { category: 'Education', resolved: 78, pending: 22 },
    { category: 'Healthcare', resolved: 82, pending: 18 },
    { category: 'Agriculture', resolved: 90, pending: 10 },
    { category: 'Energy', resolved: 70, pending: 30 },
    { category: 'Infrastructure', resolved: 65, pending: 35 },
  ];

  const genderData = [
    { name: 'Female', value: 45 },
    { name: 'Male', value: 48 },
    { name: 'Non-binary', value: 7 },
  ];

  const COLORS = ['#0affff', '#7c3aed', '#10b981'];

  const satisfactionData = [
    { month: 'Jan', satisfaction: 68 },
    { month: 'Feb', satisfaction: 72 },
    { month: 'Mar', satisfaction: 76 },
    { month: 'Apr', satisfaction: 80 },
    { month: 'May', satisfaction: 85 },
    { month: 'Jun', satisfaction: 88 },
  ];

  return (
    <div className="bg-[var(--cyber-dark)] font-inter text-gray-100 min-h-screen overflow-x-hidden">
      <Header />
      <main className="container mx-auto py-8 px-4 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-rajdhani font-bold mb-2 text-[var(--cyber-blue-light)] glowing-text">Rural Governance Platform</h1>
          <div className="cyber-line mb-8"></div>
          
          <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
            <CyberButton 
              variant={activeTab === "overview" ? "default" : "outline"} 
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </CyberButton>
            <CyberButton 
              variant={activeTab === "participation" ? "default" : "outline"} 
              onClick={() => setActiveTab("participation")}
            >
              Community Participation
            </CyberButton>
            <CyberButton 
              variant={activeTab === "transparency" ? "default" : "outline"} 
              onClick={() => setActiveTab("transparency")}
            >
              Transparency
            </CyberButton>
            <CyberButton 
              variant={activeTab === "resolution" ? "default" : "outline"} 
              onClick={() => setActiveTab("resolution")}
            >
              Issue Resolution
            </CyberButton>
          </div>

          {activeTab === "overview" && (
            <SciFiCard>
              <h2 className="text-2xl font-rajdhani font-semibold text-[var(--cyber-blue-light)] mb-4">Digital Governance Initiative</h2>
              <p className="mb-4">
                Our rural governance platform empowers communities through technology-enabled participation, transparent 
                decision-making, and efficient service delivery. By leveraging AI analytics, blockchain verification, and 
                mobile accessibility, we're creating more responsive, accountable, and inclusive governance systems that 
                address the unique needs of rural communities.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-blue-light)] mb-3">Governance Participation</h3>
                  <p className="mb-3">Percentage of adult community members actively participating in governance</p>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={participationData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="year" stroke="rgba(255,255,255,0.7)" />
                        <YAxis stroke="rgba(255,255,255,0.7)" />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#2563eb' }} />
                        <Area type="monotone" dataKey="participation" stroke="#2563eb" fill="rgba(37, 99, 235, 0.2)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-blue-light)] mb-3">Gender Distribution</h3>
                  <p className="mb-3">Gender diversity in governance participation</p>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={genderData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {genderData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#2563eb' }} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-4">
                <CyberButton onClick={() => window.location.href = '/governance/dashboard'}>
                  <i className="fas fa-chart-bar mr-2"></i> Governance Dashboard
                </CyberButton>
                <CyberButton variant="outline" onClick={() => window.location.href = '/governance/report'}>
                  <i className="fas fa-file-alt mr-2"></i> Generate Governance Report
                </CyberButton>
              </div>
            </SciFiCard>
          )}

          {activeTab === "participation" && (
            <SciFiCard>
              <h2 className="text-2xl font-rajdhani font-semibold text-[var(--cyber-blue-light)] mb-4">Community Participation</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Active Participants</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-blue-light)] mb-1">3,450</div>
                  <div className="text-sm text-gray-300">Across 18 communities</div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Proposals Submitted</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-cyan)] mb-1">285</div>
                  <div className="text-sm text-gray-300">In the last 12 months</div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Satisfaction Rate</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-green)] mb-1">88%</div>
                  <div className="text-sm text-gray-300">Based on community feedback</div>
                </div>
              </div>
              
              <div className="bg-[var(--cyber-blue)] p-4 rounded-lg mb-6">
                <h3 className="text-xl font-rajdhani text-[var(--cyber-blue-light)] mb-3">Community Satisfaction Trend</h3>
                <p className="mb-3">Monthly satisfaction ratings with governance processes</p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={satisfactionData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="month" stroke="rgba(255,255,255,0.7)" />
                      <YAxis stroke="rgba(255,255,255,0.7)" />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#2563eb' }} />
                      <Line type="monotone" dataKey="satisfaction" name="Satisfaction Rating (%)" stroke="#2563eb" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg border border-[var(--cyber-blue-light)] border-opacity-30">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-blue-light)] mb-3">Participation Channels</h3>
                  
                  <div className="space-y-4">
                    <div className="border border-[var(--cyber-blue-light)] border-opacity-20 p-3 rounded-lg">
                      <div className="flex items-center mb-2">
                        <i className="fas fa-mobile-alt text-[var(--cyber-blue-light)] mr-2"></i>
                        <h4 className="font-rajdhani">Mobile Voting Platform</h4>
                      </div>
                      <p className="text-sm">Secure mobile application that enables community members to vote on proposals and provide feedback on initiatives.</p>
                      <div className="flex justify-between text-xs mt-2">
                        <span>Users: 2,840</span>
                        <span>Engagement: 72%</span>
                      </div>
                    </div>
                    
                    <div className="border border-[var(--cyber-blue-light)] border-opacity-20 p-3 rounded-lg">
                      <div className="flex items-center mb-2">
                        <i className="fas fa-comments text-[var(--cyber-blue-light)] mr-2"></i>
                        <h4 className="font-rajdhani">Community Forums</h4>
                      </div>
                      <p className="text-sm">Digital discussion spaces organized by topic where community members can debate issues and propose solutions.</p>
                      <div className="flex justify-between text-xs mt-2">
                        <span>Active Forums: 24</span>
                        <span>Monthly Posts: ~850</span>
                      </div>
                    </div>
                    
                    <div className="border border-[var(--cyber-blue-light)] border-opacity-20 p-3 rounded-lg">
                      <div className="flex items-center mb-2">
                        <i className="fas fa-video text-[var(--cyber-blue-light)] mr-2"></i>
                        <h4 className="font-rajdhani">Virtual Town Halls</h4>
                      </div>
                      <p className="text-sm">Low-bandwidth video conferencing sessions allowing direct interaction between community members and leaders.</p>
                      <div className="flex justify-between text-xs mt-2">
                        <span>Sessions: 6 monthly</span>
                        <span>Average Attendance: 120</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg border border-[var(--cyber-blue-light)] border-opacity-30">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-blue-light)] mb-3">Inclusion Initiatives</h3>
                  
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="w-10 h-10 bg-[var(--cyber-blue-light)] bg-opacity-20 rounded-full flex items-center justify-center mr-3 shrink-0">
                        <i className="fas fa-universal-access text-[var(--cyber-blue-light)]"></i>
                      </div>
                      <div>
                        <h4 className="font-rajdhani text-white mb-1">Accessibility Features</h4>
                        <p className="text-sm">Voice-driven interfaces, screen reader compatibility, and simplified user experiences for those with limited technical skills or disabilities.</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-10 h-10 bg-[var(--cyber-blue-light)] bg-opacity-20 rounded-full flex items-center justify-center mr-3 shrink-0">
                        <i className="fas fa-language text-[var(--cyber-blue-light)]"></i>
                      </div>
                      <div>
                        <h4 className="font-rajdhani text-white mb-1">Multilingual Support</h4>
                        <p className="text-sm">Platform available in 8 local languages with voice-to-text and text-to-voice translation for those with limited literacy.</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-10 h-10 bg-[var(--cyber-blue-light)] bg-opacity-20 rounded-full flex items-center justify-center mr-3 shrink-0">
                        <i className="fas fa-users text-[var(--cyber-blue-light)]"></i>
                      </div>
                      <div>
                        <h4 className="font-rajdhani text-white mb-1">Diversity Programs</h4>
                        <p className="text-sm">Targeted outreach and training to ensure representation from women, youth, elders, and marginalized groups in governance processes.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <CyberButton onClick={() => alert("Community forum will open")}>
                  <i className="fas fa-comments mr-2"></i> Join Discussion Forum
                </CyberButton>
                <CyberButton variant="outline" onClick={() => alert("Virtual town hall calendar will open")}>
                  <i className="fas fa-calendar-alt mr-2"></i> Upcoming Town Halls
                </CyberButton>
              </div>
            </SciFiCard>
          )}

          {activeTab === "transparency" && (
            <SciFiCard>
              <h2 className="text-2xl font-rajdhani font-semibold text-[var(--cyber-blue-light)] mb-4">Transparency Systems</h2>
              
              <div className="bg-[var(--cyber-blue)] p-4 rounded-lg mb-6">
                <h3 className="text-xl font-rajdhani text-[var(--cyber-blue-light)] mb-3">Blockchain Verification</h3>
                <p className="mb-4">Our governance platform utilizes blockchain technology to create immutable, verifiable records of all community decisions, resource allocations, and project implementations.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border border-[var(--cyber-blue-light)] border-opacity-30 p-3 rounded-lg">
                    <div className="flex items-center mb-2">
                      <i className="fas fa-vote-yea text-[var(--cyber-blue-light)] mr-2"></i>
                      <h4 className="font-rajdhani">Decision Recording</h4>
                    </div>
                    <p className="text-sm">All community votes and decisions are recorded on a public blockchain with voter privacy protection.</p>
                    <div className="mt-2 text-xs text-gray-400">
                      <div><i className="fas fa-check-circle mr-1"></i> 1,245 decisions recorded</div>
                      <div><i className="fas fa-shield-alt mr-1"></i> 100% verification rate</div>
                    </div>
                  </div>
                  
                  <div className="border border-[var(--cyber-blue-light)] border-opacity-30 p-3 rounded-lg">
                    <div className="flex items-center mb-2">
                      <i className="fas fa-money-bill-wave text-[var(--cyber-blue-light)] mr-2"></i>
                      <h4 className="font-rajdhani">Financial Tracking</h4>
                    </div>
                    <p className="text-sm">Complete tracking of resource allocations and expenditures with blockchain verification.</p>
                    <div className="mt-2 text-xs text-gray-400">
                      <div><i className="fas fa-chart-pie mr-1"></i> $1.8M resources tracked</div>
                      <div><i className="fas fa-file-invoice-dollar mr-1"></i> 3,450 transactions</div>
                    </div>
                  </div>
                  
                  <div className="border border-[var(--cyber-blue-light)] border-opacity-30 p-3 rounded-lg">
                    <div className="flex items-center mb-2">
                      <i className="fas fa-tasks text-[var(--cyber-blue-light)] mr-2"></i>
                      <h4 className="font-rajdhani">Project Verification</h4>
                    </div>
                    <p className="text-sm">Implementation milestones verified through multi-stakeholder confirmation and physical evidence.</p>
                    <div className="mt-2 text-xs text-gray-400">
                      <div><i className="fas fa-project-diagram mr-1"></i> 68 projects tracked</div>
                      <div><i className="fas fa-clipboard-check mr-1"></i> 420 milestones verified</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg border border-[var(--cyber-blue-light)] border-opacity-30">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-blue-light)] mb-3">Open Data Platform</h3>
                  
                  <div className="space-y-4">
                    <div className="border border-[var(--cyber-blue-light)] border-opacity-20 p-3 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-rajdhani text-[var(--cyber-cyan)]">Community Resource Data</h4>
                        <span className="px-2 py-1 bg-[var(--cyber-green)] bg-opacity-20 text-[var(--cyber-green)] rounded text-xs">LIVE</span>
                      </div>
                      <p className="text-sm mb-2">Real-time information on community resources, allocations, and utilization patterns.</p>
                      <div className="flex justify-between text-xs">
                        <span>Updated: Hourly</span>
                        <span>Data Points: 12K+</span>
                      </div>
                    </div>
                    
                    <div className="border border-[var(--cyber-blue-light)] border-opacity-20 p-3 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-rajdhani text-[var(--cyber-cyan)]">Project Implementation Data</h4>
                        <span className="px-2 py-1 bg-[var(--cyber-green)] bg-opacity-20 text-[var(--cyber-green)] rounded text-xs">LIVE</span>
                      </div>
                      <p className="text-sm mb-2">Progress tracking, expenditure reports, and impact metrics for all community projects.</p>
                      <div className="flex justify-between text-xs">
                        <span>Updated: Daily</span>
                        <span>Projects: 68</span>
                      </div>
                    </div>
                    
                    <div className="border border-[var(--cyber-blue-light)] border-opacity-20 p-3 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-rajdhani text-[var(--cyber-cyan)]">Decision Outcomes</h4>
                        <span className="px-2 py-1 bg-[var(--cyber-green)] bg-opacity-20 text-[var(--cyber-green)] rounded text-xs">LIVE</span>
                      </div>
                      <p className="text-sm mb-2">Archive of all community decisions with voting data, implementation status, and impact assessments.</p>
                      <div className="flex justify-between text-xs">
                        <span>Updated: Real-time</span>
                        <span>Decisions: 1,245</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg border border-[var(--cyber-blue-light)] border-opacity-30">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-blue-light)] mb-3">Transparency Tools</h3>
                  
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="w-10 h-10 bg-[var(--cyber-blue-light)] bg-opacity-20 rounded-full flex items-center justify-center mr-3 shrink-0">
                        <i className="fas fa-search-dollar text-[var(--cyber-blue-light)]"></i>
                      </div>
                      <div>
                        <h4 className="font-rajdhani text-white mb-1">Resource Tracker</h4>
                        <p className="text-sm">Interactive tool allowing community members to track the flow of resources from allocation to implementation and outcomes.</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-10 h-10 bg-[var(--cyber-blue-light)] bg-opacity-20 rounded-full flex items-center justify-center mr-3 shrink-0">
                        <i className="fas fa-chart-bar text-[var(--cyber-blue-light)]"></i>
                      </div>
                      <div>
                        <h4 className="font-rajdhani text-white mb-1">Impact Dashboard</h4>
                        <p className="text-sm">Visual representation of community projects' progress and outcomes, with before/after comparisons and beneficiary statistics.</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-10 h-10 bg-[var(--cyber-blue-light)] bg-opacity-20 rounded-full flex items-center justify-center mr-3 shrink-0">
                        <i className="fas fa-file-contract text-[var(--cyber-blue-light)]"></i>
                      </div>
                      <div>
                        <h4 className="font-rajdhani text-white mb-1">Contract Explorer</h4>
                        <p className="text-sm">Searchable database of all community contracts and agreements, with verification status and implementation tracking.</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-10 h-10 bg-[var(--cyber-blue-light)] bg-opacity-20 rounded-full flex items-center justify-center mr-3 shrink-0">
                        <i className="fas fa-calendar-check text-[var(--cyber-blue-light)]"></i>
                      </div>
                      <div>
                        <h4 className="font-rajdhani text-white mb-1">Accountability Calendar</h4>
                        <p className="text-sm">Timeline of all commitments made by community leaders and implementing partners, with status updates and deadline tracking.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <CyberButton onClick={() => alert("Resource tracker will open")}>
                  <i className="fas fa-search-dollar mr-2"></i> Resource Tracker
                </CyberButton>
                <CyberButton variant="outline" onClick={() => alert("Blockchain explorer will open")}>
                  <i className="fas fa-cubes mr-2"></i> Verification Explorer
                </CyberButton>
              </div>
            </SciFiCard>
          )}

          {activeTab === "resolution" && (
            <SciFiCard>
              <h2 className="text-2xl font-rajdhani font-semibold text-[var(--cyber-blue-light)] mb-4">Issue Resolution System</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Issues Submitted</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-blue-light)] mb-1">458</div>
                  <div className="text-sm text-gray-300">Last 12 months</div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Resolution Rate</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-green)] mb-1">78%</div>
                  <div className="text-sm text-gray-300">Average across categories</div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Response Time</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-cyan)] mb-1">3.2 days</div>
                  <div className="text-sm text-gray-300">Average initial response</div>
                </div>
              </div>
              
              <div className="bg-[var(--cyber-blue)] p-4 rounded-lg mb-6">
                <h3 className="text-xl font-rajdhani text-[var(--cyber-blue-light)] mb-3">Issue Resolution by Category</h3>
                <p className="mb-3">Resolution status across different service categories</p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={issueResolutionData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      layout="vertical"
                      stackOffset="expand"
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis type="number" stroke="rgba(255,255,255,0.7)" />
                      <YAxis dataKey="category" type="category" stroke="rgba(255,255,255,0.7)" />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#2563eb' }} />
                      <Legend />
                      <Bar dataKey="resolved" stackId="a" name="Resolved (%)" fill="#10b981" />
                      <Bar dataKey="pending" stackId="a" name="Pending (%)" fill="#f97316" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg border border-[var(--cyber-blue-light)] border-opacity-30">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-blue-light)] mb-3">AI-Powered Resolution</h3>
                  
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="w-10 h-10 bg-[var(--cyber-blue-light)] bg-opacity-20 rounded-full flex items-center justify-center mr-3 shrink-0">
                        <i className="fas fa-robot text-[var(--cyber-blue-light)]"></i>
                      </div>
                      <div>
                        <h4 className="font-rajdhani text-white mb-1">Smart Issue Categorization</h4>
                        <p className="text-sm">AI system that automatically categorizes and routes issues to the appropriate department or authority for faster response.</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-10 h-10 bg-[var(--cyber-blue-light)] bg-opacity-20 rounded-full flex items-center justify-center mr-3 shrink-0">
                        <i className="fas fa-comments text-[var(--cyber-blue-light)]"></i>
                      </div>
                      <div>
                        <h4 className="font-rajdhani text-white mb-1">Virtual Resolution Assistant</h4>
                        <p className="text-sm">AI chatbot that provides immediate responses to common issues and guides users through initial troubleshooting steps.</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-10 h-10 bg-[var(--cyber-blue-light)] bg-opacity-20 rounded-full flex items-center justify-center mr-3 shrink-0">
                        <i className="fas fa-chart-network text-[var(--cyber-blue-light)]"></i>
                      </div>
                      <div>
                        <h4 className="font-rajdhani text-white mb-1">Pattern Recognition</h4>
                        <p className="text-sm">Machine learning algorithms that identify recurring issues and systemic problems for proactive resolution.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg border border-[var(--cyber-blue-light)] border-opacity-30">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-blue-light)] mb-3">Multi-Channel Access</h3>
                  
                  <div className="space-y-4">
                    <div className="border border-[var(--cyber-blue-light)] border-opacity-20 p-3 rounded-lg">
                      <div className="flex items-center mb-2">
                        <i className="fas fa-mobile-alt text-[var(--cyber-blue-light)] mr-2"></i>
                        <h4 className="font-rajdhani">Mobile App Reporting</h4>
                      </div>
                      <p className="text-sm">Smartphone application with offline capability for issue reporting with photos, location data, and severity indicators.</p>
                      <div className="flex justify-between text-xs mt-2">
                        <span>Issues Reported: 285</span>
                        <span>Users: 1,840</span>
                      </div>
                    </div>
                    
                    <div className="border border-[var(--cyber-blue-light)] border-opacity-20 p-3 rounded-lg">
                      <div className="flex items-center mb-2">
                        <i className="fas fa-sms text-[var(--cyber-blue-light)] mr-2"></i>
                        <h4 className="font-rajdhani">SMS System</h4>
                      </div>
                      <p className="text-sm">Text message-based reporting system for users without smartphones, using simple codes and natural language processing.</p>
                      <div className="flex justify-between text-xs mt-2">
                        <span>Issues Reported: 142</span>
                        <span>Users: 950</span>
                      </div>
                    </div>
                    
                    <div className="border border-[var(--cyber-blue-light)] border-opacity-20 p-3 rounded-lg">
                      <div className="flex items-center mb-2">
                        <i className="fas fa-microphone text-[var(--cyber-blue-light)] mr-2"></i>
                        <h4 className="font-rajdhani">Voice Reporting</h4>
                      </div>
                      <p className="text-sm">Interactive voice response system with local language support for users with limited literacy or technology access.</p>
                      <div className="flex justify-between text-xs mt-2">
                        <span>Issues Reported: 94</span>
                        <span>Users: 450</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-[var(--cyber-blue)] p-4 rounded-lg mb-6">
                <h3 className="text-xl font-rajdhani text-[var(--cyber-blue-light)] mb-3">Success Stories</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border border-[var(--cyber-green)] border-opacity-30 p-4 rounded-lg">
                    <h4 className="font-rajdhani text-[var(--cyber-green)] mb-2">Water Systems Repair</h4>
                    <p className="text-sm mb-3">Multiple reports of water system issues in the Eastern region were aggregated, prioritized, and resolved through a coordinated maintenance initiative.</p>
                    <div className="text-xs text-gray-400">
                      <div className="mb-1"><i className="fas fa-exclamation-circle mr-1"></i> 18 issues reported</div>
                      <div><i className="fas fa-check-circle mr-1"></i> Resolved in 8 days</div>
                    </div>
                  </div>
                  
                  <div className="border border-[var(--cyber-green)] border-opacity-30 p-4 rounded-lg">
                    <h4 className="font-rajdhani text-[var(--cyber-green)] mb-2">Healthcare Services Gap</h4>
                    <p className="text-sm mb-3">Pattern analysis identified a consistent lack of maternal healthcare services, leading to implementation of a mobile clinic program.</p>
                    <div className="text-xs text-gray-400">
                      <div className="mb-1"><i className="fas fa-exclamation-circle mr-1"></i> Pattern detected from 35+ reports</div>
                      <div><i className="fas fa-check-circle mr-1"></i> Systemic solution implemented</div>
                    </div>
                  </div>
                  
                  <div className="border border-[var(--cyber-green)] border-opacity-30 p-4 rounded-lg">
                    <h4 className="font-rajdhani text-[var(--cyber-green)] mb-2">Solar Grid Optimization</h4>
                    <p className="text-sm mb-3">Reported power fluctuations were correlated with weather patterns, leading to AI-driven predictive maintenance and battery management improvements.</p>
                    <div className="text-xs text-gray-400">
                      <div className="mb-1"><i className="fas fa-exclamation-circle mr-1"></i> 12 energy reliability issues</div>
                      <div><i className="fas fa-check-circle mr-1"></i> 92% reduction in outages</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <CyberButton onClick={() => alert("Issue reporting form will open")}>
                  <i className="fas fa-flag mr-2"></i> Report New Issue
                </CyberButton>
                <CyberButton variant="outline" onClick={() => alert("Issue status tracker will open")}>
                  <i className="fas fa-search mr-2"></i> Track Existing Issues
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