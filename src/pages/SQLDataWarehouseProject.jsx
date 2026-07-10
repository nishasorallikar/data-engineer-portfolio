import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
    Database, ArrowLeft, Activity, Layers, Terminal, Server, CheckCircle, Play, 
    FileText, MonitorPlay, BookOpen, BarChart3, TrendingUp, PieChart, GitCommit, 
    Target, Filter, MessageSquare, CheckSquare, FileCode2, BookMarked, Settings, 
    Clock, Cpu, BarChart, X, ArrowUpRight, ArrowDownRight, Layers3, MoveRight,
    Table2, Key, Link2, Hash, Lock
} from 'lucide-react';

import { GlassCard, TiltCard } from '../components/ui/Cards';

/* ─────────────────────────────────────────────────────────────
   PREMIUM HERO SECTION (STITCH DESIGN)
   ───────────────────────────────────────────────────────────── */
const PremiumHero = () => {
    return (
        <div className="relative w-full overflow-hidden rounded-3xl border border-cyan-500/20 bg-[#0a0a0c]/80 backdrop-blur-3xl mb-16 shadow-[0_0_80px_rgba(0,242,255,0.05)]">
            {/* Glowing Orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="grid lg:grid-cols-2 gap-12 p-8 md:p-12 items-center relative z-10">
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-6"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
                        <Terminal size={14} />
                        <span>END-TO-END PIPELINE</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white leading-[1.1] tracking-tight">
                        SQL Data Warehouse
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ff] to-[#bc13fe] mt-2">
                            Architecture
                        </span>
                    </h1>
                    <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
                        A high-performance data engineering pipeline transforming raw ERP/CRM data into a business-ready Star Schema for advanced analytics.
                    </p>
                </motion.div>

                <div className="relative h-64 md:h-80 flex items-center justify-center">
                    {/* Connection Line */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="none">
                        <motion.path 
                            d="M 15% 50% L 50% 50% L 85% 50%" 
                            stroke="rgba(0, 242, 255, 0.2)" 
                            strokeWidth="2" 
                            fill="none" 
                        />
                        <motion.path 
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            d="M 15% 50% L 50% 50% L 85% 50%" 
                            stroke="#00f2ff" 
                            strokeWidth="3" 
                            fill="none" 
                            className="drop-shadow-[0_0_10px_rgba(0,242,255,0.8)]"
                        />
                    </svg>

                    {/* Medallion Nodes */}
                    <div className="flex w-full justify-between items-center z-10 px-4">
                        {[
                            { name: 'Bronze', color: 'text-[#cd7f32]', border: 'border-[#cd7f32]/50', bg: 'bg-[#cd7f32]/10', glow: 'shadow-[0_0_30px_rgba(205,127,50,0.2)]', icon: <Database size={24} /> },
                            { name: 'Silver', color: 'text-slate-300', border: 'border-slate-400/50', bg: 'bg-slate-400/10', glow: 'shadow-[0_0_30px_rgba(148,163,184,0.2)]', icon: <Filter size={24} /> },
                            { name: 'Gold', color: 'text-yellow-400', border: 'border-yellow-400/50', bg: 'bg-yellow-400/10', glow: 'shadow-[0_0_30px_rgba(250,204,21,0.2)]', icon: <Target size={24} /> }
                        ].map((node, i) => (
                            <motion.div 
                                key={node.name}
                                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 + (i * 0.2) }}
                                whileHover={{ y: -10, scale: 1.05 }}
                                className={`w-24 h-24 md:w-32 md:h-32 rounded-2xl border ${node.border} ${node.bg} backdrop-blur-xl flex flex-col items-center justify-center gap-3 ${node.glow} cursor-pointer`}
                            >
                                <div className={node.color}>{node.icon}</div>
                                <span className={`text-xs md:text-sm font-bold tracking-widest uppercase ${node.color}`}>{node.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
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
                        { title: '1. Business Context', icon: <MessageSquare size={18} className="text-blue-400"/>, color: 'purple', q1: 'What does this system do for the business?', q2: 'Who are the primary end-users?', q3: 'What are the core business entities?' },
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

            {/* Comprehensive Technical Guide */}
            <div className="mt-24">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl font-display font-bold text-white mb-4">Comprehensive Theory Guide</h2>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Detailed theoretical overview and technical framework for the SQL Data Warehouse Project. Interactive modules demonstrate core Data Engineering paradigms.
                    </p>
                </div>
                
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
                    }}
                    className="space-y-6 max-w-5xl mx-auto"
                >
                    {/* Section I: ETL vs ELT */}
                    <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } }}>
                        <GlassCard hover={true} className="p-8 border border-white/10 bg-[#0a0514]/80 shadow-lg overflow-hidden relative">
                            {/* Ambient Glow */}
                            <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-[80px] pointer-events-none"></div>
                            
                            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                                <Settings className="text-cyan-400" /> I. ETL vs ELT Architectures
                            </h3>
                            <div className="grid md:grid-cols-2 gap-10 items-stretch">
                                <div>
                                    <p className="text-sm text-slate-400 mb-6 leading-relaxed">Modern cloud architectures have shifted from traditional <strong className="text-white">ETL</strong> (Extract, Transform, Load) to <strong className="text-white">ELT</strong> (Extract, Load, Transform). This leverages the massive computing power of the cloud data warehouse to perform transformations after ingestion.</p>
                                    
                                    <div className="space-y-4">
                                        <div className="bg-[#110b1c] p-4 rounded-xl border border-white/5 relative overflow-hidden">
                                            <h4 className="text-xs font-bold text-slate-300 mb-2 font-mono">Traditional ETL</h4>
                                            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                                                <span className="text-slate-400">Extract</span> <MoveRight size={12}/>
                                                <span className="text-pink-400 bg-pink-500/10 px-2 py-1 rounded">Transform (Compute)</span> <MoveRight size={12}/>
                                                <span className="text-slate-400">Load (DWH)</span>
                                            </div>
                                        </div>
                                        <div className="bg-[#110b1c] p-4 rounded-xl border border-cyan-500/30 relative overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                                            <h4 className="text-xs font-bold text-cyan-300 mb-2 font-mono">Modern ELT (This Project)</h4>
                                            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                                                <span className="text-slate-400">Extract</span> <MoveRight size={12}/>
                                                <span className="text-slate-400">Load (DWH)</span> <MoveRight size={12}/>
                                                <span className="text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/20">Transform (In-DWH Compute)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#05030a] rounded-xl border border-white/5 p-6 flex flex-col justify-center relative">
                                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')]"></div>
                                    <h4 className="text-xs font-mono text-cyan-500 mb-4 z-10 text-center uppercase tracking-widest">Why ELT?</h4>
                                    <ul className="space-y-4 text-sm text-slate-400 z-10">
                                        <li className="flex gap-3"><span className="text-cyan-500 mt-1"><CheckCircle size={14}/></span> <span><strong className="text-slate-200">Compute Scalability:</strong> Cloud DWHs (Snowflake, BigQuery) separate compute from storage, making in-database transformations extremely fast.</span></li>
                                        <li className="flex gap-3"><span className="text-cyan-500 mt-1"><CheckCircle size={14}/></span> <span><strong className="text-slate-200">Raw Data Retention:</strong> Loading raw data directly into the Bronze layer ensures no data is lost during pipeline failures.</span></li>
                                        <li className="flex gap-3"><span className="text-cyan-500 mt-1"><CheckCircle size={14}/></span> <span><strong className="text-slate-200">SQL Ubiquity:</strong> Transformations can be written in SQL (e.g., using dbt) rather than complex Python/Spark code.</span></li>
                                    </ul>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                    
                    {/* Section II: Data Modeling (SCD Type 2) */}
                    <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } }}>
                        <GlassCard hover={true} className="p-8 border border-white/10 bg-[#0a0514]/80 shadow-lg relative overflow-hidden">
                            {/* Ambient Glow */}
                            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

                            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                                <Database className="text-purple-400" /> II. Slowly Changing Dimensions (SCD Type 2)
                            </h3>
                            <div className="grid md:grid-cols-12 gap-10 items-stretch">
                                <div className="md:col-span-4">
                                    <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                                        <strong className="text-white">SCD Type 2</strong> is the industry standard for maintaining historical context in Dimension tables. Instead of overwriting data when an attribute changes (Type 1), we expire the old record and insert a new one.
                                    </p>
                                    <p className="text-xs text-slate-500 italic mb-6">Watch the animation to see how a customer's address update is handled historically.</p>
                                    <div className="bg-[#110b1c] p-4 rounded-xl border border-purple-500/20">
                                        <h4 className="text-[10px] font-mono text-purple-400 uppercase tracking-widest mb-2">Required Columns</h4>
                                        <ul className="text-xs text-slate-400 space-y-1.5 font-mono">
                                            <li className="flex justify-between"><span>surrogate_key</span> <span className="text-yellow-500">PK</span></li>
                                            <li className="flex justify-between"><span>business_key</span> <span>UK</span></li>
                                            <li className="flex justify-between"><span>valid_from</span> <span className="text-emerald-400">DATE</span></li>
                                            <li className="flex justify-between"><span>valid_to</span> <span className="text-pink-400">DATE</span></li>
                                            <li className="flex justify-between"><span>is_current</span> <span className="text-blue-400">BOOLEAN</span></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="md:col-span-8 bg-[#05030a] rounded-xl border border-white/5 p-6 flex flex-col justify-center relative min-h-[250px]">
                                    <div className="w-full overflow-x-auto">
                                        <div className="min-w-[500px]">
                                            <div className="grid grid-cols-6 gap-2 mb-3 px-2 text-[10px] font-mono text-purple-300 uppercase tracking-widest text-center border-b border-white/10 pb-2">
                                                <div>sk_id</div>
                                                <div>cust_id</div>
                                                <div>address</div>
                                                <div>valid_from</div>
                                                <div>valid_to</div>
                                                <div>is_current</div>
                                            </div>
                                            
                                            <div className="space-y-3">
                                            {/* Expired Record */}
                                            <motion.div 
                                                animate={{ backgroundColor: ['rgba(28,28,36,1)', 'rgba(239,68,68,0.1)', 'rgba(28,28,36,0.5)'], opacity: [1, 1, 0.5] }}
                                                transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
                                                className="grid grid-cols-6 gap-2 px-2 py-3 bg-[#1c1c24] rounded-lg border border-white/5 text-xs font-mono text-center items-center"
                                            >
                                                <div className="text-yellow-500">101</div>
                                                <div className="text-slate-300">C-01</div>
                                                <div className="text-slate-400 line-through">NY</div>
                                                <div className="text-slate-400">2023-01-01</div>
                                                <motion.div animate={{ color: ['#94a3b8', '#ef4444', '#ef4444'] }} transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }} className="font-bold">2024-05-15</motion.div>
                                                <motion.div animate={{ color: ['#4ade80', '#ef4444', '#ef4444'] }} transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }} className="font-bold">FALSE</motion.div>
                                            </motion.div>

                                            {/* Active Record (Inserted) */}
                                            <motion.div 
                                                animate={{ opacity: [0, 0, 1], y: [-20, -20, 0], backgroundColor: ['rgba(28,28,36,1)', 'rgba(28,28,36,1)', 'rgba(16,185,129,0.1)'] }}
                                                transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
                                                className="grid grid-cols-6 gap-2 px-2 py-3 bg-[#1c1c24] rounded-lg border border-emerald-500/30 text-xs font-mono text-center items-center shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                                            >
                                                <div className="text-yellow-500">102</div>
                                                <div className="text-slate-300">C-01</div>
                                                <div className="text-emerald-300 font-bold">CA</div>
                                                <div className="text-emerald-400">2024-05-15</div>
                                                <div className="text-slate-500">9999-12-31</div>
                                                <div className="text-emerald-400 font-bold">TRUE</div>
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute bottom-4 right-4 text-[9px] font-mono text-slate-500 flex items-center gap-1">
                                    <Activity size={10} className="animate-pulse text-purple-400"/> Live Simulation
                                </div>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>

                    {/* Section III */}
                    <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } }}>
                        <GlassCard hover={true} className="p-8 border border-white/10 bg-[#0a0514]/80 shadow-lg relative overflow-hidden">
                            {/* Ambient Glow */}
                            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-pink-500/10 rounded-full blur-[100px] pointer-events-none"></div>

                            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                                <FileCode2 className="text-pink-400" /> III. Standards & Technical Conventions
                            </h3>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="bg-[#110b1c] p-6 rounded-xl border border-white/5 shadow-inner">
                                    <h4 className="text-sm font-mono text-pink-300 mb-3 uppercase tracking-wider">1. Naming Conventions</h4>
                                    <ul className="space-y-2 text-sm text-slate-400">
                                        <li className="flex gap-2"><span className="text-pink-500">•</span> <span><strong className="text-slate-200">Format:</strong> Lower-Snake Case (`customer_info`).</span></li>
                                        <li className="flex gap-2"><span className="text-pink-500">•</span> <span><strong className="text-slate-200">Avoid:</strong> Spaces, special chars, SQL reserved keywords.</span></li>
                                    </ul>
                                </div>
                                <div className="bg-[#110b1c] p-6 rounded-xl border border-white/5 shadow-inner">
                                    <h4 className="text-sm font-mono text-pink-300 mb-3 uppercase tracking-wider flex items-center gap-2"><Layers3 size={14}/> 2. Medallion Schemas</h4>
                                    <ul className="space-y-3 text-sm text-slate-400">
                                        <li className="flex gap-2 items-start"><span className="text-pink-500 mt-1">•</span> <span><strong className="text-slate-200">Bronze:</strong> `bronze.` namespace for raw data.</span></li>
                                        <li className="flex gap-2 items-start"><span className="text-pink-500 mt-1">•</span> <span><strong className="text-slate-200">Silver/Gold:</strong> `silver.` / `gold.` with `dim_` & `fact_` table prefixes.</span></li>
                                    </ul>
                                </div>
                                <div className="bg-[#110b1c] p-6 rounded-xl border border-white/5 shadow-inner">
                                    <h4 className="text-sm font-mono text-pink-300 mb-3 uppercase tracking-wider flex items-center gap-2"><Lock size={14}/> 3. Implementation Constraints</h4>
                                    <ul className="space-y-3 text-sm text-slate-400">
                                        <li className="flex gap-2 items-start"><span className="text-pink-500 mt-1">•</span> <span><strong className="text-slate-200">Surrogate Keys:</strong> Always use system-generated IDs (IDENTITY) over business keys.</span></li>
                                        <li className="flex gap-2 items-start"><span className="text-pink-500 mt-1">•</span> <span><strong className="text-slate-200">Idempotency:</strong> All pipelines must be safe to rerun without duplicating data.</span></li>
                                    </ul>
                                </div>
                        </div>
                    </GlassCard>
                    </motion.div>
                    
                    {/* Section IV: Technical Case Study (Blog) */}
                    <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } }}>
                        <div className="mt-16 text-center max-w-3xl mx-auto mb-8">
                            <h2 className="text-3xl font-display font-bold text-white mb-4 flex items-center justify-center gap-3">
                                <BookOpen className="text-yellow-400" /> IV. Project Case Study
                            </h2>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                A deep dive into the architectural decisions, challenges, and business value of this Enterprise Data Warehouse.
                            </p>
                        </div>
                        
                        <div className="bg-[#110b1c] rounded-2xl border border-white/10 p-8 md:p-12 shadow-2xl relative overflow-hidden">
                            {/* Decorative quotes */}
                            <div className="absolute top-8 left-8 text-6xl text-white/[0.03] font-serif font-bold">"</div>
                            
                            <article className="prose prose-invert prose-slate max-w-none relative z-10">
                                <div className="space-y-8 text-slate-300 leading-relaxed text-sm md:text-base">
                                    
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-3 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">The Business Problem: Siloed Chaos</h3>
                                        <p>
                                            Before this architecture was implemented, the organization suffered from classic "data silos." The Sales team pulled revenue numbers directly from the CRM (Salesforce/HubSpot), while the Finance team relied on the ERP system (NetSuite/SAP). Because these systems didn't communicate natively, metrics never tied out at the end of the month. A simple question like <em>"What was our net revenue by product category in Q3?"</em> would take analysts days to answer, heavily relying on brittle Excel VLOOKUPs.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">The Architectural Solution: A Single Source of Truth</h3>
                                        <p className="mb-4">
                                            The goal of this project was to build an automated, scalable pipeline that centralized data into a Single Source of Truth (SSOT). I chose a modern <strong>ELT (Extract, Load, Transform)</strong> approach over traditional ETL. By extracting raw data and loading it directly into the cloud data warehouse (the Bronze layer), we decoupled ingestion from computation.
                                        </p>
                                        <p>
                                            Using a <strong>Medallion Architecture</strong>, the data is progressively refined:
                                        </p>
                                        <ul className="list-disc pl-6 space-y-2 mt-2 text-slate-400">
                                            <li><strong>Bronze (Raw):</strong> Historical, immutable append-only data exactly as it arrived from the source APIs.</li>
                                            <li><strong>Silver (Cleansed):</strong> Deduplicated, casted to proper data types, and filtered for PII. This layer acts as the foundation for Data Science workloads.</li>
                                            <li><strong>Gold (Business):</strong> Highly aggregated dimensional models (Star Schemas) optimized specifically for BI tools like Tableau and PowerBI.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Overcoming Challenges: Tracking Historical Changes</h3>
                                        <p>
                                            One of the biggest technical hurdles was dealing with mutable source data. If a customer moved from New York to California, the CRM simply overwrote their state. However, the business needed to know where the customer lived <em>at the time of a past purchase</em> to accurately calculate regional sales tax compliance.
                                        </p>
                                        <p className="mt-4">
                                            To solve this, I implemented <strong>Slowly Changing Dimensions (SCD Type 2)</strong> in the Customer Dimension. By introducing surrogate keys (<code>sk_id</code>), alongside <code>valid_from</code> and <code>valid_to</code> timestamps, the warehouse seamlessly tracks full historical state without losing past context.
                                        </p>
                                    </div>

                                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 mt-8">
                                        <h3 className="text-lg font-bold text-emerald-400 mb-2 flex items-center gap-2">
                                            <TrendingUp size={18}/> Business Impact
                                        </h3>
                                        <p className="text-sm text-slate-300">
                                            The deployment of this automated pipeline reduced monthly reporting time from <strong>4 days to under 15 minutes</strong>. More importantly, it established organizational trust in the data, enabling executive leadership to make real-time decisions based on a unified dashboard rather than arguing over whose spreadsheet was correct.
                                        </p>
                                    </div>

                                </div>
                            </article>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────────
   TAB 2: ARCHITECTURE OVERVIEW (LINEAR PIPELINE)
   ───────────────────────────────────────────────────────────── */
const ArchitecturePage = () => {
    const [activeModal, setActiveModal] = useState(null);
    const [showCode, setShowCode] = useState(false);

    const specifications = {
        bronze: { 
            title: 'Bronze Layer', obj: 'Tables', load: 'Truncate & Insert', trans: 'As-Is Data Drop', audience: 'Data Engineers', 
            code: '-- Bronze Layer Ingestion\nCOPY INTO bronze.erp_sales \nFROM s3://raw-data-bucket/erp/\nFILE_FORMAT = (TYPE = CSV);' 
        },
        silver: { 
            title: 'Silver Layer', obj: 'Views', load: 'Virtual (No physical load)', trans: 'Cleanse, Deduplicate, NULL Handling', audience: 'Data Scientists / Engineers', 
            code: '-- Silver Layer Transformation\nCREATE OR REPLACE VIEW silver.v_customers AS\nSELECT \n  customer_id,\n  COALESCE(email, \'Unknown\') as email,\n  ROW_NUMBER() OVER(PARTITION BY customer_id ORDER BY updated_at DESC) as rn\nFROM bronze.crm_customers;' 
        },
        gold: { 
            title: 'Gold Layer', obj: 'Views', load: 'Virtual (No physical load)', trans: 'Star Schema (Fact & Dimensions)', audience: 'Business Analysts / BI Tools', 
            code: '-- Gold Layer Aggregation\nCREATE OR REPLACE VIEW gold.fact_sales AS\nSELECT \n  s.date_key, \n  s.product_key,\n  SUM(s.amount) as total_revenue\nFROM silver.v_sales s\nGROUP BY s.date_key, s.product_key;' 
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex justify-between items-center bg-[#1c1c24] p-4 rounded-xl border border-white/[0.05] shadow-xl mb-4">
                <div>
                    <h3 className="text-white font-bold flex items-center gap-2"><Layers3 className="text-blue-400"/> Enterprise Data Flow</h3>
                    <p className="text-xs text-slate-400 mt-1">Linear data pipeline. Click on any Medallion layer to view Specs & Code.</p>
                </div>
                <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    <span className="text-xs font-mono text-blue-300">Pipeline Active</span>
                </div>
            </div>

            <div className="w-full min-h-[400px] rounded-3xl bg-[#05030a] border border-white/[0.1] shadow-[0_0_50px_rgba(59,130,246,0.1)] p-8 relative flex items-center justify-center overflow-hidden">
                {/* Flowing Grid Background */}
                <motion.div 
                    animate={{ backgroundPosition: ['0px 0px', '40px 40px'] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')" }}
                />

                <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-0">
                    
                    {/* 1. Source Systems */}
                    <div className="flex flex-col gap-4 w-full lg:w-48 z-20">
                        <div className="text-center font-mono text-[10px] text-slate-500 uppercase tracking-widest font-bold">Source Systems</div>
                        <GlassCard hover={false} className="p-4 flex items-center gap-3 bg-[#110b1c] border-white/5">
                            <div className="w-8 h-8 rounded-lg bg-[#1c1c24] flex items-center justify-center text-cyan-400 shrink-0"><FileText size={16} /></div>
                            <div className="truncate"><h4 className="text-sm font-bold text-white truncate">ERP Data</h4><p className="text-[10px] text-slate-400">CSV Exports</p></div>
                        </GlassCard>
                        <GlassCard hover={false} className="p-4 flex items-center gap-3 bg-[#110b1c] border-white/5">
                            <div className="w-8 h-8 rounded-lg bg-[#1c1c24] flex items-center justify-center text-pink-400 shrink-0"><FileText size={16} /></div>
                            <div className="truncate"><h4 className="text-sm font-bold text-white truncate">CRM Data</h4><p className="text-[10px] text-slate-400">API / JSON</p></div>
                        </GlassCard>
                    </div>

                    {/* Animated Beam 1 */}
                    <div className="hidden lg:flex h-1 bg-slate-800 relative rounded-full overflow-hidden flex-1 mx-4 min-w-[30px] shadow-[inset_0_0_5px_rgba(0,0,0,1)]">
                        <motion.div className="absolute top-0 bottom-0 left-0 w-8 bg-cyan-400 blur-[2px]" animate={{ x: ['-50px', '200px'] }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} />
                    </div>

                    {/* 2. Medallion Architecture */}
                    <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6 bg-[#110b1c]/80 p-6 rounded-2xl border border-white/5 backdrop-blur-md shadow-2xl z-20">
                        
                        {/* Bronze */}
                        <div onClick={() => setActiveModal('bronze')} className="cursor-pointer group relative flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full bg-[#1c1c24] border-2 border-[#cd7f32] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(205,127,50,0.3)] group-hover:shadow-[0_0_30px_rgba(205,127,50,0.6)]">
                                <Server size={24} className="text-[#cd7f32]" />
                            </div>
                            <span className="text-xs font-bold text-white">Bronze</span>
                            <span className="text-[9px] text-slate-400 font-mono">Raw</span>
                        </div>

                        {/* Animated Beam 2 */}
                        <div className="hidden lg:flex h-1 bg-slate-800 relative rounded-full overflow-hidden w-12 shadow-[inset_0_0_5px_rgba(0,0,0,1)]">
                            <motion.div className="absolute top-0 bottom-0 left-0 w-4 bg-slate-300 blur-[2px]" animate={{ x: ['-20px', '60px'] }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear", delay: 0.2 }} />
                        </div>

                        {/* Silver */}
                        <div onClick={() => setActiveModal('silver')} className="cursor-pointer group relative flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full bg-[#1c1c24] border-2 border-slate-300 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(148,163,184,0.3)] group-hover:shadow-[0_0_30px_rgba(148,163,184,0.6)]">
                                <Database size={24} className="text-slate-300" />
                            </div>
                            <span className="text-xs font-bold text-white">Silver</span>
                            <span className="text-[9px] text-slate-400 font-mono">Cleansed</span>
                        </div>

                        {/* Animated Beam 3 */}
                        <div className="hidden lg:flex h-1 bg-slate-800 relative rounded-full overflow-hidden w-12 shadow-[inset_0_0_5px_rgba(0,0,0,1)]">
                            <motion.div className="absolute top-0 bottom-0 left-0 w-4 bg-sky-400 blur-[2px]" animate={{ x: ['-20px', '60px'] }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear", delay: 0.4 }} />
                        </div>

                        {/* Gold */}
                        <div onClick={() => setActiveModal('gold')} className="cursor-pointer group relative flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full bg-[#1c1c24] border-2 border-sky-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(56,189,248,0.3)] group-hover:shadow-[0_0_30px_rgba(56,189,248,0.6)]">
                                <MonitorPlay size={24} className="text-sky-400" />
                            </div>
                            <span className="text-xs font-bold text-white">Gold</span>
                            <span className="text-[9px] text-slate-400 font-mono">Business</span>
                        </div>
                    </div>

                    {/* Animated Beam 4 */}
                    <div className="hidden lg:flex h-1 bg-slate-800 relative rounded-full overflow-hidden flex-1 mx-4 min-w-[30px] shadow-[inset_0_0_5px_rgba(0,0,0,1)]">
                        <motion.div className="absolute top-0 bottom-0 left-0 w-8 bg-blue-500 blur-[2px]" animate={{ x: ['-50px', '200px'] }} transition={{ repeat: Infinity, duration: 1, ease: "linear", delay: 0.6 }} />
                    </div>

                    {/* 3. Output / Consumers */}
                    <div className="flex flex-col gap-4 w-full lg:w-48 z-20">
                        <div className="text-center font-mono text-[10px] text-slate-500 uppercase tracking-widest font-bold">Consumers</div>
                        <GlassCard hover={false} className="p-4 flex items-center gap-3 bg-[#110b1c] border-white/5">
                            <div className="w-8 h-8 rounded-lg bg-[#1c1c24] flex items-center justify-center text-blue-500 shrink-0"><BarChart3 size={16} /></div>
                            <div className="truncate"><h4 className="text-sm font-bold text-white truncate">BI Tools</h4><p className="text-[10px] text-slate-400">Power BI</p></div>
                        </GlassCard>
                    </div>

                </div>
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
                            className="bg-[#0a0514] border border-blue-500/30 rounded-2xl p-0 max-w-3xl w-full shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col"
                        >
                            <div className="p-6 md:p-8 border-b border-white/5">
                                <button onClick={() => setActiveModal(null)} className="absolute top-6 right-6 text-slate-400 hover:text-white"><X size={24}/></button>
                                <h2 className="text-2xl font-display font-bold text-white mb-2 flex items-center gap-3">
                                    {activeModal === 'bronze' && <Server className="text-[#cd7f32]"/>}
                                    {activeModal === 'silver' && <Database className="text-slate-300"/>}
                                    {activeModal === 'gold' && <MonitorPlay className="text-sky-400"/>}
                                    {specifications[activeModal].title}
                                </h2>
                                <p className="text-sm text-slate-400">Technical Specifications & DDL</p>
                            </div>

                            <div className="p-6 md:p-8 bg-[#110b1c]">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                    <div>
                                        <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Object Type</h4>
                                        <p className="text-sm font-bold text-white">{specifications[activeModal].obj}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Load Method</h4>
                                        <p className="text-sm font-bold text-white">{specifications[activeModal].load}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Transformations</h4>
                                        <p className="text-sm font-bold text-white">{specifications[activeModal].trans}</p>
                                    </div>
                                </div>

                                <div className="rounded-xl overflow-hidden border border-blue-500/20 bg-[#05030a]">
                                    <div className="bg-blue-500/10 px-4 py-2 border-b border-blue-500/20 flex items-center justify-between">
                                        <span className="text-[10px] font-mono text-blue-300">example_code.sql</span>
                                        <FileCode2 size={14} className="text-blue-400"/>
                                    </div>
                                    <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto">
                                        {specifications[activeModal].code}
                                    </pre>
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
                return prev.map((t, idx) => {
                    if (idx === index - 1) return { ...t, status: 'success' };
                    if (idx === index) return { ...t, status: 'running' };
                    return t;
                });
            });

            index++;
        }, 1500);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#1c1c24] p-4 rounded-xl border border-white/[0.05] gap-4 shadow-xl">
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
                    className="flex items-center gap-2 px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-500 rounded-lg font-bold text-white transition-all text-sm shadow-[0_0_20px_rgba(8,145,178,0.4)]"
                >
                    {running ? <><Activity size={16} className="animate-pulse" /> Executing Pipeline...</> : <><Play size={16} fill="currentColor"/> Trigger DAG Run</>}
                </button>
            </div>

            <div className="flex flex-col gap-6">
                <GlassCard hover={false} className="w-full h-[450px] p-4 md:p-6 relative overflow-hidden bg-[#0a0514] border-white/5">
                    {/* Airflow style grid background */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPPHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')]" />
                    
                    <h4 className="absolute top-4 left-4 text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 z-20">
                        <MoveRight size={14} className="text-cyan-500" /> Directed Acyclic Graph
                    </h4>
                    
                    <div className="absolute inset-0 flex flex-col items-center justify-center mt-8 md:mt-0 overflow-x-auto overflow-y-hidden">
                        <div className="w-full min-w-[650px] h-full relative mx-auto">
                            {/* Horizontal SVG Paths */}
                            <svg className="w-full h-full absolute inset-0 z-0" viewBox="0 0 1000 500" preserveAspectRatio="none">
                                <defs>
                                    <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
                                        <feGaussianBlur stdDeviation="4" result="blur" />
                                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                    </filter>
                                </defs>
                                
                                {(() => {
                                    const paths = [
                                        { id: 'path0', d: 'M 150 150 C 275 150, 275 250, 400 250', status: uiTasks[0].status },
                                        { id: 'path1', d: 'M 150 350 C 275 350, 275 250, 400 250', status: uiTasks[1].status },
                                        { id: 'path2', d: 'M 400 250 L 650 250', status: uiTasks[2].status },
                                        { id: 'path3', d: 'M 650 250 L 900 250', status: uiTasks[3].status },
                                    ];

                                    return paths.map((p, idx) => {
                                        let stroke = p.status === 'success' ? '#10b981' : p.status === 'running' ? '#22d3ee' : '#334155';
                                        let strokeWidth = p.status === 'success' ? '4' : '3';
                                        let isRunning = p.status === 'running';
                                        
                                        return (
                                            <motion.path 
                                                key={idx}
                                                d={p.d} 
                                                stroke={stroke} 
                                                strokeWidth={strokeWidth} 
                                                fill="none" 
                                                strokeDasharray={isRunning ? '12 12' : 'none'}
                                                animate={isRunning ? { strokeDashoffset: [0, -100] } : { strokeDashoffset: 0 }}
                                                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                                className="transition-colors duration-500"
                                                filter={isRunning ? 'url(#glow-cyan)' : 'none'}
                                            />
                                        );
                                    });
                                })()}
                            </svg>
                            
                            {/* DAG Nodes */}
                            <div className="w-full h-full relative z-10 pointer-events-auto">
                                {uiTasks.map((task, i) => {
                                    let top = '50%', left = '50%';
                                    // Spaced out over 4 columns to avoid overlapping: 15% -> 40% -> 65% -> 90%
                                    if (i === 0) { top = '30%'; left = '15%'; } // CRM
                                    if (i === 1) { top = '70%'; left = '15%'; } // ERP
                                    if (i === 2) { top = '50%'; left = '40%'; } // Bronze
                                    if (i === 3) { top = '50%'; left = '65%'; } // Silver
                                    if (i === 4) { top = '50%'; left = '90%'; } // Gold

                                    let statusClasses = "border-slate-700 bg-[#110b1c] text-slate-300";
                                    let iconColor = "text-slate-500";
                                    if (task.status === 'running') {
                                        statusClasses = "border-cyan-500 bg-[#082f49] text-white shadow-[0_0_20px_rgba(34,211,238,0.4)] ring-2 ring-cyan-500/50";
                                        iconColor = "text-cyan-400";
                                    }
                                    if (task.status === 'success') {
                                        statusClasses = "border-emerald-500 bg-[#064e3b] text-emerald-50";
                                        iconColor = "text-emerald-400";
                                    }

                                    return (
                                        <motion.div 
                                            key={task.id} 
                                            onClick={() => setSelectedTask(task)} 
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            className={`absolute w-36 md:w-44 -translate-x-1/2 -translate-y-1/2 rounded-lg border-2 px-3 py-3 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${statusClasses} ${selectedTask?.id === task.id ? 'ring-2 ring-white scale-105' : ''}`}
                                            style={{ top, left }}
                                        >
                                            <span className={`font-mono text-[8px] uppercase tracking-wider mb-1.5 ${iconColor}`}>{task.type}</span>
                                            <span className="text-[10px] md:text-[11px] font-bold text-center leading-snug">{task.name}</span>
                                            
                                            {/* Status Indicators */}
                                            {task.status === 'success' && <CheckCircle size={14} className="absolute -top-2 -right-2 text-emerald-400 bg-[#05030a] rounded-full" />}
                                            {task.status === 'running' && <Activity size={14} className="absolute -top-2 -right-2 text-cyan-400 bg-[#05030a] rounded-full animate-spin-slow" />}
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </GlassCard>

                <div className="w-full bg-[#0d0d12] border border-white/[0.1] rounded-2xl flex flex-col overflow-hidden shadow-2xl h-[250px]">
                    <div className="h-14 bg-[#110b1c] border-b border-white/[0.05] flex items-center justify-between px-5 shrink-0">
                        <span className="text-sm font-bold text-white flex items-center gap-2"><Terminal size={16} className="text-cyan-500"/> Execution Logs</span>
                        {selectedTask && <button onClick={() => setSelectedTask(null)}><X size={16} className="text-slate-500 hover:text-white transition-colors"/></button>}
                    </div>
                    <div className="p-5 flex-1 overflow-y-auto font-mono text-xs leading-loose custom-scrollbar bg-[#05030a]">
                        {!selectedTask ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-600 italic opacity-50">
                                <MonitorPlay size={32} className="mb-3"/> 
                                <span>Select a DAG node to view logs</span>
                            </div>
                        ) : (
                            <div className="space-y-4 animate-in fade-in zoom-in duration-300">
                                <div className="p-4 bg-white/[0.03] rounded-xl border border-white/[0.05]">
                                    <div className="text-white font-bold mb-2 flex items-center gap-2">
                                        <Database size={14} className="text-cyan-500"/> {selectedTask.id}
                                    </div>
                                    <div className="flex justify-between text-slate-400 text-[10px] uppercase tracking-wider border-t border-white/5 pt-2">
                                        <span>Status: <span className={selectedTask.status === 'success' ? 'text-emerald-400 font-bold' : selectedTask.status === 'running' ? 'text-cyan-400 font-bold animate-pulse' : 'text-slate-500'}>{selectedTask.status}</span></span>
                                        <span>Duration: {selectedTask.status === 'queued' ? '-' : selectedTask.duration}</span>
                                    </div>
                                </div>
                                <div className="bg-black/50 p-4 rounded-lg border border-white/5 font-mono">
                                    {selectedTask.status === 'queued' ? (
                                        <span className="text-slate-600 flex items-center gap-2"><Clock size={12} className="animate-pulse"/> Waiting for upstream dependencies...</span>
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
    const [showCode, setShowCode] = useState(false);

    return (
        <div className="space-y-6 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h3 className="text-xl font-display font-bold text-white flex items-center gap-3">
                        <Database className="text-blue-500" /> Enterprise Star Schema
                    </h3>
                    <p className="text-sm text-slate-400 mt-2 max-w-2xl">
                        A fully denormalized Gold Layer designed to prioritize fast query performance in BI tools.
                    </p>
                </div>
                <button 
                    onClick={() => setShowCode(!showCode)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg text-sm font-bold transition-colors"
                >
                    <FileCode2 size={16} /> {showCode ? 'Hide SQL' : 'View SQL DDL'}
                </button>
            </div>

            <AnimatePresence>
                {showCode && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="bg-[#0a0514] border border-blue-500/30 rounded-xl p-4 text-xs font-mono text-slate-300 shadow-2xl overflow-x-auto">
                            <pre className="text-blue-300">
{`-- Gold Layer: Fact_Sales Table DDL
CREATE TABLE gold.fact_sales (
    order_number VARCHAR(50) PRIMARY KEY,
    customer_key INT NOT NULL,
    product_key INT NOT NULL,
    store_key INT NOT NULL,
    date_key INT NOT NULL,
    sales_amount DECIMAL(18,2),
    discount_amount DECIMAL(18,2),
    FOREIGN KEY (customer_key) REFERENCES gold.dim_customers(customer_key),
    FOREIGN KEY (product_key) REFERENCES gold.dim_products(product_key),
    FOREIGN KEY (store_key) REFERENCES gold.dim_store(store_key),
    FOREIGN KEY (date_key) REFERENCES gold.dim_date(date_key)
);`}
                            </pre>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative w-full h-[800px] md:h-[600px] bg-[#05030a] rounded-3xl border border-white/[0.05] shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] overflow-hidden flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMTY4LDg1LDI0NywwLjA1KSIvPjwvc3ZnPg==')] opacity-50" />
                
                {/* SVG Connections - Hidden on small mobile for simplicity, visible on md+ */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden md:block">
                    <motion.path d="M 30% 25% L 50% 50%" stroke={hoveredTable === 'dim_customers' || hoveredTable === 'Fact_Sales' ? 'rgba(59,130,246,0.8)' : 'rgba(59,130,246,0.2)'} strokeWidth={hoveredTable === 'dim_customers' || hoveredTable === 'Fact_Sales' ? 4 : 2} strokeDasharray="4 4" className="transition-all duration-300" />
                    <motion.path d="M 70% 25% L 50% 50%" stroke={hoveredTable === 'dim_products' || hoveredTable === 'Fact_Sales' ? 'rgba(59,130,246,0.8)' : 'rgba(59,130,246,0.2)'} strokeWidth={hoveredTable === 'dim_products' || hoveredTable === 'Fact_Sales' ? 4 : 2} strokeDasharray="4 4" className="transition-all duration-300" />
                    <motion.path d="M 30% 75% L 50% 50%" stroke={hoveredTable === 'dim_date' || hoveredTable === 'Fact_Sales' ? 'rgba(59,130,246,0.8)' : 'rgba(59,130,246,0.2)'} strokeWidth={hoveredTable === 'dim_date' || hoveredTable === 'Fact_Sales' ? 4 : 2} strokeDasharray="4 4" className="transition-all duration-300" />
                    <motion.path d="M 70% 75% L 50% 50%" stroke={hoveredTable === 'dim_store' || hoveredTable === 'Fact_Sales' ? 'rgba(59,130,246,0.8)' : 'rgba(59,130,246,0.2)'} strokeWidth={hoveredTable === 'dim_store' || hoveredTable === 'Fact_Sales' ? 4 : 2} strokeDasharray="4 4" className="transition-all duration-300" />
                </svg>

                {/* Mobile Layout: Stacked Grid. Desktop Layout: Absolute positioning */}
                <div className="relative z-20 w-full h-full flex flex-col md:block items-center justify-center gap-6 md:gap-0">
                    
                    <motion.div 
                        onHoverStart={() => setHoveredTable('Fact_Sales')}
                        onHoverEnd={() => setHoveredTable(null)}
                        whileHover={{ scale: 1.02 }}
                        className={`md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-64 bg-[#110b1c]/90 backdrop-blur-xl border ${hoveredTable === 'Fact_Sales' || !hoveredTable ? 'border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.4)]' : 'border-blue-500/30 opacity-50'} rounded-xl overflow-hidden transition-all duration-300 cursor-default`}
                    >
                        <div className="bg-blue-500/20 px-4 py-3 text-sm font-bold text-white flex items-center justify-between border-b border-blue-500/30">
                            <span className="flex items-center gap-2"><Table2 size={16}/> fact_sales</span>
                            <span className="text-[10px] bg-blue-500/30 px-2 py-0.5 rounded text-blue-200">FACT</span>
                        </div>
                        <div className="p-0 text-xs font-mono text-slate-400">
                            <div className="px-4 py-2 flex items-center justify-between border-b border-white/5 hover:bg-white/5"><span className="flex items-center gap-2 text-yellow-500"><Key size={12}/> order_number</span><span className="text-[9px] text-slate-500">VARCHAR</span></div>
                            <div className="px-4 py-2 flex items-center justify-between border-b border-white/5 hover:bg-white/5"><span className="flex items-center gap-2 text-slate-300"><Link size={12}/> customer_key</span><span className="text-[9px] text-slate-500">INT</span></div>
                            <div className="px-4 py-2 flex items-center justify-between border-b border-white/5 hover:bg-white/5"><span className="flex items-center gap-2 text-slate-300"><Link size={12}/> product_key</span><span className="text-[9px] text-slate-500">INT</span></div>
                            <div className="px-4 py-2 flex items-center justify-between border-b border-white/5 hover:bg-white/5"><span className="flex items-center gap-2 text-slate-300"><Link size={12}/> store_key</span><span className="text-[9px] text-slate-500">INT</span></div>
                            <div className="px-4 py-2 flex items-center justify-between border-b border-white/5 hover:bg-white/5"><span className="flex items-center gap-2 text-slate-300"><Link size={12}/> date_key</span><span className="text-[9px] text-slate-500">INT</span></div>
                            <div className="px-4 py-2 flex items-center justify-between bg-purple-500/10 text-purple-300 font-bold"><span className="flex items-center gap-2"><Hash size={12}/> sales_amount</span><span className="text-[9px] text-purple-400/50">DECIMAL</span></div>
                        </div>
                    </motion.div>

                    {/* Dimensions Container for Mobile (Grid) */}
                    <div className="w-full grid grid-cols-2 gap-4 md:hidden">
                        {['dim_customers', 'dim_products', 'dim_date', 'dim_store'].map((dim) => (
                             <motion.div 
                                key={dim} 
                                onHoverStart={() => setHoveredTable(dim)}
                                onHoverEnd={() => setHoveredTable(null)}
                                className={`w-full bg-[#1c1c24]/90 backdrop-blur border ${hoveredTable === dim || hoveredTable === 'Fact_Sales' || !hoveredTable ? 'border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'border-white/10 opacity-30'} rounded-lg overflow-hidden transition-all duration-300`}
                            >
                                <div className="bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-100 flex justify-between items-center border-b border-emerald-500/20">
                                    <span className="truncate">{dim}</span>
                                </div>
                                <div className="p-0 text-[10px] font-mono text-slate-400">
                                   <div className="px-3 py-1.5 flex items-center gap-2 text-yellow-500 border-b border-white/5"><Key size={10}/> {dim.split('_')[1]}_key</div>
                                   <div className="px-3 py-1.5 border-b border-white/5 text-slate-300">name / desc</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Dimensions for Desktop (Absolute Positioned) */}
                    <div className="hidden md:block">
                        {['dim_customers', 'dim_products', 'dim_date', 'dim_store'].map((dim, i) => (
                            <motion.div 
                                key={dim} 
                                onHoverStart={() => setHoveredTable(dim)}
                                onHoverEnd={() => setHoveredTable(null)}
                                whileHover={{ scale: 1.05 }}
                                animate={{ y: [0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 3 + i * 0.5, ease: "easeInOut" }}
                                className={`absolute z-20 w-48 bg-[#1c1c24]/90 backdrop-blur-xl border ${hoveredTable === dim || hoveredTable === 'Fact_Sales' || !hoveredTable ? 'border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'border-white/10 opacity-30'} rounded-xl overflow-hidden cursor-default transition-all duration-300`} 
                                style={{
                                    top: i < 2 ? '12%' : 'auto', bottom: i >= 2 ? '12%' : 'auto',
                                    left: i % 2 === 0 ? '12%' : 'auto', right: i % 2 !== 0 ? '12%' : 'auto'
                                }}
                            >
                                <div className="bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-100 flex justify-between items-center border-b border-emerald-500/20">
                                    <span className="flex items-center gap-2"><Table2 size={12}/> {dim}</span>
                                    <span className="text-[9px] bg-emerald-500/20 px-1.5 rounded text-emerald-200">DIM</span>
                                </div>
                                <div className="p-0 text-[10px] font-mono text-slate-400">
                                   <div className="px-3 py-2 flex items-center gap-2 text-yellow-500 border-b border-white/5 hover:bg-white/5"><Key size={12}/> {dim.split('_')[1]}_key</div>
                                   <div className="px-3 py-2 border-b border-white/5 text-slate-300 hover:bg-white/5">name / desc</div>
                                   <div className="px-3 py-2 border-b border-white/5 text-slate-300 hover:bg-white/5">created_at</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
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
        { id: 'Star Schema', name: 'Star Schema', icon: <Database size={14} /> }
    ];

    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="min-h-screen bg-[#05030a] text-slate-300 font-sans selection:bg-blue-500/30 pb-20 relative overflow-hidden">
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-900/10 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] opacity-50" />
            </div>
            
            <header className="sticky top-0 z-50 bg-[#05030a]/80 backdrop-blur-2xl border-b border-white/[0.05]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
                    <Link to="/#work" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform text-white" />
                        </div>
                        <span className="text-xs md:text-sm font-bold tracking-wide uppercase">Back</span>
                    </Link>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-20 relative z-10">
                <PremiumHero />

                <div className="flex justify-start md:justify-center mb-12 overflow-x-auto pb-4 custom-scrollbar">
                    <div className="inline-flex items-center p-1.5 bg-[#1c1c24]/80 backdrop-blur-md rounded-2xl border border-white/[0.05] shadow-2xl min-w-max">
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
                                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-pink-600 rounded-xl -z-10 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
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
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default SQLDataWarehouseProject;
