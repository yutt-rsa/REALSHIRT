import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'id' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations = {
  id: {
    // Header
    'nav.home': 'Home',
    'nav.about': 'Tentang Kami',
    'nav.products': 'Layanan',
    'nav.gallery': 'Galeri',
    'nav.testimonials': 'Testimoni',
    'nav.upload': 'Upload Desain',
    'nav.contact': 'Kontak',
    
    // Common
    'button.next': 'SELANJUTNYA',
    'button.previous': 'SEBELUMNYA',
    'button.back': 'KEMBALI',
    'button.contact': 'HUBUNGI KAMI',
    
    // Index page
    'hero.title': 'CETAK KAOS SATUAN & CUSTOM',
    'hero.order': 'PESAN SEKARANG',
    'hero.services': 'LIHAT LAYANAN',
    'features.quality': 'KUALITAS PREMIUM',
    'features.flexible': 'FLEKSIBEL & SCALABLE',
    'features.trusted': 'TRUSTED SINCE 2017',
    'cta.ready': 'READY TO CREATE?',
    'cta.upload': 'UPLOAD DESAIN SEKARANG',
    
    // About page
    'about.title': 'Tentang RealShirt',
    'about.subtitle': 'Melayani kebutuhan cetak kaos custom berkualitas tinggi sejak 2017.',
    'about.story': 'Cerita RealShirt',
    'about.why': 'Mengapa Memilih RealShirt?',
    
    // Products page
    'products.title': 'Produk & Layanan',
    'products.subtitle': 'Beragam pilihan teknik cetak dan bahan berkualitas untuk mewujudkan kaos impian Anda.',
    'products.techniques': 'Pilihan Teknik Cetak',
    'products.materials': 'Pilihan Bahan Berkualitas',
    'products.process': 'Proses Pemesanan',
    
    // Gallery page
    'gallery.title': 'Galeri Karya',
    'gallery.subtitle': 'Koleksi hasil karya terbaik kami yang telah dipercaya ribuan pelanggan.',
    
    // Contact page
    'contact.title': 'Hubungi Kami',
    'contact.subtitle': 'Tim kami siap membantu mewujudkan ide kreatif Anda menjadi kenyataan.',
    
    // Language
    'language.id': 'Indonesia',
    'language.en': 'English',
  },
  en: {
    // Header
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.products': 'Services',
    'nav.gallery': 'Gallery',
    'nav.testimonials': 'Testimonials',
    'nav.upload': 'Upload Design',
    'nav.contact': 'Contact',
    
    // Common
    'button.next': 'NEXT',
    'button.previous': 'PREVIOUS',
    'button.back': 'BACK',
    'button.contact': 'CONTACT US',
    
    // Index page
    'hero.title': 'CUSTOM T-SHIRT PRINTING',
    'hero.order': 'ORDER NOW',
    'hero.services': 'VIEW SERVICES',
    'features.quality': 'PREMIUM QUALITY',
    'features.flexible': 'FLEXIBLE & SCALABLE',
    'features.trusted': 'TRUSTED SINCE 2017',
    'cta.ready': 'READY TO CREATE?',
    'cta.upload': 'UPLOAD DESIGN NOW',
    
    // About page
    'about.title': 'About RealShirt',
    'about.subtitle': 'Serving custom t-shirt printing needs with high quality since 2017.',
    'about.story': 'RealShirt Story',
    'about.why': 'Why Choose RealShirt?',
    
    // Products page
    'products.title': 'Products & Services',
    'products.subtitle': 'Various printing techniques and quality materials to make your dream t-shirt come true.',
    'products.techniques': 'Printing Technique Options',
    'products.materials': 'Quality Material Options',
    'products.process': 'Ordering Process',
    
    // Gallery page
    'gallery.title': 'Gallery',
    'gallery.subtitle': 'Collection of our best works trusted by thousands of customers.',
    
    // Contact page
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Our team is ready to help turn your creative ideas into reality.',
    
    // Language
    'language.id': 'Indonesia',
    'language.en': 'English',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('id');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['id']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};