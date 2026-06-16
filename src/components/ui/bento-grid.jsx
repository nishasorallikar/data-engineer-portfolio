import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";

export function BentoGrid({ items = [] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {items.map((item, index) => {
                const colSpanClasses = cn(
                    item.colSpan === 3 ? "md:col-span-2" : "col-span-1" // Keep fallback if needed, but default to 1 col out of 2
                );

                const accentColors = {
                    blue: {
                        bg: "bg-blue-500/10 group-hover:bg-blue-500/20",
                        text: "text-blue-300",
                        border: "border border-blue-500/20 group-hover:border-blue-500/30",
                        glow: "from-blue-500/[0.03] to-cyan-500/[0.03]",
                        topLine: "via-blue-500"
                    },
                    violet: {
                        bg: "bg-violet-500/10 group-hover:bg-violet-500/20",
                        text: "text-violet-300",
                        border: "border border-violet-500/20 group-hover:border-violet-500/30",
                        glow: "from-violet-500/[0.03] to-purple-500/[0.03]",
                        topLine: "via-violet-500"
                    },
                    emerald: {
                        bg: "bg-emerald-500/10 group-hover:bg-emerald-500/20",
                        text: "text-emerald-300",
                        border: "border border-emerald-500/20 group-hover:border-emerald-500/30",
                        glow: "from-emerald-500/[0.03] to-green-500/[0.03]",
                        topLine: "via-emerald-500"
                    },
                    indigo: {
                        bg: "bg-indigo-500/10 group-hover:bg-indigo-500/20",
                        text: "text-indigo-300",
                        border: "border border-indigo-500/20 group-hover:border-indigo-500/30",
                        glow: "from-indigo-500/[0.03] to-blue-500/[0.03]",
                        topLine: "via-indigo-500"
                    },
                    default: {
                        bg: "bg-white/5 group-hover:bg-white/10",
                        text: "text-zinc-300",
                        border: "border border-white/5 group-hover:border-white/10",
                        glow: "from-transparent to-transparent",
                        topLine: "via-white"
                    }
                };

                const accent = accentColors[item.accent] || accentColors.default;

                const content = (
                    <div
                        className={cn(
                            "group relative p-5 sm:p-8 rounded-2xl overflow-hidden transition-all duration-500 h-full",
                            "border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]",
                            "hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]",
                            "hover:-translate-y-0.5 will-change-transform",
                            {
                                "shadow-[0_4px_20px_rgba(0,0,0,0.3)] -translate-y-0.5":
                                    item.hasPersistentHover,
                            }
                        )}
                    >
                        {/* Animated top accent line */}
                        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent ${accent.topLine} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                        
                        <div
                            className={`absolute inset-0 ${
                                item.hasPersistentHover
                                    ? "opacity-100"
                                    : "opacity-0 group-hover:opacity-100"
                            } transition-opacity duration-500 pointer-events-none`}
                        >
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:4px_4px]" />
                        </div>
                        
                        <div className={`absolute inset-0 bg-gradient-to-br ${accent.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                        <div className="relative flex flex-col h-full space-y-5">
                            <div className="flex items-center justify-between">
                                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500", accent.bg, accent.border)}>
                                    {item.icon}
                                </div>
                                <span
                                    className={cn(
                                        "text-[11px] font-bold px-3 py-1.5 rounded-full tracking-wider uppercase transition-all duration-500",
                                        accent.bg, accent.text, accent.border
                                    )}
                                >
                                    {item.status || "Active"}
                                </span>
                            </div>

                            <div className="space-y-3 flex-1">
                                <h3 className={cn("font-display font-bold text-white tracking-tight text-xl md:text-2xl transition-colors duration-500 group-hover:" + accent.text)}>
                                    {item.title}
                                    <span className="ml-2 text-xs text-slate-500 font-medium">
                                        {item.meta}
                                    </span>
                                </h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>

                            <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/[0.06]">
                                <div className="flex flex-wrap items-center gap-2">
                                    {item.tags?.map((tag, i) => (
                                        <span
                                            key={i}
                                            className={cn("px-3 py-1 rounded-lg text-[10px] font-semibold transition-all duration-500 bg-slate-800/60 border border-white/[0.06] text-slate-400 group-hover:text-slate-300", accent.border)}
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                                <span className={cn("text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ml-4 flex items-center gap-1", accent.text)}>
                                    {item.cta || "Explore"} <span className="text-[14px]">→</span>
                                </span>
                            </div>
                        </div>

                        <div
                            className={`absolute inset-0 -z-10 rounded-2xl p-px bg-gradient-to-br from-transparent via-white/10 to-transparent ${
                                item.hasPersistentHover
                                    ? "opacity-100"
                                    : "opacity-0 group-hover:opacity-100"
                            } transition-opacity duration-500`}
                        />
                    </div>
                );

                return item.route ? (
                    <Link to={item.route} key={index} className={cn("block h-full", colSpanClasses)}>
                        {content}
                    </Link>
                ) : (
                    <div key={index} className={cn("h-full", colSpanClasses)}>
                        {content}
                    </div>
                );
            })}
        </div>
    );
}
