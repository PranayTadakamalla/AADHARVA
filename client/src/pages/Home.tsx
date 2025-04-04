import React from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Dashboard from "@/components/Dashboard";
import SolutionsGrid from "@/components/SolutionsGrid";
import MapSection from "@/components/MapSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="bg-[var(--cyber-dark)] font-inter text-gray-100 min-h-screen overflow-x-hidden">
      <Header />
      <main className="container mx-auto py-8 px-4 lg:px-8">
        <HeroSection />
        <Dashboard />
        <SolutionsGrid />
        <MapSection />
      </main>
      <Footer />
    </div>
  );
}
