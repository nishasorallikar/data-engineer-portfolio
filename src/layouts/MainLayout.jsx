import React, { useEffect, useRef, useCallback } from 'react';
import Navbar from '../components/Navbar';
import AIModal from '../components/AIModal';
import { Toaster } from 'react-hot-toast';

const MainLayout = ({ children }) => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-[#0a0514] text-white relative overflow-x-hidden selection:bg-blue-500/30 selection:text-white">
            {/* Baraa Grid Background */}
            <div className="bg-baraa-grid"></div>
            
            <Navbar />

            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-28 md:pt-40 pb-16 md:pb-20">
                {children}
            </main>

            <AIModal />
            <Toaster position="bottom-right" toastOptions={{
                className: 'bg-[#16161d] border border-white/[0.05] text-white shadow-xl',
                style: {
                    background: '#16161d',
                    color: '#ffffff',
                    border: '1px solid rgba(255,255,255,0.05)',
                },
            }} />

            {/* Baraa Footer */}
            <footer className="relative z-10 border-t border-white/[0.05] bg-[#0a0514]/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 py-10">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-3">
                            <span className="font-handwriting text-xl tracking-wider text-white">
                                Data <span className="text-sm font-sans font-normal text-slate-400">with</span> Nisha
                            </span>
                            <span className="text-slate-500 text-xs ml-4">
                                © {new Date().getFullYear()}
                            </span>
                        </div>
                        <div className="flex items-center gap-6">
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                                Engineered with React
                            </span>
                            <button
                                onClick={scrollToTop}
                                className="flex items-center gap-1.5 text-[10px] text-blue-400 hover:text-purple-300 transition-colors uppercase tracking-wider font-bold cursor-pointer group"
                            >
                                Back to top
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-y-0.5 transition-transform">
                                    <path d="M18 15l-6-6-6 6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
