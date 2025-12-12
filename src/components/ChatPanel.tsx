import React, { useState, useRef, useEffect } from 'react';
import { Send, Terminal, Loader2, User, Bot, Sparkles } from 'lucide-react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface ChatPanelProps {
    history: Message[];
    onSendMessage: (prompt: string) => void;
    sending: boolean;
    logs?: string;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ history, onSendMessage, sending, logs }) => {
    const [input, setInput] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history, logs]);

    const handleSend = () => {
        if (!input.trim() || sending) return;
        onSendMessage(input);
        setInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#151515] text-gray-300">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6" ref={scrollRef}>
                {history.length === 0 && (
                    <div className="text-center text-gray-500 mt-10 space-y-2">
                        <Sparkles className="w-8 h-8 mx-auto text-emerald-500/50" />
                        <p className="text-sm">Describe changes to update your project.</p>
                        <p className="text-xs">"Make the navbar sticky", "Fix the button color", etc.</p>
                    </div>
                )}

                {history.map((msg, i) => (
                    <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-indigo-600' : 'bg-emerald-600'}`}>
                            {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                        </div>
                        <div className={`p-3 rounded-2xl text-sm leading-relaxed max-w-[85%] ${msg.role === 'user'
                                ? 'bg-indigo-600/20 text-indigo-100 border border-indigo-500/30 rounded-tr-sm'
                                : 'bg-emerald-600/10 text-gray-200 border border-emerald-500/20 rounded-tl-sm'
                            }`}>
                            <div className="whitespace-pre-wrap">{msg.content}</div>
                        </div>
                    </div>
                ))}

                {sending && (
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center shrink-0 animate-pulse">
                            <Loader2 className="w-4 h-4 animate-spin text-white" />
                        </div>
                        <div className="flex items-center gap-2 text-sm text-emerald-400">
                            Thinking and updating files...
                        </div>
                    </div>
                )}

                {/* Logs Section (Optional) */}
                {logs && (
                    <div className="border-t border-[#333] pt-4 mt-6">
                        <div className="text-xs font-mono text-gray-500 mb-2 flex items-center gap-1">
                            <Terminal className="w-3 h-3" /> Agent Output
                        </div>
                        <div className="bg-black/50 p-3 rounded border border-[#2a2a2a] text-[10px] font-mono text-gray-400 max-h-40 overflow-y-auto whitespace-pre-wrap">
                            {logs}
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-[#0d0d0d] border-t border-[#2a2a2a]">
                <div className="relative">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type instructions..."
                        className="w-full bg-[#1a1a1a] border border-[#333] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none pr-12 min-h-[50px] max-h-[150px]"
                        rows={1}
                        style={{ height: 'auto', minHeight: '52px' }}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || sending}
                        className="absolute right-2 bottom-2 p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatPanel;
