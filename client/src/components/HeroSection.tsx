import React from "react";
import { CyberButton } from "@/components/ui/cyber-button";

export default function HeroSection() {
  return (
    <section className="relative mb-12">
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--cyber-blue)] to-[var(--cyber-dark)] opacity-70 -z-10"></div>
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 p-8 rounded-lg bg-[var(--cyber-blue)]/75 backdrop-filter backdrop-blur-md border border-[var(--cyber-cyan)]/30 shadow-[0_0_10px_rgba(10,255,255,0.3)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(10,255,255,0.5),0_0_30px_rgba(10,255,255,0.3)]">
        <div className="flex-1">
          <h2 className="font-rajdhani uppercase text-4xl font-bold mb-2 text-[var(--cyber-cyan)] tracking-wider">
            Rural Advancement <span className="text-white">Through AI</span>
          </h2>
          <div className="cyber-line my-4"></div>
          <p className="text-gray-300 mb-6">
            AADHARVA leverages cutting-edge artificial intelligence to address critical challenges facing rural communities, promoting sustainable development and improving quality of life.
          </p>

          <div className="flex flex-wrap gap-4 mb-6">
            <CyberButton variant="default">
              <i className="fas fa-satellite mr-2"></i>
              EXPLORE SOLUTIONS
            </CyberButton>
            <CyberButton variant="secondary">
              <i className="fas fa-info-circle mr-2"></i>
              LEARN MORE
            </CyberButton>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="text-center">
              <div className="text-[var(--cyber-cyan)] text-2xl font-rajdhani font-bold">7</div>
              <div className="text-xs text-gray-400">CHALLENGE AREAS</div>
            </div>
            <div className="text-center">
              <div className="text-[var(--cyber-cyan)] text-2xl font-rajdhani font-bold">100+</div>
              <div className="text-xs text-gray-400">RURAL COMMUNITIES</div>
            </div>
            <div className="text-center">
              <div className="text-[var(--cyber-cyan)] text-2xl font-rajdhani font-bold">5M+</div>
              <div className="text-xs text-gray-400">LIVES IMPACTED</div>
            </div>
          </div>
        </div>

        <div className="relative w-full md:w-1/3">
          <div className="w-full aspect-square bg-[var(--cyber-blue)]/80 rounded-full glowing-border p-4 flex items-center justify-center overflow-hidden">
            <div className="hexagon h-full w-full bg-gradient-to-br from-[var(--cyber-cyan)]/30 via-[var(--cyber-blue-light)]/20 to-[var(--cyber-purple)]/20 flex items-center justify-center relative">
              <div className="absolute inset-2 hexagon bg-[var(--cyber-dark)]/70 flex items-center justify-center">
                <i className="fas fa-microchip text-[var(--cyber-cyan)] text-6xl"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
