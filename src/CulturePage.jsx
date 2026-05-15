import React, { useState, useEffect, useRef } from 'react';
import { Camera, MapPin, X, ArrowRight, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const CulturePage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { id: 1, src: '/culture_1.jpg', title: 'Heritage Hero', category: 'General' },
    { id: 2, src: '/culture_2.jpg', title: 'Ceremonial Arts', category: 'Tradition' },
    { id: 3, src: '/culture_3.jpg', title: 'Sacred Rituals', category: 'Spiritual' },
    { id: 4, src: '/culture_4.jpg', title: 'Ancient Architecture', category: 'History' },
    { id: 5, src: '/culture_5.jpg', title: 'Coastal Faith', category: 'Local' },
    { id: 6, src: '/culture_6.jpg', title: 'Living Legacy', category: 'Culture' },
    { id: 7, src: '/culture_7.jpg', title: 'Artisan Crafts', category: 'Handicraft' },
    { id: 8, src: '/culture_8.jpg', title: 'Market Life', category: 'Daily' },
    { id: 9, src: '/stiltfishing.jpg', title: 'Stilt Fishing', category: 'Signature' },
    { id: 10, src: '/teaculture_1.jpg', title: 'Tea Highlands', category: 'Tea' },
    { id: 11, src: '/teaculture_2.jpg', title: 'Golden Harvest', category: 'Tea' },
    { id: 12, src: '/teaculture_3.jpg', title: 'Morning Mist', category: 'Tea' },
    { id: 13, src: '/teaculture_4.jpg', title: 'Tea Pickers', category: 'Tea' },
    { id: 14, src: '/gangaramaya.jpg', title: 'Temple Heart', category: 'Spiritual' },
    { id: 15, src: '/gangaramaya_2.jpg', title: 'Vesak Radiance', category: 'Spiritual' },
  ];

  const InfiniteRollingSlider = ({ items }) => {
    // Duplicate items for a seamless loop
    const doubledItems = [...items, ...items];
    
    return (
      <div className="relative overflow-hidden py-10 bg-[#0A0A0B]">
        {/* Subtle Gradient Overlays for smooth entry/exit */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#0A0A0B] to-transparent"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#0A0A0B] to-transparent"></div>

        <div 
          className="flex gap-8 w-max animate-marquee"
          style={{ willChange: "transform" }}
        >
          {doubledItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="flex-shrink-0 w-[85vw] md:w-[500px] aspect-[16/10] group relative rounded-[3rem] overflow-hidden cursor-pointer shadow-2xl border border-white/5 bg-[#111112]"
              onClick={() => setSelectedImage(item)}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10 backdrop-blur-[2px]">
                <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700">
                  <p className="text-[#F05442] text-[10px] font-bold tracking-[0.3em] uppercase mb-3">
                    {item.category}
                  </p>
                  <h4 className="font-playfair text-3xl font-bold text-white italic leading-tight">
                    {item.title}
                  </h4>
                  <div className="mt-6 flex items-center gap-3 text-white/70 text-xs font-semibold tracking-widest uppercase">
                    <span className="h-[1px] w-8 bg-[#F05442]"></span>
                    <span>View Artifact</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#0A0A0B] min-h-screen font-sans text-white overflow-x-hidden">
      <Navbar />

      {/* Luxury Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/culture_1.jpg" className="w-full h-full object-cover opacity-70 animate-slow-zoom" alt="Culture BG" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#0A0A0B]"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="space-y-6"
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold tracking-[0.3em] uppercase mb-4">
              The Soul of the Island
            </span>
            <h1 className="font-playfair text-6xl md:text-9xl font-bold leading-tight tracking-tighter italic">
              Living <br />
              <span className="text-[#F05442] not-italic">Culture</span>
            </h1>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50">
          <div className="w-[1px] h-20 bg-gradient-to-b from-transparent to-white"></div>
        </div>
      </section>

      {/* Intro Context */}
      <section className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-end">
            <div className="space-y-8">
              <h2 className="font-playfair text-4xl md:text-6xl font-bold leading-tight">
                A tapestry woven <br />
                <span className="text-gray-500 italic text-3xl md:text-5xl">over three millennia.</span>
              </h2>
              <div className="w-24 h-1 bg-[#F05442]"></div>
            </div>
            <p className="text-xl text-gray-400 font-light leading-relaxed max-w-xl">
              From the rhythmic resonance of Kandyan drums to the silent whispers of ancient temples, 
              Sri Lanka's heritage is an immersive experience that defies definition. It is a world 
              of color, faith, and enduring traditions.
            </p>
          </div>
        </div>
      </section>

      {/* The Infinite Rolling Slider Section */}
      <section className="pb-32 overflow-hidden bg-[#0A0A0B]">
        <div className="px-4 mb-16 flex flex-col md:flex-row justify-between items-start md:items-end max-w-7xl mx-auto gap-4">
          <div className="space-y-3">
            <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-[#F05442]">Infinite Motion</h3>
            <p className="text-5xl md:text-7xl font-playfair italic tracking-tighter">Visual Chronicles</p>
          </div>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] border-l border-[#F05442]/30 pl-6 h-fit py-1">
            Hover to Pause • Click to Expand
          </p>
        </div>

        <InfiniteRollingSlider items={images} />
      </section>

      {/* Lightbox Pop-up */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 backdrop-blur-2xl bg-black/90"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              className="absolute top-8 right-8 text-white p-4 hover:bg-white/10 rounded-full transition-colors"
              whileHover={{ rotate: 90 }}
            >
              <X size={40} />
            </motion.button>

            <motion.div
              layoutId={`image-${selectedImage.id}`}
              className="relative max-w-6xl w-full aspect-video rounded-[3rem] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.src} 
                className="w-full h-full object-cover" 
                alt={selectedImage.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-12">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-[#F05442] font-bold tracking-[0.2em] uppercase text-xs mb-2">
                    {selectedImage.category}
                  </p>
                  <h3 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-4 italic">
                    {selectedImage.title}
                  </h3>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call to Action - UI/UX Refined */}
      <section className="py-48 relative overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img 
            src="/culture_6.jpg" 
            className="w-full h-full object-cover opacity-60 scale-110" 
            alt="CTA BG" 
          />
          {/* Professional Gradient Overlay for Depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p className="font-playfair text-5xl md:text-[100px] font-bold tracking-tighter mb-16 leading-[1.1] italic text-white drop-shadow-2xl">
              "To know Sri Lanka, <br className="hidden md:block" />
              one must first <br className="hidden md:block" />
              feel its heart."
            </p>
            
            <Link to="/about">
              <motion.button 
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px -10px rgba(240, 84, 66, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-16 py-6 bg-[#F05442] text-white rounded-full font-bold tracking-[0.2em] text-xs uppercase overflow-hidden transition-all duration-500"
              >
                <span className="relative z-10">Connect With Us</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <span className="absolute inset-0 z-10 group-hover:text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Connect With Us
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Custom Styles */}
      <style>{`
        @keyframes slow-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s infinite alternate ease-in-out;
        }
        
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 60s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default CulturePage;
