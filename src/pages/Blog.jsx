import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Database, Cloud, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';

const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'python', label: 'Python', icon: Terminal },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'cloud', label: 'Cloud', icon: Cloud },
];

const Blog = () => {
    const [activeTab, setActiveTab] = useState('all');

    const filteredProjects = blogPosts.filter(
        project => activeTab === 'all' || project.category === activeTab
    );

    return (
        <div className="max-w-7xl mx-auto pb-24 px-4 sm:px-6">
            <div className="text-center mb-16 space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                    <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                    Knowledge Base
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                    Engineering <span className="text-yellow-400 font-handwriting">Showcase</span>
                </h1>
                <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg font-medium leading-relaxed mt-4">
                    Deep dives into my data engineering projects across Python, Databases, and Cloud architecture.
                </p>
            </div>

            {/* Category Navigation */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
                {categories.map((cat) => {
                    const Icon = cat.icon;
                    const isActive = activeTab === cat.id;
                    return (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id)}
                            className={`relative px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                                isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                            }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-[#160f24] border border-purple-500/30 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.2)] -z-10"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            {Icon && <Icon size={16} className={isActive ? 'text-yellow-400' : 'text-slate-500'} />}
                            {cat.label}
                        </button>
                    );
                })}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            key={project.id}
                            className="group relative h-full"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-yellow-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative h-full bg-[#0f0a1a] border border-white/[0.05] group-hover:border-purple-500/30 rounded-2xl p-6 flex flex-col transition-all duration-300 z-10">
                                
                                <div className="flex justify-between items-start mb-4">
                                    <span className="px-3 py-1 bg-white/5 text-slate-300 text-[10px] font-bold uppercase tracking-wider rounded-md border border-white/10">
                                        {project.category}
                                    </span>
                                    <span className="text-slate-500 text-xs font-medium">{project.date}</span>
                                </div>

                                <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                                    {project.title}
                                </h3>

                                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                                    {project.excerpt}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="text-xs font-semibold text-purple-400/80">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                <Link to={`/blog/${project.id}`} className="mt-auto flex items-center gap-2 text-yellow-400 text-sm font-bold group-hover:gap-3 transition-all duration-300 w-max">
                                    Read Post <ArrowRight size={16} />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                
                {filteredProjects.length === 0 && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="col-span-full py-20 flex flex-col items-center justify-center text-center"
                    >
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10">
                            <Terminal className="text-slate-500" size={24} />
                        </div>
                        <h3 className="text-xl font-display font-bold text-white mb-2">Check back soon</h3>
                        <p className="text-slate-400">More projects in this category are currently being documented.</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Blog;
