export interface HourlyData {
  hour: string;
  temp: number;
  icon: string;
  rain: number;
  wind: number;
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

const CONDITIONS = [
  { text: "Parcialmente nublado", icon: "cloud-sun", temp: [30, 33], rain: 20 },
  { text: "Lluvias tropicales", icon: "cloud-rain", temp: [27, 31], rain: 75 },
  { text: "Soleado", icon: "sun", temp: [31, 35], rain: 10 },
  { text: "Tormentas vespertinas", icon: "cloud-lightning", temp: [28, 32], rain: 60 },
  { text: "Nublado con claros", icon: "cloud", temp: [29, 32], rain: 35 },
  { text: "Soleado con nubes altas", icon: "cloud-sun", temp: [30, 34], rain: 15 },
  { text: "Chubascos puntuales", icon: "cloud-rain", temp: [28, 31], rain: 55 },
  { text: "Despejado", icon: "sun", temp: [32, 36], rain: 5 },
];

const WIND_DIRS = ["N", "NE", "E", "SE", "S", "SO", "O", "NO"];

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateHourly(baseCond: typeof CONDITIONS[0], baseTemp: number): HourlyData[] {
  const hours = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11",
                 "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
  // Temperature curve: coolest at ~5am, hottest at ~14h
  return hours.map((h) => {
    const hNum = parseInt(h);
    const curve = Math.sin(((hNum - 5) / 24) * Math.PI * 2);
    const temp = Math.round(baseTemp - 3 + curve * 4);
    // More rain in afternoon
    const rainBias = hNum >= 13 && hNum <= 18 ? 25 : 0;
    const rain = Math.min(100, baseCond.rain + rainBias + rand(-10, 10));
    const wind = rand(8, 28);
    // Night: clear/cloud, afternoon: more clouds/rain
    let icon = baseCond.icon;
    if (hNum < 6 || hNum > 21) icon = "cloud";
    else if (hNum >= 13 && hNum <= 17 && baseCond.rain > 40) icon = "cloud-rain";
    return { hour: `${h}:00`, temp, icon, rain: Math.max(0, rain), wind };
  });
}

export function generateForecast(numDays: number = 5): WeatherDay[] {
  const days = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
  const today = new Date();
  return Array.from({ length: numDays }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const cond = CONDITIONS[i % CONDITIONS.length];
    const temp = cond.temp[0] + rand(0, cond.temp[1] - cond.temp[0]);
    const tempMin = temp - 3 - rand(0, 2);
    const feelsLike = temp + rand(-2, 3);
    const uv = cond.icon === "sun" ? rand(8, 12) : cond.icon === "cloud-sun" ? rand(5, 8) : rand(1, 4);
    const sunriseMin = rand(0, 15);
    const sunsetMin = rand(0, 20);
    return {
      day: i === 0 ? "Hoy" : days[date.getDay()],
      date: date.toLocaleDateString("es-ES", { day: "numeric", month: "short" }),
      temp,
      tempMin,
      condition: cond.text,
      icon: cond.icon,
      humidity: rand(65, 90),
      rain: Math.min(100, cond.rain + rand(-10, 15)),
      feelsLike,
      wind: rand(10, 35),
      windDir: WIND_DIRS[rand(0, 7)],
      uv,
      visibility: cond.icon === "cloud-rain" ? rand(4, 8) : rand(8, 20),
      pressure: rand(1008, 1018),
      sunrise: `6:${sunriseMin.toString().padStart(2, "0")} AM`,
      sunset: `7:${sunsetMin.toString().padStart(2, "0")} PM`,
      hourly: generateHourly(cond, temp),
    };
  });
}

export const weatherTips = [
  "Malasia tiene clima tropical todo el ano con temperaturas entre 27-35 C",
  "Las lluvias suelen ser fuertes pero cortas, generalmente por la tarde",
  "Lleva siempre un paraguas pequeno o chubasquero ligero",
  "Usa protector solar SPF50+ aunque este nublado",
  "La humedad es alta (70-90%), viste ropa ligera y transpirable",
];
