import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { ArrowLeft, Calendar, Clock, Terminal, Share2, Bookmark } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';

const BlogPost = () => {
    const { id } = useParams();
    const post = blogPosts.find(p => p.id === id);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!post) {
        return (
            <div className="text-center py-32 flex flex-col items-center min-h-[60vh] justify-center bg-[#0a0514]">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10">
                    <Terminal className="text-slate-500" size={24} />
                </div>
                <h1 className="text-3xl font-display font-bold text-white mb-4">Post not found</h1>
                <p className="text-slate-400 mb-8">The article you're looking for doesn't exist or has been moved.</p>
                <Link to="/blog" className="baraa-btn">Back to Showcase</Link>
            </div>
        );
    }

    return (
        <article className="min-h-screen bg-[#0a0514] pb-32">
            {/* Reading Progress Bar */}
            <motion.div 
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-sky-400 origin-left z-50"
                style={{ scaleX }}
            />

            {/* Hero Section */}
            <div className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <Link to="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-sky-400 mb-8 transition-colors font-bold group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Showcase
                </Link>

                <div className="relative w-full h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(139,92,246,0.15)] group">
                    {/* Background Image / Gradient Fallback */}
                    {post.image ? (
                        <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-900/40 via-[#16161d] to-yellow-900/20" />
                    )}

                    {/* Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0514] via-[#0a0514]/60 to-transparent" />
                    <div className="absolute inset-0 bg-baraa-grid opacity-30" />

                    {/* Glassmorphic Content Card overlapping bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="max-w-4xl mx-auto"
                        >
                            <div className="flex flex-wrap gap-3 mb-6">
                                <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs rounded-full font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                    {post.category}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-2xl">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 text-sm text-slate-300 font-medium">
                                <span className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/5">
                                    <Calendar size={16} className="text-blue-400" /> {post.date}
                                </span>
                                <span className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/5">
                                    <Clock size={16} className="text-sky-400" /> {post.readTime}
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-24 relative">
                
                {/* Social Share / Floating Sidebar (Hidden on mobile) */}
                <div className="hidden lg:flex flex-col gap-4 absolute -left-16 top-0">
                    <button className="w-10 h-10 rounded-full bg-[#1c1c24] border border-white/10 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all">
                        <Share2 size={18} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-[#1c1c24] border border-white/10 flex items-center justify-center text-slate-400 hover:text-sky-400 hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(253,224,71,0.3)] transition-all">
                        <Bookmark size={18} />
                    </button>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="baraa-card p-8 md:p-12 lg:p-16 relative overflow-hidden"
                >
                    {/* Ambient Glow */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
                    
                    <div
                        className="prose prose-invert prose-lg max-w-none relative z-10
                            prose-headings:font-display prose-headings:text-white prose-headings:font-bold
                            prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-4 prose-h2:text-transparent prose-h2:bg-clip-text prose-h2:bg-gradient-to-r prose-h2:from-white prose-h2:to-slate-400
                            prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-purple-300
                            prose-p:text-slate-300 prose-p:leading-relaxed prose-p:tracking-wide
                            prose-a:text-sky-400 prose-a:no-underline hover:prose-a:text-yellow-300 hover:prose-a:underline hover:prose-a:underline-offset-4
                            prose-strong:text-white prose-strong:font-bold prose-strong:bg-blue-500/10 prose-strong:px-1 prose-strong:rounded
                            prose-ul:text-slate-300 prose-ul:list-disc prose-ul:pl-6 prose-ul:mt-4 prose-ul:mb-8
                            prose-ol:text-slate-300 prose-ol:list-decimal prose-ol:pl-6 prose-ol:mt-4 prose-ol:mb-8
                            prose-li:my-2 prose-li:pl-2
                            prose-code:text-yellow-300 prose-code:bg-[#0a0514] prose-code:border prose-code:border-white/10 prose-code:px-2 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-[0.9em] prose-code:before:content-none prose-code:after:content-none
                            prose-pre:bg-[#05030a] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-2xl prose-pre:shadow-[0_10px_30px_rgba(0,0,0,0.5)] prose-pre:p-0 prose-pre:my-8 prose-pre:relative
                            hover:prose-pre:border-blue-500/30 transition-all duration-300
                            [&_pre_code]:!bg-transparent [&_pre_code]:p-6 [&_pre_code]:block [&_pre_code]:overflow-x-auto"
                    >
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeHighlight]}
                        >
                            {post.content}
                        </ReactMarkdown>
                    </div>

                    <div className="mt-20 pt-10 border-t border-white/10 relative z-10">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Filed Under</h3>
                        <div className="flex flex-wrap gap-3">
                            {post.tags.map(tag => (
                                <span key={tag} className="px-4 py-2 bg-[#0a0514] border border-white/10 rounded-xl text-xs font-bold text-slate-300 hover:border-blue-500/50 hover:text-purple-300 hover:bg-blue-500/5 hover:shadow-[0_0_15px_rgba(139,92,246,0.1)] transition-all cursor-pointer transform hover:-translate-y-1">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </article>
    );
};

export default BlogPost;
