import { useState } from "react";
import { X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { geminiService } from "@/services/gemini.service";
import { FormatText } from "./FormatText";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "¡Hola! 👋 Soy tu asistente turístico con IA. Puedo ayudarte con itinerarios, dudas sobre destinos o recomendaciones. ¿Qué te gustaría saber?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await geminiService.chat(inputValue);

      const botMessage: Message = {
        id: messages.length + 2,
        text: response.response,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error: any) {
      // Extraer el mensaje de error del backend
      const errorText = error.response?.data?.error || error.message || "Lo siento, hubo un error. Por favor intenta de nuevo.";

      const errorMessage: Message = {
        id: messages.length + 2,
        text: errorText,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] bg-card rounded-2xl shadow-strong border border-border z-50 flex flex-col animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-hero-gradient rounded-t-2xl">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🤖</span>
              <div>
                <h3 className="font-semibold text-white">Asistente IA</h3>
                <p className="text-xs text-white/80 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  En línea
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2 ${message.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-muted text-foreground rounded-bl-none"
                      }`}
                  >
                    {message.sender === "bot" ? (
                      <FormatText text={message.text} />
                    ) : (
                      <p className="text-sm">{message.text}</p>
                    )}
                    <p
                      className={`text-xs mt-1 ${message.sender === "user"
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                        }`}
                    >
                      {message.timestamp.toLocaleTimeString("es-PE", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-2xl rounded-bl-none px-4 py-2 flex gap-1">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Pregunta sobre Perú..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                onClick={handleSend}
                size="icon"
                className="bg-hero-gradient hover:opacity-90"
                disabled={!inputValue.trim() || isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground text-center mt-2 flex items-center justify-center gap-1">
              Powered by Gemini AI
            </p>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative w-16 h-16 bg-hero-gradient rounded-full shadow-strong hover:shadow-glow transition-all duration-300 hover:scale-110 flex items-center justify-center"
        aria-label="Chat de asistencia"
      >
        <span className="text-3xl">{isOpen ? "✕" : "🤖"}</span>
        {!isOpen && (
          <>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full animate-pulse"></span>

            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 px-4 py-2 bg-card text-foreground rounded-lg shadow-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
              <p className="text-sm font-medium">¿Necesitas ayuda?</p>
            </div>
          </>
        )}
      </button>
    </>
  );
};
