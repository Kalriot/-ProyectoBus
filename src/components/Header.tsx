import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Globe, Menu, User, X, MessageCircle, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale } from "@/contexts/LocaleContext";
import { LoginModal } from "@/components/LoginModal";
import { authService, type User as AuthUser } from "@/services/auth.service";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const { locale, currency, setLocale, setCurrency, t } = useLocale();

  useEffect(() => {
    setUser(authService.getCurrentUser());
  }, []);

  const handleLocaleChange = (newLocale: "es" | "en" | "pt", newCurrency: "PEN" | "USD") => {
    setLocale(newLocale);
    setCurrency(newCurrency);
  };

  const handleLoginSuccess = () => {
    setUser(authService.getCurrentUser());
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <div className="h-10 w-10 rounded-full bg-hero-gradient flex items-center justify-center shadow-medium">
            <span className="text-2xl">✈️</span>
          </div>
          <span className="text-xl font-bold bg-hero-gradient bg-clip-text text-transparent">
            Turismo al Cielo
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/catalog" className="text-sm font-medium transition-colors hover:text-primary">
            {t("nav.catalog")}
          </Link>
          <Link to="/about" className="text-sm font-medium transition-colors hover:text-primary">
            {t("nav.about")}
          </Link>
          <Link to="/contact" className="text-sm font-medium transition-colors hover:text-primary">
            {t("nav.contact")}
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild className="relative">
            <Link to="/forum">
              <MessageCircle className="h-5 w-5" />
              <span className="ml-2">Foro</span>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full animate-pulse"></span>
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1">
                <Globe className="h-4 w-4" />
                {locale.toUpperCase()} · {currency}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background z-50">
              <DropdownMenuItem onClick={() => handleLocaleChange("es", "PEN")}>
                🇵🇪 Español · PEN
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLocaleChange("en", "USD")}>
                🇺🇸 English · USD
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLocaleChange("pt", "USD")}>
                🇧🇷 Português · USD
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  {user.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-background z-50">
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setIsLoginOpen(true)}>
              <User className="h-4 w-4" />
              {t("nav.login")}
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur animate-slide-in">
          <nav className="container mx-auto py-4 px-4 flex flex-col gap-4">
            <Link to="/catalog" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              {t("nav.catalog")}
            </Link>
            <Link to="/about" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              {t("nav.about")}
            </Link>
            <Link to="/contact" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              {t("nav.contact")}
            </Link>
            <Link to="/forum" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              Foro
            </Link>
            <div className="flex gap-2 pt-4 border-t">

              <Button variant="outline" size="sm" className="flex-1" asChild>
                <Link to="/account">
                  <User className="h-4 w-4" />
                  {t("nav.login")}
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Globe className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-background z-50">
                  <DropdownMenuItem onClick={() => handleLocaleChange("es", "PEN")}>
                    🇵🇪 ES · PEN
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleLocaleChange("en", "USD")}>
                    🇺🇸 EN · USD
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleLocaleChange("pt", "USD")}>
                    🇧🇷 PT · USD
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSuccess={handleLoginSuccess}
      />
    </header>
  );
};
