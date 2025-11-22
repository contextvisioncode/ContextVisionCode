"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Github, Lock, Zap, ShieldCheck, Eye, Cpu, Activity, Server, Code2, ChevronRight } from "lucide-react";
import { AuroraBackground } from "@/components/ui/AuroraBackground";

export default function HomePage() {
  const router = useRouter();
  const [repoUrl, setRepoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPro, setIsPro] = useState(false); // Mock user plan
  const [projectCount, setProjectCount] = useState(0); // Mock project count
  const [showPaywall, setShowPaywall] = useState(false);
  const [sessionId, setSessionId] = useState("INITIALIZING...");

  useEffect(() => {
    setSessionId(crypto.randomUUID().slice(0, 8));
  }, []);

  const handleAnalyze = async () => {
    if (!repoUrl) return;

    // Paywall Check
    if (!isPro && projectCount >= 1) {
      setShowPaywall(true);
      return;
    }

    setIsLoading(true);
    try {
      const projectId = crypto.randomUUID();
      const res = await fetch("http://localhost:3001/api/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, repoUrl }),
      });

      if (res.ok) {
        router.push(`/dashboard/project/${projectId}`);
      } else {
        alert("Ingestion failed. Please check the URL.");
      }
    } catch (e) {
      console.error(e);
      alert("Error connecting to backend");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpgrade = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/create-checkout-session", {
        method: "POST",
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-indigo-500/30">

      {/* --- HERO SECTION --- */}
      <AuroraBackground className="relative h-screen min-h-[800px] flex flex-col items-center justify-center overflow-hidden">
        <div className="relative z-10 max-w-4xl w-full px-4 text-center space-y-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-indigo-300 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              V2.0: MISSION CONTROL ONLINE
            </div>

            <h1 className="text-6xl md:text-7xl font-bold tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-indigo-100 to-indigo-900/50">
              The X-Ray for Your Codebase.
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Stop flying blind. Visualize architecture, detect vulnerabilities, and master your project with <span className="text-indigo-400 font-semibold">AI-driven intelligence</span>.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col gap-4 max-w-lg mx-auto w-full bg-black/40 backdrop-blur-xl p-2 rounded-2xl border border-white/10 shadow-2xl shadow-indigo-500/10"
          >
            <div className="relative group">
              <Github className="absolute left-4 top-4 h-5 w-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
              <input
                type="text"
                placeholder="Paste GitHub Repository URL (e.g., owner/repo)"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="w-full h-14 pl-12 pr-4 rounded-xl bg-white/5 border border-white/5 focus:border-indigo-500/50 focus:bg-white/10 focus:ring-1 focus:ring-indigo-500/50 transition-all outline-none placeholder:text-gray-600 text-lg font-mono"
              />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={isLoading}
              className="h-14 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Initializing Neural Link...
                </span>
              ) : (
                <>
                  <Zap className="w-5 h-5 fill-current" /> REVEAL THE INVISIBLE
                </>
              )}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-6 text-xs font-mono text-gray-500"
          >
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3 h-3" /> 100% PRIVATE & SECURE</span>
            <span className="flex items-center gap-1.5"><Server className="w-3 h-3" /> LOCAL EXECUTION</span>
            <span className="flex items-center gap-1.5"><Eye className="w-3 h-3" /> ANONYMOUS MODE</span>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-600"
        >
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-gray-600 rounded-full" />
          </div>
        </motion.div>
      </AuroraBackground>

      {/* --- FEATURES SECTION --- */}
      <section className="py-32 relative z-10 bg-[#030712]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Total Situational Awareness</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              ContextCore isn't just a visualizer. It's a <span className="text-indigo-400">Mission Control</span> for your software architecture.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Cpu}
              title="Intelligence Briefing"
              desc="Get an instant AI-generated executive summary of your entire project. Understand the 'what' and 'why' in seconds."
            />
            <FeatureCard
              icon={Activity}
              title="Tactical Operations"
              desc="Trigger specialized AI agents to audit security, review architecture, and hunt for bugs with a single click."
            />
            <FeatureCard
              icon={Code2}
              title="Project DNA"
              desc="Visualize the complexity, tech stack, and health of your codebase through our proprietary neural graph engine."
            />
          </div>
        </div>
      </section>

      {/* --- PRIVACY SECTION --- */}
      <section className="py-32 relative z-10 border-t border-white/5 bg-gradient-to-b from-[#030712] to-indigo-950/20">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-xs font-mono text-green-400">
              <Lock className="w-3 h-3" /> BANK-GRADE SECURITY
            </div>
            <h2 className="text-4xl font-bold">Your Code Never Leaves Your Sight.</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              We understand that code is intellectual property. ContextCore operates with a <span className="text-white font-semibold">Zero-Retention Policy</span>.
              Your repository is analyzed in ephemeral containers and discarded immediately after the session.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-3"><Check className="text-green-500" /> Ephemeral Analysis Environments</li>
              <li className="flex items-center gap-3"><Check className="text-green-500" /> No Long-term Code Storage</li>
              <li className="flex items-center gap-3"><Check className="text-green-500" /> Enterprise-Ready Compliance</li>
            </ul>
          </div>
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full" />
            <div className="relative bg-black/50 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl">
              <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-6">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <div className="font-bold text-lg">Secure Enclave Active</div>
                  <div className="text-xs text-gray-500 font-mono">SESSION ID: {sessionId}</div>
                </div>
              </div>
              <div className="space-y-4 font-mono text-xs text-gray-400">
                <div className="flex justify-between"><span>ENCRYPTION</span><span className="text-white">AES-256</span></div>
                <div className="flex justify-between"><span>DATA RETENTION</span><span className="text-white">0ms</span></div>
                <div className="flex justify-between"><span>ACCESS LOG</span><span className="text-white">PRIVATE</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20 text-center relative z-10">
        <h2 className="text-3xl font-bold mb-8">Ready to see the unseen?</h2>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors inline-flex items-center gap-2"
        >
          Start Analysis Now <ChevronRight className="w-4 h-4" />
        </button>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-8 border-t border-white/5 text-center text-gray-600 text-sm relative z-10">
        <p>© 2025 ContextCore Vision. All systems nominal.</p>
      </footer>

      {/* Paywall Modal (Unchanged) */}
      {showPaywall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0f172a] border border-indigo-500/30 rounded-2xl p-8 max-w-md w-full text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none" />
            <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8 text-indigo-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">Upgrade to Pro</h3>
              <p className="text-muted-foreground">
                Free plan is limited to 1 repository. Unlock unlimited visualizations and deeper insights.
              </p>
            </div>
            <button
              onClick={handleUpgrade}
              className="w-full h-12 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold shadow-lg transition-all"
            >
              Upgrade Now - $19/mo
            </button>
            <button
              onClick={() => setShowPaywall(false)}
              className="text-sm text-muted-foreground hover:text-white transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const FeatureCard = ({ icon: Icon, title, desc }: any) => (
  <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all hover:-translate-y-1 group">
    <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
      <Icon className="w-6 h-6 text-indigo-400" />
    </div>
    <h3 className="text-xl font-bold mb-3 text-gray-100">{title}</h3>
    <p className="text-gray-400 leading-relaxed">
      {desc}
    </p>
  </div>
);

const Check = ({ className }: { className?: string }) => (
  <svg className={cn("w-5 h-5", className)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

import { cn } from "@/lib/utils";
