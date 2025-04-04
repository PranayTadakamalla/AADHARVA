import React from "react";
import { SciFiCard } from "@/components/ui/sci-fi-card";
import { CyberButton } from "@/components/ui/cyber-button";

export default function SolutionsGrid() {
  return (
    <section id="solutions" className="mb-12">
      <div className="flex items-center mb-6">
        <h2 className="font-rajdhani uppercase text-2xl font-bold text-[var(--cyber-cyan)] tracking-wider">AI Solutions</h2>
        <div className="cyber-line flex-grow ml-4"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Water Solution */}
        <WaterSolution />
        
        {/* Agriculture Solution */}
        <AgricultureSolution />
        
        {/* Education Solution */}
        <EducationSolution />
        
        {/* Health Solution */}
        <HealthSolution />
      </div>
    </section>
  );
}

function WaterSolution() {
  return (
    <div className="rounded-lg overflow-hidden bg-[var(--cyber-blue)]/75 backdrop-filter backdrop-blur-md border border-[var(--cyber-cyan)]/30 shadow-[0_0_10px_rgba(10,255,255,0.3)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(10,255,255,0.5),0_0_30px_rgba(10,255,255,0.3)]">
      <div className="bg-gradient-to-r from-[var(--cyber-blue)] to-[var(--cyber-dark)] p-6 border-b border-[var(--cyber-cyan)]/30">
        <div className="flex items-center mb-4">
          <div className="h-10 w-10 rounded-full bg-[var(--cyber-cyan)]/20 flex items-center justify-center mr-4">
            <i className="fas fa-tint text-[var(--cyber-cyan)]"></i>
          </div>
          <h3 className="font-rajdhani text-xl font-bold text-[var(--cyber-cyan)]">Water Quality Monitoring</h3>
        </div>
        <div className="cyber-line my-4"></div>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-gray-300 text-sm font-medium">CONTAMINATION LEVELS</h4>
            <span className="text-xs bg-[var(--cyber-cyan)]/10 text-[var(--cyber-cyan)] px-2 py-1 rounded">REAL-TIME</span>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-4">
            <SciFiCard className="p-3 text-center">
              <div className="text-xs text-gray-400">pH LEVEL</div>
              <div className="text-[var(--cyber-cyan)] text-xl font-rajdhani font-bold">7.2</div>
              <div className="text-xs text-[var(--cyber-green)]">SAFE</div>
            </SciFiCard>
            <SciFiCard className="p-3 text-center">
              <div className="text-xs text-gray-400">TURBIDITY</div>
              <div className="text-[var(--cyber-orange)] text-xl font-rajdhani font-bold">4.8</div>
              <div className="text-xs text-[var(--cyber-orange)]">MODERATE</div>
            </SciFiCard>
            <SciFiCard className="p-3 text-center">
              <div className="text-xs text-gray-400">BACTERIA</div>
              <div className="text-[var(--cyber-cyan)] text-xl font-rajdhani font-bold">0.3</div>
              <div className="text-xs text-[var(--cyber-green)]">SAFE</div>
            </SciFiCard>
            <SciFiCard className="p-3 text-center">
              <div className="text-xs text-gray-400">CHLORINE</div>
              <div className="text-[var(--cyber-cyan)] text-xl font-rajdhani font-bold">1.1</div>
              <div className="text-xs text-[var(--cyber-green)]">SAFE</div>
            </SciFiCard>
          </div>

          <div className="flex justify-between items-center bg-[var(--cyber-blue)]/30 p-3 rounded-lg">
            <div>
              <div className="text-sm font-medium">AI Predictive Analysis</div>
              <div className="text-xs text-gray-400">Next maintenance in 14 days</div>
            </div>
            <div className="text-[var(--cyber-cyan)]">
              <i className="fas fa-check-circle mr-1"></i>
              Optimal
            </div>
          </div>
        </div>

        <CyberButton className="w-full justify-center" size="sm">
          <i className="fas fa-eye mr-2"></i>
          VIEW DETAILED REPORT
        </CyberButton>
      </div>
    </div>
  );
}

function AgricultureSolution() {
  return (
    <div className="rounded-lg overflow-hidden bg-[var(--cyber-blue)]/75 backdrop-filter backdrop-blur-md border border-[var(--cyber-orange)]/30 shadow-[0_0_10px_rgba(249,115,22,0.3)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(249,115,22,0.5),0_0_30px_rgba(249,115,22,0.3)]">
      <div className="bg-gradient-to-r from-[var(--cyber-blue)] to-[var(--cyber-dark)] p-6 border-b border-[var(--cyber-orange)]/30">
        <div className="flex items-center mb-4">
          <div className="h-10 w-10 rounded-full bg-[var(--cyber-orange)]/20 flex items-center justify-center mr-4">
            <i className="fas fa-seedling text-[var(--cyber-orange)]"></i>
          </div>
          <h3 className="font-rajdhani text-xl font-bold text-[var(--cyber-orange)]">Crop Yield Prediction</h3>
        </div>
        <div className="cyber-line my-4" style={{ background: "linear-gradient(90deg, transparent, rgba(249, 115, 22, 0.7), transparent)" }}></div>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-gray-300 text-sm font-medium">SEASONAL FORECAST</h4>
            <span className="text-xs bg-[var(--cyber-orange)]/10 text-[var(--cyber-orange)] px-2 py-1 rounded">AI PREDICTION</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <SciFiCard variant="orange" className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm">Rice</div>
                <div className="text-[var(--cyber-green)] text-sm">+12% YoY</div>
              </div>
              <div className="bg-[var(--cyber-dark)] rounded-full h-2 overflow-hidden mb-2">
                <div className="cyber-progress w-[85%]" style={{ background: "linear-gradient(90deg, #10b981, #059669)" }}></div>
              </div>
              <div className="text-xs text-gray-400">Optimal planting: Jun 15 - Jul 10</div>
            </SciFiCard>

            <SciFiCard variant="orange" className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm">Wheat</div>
                <div className="text-[var(--cyber-orange)] text-sm">-3% YoY</div>
              </div>
              <div className="bg-[var(--cyber-dark)] rounded-full h-2 overflow-hidden mb-2">
                <div className="cyber-progress w-[68%]" style={{ background: "linear-gradient(90deg, #f97316, #ea580c)" }}></div>
              </div>
              <div className="text-xs text-gray-400">Optimal planting: Nov 1 - Nov 20</div>
            </SciFiCard>
          </div>

          <div className="flex justify-between items-center bg-[var(--cyber-blue)]/30 p-3 rounded-lg">
            <div>
              <div className="text-sm font-medium">Weather Alert</div>
              <div className="text-xs text-gray-400">Heavy rainfall expected in 5 days</div>
            </div>
            <div className="text-[var(--cyber-orange)]">
              <i className="fas fa-exclamation-triangle mr-1"></i>
              Action Required
            </div>
          </div>
        </div>

        <CyberButton variant="orange" className="w-full justify-center" size="sm">
          <i className="fas fa-chart-line mr-2"></i>
          VIEW MARKET FORECAST
        </CyberButton>
      </div>
    </div>
  );
}

function EducationSolution() {
  return (
    <div className="rounded-lg overflow-hidden bg-[var(--cyber-blue)]/75 backdrop-filter backdrop-blur-md border border-[var(--cyber-purple)]/30 shadow-[0_0_10px_rgba(124,58,237,0.3)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.5),0_0_30px_rgba(124,58,237,0.3)]">
      <div className="bg-gradient-to-r from-[var(--cyber-blue)] to-[var(--cyber-dark)] p-6 border-b border-[var(--cyber-purple)]/30">
        <div className="flex items-center mb-4">
          <div className="h-10 w-10 rounded-full bg-[var(--cyber-purple)]/20 flex items-center justify-center mr-4">
            <i className="fas fa-graduation-cap text-[var(--cyber-purple)]"></i>
          </div>
          <h3 className="font-rajdhani text-xl font-bold text-[var(--cyber-purple)]">Education Access Hub</h3>
        </div>
        <div className="cyber-line my-4" style={{ background: "linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.7), transparent)" }}></div>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-gray-300 text-sm font-medium">LEARNING ANALYTICS</h4>
            <span className="text-xs bg-[var(--cyber-purple)]/10 text-[var(--cyber-purple)] px-2 py-1 rounded">AI PERSONALIZED</span>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <SciFiCard variant="purple" className="p-3 text-center">
              <div className="text-xs text-gray-400">ENROLLED</div>
              <div className="text-[var(--cyber-purple)] text-xl font-rajdhani font-bold">825</div>
              <div className="text-xs text-[var(--cyber-green)]">+24%</div>
            </SciFiCard>
            <SciFiCard variant="purple" className="p-3 text-center">
              <div className="text-xs text-gray-400">COMPLETION</div>
              <div className="text-[var(--cyber-purple)] text-xl font-rajdhani font-bold">78%</div>
              <div className="text-xs text-[var(--cyber-green)]">+12%</div>
            </SciFiCard>
            <SciFiCard variant="purple" className="p-3 text-center">
              <div className="text-xs text-gray-400">RESOURCE</div>
              <div className="text-[var(--cyber-purple)] text-xl font-rajdhani font-bold">1.2K</div>
              <div className="text-xs text-[var(--cyber-green)]">+35%</div>
            </SciFiCard>
          </div>

          <SciFiCard variant="purple" className="p-3 mb-4">
            <div className="text-sm mb-2">Popular Learning Paths</div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[var(--cyber-blue)]/30 p-2 rounded-lg text-xs">
                <i className="fas fa-laptop-code text-[var(--cyber-purple)] mr-1"></i> Digital Literacy
              </div>
              <div className="bg-[var(--cyber-blue)]/30 p-2 rounded-lg text-xs">
                <i className="fas fa-calculator text-[var(--cyber-purple)] mr-1"></i> Mathematics
              </div>
              <div className="bg-[var(--cyber-blue)]/30 p-2 rounded-lg text-xs">
                <i className="fas fa-flask text-[var(--cyber-purple)] mr-1"></i> Science
              </div>
              <div className="bg-[var(--cyber-blue)]/30 p-2 rounded-lg text-xs">
                <i className="fas fa-language text-[var(--cyber-purple)] mr-1"></i> English
              </div>
            </div>
          </SciFiCard>
        </div>

        <CyberButton variant="purple" className="w-full justify-center" size="sm">
          <i className="fas fa-chalkboard-teacher mr-2"></i>
          OPEN VIRTUAL CLASSROOM
        </CyberButton>
      </div>
    </div>
  );
}

function HealthSolution() {
  return (
    <div className="rounded-lg overflow-hidden bg-[var(--cyber-blue)]/75 backdrop-filter backdrop-blur-md border border-[var(--cyber-green)]/30 shadow-[0_0_10px_rgba(16,185,129,0.3)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(16,185,129,0.5),0_0_30px_rgba(16,185,129,0.3)]">
      <div className="bg-gradient-to-r from-[var(--cyber-blue)] to-[var(--cyber-dark)] p-6 border-b border-[var(--cyber-green)]/30">
        <div className="flex items-center mb-4">
          <div className="h-10 w-10 rounded-full bg-[var(--cyber-green)]/20 flex items-center justify-center mr-4">
            <i className="fas fa-heartbeat text-[var(--cyber-green)]"></i>
          </div>
          <h3 className="font-rajdhani text-xl font-bold text-[var(--cyber-green)]">Health Crisis Prevention</h3>
        </div>
        <div className="cyber-line my-4" style={{ background: "linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.7), transparent)" }}></div>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-gray-300 text-sm font-medium">HEALTH MONITORING</h4>
            <span className="text-xs bg-[var(--cyber-green)]/10 text-[var(--cyber-green)] px-2 py-1 rounded">AI SURVEILLANCE</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <SciFiCard variant="green" className="p-4">
              <div className="text-sm mb-2">Disease Risk Assessment</div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs">Malaria</span>
                <span className="text-[var(--cyber-orange)] text-xs">Medium</span>
              </div>
              <div className="bg-[var(--cyber-dark)] rounded-full h-2 overflow-hidden mb-3">
                <div className="cyber-progress w-[60%]" style={{ background: "linear-gradient(90deg, #f97316, #ea580c)" }}></div>
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-xs">Dengue</span>
                <span className="text-[var(--cyber-green)] text-xs">Low</span>
              </div>
              <div className="bg-[var(--cyber-dark)] rounded-full h-2 overflow-hidden">
                <div className="cyber-progress w-[25%]" style={{ background: "linear-gradient(90deg, #10b981, #059669)" }}></div>
              </div>
            </SciFiCard>

            <SciFiCard variant="green" className="p-4">
              <div className="text-sm mb-2">Medical Resources</div>
              <div className="flex items-center justify-between mb-2">
                <i className="fas fa-hospital text-[var(--cyber-green)] mr-2"></i>
                <span className="text-xs">Nearest Facility: 12km</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <i className="fas fa-user-md text-[var(--cyber-green)] mr-2"></i>
                <span className="text-xs">Health Workers: 12</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <i className="fas fa-ambulance text-[var(--cyber-green)] mr-2"></i>
                <span className="text-xs">Emergency Response: 35min</span>
              </div>
            </SciFiCard>
          </div>
        </div>

        <CyberButton variant="green" className="w-full justify-center" size="sm">
          <i className="fas fa-shield-virus mr-2"></i>
          VIEW PREVENTION PROTOCOLS
        </CyberButton>
      </div>
    </div>
  );
}
