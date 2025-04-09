import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { CheckCircle } from 'lucide-react';

// Hero section image
const heroImage = "/lovable-uploads/beautiful-young-woman-with-glasses.jpg";

// Process step icons
const frameIcon = "/lovable-uploads/5c4c396f-836b-49e7-8833-be31c7cda22e.png";
const lensIcon = "/lovable-uploads/45bb2648-7da7-44ab-bd32-7044f1470203.png";
const prescriptionIcon = "/lovable-uploads/af178ea4-8b63-422a-9dba-cd74c382cd99.png";
const deliveryIcon = "/lovable-uploads/29f9550c-ba8d-45fe-8e22-1ffb62de3f75.png";

// Custom sunglasses image
const customSunglassesImage = "/lovable-uploads/4e0855d7-4ceb-4a1d-b74a-736f6b127820.png";

// Product images
const products = [
  {
    id: '1',
    name: 'Classic Frames',
    price: 95,
    image: '/lovable-uploads/45bb2648-7da7-44ab-bd32-7044f1470203.png',
    category: 'Optical'
  },
  {
    id: '2',
    name: 'Premium Shades',
    price: 120,
    image: '/lovable-uploads/1551cd86-4f1b-4880-afa5-1ac4eaa6aeb0.png',
    category: 'Sunglasses'
  },
  {
    id: '3',
    name: 'Sport Glasses',
    price: 150,
    image: '/lovable-uploads/29f9550c-ba8d-45fe-8e22-1ffb62de3f75.png',
    category: 'Sports'
  }
];

// Brand logos
const brandLogos = [
  {
    name: 'Brand 1',
    logo: 'https://via.placeholder.com/120x60?text=Brand+1'
  },
  {
    name: 'Brand 2',
    logo: 'https://via.placeholder.com/120x60?text=Brand+2'
  },
  {
    name: 'Brand 3',
    logo: 'https://via.placeholder.com/120x60?text=Brand+3'
  },
  {
    name: 'Brand 4',
    logo: 'https://via.placeholder.com/120x60?text=Brand+4'
  }
];

const Index: React.FC = () => {
  const { t, dir } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <div className={dir === 'rtl' ? 'font-sans rtl' : 'font-sans'}>
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Person wearing glasses" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="luxury-container relative z-10 text-white pt-24">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.2em] mb-4 text-white/80">
              {t('hero.subtitle')}
            </p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-lg mb-8 text-white/80">
              {t('hero.description')}
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="btn-primary bg-white text-black hover:bg-white/90">
                {t('hero.cta.shop')}
              </button>
              <button className="btn-outline border-white text-white hover:bg-white hover:text-black">
                {t('hero.cta.learn')}
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* How to Pick Section */}
      <section className="py-24 bg-gray-50">
        <div className="luxury-container">
          <div className="text-center mb-16">
            <p className="section-subtitle">
              {t('pick.subtitle')}
            </p>
            <h2 className="section-title">
              {t('pick.title')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Step 1 */}
            <div className="text-center group">
              <div className="w-32 h-32 flex items-center justify-center bg-white rounded-full mx-auto mb-8 shadow-lg transition-transform duration-300 group-hover:scale-110">
                <img src={frameIcon} alt="Eyeglass frames" className="w-20 h-20 object-contain" />
              </div>
              <h3 className="font-serif text-xl mb-3">{t('pick.step1.title')}</h3>
              <p className="text-gray-600">{t('pick.step1.desc')}</p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center group">
              <div className="w-32 h-32 flex items-center justify-center bg-white rounded-full mx-auto mb-8 shadow-lg transition-transform duration-300 group-hover:scale-110">
                <img src={lensIcon} alt="Eyeglass lenses" className="w-20 h-20 object-contain" />
              </div>
              <h3 className="font-serif text-xl mb-3">{t('pick.step2.title')}</h3>
              <p className="text-gray-600">{t('pick.step2.desc')}</p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center group">
              <div className="w-32 h-32 flex items-center justify-center bg-white rounded-full mx-auto mb-8 shadow-lg transition-transform duration-300 group-hover:scale-110">
                <img src={prescriptionIcon} alt="Prescription" className="w-20 h-20 object-contain" />
              </div>
              <h3 className="font-serif text-xl mb-3">{t('pick.step3.title')}</h3>
              <p className="text-gray-600">{t('pick.step3.desc')}</p>
            </div>
            
            {/* Step 4 */}
            <div className="text-center group">
              <div className="w-32 h-32 flex items-center justify-center bg-white rounded-full mx-auto mb-8 shadow-lg transition-transform duration-300 group-hover:scale-110">
                <img src={deliveryIcon} alt="Delivery" className="w-20 h-20 object-contain" />
              </div>
              <h3 className="font-serif text-xl mb-3">{t('pick.step4.title')}</h3>
              <p className="text-gray-600">{t('pick.step4.desc')}</p>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <button className="btn-primary">
              {t('pick.button')}
            </button>
          </div>
        </div>
      </section>
      
      {/* Custom Sunglasses Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="luxury-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className={`${dir === 'rtl' ? 'order-2' : 'order-1'} max-w-xl`}>
              <p className="section-subtitle">
                {t('custom.subtitle')}
              </p>
              <h2 className="section-title">
                {t('custom.title')}
              </h2>
              <p className="text-gray-600 mb-12 text-lg">
                {t('custom.desc')}
              </p>
              
              {/* Color Options */}
              <div className="mb-12">
                <div className="flex flex-wrap gap-6">
                  <button className="w-12 h-12 rounded-full bg-eyewear-gold border-2 border-white shadow-lg hover:scale-110 transition-transform"></button>
                  <button className="w-12 h-12 rounded-full bg-eyewear-silver border-2 border-white shadow-lg hover:scale-110 transition-transform"></button>
                  <button className="w-12 h-12 rounded-full bg-eyewear-bronze border-2 border-white shadow-lg hover:scale-110 transition-transform"></button>
                  <button className="w-12 h-12 rounded-full bg-eyewear-pearl border-2 border-white shadow-lg hover:scale-110 transition-transform"></button>
                  <button className="w-12 h-12 rounded-full bg-eyewear-copper border-2 border-white shadow-lg hover:scale-110 transition-transform"></button>
                  <button className="w-12 h-12 rounded-full bg-eyewear-platinum border-2 border-white shadow-lg hover:scale-110 transition-transform"></button>
                </div>
              </div>
              
              <button className="btn-primary">
                {t('custom.button')}
              </button>
            </div>
            <div className={`${dir === 'rtl' ? 'order-1' : 'order-2'} relative`}>
              <div className="relative w-[140%]">
                <img 
                  src={customSunglassesImage} 
                  alt="Custom designed sunglasses" 
                  className="w-full rounded-lg shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Collection */}
      <section className="py-24">
        <div className="luxury-container">
          <div className="text-center mb-16">
            <p className="section-subtitle">
              {t('collection.subtitle')}
            </p>
            <h2 className="section-title">
              {t('collection.title')}
            </h2>
            
            {/* Collection Filters */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <button 
                className={`px-6 py-2 text-sm rounded-full border-2 transition-colors ${activeFilter === 'all' ? 'bg-black text-white border-black' : 'border-gray-300 text-gray-600 hover:border-black'}`}
                onClick={() => setActiveFilter('all')}
              >
                {t('collection.all')}
              </button>
              <button 
                className={`px-6 py-2 text-sm rounded-full border-2 transition-colors ${activeFilter === 'optical' ? 'bg-black text-white border-black' : 'border-gray-300 text-gray-600 hover:border-black'}`}
                onClick={() => setActiveFilter('optical')}
              >
                {t('collection.optical')}
              </button>
              <button 
                className={`px-6 py-2 text-sm rounded-full border-2 transition-colors ${activeFilter === 'sun' ? 'bg-black text-white border-black' : 'border-gray-300 text-gray-600 hover:border-black'}`}
                onClick={() => setActiveFilter('sun')}
              >
                {t('collection.sun')}
              </button>
              <button 
                className={`px-6 py-2 text-sm rounded-full border-2 transition-colors ${activeFilter === 'kids' ? 'bg-black text-white border-black' : 'border-gray-300 text-gray-600 hover:border-black'}`}
                onClick={() => setActiveFilter('kids')}
              >
                {t('collection.kids')}
              </button>
              <button 
                className={`px-6 py-2 text-sm rounded-full border-2 transition-colors ${activeFilter === 'sports' ? 'bg-black text-white border-black' : 'border-gray-300 text-gray-600 hover:border-black'}`}
                onClick={() => setActiveFilter('sports')}
              >
                {t('collection.sports')}
              </button>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map(product => (
              <ProductCard 
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                category={product.category}
              />
            ))}
          </div>
          
          {/* View More Button */}
          <div className="text-center mt-16">
            <button className="btn-outline">
              View More
            </button>
          </div>
        </div>
      </section>
      
      {/* Brand Partners */}
      <section className="py-24 bg-gray-50">
        <div className="luxury-container">
          <div className="text-center mb-16">
            <p className="section-subtitle">
              {t('partners.subtitle')}
            </p>
            <h2 className="section-title">
              {t('partners.title')}
            </h2>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24">
            {brandLogos.map((brand, index) => (
              <div key={index} className="w-32 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Client Reviews */}
      <section className="py-24">
        <div className="luxury-container">
          <h2 className="section-title text-center">
            {t('reviews.title')}
          </h2>
          
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl p-12 mt-16">
            <div className="text-center">
              <p className="text-xl text-gray-600 italic mb-8 font-serif">
                "{t('reviews.content')}"
              </p>
              <div className="flex items-center justify-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-gray-100">
                  <img 
                    src="https://randomuser.me/api/portraits/women/44.jpg" 
                    alt="Sarah Kaufman" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="font-serif text-lg">{t('reviews.name')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;