"use client";
import { motion } from "framer-motion";
import { ShieldAlert, Zap, Scale, Map, Scissors, TestTube, Search, Bug } from "lucide-react";

interface TacticalAction {
    id: string;
    label: string;
    icon: any;
    description: string;
    prompt: string;
    color: string;
}

const actions: TacticalAction[] = [
    {
        id: "security",
        label: "SECURITY AUDIT",
        icon: ShieldAlert,
        description: "Deep scan for vulnerabilities & auth flaws",
        prompt: "Acting as a Lead Security Researcher, analyze the codebase for security vulnerabilities. Focus on authentication, data validation, and API security. List critical risks and remediation steps.",
        color: "text-red-400 border-red-500/30 hover:bg-red-500/10"
    },
    {
        id: "architecture",
        label: "ARCHITECTURAL REVIEW",
        icon: Scale,
        description: "Evaluate patterns & modularity",
        prompt: "Acting as a Software Architect, critique the project structure. Analyze separation of concerns, scalability, and adherence to best practices (SOLID, DRY). Suggest structural improvements.",
        color: "text-blue-400 border-blue-500/30 hover:bg-blue-500/10"
    },
    {
        id: "bugs",
        label: "BUG HUNTER",
        icon: Bug,
        description: "Find logical errors & edge cases",
        prompt: "Acting as a QA Engineer, analyze the code for logical errors, race conditions, and unhandled edge cases. Focus on the most complex functions.",
        color: "text-orange-400 border-orange-500/30 hover:bg-orange-500/10"
    },
    {
        id: "performance",
        label: "PERFORMANCE OPS",
        icon: Zap,
        description: "Optimize render & data flow",
        prompt: "Analyze the code for performance bottlenecks. Look for unnecessary re-renders, heavy computations, or inefficient database queries. Suggest specific optimizations.",
        color: "text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/10"
    },
    {
        id: "features",
        label: "FEATURE EVOLUTION",
        icon: Map,
        description: "AI-driven roadmap generation",
        prompt: "Based on the current codebase capabilities, propose 3 advanced features that would significantly increase user value. Describe how they would be implemented technically.",
        color: "text-purple-400 border-purple-500/30 hover:bg-purple-500/10"
    },
    {
        id: "refactor",
        label: "REFACTOR CANDIDATES",
        icon: Scissors,
        description: "Clean up technical debt",
        prompt: "Identify the top 3 files or functions that have the highest technical debt or complexity. Explain why they are problematic and provide a refactored version of the worst offender.",
        color: "text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10"
    }
];

export const TacticalGrid = ({ onTrigger }: { onTrigger: (prompt: string) => void }) => {
    return (
        <div className="grid grid-cols-2 gap-4 w-full">
            {actions.map((action, idx) => (
                <motion.button
                    key={action.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + idx * 0.1 }}
                    onClick={() => onTrigger(action.prompt)}
                    className={`group relative flex flex-col gap-2 p-4 rounded-xl border bg-black/40 backdrop-blur-md transition-all duration-300 text-left ${action.color}`}
                >
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                            <action.icon className="w-5 h-5" />
                            <span className="font-mono font-bold text-sm tracking-wider">{action.label}</span>
                        </div>
                        <Search className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-xs text-gray-400 font-sans leading-relaxed group-hover:text-gray-200 transition-colors">
                        {action.description}
                    </p>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </motion.button>
            ))}
        </div>
    );
};
