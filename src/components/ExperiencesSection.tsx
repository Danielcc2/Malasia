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
  ChevronRight,
  ChevronLeft,
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
  subCategory?: string;
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
    subtitle: "Kayak, tirolina, rafting, buceo y mucho mas",
    experiences: [
      {
        name: "Kayak en los manglares de Langkawi",
        location: "Langkawi, Kedah",
        description: "Navega entre manglares centenarios con aguilas de mar sobrevolando tu cabeza. Tours de 2-3h con guia y equipo incluido. El ecosistema de manglares de Langkawi es Patrimonio UNESCO y uno de los mas sanos del mundo.",
        price: "80-150 MYR",
        priceEur: "17-32 EUR",
        tip: "Reserva el tour del atardecer, los colores son espectaculares y hay menos turistas.",
        stars: 5,
      },
      {
        name: "Tirolina en la selva de Penang",
        location: "Penang Hill, George Town",
        description: "Vuela sobre el dosel de la selva tropical a 30m de altura. Circuito de 8 plataformas con vistas increibles a George Town y el estrecho de Malaca. Operado por Penang Hill Adventure.",
        price: "120-180 MYR",
        priceEur: "25-38 EUR",
        tip: "Ve por la manana para evitar lluvias vespertinas y las colas de turistas.",
        stars: 4,
      },
      {
        name: "White water rafting en Gopeng",
        location: "Gopeng, Perak",
        description: "Rafting en rapidos de clase III-IV en el rio Kampar. Solo 2h desde KL, perfecto para un dia de aventura. El recorrido dura unas 2 horas entre rapidos, piscinas naturales y selva virgen.",
        price: "100-160 MYR",
        priceEur: "21-34 EUR",
        tip: "Nivel principiante apto, no se necesita experiencia. Llevan todo el material.",
        stars: 5,
      },
      {
        name: "Buceo en Pulau Sipadan",
        location: "Sipadan, Sabah",
        description: "Considerado top 3 del mundo. Tortugas, tiburones martillo y paredes de coral a pico. La isla emerge de un volcan submarino de 600m. Plazas muy limitadas, solo 120 personas al dia.",
        price: "350-500 MYR",
        priceEur: "74-106 EUR",
        tip: "Reserva con 3-6 meses de antelacion, solo 120 personas al dia tienen permiso.",
        stars: 5,
      },
      {
        name: "Snorkel nocturno bioluminiscente",
        location: "Islas Perhentian",
        description: "Nada en la oscuridad mientras el plancton ilumina el agua en azul neon a tu alrededor. Una experiencia magica que no olvidaras. Los tours salen desde los bungalows de la playa.",
        price: "60-90 MYR",
        priceEur: "13-19 EUR",
        tip: "Los meses de mayo a agosto son los mejores para ver el fenomeno bioluminiscente.",
        stars: 5,
      },
      {
        name: "Escalada en roca en Batu Caves",
        location: "Batu Caves, Kuala Lumpur",
        description: "Las paredes de piedra caliza de 400 millones de anos ofrecen rutas de escalada para todos los niveles junto a los templos hindues. Mas de 150 rutas de dificultad variada.",
        price: "50-100 MYR",
        priceEur: "11-21 EUR",
        tip: "Contrata un guia local certificado, conocen las mejores rutas y el equipo esta incluido.",
        stars: 4,
      },
      {
        name: "Ascenso al Monte Kinabalu",
        location: "Parque Nacional Kinabalu, Sabah",
        description: "Escala el pico mas alto del sudeste asiatico (4095m) y ve el amanecer desde Low's Peak sobre las nubes. La ruta dura 2 dias con pernoctacion en el refugio Laban Rata a 3270m.",
        price: "600-900 MYR (guia+pernocta)",
        priceEur: "127-191 EUR",
        tip: "Reserva el permiso con meses de antelacion en el portal oficial del parque. Las plazas se agotan.",
        stars: 5,
      },
      {
        name: "Parapente en Bukit Jugra",
        location: "Banting, Selangor",
        description: "Vuela en parapente tandem sobre las colinas de Selangor con vistas al estrecho de Malaca. Vuelos de 15-20 minutos con instructores certificados. El mejor spot de parapente de la peninsula.",
        price: "200-300 MYR",
        priceEur: "42-64 EUR",
        tip: "Los mejores dias son de noviembre a marzo con vientos favorables del noreste.",
        stars: 4,
      },
      {
        name: "Surf en Cherating Beach",
        location: "Cherating, Pahang",
        description: "La playa mas famosa para surfear en la costa este. Olas de 1-2m ideales para principiantes. Escuelas de surf con tablas de alquiler y clases desde cero. Temporada alta de noviembre a marzo.",
        price: "80-150 MYR (clase+tabla)",
        priceEur: "17-32 EUR",
        tip: "Cherating es la cuna del surf en Malasia. El ambiente es muy relajado y los locales son muy amigables.",
        stars: 4,
      },
      {
        name: "Trekking nocturno en Taman Negara",
        location: "Taman Negara, Pahang",
        description: "Aventura nocturna por la selva mas antigua del mundo (130 millones de anos) con guia experto. Verasnakes, tarántulas, ciempiés gigantes y si tienes suerte, ojos de leopardo en la oscuridad.",
        price: "80-120 MYR",
        priceEur: "17-25 EUR",
        tip: "Lleva repelente fuerte (DEET 50%), botas cerradas y linterna frontal. El guia incluye el equipo.",
        stars: 5,
      },
      {
        name: "Wakeboard en Putrajaya",
        location: "Putrajaya, Wilayah",
        description: "Practica wakeboard y esqui acuatico en el lago artificial de la ciudad administrativa. Instalaciones modernas, instructores certificados y equipo de primera calidad.",
        price: "80-150 MYR por hora",
        priceEur: "17-32 EUR",
        tip: "El Putrajaya Waterski & Wakeboard Club es el mejor del pais. Los fines de semana organizan competiciones.",
        stars: 3,
      },
      {
        name: "Canopy Walk en Taman Negara",
        location: "Taman Negara, Pahang",
        description: "Camina por la pasarela colgante mas larga del mundo (530m) a 40m de altura entre los arboles gigantes. Una perspectiva unica de la selva tropical que deja sin palabras.",
        price: "5 MYR",
        priceEur: "1 EUR",
        tip: "Llega justo cuando abre a las 9am. Las tardes suelen tener lluvia y la pasarela se cierra.",
        stars: 5,
      },
      {
        name: "Kitesurf en Pantai Besar",
        location: "Kuala Rompin, Pahang",
        description: "Spot de kitesurf de clase mundial con vientos constantes del monzon. Cursos para principiantes y alquiler para expertos. Aguas poco profundas perfectas para aprender.",
        price: "300-500 MYR (curso 3h)",
        priceEur: "64-106 EUR",
        tip: "Temporada perfecta de noviembre a febrero. Fuera de temporada el viento es irregular.",
        stars: 4,
      },
      {
        name: "Ciclismo de montana en Bukit Timah",
        location: "Fraser's Hill, Pahang",
        description: "Rutas de mountain bike entre colinas con plantaciones de te, cascadas y aldeas remotas. Alquiler de bicicletas y tours guiados disponibles. Dificultad variada de facil a experto.",
        price: "50-120 MYR",
        priceEur: "11-25 EUR",
        tip: "Fraser's Hill tiene el clima mas fresco de Malasia peninsular. Perfecto para pedalear sin sudar demasiado.",
        stars: 4,
      },
      {
        name: "Pesca deportiva en alta mar",
        location: "Rompin / Mersing, Johor",
        description: "Pesca del marlin azul y el pez vela en las aguas del Mar del Sur de China. Los mejores meses son de febrero a abril cuando los peces siguen las corrientes calidas.",
        price: "500-1200 MYR por barco",
        priceEur: "106-254 EUR",
        tip: "Compartir barco con otros pescadores sale a 150-250 MYR por persona. Lleva medicacion para el mareo.",
        stars: 5,
      },
      {
        name: "Espeleologia en Mulu Caves",
        location: "Parque Nacional Mulu, Sarawak",
        description: "Explora Deer Cave (la cueva de paso mas grande del mundo) y Clearwater Cave (la mas larga de Asia). Circuitos de aventura para espeleologos con rapel y gateo por pasajes ocultos.",
        price: "200-500 MYR",
        priceEur: "42-106 EUR",
        tip: "El espectaculo de 3 millones de murcielagos saliendo de Deer Cave al atardecer es uno de los mas impresionantes del planeta.",
        stars: 5,
      },
      {
        name: "Rafting en el rio Pelagus",
        location: "Kapit, Sarawak",
        description: "Rafting de expedicion por los rapidos Pelagus en el corazon de Borneo. Rodeado de selva virgen sin carreteras, solo accesible en barco. Una aventura de verdad para amantes del riesgo.",
        price: "250-400 MYR",
        priceEur: "53-85 EUR",
        tip: "Solo disponible en epoca de lluvia (octubre-enero) cuando el nivel del rio es suficiente.",
        stars: 5,
      },
      {
        name: "Sandboarding en las dunas de Penarik",
        location: "Penarik, Terengganu",
        description: "Deslizate por las dunas de arena blanca de la costa de Terengganu con una tabla. Una actividad poco conocida y baratisima que los locales practican de forma espontanea.",
        price: "20-40 MYR (alquiler tabla)",
        priceEur: "4-8.50 EUR",
        tip: "Las dunas son mejores al amanecer antes de que el calor las ablande. Lleva gafas de sol.",
        stars: 3,
      },
      {
        name: "ATV en las plantaciones de Sabah",
        location: "Kota Belud, Sabah",
        description: "Conduce un quad ATV por pistas de tierra roja entre plantaciones de palma y aldeas del pueblo Bajau. Con vistas al Monte Kinabalu al fondo. Tours de 1-3 horas.",
        price: "120-250 MYR",
        priceEur: "25-53 EUR",
        tip: "Los tours de manana tienen mejor visibilidad del Kinabalu sin nubes. Llevan casco y guantes.",
        stars: 4,
      },
      {
        name: "Paddle surf (SUP) en las Islas Redang",
        location: "Pulau Redang, Terengganu",
        description: "Paddle surf en aguas cristalinas de color turquesa sobre arrecifes de coral. Puedes ver tortugas y peces de colores directamente desde la tabla. Alquiler disponible en todos los resorts.",
        price: "40-70 MYR por hora",
        priceEur: "8.50-15 EUR",
        tip: "La mejor hora es de 7-9am antes de que el viento levante. El agua esta en calma absoluta.",
        stars: 5,
      },
      {
        name: "Via ferrata en Monte Kinabalu",
        location: "Parque Nacional Kinabalu, Sabah",
        description: "La via ferrata mas alta del mundo (3776m) con vistas espectaculares. Circuito Low's Peak con cables de acero fijos en la roca granítica. Adrenalina pura sobre las nubes de Borneo.",
        price: "400-600 MYR",
        priceEur: "85-127 EUR",
        tip: "Requiere buen estado fisico. Se combina con el ascenso al Kinabalu en 2 dias. Reserva con antelacion.",
        stars: 5,
      },
      {
        name: "Trekking al crater del Monte Jerai",
        location: "Yan, Kedah",
        description: "Senderismo hasta la cima del Monte Jerai (1217m) con vistas panoramicas sobre los arrozales de Kedah y el estrecho de Malaca. Sendero bien marcado de 4-5h ida y vuelta.",
        price: "20-50 MYR (guia opcional)",
        priceEur: "4-11 EUR",
        tip: "Empieza antes de las 7am para evitar el calor. En la cima hay un resort con restaurante y terrazas.",
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
    subtitle: "Replicas, mercados nocturnos, batik y los mejores chollos de Asia",
    experiences: [
      {
        name: "Petaling Street — El rey de las replicas",
        location: "Chinatown, Kuala Lumpur",
        description: "El mercado mas famoso de KL para replicas de Nike, Adidas, Supreme, Gucci, Louis Vuitton, Rolex y mas. Los vendedores sacan las mejores piezas de bolsas o cuartos traseros si les preguntas con confianza. Hay ropa, bolsos, relojes, gafas Ray-Ban y cinturones.",
        price: "10-80 MYR por articulo",
        priceEur: "2-17 EUR",
        tip: "Ofrece siempre el 40% del precio pedido. Si dices 'last price?' suelen bajar otro 10-15%. Compra varios articulos al mismo vendedor para descuento extra.",
        stars: 5,
      },
      {
        name: "Sungai Wang Plaza — Replicas de nivel",
        location: "Bukit Bintang, Kuala Lumpur",
        description: "Centro comercial de 6 plantas con cientos de tiendas pequeñas especializadas en replicas de alta calidad. Aqui encuentras replicas AAA de zapatillas Nike, Jordan, Yeezy, bolsos Michael Kors, Chanel y ropa de marcas de lujo a precios increibles.",
        price: "30-150 MYR por articulo",
        priceEur: "6-32 EUR",
        tip: "Las tiendas del sotano y planta baja tienen mejores precios. Busca las que tienen muchos locales mirando, es señal de buena relacion calidad-precio.",
        stars: 5,
      },
      {
        name: "Jalan Tuanku Abdul Halim — Zapatillas replica",
        location: "Kuala Lumpur",
        description: "Conocida como 'Sneaker Street', esta calle entera esta dedicada a zapatillas replica y originales de segunda mano. Jordan 1, Nike Dunk, Yeezy 350, New Balance 550 y Travis Scott a precios imposibles en Europa.",
        price: "60-200 MYR por par",
        priceEur: "13-42 EUR",
        tip: "Los vendedores saben distinguir originales de replicas. Pregunta directamente 'is this OG or rep?' y te seran honestos sobre la calidad.",
        stars: 5,
      },
      {
        name: "Chow Kit Market — El mercado de los locales",
        location: "Chow Kit, Kuala Lumpur",
        description: "Mercado enorme donde compran los malayos. Ropa local baratisima, telas de batik al por mayor, tejidos tradicionales y accesorios a precios de coste. Lejos del turismo, precios reales.",
        price: "5-40 MYR",
        priceEur: "1-8.50 EUR",
        tip: "Es el mercado mas barato de KL pero tambien el mas desordenado. Lleva efectivo y ten cuidado con los bolsillos.",
        stars: 4,
      },
      {
        name: "Jonker Street Night Market",
        location: "Malaca",
        description: "Los viernes y sabados se llena de vendedores con ropa vintage, artesania Peranakan, batik autentico y antigueidades. Ambiente unico en una calle colonial patrimonio UNESCO. Perfecto para comprar ropa tipica malaya y souvenirs originales.",
        price: "15-100 MYR",
        priceEur: "3-21 EUR",
        tip: "Los articulos de batik son autenticos y mas baratos que en KL. Los abanicos de madera tallada y las porcelanas Peranakan son los mejores regalos.",
        stars: 5,
      },
      {
        name: "Central Market (Pasar Seni) — Artesania y batik",
        location: "Kuala Lumpur",
        description: "Mercado colonial de 1888 reconvertido en galeria de artesania nacional. Batik pintado a mano, madera tallada, pewter (estano malasio), ropa tradicional baju kurung y kebaya. Todo autentico y con calidad garantizada.",
        price: "20-300 MYR",
        priceEur: "4-64 EUR",
        tip: "Los articulos de pewter Royal Selangor son la compra mas tipica de Malasia. La fabrica tiene visitas gratuitas en Sentul y puedes hacer tu propia pieza.",
        stars: 4,
      },
      {
        name: "Duty Free de Langkawi — Electronica y lujo sin impuestos",
        location: "Langkawi, Kedah",
        description: "Toda la isla de Langkawi es zona libre de impuestos. Perfumes Dior, Chanel y YSL hasta un 40% mas baratos. Camaras, drones, electronica y chocolates Ferrero a precios de escandalo. El mejor sitio de Malasia para compras premium.",
        price: "Sin impuestos (ahorro 20-40%)",
        priceEur: "Mucho mas barato que Europa",
        tip: "Al volver a la peninsula puedes traer hasta 500 MYR en articulos libres de impuesto. Guarda los tickets por si te revisan.",
        stars: 5,
      },
      {
        name: "Pasar Malam de Taman Connaught",
        location: "Cheras, Kuala Lumpur",
        description: "El mercado nocturno mas grande de Malasia, activo cada miercoles con mas de 700 puestos. Ropa, zapatos, bolsos, accesorios y comida en 2km de calle cortada al trafico. Una experiencia sensorial unica.",
        price: "5-60 MYR",
        priceEur: "1-13 EUR",
        tip: "Solo los miercoles de 5pm a 11pm. Lleva bolsas grandes, compras mucho mas de lo que planeas.",
        stars: 5,
      },
      {
        name: "Kompleks Kraftangan — Artesania oficial",
        location: "Kuala Lumpur",
        description: "Centro oficial de artesania malaya gestionado por el gobierno. Garantia de autenticidad en todo lo que vendes: batik, kain songket (tela de oro), ceramica, sombreros y cestas tejidas a mano.",
        price: "30-500 MYR",
        priceEur: "6-106 EUR",
        tip: "Los precios estan fijos y son justos. Si quieres regalar algo autentico y de calidad sin regatear, este es el sitio.",
        stars: 4,
      },
      {
        name: "Gurney Plaza Penang — Moda local de calidad",
        location: "George Town, Penang",
        description: "Centro comercial de referencia en Penang con marcas locales como Padini, Bonia y Voir que ofrecen ropa de calidad a precios muy por debajo de marcas europeas equivalentes. Perfecto para ropa casual y formal.",
        price: "40-200 MYR por prenda",
        priceEur: "8.50-42 EUR",
        tip: "Padini tiene una calidad sorprendente para el precio. Sus colecciones de ropa formal cuestan 3-4 veces menos que en Europa.",
        stars: 4,
      },
      {
        name: "KL Tower Flea Market — Vintage y segunda mano",
        location: "Kuala Lumpur",
        description: "Mercadillo mensual a los pies de la Torre KL con ropa de segunda mano, vintage y handmade. Encontraras camisetas originales de los 90, vinilos, accesorios DIY y curiosidades imposibles de encontrar en otra parte.",
        price: "5-80 MYR",
        priceEur: "1-17 EUR",
        tip: "Se celebra el primer sabado de cada mes. Sigue la cuenta @KLTowerFleaMarket en Instagram para confirmar fechas.",
        stars: 4,
      },
      {
        name: "Kompleks PKNS Shah Alam — Replicas economicas",
        location: "Shah Alam, Selangor",
        description: "Centro comercial poco conocido por turistas pero famoso entre locales por sus tiendas de replicas baratas. Ropa deportiva, calzado y accesorios a los precios mas bajos de la region. A 30 min de KL en tren.",
        price: "15-80 MYR",
        priceEur: "3-17 EUR",
        tip: "Los martes y jueves hay mas stock nuevo. Conocido como el 'mercado secreto' entre los estudiantes universitarios de la zona.",
        stars: 3,
      },
      {
        name: "Bangsar Sunday Market",
        location: "Bangsar, Kuala Lumpur",
        description: "Mercado dominical en el barrio trendy de KL con mezcla de productos organicos, ropa local de disenadores independientes, vintage seleccionado y accesorios artesanales. El mas hipster de la ciudad.",
        price: "30-200 MYR",
        priceEur: "6-42 EUR",
        tip: "El mercado empieza a las 8am y los mejores puestos se vacian antes de las 11am. Lleva cash.",
        stars: 4,
      },
      {
        name: "Imago Mall KK — Replicas en Borneo",
        location: "Kota Kinabalu, Sabah",
        description: "Centro comercial moderno en Kota Kinabalu con varios pisos de tiendas de replicas y moda local. Aqui las replicas son incluso mas baratas que en KL por menor competencia y menos turistas.",
        price: "20-100 MYR",
        priceEur: "4-21 EUR",
        tip: "El sotano tiene los precios mas ajustados. Los vendedores son mas negociables que en KL porque hay menos turistas.",
        stars: 3,
      },
      {
        name: "Gaya Street Sunday Market",
        location: "Kota Kinabalu, Sabah",
        description: "El mejor mercado dominical de Borneo activo desde 1918. Decenas de puestos con artesania indigena, tejidos kadazan, instrumentos musicales tradicionales, replicas y souvenirs unicos de Sabah.",
        price: "10-150 MYR",
        priceEur: "2-32 EUR",
        tip: "Solo los domingos de 6am a 12pm. El ambiente de madrugada con la niebla y los locales tomando cafe es especial.",
        stars: 5,
      },
      {
        name: "Little India Brickfields — Telas y accesorios",
        location: "Brickfields, Kuala Lumpur",
        description: "El barrio indio de KL rebosa tiendas de telas de sari, accesorios dorados, sandalias artesanales y ropa tradicional india a precios locales. Ideal para comprar telas unicas y bisuteria llamativa.",
        price: "10-150 MYR",
        priceEur: "2-32 EUR",
        tip: "Las mejores tiendas de telas estan en las calles secundarias detras de la calle principal. Regatear es completamente normal.",
        stars: 4,
      },
      {
        name: "Kota Raya Complex — El clasico de las replicas",
        location: "Chinatown, Kuala Lumpur",
        description: "Justo al lado de Petaling Street, este complejo de 5 plantas es el lugar donde los vendedores de replicas guardan el stock mas exclusivo. Relojes Rolex, Omega, bolsos Hermes y ropa de lujo imitacion de muy buena calidad.",
        price: "50-300 MYR por articulo",
        priceEur: "11-64 EUR",
        tip: "Las tiendas del piso 3 y 4 tienen la mejor seleccion de relojes replica. Pide ver el catalogo completo, no todo esta expuesto.",
        stars: 4,
      },
      {
        name: "Pavilion KL — Marcas originales a precios asiaticos",
        location: "Bukit Bintang, Kuala Lumpur",
        description: "El centro comercial mas lujoso de KL con Zara, H&M, Uniqlo y marcas locales premium. Los precios de Zara y H&M son un 20-30% mas baratos que en Europa por menores impuestos y costes locales.",
        price: "50-400 MYR",
        priceEur: "11-85 EUR",
        tip: "Uniqlo Malasia tiene exclusivos Asia-Pacific que no se venden en Europa. Los ultrafleece y los Heattech cuestan 30% menos que online.",
        stars: 4,
      },
      {
        name: "Pekan Rabu Market — Artesania de Kedah",
        location: "Alor Setar, Kedah",
        description: "Mercado tradicional de 5 plantas en la capital de Kedah con productos locales autenticos: batik de Kedah (diferente al de KL), sampin tejidos, dulces locales y artesania imposible de encontrar en las ciudades turisticas.",
        price: "5-100 MYR",
        priceEur: "1-21 EUR",
        tip: "Muy poca presencia turistica, los precios son para locales. El batik de Kedah tiene colores mas sobrios y elegantes que el de Penang.",
        stars: 4,
      },
      {
        name: "Nilai 3 Wholesale City — Compra al por mayor",
        location: "Nilai, Negeri Sembilan",
        description: "El mayor centro de venta al por mayor de Malasia con 600+ tiendas. Ropa, telas, accesorios, calzado y todo tipo de articulos a precios de fabrica. Ideal si quieres comprar mucho o hacer negocio.",
        price: "3-30 MYR por articulo (al por mayor)",
        priceEur: "0.60-6 EUR",
        tip: "Esta a 45min de KL en tren (KTM Seremban line). La mayoria de tiendas tienen minimo 6-12 unidades, pero muchas venden de 1 en 1 a turistas.",
        stars: 4,
      },
      {
        name: "Kompleks Antarabangsa — Relojes y electronicos replica",
        location: "Kuala Lumpur",
        description: "Complejo especializado en electronicos y relojes replica de alta gama. Replicas de Apple Watch, Samsung, Rolex Submariner, Patek Philippe y Audemars Piguet con mecanismos de calidad aceptable para el precio.",
        price: "80-400 MYR por reloj",
        priceEur: "17-85 EUR",
        tip: "Pide ver el mecanismo antes de comprar un reloj. Los mejores tienen movimiento japones Miyota que dura anos. Evita los con movimiento chino barato.",
        stars: 3,
      },
      {
        name: "Tamu Kianggeh — Mercado tradicional de Brunei/Sabah",
        location: "Sandakan / Kota Kinabalu, Sabah",
        description: "Mercados tradicionales de los indigenas de Borneo con productos unicos: tejidos Iban a mano, cestas de ratan, accesorios de plumas, collares tribales y prendas con bordados tradicionales de Kadazan y Murut.",
        price: "20-200 MYR",
        priceEur: "4-42 EUR",
        tip: "Estos articulos son autenticos y unicos. No encontraras estos tejidos tribales en ningun otro lugar del mundo. Merece la pena pagar el precio justo.",
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
    subtitle: "Street food, hawker centres, platos emblematicos y restaurantes imprescindibles",
    experiences: [
      {
        name: "Jalan Alor — La calle de la comida nocturna",
        location: "Bukit Bintang, Kuala Lumpur",
        description: "La calle de street food mas famosa de KL cobra vida cada noche con decenas de puestos: satay a la brasa, char kuey teow, BBQ seafood, durian fresco y zumos de frutas tropicales. El ambiente a las 9pm es unico.",
        price: "5-30 MYR por plato",
        priceEur: "1-6 EUR",
        tip: "Ve entre las 8-10pm para el maximo ambiente. El puesto de satay del numero 21 lleva 40 anos siendo el mejor de la calle.",
        stars: 5,
      },
      {
        name: "Nasi Lemak en Kampung Baru",
        location: "Kampung Baru, Kuala Lumpur",
        description: "El plato nacional malasio: arroz cocido en leche de coco envuelto en hoja de platano, servido con sambal picante, anchoas fritas crujientes, cacahuetes tostados, pepino y huevo. En el barrio malayo mas autentico de KL.",
        price: "3-8 MYR",
        priceEur: "0.60-1.70 EUR",
        tip: "Desayuna ahi a las 7am con los taxistas y trabajadores locales. El puesto de la senora Hamidah abre desde las 6am y es el mejor.",
        stars: 5,
      },
      {
        name: "Laksa Sarawak — El mejor desayuno del mundo",
        location: "Chong Choon Cafe, Kuching",
        description: "Anthony Bourdain la llamo literalmente el mejor desayuno del mundo. Sopa con base de coco y pasta de gambas fermentada, fideos de arroz, gambas, pollo desmenuzado, huevo y sambal belacan. Unica en Sarawak.",
        price: "6-12 MYR",
        priceEur: "1.30-2.50 EUR",
        tip: "El sitio original de Chong Choon Cafe en Carpenter Street abre de 6:30am. Llega antes de las 9am, se agota todos los dias.",
        stars: 5,
      },
      {
        name: "Char Kuey Teow de Lorong Selamat",
        location: "Lorong Selamat, George Town, Penang",
        description: "Fideos de arroz planos salteados a fuego muy alto en wok de hierro con gambas frescas, berberechos, brotes de soja, cebollino y salsa negra de soja. La receta mas famosa de Penang, cocinada por la misma familia desde 1970.",
        price: "8-15 MYR",
        priceEur: "1.70-3.20 EUR",
        tip: "Busca el puesto de la senora de Lorong Selamat. La cola puede ser de 30-40 min pero cada plato vale la espera absoluta.",
        stars: 5,
      },
      {
        name: "Roti Canai con teh tarik",
        location: "Mamak stalls — en toda Malasia",
        description: "El desayuno mas popular de Malasia: pan plano hojaldrado de origen indio cocinado en plancha con ghee, servido con curry de lentejas dhal o curry de pollo. Acompanado de teh tarik, te con leche condensada estirado hasta hacer espuma.",
        price: "2-5 MYR",
        priceEur: "0.40-1 EUR",
        tip: "Los mamak (restaurantes indio-malayos) abren 24 horas. A las 2am de la madrugada siguen llenos de locales. El roti canai de madrugada tiene algo especial.",
        stars: 5,
      },
      {
        name: "Dim Sum de trolley en Ipoh",
        location: "FMS Bar & Restaurant, Ipoh",
        description: "Ipoh tiene la mejor dim sum fuera de Hong Kong, segun expertos culinarios asiaticos. El FMS Bar lleva 90 anos sirviendo har gow, siu mai, char siu bao y cheung fun desde carros empujados por camareras por el salon.",
        price: "15-40 MYR por persona",
        priceEur: "3-8.50 EUR",
        tip: "Solo abre de 8am a 2pm. Llega a las 9am para sitio y ver los carros llenos. Los domingos hay cola de 45 minutos.",
        stars: 5,
      },
      {
        name: "Pasar Siti Khadijah — Mercado de mujeres",
        location: "Kota Bharu, Kelantan",
        description: "El mercado gastronomico mas colorido de Malasia, operado casi exclusivamente por mujeres malayas. Nasi kerabu (arroz azul teñido con mariposa de bunga telang), ayam percik (pollo en coco asado) y kuih-muih (dulces tradicionales).",
        price: "3-15 MYR por plato",
        priceEur: "0.60-3.20 EUR",
        tip: "El arroz azul de Kelantan es unico en el mundo. El color viene de la flor bunga telang y no tiene sabor artifical. Fotografialo antes de comerlo.",
        stars: 5,
      },
      {
        name: "Gurney Drive Hawker Centre",
        location: "Gurney Drive, George Town, Penang",
        description: "El hawker centre mas famoso de Penang frente al mar con mas de 50 puestos. Asam laksa (laksa agria con caballa), Penang rojak (ensalada de frutas con pasta de gambas), cendol y todas las especialidades de la isla.",
        price: "5-20 MYR por plato",
        priceEur: "1-4 EUR",
        tip: "El asam laksa de Penang es completamente diferente al de KL: agrio, con pescado y sin coco. Prueba los dos para comparar.",
        stars: 5,
      },
      {
        name: "Bak Kut Teh en Klang",
        location: "Klang, Selangor",
        description: "La capital mundial del bak kut teh, costillas de cerdo hervidas durante horas en caldo de hierbas medicinales chinas: ajo, pimienta blanca, canela y estrella de anis. Se come con arroz blanco y you tiao (palitos de pan frito).",
        price: "15-35 MYR por persona",
        priceEur: "3-7.50 EUR",
        tip: "Klang es 45 min de KL y vale el viaje. El restaurante Teluk Pulai BKT lleva 50 anos y es el original. Abre desde las 7am.",
        stars: 5,
      },
      {
        name: "Satay Kajang — El satay original",
        location: "Kajang, Selangor",
        description: "Kajang es tan famosa por su satay que la ciudad se apoda 'Kajang Satay'. Brochetas de pollo y ternera marinadas en cúrcuma y lemongrass, asadas al carbon y servidas con salsa de cacahuete, cetupat (arroz en hoja) y pepino.",
        price: "1-2 MYR por brocheta",
        priceEur: "0.20-0.40 EUR",
        tip: "El restaurante Haji Samuri en Kajang es el mas famoso. Un grupo de 4 personas suele pedir 60-80 brochetas. Es mas barato de lo que parece.",
        stars: 5,
      },
      {
        name: "Ikan Bakar de Umbai",
        location: "Umbai, Malaca",
        description: "Pescado y marisco a la brasa en un pueblo pesquero junto al mar. Calamar, gambas tigre, mejillones y pez pari (raya) cocinados con sambal pedas encima de parrillas de carbon. Con vistas al estrecho de Malaca.",
        price: "30-80 MYR por persona",
        priceEur: "6-17 EUR",
        tip: "Toma el ferry desde Malaca ciudad (5 MYR) al atardecer para cenar alli y volver de noche. La experiencia vale tanto como la comida.",
        stars: 5,
      },
      {
        name: "Hawker centres de Old Klang Road",
        location: "Old Klang Road, Kuala Lumpur",
        description: "La calle de hawkers mas autentica de KL, alejada del turismo. Chefs que llevan 30-40 anos en el mismo puesto cocinando wantan mee, hokkien mee frito, prawn noodle y oyster omelette para los residentes del barrio.",
        price: "5-15 MYR por plato",
        priceEur: "1-3.20 EUR",
        tip: "Los mejores puestos son los que tienen mas clientes locales comiendo. Si no hay cola, el siguiente puesto probablemente es mejor.",
        stars: 4,
      },
      {
        name: "Durian en Pahang — La fruta rey",
        location: "Raub / Bentong, Pahang",
        description: "Pahang produce el mejor durian de Malasia: Musang King, Black Thorn y D24. Comerlo directamente en la plantacion, recien caido del arbol, es una experiencia que los amantes del durian describen como transcendental. Cremoso, intenso y sin el olor de los mercados.",
        price: "30-150 MYR por durian",
        priceEur: "6-32 EUR",
        tip: "El Musang King (Raja Kunyit) es el mas caro y el mejor. Temporada principal de junio a agosto y diciembre a febrero.",
        stars: 5,
      },
      {
        name: "Cendol en Penang — El postre nacional",
        location: "Penang Road Famous Cendol, George Town",
        description: "El cendol original de Penang: gusanos de gelatina de pandan verde, leche de coco fresca, sirope de palma gula melaka y hielo picado. El puesto de Penang Road lleva mas de 80 anos siendo el mejor del pais.",
        price: "4-8 MYR",
        priceEur: "0.85-1.70 EUR",
        tip: "La cola es inevitable pero avanza rapido. Pide el cendol con durian por 5-8 MYR extra. Es la mejor combinacion posible.",
        stars: 5,
      },
      {
        name: "Mamak 24h — Maggi goreng de medianoche",
        location: "En toda Kuala Lumpur",
        description: "Los restaurantes mamak indio-malayos son el corazon social de Malasia. Abiertos las 24 horas, sirven maggi goreng (fideos Maggi salteados con huevo y verduras), murtabak (crepe relleno de carne) y milo ais a cualquier hora.",
        price: "5-12 MYR",
        priceEur: "1-2.50 EUR",
        tip: "Los mejores mamak de KL son Pelita (Jalan Ampang), Restoran Nasi Kandar Pelita y Sri Nirwana Maju en Bangsar. A las 2am es cuando el ambiente es mas especial.",
        stars: 4,
      },
      {
        name: "Kolo Mee en Kuching",
        location: "Kuching, Sarawak",
        description: "El plato mas caracteristico de Sarawak: fideos de huevo secos mezclados con aceite de chalota, vinagre y carne de cerdo picada char siu. Diferente a cualquier noodle dish del resto de Malasia. Cada cocinero tiene su receta secreta.",
        price: "6-12 MYR",
        priceEur: "1.30-2.50 EUR",
        tip: "Busca los cafes chinos del centro de Kuching que llevan decadas. Los puestos modernos con fotos en el menu suelen ser peores que los locales sin decoracion.",
        stars: 5,
      },
      {
        name: "BBQ Seafood en Port Dickson",
        location: "Port Dickson, Negeri Sembilan",
        description: "Mariscos frescos del dia cocinados a la brasa en restaurantes directamente en la playa. Cangrejos de barro con mantequilla, gambas jumbo, mejillones al vapor y pez entero con sambal. Los fines de semana los familias de KL llenan todos los restaurantes.",
        price: "50-120 MYR por persona",
        priceEur: "11-25 EUR",
        tip: "Los restaurantes de la zona de Teluk Kemang tienen los mejores precios y el marisco mas fresco. Ve entre semana para evitar aglomeraciones.",
        stars: 4,
      },
      {
        name: "Nasi Kandar — Curry de Penang",
        location: "Line Clear, George Town, Penang",
        description: "El nasi kandar original de Penang: arroz blanco bañado en mezcla de 5-6 currys diferentes a elegir con pollo, ternera, gambas o verduras. Line Clear en Campbell Street lleva abierto desde 1959 y sirve hasta las 5am.",
        price: "10-25 MYR",
        priceEur: "2-5.30 EUR",
        tip: "Dile al cocinero 'banjir' (inundacion) y te pondrán arroz empapado con todos los currys mezclados. Es como lo comen los locales.",
        stars: 5,
      },
      {
        name: "Ipoh White Coffee y Bean Sprout Chicken",
        location: "Ipoh, Perak",
        description: "Dos iconos de Ipoh en un mismo sitio: el cafe blanco de tueste con mantequilla de palma que se hace solo en Ipoh, y el pollo escalfado con brotes de soja cultivados con agua de manantial local que les da una textura unica.",
        price: "12-25 MYR por plato",
        priceEur: "2.50-5.30 EUR",
        tip: "Nam Heong y Foh San son las cafeterias mas historicas. El pollo con brotes tiene que pedirse en Restaurant Onn Kee o Lou Wong, los originales desde los anos 50.",
        stars: 5,
      },
      {
        name: "Steamboat — Hot pot malasio",
        location: "Cameron Highlands / Kuala Lumpur",
        description: "Olla de caldo hirviendo en la mesa donde cocinas tu mismo gambas, vieiras, tofu, setas shiitake, verduras y bolas de pescado. En Cameron Highlands con verduras cultivadas a 1500m de altitud tiene un sabor excepcional.",
        price: "35-80 MYR por persona",
        priceEur: "7.50-17 EUR",
        tip: "Pide el caldo de mezcla mitad tom yam picante y mitad caldo de hueso. Es la combinacion perfecta para toda la mesa.",
        stars: 4,
      },
      {
        name: "Dessert: Ais Kacang y Pisang Goreng",
        location: "Cualquier hawker centre de Malasia",
        description: "Dos postres imprescindibles: ais kacang (montana de hielo raspado con alubias, maiz, gelatina, sirope de rosa y leche condensada) y pisang goreng (platano frito en tempura crujiente recien salido del wok). El mejor snack por 1-2 MYR.",
        price: "2-8 MYR",
        priceEur: "0.40-1.70 EUR",
        tip: "El pisang goreng esta en cada esquina de Malasia pero el mejor es el recien hecho. Si el aceite esta humean el wok, es fresco. Si esta en bandeja fria, pasa de largo.",
        stars: 4,
      },
      { name: "Restoran Nasi Ayam Hainanese", location: "Chinatown, Kuala Lumpur", description: "El clasico pollo hainanes: pollo cocido a fuego lento hasta quedar tierno y jugoso, servido sobre arroz cocinado en caldo de pollo con ajo. Con pepino fresco, salsa de jengibre y soja oscura. El plato mas reconfortante de toda Asia.", price: "10-18 MYR", priceEur: "2-4 EUR", tip: "Pide el pollo asado (roasted) si prefieres piel crujiente en vez del hervido. Siempre pide sopa extra, es gratis y esta deliciosa.", stars: 5, subCategory: "daniel" },
      { name: "Chicken Rice Ball de Malaca", location: "Chung Wah Restaurant, Malaca", description: "La version unica de Malaca del pollo hainanes: el arroz se moldea en bolitas perfectas del tamaño de una pelota de golf. Pollo tierno, bolitas de arroz fragante y sopa clara. Un plato con 100 anos de historia en la ciudad.", price: "12-20 MYR", priceEur: "2.50-4 EUR", tip: "Chung Wah en Jonker Street es el original desde 1918. Hay cola pero el local de al lado es casi igual de bueno y sin espera.", stars: 5, subCategory: "daniel" },
      { name: "Restoran Nasi Kandar Pelita", location: "Jalan Ampang, Kuala Lumpur", description: "El nasi kandar mas famoso de KL: elige tu arroz y encima el cocinero vierte curry de pollo, pollo tandoori, pollo masala o pollo frito. Con ensalada de pepino y cebolla morada. Abierto 24 horas.", price: "10-20 MYR", priceEur: "2-4 EUR", tip: "Dile 'ayam saja' (solo pollo) si quieres evitar marisco. El curry de pollo con patata es lo mas suave para paladares menos acostumbrados al picante.", stars: 5, subCategory: "daniel" },
      { name: "Banana Leaf Rice — Restaurante indio tamil", location: "Brickfields / Bangsar, Kuala Lumpur", description: "Arroz blanco servido sobre una hoja de platano fresca rodeado de 6-8 guarniciones: dal de lentejas, raita de yogur, pappadum crujiente, pollo masala, pollo al curry, verduras salteadas y encurtidos. El almuerzo indio mas completo.", price: "15-30 MYR", priceEur: "3-6 EUR", tip: "Los camareros rellenan el arroz y las guarniciones gratis las veces que quieras. Come con la mano derecha como hacen los locales, sabe diferente.", stars: 5, subCategory: "daniel" },
      { name: "Restoran Anjappar — Chettinad autentico", location: "Brickfields, Kuala Lumpur", description: "Cocina del sur de la India de la region Chettinad. Pollo chettinad con 20 especias, biryani de pollo con arroz basmati perfumado, chicken 65 (pollo frito especiado) y roti prata crujiente. 100% autentico.", price: "20-45 MYR por persona", priceEur: "4-9.50 EUR", tip: "El chicken biryani es el plato estrella. Si no te gusta muy picante, dile 'less spicy' al pedir. Siempre tienen opciones suaves.", stars: 5, subCategory: "daniel" },
      { name: "Nasi Kerabu — Arroz azul con pollo", location: "Kota Bharu / restaurantes kelantan en KL", description: "Arroz teñido de azul natural con la flor bunga telang, servido con pollo asado ayam percik con salsa de coco, ensalada de hierba buena y rabanos, huevo salado y coco tostado.", price: "10-18 MYR", priceEur: "2-4 EUR", tip: "El color azul es completamente natural. Es uno de los platos mas fotografiados de Malasia por su aspecto unico.", stars: 5, subCategory: "daniel" },
      { name: "Tandoori Chicken en Little India", location: "Brickfields, Kuala Lumpur", description: "Pollo marinado 12 horas en yogur con especias y asado en horno tandoor de barro a 400 grados. Piel ahumada y carbonizada, interior jugosisimo. Servido con naan recien horneado, ensalada de cebolla y chutney de menta.", price: "15-30 MYR por racion", priceEur: "3-6 EUR", tip: "Pide medio pollo (half chicken) para 2 personas. El naan de ajo (garlic naan) es imprescindible para mojar en el curry.", stars: 5, subCategory: "daniel" },
      { name: "Nasi Padang — El bufet malayo", location: "Restoran Minang, Kuala Lumpur", description: "Decenas de platos ya cocinados en la vitrina: rendang de pollo (seco e intenso), pollo goreng berempah (frito con especias), gulai (curry amarillo) y sambal con ensalada ulam. Eliges lo que quieres sobre arroz.", price: "12-25 MYR", priceEur: "2.50-5.30 EUR", tip: "El rendang de pollo es lo mejor: cocinado horas en leche de coco hasta que se seca y concentra todos los sabores. Sin picante o muy poco.", stars: 4, subCategory: "daniel" },
      { name: "Caesar Salad y ensaladas en TGIF / Chilis", location: "Pavilion KL / Mid Valley, Kuala Lumpur", description: "Si buscas ensaladas al estilo occidental, las cadenas americanas TGIF, Chilis y Tony Roma's tienen caesar salad, grilled chicken salad y opciones muy reconocibles. Con pollo a la parrilla sin picante garantizado.", price: "25-45 MYR", priceEur: "5-9.50 EUR", tip: "Los centros comerciales grandes como Pavilion y Mid Valley tienen estas cadenas. Perfecto cuando necesitas un respiro del picante.", stars: 3, subCategory: "daniel" },
      { name: "Ayam Goreng Berempah — Pollo frito malayo", location: "Restoran Seri Melayu / Hawker centres", description: "El pollo frito mas aromatico del mundo: marinado horas con curcuma, lemongrass, galangal, hoja de lima kaffir y coco rallado antes de freirse. La piel queda crujiente y amarilla, el interior increiblemente jugoso.", price: "8-15 MYR por pieza", priceEur: "1.70-3.20 EUR", tip: "Lo encuentras en todos los hawker centres al mediodia. Pide 'ayam goreng' y señala la pieza. El muslo (peha) tiene mas sabor que la pechuga.", stars: 5, subCategory: "daniel" },
      { name: "Restoran Udupi Sri Krishna — Vegetariano indio", location: "Brickfields, Kuala Lumpur", description: "Restaurante indio del sur 100% vegetariano. Masala dosa (crepe crujiente de lentejas rellena de patata especiada), idli, sambar y 4 tipos de chutney. Ensalada de pepino y coco fresco.", price: "8-20 MYR", priceEur: "1.70-4 EUR", tip: "El masala dosa gigante es un plato completo por 10-12 MYR. El lassi de mango fresco a 5 MYR es imprescindible.", stars: 4, subCategory: "daniel" },
      { name: "Nasi Campur — El plato libre", location: "En toda Malasia", description: "Arroz con 3-5 acompañamientos a elegir de la vitrina. Siempre hay pollo sin picante (ayam goreng), huevo frito, tofu, verduras salteadas y pepino. El almuerzo del dia a dia malasio.", price: "6-15 MYR", priceEur: "1.30-3.20 EUR", tip: "Señala directamente lo que quieres. Di 'tak pedas' (sin picante) para los curries. Siempre hay algo sin picante para elegir.", stars: 4, subCategory: "daniel" },
      { name: "Chicken Chop en los cafes coloniales de Penang", location: "George Town, Penang", description: "Herencia de la cocina colonial britanica: chuleta de pollo a la plancha con salsa de cebolla y champiñones, puré de patatas y ensalada de col. Tipico de los cafes Hainanese del siglo XX de Penang.", price: "15-28 MYR", priceEur: "3-6 EUR", tip: "Busca los cafes Hainanese mas antiguos como Ee Beng o Toasted & Roasted. El chicken chop de los años 50 con salsa Worcester es unico.", stars: 4, subCategory: "daniel" },
      { name: "Biryani de pollo en Masjid India", location: "Masjid India, Kuala Lumpur", description: "Arroz basmati perfumado con azafran y cardamomo, cocinado junto al pollo en olla sellada con masa (dum biryani). Con raita de yogur y ensalada de cebolla encurtida.", price: "12-22 MYR", priceEur: "2.50-4.70 EUR", tip: "Los restaurantes del callejon detras de la mezquita tienen los precios mas bajos. Los viernes al mediodia estan llenos despues del rezo.", stars: 5, subCategory: "daniel" },
      { name: "Subway, Marrybrown y comida rapida halal", location: "En toda Malasia", description: "Marrybrown es la cadena de comida rapida local con pollo frito, arroz y opciones halal muy asequibles. Subway tiene sanduiches con pollo asado y ensalada. Ideal cuando necesitas algo rapido y familiar.", price: "10-20 MYR", priceEur: "2-4 EUR", tip: "Marrybrown es mas barato que KFC y el pollo es sorprendentemente bueno. Su arroz con pollo es el menu mas pedido. Hay en todos los centros comerciales.", stars: 3, subCategory: "daniel" },
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

const INITIAL_SHOW = 6;

export default function ExperiencesSection() {
  const [activeCategory, setActiveCategory] = useState("aventura");
  const [expandedExp, setExpandedExp] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [danielMode, setDanielMode] = useState(false);

  const current = categories.find((c) => c.id === activeCategory)!;
  const isGastro = activeCategory === "gastronomia";
  const baseExperiences = isGastro && danielMode
    ? current.experiences.filter((e) => e.subCategory === "daniel")
    : current.experiences.filter((e) => !e.subCategory);
  const visibleExperiences = showAll ? baseExperiences : baseExperiences.slice(0, INITIAL_SHOW);
  const hasMore = baseExperiences.length > INITIAL_SHOW;

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
              onClick={() => { setActiveCategory(cat.id); setExpandedExp(null); setShowAll(false); setDanielMode(false); }}
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
        <div className={`rounded-2xl p-5 mb-6 border ${danielMode ? "bg-lime-50 border-lime-100" : current.bgColor}`}>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <current.icon className={`w-6 h-6 ${danielMode ? "text-lime-700" : current.color}`} />
              <div>
                <h3 className={`font-bold text-lg ${danielMode ? "text-lime-700" : current.color}`}>
                  {danielMode ? "🍗 Comida Daniel" : current.label}
                </h3>
                <p className="text-sm text-gray-500">
                  {danielMode ? "Pollo, arroz, ensaladas y restaurantes indios" : current.subtitle}
                </p>
              </div>
            </div>
            {isGastro && (
              <button
                onClick={() => { setDanielMode(!danielMode); setShowAll(false); setExpandedExp(null); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
                  danielMode
                    ? "bg-orange-50 border-orange-200 text-orange-600 hover:bg-orange-100"
                    : "bg-lime-50 border-lime-200 text-lime-700 hover:bg-lime-100"
                }`}
              >
                {danielMode ? (
                  <><ChevronLeft className="w-4 h-4" /> Volver a Donde Comer</>
                ) : (
                  <>Comida Daniel <ChevronRight className="w-4 h-4" /></>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Experience cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {visibleExperiences.map((exp, i) => {
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

        {/* Ver más / Ver menos */}
        {hasMore && (
          <div className="text-center mt-8">
            <button
              onClick={() => { setShowAll(!showAll); setExpandedExp(null); }}
              className={`inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-semibold transition-all shadow-sm border ${
                showAll
                  ? "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                  : `${current.bgColor} ${current.color} border-current/20 hover:opacity-90`
              }`}
            >
              {showAll ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  Ver menos
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  Ver las {current.experiences.length - INITIAL_SHOW} experiencias restantes
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
