export interface HourlyData {
  hour: string;
  temp: number;
  feelsLike: number;
  icon: string;
  condition: string;
  rain: number;
  wind: number;
  windDir: string;
  humidity: number;
  uv: number;
  visibility: number;
  pressure: number;
}

export interface WeatherDay {
  day: string;
  date: string;
  temp: number;
  tempMin: number;
  condition: string;
  icon: string;
  humidity: number;
  rain: number;
  feelsLike: number;
  wind: number;
  windDir: string;
  uv: number;
  visibility: number;
  pressure: number;
  sunrise: string;
  sunset: string;
  hourly: HourlyData[];
}

export interface CityCoord {
  name: string;
  lat: number;
  lon: number;
}

export const CITY_COORDS: CityCoord[] = [
  { name: "Kuala Lumpur", lat: 3.139, lon: 101.6869 },
  { name: "George Town", lat: 5.4164, lon: 100.3327 },
  { name: "Langkawi", lat: 6.35, lon: 99.8 },
  { name: "Kota Kinabalu", lat: 5.9804, lon: 116.0735 },
  { name: "Cameron Highlands", lat: 4.4718, lon: 101.3767 },
  { name: "Malaca", lat: 2.1896, lon: 102.2501 },
  { name: "Kuching", lat: 1.5535, lon: 110.3593 },
  { name: "Islas Perhentian", lat: 5.9167, lon: 102.7333 },
  { name: "Ipoh", lat: 4.5975, lon: 101.0901 },
  { name: "Taman Negara", lat: 4.3833, lon: 102.4167 },
  { name: "Johor Bahru", lat: 1.4927, lon: 103.7414 },
  { name: "Kota Bharu", lat: 6.1256, lon: 102.2385 },
  { name: "Kuala Terengganu", lat: 5.3117, lon: 103.1324 },
  { name: "Sandakan", lat: 5.8394, lon: 118.1172 },
  { name: "Miri", lat: 4.3995, lon: 114.0148 },
  { name: "Putrajaya", lat: 2.9264, lon: 101.6964 },
  { name: "Alor Setar", lat: 6.1248, lon: 100.3673 },
  { name: "Seremban", lat: 2.7258, lon: 101.9424 },
  { name: "Taiping", lat: 4.8512, lon: 100.7337 },
  { name: "Mersing", lat: 2.4312, lon: 103.8405 },
];

// WMO weather code to icon/condition mapping
function wmoToIcon(code: number): string {
  if (code === 0) return "sun";
  if (code <= 2) return "cloud-sun";
  if (code === 3) return "cloud";
  if (code <= 48) return "cloud"; // fog
  if (code <= 67) return "cloud-rain"; // drizzle & rain
  if (code <= 77) return "cloud"; // snow (rare in MY)
  if (code <= 82) return "cloud-rain"; // showers
  if (code >= 95) return "cloud-lightning"; // thunderstorm
  return "cloud";
}

function wmoToCondition(code: number): string {
  if (code === 0) return "Despejado";
  if (code === 1) return "Mayormente despejado";
  if (code === 2) return "Parcialmente nublado";
  if (code === 3) return "Nublado";
  if (code <= 48) return "Niebla";
  if (code <= 55) return "Llovizna";
  if (code <= 57) return "Llovizna helada";
  if (code === 61) return "Lluvia ligera";
  if (code === 63) return "Lluvia moderada";
  if (code === 65) return "Lluvia fuerte";
  if (code <= 67) return "Lluvia helada";
  if (code <= 77) return "Nieve";
  if (code === 80) return "Chubascos ligeros";
  if (code === 81) return "Chubascos moderados";
  if (code === 82) return "Chubascos fuertes";
  if (code === 95) return "Tormenta electrica";
  if (code >= 96) return "Tormenta con granizo";
  return "Variable";
}

function degToDir(deg: number): string {
  const dirs = ["N", "NE", "E", "SE", "S", "SO", "O", "NO"];
  return dirs[Math.round(deg / 45) % 8];
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  const h = d.getHours();
  const m = d.getMinutes().toString().padStart(2, "0");
  if (h < 12) return `${h === 0 ? 12 : h}:${m} AM`;
  return `${h === 12 ? 12 : h - 12}:${m} PM`;
}

export async function fetchForecast(city: string, numDays: number = 5): Promise<WeatherDay[]> {
  const coord = CITY_COORDS.find((c) => c.name === city) || CITY_COORDS[0];
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${coord.lat}&longitude=${coord.lon}&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,wind_speed_10m,wind_direction_10m,weather_code,uv_index,visibility,surface_pressure,apparent_temperature&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant&timezone=Asia/Kuala_Lumpur&forecast_days=${Math.min(numDays, 16)}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather API error");
  const data = await res.json();

  const days: WeatherDay[] = [];
  const dayNames = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];

  for (let i = 0; i < Math.min(numDays, data.daily.time.length); i++) {
    const dateStr = data.daily.time[i];
    const dateObj = new Date(dateStr + "T00:00:00");
    const isToday = i === 0;
    const wmoCode = data.daily.weather_code[i];

    // Extract 24 hours for this day
    const hourlyStart = i * 24;
    const hourly: HourlyData[] = [];
    for (let h = 0; h < 24 && hourlyStart + h < data.hourly.time.length; h++) {
      const idx = hourlyStart + h;
      const hCode = data.hourly.weather_code[idx];
      hourly.push({
        hour: `${h.toString().padStart(2, "0")}:00`,
        temp: Math.round(data.hourly.temperature_2m[idx]),
        feelsLike: Math.round(data.hourly.apparent_temperature[idx]),
        icon: wmoToIcon(hCode),
        condition: wmoToCondition(hCode),
        rain: data.hourly.precipitation_probability[idx] ?? 0,
        wind: Math.round(data.hourly.wind_speed_10m[idx]),
        windDir: degToDir(data.hourly.wind_direction_10m[idx]),
        humidity: data.hourly.relative_humidity_2m[idx],
        uv: Math.round((data.hourly.uv_index[idx] ?? 0) * 10) / 10,
        visibility: Math.round((data.hourly.visibility[idx] ?? 10000) / 1000),
        pressure: Math.round(data.hourly.surface_pressure[idx] ?? 1013),
      });
    }

    // Avg humidity from hourly
    const avgHumidity = hourly.length > 0
      ? Math.round(hourly.reduce((s, h) => s + h.humidity, 0) / hourly.length)
      : 75;

    // Mid-day feels like (around 14h)
    const midDay = hourly[14] || hourly[12] || hourly[0];

    days.push({
      day: isToday ? "Hoy" : dayNames[dateObj.getDay()],
      date: dateObj.toLocaleDateString("es-ES", { day: "numeric", month: "short" }),
      temp: Math.round(data.daily.temperature_2m_max[i]),
      tempMin: Math.round(data.daily.temperature_2m_min[i]),
      condition: wmoToCondition(wmoCode),
      icon: wmoToIcon(wmoCode),
      humidity: avgHumidity,
      rain: data.daily.precipitation_probability_max[i] ?? 0,
      feelsLike: midDay?.feelsLike ?? Math.round(data.daily.temperature_2m_max[i]),
      wind: Math.round(data.daily.wind_speed_10m_max[i]),
      windDir: degToDir(data.daily.wind_direction_10m_dominant[i]),
      uv: Math.round(data.daily.uv_index_max[i]),
      visibility: midDay?.visibility ?? 10,
      pressure: midDay?.pressure ?? 1013,
      sunrise: formatTime(data.daily.sunrise[i]),
      sunset: formatTime(data.daily.sunset[i]),
      hourly,
    });
  }

  return days;
}

export const weatherTips = [
  "Malasia tiene clima tropical todo el ano con temperaturas entre 27-35°C",
  "Las lluvias suelen ser fuertes pero cortas, generalmente por la tarde",
  "Lleva siempre un paraguas pequeno o chubasquero ligero",
  "Usa protector solar SPF50+ aunque este nublado",
  "La humedad es alta (70-90%), viste ropa ligera y transpirable",
];
