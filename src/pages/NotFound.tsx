
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const NotFound: React.FC = () => {
  const { dir } = useLanguage();
  
  return (
    <div className={dir === 'rtl' ? 'font-sans rtl' : 'font-sans'}>
      <Header />
      
      <section className="min-h-[60vh] flex items-center">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-6xl md:text-8xl font-bold mb-6 text-gray-900">404</h1>
          <h2 className="text-xl md:text-2xl mb-8 text-gray-600">Page Not Found</h2>
          <p className="mb-8 text-gray-600 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link to="/" className="btn-primary">
            Return to Homepage
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default NotFound;
