import React from 'react';
import { ArrowRight, Database, Filter, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PremiumPipelineVisualizer = () => {
    return (
        <div className="flex flex-col md:col-span-2 items-center justify-center p-6 bg-[#0a0514] rounded-xl border border-white/[0.05] relative overflow-hidden group-hover:border-blue-500/20 transition-colors duration-500 min-h-[240px]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/10 rounded-full blur-[50px] group-hover:bg-blue-500/20 transition-all duration-700" />
            
            {/* Connection Lines (SVG) */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <svg width="100%" height="100%" viewBox="0 0 350 200" className="opacity-60 overflow-visible">
                    <path d="M 60 100 L 175 100 L 290 100" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                    
                    {/* Animated Data Packets */}
                    <motion.circle r="3" fill="#38bdf8" className="drop-shadow-[0_0_8px_rgba(56,189,248,0.9)]">
                        <animateMotion dur="2s" repeatCount="indefinite" path="M 60 100 L 175 100" calcMode="linear" />
                    </motion.circle>
                    <motion.circle r="3" fill="#10b981" className="drop-shadow-[0_0_8px_rgba(16,185,129,0.9)]">
                        <animateMotion dur="2s" repeatCount="indefinite" path="M 175 100 L 290 100" calcMode="linear" />
                    </motion.circle>
                </svg>
            </div>

            {/* Nodes Container */}
            <div className="relative z-10 w-full flex justify-between items-center px-4">
                
                {/* Bronze Node */}
                <motion.div 
                    animate={{ y: [0, -4, 0] }} 
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-2"
                >
                    <div className="w-14 h-14 rounded-2xl bg-[#1c1c24]/80 backdrop-blur-md border border-[#cd7f32]/40 shadow-[0_0_15px_rgba(205,127,50,0.15)] flex items-center justify-center relative group-hover:border-[#cd7f32] group-hover:shadow-[0_0_25px_rgba(205,127,50,0.3)] transition-all duration-500">
                        <Database size={20} className="text-[#cd7f32]" />
                        {/* Status Dot */}
                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse border-2 border-[#1c1c24]" />
                    </div>
                    <div className="text-center">
                        <div className="text-[10px] font-bold text-[#cd7f32] tracking-wider uppercase">Bronze</div>
                        <div className="text-[9px] text-slate-500">Raw Source</div>
                    </div>
                </motion.div>

                {/* Silver Node */}
                <motion.div 
                    animate={{ y: [0, -4, 0] }} 
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="flex flex-col items-center gap-2"
                >
                    <div className="w-14 h-14 rounded-2xl bg-[#1c1c24]/80 backdrop-blur-md border border-[#94a3b8]/40 shadow-[0_0_15px_rgba(148,163,184,0.15)] flex items-center justify-center relative group-hover:border-[#94a3b8] group-hover:shadow-[0_0_25px_rgba(148,163,184,0.3)] transition-all duration-500">
                        <Filter size={20} className="text-[#cbd5e1]" />
                        {/* Status Dot */}
                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-400 rounded-full animate-pulse border-2 border-[#1c1c24]" />
                    </div>
                    <div className="text-center">
                        <div className="text-[10px] font-bold text-[#cbd5e1] tracking-wider uppercase">Silver</div>
                        <div className="text-[9px] text-slate-500">Cleansed</div>
                    </div>
                </motion.div>

                {/* Gold Node */}
                <motion.div 
                    animate={{ y: [0, -4, 0] }} 
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="flex flex-col items-center gap-2"
                >
                    <div className="w-14 h-14 rounded-2xl bg-[#1c1c24]/80 backdrop-blur-md border border-[#fbbf24]/40 shadow-[0_0_15px_rgba(251,191,36,0.15)] flex items-center justify-center relative group-hover:border-[#fbbf24] group-hover:shadow-[0_0_25px_rgba(251,191,36,0.3)] transition-all duration-500">
                        <CheckCircle2 size={20} className="text-[#fbbf24]" />
                        {/* Status Dot */}
                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse border-2 border-[#1c1c24]" />
                    </div>
                    <div className="text-center">
                        <div className="text-[10px] font-bold text-[#fbbf24] tracking-wider uppercase">Gold</div>
                        <div className="text-[9px] text-slate-500">Star Schema</div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

const Work = () => {
    return (
        <section id="work" className="mt-12 md:mt-32 relative z-10">
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mb-6 flex flex-col items-center justify-center text-center relative"
            >
                {/* Hand-drawn accent over title */}
                <div className="absolute -top-6 -z-10 opacity-60">
                    <svg width="200" height="60" viewBox="0 0 200 60" fill="none">
                        <path d="M 10 30 Q 100 10 190 30 T 100 50 T 10 30" stroke="#38bdf8" strokeWidth="2" strokeDasharray="5 5" fill="none" />
                    </svg>
                </div>
                
                <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
                    Featured <span className="text-blue-400 font-handwriting text-4xl sm:text-6xl px-2">Projects</span>
                </h2>
                <p className="text-slate-400 text-base mt-4 max-w-lg font-medium">
                    Real-world data pipelines and warehouse architectures built for scale and analytics.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto mt-16 relative">

                {/* SQL Data Warehouse Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <Link to="/project/sql-data-warehouse" className="group block cursor-pointer">
                        <div className="baraa-card overflow-hidden relative p-[1px]">
                            {/* Animated gradient border hover effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-sky-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl blur-sm" />
                            
                            <div className="relative z-10 p-6 sm:p-10 grid md:grid-cols-5 gap-8 items-center bg-[#16161d] rounded-xl h-full">
                                <div className="md:col-span-3">
                                    {/* Tags */}
                                    <div className="flex gap-2 mb-6 flex-wrap">
                                        <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-bold rounded-full tracking-wide uppercase shadow-[0_0_10px_rgba(139,92,246,0.1)]">Data Warehouse</span>
                                        <span className="px-3 py-1 bg-sky-400/10 border border-sky-400/30 text-sky-400 text-[10px] font-bold rounded-full tracking-wide uppercase shadow-[0_0_10px_rgba(253,224,71,0.1)]">ETL Pipeline</span>
                                    </div>

                                    <h3 className="text-2xl sm:text-4xl font-display font-bold mb-4 text-white group-hover:text-purple-300 transition-colors duration-300 tracking-tight leading-[1.1]">
                                        Modern SQL Data Warehouse
                                    </h3>
                                    <p className="text-slate-400 text-base mb-8 leading-relaxed">
                                        Centralized data warehouse engineered from the ground up to integrate raw CRM and ERP data. Designed using the Medallion Architecture and Star Schema for optimized BI reporting and ad-hoc analytics.
                                    </p>

                                    {/* Tech tags */}
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {['SQL Server', 'Medallion Architecture', 'Star Schema', 'Stored Procedures', 'Git/GitHub', 'BI Analytics'].map(tag => (
                                            <span key={tag} className="px-3 py-1.5 bg-[#1c1c24] rounded-md border border-white/[0.05] text-[11px] text-slate-300 font-semibold group-hover:border-blue-500/30 transition-all duration-300">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <span className="inline-flex items-center gap-2 text-sky-400 font-handwriting text-2xl group-hover:gap-4 transition-all duration-300">
                                        Explore Architecture <ArrowRight size={20} strokeWidth={3} />
                                    </span>
                                </div>

                                {/* Premium Medallion Architecture Pipeline */}
                                <PremiumPipelineVisualizer />
                            </div>
                        </div>
                    </Link>
                </motion.div>

            </div>
        </section>
    );
};

export default Work;
