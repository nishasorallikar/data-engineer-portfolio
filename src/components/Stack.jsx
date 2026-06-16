import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Cloud, 
    Database, 
    Layers, 
    Terminal, 
    GitBranch, 
    BarChart, 
    Server, 
    Network,
    CheckCircle
} from 'lucide-react';

/* ─── Intersection Observer hook ─── */
function useInView(threshold = 0.12) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setInView(true); return; }
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setInView(true); obs.unobserve(el); } },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, inView];
}

/* ─── Category-level icons ─── */
const catIcons = {
    cloud: (c) => <Cloud color={c} size={20} strokeWidth={1.8} />,
    bigdata: (c) => <Database color={c} size={20} strokeWidth={1.8} />,
    orchestration: (c) => <Network color={c} size={20} strokeWidth={1.8} />,
    languages: (c) => <Terminal color={c} size={20} strokeWidth={1.8} />,
    modelling: (c) => <Layers color={c} size={20} strokeWidth={1.8} />,
    devops: (c) => <GitBranch color={c} size={20} strokeWidth={1.8} />,
    bi: (c) => <BarChart color={c} size={20} strokeWidth={1.8} />,
    databases: (c) => <Server color={c} size={20} strokeWidth={1.8} />,
    cert: (c) => <CheckCircle color={c} size={20} strokeWidth={1.8} />
};

/* ─── Skills data w/ Extended Details ─── */
const skillCategories = [
    {
        title: 'Cloud Platform & Services',
        icon: 'cloud',
        color: '#fde047', // Yellow
        tools: ['Azure Databricks', 'Data Factory (ADF)', 'ADLS Gen2', 'Synapse Analytics', 'SQL Database', 'Key Vault', 'Event Hubs'],
        details: 'Architecting scalable data solutions on Microsoft Azure.',
        extendedDetails: [
            "Designed and deployed enterprise-grade data lakes using ADLS Gen2 with strict RBAC.",
            "Orchestrated complex data integration workflows using Azure Data Factory and Synapse Analytics.",
            "Secured credentials and access tokens centrally using Azure Key Vault."
        ]
    },
    {
        title: 'Big Data Processing',
        icon: 'bigdata',
        color: '#8b5cf6', // Purple
        tools: ['Apache Spark', 'PySpark', 'Spark SQL', 'Delta Lake', 'Structured Streaming'],
        details: 'Distributed data processing and lakehouse architectures.',
        extendedDetails: [
            "Optimized massive data transformations using PySpark, leveraging broadcast joins and adaptive query execution.",
            "Implemented ACID transactions on data lakes using Delta Lake (Time Travel, Schema Enforcement).",
            "Built real-time data pipelines using Spark Structured Streaming integrating with Event Hubs/Kafka."
        ]
    },
    {
        title: 'Data Orchestration',
        icon: 'orchestration',
        color: '#ec4899', // Pink
        tools: ['Apache Airflow', 'ADF Pipelines', 'Databricks Workflows'],
        details: 'Automating and scheduling complex data workflows with dependency management.',
        extendedDetails: [
            "Developed robust Airflow DAGs with custom operators, SLA alerting, retries, and Dead Letter Queues (DLQ).",
            "Managed dependency-driven execution of Databricks notebooks using Databricks Workflows.",
            "Configured event-based and schedule-based triggers in Azure Data Factory."
        ]
    },
    {
        title: 'Languages',
        icon: 'languages',
        color: '#22d3ee', // Cyan
        tools: ['Python', 'SQL', 'T-SQL', 'Shell Scripting'],
        details: 'Core programming languages for data manipulation and automation.',
        extendedDetails: [
            "Wrote highly optimized SQL and T-SQL queries for data warehousing and reporting.",
            "Developed modular Python packages for data ingestion, cleaning, and validation.",
            "Automated infrastructure setup and deployment tasks using Bash/Shell scripting."
        ]
    },
    {
        title: 'Data Modelling',
        icon: 'modelling',
        color: '#f97316', // Orange
        tools: ['Medallion Architecture', 'Dimensional Modelling', 'Star Schema', 'SCD Type-2', 'Fact/Dim Tables'],
        details: 'Designing schemas for performant analytics and reporting.',
        extendedDetails: [
            "Implemented Medallion Architecture (Bronze, Silver, Gold) ensuring data quality at each hop.",
            "Designed Star and Snowflake schemas optimized for Power BI consumption.",
            "Built Slowly Changing Dimensions (SCD Type-2) to accurately track historical data changes."
        ]
    },
    {
        title: 'DevOps & CI/CD',
        icon: 'devops',
        color: '#22c55e', // Green
        tools: ['Azure DevOps', 'Git', 'GitHub', 'CI/CD Pipelines', 'ARM Templates', 'YAML'],
        details: 'Version control and automated infrastructure deployment.',
        extendedDetails: [
            "Maintained codebase integrity using Git and branch-based development on GitHub.",
            "Automated testing and deployment of data pipelines using Azure DevOps CI/CD pipelines (YAML).",
            "Provisioned cloud resources dynamically using ARM Templates and Infrastructure as Code."
        ]
    },
    {
        title: 'Reporting & BI',
        icon: 'bi',
        color: '#a855f7', // Purple
        tools: ['Power BI', 'DAX', 'Power Query', 'Executive Dashboards', 'Excel'],
        details: 'Translating raw data into interactive, actionable business insights.',
        extendedDetails: [
            "Developed complex DAX measures for advanced time-intelligence and KPI tracking in Power BI.",
            "Built high-fidelity executive dashboards to visualize critical business metrics.",
            "Optimized Power Query (M) scripts for efficient data extraction and loading."
        ]
    },
    {
        title: 'Databases & Sources',
        icon: 'databases',
        color: '#ef4444', // Red
        tools: ['Teradata', 'PostgreSQL', 'MySQL', 'Azure SQL', 'REST APIs'],
        details: 'Extracting and loading data across diverse RDBMS and APIs.',
        extendedDetails: [
            "Migrated legacy on-premise data from Teradata to cloud-native Azure SQL Database.",
            "Engineered Python scripts to extract paginated data from third-party REST APIs.",
            "Optimized query performance and indexing on PostgreSQL and MySQL databases."
        ]
    },
];

const certifications = [
    { name: 'Microsoft Certified: Azure Data Fundamentals', org: 'Microsoft (DP-900)', color: '#3b82f6' },
    { name: 'Databricks Lakehouse Fundamentals', org: 'Databricks', color: '#f59e0b' },
    { name: 'Agile & Scrum Methodology', org: 'Jira / Software Dev', color: '#8b5cf6' },
];

/* ─── Animated Category Visualizers ─── */
const Visualizers = {
    cloud: ({ color }) => (
        <div className="relative w-full h-full flex items-center justify-center">
            <motion.div 
                className="absolute w-20 h-10 rounded-full mix-blend-screen backdrop-blur-md"
                style={{ border: `1px solid ${color}`, background: `${color}20`, top: '40%', left: '25%' }}
                animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
                className="absolute w-16 h-8 rounded-full mix-blend-screen backdrop-blur-md"
                style={{ border: `1px solid ${color}`, background: `${color}10`, top: '25%', left: '50%' }}
                animate={{ y: [10, -10, 10], x: [5, -5, 5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
        </div>
    ),
    bigdata: ({ color }) => (
        <div className="relative w-full h-full flex flex-col items-center justify-center gap-2 overflow-hidden px-10">
            <motion.div 
                className="w-full flex flex-col gap-2"
                animate={{ y: [0, -60] }}
                transition={{ duration: 3, ease: "linear", repeat: Infinity }}
            >
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-full h-4 rounded opacity-40 flex items-center px-2 gap-2" style={{ background: `${color}15` }}>
                        <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                        <div className="h-1 rounded w-1/3" style={{ background: `${color}40` }} />
                        <div className="h-1 rounded w-1/4" style={{ background: `${color}40` }} />
                    </div>
                ))}
            </motion.div>
        </div>
    ),
    orchestration: ({ color }) => (
        <div className="relative w-full h-full flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full">
                <motion.line x1="20%" y1="50%" x2="50%" y2="20%" stroke={`${color}40`} strokeWidth="2" strokeDasharray="4 4" />
                <motion.line x1="50%" y1="20%" x2="80%" y2="50%" stroke={`${color}40`} strokeWidth="2" strokeDasharray="4 4" />
                <motion.line x1="80%" y1="50%" x2="50%" y2="80%" stroke={`${color}40`} strokeWidth="2" strokeDasharray="4 4" />
                <motion.line x1="50%" y1="80%" x2="20%" y2="50%" stroke={`${color}40`} strokeWidth="2" strokeDasharray="4 4" />
                <motion.circle r="3" fill={color} animate={{ cx: ["20%", "50%", "80%", "50%", "20%"], cy: ["50%", "20%", "50%", "80%", "50%"] }} transition={{ duration: 4, ease: "linear", repeat: Infinity }} />
            </svg>
            <div className="absolute w-6 h-6 rounded-md z-10" style={{ left: 'calc(20% - 12px)', top: 'calc(50% - 12px)', background: `${color}80` }} />
            <div className="absolute w-6 h-6 rounded-md z-10" style={{ left: 'calc(50% - 12px)', top: 'calc(20% - 12px)', background: `${color}80` }} />
            <div className="absolute w-6 h-6 rounded-md z-10" style={{ left: 'calc(80% - 12px)', top: 'calc(50% - 12px)', background: `${color}80` }} />
            <div className="absolute w-6 h-6 rounded-md z-10" style={{ left: 'calc(50% - 12px)', top: 'calc(80% - 12px)', background: `${color}80` }} />
        </div>
    ),
    modelling: ({ color }) => (
        <div className="relative w-full h-full flex flex-col items-center justify-center gap-1">
            {[...Array(3)].map((_, row) => (
                <div key={row} className="flex gap-1">
                    {[...Array(5)].map((_, col) => (
                        <motion.div 
                            key={col} 
                            className="w-6 h-6 rounded-sm"
                            style={{ background: `${color}30` }}
                            animate={{ opacity: [0.3, 1, 0.3], background: [`${color}30`, `${color}`, `${color}30`] }}
                            transition={{ duration: 3, delay: (row+col)*0.2, repeat: Infinity }}
                        />
                    ))}
                </div>
            ))}
        </div>
    ),
    devops: ({ color }) => (
        <div className="relative w-full h-full flex items-center justify-center">
            <motion.div 
                className="w-16 h-16 rounded-full flex items-center justify-center z-10"
                style={{ background: `${color}20`, border: `2px solid ${color}` }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
            >
                <div className="w-6 h-6 rounded-full" style={{ background: color }} />
            </motion.div>
            {[...Array(3)].map((_, i) => (
                <motion.div key={i} className="absolute w-16 h-16 rounded-full" style={{ border: `2px solid ${color}` }}
                    animate={{ scale: [1, 3], opacity: [0.8, 0] }}
                    transition={{ duration: 2, delay: i*0.6, repeat: Infinity, ease: "easeOut" }}
                />
            ))}
        </div>
    ),
    bi: ({ color }) => (
        <div className="relative w-full h-full flex items-end justify-center gap-2 pb-6">
            {[40, 70, 50, 90, 60].map((h, i) => (
                <motion.div 
                    key={i} 
                    className="w-4 rounded-t-sm"
                    style={{ background: color }}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 1, delay: i * 0.2 }}
                />
            ))}
        </div>
    ),
};

const DataVisualizer = ({ category }) => {
    // Default fallback to cloud
    const SpecificVisualizer = Visualizers[category.icon] || Visualizers['cloud']; 
    
    return (
        <div className="relative w-full h-48 md:h-full bg-[#160f24] rounded-2xl border flex items-center justify-center overflow-hidden" style={{ borderColor: `${category.color}30` }}>
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(${category.color} 1px, transparent 1px)`, backgroundSize: '16px 16px' }} />
            <SpecificVisualizer color={category.color} />
        </div>
    );
};

/* ─── Animated Modal Component ─── */
const SkillModal = ({ category, onClose }) => {
    const CatIcon = catIcons[category.icon];

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-5 md:p-8 rounded-2xl md:rounded-[2rem] bg-[#0f0a1a] border border-white/[0.1] shadow-[0_0_50px_rgba(139,92,246,0.15)] z-10 flex flex-col md:flex-row gap-5 md:gap-8"
            >
                <div 
                    className="absolute top-0 left-0 w-full h-[1px]" 
                    style={{ background: `linear-gradient(90deg, transparent, ${category.color}80, transparent)` }} 
                />

                <div className="w-full md:w-5/12 lg:w-1/3 flex-shrink-0 order-2 md:order-1 pt-2 md:pt-0">
                    <DataVisualizer category={category} />
                </div>

                <div className="w-full md:w-7/12 lg:w-2/3 flex flex-col justify-between order-1 md:order-2">
                    <div className="flex items-start justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(0,0,0,0.5)] bg-[#160f24]"
                                style={{ border: `1px solid ${category.color}30` }}>
                                {CatIcon(category.color)}
                            </div>
                            <div>
                                <h2 className="text-2xl font-display font-bold text-white mb-1 tracking-tight">{category.title}</h2>
                                <p className="text-sm text-slate-400">{category.details}</p>
                            </div>
                        </div>
                        
                        <button 
                            onClick={onClose}
                            className="p-2 -mr-2 -mt-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>

                    <div className="mb-6">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                            {category.tools.map((tool) => (
                                <span key={tool}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold"
                                    style={{
                                        background: `${category.color}15`,
                                        border: `1px solid ${category.color}30`,
                                        color: category.color,
                                    }}
                                >
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Core Implementations</h4>
                        <ul className="space-y-4">
                            {category.extendedDetails.map((detail, idx) => (
                                <motion.li 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + (idx * 0.1) }}
                                    key={idx} 
                                    className="flex items-start gap-3 text-[13px] text-slate-300 leading-relaxed"
                                >
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 shadow-[0_0_5px_currentColor]" style={{ background: category.color, color: category.color }} />
                                    {detail}
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

/* ─── Mini Skill Card (Trigger) ─── */
const SkillCard = ({ category, index, inView, onClick }) => {
    const CatIcon = catIcons[category.icon];
    
    return (
        <motion.div
            onClick={onClick}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="baraa-card group relative p-6 cursor-pointer"
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
            }}
            transition={{
                opacity: { duration: 0.5, delay: index * 0.06 },
                transform: { duration: 0.5, delay: index * 0.06 }
            }}
        >
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 bg-[#160f24]"
                            style={{ border: `1px solid ${category.color}40`, boxShadow: `0 0 10px ${category.color}15` }}>
                            {CatIcon(category.color)}
                        </div>
                        <h3 className="font-display font-bold text-white text-sm">{category.title}</h3>
                    </div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 text-slate-400 group-hover:text-yellow-400 transition-colors group-hover:bg-white/10">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {category.tools.slice(0, 3).map((tool) => (
                        <span key={tool}
                            className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-bold"
                            style={{
                                background: `${category.color}10`,
                                border: `1px solid ${category.color}20`,
                                color: category.color,
                            }}
                        >
                            {tool}
                        </span>
                    ))}
                    {category.tools.length > 3 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-lg text-[10px] font-bold text-slate-400 bg-white/5 border border-white/10">
                            +{category.tools.length - 3}
                        </span>
                    )}
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2 mt-auto">
                    {category.details}
                </p>
            </div>
        </motion.div>
    );
};

/* ─── Main Component ─── */
const Stack = () => {
    const [ref, inView] = useInView(0.08);
    const [certRef, certInView] = useInView(0.15);
    const [selectedSkill, setSelectedSkill] = useState(null);

    return (
        <section id="stack" className="py-24 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mb-12 flex flex-col items-center justify-center text-center relative"
            >
                {/* Hand drawn accent */}
                <svg className="absolute -top-8 w-16 h-16 text-purple-500 opacity-50 -ml-40 rotate-12" viewBox="0 0 50 50">
                    <path d="M 25 10 L 25 40 M 10 25 L 40 25 M 15 15 L 35 35 M 15 35 L 35 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>

                <div className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-[10px] font-bold uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                    Technical Stack
                </div>
                <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
                    Tools of the <span className="text-yellow-400 font-handwriting text-4xl sm:text-6xl px-2">Trade</span>
                </h2>
                <p className="text-slate-400 text-base mt-4 max-w-lg font-medium">
                    Core competencies across Data Architecture, ETL/ELT pipelines, and BI domains. Click cards to expand.
                </p>
            </motion.div>

            <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16 max-w-7xl mx-auto px-4">
                {skillCategories.map((cat, i) => (
                    <SkillCard 
                        key={cat.title} 
                        category={cat} 
                        index={i} 
                        inView={inView} 
                        onClick={() => setSelectedSkill(cat)}
                    />
                ))}
            </div>

            <div ref={certRef} className="mt-8 max-w-5xl mx-auto px-4">
                <h3 className={`text-xl font-handwriting tracking-wider text-purple-300 mb-6 flex items-center justify-center gap-3 transition-all duration-500 ${certInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <span className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shadow-[0_0_10px_rgba(139,92,246,0.2)]">
                        {catIcons.cert('#a855f7')}
                    </span>
                    Certifications & Methodologies
                </h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {certifications.map((cert, i) => (
                        <div key={i}
                            className="baraa-card group p-5 flex items-start gap-3"
                            style={{
                                opacity: certInView ? 1 : 0,
                                transform: certInView ? 'translateY(0)' : 'translateY(16px)',
                                transition: `all 400ms ease-out ${i * 120}ms`,
                            }}
                        >
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 bg-[#160f24]"
                                style={{ border: `1px solid ${cert.color}40`, boxShadow: `0 0 10px ${cert.color}15` }}>
                                {catIcons.cert(cert.color)}
                            </div>
                            <div>
                                <h4 className="font-display font-bold text-sm text-white mb-1 leading-snug group-hover:text-yellow-400 transition-colors tracking-tight">
                                    {cert.name}
                                </h4>
                                <p className="text-[11px] text-slate-400">{cert.org}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedSkill && (
                    <SkillModal 
                        category={selectedSkill} 
                        onClose={() => setSelectedSkill(null)} 
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Stack;
