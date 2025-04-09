import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const { t, dir } = useLanguage();
  
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="luxury-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <Link to="/" className="font-serif text-2xl font-medium mb-6 inline-block">
              Luxe Optique
            </Link>
            <p className="text-gray-400 mb-6 text-sm">
              {t('footer.copyright')}
            </p>
            <div className="flex space-x-6 rtl:space-x-reverse">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm uppercase tracking-wider mb-6">{t('footer.shop')}</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('footer.eyeglasses')}
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('footer.sunglasses')}
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('footer.bluelight')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm uppercase tracking-wider mb-6">{t('footer.help')}</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('footer.faq')}
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('footer.shipping')}
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('footer.returns')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm uppercase tracking-wider mb-6">{t('footer.about')}</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('footer.story')}
                </Link>
              </li>
              <li>
                <Link to="/press" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('footer.press')}
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('footer.careers')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="border-t border-gray-800 pt-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-serif mb-4">{t('newsletter.title')}</h3>
            <form className="flex">
              <input 
                type="email"
                placeholder={t('newsletter.placeholder')}
                className="flex-1 min-w-0 px-4 py-3 bg-gray-900 border border-gray-800 focus:border-white transition-colors outline-none text-sm"
                required
              />
              <button 
                type="submit"
                className="bg-white text-black px-6 py-3 font-medium text-sm uppercase tracking-wider hover:bg-gray-100 transition-colors"
              >
                {t('newsletter.button')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;