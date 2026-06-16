import React from 'react';
import { motion } from 'framer-motion';
import { blogPosts } from '../data/blogPosts';
import { Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
    return (
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/50 text-slate-300 text-xs font-medium backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                    Knowledge Base
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-white">
                    Threat Intelligence <span className="text-gradient">& Writeups</span>
                </h1>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    Documentation of my journey through offensive security, digital forensics, and SOC operations.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post, index) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <Link to={`/blog/${post.id}`} className="group block relative h-full">
                            <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 h-full flex flex-col p-6">
                                {/* Animated top accent line */}
                                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                
                                {/* Glow effect on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-5">
                                        <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[11px] rounded-full font-semibold tracking-wide uppercase">
                                            {post.category}
                                        </span>
                                        <span className="text-slate-500 text-xs font-medium flex items-center gap-1">
                                            <Clock size={12} /> {post.readTime}
                                        </span>
                                    </div>

                                    <h2 className="text-xl font-display font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300 leading-tight">
                                        {post.title}
                                    </h2>

                                    <p className="text-slate-400 text-sm mb-6 flex-1 line-clamp-3 leading-relaxed">
                                        {post.excerpt}
                                    </p>

                                    <div className="mt-auto">
                                        <div className="flex flex-wrap gap-2 mb-5">
                                            {post.tags.slice(0, 3).map(tag => (
                                                <span key={tag} className="px-2 py-1 bg-slate-800/60 rounded border border-white/[0.06] text-[10px] text-slate-400 font-medium group-hover:border-cyan-500/20 group-hover:text-slate-300 transition-all duration-300">
                                                    #{tag}
                                                </span>
                                            ))}
                                            {post.tags.length > 3 && (
                                                <span className="px-2 py-1 bg-transparent text-[10px] text-slate-500 font-medium">
                                                    +{post.tags.length - 3}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center text-cyan-400 text-sm font-semibold gap-2 group-hover:gap-3 transition-all duration-300">
                                            Read Article <ArrowRight size={14} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Blog;
