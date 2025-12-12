import React, { useState } from 'react';
import {
    SandpackProvider,
    SandpackLayout,
    SandpackCodeEditor,
    SandpackPreview,
    SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import { Download, Terminal, CheckCircle2 } from 'lucide-react';
import ChatPanel from './ChatPanel';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface IdeInterfaceProps {
    files: Record<string, string>;
    logs: string;
    onDownload: () => void;
    zipBlob: Blob | null; // Can be null if we use URL download, but keeping compatible
    // New Chat Props
    history: Message[];
    onSendMessage: (prompt: string) => void;
    sending: boolean;
}

const CustomHeader = ({ onDownload }: { onDownload: () => void }) => {
    return (
        <div className="flex items-center justify-between px-4 py-3 bg-[#151515] border-b border-[#2a2a2a]">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-sm font-semibold text-gray-400">AI Project Editor</span>
            </div>
            <button
                onClick={onDownload}
                className="flex items-center gap-2 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md text-sm font-medium transition-colors"
            >
                <Download className="w-4 h-4" />
                Download Session
            </button>
        </div>
    );
};

const IdeInterface: React.FC<IdeInterfaceProps> = ({
    files,
    logs,
    onDownload,
    history,
    onSendMessage,
    sending
}) => {
    const [activeTab, setActiveTab] = useState<'preview' | 'chat'>('preview');

    // Robust template detection
    const fileKeys = Object.keys(files);
    const isReact = fileKeys.some(key =>
        key.includes('package.json') ||
        key.endsWith('.tsx') ||
        key.endsWith('.jsx') ||
        (key.includes('/src/') && key.endsWith('.js'))
    );
    const template = isReact ? "vite-react" : "static";

    // Determine entry file
    const exactEntry = fileKeys.find(k => k === '/src/App.tsx' || k === '/src/App.jsx' || k === '/App.tsx' || k === '/App.js' || k === '/index.html');
    const activeFile = exactEntry || (fileKeys.length > 0 ? fileKeys[0] : "/index.html");

    return (
        <div className="w-full h-full bg-[#0d0d0d] flex flex-col">
            <CustomHeader onDownload={onDownload} />

            <div className="flex-1 w-full h-full relative overflow-hidden">
                <SandpackProvider
                    files={files}
                    theme="dark"
                    template={template}
                    options={{
                        activeFile: activeFile,
                    }}
                    style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}
                >
                    <SandpackLayout style={{ flex: 1, height: '100%', border: 'none', borderRadius: 0 }}>

                        {/* Sidebar */}
                        <div className="hidden md:flex h-full w-64 border-r border-[#2a2a2a] bg-[#151515] flex-col overflow-hidden shrink-0">
                            <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-[#2a2a2a]">
                                Explorer
                            </div>
                            <div className="flex-1 overflow-auto">
                                <SandpackFileExplorer autoHiddenFiles={true} />
                            </div>
                        </div>

                        {/* Editor */}
                        <div className="flex-1 h-full border-r border-[#2a2a2a] min-w-0">
                            <SandpackCodeEditor
                                showTabs
                                showLineNumbers
                                showInlineErrors
                                wrapContent
                                closableTabs
                                style={{ height: '100%' }}
                            />
                        </div>

                        {/* Preview / Chat Panel */}
                        <div className="w-[40%] flex flex-col h-full bg-[#151515] border-l border-[#2a2a2a] shrink-0">
                            {/* Tabs */}
                            <div className="flex border-b border-[#2a2a2a] bg-[#0d0d0d]">
                                <button
                                    onClick={() => setActiveTab('preview')}
                                    className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'preview' ? 'text-white border-b-2 border-emerald-500 bg-[#151515]' : 'text-gray-500 hover:text-gray-300 hover:bg-[#1a1a1a]'}`}
                                >
                                    Live Preview
                                </button>
                                <button
                                    onClick={() => setActiveTab('chat')}
                                    className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'chat' ? 'text-white border-b-2 border-emerald-500 bg-[#151515]' : 'text-gray-500 hover:text-gray-300 hover:bg-[#1a1a1a]'}`}
                                >
                                    AI Chat
                                </button>
                            </div>

                            <div className="flex-1 overflow-hidden relative bg-[#0a0a0a]">
                                {activeTab === 'preview' ? (
                                    <SandpackPreview
                                        showNavigator
                                        showOpenInCodeSandbox={false}
                                        showRefreshButton={true}
                                        style={{ height: '100%' }}
                                    />
                                ) : (
                                    <ChatPanel
                                        history={history}
                                        onSendMessage={onSendMessage}
                                        sending={sending}
                                        logs={logs}
                                    />
                                )}
                            </div>
                        </div>
                    </SandpackLayout>
                </SandpackProvider>
            </div>
        </div>
    );
};

export default IdeInterface;
