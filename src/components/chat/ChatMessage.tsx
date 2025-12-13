import React, { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Bot, User, Copy, Check } from 'lucide-react';
import remarkGfm from 'remark-gfm';

interface ChatMessageProps {
    role: 'user' | 'assistant' | 'system';
    content: string;
    isStreaming?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ role, content, isStreaming }) => {
    const isUser = role === 'user';
    const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

    const handleCopy = (code: string, index: number) => {
        navigator.clipboard.writeText(code);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className={`w-full group animate-in slide-in-from-bottom-2 duration-500`}>
            <div className={`
                max-w-4xl mx-auto px-4 py-6 flex gap-6 md:gap-8 rounded-3xl transition-colors duration-300
                ${isUser ? 'bg-transparent' : 'bg-white/[0.02] border-y border-white/5 shadow-sm'}
            `}>
                {/* Avatar */}
                <div className="flex-shrink-0 flex flex-col pt-1">
                    <div className={`
                        w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-xl ring-1 ring-white/10
                        ${isUser
                            ? 'bg-[#1f1f22] bg-gradient-to-br from-gray-800 to-black'
                            : 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-purple-500/20'
                        }
                    `}>
                        {isUser ? (
                            <User className="w-5 h-5 text-gray-300" />
                        ) : (
                            <Bot className="w-6 h-6 text-white" />
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 overflow-hidden space-y-2">
                    <div className="flex items-center gap-3">
                        <span className={`text-sm font-semibold tracking-wide ${isUser ? 'text-gray-300' : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300'}`}>
                            {isUser ? 'You' : 'NovaWorks AI'}
                        </span>
                        {!isUser && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] bg-indigo-500/10 text-indigo-300 font-medium border border-indigo-500/20 tracking-wider shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                                PRO 2.0
                            </span>
                        )}
                    </div>

                    <div className="prose prose-invert max-w-none text-[15px] leading-relaxed text-gray-300/90">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                p({ children }) {
                                    return <p className="mb-4 last:mb-0 leading-7 font-light tracking-wide">{children}</p>
                                },
                                code({ node, inline, className, children, ...props }: any) {
                                    const match = /language-(\w+)/.exec(className || '')
                                    const codeString = String(children).replace(/\n$/, '')
                                    const index = Math.random()

                                    return !inline && match ? (
                                        <div className="relative group/code rounded-xl overflow-hidden my-6 border border-white/10 bg-[#0c0c0e] shadow-2xl shadow-black/50 ring-1 ring-white/5">

                                            {/* Code Header (Mac Style) */}
                                            <div className="flex items-center justify-between px-4 py-3 bg-[#18181b]/50 backdrop-blur-xl border-b border-white/5">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex gap-1.5 mr-2">
                                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                                                    </div>
                                                    <span className="text-xs text-gray-400 font-mono font-medium opacity-60 ml-2">
                                                        {match[1].toUpperCase()}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={() => handleCopy(codeString, index)}
                                                    className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-all bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/5 hover:border-white/10 group/btn"
                                                >
                                                    {copiedIndex === index ? (
                                                        <>
                                                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                                                            <span className="text-emerald-400 font-medium tracking-wide">Copied</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Copy className="w-3.5 h-3.5 group-hover/btn:text-indigo-400 transition-colors" />
                                                            <span className="group-hover/btn:text-indigo-400 transition-colors">Copy Code</span>
                                                        </>
                                                    )}
                                                </button>
                                            </div>

                                            {/* Syntax Highlighter */}
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 pointer-events-none mix-blend-overlay" />
                                                <SyntaxHighlighter
                                                    {...props}
                                                    style={vscDarkPlus}
                                                    language={match[1]}
                                                    PreTag="div"
                                                    customStyle={{
                                                        margin: 0,
                                                        padding: '1.5rem',
                                                        backgroundColor: 'transparent', // Let parent bg show through
                                                        fontSize: '0.9rem',
                                                        lineHeight: '1.6',
                                                        fontFamily: '"JetBrains Mono", "Fira Code", monospace'
                                                    }}
                                                    codeTagProps={{
                                                        style: { fontFamily: '"JetBrains Mono", "Fira Code", monospace' }
                                                    }}
                                                >
                                                    {codeString}
                                                </SyntaxHighlighter>
                                            </div>
                                        </div>
                                    ) : (
                                        <code className={`${className} bg-indigo-500/10 px-1.5 py-0.5 rounded-md text-indigo-300 font-mono text-[0.85em] border border-indigo-500/20`} {...props}>
                                            {children}
                                        </code>
                                    )
                                }
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                        {isStreaming && (
                            <span className="inline-block w-1.5 h-4 ml-1 bg-gradient-to-t from-indigo-500 to-purple-500 animate-pulse rounded-full" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(ChatMessage);
