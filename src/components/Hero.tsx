"use client";

import { MapPin, Sun, DollarSign, Compass } from "lucide-react";

const features = [
  { icon: Sun, label: "Clima en vivo", desc: "Prevision de 5 dias" },
  { icon: MapPin, label: "10 Ciudades top", desc: "Rutas y actividades" },
  { icon: DollarSign, label: "Conversor", desc: "EUR/USD a MYR" },
  { icon: Compass, label: "Explorador", desc: "Busca zonas de Malasia" },
];

export default function Hero() {
  return (
    <section id="inicio" className="relative hero-gradient text-white pt-24 pb-16 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-300 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto animate-fade-in-up">
          <p className="text-cyan-200 text-sm font-medium tracking-wider uppercase mb-4">
            Tu agente de viaje personal
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Descubre{" "}
            <span className="text-amber-300">Malasia</span>
          </h1>
          <p className="text-lg sm:text-xl text-cyan-100 mb-10 max-w-2xl mx-auto">
            Todo lo que necesitas para tu viaje: clima, ciudades, rutas, actividades y conversor de moneda en una sola pagina.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a
              href="#ciudades"
              className="px-8 py-3 bg-amber-400 text-gray-900 font-semibold rounded-full hover:bg-amber-300 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Explorar ciudades
            </a>
            <a
              href="#conversor"
              className="px-8 py-3 bg-white/15 text-white font-semibold rounded-full hover:bg-white/25 transition-all border border-white/30"
            >
              Conversor de moneda
            </a>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {features.map((f, i) => (
            <div
              key={i}
              className="glass-card rounded-xl p-4 text-center hover:scale-105 transition-transform cursor-default"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <f.icon className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="font-semibold text-gray-800 text-sm">{f.label}</p>
              <p className="text-gray-500 text-xs">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
