import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/services/auth.service";
import { profileService, type Booking } from "@/services/profile.service";
import { Calendar, MapPin, Users, CreditCard, Package } from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
    const { toast } = useToast();
    const [user, setUser] = useState<any>(null);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [newProfilePicture, setNewProfilePicture] = useState("");

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            const currentUser = authService.getCurrentUser();
            if (!currentUser) {
                window.location.href = "/";
                return;
            }

            setUser(currentUser);
            const userBookings = await profileService.getMyBookings(currentUser.id);
            setBookings(userBookings);
        } catch (error) {
            console.error("Error loading user data:", error);
            toast({
                title: "Error",
                description: "No se pudo cargar la información del usuario",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleImageFile = (file: File) => {
        // Validar tamaño (5MB máximo)
        if (file.size > 5 * 1024 * 1024) {
            toast({
                title: "Error",
                description: "La imagen no debe superar 5MB",
                variant: "destructive",
            });
            return;
        }

        // Crear preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setNewProfilePicture(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Guardar el archivo para subirlo después
        (window as any).selectedFile = file;
    };

    const handleUploadImage = async () => {
        const file = (window as any).selectedFile;
        if (!file) {
            toast({
                title: "Error",
                description: "No hay imagen seleccionada",
                variant: "destructive",
            });
            return;
        }

        setUpdating(true);
        try {
            const formData = new FormData();
            formData.append('profilePicture', file);
            formData.append('userId', user.id);

            const response = await fetch('http://localhost:3000/api/auth/upload-profile-picture', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Error al subir imagen');
            }

            const data = await response.json();

            // Actualizar usuario en localStorage
            const updatedUser = { ...user, profilePicture: `http://localhost:3000${data.imageUrl}` };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(updatedUser);
            setNewProfilePicture("");
            (window as any).selectedFile = null;

            toast({
                title: "¡Perfil Actualizado!",
                description: "Tu foto de perfil ha sido actualizada",
            });

            // Recargar para actualizar el Header
            setTimeout(() => window.location.reload(), 1000);
        } catch (error) {
            console.error('Error:', error);
            toast({
                title: "Error",
                description: "No se pudo subir la imagen",
                variant: "destructive",
            });
        } finally {
            setUpdating(false);
        }
    };

    const getStatusBadge = (status: string) => {
        const styles = {
            PENDING: "bg-yellow-100 text-yellow-800",
            CONFIRMED: "bg-green-100 text-green-800",
            CANCELLED: "bg-red-100 text-red-800",
        };
        return styles[status as keyof typeof styles] || styles.PENDING;
    };

    const getStatusText = (status: string) => {
        const texts = {
            PENDING: "Pendiente",
            CONFIRMED: "Confirmada",
            CANCELLED: "Cancelada",
        };
        return texts[status as keyof typeof texts] || status;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Cargando perfil...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <div className="container mx-auto max-w-6xl px-4 py-12 mt-20">
                {/* User Info Section */}
                <div className="bg-card rounded-2xl shadow-medium p-8 mb-8">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <img
                                src={user?.profilePicture || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop"}
                                alt={user?.name}
                                className="w-24 h-24 rounded-full object-cover border-4 border-primary/20"
                            />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold mb-2">{user?.name}</h1>
                            <p className="text-muted-foreground">{user?.email}</p>
                            <p className="text-sm text-muted-foreground mt-1">
                                Miembro desde {new Date(user?.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Update Profile Picture */}
                <div className="bg-card rounded-2xl shadow-medium p-8 mb-8">
                    <h2 className="text-2xl font-bold mb-4">Cambiar Foto de Perfil</h2>
                    <p className="text-muted-foreground mb-4">
                        Arrastra una imagen aquí o haz clic para seleccionar
                    </p>

                    <div
                        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer
                            ${updating ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary hover:bg-primary/5'}
                            ${newProfilePicture ? 'border-primary bg-primary/5' : 'border-border'}`}
                        onDragOver={(e) => {
                            e.preventDefault();
                            e.currentTarget.classList.add('border-primary', 'bg-primary/10');
                        }}
                        onDragLeave={(e) => {
                            e.currentTarget.classList.remove('border-primary', 'bg-primary/10');
                        }}
                        onDrop={(e) => {
                            e.preventDefault();
                            e.currentTarget.classList.remove('border-primary', 'bg-primary/10');
                            if (updating) return;

                            const file = e.dataTransfer.files[0];
                            if (file && file.type.startsWith('image/')) {
                                handleImageFile(file);
                            } else {
                                toast({
                                    title: "Error",
                                    description: "Por favor selecciona una imagen válida",
                                    variant: "destructive",
                                });
                            }
                        }}
                        onClick={() => {
                            if (!updating) {
                                document.getElementById('fileInput')?.click();
                            }
                        }}
                    >
                        <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    handleImageFile(file);
                                }
                            }}
                        />

                        {newProfilePicture ? (
                            <div className="space-y-4">
                                <img
                                    src={newProfilePicture}
                                    alt="Preview"
                                    className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-primary/20"
                                />
                                <p className="text-sm text-muted-foreground">
                                    Imagen lista para subir
                                </p>
                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleUploadImage();
                                    }}
                                    disabled={updating}
                                    className="bg-hero-gradient hover:opacity-90"
                                >
                                    {updating ? "Subiendo..." : "Confirmar y Subir"}
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center">
                                    <svg
                                        className="w-10 h-10 text-muted-foreground"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-lg font-medium">
                                        Arrastra tu imagen aquí
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        o haz clic para seleccionar (máx. 5MB)
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bookings Section */}
                <div className="bg-card rounded-2xl shadow-medium p-8">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Package className="w-6 h-6" />
                        Mis Reservas ({bookings.length})
                    </h2>

                    {bookings.length === 0 ? (
                        <div className="text-center py-12">
                            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                            <p className="text-muted-foreground text-lg mb-4">
                                Aún no tienes reservas
                            </p>
                            <Link to="/catalog">
                                <Button className="bg-hero-gradient hover:opacity-90">
                                    Explorar Paquetes
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {bookings.map((booking) => (
                                <div
                                    key={booking.id}
                                    className="border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="flex gap-6">
                                        <img
                                            src={booking.package.image}
                                            alt={booking.package.title}
                                            className="w-32 h-32 rounded-lg object-cover"
                                        />
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <h3 className="text-xl font-bold mb-1">
                                                        {booking.package.title}
                                                    </h3>
                                                    <p className="text-muted-foreground flex items-center gap-1">
                                                        <MapPin className="w-4 h-4" />
                                                        {booking.package.destination}
                                                    </p>
                                                </div>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(
                                                        booking.status
                                                    )}`}
                                                >
                                                    {getStatusText(booking.status)}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-primary" />
                                                    <div>
                                                        <p className="text-muted-foreground">Fecha de Viaje</p>
                                                        <p className="font-medium">
                                                            {new Date(booking.travelDate).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Users className="w-4 h-4 text-primary" />
                                                    <div>
                                                        <p className="text-muted-foreground">Pasajeros</p>
                                                        <p className="font-medium">{booking.passengers}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <CreditCard className="w-4 h-4 text-primary" />
                                                    <div>
                                                        <p className="text-muted-foreground">Total</p>
                                                        <p className="font-medium">S/ {booking.totalPrice.toFixed(2)}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Package className="w-4 h-4 text-primary" />
                                                    <div>
                                                        <p className="text-muted-foreground">Código</p>
                                                        <p className="font-medium font-mono">{booking.bookingCode}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Profile;
