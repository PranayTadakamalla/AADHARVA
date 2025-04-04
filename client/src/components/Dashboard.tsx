import React from "react";
import { SciFiCard } from "@/components/ui/sci-fi-card";

// Challenge data
const challenges = [
  {
    id: 1,
    icon: "fas fa-tint",
    iconColor: "text-[var(--cyber-cyan)]",
    iconBg: "bg-[var(--cyber-cyan)]/20",
    category: "WATER",
    categoryBg: "bg-[var(--cyber-blue-light)]/30",
    categoryColor: "text-[var(--cyber-cyan)]",
    title: "Clean Water Access",
    description: "Monitoring quality & optimizing distribution",
    progress: 78,
    progressColor: "bg-gradient-to-r from-[var(--cyber-cyan)] to-[var(--cyber-blue-light)]",
    communities: 47,
    growth: 12.5,
  },
  {
    id: 2,
    icon: "fas fa-seedling",
    iconColor: "text-[var(--cyber-orange)]",
    iconBg: "bg-[var(--cyber-orange)]/20",
    category: "AGRICULTURE",
    categoryBg: "bg-[var(--cyber-orange)]/30",
    categoryColor: "text-[var(--cyber-orange)]",
    title: "Farmer Livelihoods",
    description: "Crop prediction & market linkages",
    progress: 65,
    progressColor: "bg-gradient-to-r from-[var(--cyber-orange)] to-[#ea580c]",
    communities: 32,
    growth: 8.3,
  },
  {
    id: 3,
    icon: "fas fa-graduation-cap",
    iconColor: "text-[var(--cyber-purple)]",
    iconBg: "bg-[var(--cyber-purple)]/20",
    category: "EDUCATION",
    categoryBg: "bg-[var(--cyber-purple)]/30",
    categoryColor: "text-[var(--cyber-purple)]",
    title: "Girl Child Education",
    description: "Virtual classrooms & personalized learning",
    progress: 82,
    progressColor: "bg-gradient-to-r from-[var(--cyber-purple)] to-[#6d28d9]",
    communities: 56,
    growth: 15.8,
  },
  {
    id: 4,
    icon: "fas fa-tree",
    iconColor: "text-[var(--cyber-green)]",
    iconBg: "bg-[var(--cyber-green)]/20",
    category: "RESOURCES",
    categoryBg: "bg-[var(--cyber-green)]/30",
    categoryColor: "text-[var(--cyber-green)]",
    title: "Natural Resource Mgmt",
    description: "Monitoring & sustainability practices",
    progress: 70,
    progressColor: "bg-gradient-to-r from-[var(--cyber-green)] to-[#059669]",
    communities: 41,
    growth: 10.2,
  },
];

export default function Dashboard() {
  return (
    <section id="dashboard" className="mb-12">
      <div className="flex items-center mb-6">
        <h2 className="font-rajdhani uppercase text-2xl font-bold text-[var(--cyber-cyan)] tracking-wider">System Dashboard</h2>
        <div className="cyber-line flex-grow ml-4"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {challenges.map((challenge) => (
          <SciFiCard key={challenge.id} className="p-6 rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <div className={`h-10 w-10 rounded-full ${challenge.iconBg} flex items-center justify-center`}>
                <i className={`${challenge.icon} ${challenge.iconColor}`}></i>
              </div>
              <div className={`text-xs font-medium px-2 py-1 rounded ${challenge.categoryBg} ${challenge.categoryColor}`}>
                {challenge.category}
              </div>
            </div>
            <h3 className="font-rajdhani text-lg font-medium mb-2">{challenge.title}</h3>
            <p className="text-sm text-gray-400 mb-4">{challenge.description}</p>

            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1">
                <span>Solution Deployment</span>
                <span className={challenge.categoryColor}>{challenge.progress}%</span>
              </div>
              <div className="bg-[var(--cyber-dark)] rounded-full h-2 overflow-hidden">
                <div 
                  className={`cyber-progress ${challenge.progressColor}`} 
                  style={{ width: `${challenge.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex justify-between text-sm mt-4">
              <span className="text-gray-400">
                Communities: <span className="text-white">{challenge.communities}</span>
              </span>
              <span className="text-[var(--cyber-green)]">
                <i className="fas fa-arrow-up mr-1"></i>
                {challenge.growth}%
              </span>
            </div>
          </SciFiCard>
        ))}
      </div>
    </section>
  );
}
