"use client";
import { motion } from "framer-motion";
import { FileText, RefreshCw } from "lucide-react";

export const IntelligenceBriefing = ({
    summary,
    onGenerate,
    isGenerating
}: {
    summary: string | null;
    onGenerate: () => void;
    isGenerating: boolean;
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 relative overflow-hidden group"
        >
            <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/50" />

            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-cyan-400" />
                    <h2 className="font-mono text-sm font-bold text-cyan-400 tracking-widest uppercase">Intelligence Briefing</h2>
                </div>
                <button
                    onClick={onGenerate}
                    disabled={isGenerating}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors disabled:opacity-50"
                    title="Regenerate Briefing"
                >
                    <RefreshCw className={`w-4 h-4 text-cyan-400 ${isGenerating ? "animate-spin" : ""}`} />
                </button>
            </div>

            <div className="min-h-[100px] text-sm text-gray-300 leading-relaxed font-mono">
                {summary ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="whitespace-pre-wrap"
                    >
                        {summary}
                    </motion.div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full py-8 text-gray-500 gap-2">
                        <p>No intelligence data available.</p>
                        <button
                            onClick={onGenerate}
                            disabled={isGenerating}
                            className="text-xs bg-cyan-500/10 text-cyan-400 px-3 py-1.5 rounded border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors"
                        >
                            {isGenerating ? "ANALYZING..." : "INITIALIZE ANALYSIS"}
                        </button>
                    </div>
                )}
            </div>

            {/* Decorative corner */}
            <div className="absolute top-0 right-0 p-2">
                <div className="w-2 h-2 border-t border-r border-white/20" />
            </div>
            <div className="absolute bottom-0 left-0 p-2">
                <div className="w-2 h-2 border-b border-l border-white/20" />
            </div>
        </motion.div>
    );
};
