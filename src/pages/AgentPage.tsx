import React, { useState, useRef, useEffect } from 'react';
import { projectsApi } from '../services/api';
import { Loader2, Terminal, Send, Cpu, FileJson, AlertCircle } from 'lucide-react';

interface AgentResponse {
    response: string;
    operations_performed: string[];
}

const AgentPage: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [history, setHistory] = useState<{ type: 'user' | 'agent'; content: string | AgentResponse; error?: boolean }[]>([]);
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim() || loading) return;

        const userPrompt = prompt;
        setPrompt('');
        setHistory(prev => [...prev, { type: 'user', content: userPrompt }]);
        setLoading(true);

        try {
            const result = await projectsApi.executeAgentTask(userPrompt);
            setHistory(prev => [...prev, { type: 'agent', content: result }]);
        } catch (error) {
            setHistory(prev => [...prev, { type: 'agent', content: 'Error executing task. Please try again.', error: true }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 p-6 pt-24 font-mono flex flex-col items-center">
            <div className="w-full max-w-5xl flex flex-col gap-6 h-[85vh]">

                {/* Header */}
                <div className="border border-slate-800 bg-slate-900/50 p-4 rounded-lg flex items-center gap-3 shadow-lg backdrop-blur-sm">
                    <div className="bg-emerald-500/20 p-2 rounded-lg">
                        <Terminal className="text-emerald-400 w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-100 tracking-tight">Groq Agent Terminal</h1>
                        <p className="text-xs text-slate-400">System v1.0 • Connected to Brain</p>
                    </div>
                </div>

                {/* Output Area */}
                <div
                    ref={scrollRef}
                    className="flex-1 bg-slate-900/80 border border-slate-800 rounded-lg p-6 overflow-y-auto shadow-inner space-y-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
                >
                    {history.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-4">
                            <Cpu className="w-16 h-16 opacity-20" />
                            <p>Ready for instructions. waiting for input...</p>
                        </div>
                    )}

                    {history.map((entry, index) => (
                        <div key={index} className={`flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                            {entry.type === 'user' ? (
                                <div className="flex items-start gap-3 self-end max-w-[80%]">
                                    <div className="bg-indigo-600/20 border border-indigo-500/30 text-indigo-200 px-4 py-3 rounded-2xl rounded-tr-sm">
                                        <p className="whitespace-pre-wrap">{entry.content as string}</p>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-indigo-600/30 flex items-center justify-center border border-indigo-500/30 flex-shrink-0">
                                        <span className="text-xs font-bold">U</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-start gap-3 self-start max-w-full w-full">
                                    <div className="w-8 h-8 rounded-full bg-emerald-600/30 flex items-center justify-center border border-emerald-500/30 flex-shrink-0">
                                        <span className="text-xs font-bold">AI</span>
                                    </div>
                                    <div className={`flex-1 overflow-hidden ${entry.error ? 'bg-red-900/20 border-red-500/30' : 'bg-slate-950 border-slate-800'} border rounded-2xl rounded-tl-sm p-4`}>

                                        {entry.error ? (
                                            <div className="flex items-center gap-2 text-red-400">
                                                <AlertCircle className="w-4 h-4" />
                                                <span>{entry.content as string}</span>
                                            </div>
                                        ) : (
                                            <>
                                                {/* Operations Log */}
                                                {(entry.content as AgentResponse).operations_performed?.length > 0 && (
                                                    <div className="mb-4 space-y-2">
                                                        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                                                            <FileJson className="w-3 h-3" />
                                                            <span>Operations Executed</span>
                                                        </div>
                                                        <div className="space-y-1">
                                                            {(entry.content as AgentResponse).operations_performed.map((op, i) => (
                                                                <div key={i} className="text-xs font-mono bg-slate-900/50 border border-emerald-900/30 text-emerald-300/80 px-2 py-1.5 rounded border-l-2 border-l-emerald-500/50">
                                                                    {op}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Main Response */}
                                                <div className="prose prose-invert prose-sm max-w-none">
                                                    <p className="whitespace-pre-wrap text-slate-300 leading-relaxed">{(entry.content as AgentResponse).response}</p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    {loading && (
                        <div className="flex items-start gap-3 self-start">
                            <div className="w-8 h-8 rounded-full bg-emerald-600/30 flex items-center justify-center border border-emerald-500/30">
                                <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                            </div>
                            <div className="bg-slate-950 border border-slate-800 rounded-2xl rounded-tl-sm p-4 flex items-center gap-2">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-75"></span>
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-150"></span>
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-300"></span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <form onSubmit={handleSubmit} className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-xl opacity-30 group-hover:opacity-100 transition duration-500 blur-sm"></div>
                    <div className="relative flex items-center gap-2 bg-slate-900 p-2 rounded-xl border border-slate-800">
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Enter instructions (e.g., 'Create test.py with hello world')..."
                            className="flex-1 bg-transparent border-none text-slate-200 placeholder-slate-500 focus:ring-0 px-4 py-3 font-mono"
                            disabled={loading}
                        />
                        <button
                            type="submit"
                            disabled={loading || !prompt.trim()}
                            className="p-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-lg transition-all duration-200"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default AgentPage;
