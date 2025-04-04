import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[var(--cyber-blue)]/80 backdrop-blur-md border-t border-[var(--cyber-cyan)]/30">
      <div className="container mx-auto py-8 px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-6 md:mb-0">
            <div className="h-12 w-12 rounded-full bg-[var(--cyber-cyan)]/20 flex items-center justify-center glowing-border mr-4">
              <i className="fas fa-satellite-dish text-[var(--cyber-cyan)] text-xl"></i>
            </div>
            <div>
              <h1 className="font-rajdhani font-bold text-2xl text-[var(--cyber-cyan)]">AADHARVA</h1>
              <p className="text-xs text-gray-400 tracking-wider">AI-AUGMENTED DIGITAL HUB FOR RURAL ADVANCEMENT</p>
            </div>
          </div>

          <div className="flex space-x-4">
            <a
              href="#"
              className="h-10 w-10 rounded-full bg-[var(--cyber-blue)] flex items-center justify-center border border-[var(--cyber-cyan)]/30 hover:bg-[var(--cyber-cyan)]/10 transition-colors"
            >
              <i className="fab fa-twitter text-[var(--cyber-cyan)]"></i>
            </a>
            <a
              href="#"
              className="h-10 w-10 rounded-full bg-[var(--cyber-blue)] flex items-center justify-center border border-[var(--cyber-cyan)]/30 hover:bg-[var(--cyber-cyan)]/10 transition-colors"
            >
              <i className="fab fa-github text-[var(--cyber-cyan)]"></i>
            </a>
            <a
              href="#"
              className="h-10 w-10 rounded-full bg-[var(--cyber-blue)] flex items-center justify-center border border-[var(--cyber-cyan)]/30 hover:bg-[var(--cyber-cyan)]/10 transition-colors"
            >
              <i className="fab fa-linkedin-in text-[var(--cyber-cyan)]"></i>
            </a>
          </div>
        </div>

        <div className="cyber-line mb-8"></div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-rajdhani text-lg font-medium text-white mb-4">About</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-[var(--cyber-cyan)] text-sm">Our Mission</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[var(--cyber-cyan)] text-sm">Team</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[var(--cyber-cyan)] text-sm">Partners</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[var(--cyber-cyan)] text-sm">Impact Reports</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-rajdhani text-lg font-medium text-white mb-4">Solutions</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-[var(--cyber-cyan)] text-sm">Water Management</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[var(--cyber-cyan)] text-sm">Agricultural Support</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[var(--cyber-cyan)] text-sm">Education Access</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[var(--cyber-cyan)] text-sm">Healthcare Solutions</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-rajdhani text-lg font-medium text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-[var(--cyber-cyan)] text-sm">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[var(--cyber-cyan)] text-sm">API References</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[var(--cyber-cyan)] text-sm">Case Studies</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[var(--cyber-cyan)] text-sm">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-rajdhani text-lg font-medium text-white mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <i className="fas fa-envelope text-[var(--cyber-cyan)] mt-1 mr-2"></i>
                <span className="text-gray-400 text-sm">info@aadharva.org</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone-alt text-[var(--cyber-cyan)] mt-1 mr-2"></i>
                <span className="text-gray-400 text-sm">+91 123 456 7890</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt text-[var(--cyber-cyan)] mt-1 mr-2"></i>
                <span className="text-gray-400 text-sm">Google Solutions Challenge, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="cyber-line mt-8 mb-6"></div>

        <div className="text-center text-gray-500 text-sm">
          <p>© 2023 AADHARVA - Google Solutions Challenge. All rights reserved.</p>
          <p className="mt-2">Powered by Google Maps API and Gemini AI</p>
        </div>
      </div>
    </footer>
  );
}
