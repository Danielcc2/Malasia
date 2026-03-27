export interface WeatherDay {
  day: string;
  date: string;
  temp: number;
  tempMin: number;
  condition: string;
  icon: string;
  humidity: number;
  rain: number;
}

export function generateForecast(): WeatherDay[] {
  const days = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
  const conditions = [
    { text: "Parcialmente nublado", icon: "cloud-sun", temp: [30, 33], rain: 20 },
    { text: "Lluvias tropicales", icon: "cloud-rain", temp: [27, 31], rain: 75 },
    { text: "Soleado", icon: "sun", temp: [31, 35], rain: 10 },
    { text: "Tormentas vespertinas", icon: "cloud-lightning", temp: [28, 32], rain: 60 },
    { text: "Nublado con claros", icon: "cloud", temp: [29, 32], rain: 35 },
  ];

  const today = new Date();
  return Array.from({ length: 5 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const cond = conditions[i % conditions.length];
    const temp = cond.temp[0] + Math.floor(Math.random() * (cond.temp[1] - cond.temp[0]));
    return {
      day: i === 0 ? "Hoy" : days[date.getDay()],
      date: date.toLocaleDateString("es-ES", { day: "numeric", month: "short" }),
      temp,
      tempMin: temp - 3 - Math.floor(Math.random() * 2),
      condition: cond.text,
      icon: cond.icon,
      humidity: 65 + Math.floor(Math.random() * 25),
      rain: cond.rain + Math.floor(Math.random() * 15),
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
