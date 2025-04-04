import React, { useState } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative border-b border-[var(--cyber-cyan)]/30 bg-[var(--cyber-blue)]/80 backdrop-blur-md">
      <div className="container mx-auto py-4 px-4 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="h-12 w-12 rounded-full bg-[var(--cyber-cyan)]/20 flex items-center justify-center glowing-border mr-4">
            <i className="fas fa-satellite-dish text-[var(--cyber-cyan)] text-xl"></i>
          </div>
          <div>
            <h1 className="font-rajdhani font-bold text-2xl md:text-3xl text-[var(--cyber-cyan)]">AADHARVA</h1>
            <p className="text-xs text-gray-400 tracking-wider">AI-AUGMENTED DIGITAL HUB FOR RURAL ADVANCEMENT</p>
          </div>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden absolute top-4 right-4 text-[var(--cyber-cyan)]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex space-x-3">
          <NavLink href="#dashboard">DASHBOARD</NavLink>
          <NavLink href="#solutions">SOLUTIONS</NavLink>
          <NavLink href="#map-section">MAP</NavLink>
          <NavLink href="#assistant">ASSISTANT</NavLink>
        </nav>

        {/* Navigation - Mobile */}
        {isMenuOpen && (
          <nav className="md:hidden flex flex-col w-full space-y-2 mt-2">
            <NavLink href="#dashboard" onClick={() => setIsMenuOpen(false)}>DASHBOARD</NavLink>
            <NavLink href="#solutions" onClick={() => setIsMenuOpen(false)}>SOLUTIONS</NavLink>
            <NavLink href="#map-section" onClick={() => setIsMenuOpen(false)}>MAP</NavLink>
            <NavLink href="#assistant" onClick={() => setIsMenuOpen(false)}>ASSISTANT</NavLink>
          </nav>
        )}
      </div>
    </header>
  );
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

function NavLink({ href, children, onClick }: NavLinkProps) {
  const isActive = href === "#dashboard"; // Default to dashboard as active
  
  return (
    <a 
      className={`px-3 py-2 rounded hover:bg-[var(--cyber-cyan)]/10 ${
        isActive ? "text-[var(--cyber-cyan)]" : "text-gray-300 hover:text-[var(--cyber-cyan)]"
      } border border-transparent hover:border-[var(--cyber-cyan)]/30 transition-all duration-300`}
      href={href}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
