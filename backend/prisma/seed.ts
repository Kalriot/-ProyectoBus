import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function hashPassword(password: string): string {
    return Buffer.from(password).toString('base64');
}

const USERS = [
    {
        email: "admin@turismo.pe",
        password: "admin123",
        name: "Administrador",
    },
    {
        email: "juan.perez@gmail.com",
        password: "password123",
        name: "Juan Pérez",
    },
    {
        email: "maria.garcia@hotmail.com",
        password: "password123",
        name: "María García",
    },
    {
        email: "carlos.lopez@yahoo.com",
        password: "password123",
        name: "Carlos López",
    }
];

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
    },
    {
        slug: "iquitos-amazonas-4d3n",
        title: "Iquitos & Amazonas Salvaje 4D/3N",
        destination: "Iquitos, Loreto",
        duration: "4 días",
        price: 1200.00,
        currency: "PEN",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1546536662-723048598422?w=800&h=600&fit=crop",
        featured: false,
        description: "Adéntrate en la selva amazónica. Navega por el río Amazonas, visita comunidades nativas y observa la fauna exótica en su estado natural.",
        includes: [
            "Traslados aeropuerto - albergue - aeropuerto",
            "3 noches en Lodge en la selva",
            "Alimentación completa",
            "Excursiones diurnas y nocturnas",
            "Guía nativo experto"
        ],
        notIncludes: [
            "Vuelos a Iquitos",
            "Bebidas en el bar",
            "Propinas"
        ],
        itinerary: [
            {
                day: 1,
                title: "Bienvenida a la Selva",
                description: "Recepción y navegación por el Amazonas. Llegada al Lodge."
            },
            {
                day: 2,
                title: "Exploración de Flora y Fauna",
                description: "Caminata botánica y búsqueda de delfines rosados."
            },
            {
                day: 3,
                title: "Cultura Nativa",
                description: "Visita a comunidad Yagua y pesca de pirañas."
            },
            {
                day: 4,
                title: "Isla de los Monos + Retorno",
                description: "Visita a la Isla de los Monos y retorno a la ciudad."
            }
        ],
        photos: [
            "https://images.unsplash.com/photo-1546536662-723048598422?w=800&h=600&fit=crop"
        ]
    },
    {
        slug: "puno-titicaca-3d2n",
        title: "Puno & Lago Titicaca 3D/2N",
        destination: "Puno",
        duration: "3 días",
        price: 550.00,
        currency: "PEN",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1528659578160-f71a9325983c?w=800&h=600&fit=crop",
        featured: false,
        description: "Navega por el lago navegable más alto del mundo. Visita las islas flotantes de los Uros y la isla de Taquile.",
        includes: [
            "2 noches de hotel en Puno",
            "Tour a Uros y Taquile (Full Day)",
            "Traslados internos",
            "Desayunos",
            "Guía oficial"
        ],
        notIncludes: [
            "Vuelos a Juliaca",
            "Cenas"
        ],
        itinerary: [
            {
                day: 1,
                title: "Llegada a Puno",
                description: "Traslado del aeropuerto a Puno. Aclimatación."
            },
            {
                day: 2,
                title: "Lago Titicaca: Uros y Taquile",
                description: "Excursión de día completo en lancha rápida."
            },
            {
                day: 3,
                title: "Sillustani + Salida",
                description: "Visita a las Chullpas de Sillustani camino al aeropuerto."
            }
        ],
        photos: [
            "https://images.unsplash.com/photo-1528659578160-f71a9325983c?w=800&h=600&fit=crop"
        ]
    },
    {
        slug: "huaraz-nevados-3d2n",
        title: "Huaraz & Nevados 3D/2N",
        destination: "Huaraz, Ancash",
        duration: "3 días",
        price: 450.00,
        currency: "PEN",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1534234828563-02511c75b222?w=800&h=600&fit=crop",
        featured: false,
        description: "Explora la Suiza Peruana. Visita la Laguna 69, el Glaciar Pastoruri y la Laguna de Llanganuco.",
        includes: [
            "2 noches de alojamiento",
            "3 tours diarios (Laguna 69, Pastoruri, Llanganuco)",
            "Guía de montaña",
            "Transporte turístico"
        ],
        notIncludes: [
            "Pasajes de bus Lima-Huaraz",
            "Entradas al Parque Nacional Huascarán",
            "Alimentación"
        ],
        itinerary: [
            {
                day: 1,
                title: "Callejón de Huaylas + Llanganuco",
                description: "Visita a Campo Santo de Yungay y Laguna Llanganuco."
            },
            {
                day: 2,
                title: "Glaciar Pastoruri",
                description: "Ruta del cambio climático y nevado Pastoruri."
            },
            {
                day: 3,
                title: "Laguna 69 (Trekking)",
                description: "Caminata exigente hacia la turquesa Laguna 69."
            }
        ],
        photos: [
            "https://images.unsplash.com/photo-1534234828563-02511c75b222?w=800&h=600&fit=crop"
        ]
    }
];

const FORUM_POSTS = [
    {
        title: "¿Cuál es la mejor época para viajar a Cusco?",
        content: "Estoy planeando mi viaje a Machu Picchu y quisiera saber cuándo hay menos lluvias pero buen clima. ¡Gracias!",
        category: "Consejos",
        userIndex: 1 // Juan
    },
    {
        title: "Experiencia inolvidable en Paracas",
        content: "Acabo de regresar del tour a las Islas Ballestas y fue mágico. Recomiendo llevar cortavientos porque corre mucho aire en el bote.",
        category: "Reseñas",
        userIndex: 2 // Maria
    },
    {
        title: "Recomendaciones para el mal de altura",
        content: "Para los que viajan a la sierra, tomen mate de coca y descansen el primer día. Es clave para disfrutar el resto del viaje.",
        category: "Salud",
        userIndex: 0 // Admin
    },
    {
        title: "¿Qué llevar a la selva?",
        content: "Voy a Iquitos la próxima semana. ¿Qué tipo de ropa y repelente recomiendan?",
        category: "Equipaje",
        userIndex: 3 // Carlos
    }
];

async function seed() {
    console.log('🌱 Iniciando seed de la base de datos...');

    try {
        // Limpiar datos existentes (Orden importante por claves foráneas)
        await prisma.forumComment.deleteMany();
        await prisma.forumPost.deleteMany();
        await prisma.booking.deleteMany();
        await prisma.package.deleteMany();
        await prisma.user.deleteMany();

        console.log('✅ Datos existentes eliminados');

        // 1. Crear Usuarios
        const createdUsers = [];
        for (const user of USERS) {
            const newUser = await prisma.user.create({
                data: {
                    ...user,
                    password: hashPassword(user.password)
                }
            });
            createdUsers.push(newUser);
            console.log(`👤 Usuario creado: ${user.name}`);
        }

        // 2. Crear Paquetes
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
            console.log(`📦 Paquete creado: ${pkg.title}`);
        }

        // 3. Crear Posts del Foro
        for (const post of FORUM_POSTS) {
            const author = createdUsers[post.userIndex];
            const newPost = await prisma.forumPost.create({
                data: {
                    title: post.title,
                    content: post.content,
                    // category: post.category, // Removed as it's not in schema
                    userId: author.id,
                    // authorName: author.name // Removed as it's not in schema
                }
            });
            console.log(`💬 Post creado: ${post.title}`);

            // Crear un comentario dummy para algunos posts
            if (post.userIndex !== 0) { // Si no es admin, el admin responde
                await prisma.forumComment.create({
                    data: {
                        content: "¡Gracias por compartir! Excelente aporte.",
                        postId: newPost.id,
                        userId: createdUsers[0].id, // Admin
                        // authorName: createdUsers[0].name // Removed as it's not in schema
                    }
                });
            }
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
