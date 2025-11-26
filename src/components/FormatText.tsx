interface FormatTextProps {
    text: string;
}

export const FormatText = ({ text }: FormatTextProps) => {
    if (!text) return null;

    // Reemplaza **texto** con <strong>texto</strong> y saltos de línea
    const parts = text.split(/(\*\*.*?\*\*|\n)/g);

    return (
        <div className="text-sm leading-relaxed whitespace-pre-wrap">
            {parts.map((part, index) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return (
                        <strong key={index} className="text-primary font-bold">
                            {part.slice(2, -2)}
                        </strong>
                    );
                }
                if (part === '\n') {
                    return <br key={index} />;
                }
                return <span key={index}>{part}</span>;
            })}
        </div>
    );
};
