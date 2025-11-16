import { useState } from "react";
import { Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { mockPackages } from "@/data/packages";
import { useLocale } from "@/contexts/LocaleContext";

interface Post {
  id: number;
  userName: string;
  userAvatar: string;
  packageTitle: string;
  rating: number;
  comment: string;
  timestamp: Date;
}

export default function Forum() {
  const { t } = useLocale();

  const generateForumPosts = (): Post[] => {
    const posts: Post[] = [
      {
        id: 1,
        userName: "Carlos Mendoza",
        userAvatar: "CM",
        packageTitle: mockPackages[0].title,
        rating: 5,
        comment: "¡Experiencia inolvidable! El tour a Machu Picchu superó todas mis expectativas. El guía fue muy profesional y conocedor de la historia. Las vistas son simplemente espectaculares. Definitivamente vale cada centavo. 🏔️✨",
        timestamp: new Date(Date.now() - 172800000),
      },
      {
        id: 2,
        userName: "María García",
        userAvatar: "MG",
        packageTitle: mockPackages[1].title,
        rating: 5,
        comment: "El Valle Sagrado es mágico! Pisac y Ollantaytambo son lugares que debes visitar sí o sí. La organización fue perfecta, el almuerzo incluido estaba delicioso y el transporte muy cómodo. 100% recomendado. 📸",
        timestamp: new Date(Date.now() - 259200000),
      },
      {
        id: 3,
        userName: "Juan Pérez",
        userAvatar: "JP",
        packageTitle: mockPackages[2].title,
        rating: 4,
        comment: "Las Islas Flotantes son una experiencia cultural única. Me encantó conocer la forma de vida de los Uros. El único detalle es que me hubiera gustado más tiempo en cada isla. Aún así, muy recomendable. 🛶",
        timestamp: new Date(Date.now() - 345600000),
      },
      {
        id: 4,
        userName: "Ana Torres",
        userAvatar: "AT",
        packageTitle: mockPackages[0].title,
        rating: 5,
        comment: "Machu Picchu es un lugar que todos deberían visitar al menos una vez en la vida. La energía del lugar es indescriptible. El servicio fue excelente desde el inicio hasta el final. ¡Gracias por esta experiencia! 🙏",
        timestamp: new Date(Date.now() - 432000000),
      },
      {
        id: 5,
        userName: "Pedro Silva",
        userAvatar: "PS",
        packageTitle: mockPackages[1].title,
        rating: 4,
        comment: "Muy buen tour por el Valle Sagrado. Los sitios arqueológicos son impresionantes. El guía explicó todo con mucho detalle. Solo le quito una estrella porque el bus estaba un poco lleno, pero en general excelente. 👍",
        timestamp: new Date(Date.now() - 518400000),
      },
      {
        id: 6,
        userName: "Sofia Ramos",
        userAvatar: "SR",
        packageTitle: mockPackages[2].title,
        rating: 5,
        comment: "¡Increíble aventura en el Lago Titicaca! La experiencia de convivir con las familias locales fue enriquecedora. Los paisajes son de otro mundo. Volveré sin duda. 💙",
        timestamp: new Date(Date.now() - 604800000),
      },
      {
        id: 7,
        userName: "Diego Vargas",
        userAvatar: "DV",
        packageTitle: mockPackages[0].title,
        rating: 5,
        comment: "El mejor tour que he tomado en mi vida. Machu Picchu es magia pura. Todo estuvo perfectamente coordinado, desde el transporte hasta el guiado. La subida vale totalmente la pena. 🌄",
        timestamp: new Date(Date.now() - 691200000),
      },
      {
        id: 8,
        userName: "Laura Flores",
        userAvatar: "LF",
        packageTitle: mockPackages[1].title,
        rating: 5,
        comment: "El Valle Sagrado me dejó sin palabras. Cada rincón tiene historia y belleza. El tour está muy bien organizado y el precio es justo para todo lo que incluye. ¡No se lo pierdan! 🌟",
        timestamp: new Date(Date.now() - 777600000),
      },
    ];

    return posts;
  };

  const [posts, setPosts] = useState<Post[]>(generateForumPosts());
  const [newComment, setNewComment] = useState("");

  const handlePostComment = () => {
    if (!newComment.trim()) return;

    const newPost: Post = {
      id: posts.length + 1,
      userName: "Tú",
      userAvatar: "TU",
      packageTitle: "Mi experiencia",
      rating: 5,
      comment: newComment,
      timestamp: new Date(),
    };

    setPosts([newPost, ...posts]);
    setNewComment("");
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-muted text-muted"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-hero-gradient py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Foro de Viajeros 🌎
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Comparte tus experiencias y lee las opiniones de otros viajeros sobre nuestros paquetes turísticos
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* New Post Section */}
          <div className="bg-card rounded-xl p-6 shadow-medium border border-border">
            <h2 className="text-xl font-bold mb-4">Comparte tu Experiencia</h2>
            <div className="space-y-4">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Cuéntanos sobre tu experiencia con alguno de nuestros paquetes turísticos..."
                className="min-h-[120px] resize-none"
              />
              <Button
                onClick={handlePostComment}
                className="w-full md:w-auto"
                disabled={!newComment.trim()}
              >
                <Send className="h-4 w-4 mr-2" />
                Publicar Reseña
              </Button>
            </div>
          </div>

          {/* Posts Stats */}
          <div className="bg-muted/50 rounded-xl p-4 border border-border/50">
            <p className="text-sm text-muted-foreground text-center">
              <span className="font-semibold text-foreground">{posts.length}</span> reseñas publicadas por nuestra comunidad
            </p>
          </div>

          {/* Posts Feed */}
          <div className="space-y-6">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-card rounded-xl p-6 shadow-medium border border-border hover:border-primary/30 transition-all animate-fade-in"
              >
                {/* User Info */}
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {post.userAvatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold">{post.userName}</p>
                    <p className="text-sm text-muted-foreground">
                      {post.timestamp.toLocaleDateString("es-PE", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {/* Package Info */}
                <div className="bg-primary/5 rounded-lg p-4 mb-4 border border-primary/10">
                  <p className="text-xs text-muted-foreground mb-1">Paquete consumido:</p>
                  <p className="font-semibold text-primary">{post.packageTitle}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  {renderStars(post.rating)}
                  <span className="text-sm font-medium text-muted-foreground">
                    {post.rating}.0/5.0
                  </span>
                </div>

                {/* Comment */}
                <p className="text-foreground leading-relaxed">
                  {post.comment}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
