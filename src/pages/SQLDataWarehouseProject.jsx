import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
    Database, ArrowLeft, Activity, Layers, Terminal, Server, CheckCircle, Play, 
    FileText, MonitorPlay, BookOpen, BarChart3, TrendingUp, PieChart, GitCommit, 
    Target, Filter, MessageSquare, CheckSquare, FileCode2, BookMarked, Settings, 
    Clock, Cpu, BarChart, X, ArrowUpRight, ArrowDownRight, Layers3, MoveRight
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   REUSABLE PREMIUM COMPONENTS
   ───────────────────────────────────────────────────────────── */
const GlassCard = ({ children, className = "", hover = true, onClick }) => (
    <div 
        onClick={onClick}
        className={`relative overflow-hidden rounded-2xl bg-[#160f24]/80 backdrop-blur-xl border border-white/[0.05] shadow-[0_8px_32px_rgba(0,0,0,0.5)] ${hover ? 'transition-all duration-500 hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] cursor-pointer group' : ''} ${className}`}
    >
        {hover && <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />}
        <div className="relative z-10 h-full">{children}</div>
    </div>
);

// Advanced 3D Tilt Card Component
const TiltCard = ({ children, className }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
            className={`relative ${className}`}
        >
            <div style={{ transform: "translateZ(50px)" }}>{children}</div>
        </motion.div>
    );
};

/* ─────────────────────────────────────────────────────────────
   TAB 1: THEORY & CONTEXT (3D TILT & EXPANDING LAYOUT)
   ───────────────────────────────────────────────────────────── */
const TheoryPage = () => {
    const [expandedMeal, setExpandedMeal] = useState(null);

    const mealPrepData = [
        { id: 1, title: 'Bronze Layer', analogy: 'Raw Veggies', color: '#cd7f32', short: 'Sourced exactly as-is from the farm.', long: 'The Bronze layer acts as a data lake dumping ground. We pull data directly from ERPs and CRMs without altering any schema. This ensures high traceability if we ever need to audit original values. Think of it as veggies straight from the farm—dirt and all.' },
        { id: 2, title: 'Silver Layer', analogy: 'Prepped Ingredients', color: '#94a3b8', short: 'Washed, peeled, and chopped.', long: 'The Silver layer is where Data Engineers earn their keep. We standardise column names to snake_case, handle NULL values (e.g., converting empty marital_status to "Unknown"), and deduplicate records. The data is now clean but not yet ready for business reporting.' },
        { id: 3, title: 'Gold Layer', analogy: 'Boxed Ready Meals', color: '#fbbf24', short: 'Cooked and assembled into Star Schemas.', long: 'The Gold layer is highly denormalized. We construct Fact and Dimension tables (Star Schema) that prioritize fast query performance. This is the exact format Business Analysts and Data Scientists consume to build Power BI dashboards.' }
    ];

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            {/* 3D Silos vs Central DWH */}
            <div className="grid md:grid-cols-2 gap-8 perspective-[1000px]">
                <TiltCard>
                    <GlassCard hover={false} className="p-8 border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.1)] h-full">
                        <h3 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center"><Activity size={14} className="text-red-400" /></div>
                            The Problem: Data Silos
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            Without a centralized architecture, analysts extract data locally. This leads to duplicate work and inconsistent metrics across the organization.
                        </p>
                        <div className="flex flex-col gap-3 relative z-20">
                            <motion.div whileHover={{ scale: 1.05 }} className="p-3 bg-[#0a0514] rounded-lg border border-red-500/40 flex items-center justify-between shadow-xl">
                                <span className="text-xs text-slate-300">Marketing Analyst (Excel)</span>
                                <span className="text-[10px] text-red-400 font-mono">Revenue = $450K</span>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} className="p-3 bg-[#0a0514] rounded-lg border border-red-500/40 flex items-center justify-between shadow-xl">
                                <span className="text-xs text-slate-300">Sales Analyst (Power BI)</span>
                                <span className="text-[10px] text-red-400 font-mono">Revenue = $480K</span>
                            </motion.div>
                        </div>
                    </GlassCard>
                </TiltCard>

                <TiltCard>
                    <GlassCard hover={false} className="p-8 border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.1)] h-full">
                        <h3 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center"><Server size={14} className="text-green-400" /></div>
                            The Solution: Central DWH
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            Automated ETL processes pull source data into a Single Source of Truth (SSOT). Metrics are calculated once in the Gold layer.
                        </p>
                        <div className="flex items-center gap-4 relative z-20">
                            <motion.div whileHover={{ scale: 1.05 }} className="p-4 bg-[#0a0514] rounded-xl border border-green-500/50 flex flex-col items-center flex-1 shadow-xl">
                                <Database size={24} className="text-green-400 mb-2 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                                <span className="text-[10px] uppercase tracking-widest text-slate-200 font-bold">Central SSOT</span>
                            </motion.div>
                            <div className="flex-1 flex flex-col gap-2">
                                <div className="p-2 bg-green-500/20 rounded border border-green-500/30 text-center text-[10px] text-green-300 font-mono">Rev = $480K</div>
                                <div className="p-2 bg-green-500/20 rounded border border-green-500/30 text-center text-[10px] text-green-300 font-mono">Rev = $480K</div>
                            </div>
                        </div>
                    </GlassCard>
                </TiltCard>
            </div>

            {/* Expanding Separation of Concerns */}
            <div className="text-center max-w-3xl mx-auto mt-16 mb-8">
                <h2 className="text-2xl font-display font-bold text-white mb-4">Separation of Concerns (The Meal Prep Analogy)</h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                    Click on a layer to understand the exact transformations that occur within the pipeline.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 relative">
                {mealPrepData.map((layer) => (
                    <motion.div 
                        key={layer.id} 
                        layoutId={`card-${layer.id}`}
                        onClick={() => setExpandedMeal(expandedMeal === layer.id ? null : layer.id)}
                        className={`cursor-pointer z-10 ${expandedMeal === layer.id ? 'md:col-span-3' : ''}`}
                    >
                        <GlassCard hover={true} className={`p-6 border-t-2 ${expandedMeal === layer.id ? 'bg-[#1a122e] shadow-[0_0_50px_rgba(168,85,247,0.2)]' : 'text-center'}`} style={{ borderTopColor: layer.color }}>
                            <motion.h4 layoutId={`title-${layer.id}`} className="text-lg font-bold text-white mb-1">{layer.title}</motion.h4>
                            <motion.div layoutId={`analogy-${layer.id}`} className="text-xs font-mono mb-4 px-2 py-1 rounded inline-block" style={{ backgroundColor: `${layer.color}20`, color: layer.color }}>
                                "{layer.analogy}"
                            </motion.div>
                            
                            <AnimatePresence mode="wait">
                                {expandedMeal === layer.id ? (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }} 
                                        animate={{ opacity: 1, height: 'auto' }} 
                                        exit={{ opacity: 0, height: 0 }}
                                        className="text-sm text-slate-300 leading-relaxed border-t border-white/10 pt-4 mt-4"
                                    >
                                        {layer.long}
                                    </motion.div>
                                ) : (
                                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-slate-400 leading-relaxed">
                                        {layer.short}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </GlassCard>
                    </motion.div>
                ))}
            </div>

            {/* Discovery Phase */}
            <div className="mt-16">
                <div className="text-center max-w-3xl mx-auto mb-8">
                    <h2 className="text-2xl font-display font-bold text-white mb-4">Discovery Phase: Source System Interview</h2>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Before writing a single line of code, Data Engineers must interview Source System Experts. These critical questions ensure the resulting architecture scales smoothly.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { title: '1. Business Context', icon: <MessageSquare size={18} className="text-purple-400"/>, color: 'purple', q1: 'What does this system do for the business?', q2: 'Who are the primary end-users?', q3: 'What are the core business entities?' },
                        { title: '2. Tech Stack', icon: <Server size={18} className="text-cyan-400"/>, color: 'cyan', q1: 'What is the underlying database technology?', q2: 'How can we connect? (REST API, SQL Server?)', q3: 'Where is the schema documentation?' },
                        { title: '3. Extract Constraints', icon: <Database size={18} className="text-pink-400"/>, color: 'pink', q1: 'When does the system experience highest load?', q2: 'Can we extract Incrementally or Full Loads?', q3: 'Are there rate limits on the APIs?' }
                    ].map((card, i) => (
                        <motion.div key={i} whileHover={{ y: -5 }}>
                            <GlassCard hover={false} className={`p-6 bg-${card.color}-500/5`}>
                                <div className={`w-10 h-10 rounded-full bg-${card.color}-500/20 flex items-center justify-center mb-4`}>{card.icon}</div>
                                <h4 className="text-white font-bold mb-3">{card.title}</h4>
                                <ul className="space-y-3 text-sm text-slate-400">
                                    <li className="flex items-start gap-2"><span className={`text-${card.color}-400 font-bold mt-0.5`}>•</span> {card.q1}</li>
                                    <li className="flex items-start gap-2"><span className={`text-${card.color}-400 font-bold mt-0.5`}>•</span> {card.q2}</li>
                                    <li className="flex items-start gap-2"><span className={`text-${card.color}-400 font-bold mt-0.5`}>•</span> {card.q3}</li>
                                </ul>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────────
   TAB 2: ARCHITECTURE OVERVIEW (HYPER-INTERACTIVE)
   ───────────────────────────────────────────────────────────── */
const ArchitecturePage = () => {
    const [activeModal, setActiveModal] = useState(null);

    const specifications = {
        bronze: { title: 'Bronze Layer', obj: 'Tables', load: 'Truncate & Insert', trans: 'As-Is Data Drop', audience: 'Data Engineers' },
        silver: { title: 'Silver Layer', obj: 'Views', load: 'Virtual (No physical load)', trans: 'Cleanse, Deduplicate, NULL Handling', audience: 'Data Scientists / Engineers' },
        gold: { title: 'Gold Layer', obj: 'Views', load: 'Virtual (No physical load)', trans: 'Star Schema (Fact & Dimensions)', audience: 'Business Analysts / BI Tools' }
    };

    // Stagger animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const item = {
        hidden: { opacity: 0, scale: 0.5, y: 50 },
        show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", bounce: 0.5, duration: 1 } }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex justify-between items-center bg-[#160f24] p-4 rounded-xl border border-white/[0.05] shadow-xl mb-4">
                <div>
                    <h3 className="text-white font-bold flex items-center gap-2"><Layers3 className="text-purple-400"/> Enterprise Data Flow</h3>
                    <p className="text-xs text-slate-400 mt-1">Nodes are <span className="text-white font-bold">draggable</span>. Grab them to inspect physics. Click for technical specs.</p>
                </div>
                <div className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-lg flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    <span className="text-xs font-mono text-purple-300">Pipeline Active</span>
                </div>
            </div>

            <div className="w-full min-h-[500px] rounded-3xl overflow-hidden bg-[#05030a] border border-white/[0.1] shadow-[0_0_50px_rgba(168,85,247,0.1)] p-8 relative flex items-center justify-center">
                {/* Moving Background Grid */}
                <motion.div 
                    animate={{ backgroundPosition: ['0px 0px', '40px 40px'] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="absolute inset-0 opacity-30 pointer-events-none"
                    style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')" }}
                />

                <motion.div 
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full gap-4 lg:gap-2"
                >
                    {/* Sources */}
                    <motion.div variants={item} drag dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }} className="w-full lg:w-48 flex flex-col gap-4 shrink-0 cursor-grab active:cursor-grabbing z-20">
                        <div className="text-center font-mono text-[10px] text-slate-500 uppercase tracking-widest font-bold">1. Source Systems</div>
                        <GlassCard hover={false} className="p-4 flex items-center gap-3 bg-[#110b1c]">
                            <div className="w-8 h-8 rounded-lg bg-[#160f24] border border-white/[0.1] flex items-center justify-center text-cyan-400 shrink-0"><FileText size={16} /></div>
                            <div className="truncate"><h4 className="text-sm font-bold text-white truncate">ERP Data</h4><p className="text-[10px] text-slate-400">CSV Exports</p></div>
                        </GlassCard>
                        <GlassCard hover={false} className="p-4 flex items-center gap-3 bg-[#110b1c]">
                            <div className="w-8 h-8 rounded-lg bg-[#160f24] border border-white/[0.1] flex items-center justify-center text-pink-400 shrink-0"><FileText size={16} /></div>
                            <div className="truncate"><h4 className="text-sm font-bold text-white truncate">CRM Data</h4><p className="text-[10px] text-slate-400">API / CSV</p></div>
                        </GlassCard>
                    </motion.div>

                    {/* Animated Beam 1 */}
                    <motion.div variants={item} className="hidden lg:block h-2 bg-slate-900 relative rounded-full overflow-hidden flex-1 shrink-0 min-w-[50px] shadow-[inset_0_0_10px_rgba(0,0,0,1)]">
                        <motion.div className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[2px]" animate={{ x: ['-100%', '300%'] }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} />
                    </motion.div>

                    {/* Bronze */}
                    <motion.div variants={item} drag dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }} onClick={() => setActiveModal('bronze')} whileHover={{ scale: 1.05 }} className="w-full lg:w-48 cursor-grab active:cursor-grabbing shrink-0 z-20">
                        <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}>
                            <div className="text-center font-mono text-[10px] text-[#cd7f32] uppercase tracking-widest mb-2 font-bold animate-pulse">Click for Specs</div>
                            <GlassCard hover={false} className="p-5 border-t-4 border-t-[#cd7f32] flex flex-col items-center text-center shadow-[0_0_30px_rgba(205,127,50,0.15)] bg-[#110b1c]">
                                <Server size={32} className="text-[#cd7f32] mb-3 drop-shadow-[0_0_15px_rgba(205,127,50,0.8)]" />
                                <h3 className="text-xl font-display font-bold text-white mb-2">Bronze</h3>
                                <span className="px-2 py-1 bg-[#cd7f32]/20 text-[#cd7f32] text-[9px] font-mono rounded border border-[#cd7f32]/30">Raw Ingestion</span>
                            </GlassCard>
                        </motion.div>
                    </motion.div>

                    {/* Animated Beam 2 */}
                    <motion.div variants={item} className="hidden lg:block h-2 bg-slate-900 relative rounded-full overflow-hidden flex-1 shrink-0 min-w-[50px] shadow-[inset_0_0_10px_rgba(0,0,0,1)]">
                        <motion.div className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-slate-300 to-transparent blur-[2px]" animate={{ x: ['-100%', '300%'] }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.5 }} />
                    </motion.div>

                    {/* Silver */}
                    <motion.div variants={item} drag dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }} onClick={() => setActiveModal('silver')} whileHover={{ scale: 1.05 }} className="w-full lg:w-48 cursor-grab active:cursor-grabbing shrink-0 z-20">
                        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}>
                            <div className="text-center font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-2 font-bold animate-pulse">Click for Specs</div>
                            <GlassCard hover={false} className="p-5 border-t-4 border-t-slate-400 flex flex-col items-center text-center shadow-[0_0_30px_rgba(148,163,184,0.15)] bg-[#110b1c]">
                                <Database size={32} className="text-slate-400 mb-3 drop-shadow-[0_0_15px_rgba(148,163,184,0.8)]" />
                                <h3 className="text-xl font-display font-bold text-white mb-2">Silver</h3>
                                <span className="px-2 py-1 bg-slate-400/20 text-slate-300 text-[9px] font-mono rounded border border-slate-400/30">Cleansed Data</span>
                            </GlassCard>
                        </motion.div>
                    </motion.div>

                    {/* Animated Beam 3 */}
                    <motion.div variants={item} className="hidden lg:block h-2 bg-slate-900 relative rounded-full overflow-hidden flex-1 shrink-0 min-w-[50px] shadow-[inset_0_0_10px_rgba(0,0,0,1)]">
                        <motion.div className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-yellow-400 to-transparent blur-[2px]" animate={{ x: ['-100%', '300%'] }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 1 }} />
                    </motion.div>

                    {/* Gold */}
                    <motion.div variants={item} drag dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }} onClick={() => setActiveModal('gold')} whileHover={{ scale: 1.05 }} className="w-full lg:w-48 cursor-grab active:cursor-grabbing shrink-0 z-20">
                        <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}>
                            <div className="text-center font-mono text-[10px] text-yellow-400 uppercase tracking-widest mb-2 font-bold animate-pulse">Click for Specs</div>
                            <GlassCard hover={false} className="p-5 border-t-4 border-t-yellow-400 flex flex-col items-center text-center shadow-[0_0_30px_rgba(250,204,21,0.15)] bg-[#110b1c]">
                                <MonitorPlay size={32} className="text-yellow-400 mb-3 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]" />
                                <h3 className="text-xl font-display font-bold text-white mb-2">Gold</h3>
                                <span className="px-2 py-1 bg-yellow-400/20 text-yellow-400 text-[9px] font-mono rounded border border-yellow-400/30">Business Logic</span>
                            </GlassCard>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Fullscreen AnimatePresence Modal */}
            <AnimatePresence>
                {activeModal && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                        onClick={() => setActiveModal(null)}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#160f24] border border-white/[0.1] rounded-2xl p-8 max-w-2xl w-full shadow-[0_0_50px_rgba(0,0,0,0.8)] relative"
                        >
                            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X size={24}/></button>
                            <h2 className="text-3xl font-display font-bold text-white mb-6 border-b border-white/[0.1] pb-4">
                                {specifications[activeModal].title} Technical Specifications
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1">Object Type</h4>
                                    <p className="text-lg font-bold text-purple-400">{specifications[activeModal].obj}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1">Load Method</h4>
                                    <p className="text-lg font-bold text-cyan-400">{specifications[activeModal].load}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1">Transformations Required</h4>
                                    <p className="text-lg font-bold text-pink-400">{specifications[activeModal].trans}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1">Target Audience</h4>
                                    <p className="text-lg font-bold text-yellow-400">{specifications[activeModal].audience}</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────────
   TAB 3: ETL PIPELINE (AIRFLOW DAG STYLE)
   ───────────────────────────────────────────────────────────── */
const ETLPipelinePage = () => {
    const [running, setRunning] = useState(false);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(-1);
    const [selectedTask, setSelectedTask] = useState(null);

    const tasks = [
        { id: 'extract_crm', name: 'Extract CRM Data', type: 'HttpSensor', duration: '2.1s', status: 'queued', 
          logs: ['[INFO] Connecting to CRM API...', '[INFO] Fetching /api/v1/customers (paginated)', '[SUCCESS] Fetched 45,000 records.'] },
        { id: 'extract_erp', name: 'Extract ERP Data', type: 'S3ToSqlOperator', duration: '4.5s', status: 'queued', 
          logs: ['[INFO] Downloading Sales.csv from Bucket...', '[INFO] File size: 1.2GB', '[SUCCESS] Extracted 1.2M rows.'] },
        { id: 'load_bronze', name: 'Load Bronze Layer', type: 'SqlExecuteOperator', duration: '12.0s', status: 'queued', 
          logs: ['[INFO] TRUNCATE TABLE bronze.customers', '[INFO] Bulk inserting 45,000 rows...', '[SUCCESS] Bronze load complete.'] },
        { id: 'cleanse_silver', name: 'Cleanse Silver Layer', type: 'SqlExecuteOperator', duration: '18.4s', status: 'queued', 
          logs: ['[INFO] Executing sp_cleanse_data...', '[INFO] Handling NULLs in marital_status...', '[INFO] Deduplicating records using ROW_NUMBER()', '[SUCCESS] Silver layer optimized.'] },
        { id: 'build_gold', name: 'Build Gold Star Schema', type: 'DbtRunOperator', duration: '5.2s', status: 'queued', 
          logs: ['[INFO] Running dbt model fact_sales...', '[INFO] Aggregating measures...', '[INFO] Linking foreign keys...', '[SUCCESS] Gold schema materialized.'] },
    ];

    const [uiTasks, setUiTasks] = useState(tasks);

    const runSimulation = () => {
        if (running) return;
        setRunning(true);
        setCurrentTaskIndex(0);
        setSelectedTask(null);
        setUiTasks(tasks.map(t => ({ ...t, status: 'queued' })));

        let index = 0;
        const interval = setInterval(() => {
            if (index >= tasks.length) {
                clearInterval(interval);
                setRunning(false);
                setCurrentTaskIndex(-1);
                return;
            }

            setUiTasks(prev => {
                const next = [...prev];
                if (index > 0) next[index - 1].status = 'success';
                if (index < tasks.length) next[index].status = 'running';
                return next;
            });

            index++;
        }, 1500);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#160f24] p-4 rounded-xl border border-white/[0.05] gap-4 shadow-xl">
                <div>
                    <h3 className="text-white font-bold flex items-center gap-2"><Layers3 className="text-cyan-400"/> DAG: daily_enterprise_etl</h3>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1 font-mono">
                        <span className="flex items-center gap-1"><Settings size={12}/> Schedule: @daily</span>
                        <span className="flex items-center gap-1"><Clock size={12}/> Next Run: 2026-10-14 00:00:00</span>
                    </div>
                </div>
                <button 
                    onClick={runSimulation}
                    disabled={running}
                    className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-500 rounded-lg font-bold text-white transition-all text-sm shadow-[0_0_15px_rgba(8,145,178,0.4)]"
                >
                    {running ? <><Activity size={16} className="animate-pulse" /> Running DAG...</> : <><Play size={16} fill="currentColor"/> Trigger DAG</>}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[500px]">
                <GlassCard hover={false} className="lg:col-span-8 p-8 relative overflow-hidden bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')]">
                    <h4 className="absolute top-4 left-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Graph View</h4>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <svg className="w-full h-full absolute inset-0 z-0">
                            <motion.path d="M 25% 25% L 50% 50%" stroke="#334155" strokeWidth="2" fill="none" strokeDasharray="4 4" animate={{ strokeDashoffset: [0, -20] }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} />
                            <motion.path d="M 75% 25% L 50% 50%" stroke="#334155" strokeWidth="2" fill="none" strokeDasharray="4 4" animate={{ strokeDashoffset: [0, -20] }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} />
                            <motion.path d="M 50% 50% L 50% 70%" stroke="#334155" strokeWidth="2" fill="none" strokeDasharray="4 4" animate={{ strokeDashoffset: [0, -20] }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} />
                            <motion.path d="M 50% 70% L 50% 90%" stroke="#334155" strokeWidth="2" fill="none" strokeDasharray="4 4" animate={{ strokeDashoffset: [0, -20] }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} />
                        </svg>
                        <div className="w-full h-full relative z-10 pointer-events-auto">
                            {uiTasks.map((task, i) => {
                                let top = '50%', left = '50%';
                                if (i === 0) { top = '25%'; left = '25%'; }
                                if (i === 1) { top = '25%'; left = '75%'; }
                                if (i === 2) { top = '50%'; left = '50%'; }
                                if (i === 3) { top = '70%'; left = '50%'; }
                                if (i === 4) { top = '90%'; left = '50%'; }

                                let statusClasses = "border-slate-700 bg-[#1e293b] text-slate-300";
                                if (task.status === 'running') statusClasses = "border-cyan-400 bg-cyan-900/40 text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.4)] animate-pulse";
                                if (task.status === 'success') statusClasses = "border-green-500 bg-green-900/30 text-green-100";

                                return (
                                    <motion.div 
                                        key={task.id} onClick={() => setSelectedTask(task)} whileHover={{ scale: 1.05 }}
                                        className={`absolute w-44 -translate-x-1/2 -translate-y-1/2 rounded border-2 px-3 py-2 flex flex-col items-center justify-center cursor-pointer transition-all ${statusClasses} ${selectedTask?.id === task.id ? 'ring-2 ring-white' : ''}`}
                                        style={{ top, left }}
                                    >
                                        <span className="font-mono text-[9px] uppercase opacity-70 mb-1">{task.type}</span>
                                        <span className="text-[11px] font-bold text-center leading-tight">{task.name}</span>
                                        {task.status === 'success' && <CheckCircle size={12} className="absolute -top-2 -right-2 text-green-400 bg-[#0a0514] rounded-full" />}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </GlassCard>

                <div className="lg:col-span-4 bg-[#0d0d12] border border-white/[0.1] rounded-2xl flex flex-col overflow-hidden shadow-2xl">
                    <div className="h-12 bg-[#1a1a24] border-b border-white/[0.05] flex items-center justify-between px-4">
                        <span className="text-xs font-bold text-slate-300 flex items-center gap-2"><Terminal size={14}/> Task Instance Logs</span>
                        {selectedTask && <button onClick={() => setSelectedTask(null)}><X size={14} className="text-slate-500 hover:text-white"/></button>}
                    </div>
                    <div className="p-4 flex-1 overflow-y-auto font-mono text-[11px] leading-loose custom-scrollbar bg-[#05030a]">
                        {!selectedTask ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-600 italic opacity-50">
                                <FileCode2 size={32} className="mb-2"/> Click a DAG node to view logs
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="p-3 bg-white/[0.02] rounded border border-white/[0.05]">
                                    <div className="text-white font-bold mb-1">{selectedTask.id}</div>
                                    <div className="flex justify-between text-slate-500">
                                        <span>Status: <span className={selectedTask.status === 'success' ? 'text-green-400' : selectedTask.status === 'running' ? 'text-cyan-400' : 'text-slate-400'}>{selectedTask.status.toUpperCase()}</span></span>
                                        <span>Duration: {selectedTask.status === 'queued' ? '-' : selectedTask.duration}</span>
                                    </div>
                                </div>
                                <div>
                                    {selectedTask.status === 'queued' ? (
                                        <span className="text-slate-600">Waiting for task execution to begin...</span>
                                    ) : (
                                        selectedTask.logs.map((log, i) => (
                                            <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.2 }} key={i} className={`${log.includes('[SUCCESS]') ? 'text-green-400' : log.includes('[INFO]') ? 'text-slate-300' : 'text-slate-500'}`}>
                                                {log}
                                            </motion.div>
                                        ))
                                    )}
                                    {selectedTask.status === 'running' && <div className="text-cyan-500 animate-pulse mt-2">_</div>}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────────
   TAB 4: STAR SCHEMA VISUALIZATION 
   ───────────────────────────────────────────────────────────── */
const StarSchemaPage = () => {
    const [hoveredTable, setHoveredTable] = useState(null);

    return (
        <div className="space-y-6 animate-in fade-in duration-700">
            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <h3 className="text-xl font-display font-bold text-white flex items-center gap-3">
                        <Database className="text-purple-500" /> Enterprise Star Schema
                    </h3>
                    <p className="text-sm text-slate-400 mt-2 max-w-2xl">
                        A fully denormalized Gold Layer designed to prioritize fast query performance in BI tools. Hover over tables to see relationships.
                    </p>
                </div>
                <GlassCard hover={false} className="p-4 border-yellow-500/20">
                    <h4 className="text-xs font-bold text-yellow-400 mb-1">Star vs Snowflake Schema</h4>
                    <p className="text-[10px] text-slate-400 leading-relaxed">
                        Unlike Snowflake, this Star schema connects Dimension tables directly to the Fact table, avoiding complex sub-dimension joins to maximize analytical read speeds.
                    </p>
                </GlassCard>
            </div>

            <div className="relative w-full h-[600px] md:h-[500px] bg-[#05030a] rounded-3xl border border-white/[0.05] shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] flex items-center justify-center p-8">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMTY4LDg1LDI0NywwLjA1KSIvPjwvc3ZnPg==')] opacity-50" />
                
                <motion.div 
                    onHoverStart={() => setHoveredTable('Fact_Sales')}
                    onHoverEnd={() => setHoveredTable(null)}
                    whileHover={{ scale: 1.05 }}
                    className={`relative z-20 w-48 bg-[#160f24] border ${hoveredTable === 'Fact_Sales' || !hoveredTable ? 'border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.4)]' : 'border-purple-500/30 opacity-50'} rounded-xl overflow-hidden transition-all duration-300 cursor-pointer`}
                >
                    <div className="bg-purple-500/20 px-3 py-2 text-xs font-bold text-white text-center border-b border-purple-500/30">Fact_Sales</div>
                    <div className="p-3 text-[10px] font-mono text-slate-400 space-y-1 text-center">
                        <div className="text-yellow-200">order_number (PK)</div>
                        <div>customer_key (FK)</div>
                        <div>product_key (FK)</div>
                        <div className="text-purple-300 font-bold mt-2 border-t border-white/5 pt-2">sales_amount</div>
                    </div>
                </motion.div>

                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                    <motion.path d="M 30% 25% L 50% 50%" stroke={hoveredTable === 'dim_customers' || hoveredTable === 'Fact_Sales' ? 'rgba(168,85,247,0.8)' : 'rgba(168,85,247,0.2)'} strokeWidth={hoveredTable === 'dim_customers' || hoveredTable === 'Fact_Sales' ? 4 : 2} strokeDasharray="4 4" className="transition-all duration-300" />
                    <motion.path d="M 70% 25% L 50% 50%" stroke={hoveredTable === 'dim_products' || hoveredTable === 'Fact_Sales' ? 'rgba(168,85,247,0.8)' : 'rgba(168,85,247,0.2)'} strokeWidth={hoveredTable === 'dim_products' || hoveredTable === 'Fact_Sales' ? 4 : 2} strokeDasharray="4 4" className="transition-all duration-300" />
                    <motion.path d="M 30% 75% L 50% 50%" stroke={hoveredTable === 'dim_date' || hoveredTable === 'Fact_Sales' ? 'rgba(168,85,247,0.8)' : 'rgba(168,85,247,0.2)'} strokeWidth={hoveredTable === 'dim_date' || hoveredTable === 'Fact_Sales' ? 4 : 2} strokeDasharray="4 4" className="transition-all duration-300" />
                    <motion.path d="M 70% 75% L 50% 50%" stroke={hoveredTable === 'dim_store' || hoveredTable === 'Fact_Sales' ? 'rgba(168,85,247,0.8)' : 'rgba(168,85,247,0.2)'} strokeWidth={hoveredTable === 'dim_store' || hoveredTable === 'Fact_Sales' ? 4 : 2} strokeDasharray="4 4" className="transition-all duration-300" />
                </svg>

                {['dim_customers', 'dim_products', 'dim_date', 'dim_store'].map((dim, i) => (
                    <motion.div 
                        key={dim} 
                        onHoverStart={() => setHoveredTable(dim)}
                        onHoverEnd={() => setHoveredTable(null)}
                        whileHover={{ scale: 1.05 }}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 3 + i * 0.5, ease: "easeInOut" }}
                        className={`absolute z-20 w-36 bg-[#160f24]/90 backdrop-blur border ${hoveredTable === dim || hoveredTable === 'Fact_Sales' || !hoveredTable ? 'border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'border-white/10 opacity-30'} rounded-lg overflow-hidden cursor-pointer transition-all duration-300`} 
                        style={{
                            top: i < 2 ? '15%' : 'auto', bottom: i >= 2 ? '15%' : 'auto',
                            left: i % 2 === 0 ? '15%' : 'auto', right: i % 2 !== 0 ? '15%' : 'auto'
                        }}
                    >
                        <div className="bg-white/10 px-2 py-1.5 text-[10px] font-bold text-slate-200 text-center border-b border-white/5">{dim}</div>
                        <div className="p-2 text-[8px] font-mono text-slate-400 space-y-1 text-center">
                           <div className="text-yellow-200">{dim.split('_')[1]}_key (PK)</div>
                           <div>attribute_1</div>
                           <div>attribute_2</div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────────
   TAB 5: ADVANCED ANALYTICS 
   ───────────────────────────────────────────────────────────── */
const AnalyticsPage = () => {
    return (
        <div className="bg-[#f0f2f5] p-6 rounded-xl text-slate-800 font-sans shadow-2xl animate-in zoom-in-95 duration-500">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-300">
                <div>
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2"><BarChart size={20} className="text-[#f2c811]"/> Sales Executive Dashboard</h3>
                    <p className="text-xs text-slate-500">Last updated: Today at 08:00 AM (Power BI Service)</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-3 py-1 bg-white border border-slate-300 rounded text-xs font-bold shadow-sm hover:bg-slate-50">Export</button>
                    <button className="px-3 py-1 bg-[#f2c811] text-black border border-[#d4af37] rounded text-xs font-bold shadow-sm hover:brightness-110">Share</button>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                    { label: 'Total Revenue', value: '$1.2M', trend: '+14.2%', up: true },
                    { label: 'Active Customers', value: '45,210', trend: '+5.1%', up: true },
                    { label: 'Avg Order Value', value: '$124.50', trend: '-2.4%', up: false },
                    { label: 'Return Rate', value: '3.2%', trend: '-0.5%', up: true }
                ].map((kpi, i) => (
                    <motion.div key={i} whileHover={{ y: -5, scale: 1.02 }} className="bg-white p-4 rounded shadow-sm border border-slate-200 flex flex-col justify-between cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] transition-shadow">
                        <span className="text-[11px] text-slate-500 font-semibold uppercase">{kpi.label}</span>
                        <div className="flex justify-between items-end mt-2">
                            <span className="text-2xl font-bold text-slate-800">{kpi.value}</span>
                            <span className={`text-[10px] font-bold flex items-center ${kpi.up ? 'text-green-600' : 'text-red-600'}`}>
                                {kpi.up ? <ArrowUpRight size={12}/> : <ArrowDownRight size={12}/>} {kpi.trend}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-white p-4 rounded shadow-sm border border-slate-200">
                    <h4 className="text-xs font-bold text-slate-600 mb-4 uppercase tracking-wide border-b pb-2">Revenue Running Total by Year (Cumulative)</h4>
                    <div className="relative h-48 w-full">
                        <svg viewBox="0 0 400 150" className="w-full h-full overflow-visible">
                            <path d="M 0 30 L 400 30 M 0 60 L 400 60 M 0 90 L 400 90 M 0 120 L 400 120" stroke="#f1f5f9" strokeWidth="1" fill="none" />
                            <motion.path initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} d="M 0 120 L 100 90 L 200 60 L 300 40 L 400 10 L 400 150 L 0 150 Z" fill="url(#area-gradient)" />
                            <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }} d="M 0 120 L 100 90 L 200 60 L 300 40 L 400 10" stroke="#118ab2" strokeWidth="3" fill="none" />
                            <circle cx="100" cy="90" r="4" fill="#118ab2" className="hover:r-6 transition-all cursor-pointer"/>
                            <circle cx="200" cy="60" r="4" fill="#118ab2" className="hover:r-6 transition-all cursor-pointer"/>
                            <circle cx="300" cy="40" r="4" fill="#118ab2" className="hover:r-6 transition-all cursor-pointer"/>
                            <circle cx="400" cy="10" r="4" fill="#118ab2" className="hover:r-6 transition-all cursor-pointer"/>
                            <text x="100" y="145" fontSize="10" fill="#64748b" textAnchor="middle">2023</text>
                            <text x="200" y="145" fontSize="10" fill="#64748b" textAnchor="middle">2024</text>
                            <text x="300" y="145" fontSize="10" fill="#64748b" textAnchor="middle">2025</text>
                            <text x="400" y="145" fontSize="10" fill="#64748b" textAnchor="middle">2026</text>
                            <defs>
                                <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#118ab2" stopOpacity="0.4" />
                                    <stop offset="100%" stopColor="#118ab2" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>

                <div className="bg-white p-4 rounded shadow-sm border border-slate-200">
                    <h4 className="text-xs font-bold text-slate-600 mb-4 uppercase tracking-wide border-b pb-2">Part-to-Whole (Sales by Category)</h4>
                    <div className="relative h-48 w-full flex items-center justify-center group">
                        <svg viewBox="0 0 100 100" className="w-40 h-40 transform -rotate-90">
                            <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="20" />
                            <motion.circle initial={{ strokeDasharray: "0 251" }} whileInView={{ strokeDasharray: "125 251" }} transition={{ duration: 1 }} cx="50" cy="50" r="40" fill="none" stroke="#06d6a0" strokeWidth="20" strokeDasharray="125 251" className="cursor-pointer hover:stroke-[22px] transition-all" />
                            <motion.circle initial={{ strokeDasharray: "0 251" }} whileInView={{ strokeDasharray: "80 251" }} transition={{ duration: 1, delay: 0.2 }} cx="50" cy="50" r="40" fill="none" stroke="#118ab2" strokeWidth="20" strokeDasharray="80 251" strokeDashoffset="-125" className="cursor-pointer hover:stroke-[22px] transition-all" />
                            <motion.circle initial={{ strokeDasharray: "0 251" }} whileInView={{ strokeDasharray: "46 251" }} transition={{ duration: 1, delay: 0.4 }} cx="50" cy="50" r="40" fill="none" stroke="#ffd166" strokeWidth="20" strokeDasharray="46 251" strokeDashoffset="-205" className="cursor-pointer hover:stroke-[22px] transition-all" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-[10px] text-slate-500">Total</span>
                            <span className="text-xl font-bold text-slate-800">$1.2M</span>
                        </div>
                    </div>
                    <div className="flex justify-center gap-4 mt-2">
                        <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#06d6a0]"></span><span className="text-[9px] text-slate-600">Bikes (50%)</span></div>
                        <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#118ab2]"></span><span className="text-[9px] text-slate-600">Parts (32%)</span></div>
                        <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#ffd166]"></span><span className="text-[9px] text-slate-600">Gear (18%)</span></div>
                    </div>
                </div>
            </div>
            
            <div className="mt-6 bg-white p-4 rounded shadow-sm border border-slate-200">
                <h4 className="text-xs font-bold text-slate-600 mb-4 uppercase tracking-wide border-b pb-2">Data Segmentation (CASE WHEN Sales Bins)</h4>
                <div className="space-y-4 pt-2">
                    {[
                        { label: 'Large Orders (> $1000)', val: 75, color: 'bg-[#118ab2]', count: '12,400' },
                        { label: 'Medium Orders ($500 - $1000)', val: 45, color: 'bg-[#06d6a0]', count: '8,210' },
                        { label: 'Small Orders (< $500)', val: 20, color: 'bg-[#ffd166]', count: '24,600' }
                    ].map((bar, i) => (
                        <div key={i} className="flex items-center gap-4 group cursor-pointer">
                            <span className="w-40 text-right text-[11px] font-semibold text-slate-600 group-hover:text-slate-900">{bar.label}</span>
                            <div className="flex-1 h-6 bg-slate-100 rounded overflow-hidden flex items-center">
                                <motion.div initial={{ width: 0 }} whileInView={{ width: `${bar.val}%` }} transition={{ duration: 0.8, delay: i * 0.1 }} className={`h-full ${bar.color} flex items-center justify-end px-2 group-hover:brightness-110`}>
                                    <span className="text-[10px] text-white font-bold">{bar.count} orders</span>
                                </motion.div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────────
   MAIN PROJECT COMPONENT WRAPPER
   ───────────────────────────────────────────────────────────── */
const SQLDataWarehouseProject = () => {
    const [activeTab, setActiveTab] = useState('Theory');

    const tabs = [
        { id: 'Theory', name: 'Theory', icon: <BookOpen size={14} /> },
        { id: 'Architecture', name: 'Architecture', icon: <Layers size={14} /> },
        { id: 'ETL Pipelines', name: 'ETL DAG', icon: <Cpu size={14} /> },
        { id: 'Star Schema', name: 'Star Schema', icon: <Database size={14} /> },
        { id: 'Analytics', name: 'BI Dashboard', icon: <BarChart size={14} /> }
    ];

    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="min-h-screen bg-[#05030a] text-slate-300 font-sans selection:bg-purple-500/30 pb-20 relative overflow-hidden">
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-900/10 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] opacity-50" />
            </div>
            
            <header className="sticky top-0 z-50 bg-[#05030a]/80 backdrop-blur-2xl border-b border-white/[0.05]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
                    <Link to="/#work" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform text-white" />
                        </div>
                        <span className="text-xs md:text-sm font-bold tracking-wide uppercase">Back</span>
                    </Link>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-20 relative z-10">
                <div className="mb-12 md:mb-16 flex flex-col items-center text-center">
                    <h1 className="text-3xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 tracking-tight leading-tight">
                        SQL Data Analytics <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400">
                            Enterprise Project
                        </span>
                    </h1>
                </div>

                <div className="flex justify-start md:justify-center mb-12 overflow-x-auto pb-4 custom-scrollbar">
                    <div className="inline-flex items-center p-1.5 bg-[#160f24]/80 backdrop-blur-md rounded-2xl border border-white/[0.05] shadow-2xl min-w-max">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 relative z-10 ${
                                    activeTab === tab.id ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                                }`}
                            >
                                {activeTab === tab.id && (
                                    <motion.div 
                                        layoutId="premiumTabBubble"
                                        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl -z-10 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                {tab.icon} {tab.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="min-h-[600px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                            transition={{ duration: 0.4 }}
                        >
                            {activeTab === 'Theory' && <TheoryPage />}
                            {activeTab === 'Architecture' && <ArchitecturePage />}
                            {activeTab === 'ETL Pipelines' && <ETLPipelinePage />}
                            {activeTab === 'Star Schema' && <StarSchemaPage />}
                            {activeTab === 'Analytics' && <AnalyticsPage />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default SQLDataWarehouseProject;
