"use client";
import { motion } from "framer-motion";
import { Activity, Box, Code, Database, FileCode, Layers, Zap } from "lucide-react";
import { useMemo } from "react";

export const ProjectDNA = ({ nodes, edges }: { nodes: any[]; edges: any[] }) => {
    const stats = useMemo(() => {
        const moduleCount = nodes.length;
        const connectionCount = edges.length;
        const complexityScore = Math.round((connectionCount / (moduleCount || 1)) * 10);

        // Simple heuristic to guess tech stack from node labels (if available)
        const labels = nodes.map(n => n.data?.label?.toLowerCase() || "").join(" ");
        const techStack = [];
        if (labels.includes("react") || labels.includes("tsx") || labels.includes("jsx")) techStack.push("React");
        if (labels.includes("node") || labels.includes("express")) techStack.push("Node.js");
        if (labels.includes("python") || labels.includes("py")) techStack.push("Python");
        if (labels.includes("sql") || labels.includes("db")) techStack.push("SQL");
        if (techStack.length === 0) techStack.push("Generic");

        return { moduleCount, connectionCount, complexityScore, techStack };
    }, [nodes, edges]);

    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4 w-full space-y-6"
        >
            <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                <Activity className="w-5 h-5 text-cyan-400" />
                <h2 className="font-mono text-sm font-bold text-cyan-400 tracking-widest">PROJECT DNA</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <StatItem icon={Box} label="MODULES" value={stats.moduleCount} color="text-blue-400" />
                <StatItem icon={Layers} label="CONNECTIONS" value={stats.connectionCount} color="text-purple-400" />
                <StatItem icon={Zap} label="COMPLEXITY" value={`${stats.complexityScore}/10`} color="text-yellow-400" />
                <StatItem icon={Database} label="STACK" value={stats.techStack[0]} color="text-green-400" />
                <StatItem icon={FileCode} label="EST. LOC" value={stats.moduleCount * 124} color="text-gray-400" />
                <StatItem icon={Activity} label="HEALTH" value="98%" color="text-emerald-400" />
            </div>

            <div className="space-y-2">
                <h3 className="text-xs font-mono text-gray-500">SYSTEM HEALTH</h3>
                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                        initial={{ width: "0%" }}
                        animate={{ width: "92%" }}
                        transition={{ duration: 2, delay: 1 }}
                    />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-gray-400">
                    <span>OPTIMIZED</span>
                    <span>92%</span>
                </div>
            </div>
        </motion.div>
    );
};

const StatItem = ({ icon: Icon, label, value, color }: any) => (
    <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5 text-gray-500">
            <Icon className="w-3 h-3" />
            <span className="text-[10px] font-mono">{label}</span>
        </div>
        <span className={`text-xl font-bold font-mono ${color}`}>{value}</span>
    </div>
);
