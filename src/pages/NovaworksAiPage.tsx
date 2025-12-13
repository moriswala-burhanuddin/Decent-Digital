import React, { useState, useRef, useEffect } from 'react';
import { Send, Menu, Loader2, Sparkles, StopCircle, Zap, Plus, MessageSquare } from 'lucide-react';
import { projectsApi } from '../services/api';
import toast from 'react-hot-toast';
import ChatSidebar from '../components/chat/ChatSidebar';
import ChatMessage from '../components/chat/ChatMessage';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from '../context/LenisContext';

interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp?: number;
    isStreaming?: boolean;
}

const NovaworksAiPage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [sessions, setSessions] = useState<any[]>([]);
    const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Disable Lenis Scroll for this page
    const { stopLenis, startLenis } = useLenis();

    useEffect(() => {
        stopLenis();
        // Force cleanup class just in case Lenis left any styles
        document.documentElement.style.scrollBehavior = 'auto';

        return () => {
            startLenis();
            document.documentElement.style.scrollBehavior = '';
        };
    }, [stopLenis, startLenis]);

    // Initial Load
    useEffect(() => {
        loadSessions();
        if (textareaRef.current) textareaRef.current.focus();
    }, []);

    const loadSessions = async () => {
        try {
            const data = await projectsApi.getChatSessions();
            setSessions(data);
        } catch (e) {
            console.error("Failed to load sessions", e);
        }
    };

    // Load History
    useEffect(() => {
        if (!activeSessionId) {
            setMessages([]);
            return;
        }

        const fetchHistory = async () => {
            try {
                const history = await projectsApi.getChatHistory(activeSessionId);
                if (history && Array.isArray(history)) {
                    setMessages(history);
                }
            } catch (e) {
                toast.error("Could not load chat history");
            }
        };

        fetchHistory();
    }, [activeSessionId]);

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, loading]);

    // Streaming Simulation
    const simulateStreaming = (fullText: string, messageIndex: number) => {
        let currentText = "";
        const words = fullText.split(/(?=[ \n])/);
        let i = 0;

        const interval = setInterval(() => {
            if (i >= words.length) {
                clearInterval(interval);
                setMessages(prev => prev.map((msg, idx) =>
                    idx === messageIndex ? { ...msg, isStreaming: false } : msg
                ));
                return;
            }
            currentText += words[i];
            i++;
            setMessages(prev => prev.map((msg, idx) =>
                idx === messageIndex ? { ...msg, content: currentText, isStreaming: true } : msg
            ));
        }, 20); // Faster streaming
    };

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userContent = input;
        const userMsg: Message = { role: 'user', content: userContent, timestamp: Date.now() };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);
        if (textareaRef.current) textareaRef.current.style.height = 'auto';

        try {
            const result = await projectsApi.sendNovaworksChat(userContent, activeSessionId || undefined);

            if (result.session_id && activeSessionId !== result.session_id) {
                setActiveSessionId(result.session_id);
                loadSessions();
            }

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "",
                timestamp: Date.now(),
                isStreaming: true
            }]);

            setTimeout(() => {
                setMessages(prev => {
                    const newIndx = prev.length - 1;
                    simulateStreaming(result.response, newIndx);
                    return prev;
                });
            }, 50);

        } catch (error: any) {
            console.error(error);
            const errMsg = error.message || "Failed to get response";
            setMessages(prev => [...prev, { role: 'assistant', content: `**Error**: ${errMsg}`, timestamp: Date.now() }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative w-full h-[100dvh] bg-[#030014] flex flex-col overflow-hidden font-sans selection:bg-indigo-500/30">

            {/* Ultra Premium Background */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px] opacity-40 animate-pulse-slow" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/20 rounded-full blur-[120px] opacity-40 animate-pulse-slow delay-1000" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
            </div>

            {/* Mobile Sidebar Overlay */}
            <div
                className={`md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-md transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsSidebarOpen(false)}
            />

            {/* Content Container */}
            <div className="flex flex-1 h-full overflow-hidden z-10 pt-16">

                {/* Sidebar */}
                <div className={`
                    absolute md:static top-0 left-0 h-full z-50
                    w-[280px] bg-[#0c0c0e]/80 backdrop-blur-xl border-r border-white/5 flex flex-col
                    transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                 `}>
                    <ChatSidebar
                        sessions={sessions}
                        activeSessionId={activeSessionId}
                        onSelectSession={(id) => { setActiveSessionId(id); setIsSidebarOpen(false); }}
                        onNewChat={() => { setActiveSessionId(null); setIsSidebarOpen(false); }}
                        onDeleteSession={async (id) => {
                            if (!window.confirm("Delete chat?")) return;
                            await projectsApi.deleteChatSession(id);
                            setSessions(s => s.filter(x => x.id !== id));
                            if (activeSessionId === id) setActiveSessionId(null);
                        }}
                        isOpen={true}
                    />
                </div>

                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col relative min-w-0">

                    {/* Mobile Header Toggle */}
                    <div className="md:hidden absolute top-4 left-4 z-50">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 bg-black/40 backdrop-blur-lg border border-white/10 rounded-lg text-white hover:bg-white/10 transition-all"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages Scroll Area */}
                    <div
                        className="flex-1 overflow-y-auto scroll-smooth custom-scrollbar p-4 md:p-8 space-y-6 overscroll-contain touch-pan-y"
                        ref={scrollRef}
                        data-lenis-prevent
                    >
                        {messages.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in zoom-in duration-500">
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                    animate={{ scale: 1, opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                    className="relative group"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                                    <div className="relative w-24 h-24 rounded-3xl bg-[#0c0c0e] border border-white/10 flex items-center justify-center shadow-2xl">
                                        <Sparkles className="w-10 h-10 text-indigo-400" />
                                    </div>
                                </motion.div>

                                <div className="space-y-4 max-w-lg">
                                    <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-indigo-400 tracking-tight">
                                        NovaWorks AI
                                    </h2>
                                    <p className="text-gray-400 text-lg font-light leading-relaxed">
                                        Unlock ultra-advanced engineering & design capabilities.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left w-full max-w-2xl">
                                    {[
                                        { i: <Zap size={18} />, t: "Instant Code Gen", d: "Production-ready React & Django" },
                                        { i: <MessageSquare size={18} />, t: "Deep Reasoning", d: "Complex architectural decisions" }
                                    ].map((item, i) => (
                                        <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all cursor-pointer group">
                                            <div className="flex items-center gap-3 mb-2 text-indigo-300">
                                                {item.i}
                                                <span className="font-semibold text-white">{item.t}</span>
                                            </div>
                                            <p className="text-sm text-gray-500 group-hover:text-gray-400">{item.d}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="max-w-4xl mx-auto space-y-6 pb-4">
                                {messages.map((msg, idx) => (
                                    <ChatMessage
                                        key={idx}
                                        role={msg.role}
                                        content={msg.content}
                                        isStreaming={msg.isStreaming}
                                    />
                                ))}
                                {loading && !messages[messages.length - 1]?.isStreaming && messages[messages.length - 1]?.role === 'user' && (
                                    <div className="flex items-center gap-4 pl-4 animate-pulse">
                                        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                                            <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
                                        </div>
                                        <span className="text-indigo-400/60 text-sm font-medium tracking-wide">
                                            {messages.length % 2 === 0 ? "Analyzing & Refining..." : "Generating Solution..."}
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Input Area (Sticky Bottom for Solid Feel) */}
                    <div className="p-4 md:p-6 bg-gradient-to-t from-[#030014] via-[#030014] to-transparent z-20">
                        <div className="max-w-4xl mx-auto">
                            <div className={`
                                relative flex items-end gap-3 p-2
                                bg-[#0a0a0c]/80 backdrop-blur-2xl border border-white/10 
                                rounded-3xl shadow-2xl shadow-black/50
                                transition-all duration-300
                                ${input.trim() ? 'ring-1 ring-indigo-500/30 hover:ring-indigo-500/50' : 'hover:border-white/20'}
                            `}>
                                <button className="p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-2xl transition-all">
                                    <Plus className="w-5 h-5" />
                                </button>

                                <textarea
                                    ref={textareaRef}
                                    value={input}
                                    onChange={(e) => {
                                        setInput(e.target.value);
                                        e.target.style.height = 'auto';
                                        e.target.style.height = `${Math.min(e.target.scrollHeight, 300)}px`;
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSend();
                                        }
                                    }}
                                    placeholder="Ask specific questions for coding, design, or architecture..."
                                    className="flex-1 bg-transparent border-0 text-white placeholder-gray-500 focus:ring-0 resize-none py-3 text-[15px] leading-relaxed max-h-[300px] min-h-[50px] scrollbar-thin scrollbar-thumb-gray-700 hover:scrollbar-thumb-gray-600"
                                    rows={1}
                                />

                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || loading}
                                    className={`
                                        p-3 rounded-2xl transition-all duration-300 ease-out
                                        ${input.trim()
                                            ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 rotate-0 scale-100'
                                            : 'bg-white/5 text-gray-600 rotate-90 scale-90 opacity-50 cursor-not-allowed'
                                        }
                                    `}
                                >
                                    {loading ? <StopCircle className="w-5 h-5" /> : <Send className="w-5 h-5" />}
                                </button>
                            </div>
                            <div className="text-center mt-3">
                                <p className="text-[10px] uppercase tracking-widest text-indigo-400/40 font-medium">
                                    NovaWorks AI v2.0 • Premium Build
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default NovaworksAiPage;
