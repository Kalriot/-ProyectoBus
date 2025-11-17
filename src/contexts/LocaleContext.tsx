import { createContext, useContext, useState, ReactNode } from "react";

type Locale = "es" | "en" | "pt";
type Currency = "PEN" | "USD";

interface LocaleContextType {
  locale: Locale;
  currency: Currency;
  setLocale: (locale: Locale) => void;
  setCurrency: (currency: Currency) => void;
  t: (key: string) => string;
  formatPrice: (price: number, originalCurrency?: Currency) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const translations = {
  es: {
    // Header
    "nav.catalog": "Paquetes",
    "nav.about": "Nosotros",
    "nav.contact": "Contacto",
    "nav.login": "Ingresar",
    "nav.forum": "Foro",
    
    // Hero
    "hero.title": "Descubre el Perú",
    "hero.subtitle": "Como Nunca Antes",
    "hero.description": "Vive experiencias únicas con los mejores paquetes turísticos. Tu aventura comienza aquí.",
    
    // Sections
    "featured.title": "Paquetes Destacados",
    "featured.description": "Los destinos más populares seleccionados especialmente para ti",
    "featured.viewAll": "Ver Todos los Paquetes",
    
    "why.title": "¿Por Qué Elegirnos?",
    "why.description": "Más de 10 años creando experiencias inolvidables",
    "why.experience": "Experiencia",
    "why.experienceDesc": "10+ años en turismo con miles de viajeros satisfechos",
    "why.security": "Seguridad",
    "why.securityDesc": "Viaja tranquilo con nuestro seguro incluido",
    "why.guides": "Guías Expertos",
    "why.guidesDesc": "Personal capacitado y apasionado por el turismo",
    "why.support": "Atención 24/7",
    "why.supportDesc": "Soporte en español, inglés y portugués",
    
    "explore.title": "Explora Más Destinos",
    "explore.description": "Encuentra el viaje perfecto para ti",
    
    "cta.title": "¿Listo para tu Próxima Aventura?",
    "cta.description": "Reserva ahora y recibe un descuento especial en tu primer viaje",
    "cta.explore": "Explorar Paquetes",
    "cta.contact": "Contactar Asesor",
    
    // Package Card
    "package.from": "Desde",
    "package.perPerson": "por persona",
    "package.viewDetails": "Ver Detalles",
    
    // Package Detail
    "detail.reviews": "reseñas",
    "detail.overview": "Descripción",
    "detail.itinerary": "Itinerario",
    "detail.includes": "Incluye",
    "detail.policies": "Políticas",
    "detail.about": "Sobre este viaje",
    "detail.view360": "Vista 360°",
    "detail.itineraryDetailed": "Itinerario Detallado",
    "detail.includesTitle": "Incluye",
    "detail.notIncludes": "No Incluye",
    "detail.cancellation": "Cancelación y Reembolsos",
    "detail.requirements": "Requisitos",
    "detail.pricePerPerson": "Precio por persona",
    "detail.travelDate": "Fecha de Viaje",
    "detail.selectDate": "Seleccionar fecha",
    "detail.passengers": "Pasajeros",
    "detail.person": "persona",
    "detail.people": "personas",
    "detail.subtotal": "Subtotal",
    "detail.total": "Total",
    "detail.bookNow": "Reservar Ahora",
    "detail.noCharge": "No se te cobrará hasta confirmar la reserva",
    
    // Booking Modal
    "booking.title": "Completar Reserva",
    "booking.passengers": "Pasajeros",
    "booking.total": "Total",
    "booking.travelDate": "Fecha de viaje",
    "booking.passengerData": "Datos del Pasajero",
    "booking.fullName": "Nombre completo",
    "booking.email": "Email",
    "booking.phone": "Teléfono",
    "booking.paymentMethod": "Método de Pago",
    "booking.cardNumber": "Número de tarjeta",
    "booking.expiry": "Vencimiento",
    "booking.cvv": "CVV",
    "booking.confirm": "Confirmar Reserva",
    "booking.terms": "Al confirmar aceptas los términos y condiciones del servicio",
    "booking.processing": "Procesando tu reserva...",
    "booking.processingDesc": "Por favor espera mientras confirmamos tu pago",
    "booking.confirmed": "¡Reserva Confirmada! 🎉",
    "booking.confirmedDesc": "Tu reserva ha sido procesada exitosamente",
    "booking.confirmCode": "Código de reserva",
    "booking.package": "Paquete",
    "booking.date": "Fecha",
    "booking.totalPaid": "Total pagado",
    "booking.emailSent": "Hemos enviado la confirmación a tu correo electrónico.",
    "booking.detailsSoon": "Recibirás más detalles próximamente.",
    "booking.understood": "Entendido",
    
    // Search
    "search.placeholder": "¿A dónde quieres ir?",
    "search.button": "Buscar",
    
    // Chatbot
    "chat.type": "Escribe un mensaje...",
    "chat.title": "Asistente Virtual",
    "chat.online": "En línea",
    
    // Forum
    "forum.title": "Foro de Viajeros 🌎",
    "forum.activeUsers": "usuarios activos",
  },
  en: {
    // Header
    "nav.catalog": "Packages",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.login": "Sign In",
    "nav.forum": "Forum",
    
    // Hero
    "hero.title": "Discover Peru",
    "hero.subtitle": "Like Never Before",
    "hero.description": "Live unique experiences with the best tour packages. Your adventure starts here.",
    
    // Sections
    "featured.title": "Featured Packages",
    "featured.description": "The most popular destinations specially selected for you",
    "featured.viewAll": "View All Packages",
    
    "why.title": "Why Choose Us?",
    "why.description": "Over 10 years creating unforgettable experiences",
    "why.experience": "Experience",
    "why.experienceDesc": "10+ years in tourism with thousands of satisfied travelers",
    "why.security": "Security",
    "why.securityDesc": "Travel safe with our included insurance",
    "why.guides": "Expert Guides",
    "why.guidesDesc": "Trained staff passionate about tourism",
    "why.support": "24/7 Support",
    "why.supportDesc": "Support in Spanish, English and Portuguese",
    
    "explore.title": "Explore More Destinations",
    "explore.description": "Find the perfect trip for you",
    
    "cta.title": "Ready for Your Next Adventure?",
    "cta.description": "Book now and get a special discount on your first trip",
    "cta.explore": "Explore Packages",
    "cta.contact": "Contact Advisor",
    
    // Package Card
    "package.from": "From",
    "package.perPerson": "per person",
    "package.viewDetails": "View Details",
    
    // Package Detail
    "detail.reviews": "reviews",
    "detail.overview": "Overview",
    "detail.itinerary": "Itinerary",
    "detail.includes": "Includes",
    "detail.policies": "Policies",
    "detail.about": "About this trip",
    "detail.view360": "360° View",
    "detail.itineraryDetailed": "Detailed Itinerary",
    "detail.includesTitle": "Includes",
    "detail.notIncludes": "Not Included",
    "detail.cancellation": "Cancellation and Refunds",
    "detail.requirements": "Requirements",
    "detail.pricePerPerson": "Price per person",
    "detail.travelDate": "Travel Date",
    "detail.selectDate": "Select date",
    "detail.passengers": "Passengers",
    "detail.person": "person",
    "detail.people": "people",
    "detail.subtotal": "Subtotal",
    "detail.total": "Total",
    "detail.bookNow": "Book Now",
    "detail.noCharge": "You won't be charged until you confirm the booking",
    
    // Booking Modal
    "booking.title": "Complete Booking",
    "booking.passengers": "Passengers",
    "booking.total": "Total",
    "booking.travelDate": "Travel date",
    "booking.passengerData": "Passenger Information",
    "booking.fullName": "Full name",
    "booking.email": "Email",
    "booking.phone": "Phone",
    "booking.paymentMethod": "Payment Method",
    "booking.cardNumber": "Card number",
    "booking.expiry": "Expiry",
    "booking.cvv": "CVV",
    "booking.confirm": "Confirm Booking",
    "booking.terms": "By confirming you accept the terms and conditions of service",
    "booking.processing": "Processing your booking...",
    "booking.processingDesc": "Please wait while we confirm your payment",
    "booking.confirmed": "Booking Confirmed! 🎉",
    "booking.confirmedDesc": "Your booking has been processed successfully",
    "booking.confirmCode": "Booking code",
    "booking.package": "Package",
    "booking.date": "Date",
    "booking.totalPaid": "Total paid",
    "booking.emailSent": "We have sent the confirmation to your email.",
    "booking.detailsSoon": "You will receive more details soon.",
    "booking.understood": "Got it",
    
    // Search
    "search.placeholder": "Where do you want to go?",
    "search.button": "Search",
    
    // Chatbot
    "chat.type": "Type a message...",
    "chat.title": "Virtual Assistant",
    "chat.online": "Online",
    
    // Forum
    "forum.title": "Travelers Forum 🌎",
    "forum.activeUsers": "active users",
  },
  pt: {
    // Header
    "nav.catalog": "Pacotes",
    "nav.about": "Sobre",
    "nav.contact": "Contato",
    "nav.login": "Entrar",
    "nav.forum": "Fórum",
    
    // Hero
    "hero.title": "Descubra o Peru",
    "hero.subtitle": "Como Nunca Antes",
    "hero.description": "Viva experiências únicas com os melhores pacotes turísticos. Sua aventura começa aqui.",
    
    // Sections
    "featured.title": "Pacotes em Destaque",
    "featured.description": "Os destinos mais populares selecionados especialmente para você",
    "featured.viewAll": "Ver Todos os Pacotes",
    
    "why.title": "Por Que Nos Escolher?",
    "why.description": "Mais de 10 anos criando experiências inesquecíveis",
    "why.experience": "Experiência",
    "why.experienceDesc": "10+ anos em turismo com milhares de viajantes satisfeitos",
    "why.security": "Segurança",
    "why.securityDesc": "Viaje tranquilo com nosso seguro incluído",
    "why.guides": "Guias Especializados",
    "why.guidesDesc": "Equipe treinada e apaixonada por turismo",
    "why.support": "Suporte 24/7",
    "why.supportDesc": "Suporte em espanhol, inglês e português",
    
    "explore.title": "Explore Mais Destinos",
    "explore.description": "Encontre a viagem perfeita para você",
    
    "cta.title": "Pronto para Sua Próxima Aventura?",
    "cta.description": "Reserve agora e receba um desconto especial na sua primeira viagem",
    "cta.explore": "Explorar Pacotes",
    "cta.contact": "Contatar Assessor",
    
    // Package Card
    "package.from": "A partir de",
    "package.perPerson": "por pessoa",
    "package.viewDetails": "Ver Detalhes",
    
    // Package Detail
    "detail.reviews": "avaliações",
    "detail.overview": "Descrição",
    "detail.itinerary": "Itinerário",
    "detail.includes": "Inclui",
    "detail.policies": "Políticas",
    "detail.about": "Sobre esta viagem",
    "detail.view360": "Vista 360°",
    "detail.itineraryDetailed": "Itinerário Detalhado",
    "detail.includesTitle": "Inclui",
    "detail.notIncludes": "Não Inclui",
    "detail.cancellation": "Cancelamento e Reembolsos",
    "detail.requirements": "Requisitos",
    "detail.pricePerPerson": "Preço por pessoa",
    "detail.travelDate": "Data da Viagem",
    "detail.selectDate": "Selecionar data",
    "detail.passengers": "Passageiros",
    "detail.person": "pessoa",
    "detail.people": "pessoas",
    "detail.subtotal": "Subtotal",
    "detail.total": "Total",
    "detail.bookNow": "Reservar Agora",
    "detail.noCharge": "Você não será cobrado até confirmar a reserva",
    
    // Booking Modal
    "booking.title": "Completar Reserva",
    "booking.passengers": "Passageiros",
    "booking.total": "Total",
    "booking.travelDate": "Data da viagem",
    "booking.passengerData": "Dados do Passageiro",
    "booking.fullName": "Nome completo",
    "booking.email": "Email",
    "booking.phone": "Telefone",
    "booking.paymentMethod": "Método de Pagamento",
    "booking.cardNumber": "Número do cartão",
    "booking.expiry": "Validade",
    "booking.cvv": "CVV",
    "booking.confirm": "Confirmar Reserva",
    "booking.terms": "Ao confirmar você aceita os termos e condições do serviço",
    "booking.processing": "Processando sua reserva...",
    "booking.processingDesc": "Por favor aguarde enquanto confirmamos seu pagamento",
    "booking.confirmed": "Reserva Confirmada! 🎉",
    "booking.confirmedDesc": "Sua reserva foi processada com sucesso",
    "booking.confirmCode": "Código de reserva",
    "booking.package": "Pacote",
    "booking.date": "Data",
    "booking.totalPaid": "Total pago",
    "booking.emailSent": "Enviamos a confirmação para seu email.",
    "booking.detailsSoon": "Você receberá mais detalhes em breve.",
    "booking.understood": "Entendi",
    
    // Search
    "search.placeholder": "Para onde você quer ir?",
    "search.button": "Buscar",
    
    // Chatbot
    "chat.type": "Digite uma mensagem...",
    "chat.title": "Assistente Virtual",
    "chat.online": "Online",
    
    // Forum
    "forum.title": "Fórum de Viajantes 🌎",
    "forum.activeUsers": "usuários ativos",
  },
};

// Exchange rates (PEN to USD)
const EXCHANGE_RATE = 0.27; // 1 PEN = 0.27 USD (aproximado)

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>("es");
  const [currency, setCurrency] = useState<Currency>("PEN");

  const t = (key: string): string => {
    return translations[locale][key as keyof typeof translations.es] || key;
  };

  const formatPrice = (price: number, originalCurrency: Currency = "PEN"): string => {
    let finalPrice = price;
    
    // Convert if needed
    if (originalCurrency === "PEN" && currency === "USD") {
      finalPrice = price * EXCHANGE_RATE;
    } else if (originalCurrency === "USD" && currency === "PEN") {
      finalPrice = price / EXCHANGE_RATE;
    }
    
    const symbol = currency === "PEN" ? "S/" : "$";
    return `${symbol} ${finalPrice.toFixed(2)}`;
  };

  return (
    <LocaleContext.Provider value={{ locale, currency, setLocale, setCurrency, t, formatPrice }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
};
