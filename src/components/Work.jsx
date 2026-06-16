import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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
                        <path d="M 10 30 Q 100 10 190 30 T 100 50 T 10 30" stroke="#fde047" strokeWidth="2" strokeDasharray="5 5" fill="none" />
                    </svg>
                </div>
                
                <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
                    Featured <span className="text-purple-400 font-handwriting text-4xl sm:text-6xl px-2">Projects</span>
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
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl blur-sm" />
                            
                            <div className="relative z-10 p-6 sm:p-10 grid md:grid-cols-5 gap-8 items-center bg-[#0f0a1a] rounded-xl h-full">
                                <div className="md:col-span-3">
                                    {/* Tags */}
                                    <div className="flex gap-2 mb-6 flex-wrap">
                                        <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-400 text-[10px] font-bold rounded-full tracking-wide uppercase shadow-[0_0_10px_rgba(139,92,246,0.1)]">Data Warehouse</span>
                                        <span className="px-3 py-1 bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-[10px] font-bold rounded-full tracking-wide uppercase shadow-[0_0_10px_rgba(253,224,71,0.1)]">ETL Pipeline</span>
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
                                            <span key={tag} className="px-3 py-1.5 bg-[#160f24] rounded-md border border-white/[0.05] text-[11px] text-slate-300 font-semibold group-hover:border-purple-500/30 transition-all duration-300">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <span className="inline-flex items-center gap-2 text-yellow-400 font-handwriting text-2xl group-hover:gap-4 transition-all duration-300">
                                        Explore Architecture <ArrowRight size={20} strokeWidth={3} />
                                    </span>
                                </div>

                                {/* Medallion Architecture Diagram (Baraa Theme) */}
                                <div className="hidden md:flex md:col-span-2 items-center justify-center p-6 bg-[#0a0514] rounded-xl border border-white/[0.05] relative overflow-hidden group-hover:border-purple-500/20 transition-colors duration-500">
                                    {/* Subtle purple glow behind diagram */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-600/20 rounded-full blur-[40px] group-hover:bg-purple-500/30 transition-colors duration-500" />
                                    
                                    <div className="relative w-full z-10">
                                        <svg viewBox="0 0 350 200" className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity duration-300" xmlns="http://www.w3.org/2000/svg">
                                            {/* Bronze Layer */}
                                            <rect x="10" y="70" width="80" height="60" rx="8" fill="#160f24" stroke="#cd7f32" strokeWidth="2" className="group-hover:stroke-[3px] transition-all" />
                                            <text x="50" y="95" textAnchor="middle" style={{ fontSize: 11, fill: '#cd7f32', fontWeight: 800, fontFamily: "'Inter', sans-serif" }}>BRONZE</text>
                                            <text x="50" y="115" textAnchor="middle" style={{ fontSize: 8, fill: '#94a3b8' }}>Raw Data</text>

                                            {/* Silver Layer */}
                                            <rect x="135" y="70" width="80" height="60" rx="8" fill="#160f24" stroke="#94a3b8" strokeWidth="2" className="group-hover:stroke-[3px] transition-all" />
                                            <text x="175" y="95" textAnchor="middle" style={{ fontSize: 11, fill: '#cbd5e1', fontWeight: 800, fontFamily: "'Inter', sans-serif" }}>SILVER</text>
                                            <text x="175" y="115" textAnchor="middle" style={{ fontSize: 8, fill: '#94a3b8' }}>Cleansed</text>

                                            {/* Gold Layer */}
                                            <rect x="260" y="70" width="80" height="60" rx="8" fill="#160f24" stroke="#fbbf24" strokeWidth="2" className="group-hover:stroke-[3px] transition-all" />
                                            <text x="300" y="95" textAnchor="middle" style={{ fontSize: 11, fill: '#fbbf24', fontWeight: 800, fontFamily: "'Inter', sans-serif" }}>GOLD</text>
                                            <text x="300" y="115" textAnchor="middle" style={{ fontSize: 8, fill: '#94a3b8' }}>Star Schema</text>

                                            {/* Connections */}
                                            <path d="M 90 100 L 135 100" stroke="#475569" strokeWidth="2" strokeDasharray="3 3" />
                                            <path d="M 215 100 L 260 100" stroke="#475569" strokeWidth="2" strokeDasharray="3 3" />

                                            {/* Animated Data Packets (Purple Glows) */}
                                            <circle r="4" fill="#a855f7" className="drop-shadow-[0_0_5px_rgba(168,85,247,0.8)]">
                                                <animateMotion dur="2s" repeatCount="indefinite" path="M 90 100 L 135 100" calcMode="linear" />
                                            </circle>
                                            <circle r="4" fill="#a855f7" className="drop-shadow-[0_0_5px_rgba(168,85,247,0.8)]">
                                                <animateMotion dur="2s" repeatCount="indefinite" path="M 215 100 L 260 100" calcMode="linear" />
                                            </circle>

                                            {/* Floating Source Icons (Simplified) */}
                                            <path d="M 25 30 L 75 30 L 50 55 Z" fill="#334155" />
                                            <path d="M 50 65 L 50 70" stroke="#475569" strokeWidth="1.5" strokeDasharray="2 2" />
                                            <text x="50" y="20" textAnchor="middle" style={{ fontSize: 8, fill: '#cbd5e1', fontWeight: 600 }}>CRM / ERP</text>
                                            
                                            {/* Dashboard Icon at end */}
                                            <rect x="290" y="30" width="20" height="20" rx="2" fill="none" stroke="#fde047" strokeWidth="1.5" />
                                            <rect x="293" y="38" width="4" height="10" fill="#fde047" />
                                            <rect x="299" y="34" width="4" height="14" fill="#fde047" />
                                            <rect x="305" y="42" width="4" height="6" fill="#fde047" />
                                            <path d="M 300 65 L 300 70" stroke="#fde047" strokeWidth="1.5" strokeDasharray="2 2" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </motion.div>

            </div>
        </section>
    );
};

export default Work;
