"use client";

import { useState } from "react";
import { Search, MapPin, X } from "lucide-react";
import { cities, malaysianRegions } from "@/data/cities";

export default function CityExplorer() {
  const [query, setQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const allSearchable = [
    ...cities.map((c) => ({ type: "city" as const, name: c.name, state: c.state, id: c.id })),
    ...malaysianRegions.flatMap((r) =>
      r.cities.map((c) => ({ type: "zone" as const, name: c, state: r.name, id: c.toLowerCase().replace(/\s+/g, "-") }))
    ),
    { type: "zone" as const, name: "Sabah", state: "Borneo Malasio", id: "sabah" },
    { type: "zone" as const, name: "Sarawak", state: "Borneo Malasio", id: "sarawak" },
    { type: "zone" as const, name: "Penang", state: "Peninsula Oeste", id: "penang" },
    { type: "zone" as const, name: "Pahang", state: "Peninsula Central", id: "pahang" },
    { type: "zone" as const, name: "Perak", state: "Peninsula Oeste", id: "perak" },
    { type: "zone" as const, name: "Terengganu", state: "Peninsula Este", id: "terengganu" },
    { type: "zone" as const, name: "Kedah", state: "Peninsula Norte", id: "kedah" },
    { type: "zone" as const, name: "Johor", state: "Peninsula Sur", id: "johor" },
    { type: "zone" as const, name: "Selangor", state: "Peninsula Central", id: "selangor" },
    { type: "zone" as const, name: "Negeri Sembilan", state: "Peninsula Central", id: "negeri-sembilan" },
    { type: "zone" as const, name: "Kelantan", state: "Peninsula Este", id: "kelantan" },
    { type: "zone" as const, name: "Perlis", state: "Peninsula Norte", id: "perlis" },
    { type: "zone" as const, name: "Putrajaya", state: "Wilayah Persekutuan", id: "putrajaya" },
    { type: "zone" as const, name: "Labuan", state: "Borneo Malasio", id: "labuan" },
    { type: "zone" as const, name: "Isla Tioman", state: "Pahang", id: "tioman" },
    { type: "zone" as const, name: "Isla Redang", state: "Terengganu", id: "redang" },
    { type: "zone" as const, name: "Isla Sipadan", state: "Sabah", id: "sipadan" },
  ];

  // Deduplicate by name
  const unique = allSearchable.filter(
    (item, idx, arr) => arr.findIndex((a) => a.name === item.name) === idx
  );

  const filtered = query.trim()
    ? unique.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.state.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const scrollToCity = (id: string) => {
    const el = document.getElementById(`city-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("ring-4", "ring-primary/30");
      setTimeout(() => el.classList.remove("ring-4", "ring-primary/30"), 2000);
    }
    setQuery("");
  };

  return (
    <section id="explorar" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Explorar Malasia
          </h2>
          <p className="text-gray-500">
            Busca cualquier ciudad, estado o zona de Malasia
          </p>
        </div>

        {/* Search bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar ciudades, estados, islas..."
              className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Search results */}
          {filtered.length > 0 && (
            <div className="mt-2 bg-white rounded-xl shadow-lg border border-gray-100 max-h-64 overflow-y-auto">
              {filtered.map((item, i) => {
                const cityMatch = cities.find(
                  (c) => c.name === item.name || c.id === item.id
                );
                return (
                  <button
                    key={i}
                    onClick={() => cityMatch ? scrollToCity(cityMatch.id) : null}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 border-b border-gray-50 last:border-0 transition-colors"
                  >
                    <MapPin className={`w-4 h-4 ${item.type === "city" ? "text-primary" : "text-amber-500"}`} />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-400">{item.state}</p>
                    </div>
                    <span className="ml-auto text-xs text-gray-300">
                      {item.type === "city" ? "Ciudad" : "Zona"}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
          {query && filtered.length === 0 && (
            <div className="mt-2 bg-white rounded-xl shadow-lg border border-gray-100 p-4 text-center text-sm text-gray-400">
              No se encontraron resultados para &quot;{query}&quot;
            </div>
          )}
        </div>

        {/* Region buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {malaysianRegions.map((region) => (
            <button
              key={region.name}
              onClick={() =>
                setSelectedRegion(selectedRegion === region.name ? null : region.name)
              }
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                selectedRegion === region.name
                  ? "bg-primary text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {region.name}
            </button>
          ))}
        </div>

        {selectedRegion && (
          <div className="max-w-2xl mx-auto bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-3">{selectedRegion}</h3>
            <div className="flex flex-wrap gap-2">
              {malaysianRegions
                .find((r) => r.name === selectedRegion)
                ?.cities.map((city) => {
                  const cityMatch = cities.find(
                    (c) => c.name === city || c.name.includes(city)
                  );
                  return (
                    <button
                      key={city}
                      onClick={() => cityMatch && scrollToCity(cityMatch.id)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                        cityMatch
                          ? "bg-white text-primary border border-primary/20 hover:bg-primary hover:text-white shadow-sm"
                          : "bg-white text-gray-500 border border-gray-200"
                      }`}
                    >
                      <MapPin className="w-3 h-3 inline mr-1" />
                      {city}
                    </button>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
