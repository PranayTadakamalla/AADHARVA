import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SciFiCard } from "@/components/ui/sci-fi-card";
import { CyberButton } from "@/components/ui/cyber-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

export default function ImpactDashboardPage() {
  const [region, setRegion] = useState<string>("all");
  const [timeframe, setTimeframe] = useState<string>("1year");

  // Sample data for the visualizations - would come from API in production
  const overallImpactData = [
    { name: "Jan", beneficiaries: 5000, projects: 12, investment: 250000 },
    { name: "Feb", beneficiaries: 5800, projects: 15, investment: 320000 },
    { name: "Mar", beneficiaries: 6200, projects: 18, investment: 380000 },
    { name: "Apr", beneficiaries: 8000, projects: 22, investment: 450000 },
    { name: "May", beneficiaries: 10000, projects: 25, investment: 520000 },
    { name: "Jun", beneficiaries: 12000, projects: 28, investment: 580000 }
  ];

  const sectoralImpactData = [
    { name: "Water", value: 25, color: "#00C8FF" },
    { name: "Agriculture", value: 20, color: "#4CAF50" },
    { name: "Education", value: 15, color: "#FFC107" },
    { name: "Healthcare", value: 15, color: "#F44336" },
    { name: "Energy", value: 10, color: "#FF9800" },
    { name: "Connectivity", value: 10, color: "#9C27B0" },
    { name: "Governance", value: 5, color: "#3F51B5" }
  ];

  const sustainabilityData = [
    { name: "2019", carbon: 350, biodiversity: 65 },
    { name: "2020", carbon: 320, biodiversity: 68 },
    { name: "2021", carbon: 290, biodiversity: 72 },
    { name: "2022", carbon: 250, biodiversity: 78 },
    { name: "2023", carbon: 210, biodiversity: 82 },
    { name: "2024", carbon: 180, biodiversity: 88 }
  ];

  const communityEngagementData = [
    { name: "Q1", workshops: 15, participation: 450, adoption: 65 },
    { name: "Q2", workshops: 22, participation: 620, adoption: 72 },
    { name: "Q3", workshops: 28, participation: 780, adoption: 78 },
    { name: "Q4", workshops: 35, participation: 950, adoption: 85 }
  ];

  const econometricData = [
    { name: "Initial", income: 100, employment: 100, business: 100 },
    { name: "Year 1", income: 118, employment: 112, business: 108 },
    { name: "Year 2", income: 135, employment: 125, business: 122 },
    { name: "Year 3", income: 162, employment: 140, business: 145 },
    { name: "Year 4", income: 188, employment: 160, business: 170 },
    { name: "Year 5", income: 215, employment: 185, business: 200 }
  ];

  const keyMetrics = [
    { title: "Lives Improved", value: "26,450", change: "+12%", trend: "up" },
    { title: "Communities Served", value: "78", change: "+8%", trend: "up" },
    { title: "Water Sources Created", value: "145", change: "+15%", trend: "up" },
    { title: "Agricultural Yield Increase", value: "23%", change: "+5%", trend: "up" },
    { title: "Student Enrollment", value: "9,280", change: "+18%", trend: "up" },
    { title: "Telemedicine Consultations", value: "12,650", change: "+22%", trend: "up" }
  ];

  return (
    <div className="bg-[var(--cyber-dark)] font-inter text-gray-100 min-h-screen overflow-x-hidden">
      <Header />
      <main className="container mx-auto py-8 px-4 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-cyan-400 glitch-text">
            Community Impact Dashboard
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Visualize the real-world impact of our rural development initiatives across communities. Track progress, monitor sustainability metrics, and analyze economic growth indicators.
          </p>
        </div>

        {/* Dashboard Controls */}
        <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-64">
              <label className="block text-sm font-medium text-gray-400 mb-1">Region</label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className="w-full bg-black/50 border-cyan-500/30">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="north">Northern Region</SelectItem>
                  <SelectItem value="south">Southern Region</SelectItem>
                  <SelectItem value="east">Eastern Region</SelectItem>
                  <SelectItem value="west">Western Region</SelectItem>
                  <SelectItem value="central">Central Region</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full sm:w-64">
              <label className="block text-sm font-medium text-gray-400 mb-1">Time Period</label>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-full bg-black/50 border-cyan-500/30">
                  <SelectValue placeholder="Select time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                  <SelectItem value="3years">Last 3 Years</SelectItem>
                  <SelectItem value="5years">Last 5 Years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <CyberButton variant="solid" size="sm">
              <i className="fas fa-download mr-2"></i> Export Report
            </CyberButton>
            <CyberButton variant="secondary" size="sm">
              <i className="fas fa-share-alt mr-2"></i> Share
            </CyberButton>
          </div>
        </div>

        {/* Key Metrics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {keyMetrics.map((metric, index) => (
            <SciFiCard key={index} className="p-4 bg-black/30 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm text-gray-400 font-medium">{metric.title}</h3>
                <div className={`text-xs ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'} flex items-center`}>
                  <span className="mr-1">{metric.change}</span>
                  <i className={`fas fa-arrow-${metric.trend === 'up' ? 'up' : 'down'}`}></i>
                </div>
              </div>
              <p className="text-2xl font-bold text-cyan-300">{metric.value}</p>
            </SciFiCard>
          ))}
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="w-full bg-black/40 border-b border-cyan-500/30 mb-6">
            <TabsTrigger value="overview" className="data-[state=active]:text-cyan-400">Overall Impact</TabsTrigger>
            <TabsTrigger value="sectoral" className="data-[state=active]:text-cyan-400">Sectoral Analysis</TabsTrigger>
            <TabsTrigger value="sustainability" className="data-[state=active]:text-cyan-400">Sustainability</TabsTrigger>
            <TabsTrigger value="engagement" className="data-[state=active]:text-cyan-400">Community Engagement</TabsTrigger>
            <TabsTrigger value="economic" className="data-[state=active]:text-cyan-400">Economic Impact</TabsTrigger>
          </TabsList>

          {/* Overall Impact Tab Content */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SciFiCard className="p-4 bg-black/30 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-cyan-400 mb-4">Beneficiaries Reached</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={overallImpactData}>
                      <defs>
                        <linearGradient id="colorBeneficiaries" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00C8FF" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#00C8FF" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="name" stroke="#aaa" />
                      <YAxis stroke="#aaa" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "rgba(0, 0, 0, 0.8)", 
                          borderColor: "#00C8FF",
                          color: "#fff" 
                        }} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="beneficiaries" 
                        stroke="#00C8FF" 
                        fillOpacity={1} 
                        fill="url(#colorBeneficiaries)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </SciFiCard>

              <SciFiCard className="p-4 bg-black/30 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-cyan-400 mb-4">Project Implementation & Investment</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={overallImpactData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="name" stroke="#aaa" />
                      <YAxis yAxisId="left" stroke="#00C8FF" />
                      <YAxis yAxisId="right" orientation="right" stroke="#7C3AED" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "rgba(0, 0, 0, 0.8)", 
                          borderColor: "#00C8FF",
                          color: "#fff" 
                        }} 
                      />
                      <Legend />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="projects" 
                        stroke="#00C8FF" 
                        activeDot={{ r: 8 }}
                        name="Projects Implemented" 
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="investment" 
                        stroke="#7C3AED" 
                        name="Investment (USD)" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </SciFiCard>
            </div>
          </TabsContent>

          {/* Sectoral Analysis Tab Content */}
          <TabsContent value="sectoral">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SciFiCard className="p-4 bg-black/30 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-cyan-400 mb-4">Budget Allocation by Sector</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sectoralImpactData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                        label={(entry) => entry.name}
                      >
                        {sectoralImpactData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "rgba(0, 0, 0, 0.8)", 
                          borderColor: "#00C8FF",
                          color: "#fff" 
                        }}
                        formatter={(value) => [`${value}%`, 'Allocation']} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </SciFiCard>

              <SciFiCard className="p-4 bg-black/30 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-cyan-400 mb-4">Impact Comparison by Sector</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sectoralImpactData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="name" stroke="#aaa" />
                      <YAxis stroke="#aaa" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "rgba(0, 0, 0, 0.8)", 
                          borderColor: "#00C8FF",
                          color: "#fff" 
                        }} 
                        formatter={(value) => [`${value}%`, 'Impact Score']}
                      />
                      <Bar dataKey="value" name="Impact Score">
                        {sectoralImpactData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </SciFiCard>
            </div>
          </TabsContent>

          {/* Sustainability Tab Content */}
          <TabsContent value="sustainability">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SciFiCard className="p-4 bg-black/30 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-cyan-400 mb-4">Carbon Footprint Reduction</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={sustainabilityData}>
                      <defs>
                        <linearGradient id="colorCarbon" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#4CAF50" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="name" stroke="#aaa" />
                      <YAxis stroke="#aaa" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "rgba(0, 0, 0, 0.8)", 
                          borderColor: "#00C8FF",
                          color: "#fff" 
                        }}
                        formatter={(value) => [`${value} tons`, 'Carbon Emissions']} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="carbon" 
                        stroke="#4CAF50" 
                        fillOpacity={1} 
                        fill="url(#colorCarbon)" 
                        name="Carbon Emissions (tons)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </SciFiCard>

              <SciFiCard className="p-4 bg-black/30 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-cyan-400 mb-4">Biodiversity Index Improvement</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sustainabilityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="name" stroke="#aaa" />
                      <YAxis stroke="#aaa" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "rgba(0, 0, 0, 0.8)", 
                          borderColor: "#00C8FF",
                          color: "#fff" 
                        }}
                        formatter={(value) => [`${value}/100`, 'Biodiversity Index']} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="biodiversity" 
                        stroke="#FFC107" 
                        activeDot={{ r: 8 }}
                        name="Biodiversity Index (0-100)" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </SciFiCard>
            </div>
          </TabsContent>
          
          {/* Community Engagement Tab Content */}
          <TabsContent value="engagement">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SciFiCard className="p-4 bg-black/30 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-cyan-400 mb-4">Workshop Participation</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={communityEngagementData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="name" stroke="#aaa" />
                      <YAxis stroke="#aaa" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "rgba(0, 0, 0, 0.8)", 
                          borderColor: "#00C8FF",
                          color: "#fff" 
                        }} 
                      />
                      <Legend />
                      <Bar dataKey="workshops" fill="#00C8FF" name="Training Workshops" />
                      <Bar dataKey="participation" fill="#7C3AED" name="Participants" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </SciFiCard>

              <SciFiCard className="p-4 bg-black/30 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-cyan-400 mb-4">Technology Adoption Rate</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={communityEngagementData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="name" stroke="#aaa" />
                      <YAxis stroke="#aaa" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "rgba(0, 0, 0, 0.8)", 
                          borderColor: "#00C8FF",
                          color: "#fff" 
                        }}
                        formatter={(value) => [`${value}%`, 'Adoption Rate']} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="adoption" 
                        stroke="#FF9800" 
                        activeDot={{ r: 8 }}
                        name="Technology Adoption Rate (%)" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </SciFiCard>
            </div>
          </TabsContent>

          {/* Economic Impact Tab Content */}
          <TabsContent value="economic">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SciFiCard className="p-4 bg-black/30 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-cyan-400 mb-4">Income & Livelihood Growth (Indexed)</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={econometricData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="name" stroke="#aaa" />
                      <YAxis stroke="#aaa" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "rgba(0, 0, 0, 0.8)", 
                          borderColor: "#00C8FF",
                          color: "#fff" 
                        }} 
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="income" 
                        stroke="#00C8FF" 
                        activeDot={{ r: 8 }}
                        name="Household Income" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="employment" 
                        stroke="#7C3AED" 
                        name="Employment Rate" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="business" 
                        stroke="#4CAF50" 
                        name="Local Businesses" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </SciFiCard>

              <SciFiCard className="p-4 bg-black/30 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-cyan-400 mb-4">Return on Investment Analysis</h3>
                <div className="h-[300px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-block rounded-full w-48 h-48 border-8 border-[var(--cyber-cyan)] relative mb-6">
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-4xl font-bold text-cyan-300">415%</span>
                        <span className="text-sm text-gray-400">5-Year Social ROI</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="bg-black/40 p-3 rounded-lg">
                        <p className="text-lg font-bold text-cyan-300">2.4x</p>
                        <p className="text-xs text-gray-400">Economic Multiplier</p>
                      </div>
                      <div className="bg-black/40 p-3 rounded-lg">
                        <p className="text-lg font-bold text-cyan-300">₹42M</p>
                        <p className="text-xs text-gray-400">Economic Value Added</p>
                      </div>
                      <div className="bg-black/40 p-3 rounded-lg">
                        <p className="text-lg font-bold text-cyan-300">3.2yrs</p>
                        <p className="text-xs text-gray-400">Breakeven Time</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SciFiCard>
            </div>
          </TabsContent>
        </Tabs>

        {/* Featured Impact Stories */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <h2 className="font-rajdhani uppercase text-2xl font-bold text-[var(--cyber-cyan)] tracking-wider">
              Featured Impact Stories
            </h2>
            <div className="cyber-line flex-grow ml-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SciFiCard className="p-4 bg-black/30 backdrop-blur-sm">
              <div className="cyber-gradient-border h-40 mb-4 flex items-center justify-center bg-black/50 overflow-hidden">
                <i className="fas fa-hands-holding-water text-5xl text-cyan-400"></i>
              </div>
              <h3 className="text-lg font-bold text-cyan-400 mb-2">Clean Water for Nilambur Village</h3>
              <p className="text-sm text-gray-300 mb-4">
                Our water filtration system installation has provided 1,200 residents with clean drinking water, reducing waterborne illnesses by 78%.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">Kerala, South India</span>
                <CyberButton variant="outline" size="sm">Read More</CyberButton>
              </div>
            </SciFiCard>

            <SciFiCard className="p-4 bg-black/30 backdrop-blur-sm">
              <div className="cyber-gradient-border h-40 mb-4 flex items-center justify-center bg-black/50 overflow-hidden">
                <i className="fas fa-seedling text-5xl text-green-400"></i>
              </div>
              <h3 className="text-lg font-bold text-cyan-400 mb-2">Sustainable Farming in Ajmer</h3>
              <p className="text-sm text-gray-300 mb-4">
                AI-powered crop management has increased yields by 32% while reducing water usage by 45% for 85 smallholder farmers.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">Rajasthan, West India</span>
                <CyberButton variant="outline" size="sm">Read More</CyberButton>
              </div>
            </SciFiCard>

            <SciFiCard className="p-4 bg-black/30 backdrop-blur-sm">
              <div className="cyber-gradient-border h-40 mb-4 flex items-center justify-center bg-black/50 overflow-hidden">
                <i className="fas fa-solar-panel text-5xl text-yellow-400"></i>
              </div>
              <h3 className="text-lg font-bold text-cyan-400 mb-2">Microgrids in Koraput District</h3>
              <p className="text-sm text-gray-300 mb-4">
                Solar-powered microgrids now provide 24/7 electricity to 5 villages, enabling evening education and extending productive hours.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">Odisha, East India</span>
                <CyberButton variant="outline" size="sm">Read More</CyberButton>
              </div>
            </SciFiCard>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}