import React, { useState, useEffect, useRef } from 'react';
import { Camera, MapPin, X, ArrowRight, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import Navbar from './Navbar';

const CulturePage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const sliderRef = useRef(null);
  const loopRef = useRef(null);

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

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Create a smooth horizontal loop
    const totalWidth = slider.scrollWidth / 2;
    
    loopRef.current = gsap.to(slider, {
      x: `-=${totalWidth}`,
      duration: 50,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
      }
    });

    return () => {
      loopRef.current?.kill();
    };
  }, []);

  const handleManualScroll = (direction) => {
    if (!loopRef.current) return;
    
    const currentSpeed = loopRef.current.timeScale();
    const newSpeed = direction === 'left' ? -3 : 3;
    
    gsap.to(loopRef.current, { 
      timeScale: newSpeed, 
      duration: 0.4,
      onComplete: () => {
        gsap.to(loopRef.current, { 
          timeScale: direction === 'left' ? -1 : 1, 
          duration: 1.5,
          ease: "power2.inOut"
        });
      }
    });
  };

  const GSAPSlider = ({ items }) => (
    <div className="relative py-20">
      {/* Decorative Lines from Sketch */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/10 mx-4 md:mx-10"></div>
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/10 mx-4 md:mx-10"></div>

      <div className="flex items-center gap-4 px-4 md:px-10">
        {/* Navigation Arrows - Left */}
        <button 
          onClick={() => handleManualScroll('left')}
          className="hidden md:flex flex-shrink-0 w-16 h-64 border border-white/10 items-center justify-center hover:bg-[#F05442] hover:border-[#F05442] transition-all duration-300 rounded-2xl group active:scale-95"
        >
          <ChevronLeft className="text-white group-hover:scale-125 transition-transform" size={32} />
        </button>

        {/* Gallery Container */}
        <div className="overflow-hidden flex-grow py-4 select-none">
          <div 
            ref={sliderRef}
            className="flex flex-nowrap gap-8 will-change-transform w-max"
          >
            {[...items, ...items].map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="gallery-card relative w-[300px] md:w-[550px] aspect-[16/10] flex-shrink-0 group cursor-pointer"
                onClick={() => setSelectedImage(item)}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-[2rem] shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] flex items-center justify-center backdrop-blur-[2px]">
                  <div className="bg-white/10 backdrop-blur-md px-8 py-3 rounded-full border border-white/20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-white text-xs font-bold tracking-[0.3em] uppercase">Explore</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows - Right */}
        <button 
          onClick={() => handleManualScroll('right')}
          className="hidden md:flex flex-shrink-0 w-16 h-64 border border-white/10 items-center justify-center hover:bg-[#F05442] hover:border-[#F05442] transition-all duration-300 rounded-2xl group active:scale-95"
        >
          <ChevronRight className="text-white group-hover:scale-125 transition-transform" size={32} />
        </button>
      </div>
    </div>
  );

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

      {/* The Sliding Master Gallery */}
      <section className="pb-32 overflow-hidden bg-[#0A0A0B]">
        <div className="px-4 mb-12 flex justify-between items-end max-w-7xl mx-auto">
          <div>
            <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-[#F05442] mb-2">Cinematic Gallery</h3>
            <p className="text-3xl font-playfair italic">Visual Chronicles</p>
          </div>
          <p className="text-gray-500 text-sm hidden md:block">Hover to slow down • Click to expand</p>
        </div>

        <div className="space-y-6">
          <GSAPSlider items={images} />
        </div>
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

      {/* Call to Action */}
      <section className="py-40 relative overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img src="/culture_6.jpg" className="w-full h-full object-cover opacity-70" alt="CTA BG" />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <p className="text-6xl md:text-8xl font-playfair font-bold tracking-tighter mb-12 leading-tight italic text-white">
            "To know Sri Lanka, <br />
            one must first <br />
            feel its heart."
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 bg-[#F05442] text-white rounded-full font-bold tracking-widest text-sm uppercase hover:bg-white hover:text-black transition-colors shadow-2xl"
          >
            Connect With Us
          </motion.button>
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
      `}</style>
    </div>
  );
};

export default CulturePage;
