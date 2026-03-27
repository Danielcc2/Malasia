"use client";

import { useEffect, useState } from "react";
import {
  Sun,
  CloudSun,
  CloudRain,
  CloudLightning,
  Cloud,
  Droplets,
  Thermometer,
  Info,
  Search,
  X,
} from "lucide-react";
import { generateForecast, weatherTips, type WeatherDay } from "@/data/weather";

const iconMap: Record<string, React.ElementType> = {
  sun: Sun,
  "cloud-sun": CloudSun,
  "cloud-rain": CloudRain,
  "cloud-lightning": CloudLightning,
  cloud: Cloud,
};

const iconColorMap: Record<string, string> = {
  sun: "text-amber-500",
  "cloud-sun": "text-amber-400",
  "cloud-rain": "text-blue-500",
  "cloud-lightning": "text-purple-500",
  cloud: "text-gray-500",
};

const ALL_CITIES = [
  "Kuala Lumpur", "George Town", "Langkawi", "Kota Kinabalu", "Cameron Highlands",
  "Malaca", "Kuching", "Islas Perhentian", "Ipoh", "Taman Negara",
  "Johor Bahru", "Kota Bharu", "Kuala Terengganu", "Sandakan", "Miri",
  "Putrajaya", "Alor Setar", "Seremban", "Taiping", "Mersing",
];

const DAY_OPTIONS = [5, 8, 10, 15];

export default function WeatherWidget() {
  const [numDays, setNumDays] = useState(5);
  const [forecast, setForecast] = useState<WeatherDay[]>([]);
  const [selectedCity, setSelectedCity] = useState("Kuala Lumpur");
  const [showTips, setShowTips] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const topCities = [
    "Kuala Lumpur",
    "George Town",
    "Langkawi",
    "Kota Kinabalu",
    "Cameron Highlands",
  ];

  const suggestions = searchQuery.trim()
    ? ALL_CITIES.filter((c) =>
        c.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSelectCity = (city: string) => {
    setSelectedCity(city);
    setSearchQuery("");
    setShowSuggestions(false);
  };

  useEffect(() => {
    setForecast(generateForecast(numDays));
  }, [selectedCity, numDays]);

  if (forecast.length === 0) return null;

  return (
    <section id="clima" className="py-16 bg-gradient-to-b from-cyan-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Clima en Malasia
          </h2>
          <p className="text-gray-500">
            Prevision meteorologica de los proximos {numDays} dias
          </p>
        </div>

        {/* Manual search */}
        <div className="max-w-sm mx-auto mb-6 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              placeholder="Buscar ciudad..."
              className="w-full pl-9 pr-9 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-100 z-20 max-h-48 overflow-y-auto">
              {suggestions.map((city) => (
                <button
                  key={city}
                  onMouseDown={() => handleSelectCity(city)}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <Search className="w-3 h-3 text-gray-400" />
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick city selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {topCities.map((city) => (
            <button
              key={city}
              onClick={() => handleSelectCity(city)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCity === city
                  ? "bg-primary text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {city}
            </button>
          ))}
        </div>
        <p className="text-center text-sm font-semibold text-primary mb-6">
          {selectedCity}
        </p>

        {/* Forecast cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
          {forecast.map((day, i) => {
            const Icon = iconMap[day.icon] || Sun;
            return (
              <div
                key={i}
                className={`bg-white rounded-2xl p-5 text-center shadow-sm border transition-all hover:shadow-md hover:-translate-y-1 ${
                  i === 0 ? "border-primary/30 ring-2 ring-primary/10" : "border-gray-100"
                }`}
              >
                <p className="text-sm font-semibold text-gray-800 mb-1">{day.day}</p>
                <p className="text-xs text-gray-400 mb-3">{day.date}</p>
                <Icon className={`w-10 h-10 mx-auto mb-3 ${iconColorMap[day.icon] || "text-gray-400"}`} />
                <p className="text-2xl font-bold text-gray-900">{day.temp}°</p>
                <p className="text-xs text-gray-400">{day.tempMin}° min</p>
                <p className="text-xs text-gray-500 mt-2 leading-tight">{day.condition}</p>
                <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-400">
                  <Droplets className="w-3 h-3" />
                  <span>{day.humidity}%</span>
                  <CloudRain className="w-3 h-3 ml-1" />
                  <span>{day.rain}%</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Days selector */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="text-sm text-gray-500">Mostrar:</span>
          {DAY_OPTIONS.map((d) => (
            <button
              key={d}
              onClick={() => setNumDays(d)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                numDays === d
                  ? "bg-primary text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {d} dias
            </button>
          ))}
        </div>

        {/* Tips */}
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setShowTips(!showTips)}
            className="flex items-center gap-2 mx-auto text-sm text-primary hover:text-primary-dark transition-colors"
          >
            <Info className="w-4 h-4" />
            <span>{showTips ? "Ocultar" : "Ver"} consejos sobre el clima</span>
          </button>
          {showTips && (
            <div className="mt-4 bg-cyan-50 rounded-xl p-5 border border-cyan-100">
              <div className="flex items-center gap-2 mb-3">
                <Thermometer className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-gray-800">Consejos climaticos</h3>
              </div>
              <ul className="space-y-2">
                {weatherTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-primary font-bold mt-0.5">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
