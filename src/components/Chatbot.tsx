import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, Bot, ChevronRight, Loader2, Trash2, Volume2, VolumeX, ArrowDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
    id: string;
    text: string;
    sender: "bot" | "user";
    timestamp: Date;
    actions?: { label: string; value: string }[];
}

const INITIAL_MESSAGE: Message = {
    id: "1",
    text: "Hi there! 👋 I'm the Decent Digital AI assistant. How can I help you build your digital product today?",
    sender: "bot",
    timestamp: new Date(),
};

const QUICK_REPLIES = [
    "Services?",
    "Portfolio?",
    "Pricing?",
    "Contact?",
];

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isSoundOn, setIsSoundOn] = useState(true);
    const [showScrollButton, setShowScrollButton] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    // Auto-focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    // Scroll handling
    const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
        messagesEndRef.current?.scrollIntoView({ behavior });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
            const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
            setShowScrollButton(!isNearBottom);
        }
    };

    const handleSendMessage = async (text: string) => {
        if (!text.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text,
            sender: "user",
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setIsTyping(true);
        scrollToBottom();

        try {
            const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
            const response = await fetch(`${API_BASE_URL}/chatbot/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: text }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to get response');
            }

            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: data.response,
                sender: "bot",
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, botResponse]);
            if (isSoundOn) {
                // Play sound logic here (placeholder)
            }
        } catch (error) {
            console.error('Chatbot error:', error);
            const errorResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: "I apologize, but I'm having trouble connecting to my brain right now. Please try again later.",
                sender: "bot",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorResponse]);
        } finally {
            setIsTyping(false);
            scrollToBottom();
        }
    };



    const handleActionClick = (action: { label: string; value: string }) => {
        if (action.value.startsWith("/")) {
            navigate(action.value);
            // setIsOpen(false); // Keep open for continuity
        } else {
            handleSendMessage(action.label);
        }
    };

    const clearChat = () => {
        setMessages([INITIAL_MESSAGE]);
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95, x: -20 }}
                        animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95, x: -20 }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed bottom-24 left-6 w-[360px] sm:w-[400px] flex flex-col bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl overflow-hidden z-[100]"
                        style={{
                            height: "min(600px, calc(100vh - 120px))",
                            boxShadow: "0 20px 60px -10px rgba(0, 0, 0, 0.3)"
                        }}
                    >
                        {/* Header */}
                        <div className="p-4 bg-primary text-primary-foreground flex items-center justify-between shrink-0 shadow-md relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/10">
                                        <Bot className="w-6 h-6 text-white" />
                                    </div>
                                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-primary rounded-full animate-pulse" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-base leading-tight">Decent AI</h3>
                                    <span className="text-xs text-primary-foreground/80 font-medium">Always online</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setIsSoundOn(!isSoundOn)}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-primary-foreground/80 hover:text-white"
                                    title={isSoundOn ? "Mute" : "Unmute"}
                                >
                                    {isSoundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                                </button>
                                <button
                                    onClick={clearChat}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-primary-foreground/80 hover:text-white"
                                    title="Clear Chat"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-primary-foreground/80 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div
                            ref={scrollContainerRef}
                            onScroll={handleScroll}
                            data-lenis-prevent
                            className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
                        >
                            {messages.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-4">
                                    <Bot className="w-16 h-16 text-muted-foreground/50" />
                                    <p className="text-sm text-muted-foreground">Start a conversation...</p>
                                </div>
                            ) : (
                                messages.map((msg) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div className={`flex max-w-[85%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"} gap-2 items-end`}>
                                            {/* Avatar */}
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                                                }`}>
                                                {msg.sender === "user" ? <Sparkles className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                                            </div>

                                            {/* Bubble */}
                                            <div
                                                className={`rounded-2xl p-4 shadow-sm text-sm leading-relaxed max-w-full overflow-hidden ${msg.sender === "user"
                                                    ? "bg-primary text-primary-foreground rounded-br-none"
                                                    : "bg-card border border-border/50 rounded-bl-none text-card-foreground shadow-sm"
                                                    }`}
                                            >
                                                <div className={`prose prose-sm max-w-none break-words ${msg.sender === "user"
                                                    ? "prose-invert"
                                                    : "dark:prose-invert prose-slate prose-p:leading-relaxed prose-pre:p-0 prose-pre:bg-transparent"
                                                    }`}>
                                                    <ReactMarkdown
                                                        remarkPlugins={[remarkGfm]}
                                                        components={{
                                                            p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                                                            ul: ({ node, ...props }) => <ul className="my-2 space-y-1 list-disc list-inside" {...props} />,
                                                            ol: ({ node, ...props }) => <ol className="my-2 space-y-1 list-decimal list-inside" {...props} />,
                                                            li: ({ node, ...props }) => <li className="marker:text-current" {...props} />,
                                                            a: ({ node, ...props }) => <a className="underline decoration-2 underline-offset-2 hover:opacity-80 transition-opacity font-medium" target="_blank" rel="noopener noreferrer" {...props} />,
                                                            code: ({ node, className, children, ...props }) => {
                                                                return <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs" {...props}>{children}</code>
                                                            }
                                                        }}
                                                    >
                                                        {msg.text}
                                                    </ReactMarkdown>
                                                </div>
                                                {msg.actions && (
                                                    <div className="mt-3 flex flex-wrap gap-2 not-prose">
                                                        {msg.actions.map((action, idx) => (
                                                            <button
                                                                key={idx}
                                                                onClick={() => handleActionClick(action)}
                                                                className="text-xs font-semibold px-3 py-1.5 bg-background/50 hover:bg-background text-foreground border border-border/50 rounded-lg transition-all flex items-center gap-1 shadow-sm hover:shadow"
                                                            >
                                                                {action.label}
                                                                <ChevronRight className="w-3 h-3 opacity-50" />
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                                <span className={`text-[10px] mt-1 block text-right ${msg.sender === "user" ? "text-primary-foreground/60" : "text-muted-foreground"
                                                    }`}>
                                                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}

                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex justify-start items-end gap-2"
                                >
                                    <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center shrink-0">
                                        <Bot className="w-3 h-3" />
                                    </div>
                                    <div className="bg-muted/50 border border-border rounded-2xl rounded-bl-none p-4 shadow-sm flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Scroll Button */}
                        <AnimatePresence>
                            {showScrollButton && (
                                <motion.button
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    onClick={() => scrollToBottom()}
                                    className="absolute bottom-20 left-1/2 -translate-x-1/2 p-2 bg-primary text-primary-foreground rounded-full shadow-lg z-20 hover:scale-110 transition-transform"
                                >
                                    <ArrowDown className="w-4 h-4" />
                                </motion.button>
                            )}
                        </AnimatePresence>

                        {/* Input Area */}
                        <div className="p-4 bg-background border-t border-border shrink-0 space-y-3">
                            {/* Quick Replies */}
                            {!isTyping && (
                                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none mask-fade-right">
                                    {QUICK_REPLIES.map((reply) => (
                                        <button
                                            key={reply}
                                            onClick={() => handleSendMessage(reply)}
                                            className="whitespace-nowrap px-3 py-1.5 text-xs font-medium bg-muted hover:bg-primary/10 hover:text-primary border border-border rounded-full transition-colors"
                                        >
                                            {reply}
                                        </button>
                                    ))}
                                </div>
                            )}

                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSendMessage(inputValue);
                                }}
                                className="flex items-center gap-2"
                            >
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1 bg-muted/50 text-foreground rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50 border border-transparent focus:border-primary/30"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim() || isTyping}
                                    className="p-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary/20 hover:scale-105 active:scale-95"
                                >
                                    {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                </button>
                            </form>

                            <div className="text-center">
                                <span className="text-[10px] text-muted-foreground/60 flex items-center justify-center gap-1">
                                    Powered by <Sparkles className="w-3 h-3 text-primary" /> Decent AI
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Launcher Button (Left Side) */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-6 left-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-2xl z-[100] flex items-center justify-center group"
                style={{ boxShadow: "0 10px 30px -10px rgba(var(--primary), 0.5)" }}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                        >
                            <X className="w-7 h-7" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                        >
                            <MessageSquare className="w-7 h-7 fill-current" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Notification Badge */}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-background animate-bounce" />
                )}
            </motion.button>
        </>
    );
}
