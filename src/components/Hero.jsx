import React from 'react';
import { ArrowDown, Cloud, Flame, Wind, Layers, GitCommit, BarChart, Code2, Database } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

/* ── Doodle Skill Node ── */
const SkillNode = ({ icon, label, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.6, type: 'spring', stiffness: 100 }}
        className="flex flex-col items-center gap-2.5 group cursor-default"
    >
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0f0a1a] border border-white/[0.05] shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:border-purple-500/30 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] group-hover:-translate-y-1">
            <div className="relative z-10 text-slate-400 group-hover:text-yellow-400 transition-colors duration-300">{icon}</div>
        </div>
        <span className="text-[10px] font-bold text-slate-500 tracking-wide group-hover:text-white transition-colors whitespace-nowrap">
            {label}
        </span>
    </motion.div>
);

const skills = [
    { icon: <Cloud className="h-5 w-5" />, label: 'Azure Databricks' },
    { icon: <Flame className="h-5 w-5" />, label: 'Apache Spark' },
    { icon: <Wind className="h-5 w-5" />, label: 'Airflow' },
    { icon: <Layers className="h-5 w-5" />, label: 'Medallion Arch' },
    { icon: <GitCommit className="h-5 w-5" />, label: 'CI/CD Pipelines' },
    { icon: <BarChart className="h-5 w-5" />, label: 'Power BI' },
    { icon: <Code2 className="h-5 w-5" />, label: 'Python' },
    { icon: <Database className="h-5 w-5" />, label: 'SQL' },
];

const Hero = () => {
    const handleDownload = () => {
        toast.success('Resume downloaded!');
        // window.open('#', '_blank');
    };

    const scrollToWork = () => {
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="relative flex flex-col items-center justify-center w-full min-h-[85vh] md:min-h-[80vh] md:-mt-10 overflow-hidden">
            {/* ── Background SVG Doodles ── */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
                <path d="M 100 200 Q 150 150 200 200 T 300 200" fill="none" stroke="#fde047" strokeWidth="4" strokeLinecap="round" />
                <path d="M 800 150 L 850 200 L 820 250" fill="none" stroke="#8b5cf6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="150" cy="700" r="10" fill="none" stroke="#ffffff" strokeWidth="3" />
                <circle cx="150" cy="700" r="2" fill="#ffffff" />
            </svg>

            <div className="relative z-30 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-4 md:pt-16 flex flex-col md:flex-row items-center justify-between gap-12">
                {/* ── Top Text Content ── */}
                <div className="text-left flex flex-col items-start w-full max-w-2xl">
                    
                    {/* Massive Typography Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="font-display text-[3rem] xs:text-5xl sm:text-6xl md:text-[5.5rem] font-bold mb-8 leading-[1.1] text-white"
                    >
                        Master Data <br />
                        <span className="relative inline-block text-yellow-200">
                            step by step
                            <svg className="absolute w-full h-4 -bottom-1 left-0 text-yellow-400" viewBox="0 0 200 20" preserveAspectRatio="none">
                                <path d="M 0 15 Q 50 0 100 15 T 200 10" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                            </svg>
                        </span><br />
                        With Nisha
                    </motion.h1>

                    {/* Refined Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                        className="text-slate-300 max-w-xl mb-10 text-lg md:text-xl font-medium leading-relaxed"
                    >
                        Learn data engineering visually — understand the how, why, and when behind each concept and build the skills to succeed in the real world.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto relative"
                    >
                        <button onClick={scrollToWork} className="baraa-btn w-full sm:w-auto text-lg px-8 py-4">
                            Start learning now
                        </button>

                        <div className="hidden md:flex flex-col absolute left-full ml-10 whitespace-nowrap">
                            {/* Hand drawn arrow pointing to button */}
                            <svg className="absolute -left-16 -top-2 w-12 h-12 text-yellow-200" viewBox="0 0 50 50">
                                <path d="M 40 25 Q 20 10 10 25" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <path d="M 15 20 L 10 25 L 15 30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            <span className="font-handwriting text-yellow-200 text-xl leading-none mb-1">Real projects.</span>
                            <span className="font-handwriting text-yellow-200 text-xl leading-none">Real growth.</span>
                        </div>
                    </motion.div>
                </div>

                {/* ── Hero Image (Right) ── */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="relative w-full max-w-sm md:max-w-md lg:max-w-lg hidden md:block"
                >
                    <div className="relative w-full aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden border border-white/[0.05] shadow-[0_0_50px_rgba(139,92,246,0.15)] group">
                        {/* Glow effect behind image */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-yellow-400/10 mix-blend-overlay z-10 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                        <img 
                            src="/nisha_hero_portrait.png" 
                            alt="Nisha Portrait" 
                            className="w-full h-full object-cover object-center grayscale-[20%] contrast-125 brightness-95 group-hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                </motion.div>
            </div>

            {/* ── Skill Grid Layout Desktop ── */}
            <div className="hidden md:flex w-full max-w-6xl mx-auto mt-20 justify-between px-8 relative z-10">
                {/* Horizontal connection line */}
                <div className="absolute top-1/2 left-16 right-16 h-px bg-white/[0.05] -translate-y-1/2 pointer-events-none" />
                
                {skills.map((s, i) => (
                    <SkillNode key={i} icon={s.icon} label={s.label} delay={0.6 + (i * 0.05)} />
                ))}
            </div>

            {/* ── Mobile Grid ── */}
            <div className="md:hidden w-full mt-10 px-4 relative z-10">
                <div className="grid grid-cols-4 gap-4 max-w-sm mx-auto">
                    {skills.map((s, i) => (
                        <SkillNode key={i} icon={s.icon} label={s.label} delay={0.5 + (i * 0.05)} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Hero;
