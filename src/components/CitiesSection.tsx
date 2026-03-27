"use client";

import { cities } from "@/data/cities";
import CityCard from "./CityCard";

export default function CitiesSection() {
  return (
    <section id="ciudades" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Top 10 Ciudades de Malasia
          </h2>
          <p className="text-gray-500">
            Las ciudades mas populares con rutas, actividades y consejos
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {cities.map((city, i) => (
            <CityCard key={city.id} city={city} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
