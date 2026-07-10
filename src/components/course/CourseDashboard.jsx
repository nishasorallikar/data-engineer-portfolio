import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Shield, Star, Lock, ArrowRight, Building2, Database, Bell, AlertTriangle, Search, Fingerprint, Workflow, Cloud, Layers, Grid3x3, Network, GitBranch, Server, Wifi, Wrench } from 'lucide-react';
const badgeIcons = { Building2, Database, Bell, AlertTriangle, Search, Fingerprint, Workflow, Cloud, Layers, Grid3x3, Network, GitBranch, Server, Wifi, Shield, Wrench };

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function CourseDashboard({ courseId, title, subtitle, modules, accentColor = 'emerald', badgeStorageKey }) {
  const [earnedBadges, setEarnedBadges] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(badgeStorageKey);
      if (stored) setEarnedBadges(JSON.parse(stored));
    } catch (err) {
      console.error(err);
    }
  }, [badgeStorageKey]);

  const progressPercent = (earnedBadges.length / modules.length) * 100;

  return (
    <div className="bg-black min-h-screen text-zinc-100">
      {/* Hero */}
      <div className="relative bg-zinc-950 px-4 sm:px-6 py-12 sm:py-[80px] overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'repeating-linear-gradient(to bottom, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)' }}
        />
        <div className="max-w-6xl mx-auto relative z-10">
          <Link to="/courses" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 text-sm font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Back to Courses
          </Link>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-4">{title}</h1>
          <p className="text-xl text-zinc-400 mb-8 max-w-2xl">{subtitle}</p>
          <div className="flex flex-wrap gap-4">
            <div className="px-4 py-2 rounded-full border border-zinc-700 bg-zinc-900/50 text-sm font-medium">
              {modules.length} Modules
            </div>
            <div className="px-4 py-2 rounded-full border border-zinc-700 bg-zinc-900/50 text-sm font-medium">
              Complete All to Earn Certification Badge
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-end mb-3">
            <h2 className="text-2xl font-bold">Your Progress</h2>
            <span className="text-zinc-400 font-medium text-sm">{earnedBadges.length} of {modules.length} modules completed</span>
          </div>
          <div className="h-4 w-full bg-zinc-800 rounded-full overflow-hidden">
            <div
              className={`h-full bg-${accentColor}-400 transition-all duration-1000 ease-out`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Modules Grid */}
        <motion.div
          className="grid grid-cols-1 gap-8 max-w-6xl mx-auto mb-12"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {modules.map((m) => {
            const isEarned = earnedBadges.includes(m.badge);
            const accent = m.accent || accentColor || 'emerald';

            return (
              <motion.div
                key={m.id}
                variants={cardVariant}
                className="group block relative"
              >
                <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500">
                    {/* Animated top accent line */}
                    <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-${accent}-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    {/* Glow effect on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-${accent}-500/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                    <div className="relative z-10 p-8 md:p-10 grid md:grid-cols-3 gap-8 items-center">
                        <div className="md:col-span-2">
                            {/* Tags */}
                            <div className="flex gap-2 mb-5 flex-wrap">
                                <span className={`px-3 py-1 bg-${accent}-500/10 border border-${accent}-500/20 text-${accent}-300 text-[11px] font-semibold rounded-full tracking-wide uppercase`}>Module {m.number}</span>
                                <span className={`px-3 py-1 bg-slate-500/10 border border-slate-500/20 text-slate-300 text-[11px] font-semibold rounded-full tracking-wide uppercase`}>{m.difficulty}</span>
                            </div>

                            <h3 className={`text-2xl md:text-3xl font-display font-bold mb-4 text-white group-hover:text-${accent}-400 transition-colors duration-300 leading-tight`}>
                                {m.title}
                            </h3>
                            <p className="text-slate-400 text-sm mb-6 max-w-xl leading-relaxed">
                                {m.description || m.topics.join(', ')}
                            </p>

                            {/* Tech tags */}
                            <div className="flex flex-wrap gap-2 mb-8">
                                {m.topics.slice(0, 6).map((topic, i) => (
                                    <span key={i} className={`px-2.5 py-1 bg-slate-800/60 rounded-lg border border-white/[0.06] text-[10px] text-slate-400 font-medium group-hover:border-${accent}-500/20 group-hover:text-slate-300 transition-all duration-300`}>
                                        {topic}
                                    </span>
                                ))}
                                {m.topics.length > 6 && (
                                    <span className="px-2.5 py-1 bg-transparent text-[10px] text-slate-500 font-medium mt-1">
                                        + {m.topics.length - 6} more topics
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-wrap items-center gap-6 mt-auto">
                                <Link to={m.route} className={`inline-flex items-center gap-2 text-${accent}-400 text-sm font-semibold group-hover:gap-3 transition-all duration-300`}>
                                    Start Module <ArrowRight size={14} />
                                </Link>
                                
                                <div className="h-4 w-px bg-slate-800 hidden sm:block"></div>

                                {isEarned ? (
                                    <div className="flex items-center gap-2 text-sky-400 text-sm font-medium">
                                        <Star className="w-4 h-4 fill-current" />
                                        <span>Badge Earned</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-zinc-600 text-sm font-medium">
                                        <Lock className="w-4 h-4" />
                                        <span>Locked</span>
                                    </div>
                                )}

                                <div className="h-4 w-px bg-slate-800 hidden sm:block"></div>

                                <div className="flex items-center gap-2 text-zinc-500 text-sm font-medium">
                                    <Clock className="w-4 h-4" />
                                    <span>{m.estimatedTime}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right side abstract graphic */}
                        <div className="hidden md:flex items-center justify-center">
                             <div className={`w-40 h-40 rounded-full bg-${accent}-500/5 border border-${accent}-500/20 flex items-center justify-center relative group-hover:scale-110 transition-transform duration-700 ease-out`}>
                                  <div className={`absolute inset-0 bg-${accent}-500/20 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700`}/>
                                  {(() => {
                                      const IconComponent = m.badgeIcon && badgeIcons[m.badgeIcon] ? badgeIcons[m.badgeIcon] : Shield;
                                      return <IconComponent size={64} className={`text-${accent}-500/30 group-hover:text-${accent}-400 transition-colors duration-500 relative z-10`} />;
                                  })()}
                                  <div className={`absolute inset-0 border border-${accent}-500/30 rounded-full scale-[1.2] opacity-50 border-dashed animate-[spin_20s_linear_infinite]`} />
                             </div>
                        </div>
                    </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Practice Exam Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-zinc-100 mb-2 flex items-center gap-2">
              <Shield className="w-6 h-6 text-indigo-400" />
              Practice Exam
            </h3>
            <p className="text-zinc-400">
              Test your knowledge across all {modules.length} modules with a comprehensive practice exam.
            </p>
          </div>
          <button
            className="whitespace-nowrap px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors shadow-lg shadow-indigo-900/20 cursor-not-allowed opacity-50"
            disabled
          >
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
}
