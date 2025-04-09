
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { Sliders } from 'lucide-react';

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
  },
  {
    id: '4',
    name: 'Fashion Frames',
    price: 110,
    image: '/lovable-uploads/45bb2648-7da7-44ab-bd32-7044f1470203.png',
    category: 'Optical'
  },
  {
    id: '5',
    name: 'Beach Shades',
    price: 135,
    image: '/lovable-uploads/1551cd86-4f1b-4880-afa5-1ac4eaa6aeb0.png',
    category: 'Sunglasses'
  },
  {
    id: '6',
    name: 'Kids Frames',
    price: 85,
    image: '/lovable-uploads/29f9550c-ba8d-45fe-8e22-1ffb62de3f75.png',
    category: 'Kids'
  }
];

const Products: React.FC = () => {
  const { t, dir } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  const filteredProducts = activeFilter === 'all' 
    ? products 
    : products.filter(product => product.category.toLowerCase() === activeFilter);
  
  return (
    <div className={dir === 'rtl' ? 'font-sans rtl' : 'font-sans'}>
      <Header />
      
      {/* Products Hero */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-center">
            {t('collection.title')}
          </h1>
        </div>
      </section>
      
      {/* Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between mb-8">
            {/* Collection Filters */}
            <div className="flex flex-wrap gap-4 mb-4 md:mb-0">
              <button 
                className={`px-4 py-1 text-sm rounded-full border transition-colors ${activeFilter === 'all' ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 text-gray-600 hover:border-blue-600'}`}
                onClick={() => setActiveFilter('all')}
              >
                {t('collection.all')}
              </button>
              <button 
                className={`px-4 py-1 text-sm rounded-full border transition-colors ${activeFilter === 'optical' ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 text-gray-600 hover:border-blue-600'}`}
                onClick={() => setActiveFilter('optical')}
              >
                {t('collection.optical')}
              </button>
              <button 
                className={`px-4 py-1 text-sm rounded-full border transition-colors ${activeFilter === 'sunglasses' ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 text-gray-600 hover:border-blue-600'}`}
                onClick={() => setActiveFilter('sunglasses')}
              >
                {t('collection.sun')}
              </button>
              <button 
                className={`px-4 py-1 text-sm rounded-full border transition-colors ${activeFilter === 'kids' ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 text-gray-600 hover:border-blue-600'}`}
                onClick={() => setActiveFilter('kids')}
              >
                {t('collection.kids')}
              </button>
            </div>
            
            {/* Additional Filters Toggle */}
            <button 
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Sliders className="w-4 h-4" />
              <span className="text-sm font-medium">Filters</span>
            </button>
          </div>
          
          {/* Advanced Filters */}
          {showFilters && (
            <div className="bg-gray-50 p-4 rounded-lg mb-8 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Price Range */}
                <div>
                  <h3 className="font-medium mb-2">Price Range</h3>
                  <div className="flex items-center gap-4">
                    <input 
                      type="range" 
                      min="0" 
                      max="300" 
                      className="w-full accent-blue-600" 
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>$0</span>
                    <span>$300+</span>
                  </div>
                </div>
                
                {/* Frame Shape */}
                <div>
                  <h3 className="font-medium mb-2">Frame Shape</h3>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-3 py-1 text-xs border border-gray-200 rounded-full hover:border-blue-600">Rectangle</button>
                    <button className="px-3 py-1 text-xs border border-gray-200 rounded-full hover:border-blue-600">Square</button>
                    <button className="px-3 py-1 text-xs border border-gray-200 rounded-full hover:border-blue-600">Round</button>
                    <button className="px-3 py-1 text-xs border border-gray-200 rounded-full hover:border-blue-600">Cat Eye</button>
                    <button className="px-3 py-1 text-xs border border-gray-200 rounded-full hover:border-blue-600">Aviator</button>
                  </div>
                </div>
                
                {/* Frame Material */}
                <div>
                  <h3 className="font-medium mb-2">Frame Material</h3>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-3 py-1 text-xs border border-gray-200 rounded-full hover:border-blue-600">Acetate</button>
                    <button className="px-3 py-1 text-xs border border-gray-200 rounded-full hover:border-blue-600">Metal</button>
                    <button className="px-3 py-1 text-xs border border-gray-200 rounded-full hover:border-blue-600">Titanium</button>
                    <button className="px-3 py-1 text-xs border border-gray-200 rounded-full hover:border-blue-600">Mixed</button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
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
          
          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <div className="flex space-x-1">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">1</button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">2</button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">3</button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">...</button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Products;
