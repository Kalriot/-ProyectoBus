export interface Package {
  id: string;
  slug: string;
  title: string;
  destination: string;
  duration: string;
  price: number;
  currency: string;
  rating: number;
  image: string;
  featured?: boolean;
  description: string;
  includes: string[];
  notIncludes: string[];
  itinerary: { day: number; title: string; description: string }[];
  photos: string[];
  streetViewUrl?: string;
}

export const mockPackages: Package[] = [
  {
    id: "1",
    slug: "paracas-ballestas",
    title: "Full Day Paracas + Islas Ballestas",
    destination: "Paracas, Ica",
    duration: "1 día",
    price: 199.00,
    currency: "PEN",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
    featured: true,
    description: "Disfruta de un día completo explorando las impresionantes Islas Ballestas y la Reserva Nacional de Paracas. Observa lobos marinos, pingüinos de Humboldt y una gran variedad de aves marinas en su hábitat natural.",
    includes: [
      "Transporte Lima - Paracas - Lima",
      "Guía turístico profesional bilingüe",
      "Almuerzo en restaurante local",
      "Entrada a la Reserva Nacional de Paracas",
      "Tour en bote a las Islas Ballestas",
      "Seguro de viaje"
    ],
    notIncludes: [
      "Bebidas alcohólicas",
      "Propinas",
      "Gastos personales",
      "Snacks adicionales"
    ],
    itinerary: [
      {
        day: 1,
        title: "Paracas e Islas Ballestas",
        description: "Salida temprana desde Lima (4:00 AM). Llegada a Paracas y embarque para tour de 2 horas en las Islas Ballestas. Almuerzo y visita a la Reserva Nacional de Paracas. Retorno a Lima llegando aproximadamente a las 8:00 PM."
      }
    ],
    photos: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop"
    ],
    streetViewUrl: "https://www.google.com/maps/embed?pb=!4v1234567890!6m8!1m7!1sCAoSLEFGMVFpcE1JR0oxdGRfUVN6"
  },
  {
    id: "2",
    slug: "machupicchu-3d2n",
    title: "Machu Picchu Clásico 3D/2N",
    destination: "Cusco",
    duration: "3 días",
    price: 899.00,
    currency: "PEN",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&h=600&fit=crop",
    featured: true,
    description: "Vive la experiencia de conocer una de las 7 Maravillas del Mundo Moderno. Incluye City Tour en Cusco, Valle Sagrado y Machu Picchu con guía experto.",
    includes: [
      "2 noches de alojamiento en Cusco (hotel 3★)",
      "Transporte turístico durante todo el tour",
      "Tren Expedition a Machu Picchu (ida y vuelta)",
      "Entrada a Machu Picchu",
      "Guía profesional en español/inglés",
      "Desayunos en el hotel",
      "Traslados aeropuerto/hotel/aeropuerto"
    ],
    notIncludes: [
      "Boleto aéreo Lima-Cusco-Lima",
      "Alimentación no especificada",
      "Bus Aguas Calientes - Machu Picchu",
      "Propinas"
    ],
    itinerary: [
      {
        day: 1,
        title: "Llegada a Cusco + City Tour",
        description: "Recepción en el aeropuerto. Tiempo libre para aclimatación. Por la tarde City Tour por Cusco: Catedral, Qoricancha, Sacsayhuamán, Q'enqo, Puka Pukara y Tambomachay."
      },
      {
        day: 2,
        title: "Valle Sagrado + Aguas Calientes",
        description: "Tour por el Valle Sagrado visitando Pisac, Ollantaytambo y Chinchero. Por la tarde, tren hacia Aguas Calientes. Noche en Aguas Calientes."
      },
      {
        day: 3,
        title: "Machu Picchu + Retorno",
        description: "Madrugada para subir a Machu Picchu. Tour guiado de 2.5 horas. Tiempo libre para explorar. Retorno en tren y traslado al aeropuerto de Cusco."
      }
    ],
    photos: [
      "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1580837119756-563d608dd119?w=800&h=600&fit=crop"
    ]
  },
  {
    id: "3",
    slug: "amazonas-3d2n",
    title: "Expedición Amazonas 3D/2N",
    destination: "Iquitos, Loreto",
    duration: "3 días",
    price: 749.00,
    currency: "PEN",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&h=600&fit=crop",
    featured: false,
    description: "Adéntrate en la selva amazónica. Navega por el río Amazonas, observa delfines rosados, pesca pirañas y conoce comunidades nativas.",
    includes: [
      "2 noches en lodge amazónico",
      "Todas las comidas",
      "Transporte fluvial",
      "Guía especializado",
      "Excursiones en bote",
      "Visita a comunidad nativa",
      "Pesca de pirañas",
      "Avistamiento de delfines"
    ],
    notIncludes: [
      "Vuelos Lima-Iquitos-Lima",
      "Bebidas alcohólicas",
      "Propinas",
      "Seguro de viaje"
    ],
    itinerary: [
      {
        day: 1,
        title: "Llegada a Iquitos",
        description: "Recojo del aeropuerto. Navegación por el río Amazonas hasta el lodge. Caminata nocturna para observar la fauna."
      },
      {
        day: 2,
        title: "Exploración de la selva",
        description: "Temprano, avistamiento de aves y delfines rosados. Visita a comunidad nativa. Pesca de pirañas. Navegación nocturna para ver caimanes."
      },
      {
        day: 3,
        title: "Retorno a Iquitos",
        description: "Última caminata por la selva. Retorno a Iquitos. Traslado al aeropuerto."
      }
    ],
    photos: [
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1594086856729-e48f84f2cc04?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop"
    ]
  },
  {
    id: "4",
    slug: "huacachina-sandboarding",
    title: "Huacachina & Sandboarding",
    destination: "Ica",
    duration: "1 día",
    price: 149.00,
    currency: "PEN",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=800&h=600&fit=crop",
    featured: false,
    description: "Aventura extrema en el oasis de Huacachina. Paseo en tubular por las dunas y sandboarding al atardecer.",
    includes: [
      "Transporte Lima - Ica - Lima",
      "Paseo en tubular (1 hora)",
      "Tabla de sandboarding",
      "Guía",
      "Seguro"
    ],
    notIncludes: [
      "Alimentación",
      "Bebidas",
      "Propinas"
    ],
    itinerary: [
      {
        day: 1,
        title: "Huacachina Adventure",
        description: "Salida 6:00 AM desde Lima. Llegada a Huacachina 10:00 AM. Tiempo libre para almorzar. 3:00 PM aventura en tubular y sandboarding. Retorno 6:00 PM."
      }
    ],
    photos: [
      "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
    ]
  },
  {
    id: "5",
    slug: "arequipa-colca-4d3n",
    title: "Arequipa & Cañón del Colca 4D/3N",
    destination: "Arequipa",
    duration: "4 días",
    price: 699.00,
    currency: "PEN",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1531065208531-4036c0dba3f5?w=800&h=600&fit=crop",
    featured: true,
    description: "Descubre la Ciudad Blanca y el impresionante Cañón del Colca, uno de los más profundos del mundo. Observa el majestuoso vuelo del cóndor.",
    includes: [
      "3 noches de alojamiento",
      "Transporte turístico",
      "City tour Arequipa",
      "Tour Cañón del Colca 2D/1N",
      "Desayunos",
      "Entradas"
    ],
    notIncludes: [
      "Vuelos",
      "Almuerzos y cenas",
      "Propinas"
    ],
    itinerary: [
      {
        day: 1,
        title: "Llegada + City Tour",
        description: "Recepción. City tour por Arequipa: Plaza de Armas, Monasterio de Santa Catalina, Mirador de Yanahuara."
      },
      {
        day: 2,
        title: "Cañón del Colca",
        description: "Salida temprano hacia Chivay. Paradas en Pampa Cañahuas. Tarde libre en aguas termales. Noche en Chivay."
      },
      {
        day: 3,
        title: "Cruz del Cóndor + Retorno",
        description: "Amanecer en Cruz del Cóndor. Observación de cóndores. Visita a pueblos tradicionales. Retorno a Arequipa."
      },
      {
        day: 4,
        title: "Día libre + Traslado",
        description: "Mañana libre. Traslado al aeropuerto."
      }
    ],
    photos: [
      "https://images.unsplash.com/photo-1531065208531-4036c0dba3f5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop"
    ]
  },
  {
    id: "6",
    slug: "nazca-lines",
    title: "Líneas de Nazca - Vuelo Panorámico",
    destination: "Nazca, Ica",
    duration: "1 día",
    price: 399.00,
    currency: "PEN",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&h=600&fit=crop",
    featured: false,
    description: "Sobrevuela las misteriosas Líneas de Nazca en una experiencia única. Observa las figuras del colibrí, el mono, la araña y más desde el aire.",
    includes: [
      "Transporte Lima - Nazca - Lima",
      "Vuelo sobre las Líneas de Nazca (35 min)",
      "Tasa de aeropuerto",
      "Guía",
      "Certificado de vuelo"
    ],
    notIncludes: [
      "Alimentación",
      "Bebidas",
      "Propinas"
    ],
    itinerary: [
      {
        day: 1,
        title: "Sobrevuelo Líneas de Nazca",
        description: "Salida 4:00 AM. Llegada a aeródromo 8:00 AM. Charla informativa. Vuelo panorámico 35 minutos observando 12 figuras principales. Retorno a Lima."
      }
    ],
    photos: [
      "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
    ]
  }
];
