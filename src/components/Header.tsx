import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, Search, User, Globe } from 'lucide-react';

const Header: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="luxury-container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-serif text-2xl font-medium">
            Luxe Optique
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">
              {t('nav.home')}
            </Link>
            <Link to="/products" className="nav-link">
              {t('nav.products')}
            </Link>
            <Link to="/about" className="nav-link">
              {t('nav.about')}
            </Link>
            <Link to="/contact" className="nav-link">
              {t('nav.contact')}
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-6">
            {/* Language Selector */}
            <div className="relative group hidden md:block">
              <button className="flex items-center text-sm uppercase tracking-wider">
                <Globe className="w-4 h-4 mr-1" />
                <span>{language}</span>
              </button>
              <div className="absolute z-10 right-0 mt-2 w-32 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-1">
                  <button 
                    className={`block w-full px-4 py-2 text-sm text-left uppercase tracking-wider hover:bg-gray-50 ${language === 'en' ? 'text-black' : 'text-gray-600'}`} 
                    onClick={() => setLanguage('en')}
                  >
                    English
                  </button>
                  <button 
                    className={`block w-full px-4 py-2 text-sm text-left uppercase tracking-wider hover:bg-gray-50 ${language === 'fr' ? 'text-black' : 'text-gray-600'}`}
                    onClick={() => setLanguage('fr')}
                  >
                    Français
                  </button>
                  <button 
                    className={`block w-full px-4 py-2 text-sm text-left uppercase tracking-wider hover:bg-gray-50 ${language === 'ar' ? 'text-black' : 'text-gray-600'}`}
                    onClick={() => setLanguage('ar')}
                  >
                    العربية
                  </button>
                </div>
              </div>
            </div>
            
            <button className="hidden md:block">
              <Search className="w-5 h-5" />
            </button>
            <button className="hidden md:block">
              <User className="w-5 h-5" />
            </button>
            <button className="relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-xs flex items-center justify-center rounded-full">0</span>
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-white z-50 transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="h-full flex flex-col">
            <div className="flex justify-between items-center p-6 border-b">
              <span className="font-serif text-2xl">Menu</span>
              <button onClick={toggleMobileMenu}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex-1 p-6">
              <div className="space-y-6">
                <Link to="/" className="block text-2xl font-serif" onClick={toggleMobileMenu}>
                  {t('nav.home')}
                </Link>
                <Link to="/products" className="block text-2xl font-serif" onClick={toggleMobileMenu}>
                  {t('nav.products')}
                </Link>
                <Link to="/about" className="block text-2xl font-serif" onClick={toggleMobileMenu}>
                  {t('nav.about')}
                </Link>
                <Link to="/contact" className="block text-2xl font-serif" onClick={toggleMobileMenu}>
                  {t('nav.contact')}
                </Link>
              </div>
            </nav>
            <div className="p-6 border-t">
              <div className="flex justify-between items-center">
                <button className="text-sm uppercase tracking-wider" onClick={() => setLanguage('en')}>EN</button>
                <button className="text-sm uppercase tracking-wider" onClick={() => setLanguage('fr')}>FR</button>
                <button className="text-sm uppercase tracking-wider" onClick={() => setLanguage('ar')}>AR</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;