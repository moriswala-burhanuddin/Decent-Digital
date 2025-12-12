import React, { useState, useRef } from 'react';
import { projectsApi } from '../services/api';
import { Upload, FileArchive, Code2, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import IdeInterface from '../components/IdeInterface';

const AiEditorPage: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [instructions, setInstructions] = useState('');
    const [loading, setLoading] = useState(false);
    const [statusText, setStatusText] = useState('');

    // Session State
    const [showIde, setShowIde] = useState(false);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [projectFiles, setProjectFiles] = useState<Record<string, string>>({});
    const [logs, setLogs] = useState('');

    // Chat State
    const [history, setHistory] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
    const [chatLoading, setChatLoading] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            if (selectedFile.name.endsWith('.zip')) {
                setFile(selectedFile);
            } else {
                toast.error('Please upload a .zip file');
            }
        }
    };

    const handleDownload = () => {
        if (!sessionId) return;
        const url = projectsApi.getSessionDownloadUrl(sessionId);
        window.open(url, '_blank');
        toast.success('Download started!');
    };

    const handleChat = async (prompt: string) => {
        if (!sessionId) return;

        setChatLoading(true);
        // Optimistic update
        setHistory(prev => [...prev, { role: 'user', content: prompt }]);

        try {
            const result = await projectsApi.sendProjectPrompt(sessionId, prompt);

            // Update files
            setProjectFiles(result.files);
            setLogs(result.logs || '');

            // Add Agent response
            setHistory(prev => [...prev, { role: 'assistant', content: result.explanation || "Changes applied locally." }]);

        } catch (error) {
            console.error(error);
            toast.error("Failed to update project");
            setHistory(prev => [...prev, { role: 'assistant', content: "Error: Failed to process request." }]);
        } finally {
            setChatLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        setLoading(true);
        setStatusText('Uploading project...');

        try {
            // 1. Upload & Init Session
            const sessionData = await projectsApi.uploadProjectSession(file);
            setSessionId(sessionData.session_id);
            setProjectFiles(sessionData.files);
            setShowIde(true); // Show IDE immediately with original files

            // 2. If instructions exist, run first chat
            if (instructions.trim()) {
                // Initialize history with the instruction
                setHistory([{ role: 'user', content: instructions }]);
                setChatLoading(true);

                // Run generic "thinking" toast or just let the chat loader show
                setStatusText('Applying initial changes...');

                const result = await projectsApi.sendProjectPrompt(sessionData.session_id, instructions);
                setProjectFiles(result.files);
                setLogs(result.logs);
                setHistory(prev => [...prev, { role: 'assistant', content: result.explanation }]);
                setChatLoading(false);
            } else {
                // If no instructions, showing empty chat is fine
                setHistory([]);
            }

            toast.success('Project loaded!');

        } catch (error) {
            toast.error('Failed to start session.');
            console.error(error);
            setShowIde(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 p-6 pt-24 font-sans flex flex-col items-center">
            <div className="w-full max-w-6xl flex flex-col gap-8">

                {/* Header - Only show if simple mode */}
                {!showIde && (
                    <div className="text-center space-y-4">
                        <div className="flex justify-center">
                            <div className="bg-indigo-600/20 p-4 rounded-2xl border border-indigo-500/30">
                                <Code2 className="w-10 h-10 text-indigo-400" />
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                            AI Full-Stack Editor
                        </h1>
                        <p className="text-slate-400 max-w-xl mx-auto">
                            Interactive Live Editor. Upload your project and chat with the AI to make changes instantly.
                        </p>
                    </div>
                )}

                {showIde ? (
                    <div className="fixed inset-0 z-[9999] bg-[#0d0d0d] flex flex-col" data-lenis-prevent>
                        <IdeInterface
                            files={projectFiles}
                            logs={logs}
                            onDownload={handleDownload}
                            zipBlob={null} // Managing view download via URL now
                            // Chat Props
                            history={history}
                            onSendMessage={handleChat}
                            sending={chatLoading}
                        />
                        <button
                            onClick={() => {
                                // Confirm exit?
                                if (window.confirm("Exit editor? Your session is saved on server temporarily.")) {
                                    setShowIde(false);
                                    setFile(null);
                                    setInstructions('');
                                    setHistory([]);
                                    setSessionId(null);
                                }
                            }}
                            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-800 text-slate-300 px-4 py-2 rounded-full text-sm hover:bg-slate-700 transition z-[10000]"
                        >
                            Exit Editor
                        </button>
                    </div>
                ) : (
                    /* Main Form */
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm shadow-xl max-w-3xl mx-auto w-full">
                        <form onSubmit={handleSubmit} className="space-y-8">

                            {/* File Upload */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-slate-300 block">Project ZIP File</label>
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`
                                      border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300
                                      ${file ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-slate-700 hover:border-indigo-500/50 hover:bg-slate-800/50'}
                                    `}
                                >
                                    <input
                                        type="file"
                                        accept=".zip"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />

                                    {file ? (
                                        <div className="flex flex-col items-center gap-3 animate-in fade-in zoom-in duration-300">
                                            <div className="bg-emerald-500/20 p-3 rounded-full">
                                                <FileArchive className="w-8 h-8 text-emerald-400" />
                                            </div>
                                            <div>
                                                <p className="text-emerald-300 font-medium">{file.name}</p>
                                                <p className="text-xs text-emerald-500/70">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={(e) => { e.stopPropagation(); setFile(null); }}
                                                className="text-xs text-slate-500 hover:text-red-400 mt-2"
                                            >
                                                Remove file
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-3 text-slate-500">
                                            <Upload className="w-8 h-8 opacity-50" />
                                            <p>Click to upload or drag and drop</p>
                                            <p className="text-xs text-slate-600">Supports .zip files only</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Instructions */}
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <label className="text-sm font-medium text-slate-300 block">Initial Instructions (Optional)</label>
                                    <span className="text-xs text-slate-500">You can also chat later</span>
                                </div>
                                <textarea
                                    value={instructions}
                                    onChange={(e) => setInstructions(e.target.value)}
                                    placeholder="Describe the initial changes (or leave blank to just open the editor)..."
                                    className="w-full h-40 bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-200 placeholder-slate-600 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all resize-none"
                                />
                            </div>

                            {/* Action Button */}
                            <button
                                type="submit"
                                disabled={!file || loading}
                                className={`
                                    w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300
                                    ${loading ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-900/20'}
                                    ${!file && !loading && 'opacity-50 cursor-not-allowed'}
                                  `}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        {statusText || 'Processing...'}
                                    </>
                                ) : (
                                    <>
                                        <Code2 className="w-5 h-5" />
                                        Launch Live Editor
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                )}
                {/* Feature List ... */}
                {!showIde && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm text-slate-500 max-w-3xl mx-auto w-full">
                        {/* ... features ... */}
                        <div className="bg-slate-900/30 p-4 rounded-xl border border-slate-800/50">
                            <p className="font-semibold text-slate-300 mb-1">Live Chat</p>
                            Iterate on your design continuously
                        </div>
                        <div className="bg-slate-900/30 p-4 rounded-xl border border-slate-800/50">
                            <p className="font-semibold text-slate-300 mb-1">Safe Edits</p>
                            Returns a new ZIP, keeping original safe
                        </div>
                        <div className="bg-slate-900/30 p-4 rounded-xl border border-slate-800/50">
                            <p className="font-semibold text-slate-300 mb-1">Any Language</p>
                            Works with Python, JS, React, HTML, etc.
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AiEditorPage;
