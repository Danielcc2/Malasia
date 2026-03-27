import { Plane, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
              <Plane className="w-5 h-5" />
              Malaysia Travel Guide
            </div>
            <p className="text-sm leading-relaxed">
              Tu guia completa para descubrir Malasia. Desde las Torres Petronas
              hasta las selvas de Borneo, todo lo que necesitas para tu viaje.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Links rapidos</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#clima" className="hover:text-white transition-colors">Clima</a></li>
              <li><a href="#ciudades" className="hover:text-white transition-colors">Ciudades</a></li>
              <li><a href="#explorar" className="hover:text-white transition-colors">Explorar zonas</a></li>
              <li><a href="#conversor" className="hover:text-white transition-colors">Conversor moneda</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Info practica</h4>
            <ul className="space-y-2 text-sm">
              <li>Moneda: Ringgit Malasio (MYR)</li>
              <li>Idioma: Malayo, Ingles</li>
              <li>Huso horario: UTC+8</li>
              <li>Enchufe: Tipo G (UK)</li>
              <li>Visado: No necesario para EU (90 dias)</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-sm">
          <p className="flex items-center justify-center gap-1">
            Hecho con <Heart className="w-4 h-4 text-red-500 fill-red-500" /> para tu viaje a Malasia
          </p>
        </div>
      </div>
    </footer>
  );
}
