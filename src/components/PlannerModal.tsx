import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Wand2, Loader2, CheckCircle } from "lucide-react";
import { geminiService, type ItineraryParams } from "@/services/gemini.service";
import { FormatText } from "./FormatText";
import { useToast } from "@/hooks/use-toast";

interface PlannerModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const PlannerModal = ({ isOpen, onClose }: PlannerModalProps) => {
    const [step, setStep] = useState(1);
    const [destination, setDestination] = useState("");
    const [days, setDays] = useState("3");
    const [style, setStyle] = useState<ItineraryParams['style']>("aventura");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const { toast } = useToast();

    if (!isOpen) return null;

    const handlePlan = async () => {
        if (!destination.trim()) {
            toast({
                title: "Error",
                description: "Por favor ingresa un destino",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);
        try {
            const response = await geminiService.generateItinerary({
                destination,
                days,
                style,
            });
            setResult(response.itinerary);
            setStep(2);
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.error || "Error al generar itinerario",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setStep(1);
        setDestination("");
        setDays("3");
        setStyle("aventura");
        setResult(null);
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 via-violet-600 to-pink-600 p-6 text-white flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-full">
                            <Wand2 className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Planificador Mágico</h2>
                            <p className="text-sm opacity-90">Diseña tu viaje perfecto con IA</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="hover:bg-white/20 p-2 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto">
                    {step === 1 ? (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    ¿A dónde quieres ir?
                                </label>
                                <input
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                    placeholder="Ej: Cusco, Arequipa, Selva Central..."
                                    autoFocus
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Duración (Días)
                                    </label>
                                    <select
                                        value={days}
                                        onChange={(e) => setDays(e.target.value)}
                                        className="w-full p-3 border rounded-lg outline-none"
                                    >
                                        {[2, 3, 4, 5, 7, 10].map((d) => (
                                            <option key={d} value={d}>
                                                {d} Días
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Estilo de Viaje
                                    </label>
                                    <select
                                        value={style}
                                        onChange={(e) => setStyle(e.target.value as ItineraryParams['style'])}
                                        className="w-full p-3 border rounded-lg outline-none"
                                    >
                                        <option value="aventura">🏔️ Aventura y Trekking</option>
                                        <option value="relax">💆‍♂️ Relax y Confort</option>
                                        <option value="cultural">🏛️ Cultural e Histórico</option>
                                        <option value="gastronomico">🍽️ Gastronómico</option>
                                        <option value="familiar">👨‍👩‍👧‍👦 Familiar</option>
                                    </select>
                                </div>
                            </div>

                            <Button
                                onClick={handlePlan}
                                disabled={!destination || loading}
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.01] transition-transform disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin mr-2" /> Generando Magia...
                                    </>
                                ) : (
                                    <>
                                        <Wand2 className="mr-2" /> Generar Itinerario
                                    </>
                                )}
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4 animate-scale-in">
                            <div className="flex items-center gap-2 text-purple-600 font-medium mb-4">
                                <CheckCircle className="w-5 h-5" /> Itinerario sugerido para {destination}
                            </div>

                            <div className="bg-slate-50 p-6 rounded-xl border border-purple-100 space-y-2 max-h-[50vh] overflow-y-auto">
                                {result && <FormatText text={result} />}
                            </div>

                            <div className="flex gap-3 pt-4">
                                <Button
                                    onClick={handleReset}
                                    variant="outline"
                                    className="flex-1"
                                >
                                    Volver
                                </Button>
                                <Button
                                    onClick={onClose}
                                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                                >
                                    ¡Me encanta!
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
