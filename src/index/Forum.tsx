import { useState, useEffect } from "react";
import { Send, Loader2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LoginModal } from "@/components/LoginModal";
import { authService } from "@/services/auth.service";
import { forumService, type ForumPost } from "@/services/forum.service";
import { useToast } from "@/hooks/use-toast";

export default function Forum() {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(authService.getCurrentUser());
  const { toast } = useToast();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await forumService.getPosts();
      setPosts(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los posts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!user) {
      setIsLoginOpen(true);
      return;
    }

    if (!newPostTitle.trim() || !newPostContent.trim()) {
      toast({
        title: "Error",
        description: "El título y contenido son requeridos",
        variant: "destructive",
      });
      return;
    }

    try {
      await forumService.createPost({
        title: newPostTitle,
        content: newPostContent,
        userId: user.id,
      });

      toast({
        title: "¡Post creado!",
        description: "Tu post ha sido publicado exitosamente",
      });

      setNewPostTitle("");
      setNewPostContent("");
      loadPosts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "No se pudo crear el post",
        variant: "destructive",
      });
    }
  };

  const handleCreateComment = async (postId: string) => {
    if (!user) {
      setIsLoginOpen(true);
      return;
    }

    const content = commentInputs[postId];
    if (!content?.trim()) return;

    try {
      await forumService.createComment(postId, {
        content,
        userId: user.id,
      });

      toast({
        title: "¡Comentario agregado!",
      });

      setCommentInputs({ ...commentInputs, [postId]: "" });
      loadPosts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "No se pudo crear el comentario",
        variant: "destructive",
      });
    }
  };

  const handleLoginSuccess = () => {
    setUser(authService.getCurrentUser());
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-PE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
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
            Comparte tus experiencias y conecta con otros viajeros
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* New Post Section */}
          <div className="bg-card rounded-xl p-6 shadow-medium border border-border">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Crear Nuevo Post
            </h2>
            {!user && (
              <div className="mb-4 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground text-center">
                  Debes{" "}
                  <button
                    onClick={() => setIsLoginOpen(true)}
                    className="text-primary font-medium hover:underline"
                  >
                    iniciar sesión
                  </button>{" "}
                  para crear posts
                </p>
              </div>
            )}
            <div className="space-y-4">
              <Input
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                placeholder="Título del post..."
                disabled={!user}
              />
              <Textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="Comparte tu experiencia de viaje..."
                className="min-h-[120px] resize-none"
                disabled={!user}
              />
              <Button
                onClick={handleCreatePost}
                className="w-full md:w-auto"
                disabled={!user || !newPostTitle.trim() || !newPostContent.trim()}
              >
                <Send className="h-4 w-4 mr-2" />
                Publicar Post
              </Button>
            </div>
          </div>

          {/* Posts Stats */}
          <div className="bg-muted/50 rounded-xl p-4 border border-border/50">
            <p className="text-sm text-muted-foreground text-center">
              <span className="font-semibold text-foreground">{posts.length}</span> posts
              publicados por la comunidad
            </p>
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-12">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
              <p className="text-muted-foreground mt-4">Cargando posts...</p>
            </div>
          )}

          {/* Posts Feed */}
          {!loading && (
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
                        {getInitials(post.author.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold">{post.author.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(post.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Post Title */}
                  <h3 className="text-xl font-bold mb-3">{post.title}</h3>

                  {/* Post Content */}
                  <p className="text-foreground leading-relaxed mb-4 whitespace-pre-wrap">
                    {post.content}
                  </p>

                  {/* Comments Section */}
                  {post.comments && post.comments.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-border space-y-4">
                      <h4 className="font-semibold text-sm text-muted-foreground">
                        {post.comments.length} Comentario{post.comments.length !== 1 ? "s" : ""}
                      </h4>
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3 pl-4 border-l-2 border-primary/20">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-muted text-xs">
                              {getInitials(comment.author.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{comment.author.name}</p>
                            <p className="text-sm text-muted-foreground">{comment.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Comment */}
                  <div className="mt-4 pt-4 border-t border-border">
                    {user ? (
                      <div className="flex gap-2">
                        <Input
                          value={commentInputs[post.id] || ""}
                          onChange={(e) =>
                            setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
                          }
                          placeholder="Escribe un comentario..."
                          onKeyPress={(e) => {
                            if (e.key === "Enter") handleCreateComment(post.id);
                          }}
                        />
                        <Button
                          size="sm"
                          onClick={() => handleCreateComment(post.id)}
                          disabled={!commentInputs[post.id]?.trim()}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground text-center">
                        <button
                          onClick={() => setIsLoginOpen(true)}
                          className="text-primary hover:underline"
                        >
                          Inicia sesión
                        </button>{" "}
                        para comentar
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}

          {!loading && posts.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">
                No hay posts aún. ¡Sé el primero en compartir!
              </p>
            </div>
          )}
        </div>
      </div>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSuccess={handleLoginSuccess}
      />

      <Footer />
    </div>
  );
}
