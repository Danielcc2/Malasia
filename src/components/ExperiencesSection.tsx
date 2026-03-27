"use client";

import { useState } from "react";
import {
  Waves,
  Zap,
  ShoppingBag,
  UtensilsCrossed,
  Music,
  Sparkles,
  ChevronDown,
  ChevronUp,
  MapPin,
  Banknote,
  Star,
  Clock,
} from "lucide-react";

interface Experience {
  name: string;
  location: string;
  description: string;
  price: string;
  priceEur: string;
  tip: string;
  stars: number;
}

interface Category {
  id: string;
  icon: React.ElementType;
  label: string;
  emoji: string;
  color: string;
  bgColor: string;
  subtitle: string;
  experiences: Experience[];
}

const categories: Category[] = [
  {
    id: "aventura",
    icon: Waves,
    label: "Aventura y Deportes",
    emoji: "🏄",
    color: "text-blue-600",
    bgColor: "bg-blue-50 border-blue-100",
    subtitle: "Kayak, tirolina, senderismo extremo y mas",
    experiences: [
      {
        name: "Kayak en los manglares de Langkawi",
        location: "Langkawi, Kedah",
        description: "Navega entre manglares centenarios con aguilas de mar sobrevolando tu cabeza. Tours de 2-3h con guia y equipo incluido.",
        price: "80-150 MYR",
        priceEur: "17-32 EUR",
        tip: "Reserva el tour del atardecer, los colores son espectaculares y hay menos turistas.",
        stars: 5,
      },
      {
        name: "Tirolina en la selva de Penang",
        location: "Penang Hill, George Town",
        description: "Vuela sobre el dosel de la selva tropical a 30m de altura. Circuito de 8 plataformas con vistas increibles.",
        price: "120-180 MYR",
        priceEur: "25-38 EUR",
        tip: "Ve por la manana para evitar lluvias vespertinas y las colas de turistas.",
        stars: 4,
      },
      {
        name: "White water rafting en Gopeng",
        location: "Gopeng, Perak",
        description: "Rafting en rapidos de clase III-IV en el rio Kampar. Solo 2h desde KL, perfecto para un dia de aventura.",
        price: "100-160 MYR",
        priceEur: "21-34 EUR",
        tip: "Nivel principiante apto, no se necesita experiencia. Llevan todo el material.",
        stars: 5,
      },
      {
        name: "Buceo en Pulau Sipadan",
        location: "Sipadan, Sabah",
        description: "Considerado top 3 del mundo. Tortugas, tiburones martillo y paredes de coral a pico. Plazas muy limitadas.",
        price: "350-500 MYR",
        priceEur: "74-106 EUR",
        tip: "Reserva con 3-6 meses de antelacion, solo 120 personas al dia tienen permiso.",
        stars: 5,
      },
      {
        name: "Snorkel nocturno bioluminiscente",
        location: "Islas Perhentian",
        description: "Nada en la oscuridad mientras el plancton ilumina el agua en azul neon a tu alrededor. Una experiencia magica.",
        price: "60-90 MYR",
        priceEur: "13-19 EUR",
        tip: "Los meses de mayo a agosto son los mejores para ver el fenomeno bioluminiscente.",
        stars: 5,
      },
      {
        name: "Escalada en roca en Batu Caves",
        location: "Batu Caves, Kuala Lumpur",
        description: "Las paredes de piedra caliza de 400 millones de anos ofrecen rutas de escalada para todos los niveles junto a los templos.",
        price: "50-100 MYR",
        priceEur: "11-21 EUR",
        tip: "Contrata un guia local certificado, conocen las mejores rutas y el equipo esta incluido.",
        stars: 4,
      },
    ],
  },
  {
    id: "moda",
    icon: ShoppingBag,
    label: "Ropa y Mercados",
    emoji: "👗",
    color: "text-pink-600",
    bgColor: "bg-pink-50 border-pink-100",
    subtitle: "Donde comprar ropa, imitacion de marcas y souvenirs",
    experiences: [
      {
        name: "Petaling Street (Chinatown KL)",
        location: "Chinatown, Kuala Lumpur",
        description: "El mercado mas famoso de KL para ropa de imitacion, relojes, bolsos y souvenirs. Regatea siempre, el precio inicial dobla el real.",
        price: "10-80 MYR por articulo",
        priceEur: "2-17 EUR",
        tip: "Ofrece el 40% del precio pedido y ve aumentando. Compra varios articulos al mismo vendedor para descuento extra.",
        stars: 4,
      },
      {
        name: "Jonker Street Night Market",
        location: "Malaca",
        description: "Los viernes y sabados se llena de vendedores con ropa vintage, artesania Peranakan, batik y antigueidades unicas.",
        price: "15-100 MYR",
        priceEur: "3-21 EUR",
        tip: "Los articulos de batik son autenticos y mas baratos que en KL. Son perfectos como regalo.",
        stars: 5,
      },
      {
        name: "Central Market (Pasar Seni)",
        location: "Kuala Lumpur",
        description: "Mercado colonial de 1888 reconvertido en galeria de artesania. Batik, madera tallada, pewter (estano) y ropa tradicional.",
        price: "20-200 MYR",
        priceEur: "4-42 EUR",
        tip: "Los articulos de pewter Royal Selangor son la compra mas tipica de Malasia. Calidad garantizada.",
        stars: 4,
      },
      {
        name: "Berjaya Times Square",
        location: "Kuala Lumpur",
        description: "Centro comercial gigante con marcas internacionales, ropa local barata y una zona entera de moda a precios muy por debajo de Europa.",
        price: "30-300 MYR",
        priceEur: "6-64 EUR",
        tip: "Los sabados hay mercadillo en la planta baja con ropa de segunda mano y vintage a 5-20 MYR.",
        stars: 3,
      },
      {
        name: "Duty Free Langkawi",
        location: "Langkawi, Kedah",
        description: "Toda la isla es zona libre de impuestos. Chocolates Ferrero, perfumes Dior, alcohol y electronica a precios sin IVA.",
        price: "Sin impuestos",
        priceEur: "30-50% mas barato",
        tip: "El limite por persona es de 200 MYR en alcohol y 400 MYR en tabaco al entrar a la peninsula.",
        stars: 5,
      },
      {
        name: "Pasar Malam (mercados nocturnos)",
        location: "En todas las ciudades",
        description: "Cada barrio tiene su mercado nocturno semanal. Ropa, zapatos, accesorios y comida a precios locales. El mas grande en Sungai Wang KL.",
        price: "5-50 MYR",
        priceEur: "1-11 EUR",
        tip: "Pregunta a la gente del hotel que dia es el Pasar Malam mas cercano, son los mejores precios de todo Malasia.",
        stars: 5,
      },
    ],
  },
  {
    id: "gastronomia",
    icon: UtensilsCrossed,
    label: "Donde Comer",
    emoji: "🍜",
    color: "text-orange-600",
    bgColor: "bg-orange-50 border-orange-100",
    subtitle: "Los mejores platos, restaurantes y mercados de comida",
    experiences: [
      {
        name: "Jalan Alor (street food nocturno)",
        location: "Bukit Bintang, Kuala Lumpur",
        description: "La calle mas famosa para comer de noche. Satay, char kuey teow, durian, BBQ seafood y decenas de puestos en una sola calle.",
        price: "5-30 MYR por plato",
        priceEur: "1-6 EUR",
        tip: "Ve entre las 8-10pm para el maximo ambiente. Prueba el durian si te atreves, es la fruta rey de Asia.",
        stars: 5,
      },
      {
        name: "Nasi Lemak en Kampung Baru",
        location: "Kampung Baru, Kuala Lumpur",
        description: "El plato nacional malasio: arroz con leche de coco, sambal picante, anchoas fritas, cacahuetes y huevo. El barrio malayo mas autentico de KL.",
        price: "3-8 MYR",
        priceEur: "0.60-1.70 EUR",
        tip: "Desayuna ahi a las 7am, es cuando los locales van y los precios son los mas baratos.",
        stars: 5,
      },
      {
        name: "Laksa Sarawak en Kuching",
        location: "Kuching, Sarawak",
        description: "Anthony Bourdain la llamo el mejor desayuno del mundo. Sopa cremosa de coco con gambas, pollo, fideos y sambal belacan.",
        price: "6-12 MYR",
        priceEur: "1.30-2.50 EUR",
        tip: "El sitio original es Chong Choon Cafe en Carpenter Street. Llega antes de las 9am, se agota.",
        stars: 5,
      },
      {
        name: "Penang Char Kuey Teow",
        location: "Lorong Selamat, George Town",
        description: "El mejor plato de fideos salteados del mundo segun muchos chefs. Fideos de arroz planos con gambas, berberechos y salsa negra.",
        price: "8-15 MYR",
        priceEur: "1.70-3.20 EUR",
        tip: "Busca el puesto de la anciana en Lorong Selamat. Espera 30 min pero vale cada segundo.",
        stars: 5,
      },
      {
        name: "Mercado Nocturno de Kota Bharu",
        location: "Kota Bharu, Kelantan",
        description: "El Pasar Siti Khadijah es el mejor mercado gastonomico cubierto de Malasia, operado solo por mujeres. Colores y sabores explosivos.",
        price: "3-15 MYR por plato",
        priceEur: "0.60-3.20 EUR",
        tip: "Prueba el nasi kerabu (arroz azul) y el ayam percik (pollo con coco). Son exclusivos de Kelantan.",
        stars: 5,
      },
      {
        name: "Dim Sum en Ipoh Old Town",
        location: "Ipoh, Perak",
        description: "Ipoh tiene la mejor dim sum fuera de Hong Kong. El dim sum de trolley en FMS Bar lleva 90 anos en el mismo sitio.",
        price: "15-40 MYR por persona",
        priceEur: "3-8.50 EUR",
        tip: "Solo abre de 8am a 2pm. Llega a las 9am para encontrar sitio y ver los carros llenos.",
        stars: 5,
      },
    ],
  },
  {
    id: "fiesta",
    icon: Music,
    label: "Vida Nocturna",
    emoji: "🎉",
    color: "text-purple-600",
    bgColor: "bg-purple-50 border-purple-100",
    subtitle: "Rooftop bars, clubes, karaoke y noches malayas",
    experiences: [
      {
        name: "Rooftop Bar Heli Lounge KL",
        location: "Bukit Bintang, Kuala Lumpur",
        description: "Bar sobre el helipuerto del edificio Menara KH con vistas directas a las Torres Petronas. El mas fotografiado de KL.",
        price: "25-50 MYR por copa",
        priceEur: "5-11 EUR",
        tip: "Llega antes del atardecer (6:30pm) para conseguir sitio en el borde. Miercoles es Ladies Night con copas gratis para ellas.",
        stars: 5,
      },
      {
        name: "Zouk Club Kuala Lumpur",
        location: "TREC, Kuala Lumpur",
        description: "El club mas famoso de Malasia y uno de los mejores de Asia. DJs internacionales, 4 salas y ambiente hasta las 5am los fines de semana.",
        price: "50-80 MYR entrada",
        priceEur: "11-17 EUR",
        tip: "Los viernes son mejores que los sabados. Descarga la app para listas de invitados gratuitas.",
        stars: 4,
      },
      {
        name: "Changkat Bukit Bintang Bar Street",
        location: "Kuala Lumpur",
        description: "La calle de bares mas animada de KL con decenas de locales side by side: reggae, live music, sports bars y terrazas.",
        price: "15-30 MYR por cerveza",
        priceEur: "3-6 EUR",
        tip: "El Tequila Bar y el El Cerdo (cocina fusion) son los mas recomendados. Happy hour de 5-9pm en la mayoria.",
        stars: 4,
      },
      {
        name: "Karaoke en Red Box Malaysia",
        location: "Kuala Lumpur, Penang, JB",
        description: "Los malayos adoran el karaoke. Salas privadas para grupos con miles de canciones en espanol, ingles y malayo. Buffet incluido.",
        price: "30-60 MYR por persona (3h)",
        priceEur: "6-13 EUR",
        tip: "Busca las ofertas de mediodia (12-6pm) que suelen ser la mitad de precio. Hay canciones en espanol.",
        stars: 4,
      },
      {
        name: "Chill Out Beach Bars en Langkawi",
        location: "Pantai Cenang, Langkawi",
        description: "Bares en la playa con los pies en la arena, mojitos baratos, hammocks y musica reggae. El ambiente mas relajado de Malasia.",
        price: "15-35 MYR por copa",
        priceEur: "3-7.50 EUR",
        tip: "El Yellow Beach Cafe y Babylon son los clasicos. Las bebidas son mas baratas por el duty free de la isla.",
        stars: 5,
      },
      {
        name: "Georgetown Festival & Eventos",
        location: "George Town, Penang",
        description: "Penang tiene vida nocturna cultural con galeria nocturas, mercados de arte y conciertos callejeros especialmente en julio-agosto.",
        price: "Gratis - 30 MYR",
        priceEur: "Gratis - 6 EUR",
        tip: "El George Town Festival en agosto es el mayor evento cultural de Malasia. Espectaculos cada noche.",
        stars: 4,
      },
    ],
  },
  {
    id: "spa",
    icon: Sparkles,
    label: "Bienestar y Relax",
    emoji: "💆",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50 border-emerald-100",
    subtitle: "Spas, masajes tradicionales y termas",
    experiences: [
      {
        name: "Masaje malayo tradicional",
        location: "En todo Malasia",
        description: "El urut Melayu es el masaje tradicional con aceites de hierbas locales. Profundo y terapeutico, diferente al tailandes.",
        price: "40-80 MYR por hora",
        priceEur: "8.50-17 EUR",
        tip: "Evita los masajes de pie de los centros comerciales. Busca centros de masajes locales en zonas residenciales para mitad de precio.",
        stars: 5,
      },
      {
        name: "Aguas termales de Sungai Klah",
        location: "Sungkai, Perak",
        description: "Termas naturales en plena selva tropical con agua a 42 C. Jacuzzis naturales y piscinas de diferentes temperaturas.",
        price: "25-50 MYR entrada",
        priceEur: "5-11 EUR",
        tip: "Los fines de semana estan llenos. Ve entre semana de manana para disfrutarlo en calma con la niebla del bosque.",
        stars: 4,
      },
      {
        name: "Reflexologia de pies en Chinatown",
        location: "Petaling Street, KL",
        description: "Masaje de reflexologia de pies chino en cualquier local de Chinatown. Tecnica precisa que activa puntos de energia de todo el cuerpo.",
        price: "25-45 MYR por hora",
        priceEur: "5-9.50 EUR",
        tip: "Pide el masaje con piedras calientes, vale 10 MYR mas y hace una diferencia enorme.",
        stars: 4,
      },
    ],
  },
];

export default function ExperiencesSection() {
  const [activeCategory, setActiveCategory] = useState("aventura");
  const [expandedExp, setExpandedExp] = useState<string | null>(null);

  const current = categories.find((c) => c.id === activeCategory)!;

  return (
    <section id="experiencias" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Experiencias en Malasia
          </h2>
          <p className="text-gray-500">
            Lo mejor de aventura, gastronomia, compras, fiesta y bienestar
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setExpandedExp(null); }}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold transition-all border ${
                activeCategory === cat.id
                  ? `${cat.bgColor} ${cat.color} shadow-md scale-105 border-current/20`
                  : "bg-white text-gray-500 hover:bg-gray-50 border-gray-200 hover:border-gray-300"
              }`}
            >
              <span className="text-base">{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Section header */}
        <div className={`rounded-2xl p-5 mb-6 border ${current.bgColor}`}>
          <div className="flex items-center gap-3">
            <current.icon className={`w-6 h-6 ${current.color}`} />
            <div>
              <h3 className={`font-bold text-lg ${current.color}`}>{current.label}</h3>
              <p className="text-sm text-gray-500">{current.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Experience cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {current.experiences.map((exp, i) => {
            const key = `${activeCategory}-${i}`;
            const isOpen = expandedExp === key;
            return (
              <div
                key={key}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden"
              >
                <button
                  className="w-full text-left p-5"
                  onClick={() => setExpandedExp(isOpen ? null : key)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-800">{exp.name}</h4>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </div>
                      {/* Stars */}
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, s) => (
                          <Star
                            key={s}
                            className={`w-3 h-3 ${s < exp.stars ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-1 text-sm font-semibold text-gray-800">
                        <Banknote className="w-3.5 h-3.5 text-green-500" />
                        {exp.price}
                      </div>
                      <p className="text-xs text-gray-400">{exp.priceEur}</p>
                      <div className="mt-2">
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-gray-400 ml-auto" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400 ml-auto" />
                        )}
                      </div>
                    </div>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 border-t border-gray-50 pt-4">
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      {exp.description}
                    </p>
                    <div className={`rounded-xl p-3 border ${current.bgColor} flex items-start gap-2`}>
                      <Clock className={`w-4 h-4 mt-0.5 shrink-0 ${current.color}`} />
                      <div>
                        <p className={`text-xs font-semibold ${current.color} mb-0.5`}>Consejo del viajero</p>
                        <p className="text-xs text-gray-600">{exp.tip}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
