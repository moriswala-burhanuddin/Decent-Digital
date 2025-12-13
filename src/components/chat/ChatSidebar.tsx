import React from 'react';
import { MessageSquare, Plus, Trash2, LayoutGrid } from 'lucide-react';

interface ChatSession {
    id: string;
    title: string;
    preview: string;
    updated_at: string;
}

interface ChatSidebarProps {
    sessions: ChatSession[];
    activeSessionId: string | null;
    onSelectSession: (id: string) => void;
    onNewChat: () => void;
    onDeleteSession?: (id: string) => void;
    isOpen: boolean;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ sessions, activeSessionId, onSelectSession, onNewChat, onDeleteSession }) => {
    return (
        <div className="flex flex-col h-full w-full">
            {/* New Chat Button */}
            <div className="p-4 sm:p-6 pb-2">
                <button
                    onClick={onNewChat}
                    className="w-full group flex items-center justify-center gap-2.5 px-4 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-indigo-500/40 active:scale-95 border border-white/10"
                >
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                    <span className="font-semibold text-[15px] tracking-wide">New Chat</span>
                </button>
            </div>

            {/* Session List */}
            <div className="flex-1 overflow-y-auto px-4 py-4 custom-scrollbar space-y-1">
                <p className="px-2 mb-3 text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em]">History</p>
                {sessions.map((session) => (
                    <div
                        key={session.id}
                        onClick={() => onSelectSession(session.id)}
                        className={`group relative flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all duration-200 border ${activeSessionId === session.id
                            ? 'bg-white/[0.08] border-white/10 text-white shadow-lg backdrop-blur-sm'
                            : 'border-transparent text-gray-400 hover:bg-white/[0.04] hover:text-gray-200'
                            }`}
                    >
                        <MessageSquare className={`w-4 h-4 flex-shrink-0 transition-colors ${activeSessionId === session.id ? 'text-indigo-400' : 'text-gray-600 group-hover:text-gray-400'}`} />
                        <span className="text-sm truncate pr-6 font-medium leading-normal">{session.title || "Untitled Chat"}</span>

                        {onDeleteSession && (
                            <button
                                onClick={(e) => { e.stopPropagation(); onDeleteSession(session.id); }}
                                className="absolute right-2 opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-all duration-200 scale-90 hover:scale-100"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* User Profile / Footer */}
            <div className="p-4 bg-[#0a0a0c]/50 backdrop-blur-md border-t border-white/5">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] cursor-pointer transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-white/10 group-hover:border-indigo-500/30 transition-colors">
                        <LayoutGrid className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate group-hover:text-indigo-200 transition-colors">NovaWorks Pro</p>
                        <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <p className="text-xs text-emerald-500/80 font-medium truncate">System Online</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatSidebar;
