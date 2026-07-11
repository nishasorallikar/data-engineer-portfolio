import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Database, Network, Code, Server, ArrowRight } from 'lucide-react';

/* ── Reusable Floating Panel ── */
const FloatingPanel = ({ children, className, delay = 0, yOffset = 20, duration = 6 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay, ease: "easeOut" }}
            className={`absolute ${className}`}
        >
            <motion.div
                animate={{ y: [0, -yOffset, 0] }}
                transition={{ repeat: Infinity, duration, ease: "easeInOut", delay: delay % 2 }}
                className="w-full h-full"
            >
                <div className="bg-[#1a1a20]/60 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-4 overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {children}
                </div>
            </motion.div>
        </motion.div>
    );
};

/* ── Data Vis Bar Chart Widget ── */
const BarChartWidget = () => {
    const [bars, setBars] = useState(Array.from({ length: 12 }, () => Math.random() * 100));

    useEffect(() => {
        const interval = setInterval(() => {
            setBars(prev => prev.map(val => Math.max(10, Math.min(100, val + (Math.random() - 0.5) * 30))));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col gap-3 w-64">
            <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5"><Activity size={14} className="text-blue-400"/> Data Visualization</span>
                <span>Live</span>
            </div>
            <div className="h-32 flex items-end gap-1.5 pt-4 border-b border-white/10">
                {bars.map((height, i) => (
                    <motion.div
                        key={i}
                        className="flex-1 rounded-t-sm"
                        style={{
                            background: `linear-gradient(to top, #3b82f6, ${i % 3 === 0 ? '#10b981' : '#60a5fa'})`,
                        }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                    />
                ))}
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
                <span>Sun</span>
            </div>
        </div>
    );
};

/* ── Code Snippet Widget ── */
const CodeWidget = () => {
    return (
        <div className="flex flex-col gap-2 w-72">
            <div className="flex items-center gap-2 text-xs text-slate-400 border-b border-white/10 pb-2">
                <Code size={14} className="text-emerald-400"/> 
                <span>pipeline.py</span>
            </div>
            <div className="font-mono text-[10px] leading-relaxed text-slate-300">
                <p><span className="text-pink-400">import</span> pyspark.sql.functions <span className="text-pink-400">as</span> F</p>
                <p className="mt-2"><span className="text-pink-400">def</span> <span className="text-blue-400">process_stream</span>(df):</p>
                <p className="pl-4">return df.withWatermark(<span className="text-emerald-400">"timestamp"</span>, <span className="text-emerald-400">"10 mins"</span>)</p>
                <p className="pl-8">.groupBy(F.window(<span className="text-emerald-400">"timestamp"</span>, <span className="text-emerald-400">"5 mins"</span>))</p>
                <p className="pl-8">.agg(F.sum(<span className="text-emerald-400">"amount"</span>).alias(<span className="text-emerald-400">"total"</span>))</p>
                <motion.div 
                    animate={{ opacity: [1, 0, 1] }} 
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="inline-block w-1.5 h-3 bg-white ml-1 mt-1 align-middle"
                />
            </div>
        </div>
    );
};

/* ── Metrics Widget ── */
const MetricsWidget = () => {
    return (
        <div className="flex flex-col gap-4 w-56">
            <div className="flex items-center gap-2 text-xs text-slate-400">
                <Server size={14} className="text-blue-400"/>
                <span>Kafka Cluster Status</span>
            </div>
            <div className="flex justify-between items-end">
                <div>
                    <div className="text-[10px] text-slate-500 mb-1">Throughput</div>
                    <div className="text-2xl font-semibold text-white tracking-tight">1.4<span className="text-sm text-slate-400"> GB/s</span></div>
                </div>
                <div className="text-right">
                    <div className="text-[10px] text-slate-500 mb-1">Latency</div>
                    <div className="text-lg font-medium text-emerald-400">32<span className="text-xs text-emerald-400/70"> ms</span></div>
                </div>
            </div>
            <div className="w-full bg-white/5 rounded-full h-1.5 mt-2">
                <motion.div 
                    className="bg-blue-500 h-1.5 rounded-full" 
                    initial={{ width: "60%" }}
                    animate={{ width: ["60%", "75%", "65%", "80%", "60%"] }}
                    transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
                />
            </div>
        </div>
    );
};

/* ── Network Widget ── */
const NetworkWidget = () => {
    return (
        <div className="flex flex-col gap-3 w-64">
            <div className="flex items-center gap-2 text-xs text-slate-400">
                <Network size={14} className="text-emerald-400"/>
                <span>Data Distribution</span>
            </div>
            <div className="space-y-4 pt-2">
                <div>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-white">6.76%</span>
                        <span className="text-slate-500 text-xs">Suppression</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden flex">
                        <div className="h-full bg-blue-500 w-[60%]"></div>
                        <div className="h-full bg-emerald-400 w-[40%]"></div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-white">32.31%</span>
                        <span className="text-slate-500 text-xs">Total Hash Rate</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden flex">
                        <div className="h-full bg-blue-500 w-[80%]"></div>
                        <div className="h-full bg-emerald-400 w-[20%]"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Hero = () => {
    const scrollToWork = () => {
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#0f0f13] pt-20 pb-20">
            {/* Background Gradient Orbs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

            {/* Subdued Grid Background */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

            {/* Central Content Area */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 opacity-30 lg:opacity-100 lg:pointer-events-auto overflow-hidden">
                <div className="relative w-full max-w-7xl mx-auto h-[700px] scale-[0.45] sm:scale-50 md:scale-75 lg:scale-100 origin-center">
                    
                    {/* Floating Panels */}
                    <div className="block">
                        <FloatingPanel className="top-10 left-[5%]" delay={0.2} duration={7} yOffset={15}>
                        <BarChartWidget />
                    </FloatingPanel>

                    <FloatingPanel className="bottom-20 left-[10%]" delay={0.4} duration={6} yOffset={25}>
                        <NetworkWidget />
                    </FloatingPanel>

                    <FloatingPanel className="top-20 right-[5%]" delay={0.3} duration={8} yOffset={20}>
                        <CodeWidget />
                    </FloatingPanel>

                    <FloatingPanel className="bottom-32 right-[10%]" delay={0.5} duration={7} yOffset={15}>
                        <MetricsWidget />
                    </FloatingPanel>
                </div>
                </div>
            </div>


            {/* Overlay Text / Hero Message */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-30 w-full max-w-3xl px-6 flex flex-col items-center"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
                    <Database size={14} className="text-blue-400" />
                    <span className="text-xs font-medium text-slate-300">Data Engineering Specialist</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
                    Transforming Data Into <br className="hidden md:block"/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Actionable Intelligence</span>
                </h1>
                
                <button 
                    onClick={scrollToWork} 
                    className="group relative inline-flex items-center gap-2 px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:-translate-y-1"
                >
                    Explore My Architecture
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </motion.div>
        </div>
    );
};

export default Hero;
