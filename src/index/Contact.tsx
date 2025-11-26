import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Clock, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            toast({
                title: "¡Mensaje Enviado!",
                description: "Nos pondremos en contacto contigo pronto.",
            });
            // Reset form (optional)
            (e.target as HTMLFormElement).reset();
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Hero Section */}
            <section className="relative bg-sky-gradient pt-32 pb-20 px-4">
                <div className="container mx-auto max-w-6xl relative z-10 text-center">
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 animate-fade-in">
                        Contáctanos
                        <span className="block bg-hero-gradient bg-clip-text text-transparent mt-2">
                            Estamos aquí para ayudarte
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in delay-100">
                        ¿Tienes dudas sobre tu próximo viaje? Escríbenos.
                    </p>
                </div>
            </section>

            <section className="py-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div className="bg-card p-8 rounded-2xl shadow-medium border border-border/50">
                                <h3 className="text-2xl font-bold mb-6">Información de Contacto</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-lg">Dirección</h4>
                                            <p className="text-muted-foreground">Av. Larco 123, Miraflores<br />Lima, Perú</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-lg">Teléfono</h4>
                                            <p className="text-muted-foreground">+51 999 999 999</p>
                                            <p className="text-sm text-muted-foreground">Lunes a Viernes, 9am - 6pm</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-lg">Email</h4>
                                            <p className="text-muted-foreground">info@turismoalcielo.pe</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Map Placeholder */}
                            <div className="bg-muted rounded-2xl h-64 w-full flex items-center justify-center relative overflow-hidden group">
                                <img
                                    src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&h=400&fit=crop"
                                    alt="Mapa"
                                    className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-60 transition-opacity"
                                />
                                <div className="relative z-10 bg-background/80 backdrop-blur-sm px-6 py-3 rounded-full font-medium shadow-lg">
                                    Mapa Interactivo (Próximamente)
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-card p-8 rounded-2xl shadow-strong">
                            <h3 className="text-2xl font-bold mb-6">Envíanos un Mensaje</h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Nombre</label>
                                        <Input placeholder="Tu nombre" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Email</label>
                                        <Input type="email" placeholder="tu@email.com" required />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Asunto</label>
                                    <Input placeholder="¿En qué podemos ayudarte?" required />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Mensaje</label>
                                    <Textarea
                                        placeholder="Escribe tu mensaje aquí..."
                                        className="min-h-[150px]"
                                        required
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-hero-gradient hover:opacity-90 text-white font-bold py-6"
                                    disabled={loading}
                                >
                                    {loading ? "Enviando..." : (
                                        <>
                                            Enviar Mensaje
                                            <Send className="w-4 h-4 ml-2" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Contact;
