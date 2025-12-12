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
            <div className="p-4">
                <button
                    onClick={onNewChat}
                    className="w-full flex items-center gap-3 px-4 py-3 bg-[#1f1f22] hover:bg-[#27272a] border border-[#27272a] rounded-xl text-white transition-all group shadow-lg shadow-black/20"
                >
                    <div className="p-1 bg-white/10 rounded-lg group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-colors">
                        <Plus className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-sm">New Chat</span>
                </button>
            </div>

            {/* Session List */}
            <div className="flex-1 overflow-y-auto px-2 custom-scrollbar space-y-1">
                <p className="px-4 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">History</p>
                {sessions.map((session) => (
                    <div
                        key={session.id}
                        onClick={() => onSelectSession(session.id)}
                        className={`group relative flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all border ${activeSessionId === session.id
                                ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/20 text-indigo-300'
                                : 'border-transparent hover:bg-[#1f1f22] text-gray-400 hover:text-gray-200'
                            }`}
                    >
                        <MessageSquare className={`w-4 h-4 flex-shrink-0 ${activeSessionId === session.id ? 'text-indigo-400' : 'opacity-50'}`} />
                        <span className="text-sm truncate pr-6">{session.title || "Untitled Chat"}</span>

                        {onDeleteSession && (
                            <button
                                onClick={(e) => { e.stopPropagation(); onDeleteSession(session.id); }}
                                className="absolute right-2 opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-all"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* User Profile / Footer */}
            <div className="p-4 border-t border-[#1f1f22] bg-[#0c0c0e]">
                <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#1f1f22] cursor-pointer transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-900/20">
                        <LayoutGrid className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">NovaWorks Pro</p>
                        <p className="text-xs text-gray-500 truncate">Unlimited Access</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatSidebar;
