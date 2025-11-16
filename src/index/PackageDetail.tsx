import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookingModal } from "@/components/BookingModal";
import { mockPackages } from "@/data/packages";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Star, 
  Users, 
  Check, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Image as ImageIcon
} from "lucide-react";

const PackageDetail = () => {
  const { slug } = useParams();
  const packageData = mockPackages.find(p => p.slug === slug);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [passengers, setPassengers] = useState(2);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  if (!packageData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto max-w-4xl px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Paquete no encontrado</h1>
          <Button asChild>
            <Link to="/catalog">Ver Catálogo</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % packageData.photos.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + packageData.photos.length) % packageData.photos.length);
  };

  const total = packageData.price * passengers;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Gallery */}
      <section className="relative bg-black">
        <div className="container mx-auto max-w-7xl">
          <div className="relative aspect-[21/9] overflow-hidden">
            <img
              src={packageData.photos[currentImageIndex]}
              alt={packageData.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            {/* Navigation */}
            {packageData.photos.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur hover:bg-white/20 border-white/30"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-6 w-6 text-white" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur hover:bg-white/20 border-white/30"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6 text-white" />
                </Button>

                {/* Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {packageData.photos.map((_, index) => (
                    <button
                      key={index}
                      className={`h-2 rounded-full transition-all ${
                        index === currentImageIndex ? 'w-8 bg-white' : 'w-2 bg-white/50'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <MapPin className="h-4 w-4" />
                {packageData.destination}
              </div>
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl md:text-4xl font-bold">{packageData.title}</h1>
                {packageData.featured && (
                  <Badge variant="secondary" className="ml-4">Destacado</Badge>
                )}
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-accent text-accent" />
                  <span className="font-semibold">{packageData.rating}</span>
                  <span className="text-muted-foreground">(127 reseñas)</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {packageData.duration}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="overview">Descripción</TabsTrigger>
                <TabsTrigger value="itinerary">Itinerario</TabsTrigger>
                <TabsTrigger value="includes">Incluye</TabsTrigger>
                <TabsTrigger value="policies">Políticas</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Sobre este viaje</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {packageData.description}
                  </p>
                </div>

                {packageData.streetViewUrl && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <ImageIcon className="h-5 w-5 text-primary" />
                      Vista 360°
                    </h3>
                    <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                      <iframe
                        src={packageData.streetViewUrl}
                        className="w-full h-full"
                        allowFullScreen
                        loading="lazy"
                        title="Vista 360°"
                      />
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="itinerary" className="mt-6">
                <h2 className="text-2xl font-semibold mb-6">Itinerario Detallado</h2>
                <div className="space-y-4">
                  {packageData.itinerary.map((day) => (
                    <Card key={day.day}>
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="font-bold text-primary">D{day.day}</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{day.title}</h3>
                            <p className="text-muted-foreground">{day.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="includes" className="mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-secondary flex items-center gap-2">
                      <Check className="h-5 w-5" />
                      Incluye
                    </h3>
                    <ul className="space-y-3">
                      {packageData.includes.map((item, index) => (
                        <li key={index} className="flex gap-2">
                          <Check className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-destructive flex items-center gap-2">
                      <X className="h-5 w-5" />
                      No Incluye
                    </h3>
                    <ul className="space-y-3">
                      {packageData.notIncludes.map((item, index) => (
                        <li key={index} className="flex gap-2">
                          <X className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="policies" className="mt-6 space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-3">Cancelación y Reembolsos</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Cancelación gratuita hasta 7 días antes de la fecha del tour</li>
                      <li>• Entre 7-3 días: 50% de reembolso</li>
                      <li>• Menos de 3 días: sin reembolso</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-3">Requisitos</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Documento de identidad vigente</li>
                      <li>• Edad mínima: 8 años (menores deben ir acompañados)</li>
                      <li>• No apto para personas con problemas cardíacos graves</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-strong">
              <CardContent className="p-6 space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Precio por persona</p>
                  <p className="text-4xl font-bold text-primary">
                    {packageData.currency === "PEN" ? "S/" : "$"} {packageData.price.toFixed(2)}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      Fecha de Viaje
                    </label>
                    <Button variant="outline" className="w-full justify-start">
                      Seleccionar fecha
                    </Button>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      Pasajeros
                    </label>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setPassengers(Math.max(1, passengers - 1))}
                      >
                        -
                      </Button>
                      <div className="flex-1 text-center font-semibold">
                        {passengers} {passengers === 1 ? 'persona' : 'personas'}
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setPassengers(Math.min(20, passengers + 1))}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">
                      {packageData.currency === "PEN" ? "S/" : "$"} {total.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">
                      {packageData.currency === "PEN" ? "S/" : "$"} {total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  size="lg" 
                  variant="hero"
                  onClick={() => setIsBookingOpen(true)}
                >
                  Reservar Ahora
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  No se te cobrará hasta confirmar la reserva
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        packageTitle={packageData.title}
        price={packageData.price}
        currency={packageData.currency}
        passengers={passengers}
      />
    </div>
  );
};

export default PackageDetail;
