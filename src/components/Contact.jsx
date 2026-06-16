import React, { useState } from 'react';
import { Mail, Linkedin, Sparkles, Send, ArrowUpRight, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

/* ─── Career Timeline ─── */
const timelineData = [
    {
        role: 'Azure Data Engineer',
        org: 'VSM Infotech (Bengaluru, India)',
        date: 'Aug. 2025 - Present',
        active: true,
        color: '#fde047', // Yellow for active Data role
        description: [
            'Architected & deployed a production-grade Supply Chain Control Tower on Azure Databricks and Delta Lake, ingesting thousands of daily aerospace transactions from Teradata, PostgreSQL, and REST APIs via Medallion Architecture (Bronze → Silver → Gold) for Mahindra Aerospace.',
            'Designed & orchestrated end-to-end ETL/ELT pipelines using Azure Data Factory (ADF), Databricks (PySpark), and ADLS Gen2, automating ingestion across 3 upstream integrations and eliminating manual reporting workflows.',
            'Optimized PySpark batch jobs via Z-ORDER clustering, AQE, partition pruning, and broadcast joins– achieving 40% faster batch processing at zero incremental cluster cost.',
            'Built Apache Airflow DAGs with configurable retry logic, SLA breach alerting, and DLQ handling for failed/late-arriving records, achieving 99%+ pipeline reliability.',
            'Engineered Gold-layer PySpark pipelines computing 6 mission-critical KPIs surfaced via Power BI dashboards with optimized DAX measures.',
            'Implemented SCD Type-2 historization on supplier master and inventory datasets using SQL MERGE INTO and ROW_NUMBER window functions, enabling point-in-time analytics for regulatory audit-trail compliance.',
            'Developed self-serve analytics layer on Delta Lake with ACID-compliant, time-travel-enabled tables for point-in-time querying without engineering intervention.',
            'Implemented Git-based version control and CI/CD workflows on GitHub/Azure DevOps for auditable, consistent deployment of Databricks notebooks, ADF pipelines, and Airflow DAGs.'
        ],
        skills: ['Azure Databricks', 'Delta Lake', 'PySpark', 'ADF', 'Airflow', 'Power BI', 'SQL', 'CI/CD'],
    }
];

const About = () => {
    return (
        <section id="about" className="mt-16 md:mt-32 max-w-4xl mx-auto relative z-10 px-4">
            {/* Section header */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-4 flex flex-col md:flex-row md:items-center justify-between"
            >
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight relative">
                    Career <span className="font-handwriting text-purple-400 text-4xl sm:text-5xl">Timeline</span>
                    {/* Doodle underline */}
                    <svg className="absolute -bottom-2 left-0 w-full h-3 text-purple-500/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <path d="M 0 5 Q 25 10 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </h2>
                <div className="hidden md:block h-[1px] bg-white/[0.05] flex-1 ml-10"></div>
            </motion.div>
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-slate-400 text-base mb-14 max-w-lg font-medium mt-6"
            >
                Key milestones in my data engineering journey — building scalable pipelines and robust analytics architectures.
            </motion.p>

            {/* Timeline */}
            <div className="relative ml-4 md:ml-6 mt-12">
                {/* Vertical line - Purple gradient */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500/50 via-purple-500/20 to-transparent" />

                <div className="space-y-12">
                    {timelineData.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.5 }}
                            className="relative pl-10 group"
                        >
                            {/* Timeline dot */}
                            <div className="absolute -left-[6px] top-2">
                                <div
                                    className="w-3.5 h-3.5 rounded-full flex items-center justify-center bg-[#0a0514] border-2"
                                    style={{
                                        borderColor: item.active ? item.color : '#475569',
                                        boxShadow: item.active ? `0 0 10px ${item.color}80` : 'none'
                                    }}
                                >
                                    {item.active && <div className="w-1.5 h-1.5 rounded-full" style={{ background: item.color }} />}
                                </div>
                            </div>

                            {/* Card */}
                            <div className="baraa-card p-6 md:p-8">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                                    <div>
                                        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors tracking-tight">
                                            {item.role}
                                        </h3>
                                        <div className="text-sm font-medium mt-1 text-purple-300">{item.org}</div>
                                    </div>
                                    <span
                                        className="mt-3 sm:mt-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
                                        style={{
                                            background: item.active ? `${item.color}15` : '#160f24',
                                            color: item.active ? item.color : '#94a3b8',
                                            border: `1px solid ${item.active ? `${item.color}30` : '#334155'}`,
                                        }}
                                    >
                                        {item.active && <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: item.color }} />}
                                        {item.date}
                                    </span>
                                </div>

                                {Array.isArray(item.description) ? (
                                    <ul className="text-slate-300 text-sm leading-relaxed mb-6 list-none space-y-3">
                                        {item.description.map((desc, idx) => (
                                            <li key={idx} className="flex gap-3">
                                                <span className="text-purple-500 mt-1">▹</span>
                                                <span>{desc}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-slate-300 text-sm leading-relaxed mb-6">{item.description}</p>
                                )}

                                {/* Skill tags */}
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {item.skills.map(skill => (
                                        <span key={skill} className="px-3 py-1 rounded-md text-[10px] font-bold tracking-wide bg-white/5 border border-white/10 text-slate-300 uppercase">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ─── Contact Section ─── */
const contactLinks = [
    {
        icon: Mail,
        label: 'Email',
        value: 'nishasorallikar@gmail.com',
        href: 'mailto:nishasorallikar@gmail.com',
        color: '#fde047',
    },
    {
        icon: Linkedin,
        label: 'LinkedIn',
        value: '/in/nisha-sorallikar',
        href: 'https://linkedin.com/in/nisha-sorallikar',
        color: '#8b5cf6',
        external: true,
    },
    {
        icon: FileText,
        label: 'Resume',
        value: 'Download PDF',
        href: 'https://drive.google.com/file/d/1nXOm8tC7hQdQHxsYPZCw74EVqAGEobF3/view?usp=sharing',
        color: '#ec4899',
        external: true,
    },
];

const Contact = () => {
    const [msg, setMsg] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isDrafting, setIsDrafting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Message sent (Demo)!');
        setName('');
        setEmail('');
        setMsg('');
    };

    const generateDraft = async () => {
        toast('Drafting message...', { icon: '✨' });
        setMsg("AI is thinking...");
        setIsDrafting(true);

        try {
            await new Promise(r => setTimeout(r, 1500));
            setMsg(`Hi Nisha,\n\nI'm ${name || 'a Recruiter'} and I was impressed by your data engineering portfolio. We have an open Data Engineer role that fits your Databricks experience perfectly.\n\nLet's connect!`);
            toast.success('Draft generated!');
        } catch (e) {
            setMsg("");
            toast.error('Failed to draft.');
        } finally {
            setIsDrafting(false);
        }
    };

    return (
        <section id="contact" className="mt-16 md:mt-32 max-w-5xl mx-auto mb-12 md:mb-20 px-4 relative z-10">
            {/* Section header */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-4 flex flex-col md:flex-row md:items-center justify-between"
            >
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight relative">
                    Get In <span className="font-handwriting text-yellow-400 text-4xl sm:text-5xl">Touch</span>
                </h2>
                <div className="hidden md:block h-[1px] bg-white/[0.05] flex-1 ml-10"></div>
            </motion.div>
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-slate-400 text-base mb-14 max-w-lg font-medium mt-6"
            >
                Ready to build scalable data platforms? I'm open to Data Engineering and Data Architecture roles.
            </motion.p>

            <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start mt-12">

                {/* Left: Contact Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 text-white leading-tight tracking-tight">
                        Let's engineer your data strategy.
                    </h3>
                    <p className="text-slate-400 text-base mb-10 leading-relaxed max-w-sm">
                        Whether you need a robust ETL pipeline, a migration to Databricks, or just want to discuss modern data stacks, my inbox is open.
                    </p>

                    <div className="space-y-4">
                        {contactLinks.map((link, i) => (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                target={link.external ? '_blank' : undefined}
                                rel={link.external ? 'noopener noreferrer' : undefined}
                                initial={{ opacity: 0, x: -15 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="baraa-card flex items-center gap-4 p-4 group hover:-translate-y-1 transition-transform"
                            >
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-[#0a0514] border"
                                    style={{
                                        borderColor: `${link.color}40`,
                                        boxShadow: `0 0 15px ${link.color}20`
                                    }}
                                >
                                    <link.icon size={20} style={{ color: link.color }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className="block text-[11px] uppercase tracking-widest font-bold text-slate-500 mb-1">{link.label}</span>
                                    <span className="block text-sm font-bold text-slate-300 group-hover:text-white transition-colors truncate">{link.value}</span>
                                </div>
                                {link.external && (
                                    <ArrowUpRight size={16} className="text-slate-500 group-hover:text-yellow-400 transition-colors" />
                                )}
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                {/* Right: Contact Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                    className="baraa-card p-6 sm:p-8 relative overflow-hidden"
                >
                    {/* Subtle glow */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl" />
                    
                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div>
                            <label htmlFor="contact-name" className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Name</label>
                            <input
                                id="contact-name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Jane Doe"
                                className="baraa-input"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="contact-email" className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Email</label>
                            <input
                                id="contact-email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="jane@company.com"
                                className="baraa-input"
                                required
                            />
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label htmlFor="contact-message" className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest">Message</label>
                                <button
                                    type="button"
                                    onClick={generateDraft}
                                    disabled={isDrafting}
                                    className="text-[10px] text-purple-400 hover:text-purple-300 flex items-center gap-1 disabled:opacity-50 cursor-pointer uppercase tracking-wider font-bold transition-colors"
                                >
                                    <Sparkles size={10} /> Draft with AI
                                </button>
                            </div>
                            <textarea
                                id="contact-message"
                                rows="4"
                                value={msg}
                                onChange={(e) => setMsg(e.target.value)}
                                placeholder="Tell me about your project..."
                                className="baraa-input resize-none"
                                required
                            ></textarea>
                        </div>

                        <button type="submit" className="baraa-btn w-full py-4 group flex items-center justify-center gap-2 mt-4 text-base">
                            <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            Send Message
                        </button>
                    </form>
                </motion.div>

            </div>
        </section>
    );
};

export { About, Contact };
