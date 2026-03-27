export interface Activity {
  name: string;
  description: string;
  duration: string;
  category: "cultura" | "naturaleza" | "gastronomia" | "aventura" | "compras" | "playa";
}

export interface City {
  id: string;
  name: string;
  state: string;
  description: string;
  image: string;
  highlights: string[];
  activities: Activity[];
  bestTimeToVisit: string;
  avgBudgetPerDay: string;
  coordinates: { lat: number; lng: number };
}

export const cities: City[] = [
  {
    id: "kuala-lumpur",
    name: "Kuala Lumpur",
    state: "Wilayah Persekutuan",
    description:
      "La vibrante capital de Malasia, famosa por las Torres Petronas, una mezcla fascinante de modernidad y tradicion con mercados bulliciosos, templos antiguos y rascacielos futuristas.",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",
    highlights: ["Torres Petronas", "Batu Caves", "Jalan Alor", "Chinatown"],
    activities: [
      { name: "Torres Petronas y KLCC Park", description: "Visita las iconicas torres gemelas de 452m y pasea por el parque KLCC con su fuente musical", duration: "3-4 horas", category: "cultura" },
      { name: "Batu Caves", description: "Sube los 272 escalones coloridos hasta las cuevas sagradas hindues con su estatua dorada de 42.7m", duration: "2-3 horas", category: "cultura" },
      { name: "Jalan Alor Street Food", description: "Explora la calle de comida callejera mas famosa de KL con satay, char kuey teow y durian", duration: "2 horas", category: "gastronomia" },
      { name: "Chinatown (Petaling Street)", description: "Recorre el barrio chino con sus mercados, templos y la mejor comida china-malaya", duration: "2-3 horas", category: "compras" },
      { name: "Menara KL Tower", description: "Sube a la torre de telecomunicaciones para vistas panoramicas de 360 grados de la ciudad", duration: "1-2 horas", category: "cultura" },
      { name: "Islamic Arts Museum", description: "Descubre la coleccion mas grande del sudeste asiatico de arte islamico con mas de 7000 piezas", duration: "2 horas", category: "cultura" },
    ],
    bestTimeToVisit: "Mayo a Julio y Diciembre a Febrero",
    avgBudgetPerDay: "150-250 MYR",
    coordinates: { lat: 3.139, lng: 101.6869 },
  },
  {
    id: "george-town",
    name: "George Town",
    state: "Penang",
    description:
      "Patrimonio de la UNESCO, George Town es un paraiso gastronomico con arte callejero vibrante, arquitectura colonial y la mejor comida callejera de Asia.",
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80",
    highlights: ["Arte callejero", "Comida callejera", "Templos", "Patrimonio UNESCO"],
    activities: [
      { name: "Ruta de Arte Callejero", description: "Descubre los murales de Ernest Zacharevic y las instalaciones de alambre por toda la ciudad", duration: "3-4 horas", category: "cultura" },
      { name: "Char Kuey Teow en Lorong Selamat", description: "Prueba el plato estrella de Penang: fideos de arroz salteados con gambas, berberechos y brotes de soja", duration: "1 hora", category: "gastronomia" },
      { name: "Templo Kek Lok Si", description: "Visita el templo budista mas grande del sudeste asiatico con su pagoda de 7 pisos y estatua de Kuan Yin", duration: "2-3 horas", category: "cultura" },
      { name: "Clan Jetties", description: "Explora los muelles de clan chinos sobre pilotes, comunidades flotantes con siglos de historia", duration: "1-2 horas", category: "cultura" },
      { name: "Penang Hill", description: "Sube en funicular hasta la cima para vistas espectaculares de la isla y el estrecho de Malaca", duration: "3 horas", category: "naturaleza" },
      { name: "Mercado Nocturno de Gurney Drive", description: "Recorre el hawker center mas famoso de Penang junto al mar con cientos de puestos", duration: "2 horas", category: "gastronomia" },
    ],
    bestTimeToVisit: "Diciembre a Marzo",
    avgBudgetPerDay: "120-200 MYR",
    coordinates: { lat: 5.4164, lng: 100.3327 },
  },
  {
    id: "langkawi",
    name: "Langkawi",
    state: "Kedah",
    description:
      "Archipielago de 99 islas paradisiacas con playas de arena blanca, selvas tropicales, aguas cristalinas y status de duty-free. El destino de playa por excelencia de Malasia.",
    image: "https://images.unsplash.com/photo-1609946860441-a51ffcf22208?w=800&q=80",
    highlights: ["Sky Bridge", "Playas", "Duty Free", "Manglar"],
    activities: [
      { name: "Langkawi Sky Bridge y Cable Car", description: "Sube en teleferico hasta 708m de altura y cruza el puente curvo suspendido con vistas a las islas", duration: "3-4 horas", category: "aventura" },
      { name: "Island Hopping Tour", description: "Recorre las islas de Dayang Bunting, Beras Basah y Singa Besar en barco con snorkel", duration: "4-5 horas", category: "playa" },
      { name: "Mangrove Kayak Tour", description: "Navega en kayak por los manglares del Geoparque UNESCO observando aguilas, monos y lagartos", duration: "3 horas", category: "naturaleza" },
      { name: "Pantai Cenang Beach", description: "Relax en la playa mas popular de Langkawi con deportes acuaticos, restaurantes y vida nocturna", duration: "Medio dia", category: "playa" },
      { name: "Compras Duty Free", description: "Aprovecha los precios sin impuestos en chocolate, alcohol, perfumes y electronica", duration: "2-3 horas", category: "compras" },
      { name: "Underwater World", description: "Descubre el acuario mas grande de Malasia con mas de 5000 especies marinas y tunel submarino", duration: "2 horas", category: "naturaleza" },
    ],
    bestTimeToVisit: "Noviembre a Abril",
    avgBudgetPerDay: "200-350 MYR",
    coordinates: { lat: 6.35, lng: 99.8 },
  },
  {
    id: "malacca",
    name: "Malaca (Melaka)",
    state: "Melaka",
    description:
      "Ciudad historica Patrimonio de la UNESCO con 600 anos de historia colonial portuguesa, holandesa y britanica. Famosa por su cocina Peranakan y su rio iluminado.",
    image: "https://images.unsplash.com/photo-1596703548211-4d4c7a4f3b2d?w=800&q=80",
    highlights: ["Jonker Street", "A Famosa", "Rio Malaca", "Cocina Peranakan"],
    activities: [
      { name: "Jonker Street Night Market", description: "Pasea por el mercado nocturno de los viernes y sabados con comida, antigueidades y musica en vivo", duration: "2-3 horas", category: "compras" },
      { name: "A Famosa y Stadthuys", description: "Explora las ruinas de la fortaleza portuguesa del siglo XVI y el edificio holandes rojo mas fotografiado", duration: "2 horas", category: "cultura" },
      { name: "Crucero por el Rio Melaka", description: "Navega de noche por el rio iluminado con murales y puentes historicos a ambos lados", duration: "1 hora", category: "cultura" },
      { name: "Cocina Peranakan / Nyonya", description: "Saborea la fusion unica de sabores chinos y malayos: laksa, cendol y chicken rice balls", duration: "2 horas", category: "gastronomia" },
      { name: "Templo Cheng Hoon Teng", description: "Visita el templo chino mas antiguo de Malasia, construido en 1645", duration: "1 hora", category: "cultura" },
      { name: "The Shore Sky Tower", description: "Sube a la plataforma giratoria de cristal a 43 pisos para vistas aereas de toda Malaca", duration: "1 hora", category: "aventura" },
    ],
    bestTimeToVisit: "Marzo a Octubre",
    avgBudgetPerDay: "100-180 MYR",
    coordinates: { lat: 2.1896, lng: 102.2501 },
  },
  {
    id: "kota-kinabalu",
    name: "Kota Kinabalu",
    state: "Sabah (Borneo)",
    description:
      "Puerta de entrada al Monte Kinabalu y las selvas de Borneo. Ciudad costera con atardeceres espectaculares, islas tropicales y encuentros con la vida salvaje de Borneo.",
    image: "https://images.unsplash.com/photo-1600070978642-59b6b6eeaad4?w=800&q=80",
    highlights: ["Monte Kinabalu", "Islas Tunku Abdul Rahman", "Atardeceres", "Selva"],
    activities: [
      { name: "Ascenso al Monte Kinabalu", description: "Escala el pico mas alto del sudeste asiatico (4095m) con amanecer desde Low's Peak", duration: "2 dias", category: "aventura" },
      { name: "Islas Tunku Abdul Rahman", description: "Snorkel y buceo en las 5 islas del parque marino con aguas cristalinas y corales vibrantes", duration: "1 dia", category: "playa" },
      { name: "Klias Wetland Safari", description: "Crucero al atardecer por los humedales para ver monos narigudos, luciernagas y cocodrilos", duration: "Medio dia", category: "naturaleza" },
      { name: "Filipino Market", description: "Regatea en el mercado mas colorido de Sabah con artesanias, perlas y comida local", duration: "2 horas", category: "compras" },
      { name: "Rafflesia Centre", description: "Busca la flor mas grande del mundo (Rafflesia) en la selva tropical de Borneo", duration: "3 horas", category: "naturaleza" },
      { name: "Signal Hill Observatory", description: "Contempla los mejores atardeceres de Asia desde el mirador sobre la ciudad y las islas", duration: "1-2 horas", category: "naturaleza" },
    ],
    bestTimeToVisit: "Marzo a Octubre",
    avgBudgetPerDay: "180-300 MYR",
    coordinates: { lat: 5.9804, lng: 116.0735 },
  },
  {
    id: "kuching",
    name: "Kuching",
    state: "Sarawak (Borneo)",
    description:
      "La encantadora 'Ciudad de los Gatos' en Borneo, capital cultural de Sarawak con orangutanes, pueblos indigenas, selvas primarias y el waterfront mas bonito de Malasia.",
    image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=800&q=80",
    highlights: ["Orangutanes", "Selvas", "Cultura Iban", "Waterfront"],
    activities: [
      { name: "Semenggoh Wildlife Centre", description: "Observa orangutanes semi-salvajes durante la hora de alimentacion en su habitat natural", duration: "3 horas", category: "naturaleza" },
      { name: "Bako National Park", description: "Trekking en el parque nacional mas antiguo de Sarawak con monos narigudos y playas escondidas", duration: "1 dia", category: "naturaleza" },
      { name: "Sarawak Cultural Village", description: "Explora el 'museo viviente' con 7 casas tradicionales de las etnias de Borneo", duration: "3-4 horas", category: "cultura" },
      { name: "Kuching Waterfront", description: "Pasea por el malecon del rio Sarawak con cafes, monumentos y vistas al Astana (palacio)", duration: "2 horas", category: "cultura" },
      { name: "Comida de Sarawak", description: "Prueba el Laksa Sarawak (nombrado por Bourdain como el mejor desayuno del mundo) y el Kolo Mee", duration: "2 horas", category: "gastronomia" },
      { name: "Longhouse Experience", description: "Pernocta en una casa larga Iban tradicional y comparte arroz tuak con la comunidad indigena", duration: "1-2 dias", category: "aventura" },
    ],
    bestTimeToVisit: "Abril a Septiembre",
    avgBudgetPerDay: "120-200 MYR",
    coordinates: { lat: 1.5535, lng: 110.3593 },
  },
  {
    id: "cameron-highlands",
    name: "Cameron Highlands",
    state: "Pahang",
    description:
      "Las tierras altas mas famosas de Malasia con plantaciones de te infinitas, fresas frescas, bosques de musgo misterioso y temperaturas frescas que recuerdan a la primavera europea.",
    image: "https://images.unsplash.com/photo-1591794474529-4f98a422cf76?w=800&q=80",
    highlights: ["Plantaciones de te", "Fresas", "Mossy Forest", "Trekking"],
    activities: [
      { name: "BOH Tea Plantation", description: "Recorre las plantaciones de te mas grandes de Malasia y degusta te fresco con vistas al valle", duration: "2-3 horas", category: "naturaleza" },
      { name: "Mossy Forest", description: "Camina por el bosque nuboso a 2000m cubierto de musgo, helechos y orquideas raras", duration: "2-3 horas", category: "naturaleza" },
      { name: "Strawberry Farm", description: "Recoge fresas frescas directamente del campo y prueba helado y batidos de fresa artesanales", duration: "1-2 horas", category: "gastronomia" },
      { name: "Trekking por senderos numerados", description: "Explora los 14 senderos oficiales que atraviesan la selva montana con cascadas escondidas", duration: "3-5 horas", category: "aventura" },
      { name: "Lavender Garden", description: "Visita el jardin de lavanda y flores tropicales con invernaderos de mariposas", duration: "1-2 horas", category: "naturaleza" },
      { name: "Steamboat Dinner", description: "Cena hot pot chino-malayo con verduras de la zona y el famoso te de Cameron con scones", duration: "2 horas", category: "gastronomia" },
    ],
    bestTimeToVisit: "Todo el ano (temp. 15-25 C)",
    avgBudgetPerDay: "100-180 MYR",
    coordinates: { lat: 4.4718, lng: 101.3791 },
  },
  {
    id: "perhentian-islands",
    name: "Islas Perhentian",
    state: "Terengganu",
    description:
      "Las islas mas paradisiacas de la costa este con aguas turquesas, tortugas marinas, arrecifes de coral pristinos y un ambiente mochilero relajado. El Caribe de Asia.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    highlights: ["Snorkel con tortugas", "Playas virgenes", "Buceo", "Bioluminiscencia"],
    activities: [
      { name: "Snorkel con Tortugas", description: "Nada junto a tortugas verdes y carey en Turtle Point, uno de los mejores spots de Asia", duration: "2-3 horas", category: "playa" },
      { name: "Buceo en Shark Point", description: "Bucea con tiburones de punta negra, rayas y barracudas en aguas cristalinas (desde 100 MYR)", duration: "3 horas", category: "aventura" },
      { name: "Long Beach", description: "Relax en la playa mas popular de Perhentian Kecil con arena blanca y palmeras", duration: "Medio dia", category: "playa" },
      { name: "Jungle Trekking", description: "Cruza la selva entre playas de Perhentian Besar con senderos entre rocas y raices gigantes", duration: "2-3 horas", category: "aventura" },
      { name: "Plancton Bioluminiscente", description: "Tour nocturno en kayak para ver el plancton brillar en azul neon bajo las estrellas", duration: "1-2 horas", category: "naturaleza" },
      { name: "Fishing Village Tour", description: "Visita el pueblo pesquero local y prueba el ikan bakar (pescado a la parrilla) mas fresco", duration: "2 horas", category: "gastronomia" },
    ],
    bestTimeToVisit: "Marzo a Octubre (cerrado Nov-Feb)",
    avgBudgetPerDay: "150-250 MYR",
    coordinates: { lat: 5.9079, lng: 102.7516 },
  },
  {
    id: "ipoh",
    name: "Ipoh",
    state: "Perak",
    description:
      "La joya escondida de Malasia, antigua ciudad minera con la mejor comida del pais, templos en cuevas espectaculares, arte callejero emergente y un encanto colonial autentico.",
    image: "https://images.unsplash.com/photo-1590125234668-b6f1a5691d10?w=800&q=80",
    highlights: ["Comida increible", "Templos en cuevas", "Arte callejero", "Old Town"],
    activities: [
      { name: "Ipoh White Coffee", description: "Degusta el famoso cafe blanco de Ipoh en la Old Town, cremoso y dulce como ningun otro", duration: "1 hora", category: "gastronomia" },
      { name: "Sam Poh Tong Temple", description: "Explora el templo budista dentro de una cueva de piedra caliza con jardines y estanques de koi", duration: "1-2 horas", category: "cultura" },
      { name: "Concubine Lane", description: "Pasea por el callejon historico con tiendas vintage, cafes hipster y arte callejero", duration: "2 horas", category: "compras" },
      { name: "Ipoh Hor Fun", description: "Prueba los fideos de arroz planos mas suaves y sedosos del pais, especialidad local", duration: "1 hora", category: "gastronomia" },
      { name: "Kellie's Castle", description: "Visita la mansion inacabada de estilo colonial escoces-moro con pasadizos secretos", duration: "2 horas", category: "cultura" },
      { name: "Lost World of Tambun", description: "Diviertete en el parque tematico con aguas termales naturales, toboganes y cuevas", duration: "Medio dia", category: "aventura" },
    ],
    bestTimeToVisit: "Enero a Abril",
    avgBudgetPerDay: "80-150 MYR",
    coordinates: { lat: 4.5975, lng: 101.0901 },
  },
  {
    id: "taman-negara",
    name: "Taman Negara",
    state: "Pahang",
    description:
      "La selva tropical mas antigua del mundo con 130 millones de anos, hogar de tigres malayos, elefantes asiaticos y experiencias de supervivencia en la jungla primigenia.",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?w=800&q=80",
    highlights: ["Selva 130M anos", "Canopy Walk", "Vida salvaje", "Rios"],
    activities: [
      { name: "Canopy Walkway", description: "Camina por la pasarela colgante mas larga del mundo (530m) a 40m de altura sobre la selva", duration: "1-2 horas", category: "aventura" },
      { name: "Night Jungle Walk", description: "Safari nocturno a pie con guia para ver insectos gigantes, serpientes y ojos brillantes en la oscuridad", duration: "2-3 horas", category: "aventura" },
      { name: "Rapid Shooting", description: "Remontar los rapidos del rio Tembeling en barco motorizado entre selva virgen", duration: "2-3 horas", category: "aventura" },
      { name: "Orang Asli Village", description: "Visita una comunidad aborigen y aprende tecnicas de caza con cerbatana y supervivencia", duration: "2-3 horas", category: "cultura" },
      { name: "Fishing en el Rio Tahan", description: "Pesca del famoso pez Kelah (mahseer) en aguas cristalinas rodeado de selva virgen", duration: "Medio dia", category: "naturaleza" },
      { name: "Lata Berkoh Waterfall", description: "Trekking de 2 horas hasta las cascadas escalonadas con piscinas naturales para banarse", duration: "4-5 horas", category: "naturaleza" },
    ],
    bestTimeToVisit: "Febrero a Septiembre",
    avgBudgetPerDay: "150-280 MYR",
    coordinates: { lat: 4.3833, lng: 102.3833 },
  },
];

export const malaysianRegions = [
  { name: "Peninsula Oeste", cities: ["Kuala Lumpur", "George Town", "Ipoh", "Malaca", "Cameron Highlands"] },
  { name: "Peninsula Este", cities: ["Islas Perhentian", "Taman Negara", "Kuala Terengganu", "Kota Bharu"] },
  { name: "Borneo Malasio", cities: ["Kota Kinabalu", "Kuching", "Sandakan", "Miri"] },
  { name: "Islas", cities: ["Langkawi", "Islas Perhentian", "Tioman", "Redang", "Sipadan"] },
];

export const categoryIcons: Record<string, string> = {
  cultura: "landmark",
  naturaleza: "trees",
  gastronomia: "utensils",
  aventura: "mountain",
  compras: "shopping-bag",
  playa: "umbrella",
};

export const categoryColors: Record<string, string> = {
  cultura: "bg-purple-100 text-purple-700",
  naturaleza: "bg-green-100 text-green-700",
  gastronomia: "bg-orange-100 text-orange-700",
  aventura: "bg-red-100 text-red-700",
  compras: "bg-blue-100 text-blue-700",
  playa: "bg-cyan-100 text-cyan-700",
};
