import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authService } from "@/services/auth.service";
import { useToast } from "@/hooks/use-toast";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

import { createPortal } from "react-dom";

// ... imports ...

export const LoginModal = ({ isOpen, onClose, onSuccess }: LoginModalProps) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isLogin) {
                await authService.login({ email, password });
                toast({
                    title: "¡Bienvenido!",
                    description: "Has iniciado sesión correctamente",
                });
            } else {
                await authService.register({ email, password, name });
                toast({
                    title: "¡Registro exitoso!",
                    description: "Tu cuenta ha sido creada",
                });
            }
            onSuccess();
            onClose();
            // Reset form
            setEmail("");
            setPassword("");
            setName("");
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.error || "Ocurrió un error",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 m-4 relative">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold bg-hero-gradient bg-clip-text text-transparent">
                        {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="hover:bg-muted p-2 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Nombre Completo
                            </label>
                            <Input
                                placeholder="Juan Pérez"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                disabled={loading}
                                autoComplete="name"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Email
                        </label>
                        <Input
                            type="email"
                            placeholder="tu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                            autoComplete="email"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Contraseña
                        </label>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            disabled={loading}
                            autoComplete={isLogin ? "current-password" : "new-password"}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-hero-gradient hover:opacity-90 text-white font-bold py-6"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin mr-2" />
                                Procesando...
                            </>
                        ) : isLogin ? (
                            "Iniciar Sesión"
                        ) : (
                            "Crear Cuenta"
                        )}
                    </Button>
                </form>

                {/* Toggle */}
                <div className="text-center mt-6 text-sm text-muted-foreground flex justify-center gap-1">
                    <span>{isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}</span>
                    <button
                        type="button"
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-primary font-medium hover:underline focus:outline-none"
                        disabled={loading}
                    >
                        {isLogin ? "Regístrate aquí" : "Inicia sesión"}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};
