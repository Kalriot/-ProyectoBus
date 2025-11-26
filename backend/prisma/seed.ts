import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PACKAGES = [
    {
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
            "Gastos personales"
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
            "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop"
        ],
        streetViewUrl: "https://www.google.com/maps/embed?pb=!4v1234567890!6m8!1m7!1sCAoSLEFGMVFpcE1JR0oxdGRfUVN6"
    },
    {
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
            "Desayunos en el hotel"
        ],
        notIncludes: [
            "Boleto aéreo Lima-Cusco-Lima",
            "Alimentación no especificada",
            "Bus Aguas Calientes - Machu Picchu"
        ],
        itinerary: [
            {
                day: 1,
                title: "Llegada a Cusco + City Tour",
                description: "Recepción en el aeropuerto. Tiempo libre para aclimatación. Por la tarde City Tour por Cusco."
            },
            {
                day: 2,
                title: "Valle Sagrado + Aguas Calientes",
                description: "Tour por el Valle Sagrado visitando Pisac, Ollantaytambo y Chinchero."
            },
            {
                day: 3,
                title: "Machu Picchu + Retorno",
                description: "Madrugada para subir a Machu Picchu. Tour guiado de 2.5 horas."
            }
        ],
        photos: [
            "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&h=600&fit=crop"
        ]
    },
    {
        slug: "arequipa-colca-4d3n",
        title: "Arequipa & Cañón del Colca 4D/3N",
        destination: "Arequipa",
        duration: "4 días",
        price: 699.00,
        currency: "PEN",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1531065208531-4036c0dba3f5?w=800&h=600&fit=crop",
        featured: true,
        description: "Descubre la Ciudad Blanca y el impresionante Cañón del Colca, uno de los más profundos del mundo.",
        includes: [
            "3 noches de alojamiento",
            "Transporte turístico",
            "City tour Arequipa",
            "Tour Cañón del Colca 2D/1N"
        ],
        notIncludes: [
            "Vuelos",
            "Almuerzos y cenas"
        ],
        itinerary: [
            {
                day: 1,
                title: "Llegada + City Tour",
                description: "Recepción. City tour por Arequipa."
            },
            {
                day: 2,
                title: "Cañón del Colca",
                description: "Salida temprano hacia Chivay."
            },
            {
                day: 3,
                title: "Cruz del Cóndor + Retorno",
                description: "Amanecer en Cruz del Cóndor."
            },
            {
                day: 4,
                title: "Día libre + Traslado",
                description: "Mañana libre. Traslado al aeropuerto."
            }
        ],
        photos: [
            "https://images.unsplash.com/photo-1531065208531-4036c0dba3f5?w=800&h=600&fit=crop"
        ]
    }
];

async function seed() {
    console.log('🌱 Iniciando seed de la base de datos...');

    try {
        // Limpiar datos existentes
        await prisma.forumComment.deleteMany();
        await prisma.forumPost.deleteMany();
        await prisma.booking.deleteMany();
        await prisma.package.deleteMany();

        console.log('✅ Datos existentes eliminados');

        // Insertar paquetes
        for (const pkg of PACKAGES) {
            await prisma.package.create({
                data: {
                    ...pkg,
                    includes: JSON.stringify(pkg.includes),
                    notIncludes: JSON.stringify(pkg.notIncludes),
                    itinerary: JSON.stringify(pkg.itinerary),
                    photos: JSON.stringify(pkg.photos)
                }
            });
            console.log(`✅ Paquete creado: ${pkg.title}`);
        }

        console.log('🎉 Seed completado exitosamente!');
    } catch (error) {
        console.error('❌ Error en seed:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

seed();
