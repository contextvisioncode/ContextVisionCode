"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Terminal, Cpu, Wifi, ShieldCheck } from "lucide-react";

export const SystemBoot = ({ onComplete }: { onComplete: () => void }) => {
    const [step, setStep] = useState(0);

    const steps = [
        { text: "INITIALIZING CORE SYSTEMS...", icon: Cpu, color: "text-blue-500" },
        { text: "ESTABLISHING SECURE CONNECTION...", icon: Wifi, color: "text-purple-500" },
        { text: "VERIFYING INTEGRITY PROTOCOLS...", icon: ShieldCheck, color: "text-green-500" },
        { text: "LOADING NEURAL INTERFACE...", icon: Terminal, color: "text-cyan-500" },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setStep((prev) => {
                if (prev >= steps.length - 1) {
                    clearInterval(interval);
                    setTimeout(onComplete, 800); // Wait a bit after last step
                    return prev;
                }
                return prev + 1;
            });
        }, 800);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black font-mono"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
        >
            <div className="w-full max-w-md p-8 space-y-4">
                {steps.map((s, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                            opacity: i <= step ? 1 : 0,
                            x: i <= step ? 0 : -20,
                            color: i === step ? "#fff" : "#6b7280" // Highlight current step
                        }}
                        className="flex items-center gap-3 text-sm"
                    >
                        <s.icon className={`w-4 h-4 ${i <= step ? s.color : "text-gray-800"}`} />
                        <span className={i <= step ? "text-white" : "text-gray-800"}>
                            {s.text} {i < step && <span className="text-green-500 ml-2">[OK]</span>}
                            {i === step && <span className="animate-pulse">_</span>}
                        </span>
                    </motion.div>
                ))}

                <motion.div
                    className="h-1 bg-gray-900 rounded-full mt-8 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"
                        initial={{ width: "0%" }}
                        animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </motion.div>
            </div>
        </motion.div>
    );
};
