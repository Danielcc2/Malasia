"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import {
  Sun, CloudSun, CloudRain, CloudLightning, Cloud,
  Droplets, Thermometer, Info, Search, X, Wind,
  Eye, Gauge, Sunrise, Sunset, Zap, ChevronDown,
  Loader2, WifiOff, ChevronLeft,
} from "lucide-react";
import { fetchForecast, weatherTips, CITY_COORDS, type WeatherDay, type HourlyData } from "@/data/weather";

const iconMap: Record<string, React.ElementType> = {
  sun: Sun, "cloud-sun": CloudSun, "cloud-rain": CloudRain,
  "cloud-lightning": CloudLightning, cloud: Cloud,
};
const iconColorMap: Record<string, string> = {
  sun: "text-amber-500", "cloud-sun": "text-amber-400",
  "cloud-rain": "text-blue-500", "cloud-lightning": "text-purple-500", cloud: "text-gray-400",
};
const bgGradientMap: Record<string, string> = {
  sun: "from-sky-400 to-blue-500",
  "cloud-sun": "from-sky-500 to-cyan-600",
  "cloud-rain": "from-slate-500 to-blue-700",
  "cloud-lightning": "from-slate-600 to-purple-800",
  cloud: "from-slate-400 to-gray-600",
};

const ALL_CITIES = CITY_COORDS.map((c) => c.name);
const DAY_OPTIONS = [5, 8, 10, 15];

function UVBar({ uv }: { uv: number }) {
  const pct = Math.min(100, (uv / 12) * 100);
  const color = uv <= 2 ? "bg-green-400" : uv <= 5 ? "bg-yellow-400" : uv <= 7 ? "bg-orange-400" : uv <= 10 ? "bg-red-500" : "bg-purple-600";
  const label = uv <= 2 ? "Bajo" : uv <= 5 ? "Moderado" : uv <= 7 ? "Alto" : uv <= 10 ? "Muy alto" : "Extremo";
  return (
    <div>
      <div className="flex justify-between text-xs text-white/70 mb-1">
        <span>UV {uv}</span><span>{label}</span>
      </div>
      <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/* ────────── Hour Detail Panel ────────── */
function HourDetail({ hour, onBack }: { hour: HourlyData; onBack: () => void }) {
  const Icon = iconMap[hour.icon] || Sun;
  const gradient = bgGradientMap[hour.icon] || bgGradientMap.cloud;

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-200">
      <button onClick={onBack} className="flex items-center gap-1 text-white/70 hover:text-white text-sm mb-4 transition-colors">
        <ChevronLeft className="w-4 h-4" /> Volver a horas
      </button>

      <div className="text-center mb-6">
        <p className="text-white/60 text-sm font-medium mb-1">{hour.hour}</p>
        <Icon className="w-14 h-14 mx-auto mb-2 text-white/90" />
        <p className="text-5xl font-thin">{hour.temp}°</p>
        <p className="text-white/90 text-base mt-1">{hour.condition}</p>
        <p className="text-white/60 text-sm mt-1">Sensacion {hour.feelsLike}°</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/15 rounded-2xl p-3">
          <div className="flex items-center gap-1.5 text-white/60 text-xs mb-1">
            <Droplets className="w-3 h-3" /><span>HUMEDAD</span>
          </div>
          <p className="text-2xl font-semibold">{hour.humidity}%</p>
        </div>
        <div className="bg-white/15 rounded-2xl p-3">
          <div className="flex items-center gap-1.5 text-white/60 text-xs mb-1">
            <CloudRain className="w-3 h-3" /><span>PROB. LLUVIA</span>
          </div>
          <p className="text-2xl font-semibold">{hour.rain}%</p>
        </div>
        <div className="bg-white/15 rounded-2xl p-3">
          <div className="flex items-center gap-1.5 text-white/60 text-xs mb-1">
            <Wind className="w-3 h-3" /><span>VIENTO</span>
          </div>
          <p className="text-2xl font-semibold">{hour.wind}</p>
          <p className="text-xs text-white/60">km/h · {hour.windDir}</p>
        </div>
        <div className="bg-white/15 rounded-2xl p-3">
          <div className="flex items-center gap-1.5 text-white/60 text-xs mb-1">
            <Zap className="w-3 h-3" /><span>INDICE UV</span>
          </div>
          <p className="text-2xl font-semibold mb-1">{hour.uv}</p>
          <UVBar uv={hour.uv} />
        </div>
        <div className="bg-white/15 rounded-2xl p-3">
          <div className="flex items-center gap-1.5 text-white/60 text-xs mb-1">
            <Eye className="w-3 h-3" /><span>VISIBILIDAD</span>
          </div>
          <p className="text-2xl font-semibold">{hour.visibility}</p>
          <p className="text-xs text-white/60">km</p>
        </div>
        <div className="bg-white/15 rounded-2xl p-3">
          <div className="flex items-center gap-1.5 text-white/60 text-xs mb-1">
            <Gauge className="w-3 h-3" /><span>PRESION</span>
          </div>
          <p className="text-2xl font-semibold">{hour.pressure}</p>
          <p className="text-xs text-white/60">hPa</p>
        </div>
      </div>
    </div>
  );
}

/* ────────── Day Detail Modal (iPhone style) ────────── */
function DayDetail({ day, onClose }: { day: WeatherDay; onClose: () => void }) {
  const HourIcon = (iconKey: string) => iconMap[iconKey] || Sun;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedHour, setSelectedHour] = useState<HourlyData | null>(null);

  useEffect(() => {
    const nowHour = new Date().getHours();
    if (scrollRef.current) {
      const el = scrollRef.current.children[nowHour] as HTMLElement;
      if (el) el.scrollIntoView({ inline: "center", block: "nearest" });
    }
  }, []);

  const gradient = bgGradientMap[day.icon] || bgGradientMap.cloud;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className={`relative w-full sm:max-w-md sm:rounded-3xl overflow-hidden bg-gradient-to-b ${gradient} text-white shadow-2xl max-h-[92vh] overflow-y-auto rounded-t-3xl`}>
        {/* Header */}
        <div className="relative px-6 pt-8 pb-6 text-center">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
            <X className="w-4 h-4" />
          </button>

          {selectedHour ? (
            <HourDetail hour={selectedHour} onBack={() => setSelectedHour(null)} />
          ) : (
            <>
              <p className="text-white/80 text-sm font-medium mb-1">{day.date} · {day.day}</p>
              <div className="flex items-center justify-center gap-3 mb-2">
                {(() => { const I = iconMap[day.icon] || Sun; return <I className="w-16 h-16 text-white/90" />; })()}
                <p className="text-7xl font-thin">{day.temp}°</p>
              </div>
              <p className="text-white/90 text-lg font-medium">{day.condition}</p>
              <p className="text-white/70 text-sm mt-1">
                Max {day.temp}° · Min {day.tempMin}° · Sensacion {day.feelsLike}°
              </p>
            </>
          )}
        </div>

        {!selectedHour && (
          <>
            {/* Hourly scroll */}
            <div className="mx-4 mb-4 bg-white/15 rounded-2xl p-4">
              <p className="text-xs text-white/60 uppercase tracking-wider font-medium mb-3 flex items-center gap-1">
                <CloudRain className="w-3 h-3" /> Prevision por horas · Pulsa para detalle
              </p>
              <div className="overflow-x-auto">
                <div ref={scrollRef} className="flex gap-2 pb-1" style={{ minWidth: "max-content" }}>
                  {day.hourly.map((h, i) => {
                    const Icon = HourIcon(h.icon);
                    const isNow = i === new Date().getHours() && day.day === "Hoy";
                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedHour(h)}
                        className={`flex flex-col items-center gap-1.5 min-w-[52px] rounded-xl py-2 px-1 transition-all hover:bg-white/20 active:scale-95 cursor-pointer ${isNow ? "bg-white/25 ring-1 ring-white/40" : ""}`}
                      >
                        <p className="text-xs text-white/70 font-medium">{isNow ? "Ahora" : h.hour.slice(0, 5)}</p>
                        <Icon className="w-5 h-5 text-white/90" />
                        {h.rain > 30 && <p className="text-xs text-blue-200">{h.rain}%</p>}
                        <p className="text-sm font-semibold">{h.temp}°</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Stats grid */}
            <div className="mx-4 mb-4 grid grid-cols-2 gap-3">
              <div className="bg-white/15 rounded-2xl p-4">
                <div className="flex items-center gap-1.5 text-white/60 text-xs mb-2">
                  <Droplets className="w-3.5 h-3.5" /><span>HUMEDAD</span>
                </div>
                <p className="text-3xl font-semibold">{day.humidity}%</p>
                <p className="text-xs text-white/60 mt-1">
                  {day.humidity > 80 ? "Muy humedo" : day.humidity > 65 ? "Humedo" : "Normal"}
                </p>
              </div>
              <div className="bg-white/15 rounded-2xl p-4">
                <div className="flex items-center gap-1.5 text-white/60 text-xs mb-2">
                  <CloudRain className="w-3.5 h-3.5" /><span>PROB. LLUVIA</span>
                </div>
                <p className="text-3xl font-semibold">{day.rain}%</p>
                <p className="text-xs text-white/60 mt-1">
                  {day.rain > 60 ? "Lluvia probable" : day.rain > 30 ? "Posible lluvia" : "Poco probable"}
                </p>
              </div>
              <div className="bg-white/15 rounded-2xl p-4">
                <div className="flex items-center gap-1.5 text-white/60 text-xs mb-2">
                  <Wind className="w-3.5 h-3.5" /><span>VIENTO</span>
                </div>
                <p className="text-3xl font-semibold">{day.wind}</p>
                <p className="text-xs text-white/60 mt-1">km/h · Dir. {day.windDir}</p>
              </div>
              <div className="bg-white/15 rounded-2xl p-4">
                <div className="flex items-center gap-1.5 text-white/60 text-xs mb-2">
                  <Zap className="w-3.5 h-3.5" /><span>INDICE UV</span>
                </div>
                <p className="text-3xl font-semibold mb-2">{day.uv}</p>
                <UVBar uv={day.uv} />
              </div>
              <div className="bg-white/15 rounded-2xl p-4">
                <div className="flex items-center gap-1.5 text-white/60 text-xs mb-2">
                  <Eye className="w-3.5 h-3.5" /><span>VISIBILIDAD</span>
                </div>
                <p className="text-3xl font-semibold">{day.visibility}</p>
                <p className="text-xs text-white/60 mt-1">km</p>
              </div>
              <div className="bg-white/15 rounded-2xl p-4">
                <div className="flex items-center gap-1.5 text-white/60 text-xs mb-2">
                  <Gauge className="w-3.5 h-3.5" /><span>PRESION</span>
                </div>
                <p className="text-3xl font-semibold">{day.pressure}</p>
                <p className="text-xs text-white/60 mt-1">hPa</p>
              </div>
            </div>

            {/* Sunrise/Sunset */}
            <div className="mx-4 mb-4 bg-white/15 rounded-2xl p-4 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Sunrise className="w-8 h-8 text-amber-300" />
                <div>
                  <p className="text-xs text-white/60">AMANECER</p>
                  <p className="text-lg font-semibold">{day.sunrise}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Sunset className="w-8 h-8 text-orange-300" />
                <div>
                  <p className="text-xs text-white/60">ATARDECER</p>
                  <p className="text-lg font-semibold">{day.sunset}</p>
                </div>
              </div>
            </div>

            {/* Sensacion termica */}
            <div className="mx-4 mb-6 bg-white/15 rounded-2xl p-4">
              <div className="flex items-center gap-1.5 text-white/60 text-xs mb-2">
                <Thermometer className="w-3.5 h-3.5" /><span>SENSACION TERMICA</span>
              </div>
              <p className="text-3xl font-semibold mb-1">{day.feelsLike}°</p>
              <p className="text-xs text-white/70">
                {day.feelsLike > day.temp
                  ? "La humedad hace que se sienta mas calor del que marcan los termometros."
                  : "La brisa hace que se sienta algo mas fresco de lo real."}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ────────── Main Widget ────────── */
export default function WeatherWidget() {
  const [numDays, setNumDays] = useState(5);
  const [forecast, setForecast] = useState<WeatherDay[]>([]);
  const [selectedCity, setSelectedCity] = useState("Kuala Lumpur");
  const [showTips, setShowTips] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedDay, setSelectedDay] = useState<WeatherDay | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const topCities = ["Kuala Lumpur", "George Town", "Langkawi", "Kota Kinabalu", "Cameron Highlands"];

  const suggestions = searchQuery.trim()
    ? ALL_CITIES.filter((c) => c.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const handleSelectCity = (city: string) => {
    setSelectedCity(city);
    setSearchQuery("");
    setShowSuggestions(false);
  };

  const loadForecast = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchForecast(selectedCity, numDays);
      setForecast(data);
    } catch {
      setError("No se pudo obtener el tiempo. Comprueba tu conexion.");
    } finally {
      setLoading(false);
    }
  }, [selectedCity, numDays]);

  useEffect(() => {
    loadForecast();
  }, [loadForecast]);

  return (
    <section id="clima" className="py-16 bg-gradient-to-b from-cyan-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Clima en Malasia</h2>
          <p className="text-gray-500">
            Datos en tiempo real · Prevision {numDays} dias · Pulsa una card para ver el detalle
          </p>
          <p className="text-xs text-gray-400 mt-1">Fuente: Open-Meteo.com (datos meteorologicos reales)</p>
        </div>

        {/* Search */}
        <div className="max-w-sm mx-auto mb-6 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text" value={searchQuery}
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
                <button key={city} onMouseDown={() => handleSelectCity(city)}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center gap-2">
                  <Search className="w-3 h-3 text-gray-400" />{city}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick city selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {topCities.map((city) => (
            <button key={city} onClick={() => handleSelectCity(city)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCity === city ? "bg-primary text-white shadow-md" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"}`}>
              {city}
            </button>
          ))}
        </div>
        <p className="text-center text-sm font-semibold text-primary mb-6">{selectedCity}</p>

        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-sm text-gray-500">Obteniendo datos meteorologicos...</p>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <WifiOff className="w-8 h-8 text-red-400" />
            <p className="text-sm text-red-500">{error}</p>
            <button onClick={loadForecast} className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/90">
              Reintentar
            </button>
          </div>
        )}

        {/* Forecast cards */}
        {!loading && !error && forecast.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
            {forecast.map((day, i) => {
              const Icon = iconMap[day.icon] || Sun;
              const grad = bgGradientMap[day.icon] || bgGradientMap.cloud;
              return (
                <button
                  key={i}
                  onClick={() => setSelectedDay(day)}
                  className={`bg-gradient-to-b ${grad} rounded-2xl p-5 text-center shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 active:scale-95 cursor-pointer ${i === 0 ? "ring-2 ring-white/50" : ""}`}
                >
                  <p className="text-sm font-semibold text-white mb-1">{day.day}</p>
                  <p className="text-xs text-white/70 mb-3">{day.date}</p>
                  <Icon className="w-10 h-10 mx-auto mb-3 text-white" />
                  <p className="text-2xl font-bold text-white">{day.temp}°</p>
                  <p className="text-xs text-white/70">{day.tempMin}° min</p>
                  <p className="text-xs text-white/80 mt-2 leading-tight">{day.condition}</p>
                  <div className="flex items-center justify-center gap-2 mt-3 text-xs text-white/70">
                    <Droplets className="w-3 h-3" /><span>{day.humidity}%</span>
                    <CloudRain className="w-3 h-3 ml-1" /><span>{day.rain}%</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 mt-2 text-white/50 text-xs">
                    <ChevronDown className="w-3 h-3" /><span>Ver detalle</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Days selector */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="text-sm text-gray-500">Mostrar:</span>
          {DAY_OPTIONS.map((d) => (
            <button key={d} onClick={() => setNumDays(d)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${numDays === d ? "bg-primary text-white shadow-md" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"}`}>
              {d} dias
            </button>
          ))}
        </div>

        {/* Tips */}
        <div className="max-w-2xl mx-auto">
          <button onClick={() => setShowTips(!showTips)}
            className="flex items-center gap-2 mx-auto text-sm text-primary hover:text-primary-dark transition-colors">
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
                    <span className="text-primary font-bold mt-0.5">•</span>{tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {selectedDay && <DayDetail day={selectedDay} onClose={() => setSelectedDay(null)} />}
    </section>
  );
}
