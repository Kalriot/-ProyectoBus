import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarIcon, MapPin, Search, Users } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface SearchBarProps {
  onSearch?: (params: SearchParams) => void;
  variant?: "hero" | "compact";
}

export interface SearchParams {
  destination: string;
  date?: Date;
  passengers: number;
}

export const SearchBar = ({ onSearch, variant = "hero" }: SearchBarProps) => {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState<Date>();
  const [passengers, setPassengers] = useState(2);

  const handleSearch = () => {
    onSearch?.({ destination, date, passengers });
  };

  if (variant === "compact") {
    return (
      <div className="flex gap-2 w-full max-w-md">
        <Input
          placeholder="¿A dónde vamos?"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleSearch} variant="hero">
          <Search className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full bg-card rounded-xl shadow-strong p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Destination */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            Destino
          </label>
          <Input
            placeholder="¿A dónde quieres ir?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-primary" />
            Fecha
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                {date ? format(date, "PPP", { locale: es }) : "Selecciona una fecha"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className="pointer-events-auto"
                locale={es}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Passengers */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
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
            <Input
              type="number"
              value={passengers}
              onChange={(e) => setPassengers(Math.max(1, parseInt(e.target.value) || 1))}
              className="text-center"
              min={1}
            />
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

      <Button onClick={handleSearch} className="w-full" size="lg" variant="hero">
        <Search className="h-5 w-5 mr-2" />
        Buscar Paquetes
      </Button>
    </div>
  );
};
