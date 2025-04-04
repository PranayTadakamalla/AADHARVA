import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  return (
    <header className="relative border-b border-[var(--cyber-cyan)]/30 bg-[var(--cyber-blue)]/80 backdrop-blur-md z-20">
      <div className="container mx-auto py-4 px-4 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <Link href="/">
          <a className="flex items-center mb-4 md:mb-0 cursor-pointer">
            <div className="h-12 w-12 rounded-full bg-[var(--cyber-cyan)]/20 flex items-center justify-center glowing-border mr-4">
              <i className="fas fa-satellite-dish text-[var(--cyber-cyan)] text-xl"></i>
            </div>
            <div>
              <h1 className="font-rajdhani font-bold text-2xl md:text-3xl text-[var(--cyber-cyan)]">AADHARVA</h1>
              <p className="text-xs text-gray-400 tracking-wider">AI-AUGMENTED DIGITAL HUB FOR RURAL ADVANCEMENT</p>
            </div>
          </a>
        </Link>

        {/* Mobile menu button */}
        <button 
          className="md:hidden absolute top-4 right-4 text-[var(--cyber-cyan)]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex space-x-3">
          <NavLink href="/" isActive={location === "/"}>HOME</NavLink>
          <NavLink href="/water" isActive={location === "/water"}>WATER</NavLink>
          <NavLink href="/agriculture" isActive={location === "/agriculture"}>AGRICULTURE</NavLink>
          <NavLink href="/education" isActive={location === "/education"}>EDUCATION</NavLink>
          <NavLink href="/healthcare" isActive={location === "/healthcare"}>HEALTHCARE</NavLink>
          <NavLink href="/energy" isActive={location === "/energy"}>ENERGY</NavLink>
          <NavLink href="/connectivity" isActive={location === "/connectivity"}>CONNECTIVITY</NavLink>
          <NavLink href="/governance" isActive={location === "/governance"}>GOVERNANCE</NavLink>
          <NavLink href="/maps" isActive={location === "/maps"}>MAPS</NavLink>
        </nav>

        {/* Navigation - Mobile */}
        {isMenuOpen && (
          <nav className="md:hidden flex flex-col w-full space-y-2 mt-2">
            <NavLink href="/" isActive={location === "/"} onClick={() => setIsMenuOpen(false)}>HOME</NavLink>
            <NavLink href="/water" isActive={location === "/water"} onClick={() => setIsMenuOpen(false)}>WATER</NavLink>
            <NavLink href="/agriculture" isActive={location === "/agriculture"} onClick={() => setIsMenuOpen(false)}>AGRICULTURE</NavLink>
            <NavLink href="/education" isActive={location === "/education"} onClick={() => setIsMenuOpen(false)}>EDUCATION</NavLink>
            <NavLink href="/healthcare" isActive={location === "/healthcare"} onClick={() => setIsMenuOpen(false)}>HEALTHCARE</NavLink>
            <NavLink href="/energy" isActive={location === "/energy"} onClick={() => setIsMenuOpen(false)}>ENERGY</NavLink>
            <NavLink href="/connectivity" isActive={location === "/connectivity"} onClick={() => setIsMenuOpen(false)}>CONNECTIVITY</NavLink>
            <NavLink href="/governance" isActive={location === "/governance"} onClick={() => setIsMenuOpen(false)}>GOVERNANCE</NavLink>
            <NavLink href="/maps" isActive={location === "/maps"} onClick={() => setIsMenuOpen(false)}>MAPS</NavLink>
          </nav>
        )}
      </div>
    </header>
  );
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
  onClick?: () => void;
}

function NavLink({ href, children, isActive, onClick }: NavLinkProps) {
  return (
    <Link href={href}>
      <div 
        className={`px-3 py-2 rounded hover:bg-[var(--cyber-cyan)]/10 ${
          isActive ? "text-[var(--cyber-cyan)]" : "text-gray-300 hover:text-[var(--cyber-cyan)]"
        } border ${isActive ? "border-[var(--cyber-cyan)]/30" : "border-transparent"} hover:border-[var(--cyber-cyan)]/30 transition-all duration-300 cursor-pointer`}
        onClick={onClick}
      >
        {children}
      </div>
    </Link>
  );
}
