import React, { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Bot, User, Copy, Check, Terminal } from 'lucide-react';
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
        <div className={`w-full group ${isUser ? 'bg-transparent' : 'bg-transparent'}`}>
            <div className="max-w-4xl mx-auto px-4 py-8 flex gap-6 md:gap-8">
                {/* Avatar */}
                <div className="flex-shrink-0 flex flex-col">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-lg ${isUser
                            ? 'bg-[#1f1f22] border border-[#27272a]'
                            : 'bg-gradient-to-br from-indigo-600 to-purple-600 border border-indigo-400/20 shadow-indigo-500/20'
                        }`}>
                        {isUser ? (
                            <User className="w-5 h-5 text-gray-400" />
                        ) : (
                            <Bot className="w-5 h-5 text-white" />
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 overflow-hidden">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-sm text-gray-200">
                            {isUser ? 'You' : 'NovaWorks AI'}
                        </span>
                        {!isUser && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] bg-indigo-500/10 text-indigo-400 font-medium border border-indigo-500/20">
                                PRO
                            </span>
                        )}
                    </div>

                    <div className="prose prose-invert max-w-none text-[15px] leading-relaxed text-gray-300">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                code({ node, inline, className, children, ...props }: any) {
                                    const match = /language-(\w+)/.exec(className || '')
                                    const codeString = String(children).replace(/\n$/, '')
                                    const index = Math.random()

                                    return !inline && match ? (
                                        <div className="relative group/code rounded-xl overflow-hidden my-4 border border-[#2a2a2a] shadow-2xl">
                                            <div className="flex items-center justify-between px-4 py-2.5 bg-[#0e0e10] border-b border-[#2a2a2a]">
                                                <div className="flex items-center gap-2">
                                                    <Terminal className="w-3.5 h-3.5 text-gray-500" />
                                                    <span className="text-xs text-gray-400 font-mono font-medium">{match[1]}</span>
                                                </div>
                                                <button
                                                    onClick={() => handleCopy(codeString, index)}
                                                    className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors bg-[#1f1f22] hover:bg-[#27272a] px-2 py-1 rounded-md"
                                                >
                                                    {copiedIndex === index ? (
                                                        <>
                                                            <Check className="w-3.5 h-3.5 text-green-400" />
                                                            <span className="text-green-400 font-medium">Copied</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Copy className="w-3.5 h-3.5" />
                                                            <span>Copy</span>
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                            <SyntaxHighlighter
                                                {...props}
                                                style={vscDarkPlus}
                                                language={match[1]}
                                                PreTag="div"
                                                customStyle={{
                                                    margin: 0,
                                                    padding: '1.25rem',
                                                    backgroundColor: '#0a0a0c',
                                                    fontSize: '0.9rem',
                                                    lineHeight: '1.5'
                                                }}
                                            >
                                                {codeString}
                                            </SyntaxHighlighter>
                                        </div>
                                    ) : (
                                        <code className={`${className} bg-[#1f1f22] px-1.5 py-0.5 rounded-md text-indigo-200 font-mono text-[0.85em] border border-[#27272a]`} {...props}>
                                            {children}
                                        </code>
                                    )
                                }
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                        {isStreaming && (
                            <span className="inline-block w-1.5 h-4 ml-1 bg-indigo-500 animate-pulse rounded-full" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(ChatMessage);
