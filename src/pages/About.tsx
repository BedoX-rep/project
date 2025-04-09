
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About: React.FC = () => {
  const { t, dir } = useLanguage();
  
  return (
    <div className={dir === 'rtl' ? 'font-sans rtl' : 'font-sans'}>
      <Header />
      
      {/* About Hero */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-center">
            {t('nav.about')}
          </h1>
        </div>
      </section>
      
      {/* About Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-2xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 mb-6">
              Founded in 2015, Luxe Optique was born out of a passion for quality eyewear and a desire to make premium frames accessible to everyone. Our founder, a longtime glasses wearer, was frustrated by the lack of stylish, affordable options in the market.
            </p>
            <p className="text-gray-600 mb-6">
              Today, we're proud to offer a curated collection of eyeglasses and sunglasses that combine style, quality, and affordability. Each pair is crafted with attention to detail and a commitment to excellence.
            </p>
            
            <h2 className="font-serif text-2xl font-bold mb-6 mt-12">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              At Luxe Optique, our mission is to help people see better, look better, and feel better. We believe that great eyewear should be accessible to everyone, and we're committed to providing exceptional products at fair prices.
            </p>
            
            <h2 className="font-serif text-2xl font-bold mb-6 mt-12">Quality Commitment</h2>
            <p className="text-gray-600 mb-6">
              We never compromise on quality. Every pair of Luxe Optique glasses is made from premium materials and undergoes rigorous quality testing. We stand behind our products with a satisfaction guarantee and comprehensive warranty.
            </p>
            
            <h2 className="font-serif text-2xl font-bold mb-6 mt-12">Our Team</h2>
            <p className="text-gray-600 mb-6">
              Our team includes experienced opticians, fashion designers, and customer service professionals who are passionate about helping you find the perfect pair of glasses. We're dedicated to providing exceptional service at every step of your journey with us.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
