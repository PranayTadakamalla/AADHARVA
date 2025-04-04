import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SciFiCard } from "@/components/ui/sci-fi-card";
import { CyberButton } from "@/components/ui/cyber-button";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';

export default function EducationPage() {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample data for charts
  const enrollmentData = [
    { year: '2019', traditional: 65, digital: 20 },
    { year: '2020', traditional: 68, digital: 35 },
    { year: '2021', traditional: 60, digital: 50 },
    { year: '2022', traditional: 55, digital: 70 },
    { year: '2023', traditional: 50, digital: 85 },
    { year: '2024', traditional: 45, digital: 95 },
  ];

  const testScoreData = [
    { subject: 'Math', before: 55, after: 78 },
    { subject: 'Science', before: 60, after: 82 },
    { subject: 'Language', before: 65, after: 80 },
    { subject: 'History', before: 58, after: 75 },
    { subject: 'Tech Skills', before: 42, after: 85 },
  ];

  const accessData = [
    { name: 'Full Access', value: 45 },
    { name: 'Limited Access', value: 30 },
    { name: 'Mobile Only', value: 15 },
    { name: 'No Access', value: 10 },
  ];

  const COLORS = ['#0affff', '#10b981', '#7c3aed', '#f97316'];

  const teacherTrainingData = [
    { month: 'Jan', participants: 25 },
    { month: 'Feb', participants: 35 },
    { month: 'Mar', participants: 45 },
    { month: 'Apr', participants: 60 },
    { month: 'May', participants: 75 },
    { month: 'Jun', participants: 90 },
  ];

  return (
    <div className="bg-[var(--cyber-dark)] font-inter text-gray-100 min-h-screen overflow-x-hidden">
      <Header />
      <main className="container mx-auto py-8 px-4 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-rajdhani font-bold mb-2 text-[var(--cyber-purple)] glowing-text">Digital Education Hub</h1>
          <div className="cyber-line mb-8"></div>
          
          <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
            <CyberButton 
              variant={activeTab === "overview" ? "default" : "outline"} 
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </CyberButton>
            <CyberButton 
              variant={activeTab === "platforms" ? "default" : "outline"} 
              onClick={() => setActiveTab("platforms")}
            >
              Learning Platforms
            </CyberButton>
            <CyberButton 
              variant={activeTab === "teachers" ? "default" : "outline"} 
              onClick={() => setActiveTab("teachers")}
            >
              Teacher Development
            </CyberButton>
            <CyberButton 
              variant={activeTab === "community" ? "default" : "outline"} 
              onClick={() => setActiveTab("community")}
            >
              Community Engagement
            </CyberButton>
          </div>

          {activeTab === "overview" && (
            <SciFiCard>
              <h2 className="text-2xl font-rajdhani font-semibold text-[var(--cyber-purple)] mb-4">Rural Education Transformation</h2>
              <p className="mb-4">
                Our digital education initiatives leverage AI, satellite connectivity, and innovative teaching tools to bridge 
                the rural-urban education gap. By providing access to quality learning resources, teacher training, and 
                interactive content, we're enabling rural students to receive a modern, high-quality education regardless of location.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-purple)] mb-3">Enrollment Trends</h3>
                  <p className="mb-3">Traditional classroom vs. digital learning enrollment</p>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={enrollmentData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="year" stroke="rgba(255,255,255,0.7)" />
                        <YAxis stroke="rgba(255,255,255,0.7)" />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#7c3aed' }} />
                        <Legend />
                        <Area type="monotone" dataKey="traditional" stroke="#0affff" fill="rgba(10, 255, 255, 0.2)" />
                        <Area type="monotone" dataKey="digital" stroke="#7c3aed" fill="rgba(124, 58, 237, 0.2)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-purple)] mb-3">Test Score Improvement</h3>
                  <p className="mb-3">Before and after AI-enhanced learning programs</p>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={testScoreData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis type="number" stroke="rgba(255,255,255,0.7)" />
                        <YAxis dataKey="subject" type="category" stroke="rgba(255,255,255,0.7)" />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#7c3aed' }} />
                        <Legend />
                        <Bar dataKey="before" name="Before" fill="#0affff" />
                        <Bar dataKey="after" name="After" fill="#7c3aed" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-[var(--cyber-blue)] p-4 rounded-lg">
                <h3 className="text-xl font-rajdhani text-[var(--cyber-purple)] mb-3">Digital Access Distribution</h3>
                <p className="mb-3">Current level of access to digital education resources</p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={accessData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {accessData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#7c3aed' }} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-4">
                <CyberButton onClick={() => window.location.href = '/education/resources'}>
                  <i className="fas fa-book mr-2"></i> Learning Resources
                </CyberButton>
                <CyberButton variant="outline" onClick={() => window.location.href = '/education/report'}>
                  <i className="fas fa-file-alt mr-2"></i> Generate Impact Report
                </CyberButton>
              </div>
            </SciFiCard>
          )}

          {activeTab === "platforms" && (
            <SciFiCard>
              <h2 className="text-2xl font-rajdhani font-semibold text-[var(--cyber-purple)] mb-4">Digital Learning Platforms</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Active Students</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-purple)] mb-1">2,540</div>
                  <div className="text-sm text-gray-300">+420 since last quarter</div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Digital Lessons</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-cyan)] mb-1">12,350</div>
                  <div className="text-sm text-gray-300">+1,200 new lessons created</div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Completion Rate</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-green)] mb-1">78%</div>
                  <div className="text-sm text-gray-300">+12% from previous system</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg border border-[var(--cyber-purple)] border-opacity-30">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[var(--cyber-purple)] bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
                      <i className="fas fa-laptop text-[var(--cyber-purple)] text-2xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-rajdhani text-[var(--cyber-purple)]">AI Learning Assistant</h3>
                      <p className="text-sm">Personalized learning companion</p>
                    </div>
                  </div>
                  <p className="mb-4">AI-powered learning assistant that adapts to each student's pace, learning style, and areas of difficulty. Provides real-time feedback and personalized curriculum.</p>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Student Adoption</span>
                    <span>85%</span>
                  </div>
                  <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--cyber-purple)]" style={{ width: "85%" }}></div>
                  </div>
                  <button 
                    className="mt-4 text-[var(--cyber-purple)] hover:underline text-sm flex items-center"
                    onClick={() => alert("Platform details will be displayed")}
                  >
                    View platform details <i className="fas fa-chevron-right ml-1"></i>
                  </button>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg border border-[var(--cyber-purple)] border-opacity-30">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[var(--cyber-cyan)] bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
                      <i className="fas fa-vr-cardboard text-[var(--cyber-cyan)] text-2xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-rajdhani text-[var(--cyber-cyan)]">Virtual Classroom</h3>
                      <p className="text-sm">Immersive learning experiences</p>
                    </div>
                  </div>
                  <p className="mb-4">Low-bandwidth virtual reality and augmented reality learning environments that bring abstract concepts to life through interactive 3D visualizations.</p>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Implementation Rate</span>
                    <span>62%</span>
                  </div>
                  <div className="h-2 w-full bg-[var(--cyber-dark)] rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--cyber-cyan)]" style={{ width: "62%" }}></div>
                  </div>
                  <button 
                    className="mt-4 text-[var(--cyber-cyan)] hover:underline text-sm flex items-center"
                    onClick={() => alert("Platform details will be displayed")}
                  >
                    View platform details <i className="fas fa-chevron-right ml-1"></i>
                  </button>
                </div>
              </div>
              
              <div className="bg-[var(--cyber-blue)] p-4 rounded-lg mb-6">
                <h3 className="text-xl font-rajdhani text-[var(--cyber-purple)] mb-3">Key Platform Features</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border border-[var(--cyber-purple)] border-opacity-20 p-3 rounded-lg">
                    <div className="flex items-center mb-2">
                      <i className="fas fa-signal text-[var(--cyber-purple)] mr-2"></i>
                      <h4 className="font-rajdhani">Offline Capability</h4>
                    </div>
                    <p className="text-sm">Content syncs when connectivity is available, but remains fully functional offline.</p>
                  </div>
                  
                  <div className="border border-[var(--cyber-purple)] border-opacity-20 p-3 rounded-lg">
                    <div className="flex items-center mb-2">
                      <i className="fas fa-language text-[var(--cyber-purple)] mr-2"></i>
                      <h4 className="font-rajdhani">Multilingual Support</h4>
                    </div>
                    <p className="text-sm">Content available in 12 local languages and dialects with voice recognition.</p>
                  </div>
                  
                  <div className="border border-[var(--cyber-purple)] border-opacity-20 p-3 rounded-lg">
                    <div className="flex items-center mb-2">
                      <i className="fas fa-chart-line text-[var(--cyber-purple)] mr-2"></i>
                      <h4 className="font-rajdhani">Learning Analytics</h4>
                    </div>
                    <p className="text-sm">In-depth progress tracking and performance analysis for teachers and students.</p>
                  </div>
                  
                  <div className="border border-[var(--cyber-purple)] border-opacity-20 p-3 rounded-lg">
                    <div className="flex items-center mb-2">
                      <i className="fas fa-solar-panel text-[var(--cyber-purple)] mr-2"></i>
                      <h4 className="font-rajdhani">Solar-Powered</h4>
                    </div>
                    <p className="text-sm">Optimized for low-power devices with solar charging capability built in.</p>
                  </div>
                  
                  <div className="border border-[var(--cyber-purple)] border-opacity-20 p-3 rounded-lg">
                    <div className="flex items-center mb-2">
                      <i className="fas fa-users text-[var(--cyber-purple)] mr-2"></i>
                      <h4 className="font-rajdhani">Community Hub</h4>
                    </div>
                    <p className="text-sm">Connects students across villages for collaborative projects and peer learning.</p>
                  </div>
                  
                  <div className="border border-[var(--cyber-purple)] border-opacity-20 p-3 rounded-lg">
                    <div className="flex items-center mb-2">
                      <i className="fas fa-gamepad text-[var(--cyber-purple)] mr-2"></i>
                      <h4 className="font-rajdhani">Gamified Learning</h4>
                    </div>
                    <p className="text-sm">Educational content delivered through engaging game-based challenges.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <CyberButton onClick={() => alert("Demo of the platform will be displayed")}>
                  <i className="fas fa-play-circle mr-2"></i> Platform Demo
                </CyberButton>
                <CyberButton variant="outline" onClick={() => alert("Implementation guide will be displayed")}>
                  <i className="fas fa-download mr-2"></i> Implementation Guide
                </CyberButton>
              </div>
            </SciFiCard>
          )}

          {activeTab === "teachers" && (
            <SciFiCard>
              <h2 className="text-2xl font-rajdhani font-semibold text-[var(--cyber-purple)] mb-4">Teacher Development Program</h2>
              
              <div className="bg-[var(--cyber-blue)] p-4 rounded-lg mb-6">
                <h3 className="text-xl font-rajdhani text-[var(--cyber-purple)] mb-3">Teacher Training Progress</h3>
                <p className="mb-3">Monthly participation in digital skills training programs</p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={teacherTrainingData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="month" stroke="rgba(255,255,255,0.7)" />
                      <YAxis stroke="rgba(255,255,255,0.7)" />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#7c3aed' }} />
                      <Line type="monotone" dataKey="participants" stroke="#7c3aed" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg border border-[var(--cyber-purple)] border-opacity-30">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-purple)] mb-3">Active Training Modules</h3>
                  
                  <div className="space-y-4">
                    <div className="border border-[var(--cyber-purple)] border-opacity-20 p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-rajdhani text-[var(--cyber-cyan)]">Digital Pedagogy Fundamentals</h4>
                        <span className="px-2 py-1 bg-[var(--cyber-green)] bg-opacity-20 text-[var(--cyber-green)] rounded text-xs">POPULAR</span>
                      </div>
                      <p className="text-sm mb-2">Core principles for effective digital teaching and learning facilitation.</p>
                      <div className="flex justify-between text-xs">
                        <span>142 teachers enrolled</span>
                        <span>4.8/5 rating</span>
                      </div>
                    </div>
                    
                    <div className="border border-[var(--cyber-purple)] border-opacity-20 p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-rajdhani text-[var(--cyber-cyan)]">Content Creation Workshop</h4>
                        <span className="px-2 py-1 bg-[var(--cyber-cyan)] bg-opacity-20 text-[var(--cyber-cyan)] rounded text-xs">NEW</span>
                      </div>
                      <p className="text-sm mb-2">Tools and techniques for creating engaging digital learning materials.</p>
                      <div className="flex justify-between text-xs">
                        <span>96 teachers enrolled</span>
                        <span>4.6/5 rating</span>
                      </div>
                    </div>
                    
                    <div className="border border-[var(--cyber-purple)] border-opacity-20 p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-rajdhani text-[var(--cyber-cyan)]">Assessment Strategies</h4>
                        <span className="px-2 py-1 bg-[var(--cyber-purple)] bg-opacity-20 text-[var(--cyber-purple)] rounded text-xs">ADVANCED</span>
                      </div>
                      <p className="text-sm mb-2">Digital methods for effective student assessment and feedback.</p>
                      <div className="flex justify-between text-xs">
                        <span>78 teachers enrolled</span>
                        <span>4.7/5 rating</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg border border-[var(--cyber-purple)] border-opacity-30">
                  <h3 className="text-xl font-rajdhani text-[var(--cyber-purple)] mb-3">Teacher Success Stories</h3>
                  
                  <div className="space-y-4">
                    <div className="p-3 border-l-4 border-[var(--cyber-cyan)]">
                      <p className="italic text-sm mb-2">"The AI teaching assistant has transformed my classroom. I can now provide personalized attention to each student, even with 40 students in my class."</p>
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold">Priya M., Mathematics Teacher</span>
                        <span>Eastern District</span>
                      </div>
                    </div>
                    
                    <div className="p-3 border-l-4 border-[var(--cyber-green)]">
                      <p className="italic text-sm mb-2">"My students' engagement has improved dramatically since implementing the gamified learning modules. Attendance is up 35% and test scores have improved across the board."</p>
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold">Rajesh K., Science Teacher</span>
                        <span>Northern District</span>
                      </div>
                    </div>
                    
                    <div className="p-3 border-l-4 border-[var(--cyber-purple)]">
                      <p className="italic text-sm mb-2">"The VR science labs have brought complex concepts to life. Students who struggled with abstract concepts are now excelling because they can visualize what they're learning."</p>
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold">Amina S., Biology Teacher</span>
                        <span>Southern District</span>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    className="mt-4 text-[var(--cyber-purple)] hover:underline text-sm flex items-center"
                    onClick={() => alert("More success stories will be displayed")}
                  >
                    View more success stories <i className="fas fa-chevron-right ml-1"></i>
                  </button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <CyberButton onClick={() => alert("Training enrollment form will be displayed")}>
                  <i className="fas fa-chalkboard-teacher mr-2"></i> Enroll in Training
                </CyberButton>
                <CyberButton variant="outline" onClick={() => alert("Resource library will be displayed")}>
                  <i className="fas fa-books mr-2"></i> Teacher Resource Library
                </CyberButton>
              </div>
            </SciFiCard>
          )}

          {activeTab === "community" && (
            <SciFiCard>
              <h2 className="text-2xl font-rajdhani font-semibold text-[var(--cyber-purple)] mb-4">Community Engagement</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Parent Participation</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-cyan)] mb-1">72%</div>
                  <div className="text-sm text-gray-300">+15% from baseline</div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Community Centers</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-green)] mb-1">24</div>
                  <div className="text-sm text-gray-300">Across 18 villages</div>
                </div>
                
                <div className="bg-[var(--cyber-blue)] p-4 rounded-lg">
                  <h3 className="text-lg font-rajdhani text-white mb-2">Adult Learners</h3>
                  <div className="text-4xl font-rajdhani text-[var(--cyber-purple)] mb-1">860</div>
                  <div className="text-sm text-gray-300">+210 in last quarter</div>
                </div>
              </div>
              
              <div className="bg-[var(--cyber-blue)] p-4 rounded-lg mb-6">
                <h3 className="text-xl font-rajdhani text-[var(--cyber-purple)] mb-3">Active Community Initiatives</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-[var(--cyber-purple)] border-opacity-30 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-[var(--cyber-cyan)] bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                        <i className="fas fa-users-class text-[var(--cyber-cyan)]"></i>
                      </div>
                      <h4 className="font-rajdhani text-[var(--cyber-cyan)]">Digital Literacy Workshops</h4>
                    </div>
                    <p className="text-sm mb-3">Weekend workshops teaching essential digital skills to parents and community members.</p>
                    <div className="flex justify-between text-xs">
                      <span>Participants: 245</span>
                      <span>Villages: 8</span>
                    </div>
                    <div className="mt-3 text-xs">
                      <span className="px-2 py-1 bg-[var(--cyber-green)] bg-opacity-20 text-[var(--cyber-green)] rounded mr-2">Weekly</span>
                      <span className="px-2 py-1 bg-[var(--cyber-cyan)] bg-opacity-20 text-[var(--cyber-cyan)] rounded">Hands-on</span>
                    </div>
                  </div>
                  
                  <div className="border border-[var(--cyber-purple)] border-opacity-30 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-[var(--cyber-green)] bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                        <i className="fas fa-wifi text-[var(--cyber-green)]"></i>
                      </div>
                      <h4 className="font-rajdhani text-[var(--cyber-green)]">Community WiFi Hubs</h4>
                    </div>
                    <p className="text-sm mb-3">Solar-powered internet access points established in central village locations.</p>
                    <div className="flex justify-between text-xs">
                      <span>Active Hubs: 18</span>
                      <span>Daily Users: ~320</span>
                    </div>
                    <div className="mt-3 text-xs">
                      <span className="px-2 py-1 bg-[var(--cyber-green)] bg-opacity-20 text-[var(--cyber-green)] rounded mr-2">24/7 Access</span>
                      <span className="px-2 py-1 bg-[var(--cyber-cyan)] bg-opacity-20 text-[var(--cyber-cyan)] rounded">Content Filtered</span>
                    </div>
                  </div>
                  
                  <div className="border border-[var(--cyber-purple)] border-opacity-30 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-[var(--cyber-purple)] bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                        <i className="fas fa-graduation-cap text-[var(--cyber-purple)]"></i>
                      </div>
                      <h4 className="font-rajdhani text-[var(--cyber-purple)]">Adult Education Program</h4>
                    </div>
                    <p className="text-sm mb-3">Evening classes for adults focusing on vocational and digital skills.</p>
                    <div className="flex justify-between text-xs">
                      <span>Courses: 12</span>
                      <span>Completion Rate: 68%</span>
                    </div>
                    <div className="mt-3 text-xs">
                      <span className="px-2 py-1 bg-[var(--cyber-purple)] bg-opacity-20 text-[var(--cyber-purple)] rounded mr-2">Certificate</span>
                      <span className="px-2 py-1 bg-[var(--cyber-green)] bg-opacity-20 text-[var(--cyber-green)] rounded">Job-Focused</span>
                    </div>
                  </div>
                  
                  <div className="border border-[var(--cyber-purple)] border-opacity-30 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-[var(--cyber-orange)] bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                        <i className="fas fa-calendar-alt text-[var(--cyber-orange)]"></i>
                      </div>
                      <h4 className="font-rajdhani text-[var(--cyber-orange)]">Tech Festival</h4>
                    </div>
                    <p className="text-sm mb-3">Quarterly technology showcase featuring student projects and new educational tools.</p>
                    <div className="flex justify-between text-xs">
                      <span>Next Event: June 15</span>
                      <span>Expected Attendance: 500+</span>
                    </div>
                    <div className="mt-3 text-xs">
                      <span className="px-2 py-1 bg-[var(--cyber-orange)] bg-opacity-20 text-[var(--cyber-orange)] rounded mr-2">Quarterly</span>
                      <span className="px-2 py-1 bg-[var(--cyber-purple)] bg-opacity-20 text-[var(--cyber-purple)] rounded">Interactive</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <CyberButton onClick={() => alert("Community initiative proposal form will be displayed")}>
                  <i className="fas fa-lightbulb mr-2"></i> Propose Initiative
                </CyberButton>
                <CyberButton variant="outline" onClick={() => alert("Community events calendar will be displayed")}>
                  <i className="fas fa-calendar mr-2"></i> Community Calendar
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