import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Track scroll for glass intensity
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleNavigation = (id) => {
        setMobileOpen(false);
        if (location.pathname !== '/') {
            navigate('/', { state: { targetId: id } });
        } else {
            scrollToSection(id);
        }
    };

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (location.pathname === '/' && location.state?.targetId) {
            setTimeout(() => {
                scrollToSection(location.state.targetId);
                window.history.replaceState({}, document.title);
            }, 100);
        }
    }, [location]);

    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0, x: "-50%" }}
            animate={{ y: 0, opacity: 1, x: "-50%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.2 }}
            className={`fixed top-4 md:top-6 left-1/2 z-50 w-[92%] md:w-[90%] max-w-4xl backdrop-blur-xl border rounded-2xl md:rounded-full px-5 py-3.5 md:px-6 md:py-3 flex items-center justify-between transition-all duration-500 ${
                scrolled
                    ? 'bg-[#16161d]/95 border-blue-500/30 shadow-[0_4px_30px_rgba(139,92,246,0.15)]'
                    : 'bg-transparent border-transparent shadow-none'
            }`}
        >
            <Link to="/" className="font-handwriting text-2xl tracking-wide flex items-center gap-2 hover:text-blue-400 transition-colors group text-white">
                Data <span className="text-sm font-sans font-normal text-slate-400 uppercase tracking-widest mt-1">with</span> Nisha
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1 text-sm font-bold text-slate-300">
                <button onClick={() => {
                    if (location.pathname !== '/') {
                        navigate('/');
                    } else {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                }} className="px-4 py-2 rounded-full hover:text-sky-400 hover:bg-white/5 transition-all duration-200 cursor-pointer">
                    Home
                </button>
                <button onClick={() => handleNavigation('work')} className="px-4 py-2 rounded-full hover:text-sky-400 hover:bg-white/5 transition-all duration-200 cursor-pointer">
                    Projects
                </button>
                <Link to="/blog" className="px-4 py-2 rounded-full hover:text-sky-400 hover:bg-white/5 transition-all duration-200">
                    Blogs
                </Link>
            </div>

            <div className="hidden md:block">
                <button
                    onClick={() => handleNavigation('contact')}
                    className="baraa-btn shadow-md"
                >
                    Contact
                </button>
            </div>

            {/* Mobile Hamburger */}
            <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden text-slate-300 hover:text-blue-400 transition-colors cursor-pointer"
                aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Mobile Dropdown */}
            {mobileOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-3 bg-[#16161d]/95 backdrop-blur-xl border border-white/[0.05] rounded-2xl p-6 flex flex-col gap-1 md:hidden shadow-[0_10px_40px_rgba(139,92,246,0.2)]"
                >
                    <button onClick={() => { 
                        setMobileOpen(false); 
                        if (location.pathname !== '/') {
                            navigate('/');
                        } else {
                            window.scrollTo({ top: 0, behavior: 'smooth' }); 
                        }
                    }} className="text-left text-slate-300 hover:text-sky-400 transition-colors font-bold py-3 px-3 rounded-xl hover:bg-white/5 capitalize cursor-pointer">
                        Home
                    </button>
                    <button onClick={() => handleNavigation('work')} className="text-left text-slate-300 hover:text-sky-400 transition-colors font-bold py-3 px-3 rounded-xl hover:bg-white/5 capitalize cursor-pointer">
                        Projects
                    </button>
                    <Link to="/blog" onClick={() => setMobileOpen(false)} className="text-slate-300 hover:text-sky-400 transition-colors font-bold py-3 px-3 rounded-xl hover:bg-white/5">
                        Blogs
                    </Link>
                    <hr className="border-white/[0.05] my-2" />
                    <button onClick={() => handleNavigation('contact')} className="baraa-btn w-full mt-1">
                        Contact
                    </button>
                </motion.div>
            )}
        </motion.nav>
    );
};

export default Navbar;
