import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/SearchBar";
import { PackageCard } from "@/components/PackageCard";
import { Chatbot } from "@/components/Chatbot";
import { Button } from "@/components/ui/button";
import { mockPackages } from "@/data/packages";
import { ArrowRight, Award, Globe, Shield, Users } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

const Index = () => {
  const { t } = useLocale();
  const featuredPackages = mockPackages.filter(p => p.featured);
  const allPackages = mockPackages.slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-sky-gradient pt-24 pb-40 px-4 overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-8 mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              {t("hero.title")}
              <span className="block bg-hero-gradient bg-clip-text text-transparent mt-2">
                {t("hero.subtitle")}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t("hero.description")}
            </p>
          </div>

          <SearchBar />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 text-7xl opacity-10 animate-pulse">✈️</div>
        <div className="absolute bottom-10 right-10 text-7xl opacity-10 animate-pulse delay-300">🏔️</div>
        <div className="absolute top-1/2 left-1/4 text-5xl opacity-5 animate-pulse delay-500">🌴</div>
        <div className="absolute top-1/3 right-1/4 text-5xl opacity-5 animate-pulse delay-700">🏖️</div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20 pointer-events-none"></div>
      </section>

      {/* Featured Packages */}
      <section className="py-20 px-4 -mt-24">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t("featured.title")}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("featured.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredPackages.map((pkg) => (
              <div key={pkg.id} className="animate-scale-in">
                <PackageCard {...pkg} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" variant="hero">
              <Link to="/catalog">
                {t("featured.viewAll")}
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t("why.title")}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("why.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Award,
                title: t("why.experience"),
                description: t("why.experienceDesc")
              },
              {
                icon: Shield,
                title: t("why.security"),
                description: t("why.securityDesc")
              },
              {
                icon: Users,
                title: t("why.guides"),
                description: t("why.guidesDesc")
              },
              {
                icon: Globe,
                title: t("why.support"),
                description: t("why.supportDesc")
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-card hover:shadow-strong transition-all duration-300 hover:-translate-y-2 border border-border/50"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-hero-gradient mb-6 shadow-glow">
                  <feature.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="font-semibold text-xl mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Packages Preview */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t("explore.title")}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("explore.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allPackages.map((pkg) => (
              <PackageCard key={pkg.id} {...pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-hero-gradient relative overflow-hidden">
        <div className="container mx-auto max-w-4xl text-center text-white relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 animate-fade-in">
            {t("cta.title")}
          </h2>
          <p className="text-xl md:text-2xl mb-12 opacity-90 leading-relaxed">
            {t("cta.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" variant="secondary" className="min-w-[200px] text-lg py-6">
              <Link to="/catalog">{t("cta.explore")}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-w-[200px] bg-white/10 hover:bg-white/20 text-white border-white/30 text-lg py-6">
              <Link to="/contact">{t("cta.contact")}</Link>
            </Button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 text-8xl opacity-10 animate-pulse">🎒</div>
        <div className="absolute bottom-10 right-10 text-8xl opacity-10 animate-pulse delay-500">🗺️</div>
      </section>

      {/* Chatbot Widget */}
      <div className="fixed bottom-6 right-6 z-50 animate-scale-in">
        <Chatbot />
      </div>

      <Footer />
    </div>
  );
};

export default Index;
