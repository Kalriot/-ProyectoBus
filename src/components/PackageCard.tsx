import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Star } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

interface PackageCardProps {
  id: string;
  slug: string;
  title: string;
  destination: string;
  duration: string;
  price: number;
  currency: string;
  rating: number;
  image: string;
  featured?: boolean;
}

export const PackageCard = ({
  slug,
  title,
  destination,
  duration,
  price,
  currency,
  rating,
  image,
  featured,
}: PackageCardProps) => {
  const { t, formatPrice } = useLocale();
  
  return (
    <Card className="overflow-hidden group hover:shadow-strong transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {featured && (
          <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
            {t("featured.title")}
          </Badge>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {destination}
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>

        <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {duration}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Todo el año
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{t("package.from")}</p>
          <p className="text-2xl font-bold text-primary">
            {formatPrice(price, currency as "PEN" | "USD")}
          </p>
        </div>
        <Button asChild variant="hero" size="sm">
          <Link to={`/package/${slug}`}>{t("package.viewDetails")}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
