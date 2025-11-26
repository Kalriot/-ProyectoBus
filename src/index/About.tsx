import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Award, Globe, Shield, Users, Heart, Target } from "lucide-react";

const About = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Hero Section */}
            <section className="relative bg-sky-gradient pt-32 pb-20 px-4 overflow-hidden">
                <div className="container mx-auto max-w-6xl relative z-10 text-center">
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 animate-fade-in">
                        Nuestra Historia
                        <span className="block bg-hero-gradient bg-clip-text text-transparent mt-2">
                            Pasión por el Perú
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in delay-100">
                        Más de una década conectando viajeros con la magia de nuestra tierra.
                    </p>
                </div>
                <div className="absolute top-20 left-10 text-7xl opacity-10 animate-pulse">🏔️</div>
                <div className="absolute bottom-10 right-10 text-7xl opacity-10 animate-pulse delay-300">🧭</div>
            </section>

            {/* History Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="prose prose-lg mx-auto text-muted-foreground">
                        <p className="text-lg leading-relaxed mb-6">
                            Fundada en 2015, <strong>Turismo al Cielo</strong> nació del sueño de un grupo de guías locales apasionados por mostrar la verdadera esencia del Perú. Lo que comenzó como una pequeña operación en Cusco, hoy se ha convertido en una agencia líder que opera en todo el territorio nacional.
                        </p>
                        <p className="text-lg leading-relaxed mb-6">
                            Creemos que viajar no es solo visitar lugares, sino conectar con personas, culturas y paisajes. Por eso, cada uno de nuestros paquetes está diseñado con un enfoque sostenible y respetuoso con las comunidades locales.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 px-4 bg-muted/30">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-card p-8 rounded-2xl shadow-medium hover:shadow-strong transition-all duration-300">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                                <Target className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Nuestra Misión</h3>
                            <p className="text-muted-foreground text-lg">
                                Brindar experiencias de viaje inolvidables que superen las expectativas de nuestros clientes, promoviendo al mismo tiempo la conservación del patrimonio cultural y natural del Perú.
                            </p>
                        </div>
                        <div className="bg-card p-8 rounded-2xl shadow-medium hover:shadow-strong transition-all duration-300">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-6">
                                <Heart className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Nuestra Visión</h3>
                            <p className="text-muted-foreground text-lg">
                                Ser reconocidos mundialmente como la agencia de referencia para el turismo en Perú, destacando por nuestra excelencia, innovación y compromiso social.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-20 px-4 bg-hero-gradient text-white">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="space-y-2">
                            <div className="text-4xl md:text-5xl font-bold">10+</div>
                            <div className="text-white/80 font-medium">Años de Experiencia</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl md:text-5xl font-bold">5k+</div>
                            <div className="text-white/80 font-medium">Viajeros Felices</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl md:text-5xl font-bold">20+</div>
                            <div className="text-white/80 font-medium">Destinos Únicos</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl md:text-5xl font-bold">4.9</div>
                            <div className="text-white/80 font-medium">Calificación Promedio</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Nuestro Equipo</h2>
                        <p className="text-xl text-muted-foreground">Expertos dedicados a hacer realidad tu viaje soñado</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "María González",
                                role: "Fundadora & CEO",
                                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
                            },
                            {
                                name: "Carlos Quispe",
                                role: "Jefe de Operaciones",
                                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
                            },
                            {
                                name: "Ana Flores",
                                role: "Coordinadora de Experiencias",
                                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
                            },
                        ].map((member, index) => (
                            <div key={index} className="group text-center">
                                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 border-4 border-white">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                                <p className="text-primary font-medium">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default About;
