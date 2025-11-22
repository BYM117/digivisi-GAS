
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  // Determine if the header should be in "dark mode" (transparent bg, white text)
  // This applies to Home page and Service Detail pages when at the top.
  const isTransparentHeaderPage = location.pathname === '/' || location.pathname.startsWith('/service/');
  const isDarkHeader = !scrolled && isTransparentHeaderPage;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Digital Frame', path: '/service/frame' },
    { name: 'Photo / Video', path: '/service/photo-video' },
    { name: 'AI Creative', path: '/service/ai-creative' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-brand-black font-sans">
      {/* Header */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
          scrolled 
            ? 'bg-white/90 backdrop-blur-md border-neutral-200 py-4 text-brand-black' 
            : `bg-transparent border-transparent py-6 ${isDarkHeader ? 'text-white' : 'text-brand-black'}`
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold tracking-tighter z-50 relative">
            DIGIVISI
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-wide">
            {navLinks.slice(1, 5).map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`transition-colors duration-200 ${
                    isDarkHeader 
                        ? 'text-white/80 hover:text-white' 
                        : 'hover:text-brand-red'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
             <Link 
              to="/contact" 
              className={`px-5 py-2 text-sm font-medium transition-colors duration-300 ${
                  isDarkHeader
                    ? 'bg-white text-brand-black hover:bg-brand-red hover:text-white'
                    : 'bg-brand-black text-white hover:bg-brand-red'
              }`}
            >
              CONTACT
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden z-50 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} className="text-brand-black" /> : <Menu size={24} className={isDarkHeader && !isMenuOpen ? 'text-white' : 'text-brand-black'} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden flex flex-col justify-center px-10 text-brand-black`}
      >
        <nav className="flex flex-col space-y-6">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className="text-3xl font-bold hover:text-brand-red transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="mt-12 pt-12 border-t border-gray-100">
            <p className="text-gray-400 text-sm">Based in Seoul, KR.</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow pt-0">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-brand-black text-white py-16 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-bold tracking-tighter mb-4">DIGIVISI</h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Visual Production Studio<br/>
              Digital Frame / Photo & Video / AI
            </p>
          </div>
          
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-6">Services</h3>
            <ul className="space-y-3 text-sm text-neutral-300">
              <li><Link to="/service/frame" className="hover:text-white transition-colors">Digital Frame</Link></li>
              <li><Link to="/service/photo-video" className="hover:text-white transition-colors">Photo / Video</Link></li>
              <li><Link to="/service/ai-creative" className="hover:text-white transition-colors">AI Creative</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-6">Company</h3>
            <ul className="space-y-3 text-sm text-neutral-300">
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
             <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-6">Connect</h3>
             <div className="flex items-center space-x-4 mb-4">
                <a href="#" className="text-sm text-neutral-300 hover:text-white transition-colors">Instagram</a>
                <a href="#" className="text-sm text-neutral-300 hover:text-white transition-colors">Email</a>
             </div>
             <p className="text-xs text-neutral-600 mt-8">
               © 2024 DIGIVISI. All rights reserved.<br/>
               Business Registration: 000-00-00000
             </p>
             <Link to="/admin/login" className="text-[10px] text-neutral-400 hover:text-brand-red mt-4 block transition-colors">
                Admin
             </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
