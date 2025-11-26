import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, CreditCard, Check, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { authService } from "@/services/auth.service";
import { bookingsService } from "@/services/bookings.service";
import { useToast } from "@/hooks/use-toast";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageId: string;
  packageTitle: string;
  price: number;
  currency: string;
  passengers: number;
}

export const BookingModal = ({
  isOpen,
  onClose,
  packageId,
  packageTitle,
  price,
  currency,
  passengers,
}: BookingModalProps) => {
  const [step, setStep] = useState<"form" | "processing" | "confirmed">("form");
  const [date, setDate] = useState<Date>();
  const [bookingCode, setBookingCode] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
  });
  const { toast } = useToast();
  const user = authService.getCurrentUser();

  useEffect(() => {
    if (isOpen && user) {
      setFormData(prev => ({
        ...prev,
        name: user.name,
        email: user.email
      }));
    }
  }, [isOpen, user]);

  const total = price * passengers;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return;

    setStep("processing");

    try {
      // 1. Simular procesamiento de pago (2 segundos)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 2. Crear reserva en backend
      const booking = await bookingsService.create({
        packageId,
        travelDate: date.toISOString(),
        passengers,
        passengerName: formData.name,
        passengerEmail: formData.email,
        passengerPhone: formData.phone,
        userId: user?.id
      });

      setBookingCode(booking.bookingCode);
      setStep("confirmed");
    } catch (error: any) {
      console.error("Error creating booking:", error);
      toast({
        title: "Error",
        description: error.response?.data?.error || "No se pudo procesar la reserva",
        variant: "destructive",
      });
      setStep("form");
    }
  };

  const handleClose = () => {
    setStep("form");
    setFormData({
      name: "",
      email: "",
      phone: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvv: "",
    });
    setDate(undefined);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        {step === "form" && (
          <>
            <DialogHeader>
              <DialogTitle>Completar Reserva</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Resumen */}
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <h3 className="font-semibold">{packageTitle}</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Pasajeros: {passengers}</p>
                  <div className="flex justify-between items-center pt-2 border-t border-border">
                    <span className="font-semibold text-foreground">Total:</span>
                    <span className="text-lg font-bold text-primary">
                      {currency === "PEN" ? "S/" : "$"} {total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Fecha */}
              <div className="space-y-2">
                <Label>Fecha de viaje *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP", { locale: es }) : "Seleccionar fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Datos Personales */}
              <div className="space-y-4">
                <h3 className="font-semibold">Datos del Pasajero</h3>

                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Juan Pérez"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="juan@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+51 999 999 999"
                  />
                </div>
              </div>

              {/* Datos de Pago */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Método de Pago
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Número de tarjeta *</Label>
                  <Input
                    id="cardNumber"
                    required
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardExpiry">Vencimiento *</Label>
                    <Input
                      id="cardExpiry"
                      required
                      value={formData.cardExpiry}
                      onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                      placeholder="MM/AA"
                      maxLength={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardCvv">CVV *</Label>
                    <Input
                      id="cardCvv"
                      required
                      value={formData.cardCvv}
                      onChange={(e) => setFormData({ ...formData, cardCvv: e.target.value })}
                      placeholder="123"
                      maxLength={3}
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={!date}>
                Confirmar Reserva
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Al confirmar aceptas los términos y condiciones del servicio
              </p>
            </form>
          </>
        )}

        {step === "processing" && (
          <div className="py-12 text-center space-y-4">
            <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Procesando tu reserva...</h3>
              <p className="text-sm text-muted-foreground">
                Por favor espera mientras confirmamos tu pago
              </p>
            </div>
          </div>
        )}

        {step === "confirmed" && (
          <div className="py-8 text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center">
              <Check className="h-8 w-8 text-secondary" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold">¡Reserva Confirmada! 🎉</h3>
              <p className="text-muted-foreground">
                Tu reserva ha sido procesada exitosamente
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg text-left space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Código de reserva:</span>
                <span className="font-mono font-semibold">{bookingCode}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Paquete:</span>
                <span className="font-semibold">{packageTitle}</span>
              </div>
              {date && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Fecha:</span>
                  <span className="font-semibold">{format(date, "PPP", { locale: es })}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Pasajeros:</span>
                <span className="font-semibold">{passengers}</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-border">
                <span className="text-muted-foreground">Total pagado:</span>
                <span className="font-bold text-primary">
                  {currency === "PEN" ? "S/" : "$"} {total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>Hemos enviado la confirmación a tu correo electrónico.</p>
              <p>Recibirás más detalles próximamente.</p>
            </div>

            <Button onClick={handleClose} className="w-full" size="lg">
              Entendido
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
