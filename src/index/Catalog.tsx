import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PackageCard } from "@/components/PackageCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { packagesService, type Package } from "@/services/packages.service";
import { Filter, SlidersHorizontal, X, Loader2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const Catalog = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    destination: "",
    minPrice: 0,
    maxPrice: 1000,
    duration: "all",
    sortBy: "featured"
  });

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await packagesService.getAll();
        setPackages(data);
      } catch (error) {
        console.error('Error fetching packages:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  // Filter and sort packages
  let filteredPackages = packages.filter(pkg => {
    if (filters.destination && !pkg.destination.toLowerCase().includes(filters.destination.toLowerCase())) {
      return false;
    }
    if (pkg.price < filters.minPrice || pkg.price > filters.maxPrice) {
      return false;
    }
    if (filters.duration && filters.duration !== "all" && !pkg.duration.includes(filters.duration)) {
      return false;
    }
    return true;
  });

  // Sort packages
  filteredPackages = [...filteredPackages].sort((a, b) => {
    switch (filters.sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "featured":
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="destination" className="mb-2 block">Destino</Label>
        <Input
          id="destination"
          placeholder="Buscar por destino..."
          value={filters.destination}
          onChange={(e) => setFilters({ ...filters, destination: e.target.value })}
        />
      </div>

      <div>
        <Label className="mb-4 block">
          Precio: S/ {filters.minPrice} - S/ {filters.maxPrice}
        </Label>
        <Slider
          value={[filters.minPrice, filters.maxPrice]}
          min={0}
          max={1000}
          step={50}
          onValueChange={(values) =>
            setFilters({ ...filters, minPrice: values[0], maxPrice: values[1] })
          }
          className="mb-2"
        />
      </div>

      <div>
        <Label htmlFor="duration" className="mb-2 block">Duración</Label>
        <Select value={filters.duration} onValueChange={(value) => setFilters({ ...filters, duration: value })}>
          <SelectTrigger id="duration">
            <SelectValue placeholder="Todas las duraciones" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="1 día">1 día</SelectItem>
            <SelectItem value="3 días">2-3 días</SelectItem>
            <SelectItem value="4 días">4+ días</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="sortBy" className="mb-2 block">Ordenar por</Label>
        <Select value={filters.sortBy} onValueChange={(value) => setFilters({ ...filters, sortBy: value })}>
          <SelectTrigger id="sortBy">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Destacados</SelectItem>
            <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
            <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
            <SelectItem value="rating">Mejor Valorados</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => setFilters({ destination: "", minPrice: 0, maxPrice: 1000, duration: "all", sortBy: "featured" })}
      >
        <X className="mr-2 h-4 w-4" />
        Limpiar Filtros
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-sky-gradient py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Paquetes Turísticos
          </h1>
          <p className="text-lg text-muted-foreground">
            Encuentra tu próxima aventura entre {packages.length} destinos increíbles
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="flex gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-card rounded-xl p-6 shadow-soft">
              <div className="flex items-center gap-2 mb-6">
                <SlidersHorizontal className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Filtros</h2>
              </div>
              <FilterPanel />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6 flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                {filteredPackages.length} {filteredPackages.length === 1 ? 'paquete' : 'paquetes'}
              </p>
              <Sheet open={showFilters} onOpenChange={setShowFilters}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtros
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filtros</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterPanel />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Results */}
            {loading ? (
              <div className="text-center py-16">
                <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary mb-4" />
                <p className="text-muted-foreground">Cargando paquetes...</p>
              </div>
            ) : filteredPackages.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold mb-2">No encontramos resultados</h3>
                <p className="text-muted-foreground mb-6">
                  Intenta ajustar tus filtros para ver más opciones
                </p>
                <Button onClick={() => setFilters({ destination: "", minPrice: 0, maxPrice: 1000, duration: "all", sortBy: "featured" })}>
                  Limpiar Filtros
                </Button>
              </div>
            ) : (
              <>
                <div className="hidden lg:block mb-6">
                  <p className="text-sm text-muted-foreground">
                    Mostrando {filteredPackages.length} {filteredPackages.length === 1 ? 'paquete' : 'paquetes'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredPackages.map((pkg) => (
                    <PackageCard key={pkg.id} {...pkg} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Catalog;
