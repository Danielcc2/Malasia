"use client";

import { useState } from "react";
import {
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
  Landmark,
  Trees,
  UtensilsCrossed,
  Mountain,
  ShoppingBag,
  Umbrella,
  Calendar,
  Wallet,
  Star,
} from "lucide-react";
import type { City } from "@/data/cities";
import { categoryColors } from "@/data/cities";

const categoryIconMap: Record<string, React.ElementType> = {
  cultura: Landmark,
  naturaleza: Trees,
  gastronomia: UtensilsCrossed,
  aventura: Mountain,
  compras: ShoppingBag,
  playa: Umbrella,
};

const categoryLabels: Record<string, string> = {
  cultura: "Cultura",
  naturaleza: "Naturaleza",
  gastronomia: "Gastronomia",
  aventura: "Aventura",
  compras: "Compras",
  playa: "Playa",
};

function myrToEur(myrStr: string): string {
  // Parses "150-250 MYR" -> "32-53 EUR"
  const match = myrStr.match(/([\d]+)-([\d]+)/);
  if (!match) return "";
  const lo = Math.round(parseInt(match[1]) / 4.72);
  const hi = Math.round(parseInt(match[2]) / 4.72);
  return `≈${lo}-${hi} EUR`;
}

export default function CityCard({ city, index }: { city: City; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredActivities = activeCategory
    ? city.activities.filter((a) => a.category === activeCategory)
    : city.activities;

  const categories = [...new Set(city.activities.map((a) => a.category))];

  return (
    <div
      id={`city-${city.id}`}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300"
    >
      {/* Header image area */}
      <div className="relative h-48 sm:h-56 bg-gradient-to-br from-primary/80 to-primary-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-amber-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
            #{index + 1}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <h3 className="text-2xl font-bold text-white mb-1">{city.name}</h3>
          <div className="flex items-center gap-1 text-white/80 text-sm">
            <MapPin className="w-3.5 h-3.5" />
            <span>{city.state}</span>
          </div>
        </div>
        {/* Pattern overlay instead of image to avoid broken images */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <p className="text-sm text-gray-600 leading-relaxed mb-4">{city.description}</p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2 mb-4">
          {city.highlights.map((h) => (
            <span
              key={h}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/5 text-primary text-xs font-medium rounded-full"
            >
              <Star className="w-3 h-3" />
              {h}
            </span>
          ))}
        </div>

        {/* Quick info */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{city.bestTimeToVisit}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Wallet className="w-4 h-4 text-amber-500" />
            <span>{city.avgBudgetPerDay}/dia <span className="text-xs text-gray-400">({myrToEur(city.avgBudgetPerDay)})</span></span>
          </div>
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-primary hover:bg-primary/5 rounded-xl transition-colors"
        >
          {expanded ? (
            <>
              Ocultar actividades <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              Ver {city.activities.length} actividades y rutas <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>

        {/* Activities */}
        {expanded && (
          <div className="mt-4 border-t border-gray-100 pt-4">
            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  !activeCategory
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Todas
              </button>
              {categories.map((cat) => {
                const Icon = categoryIconMap[cat];
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${
                      activeCategory === cat
                        ? "bg-primary text-white"
                        : `${categoryColors[cat]} hover:opacity-80`
                    }`}
                  >
                    {Icon && <Icon className="w-3 h-3" />}
                    {categoryLabels[cat]}
                  </button>
                );
              })}
            </div>

            {/* Activity list */}
            <div className="space-y-3">
              {filteredActivities.map((activity, i) => {
                const Icon = categoryIconMap[activity.category];
                return (
                  <div
                    key={i}
                    className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100/80 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-lg ${categoryColors[activity.category]}`}
                      >
                        {Icon && <Icon className="w-4 h-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-800 mb-1">
                          {activity.name}
                        </h4>
                        <p className="text-xs text-gray-500 leading-relaxed mb-2">
                          {activity.description}
                        </p>
                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                            <Clock className="w-3 h-3" />
                            {activity.duration}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${categoryColors[activity.category]}`}
                          >
                            {categoryLabels[activity.category]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
