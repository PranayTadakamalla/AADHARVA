import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AssistantSection from "@/components/AssistantSection";

export default function AssistantPage() {
  return (
    <div className="bg-[var(--cyber-dark)] font-inter text-gray-100 min-h-screen overflow-x-hidden">
      <Header />
      <main className="container mx-auto py-8 px-4 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-cyan-400 glitch-text">
            AI Assistant
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Get help navigating our platform and learn about rural development solutions through our AI-powered assistant. Ask questions about any of our focus areas: Water, Agriculture, Education, Healthcare, Energy, Connectivity, and Governance.
          </p>
        </div>
        <div className="mt-8 bg-black/50 border border-cyan-500/30 rounded-lg shadow-[0_0_15px_rgba(0,200,255,0.3)] backdrop-blur-sm">
          <AssistantSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}