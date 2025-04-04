import React, { useEffect, useRef, useState } from "react";
import { SciFiCard } from "@/components/ui/sci-fi-card";
import { CyberButton } from "@/components/ui/cyber-button";
import { initMap } from "@/lib/maps";

export default function MapSection() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [activeRegion, setActiveRegion] = useState("NORTH REGION");
  const [filters, setFilters] = useState({
    water: true,
    agriculture: true,
    education: true,
    health: true,
    climate: false,
  });

  useEffect(() => {
    if (mapRef.current) {
      initMap(mapRef.current);
    }
  }, []);

  const handleFilterChange = (name: string) => {
    setFilters({
      ...filters,
      [name]: !filters[name as keyof typeof filters],
    });
  };

  const handleRegionChange = (region: string) => {
    setActiveRegion(region);
  };

  return (
    <section id="map-section" className="mb-12">
      <div className="flex items-center mb-6">
        <h2 className="font-rajdhani uppercase text-2xl font-bold text-[var(--cyber-cyan)] tracking-wider">Rural Deployment Map</h2>
        <div className="cyber-line flex-grow ml-4"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <SciFiCard className="p-6 rounded-lg lg:col-span-1">
          <h3 className="font-rajdhani text-lg font-medium mb-4">Region Selection</h3>

          <div className="space-y-4">
            <RegionButton 
              name="NORTH REGION" 
              active={activeRegion === "NORTH REGION"} 
              onClick={() => handleRegionChange("NORTH REGION")} 
            />
            <RegionButton 
              name="SOUTH REGION" 
              active={activeRegion === "SOUTH REGION"} 
              onClick={() => handleRegionChange("SOUTH REGION")} 
            />
            <RegionButton 
              name="EAST REGION" 
              active={activeRegion === "EAST REGION"} 
              onClick={() => handleRegionChange("EAST REGION")} 
            />
            <RegionButton 
              name="WEST REGION" 
              active={activeRegion === "WEST REGION"} 
              onClick={() => handleRegionChange("WEST REGION")} 
            />
          </div>

          <div className="cyber-line my-4"></div>

          <h3 className="font-rajdhani text-lg font-medium mb-4">Filter By Solution</h3>

          <div className="space-y-2">
            <FilterCheckbox 
              label="Water Access Solutions" 
              checked={filters.water} 
              onChange={() => handleFilterChange("water")} 
            />
            <FilterCheckbox 
              label="Agricultural Support" 
              checked={filters.agriculture} 
              onChange={() => handleFilterChange("agriculture")} 
            />
            <FilterCheckbox 
              label="Education Hubs" 
              checked={filters.education} 
              onChange={() => handleFilterChange("education")} 
            />
            <FilterCheckbox 
              label="Health Centers" 
              checked={filters.health} 
              onChange={() => handleFilterChange("health")} 
            />
            <FilterCheckbox 
              label="Climate Initiatives" 
              checked={filters.climate} 
              onChange={() => handleFilterChange("climate")} 
            />
          </div>
        </SciFiCard>

        <SciFiCard className="p-6 rounded-lg lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-rajdhani text-lg font-medium">Interactive Map</h3>
            <div className="flex space-x-2">
              <button className="p-2 text-sm rounded bg-[var(--cyber-blue-light)]/20 text-[var(--cyber-cyan)] border border-[var(--cyber-cyan)]/30">
                <i className="fas fa-plus"></i>
              </button>
              <button className="p-2 text-sm rounded bg-[var(--cyber-blue-light)]/20 text-[var(--cyber-cyan)] border border-[var(--cyber-cyan)]/30">
                <i className="fas fa-minus"></i>
              </button>
              <button className="p-2 text-sm rounded bg-[var(--cyber-blue-light)]/20 text-[var(--cyber-cyan)] border border-[var(--cyber-cyan)]/30">
                <i className="fas fa-sync-alt"></i>
              </button>
            </div>
          </div>

          <div 
            ref={mapRef} 
            className="h-[500px] w-full rounded-lg border border-[var(--cyber-cyan)]/30 shadow-[0_0_10px_rgba(10,255,255,0.3)]"
          ></div>

          <div className="mt-4 p-3 bg-[var(--cyber-blue-light)]/10 rounded-lg border border-[var(--cyber-cyan)]/20 text-sm">
            <div className="flex items-center text-[var(--cyber-cyan)] mb-2">
              <i className="fas fa-info-circle mr-2"></i>
              <span>Currently viewing: {activeRegion}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div><i className="fas fa-tint text-[var(--cyber-cyan)] mr-1"></i> Water projects: 14</div>
              <div><i className="fas fa-seedling text-[var(--cyber-orange)] mr-1"></i> Agriculture projects: 8</div>
              <div><i className="fas fa-graduation-cap text-[var(--cyber-purple)] mr-1"></i> Education hubs: 11</div>
              <div><i className="fas fa-heartbeat text-[var(--cyber-green)] mr-1"></i> Health centers: 6</div>
            </div>
          </div>
        </SciFiCard>
      </div>
    </section>
  );
}

interface RegionButtonProps {
  name: string;
  active: boolean;
  onClick: () => void;
}

function RegionButton({ name, active, onClick }: RegionButtonProps) {
  return (
    <CyberButton
      variant={active ? "default" : "secondary"}
      className="w-full justify-start"
      size="sm"
      onClick={onClick}
    >
      <i className="fas fa-map-marker-alt mr-2"></i>
      {name}
    </CyberButton>
  );
}

interface FilterCheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

function FilterCheckbox({ label, checked, onChange }: FilterCheckboxProps) {
  return (
    <label className="flex items-center space-x-2 text-sm cursor-pointer">
      <input
        type="checkbox"
        className="form-checkbox text-[var(--cyber-cyan)] rounded border-gray-600 bg-[var(--cyber-dark)] focus:ring-[var(--cyber-cyan)]"
        checked={checked}
        onChange={onChange}
      />
      <span>{label}</span>
    </label>
  );
}
