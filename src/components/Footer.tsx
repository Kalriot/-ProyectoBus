import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t bg-muted/30 mt-16">
      {/* Non-Discrimination Banner */}
      <div className="bg-primary/10 border-b py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 text-sm">
            <AlertCircle className="h-4 w-4 text-primary" />
            <p className="font-medium text-foreground">
              <span className="font-bold">Prohibida la discriminación</span> por razones de origen, raza, sexo, idioma, religión, opinión, condición económica o de cualquier otra índole.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-hero-gradient flex items-center justify-center shadow-medium">
                <span className="text-2xl">✈️</span>
              </div>
              <span className="text-lg font-bold bg-hero-gradient bg-clip-text text-transparent">
                Turismo al Cielo
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Tu próxima aventura comienza aquí. Descubre los destinos más increíbles del Perú.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Explorar</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/catalog" className="text-muted-foreground hover:text-primary transition-colors">
                  Paquetes Turísticos
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/legal/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link to="/legal/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link to="/legal/refund" className="text-muted-foreground hover:text-primary transition-colors">
                  Política de Cancelación
                </Link>
              </li>
              <li>
                <Link to="/legal/non-discrimination" className="text-muted-foreground hover:text-primary transition-colors">
                  No Discriminación
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>📧 info@turismoalcielo.pe</li>
              <li>📱 +51 999 999 999</li>
              <li>📍 Lima, Perú</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Turismo al Cielo. Todos los derechos reservados.</p>
          <p className="mt-2">
            Cumplimos con la <span className="font-medium">Ley N° 29733 - Ley de Protección de Datos Personales</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
