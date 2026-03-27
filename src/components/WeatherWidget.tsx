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

export default function WeatherWidget() {
  const [forecast, setForecast] = useState<WeatherDay[]>([]);
  const [selectedCity, setSelectedCity] = useState("Kuala Lumpur");
  const [showTips, setShowTips] = useState(false);

  const topCities = [
    "Kuala Lumpur",
    "George Town",
    "Langkawi",
    "Kota Kinabalu",
    "Cameron Highlands",
  ];

  useEffect(() => {
    setForecast(generateForecast());
  }, [selectedCity]);

  if (forecast.length === 0) return null;

  return (
    <section id="clima" className="py-16 bg-gradient-to-b from-cyan-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Clima en Malasia
          </h2>
          <p className="text-gray-500">
            Prevision meteorologica de los proximos 5 dias
          </p>
        </div>

        {/* City selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {topCities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
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

        {/* Forecast cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
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
