
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define language type
type Language = 'en' | 'fr' | 'ar';

// Define translations interface
interface Translations {
  [key: string]: {
    en: string;
    fr: string;
    ar: string;
  };
}

// Define context type
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Translations;
  t: (key: string) => string;
  dir: string;
}

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations: Translations = {
  // Navigation
  'nav.home': {
    en: 'Home',
    fr: 'Accueil',
    ar: 'الرئيسية',
  },
  'nav.products': {
    en: 'Products',
    fr: 'Produits',
    ar: 'المنتجات',
  },
  'nav.about': {
    en: 'About Us',
    fr: 'À propos',
    ar: 'من نحن',
  },
  'nav.contact': {
    en: 'Contact',
    fr: 'Contact',
    ar: 'اتصل بنا',
  },
  
  // Hero Section
  'hero.subtitle': {
    en: 'PREMIUM FRAMES FOR EVERY FACE',
    fr: 'MONTURES PREMIUM POUR CHAQUE VISAGE',
    ar: 'إطارات متميزة لكل وجه',
  },
  'hero.title': {
    en: 'Premium Eyewear For Your Digital Lifestyle',
    fr: 'Lunettes Premium Pour Votre Style De Vie Numérique',
    ar: 'نظارات متميزة لأسلوب حياتك الرقمي',
  },
  'hero.description': {
    en: 'Enhance your vision with our premium frames and blue light filtering technology.',
    fr: 'Améliorez votre vision avec nos montures premium et notre technologie de filtrage de la lumière bleue.',
    ar: 'عزز رؤيتك مع إطاراتنا المتميزة وتقنية تصفية الضوء الأزرق.',
  },
  'hero.cta.shop': {
    en: 'Shop Now',
    fr: 'Acheter',
    ar: 'تسوق الآن',
  },
  'hero.cta.learn': {
    en: 'Learn More',
    fr: 'En Savoir Plus',
    ar: 'اكتشف المزيد',
  },
  
  // Features
  'features.title': {
    en: 'OUR LENSES FEATURE',
    fr: 'NOS VERRES INCLUENT',
    ar: 'ميزات عدساتنا',
  },
  'features.blue': {
    en: 'Blue Light Protection',
    fr: 'Protection Lumière Bleue',
    ar: 'حماية من الضوء الأزرق',
  },
  'features.uv': {
    en: 'UV Protection',
    fr: 'Protection UV',
    ar: 'حماية من الأشعة فوق البنفسجية',
  },
  'features.scratch': {
    en: 'Scratch Resistance',
    fr: 'Résistance aux Rayures',
    ar: 'مقاومة للخدوش',
  },
  'features.anti': {
    en: 'Anti-Reflective Coating',
    fr: 'Revêtement Anti-Reflet',
    ar: 'طلاء مضاد للانعكاس',
  },
  
  // How To Pick
  'pick.subtitle': {
    en: 'SIMPLE STEPS TO YOUR PERFECT PAIR',
    fr: 'ÉTAPES SIMPLES VERS VOTRE PAIRE PARFAITE',
    ar: 'خطوات بسيطة لزوجك المثالي',
  },
  'pick.title': {
    en: 'How to Pick Your Pair',
    fr: 'Comment Choisir Votre Paire',
    ar: 'كيفية اختيار زوجك',
  },
  'pick.step1.title': {
    en: 'Choose Your Frame Style',
    fr: 'Choisissez Votre Style de Monture',
    ar: 'اختر نمط إطارك',
  },
  'pick.step1.desc': {
    en: 'Select your favorite style from dozens of options.',
    fr: 'Sélectionnez votre style préféré parmi des dizaines d\'options.',
    ar: 'اختر أسلوبك المفضل من بين عشرات الخيارات.',
  },
  'pick.step2.title': {
    en: 'Select Your Lens Type',
    fr: 'Sélectionnez Votre Type de Verre',
    ar: 'حدد نوع العدسة الخاص بك',
  },
  'pick.step2.desc': {
    en: 'Choose from clear, blue light filtering, or sun.',
    fr: 'Choisissez parmi clair, filtrant la lumière bleue ou soleil.',
    ar: 'اختر من بين عدسات شفافة، تصفية الضوء الأزرق أو شمسية.',
  },
  'pick.step3.title': {
    en: 'Upload Your Prescription',
    fr: 'Téléchargez Votre Ordonnance',
    ar: 'قم بتحميل الوصفة الطبية الخاصة بك',
  },
  'pick.step3.desc': {
    en: 'Send us your prescription for precision lenses.',
    fr: 'Envoyez-nous votre ordonnance pour des verres de précision.',
    ar: 'أرسل لنا وصفتك الطبية للحصول على عدسات دقيقة.',
  },
  'pick.step4.title': {
    en: 'Receive Your Glasses',
    fr: 'Recevez Vos Lunettes',
    ar: 'استلم نظاراتك',
  },
  'pick.step4.desc': {
    en: 'Delivery to your door with satisfaction guaranteed.',
    fr: 'Livraison à votre porte avec satisfaction garantie.',
    ar: 'التسليم إلى باب منزلك مع ضمان الرضا.',
  },
  'pick.button': {
    en: 'FIND YOUR PERFECT PAIR',
    fr: 'TROUVEZ VOTRE PAIRE PARFAITE',
    ar: 'ابحث عن زوجك المثالي',
  },
  
  // Featured Collection
  'collection.subtitle': {
    en: 'EXPLORE OUR EYEWEAR CATALOG',
    fr: 'EXPLOREZ NOTRE CATALOGUE DE LUNETTES',
    ar: 'استكشف كتالوج النظارات لدينا',
  },
  'collection.title': {
    en: 'Featured Collection',
    fr: 'Collection en Vedette',
    ar: 'المجموعة المميزة',
  },
  'collection.all': {
    en: 'All',
    fr: 'Tous',
    ar: 'الكل',
  },
  'collection.optical': {
    en: 'Optical',
    fr: 'Optique',
    ar: 'بصرية',
  },
  'collection.sun': {
    en: 'Sunglasses',
    fr: 'Solaires',
    ar: 'نظارات شمسية',
  },
  'collection.kids': {
    en: 'Kids',
    fr: 'Enfants',
    ar: 'أطفال',
  },
  'collection.sports': {
    en: 'Sports',
    fr: 'Sports',
    ar: 'رياضة',
  },
  
  // Products
  'product.from': {
    en: 'From',
    fr: 'À partir de',
    ar: 'من',
  },
  
  // Custom Sunglasses
  'custom.subtitle': {
    en: 'EXPRESS YOUR STYLE WITH OUR CUSTOMIZATION OPTIONS',
    fr: 'EXPRIMEZ VOTRE STYLE AVEC NOS OPTIONS DE PERSONNALISATION',
    ar: 'عبر عن أسلوبك مع خيارات التخصيص لدينا',
  },
  'custom.title': {
    en: 'Custom Designed Sunglasses',
    fr: 'Lunettes de Soleil Personnalisées',
    ar: 'نظارات شمسية مصممة خصيصًا',
  },
  'custom.desc': {
    en: 'Choose from a wide array of styles and customize your perfect pair of sunglasses with your choice of colors and lens options.',
    fr: 'Choisissez parmi une large gamme de styles et personnalisez votre paire parfaite de lunettes de soleil avec votre choix de couleurs et d\'options de lentilles.',
    ar: 'اختر من بين مجموعة واسعة من الأساليب وقم بتخصيص زوج نظارات شمسية مثالي مع اختيارك للألوان وخيارات العدسات.',
  },
  'custom.button': {
    en: 'CREATE YOUR CUSTOM PAIR',
    fr: 'CRÉEZ VOTRE PAIRE PERSONNALISÉE',
    ar: 'أنشئ زوجك المخصص',
  },
  
  // Partners
  'partners.subtitle': {
    en: 'WE WORK WITH THE BEST IN THE INDUSTRY',
    fr: 'NOUS TRAVAILLONS AVEC LES MEILLEURS DE L\'INDUSTRIE',
    ar: 'نحن نعمل مع الأفضل في الصناعة',
  },
  'partners.title': {
    en: 'Our Brand Partners',
    fr: 'Nos Partenaires de Marque',
    ar: 'شركاء علامتنا التجارية',
  },
  
  // Reviews
  'reviews.title': {
    en: 'Client Reviews',
    fr: 'Avis des Clients',
    ar: 'آراء العملاء',
  },
  'reviews.content': {
    en: 'I absolutely love my new glasses! The blue light filtering has made a huge difference in my eye fatigue during long work days. The frame quality is excellent and the style is exactly what I wanted.',
    fr: 'J\'adore mes nouvelles lunettes ! Le filtrage de la lumière bleue a fait une énorme différence dans ma fatigue oculaire pendant les longues journées de travail. La qualité de la monture est excellente et le style est exactement ce que je voulais.',
    ar: 'أنا أحب نظاراتي الجديدة تمامًا! أحدث تصفية الضوء الأزرق فرقًا كبيرًا في إجهاد عيني خلال أيام العمل الطويلة. جودة الإطار ممتازة والأسلوب هو بالضبط ما كنت أريده.',
  },
  'reviews.name': {
    en: 'Sarah Kaufman',
    fr: 'Sarah Kaufman',
    ar: 'سارة كوفمان',
  },
  
  // Newsletter
  'newsletter.title': {
    en: 'Join Our Newsletter',
    fr: 'Rejoignez Notre Newsletter',
    ar: 'انضم إلى نشرتنا الإخبارية',
  },
  'newsletter.placeholder': {
    en: 'Your Email Address',
    fr: 'Votre Adresse Email',
    ar: 'عنوان بريدك الإلكتروني',
  },
  'newsletter.button': {
    en: 'SUBSCRIBE',
    fr: 'S\'ABONNER',
    ar: 'اشترك',
  },
  
  // Footer
  'footer.shop': {
    en: 'Shop',
    fr: 'Boutique',
    ar: 'متجر',
  },
  'footer.eyeglasses': {
    en: 'Eyeglasses',
    fr: 'Lunettes de vue',
    ar: 'نظارات طبية',
  },
  'footer.sunglasses': {
    en: 'Sunglasses',
    fr: 'Lunettes de soleil',
    ar: 'نظارات شمسية',
  },
  'footer.bluelight': {
    en: 'Blue Light',
    fr: 'Lumière Bleue',
    ar: 'ضوء أزرق',
  },
  'footer.help': {
    en: 'Help',
    fr: 'Aide',
    ar: 'مساعدة',
  },
  'footer.faq': {
    en: 'FAQ',
    fr: 'FAQ',
    ar: 'الأسئلة الشائعة',
  },
  'footer.shipping': {
    en: 'Shipping',
    fr: 'Livraison',
    ar: 'الشحن',
  },
  'footer.returns': {
    en: 'Returns',
    fr: 'Retours',
    ar: 'المرتجعات',
  },
  'footer.about': {
    en: 'About',
    fr: 'À propos',
    ar: 'عن الشركة',
  },
  'footer.story': {
    en: 'Our Story',
    fr: 'Notre Histoire',
    ar: 'قصتنا',
  },
  'footer.press': {
    en: 'Press',
    fr: 'Presse',
    ar: 'صحافة',
  },
  'footer.careers': {
    en: 'Careers',
    fr: 'Carrières',
    ar: 'وظائف',
  },
  'footer.copyright': {
    en: '© 2025 Luxe Optique. All rights reserved.',
    fr: '© 2025 Luxe Optique. Tous droits réservés.',
    ar: '© 2025 لوكس أوبتيك. جميع الحقوق محفوظة.',
  },
};

// Provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [dir, setDir] = useState<string>('ltr');

  // Update document direction when language changes
  useEffect(() => {
    if (language === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      setDir('rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      setDir('ltr');
    }
    
    // Update the html lang attribute
    document.documentElement.lang = language;
    
    // Store the selected language in local storage
    localStorage.setItem('language', language);
  }, [language]);
  
  // Check for saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'fr', 'ar'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Translation function
  const t = (key: string) => {
    if (!translations[key]) {
      console.warn(`Missing translation key: ${key}`);
      return key;
    }
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
