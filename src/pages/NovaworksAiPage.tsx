import React, { useState, useRef, useEffect } from 'react';
import { Send, Menu, Loader2, Sparkles, StopCircle, Bot, Zap, Plus, MessageSquare } from 'lucide-react';
import { projectsApi } from '../services/api';
import toast from 'react-hot-toast';
import ChatSidebar from '../components/chat/ChatSidebar';
import ChatMessage from '../components/chat/ChatMessage';
import { motion, AnimatePresence } from 'framer-motion';

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
        // Root container: Uses fixed positioning to fill EXACTLY the viewport minus header
        // Assuming Header is 64px (h-16).
        <div className="fixed top-16 left-0 right-0 bottom-0 bg-[#000000] flex overflow-hidden">

            {/* Mobile Overlay */}
            <div className={`md:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-sm transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsSidebarOpen(false)}
            />

            {/* Sidebar - Static on Desktop, Slide-in on Mobile */}
            <div className={`
                absolute md:static top-0 left-0 h-full z-50
                w-[280px] bg-[#0c0c0e] border-r border-[#1f1f22] flex flex-col
                transition-transform duration-300 ease-in-out
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
                    isOpen={true} // Controlled by parent div transform
                />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col relative w-full h-full bg-[#050505]">

                {/* Header (Mobile Only) */}
                <div className="md:hidden flex items-center p-4 border-b border-[#1f1f22] bg-[#0c0c0e]">
                    <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-gray-400 hover:text-white">
                        <Menu className="w-6 h-6" />
                    </button>
                    <span className="ml-3 font-semibold text-white">NovaWorks AI</span>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar relative" ref={scrollRef}>

                    {/* Background Elements */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
                        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />
                    </div>

                    {messages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center p-6 text-center z-10 relative">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center mb-8 shadow-2xl shadow-purple-500/20"
                            >
                                <Sparkles className="w-10 h-10 text-white" />
                            </motion.div>
                            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 mb-4">
                                NovaWorks AI
                            </h2>
                            <p className="max-w-md text-gray-400 text-lg leading-relaxed">
                                Production-ready code generation, UI design, and complex problem solving.
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col pb-40 relative z-10">
                            {messages.map((msg, idx) => (
                                <ChatMessage
                                    key={idx}
                                    role={msg.role}
                                    content={msg.content}
                                    isStreaming={msg.isStreaming}
                                />
                            ))}
                            {loading && !messages[messages.length - 1]?.isStreaming && messages[messages.length - 1]?.role === 'user' && (
                                <div className="max-w-4xl mx-auto px-4 w-full py-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center animate-pulse">
                                            <Bot className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="text-gray-400 text-sm">Thinking...</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-[#050505] via-[#050505] to-transparent z-20">
                    <div className="max-w-3xl mx-auto">
                        <div className="relative flex items-end gap-2 bg-[#18181b]/80 backdrop-blur-md border border-[#27272a] rounded-2xl p-2 shadow-2xl shadow-black/50 ring-offset-2 ring-offset-black transition-all focus-within:ring-2 focus-within:ring-indigo-500/50">

                            <button className="p-3 text-gray-400 hover:text-white transition-colors hover:bg-white/5 rounded-xl">
                                <Plus className="w-5 h-5" />
                            </button>

                            <textarea
                                ref={textareaRef}
                                value={input}
                                onChange={(e) => {
                                    setInput(e.target.value);
                                    e.target.style.height = 'auto';
                                    e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSend();
                                    }
                                }}
                                placeholder="Ask anything..."
                                className="flex-1 bg-transparent border-0 text-white placeholder-gray-500 focus:ring-0 resize-none py-3 text-base max-h-[200px] scrollbar-hide"
                                rows={1}
                                style={{ height: '50px' }}
                            />

                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || loading}
                                className={`p-3 rounded-xl transition-all duration-200 ${input.trim()
                                        ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 scale-100'
                                        : 'bg-[#27272a] text-gray-500 scale-95'
                                    }`}
                            >
                                {loading ? <StopCircle className="w-5 h-5" /> : <Send className="w-5 h-5" />}
                            </button>
                        </div>
                        <div className="text-center mt-3">
                            <p className="text-[11px] text-gray-600">
                                AI can make mistakes. Review generated code.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NovaworksAiPage;
