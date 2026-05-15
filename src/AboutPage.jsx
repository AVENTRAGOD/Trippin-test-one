import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { MapPin, Phone, Mail, ArrowRight, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Interactive Map", path: "/map" },
    { name: "Experiences", path: "/experiences" },
    { name: "About", path: "/about" }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0B] font-inter text-[#FAFAFA] overflow-x-hidden selection:bg-[#F05442] selection:text-white">
      <Navbar />

      {/* HERO SECTION */}
      <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y, opacity }}
          className="absolute inset-0 z-0"
        >
          {/* A high-end atmospheric background. Since we don't have a specific hero image, we use a sleek dark gradient with noise */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a1c1e] via-[#0A0A0B] to-[#0A0A0B]"></div>
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <Compass className="w-12 h-12 text-[#F05442] mb-8 mx-auto opacity-80" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="font-playfair text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-6"
          >
            Our Story.
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "80px" }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="h-1 bg-[#F05442] mx-auto mb-8"
          />
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="text-xl md:text-2xl text-white/60 font-light max-w-2xl leading-relaxed"
          >
            More than a travel agency. We are your gateway to the soul of Sri Lanka.
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-white/40">Scroll to explore</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-[1px] h-12 bg-gradient-to-b from-[#F05442] to-transparent"
          />
        </motion.div>
      </section>

      {/* NARRATIVE SECTION */}
      <section className="py-32 px-4 relative z-10 bg-[#0A0A0B]">
        <div className="max-w-4xl mx-auto space-y-32">
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white/90">Since 2013.</h2>
              <p className="mt-6 text-lg text-white/60 font-light leading-relaxed">
                We started by giving free itineraries to invite visitors to experience this beautiful island we call home. It was born out of pure passion to showcase Sri Lanka's hidden gems.
              </p>
            </FadeIn>
            <FadeIn delay={0.2} className="relative h-[400px] rounded-3xl overflow-hidden group">
              <div className="absolute inset-0 bg-[#F05442]/10 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-700"></div>
              <img src="/culture_2.jpg" alt="Sri Lankan Culture" className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn className="order-2 md:order-1 relative h-[400px] rounded-3xl overflow-hidden group">
               <div className="absolute inset-0 bg-[#F05442]/10 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-700"></div>
              <img src="/rafting.jpg" alt="Adventure" className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
            </FadeIn>
            <FadeIn delay={0.2} className="order-1 md:order-2">
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white/90">Personalized for you.</h2>
              <p className="mt-6 text-lg text-white/60 font-light leading-relaxed">
                We try to keep things simple, personal, and interesting. We maximize your memories by customizing itineraries to accommodate your specific interests.
              </p>
            </FadeIn>
          </div>

        </div>
      </section>

      {/* BENTO GRID OPERATIONS */}
      <section className="py-32 px-4 bg-[#111111] relative border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="font-playfair text-4xl md:text-6xl font-bold mb-4">Connect With Us</h2>
              <p className="text-white/50 text-lg">Let's craft your perfect Sri Lankan journey.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
            
            {/* WhatsApp Card */}
            <FadeIn delay={0.1} className="md:col-span-2 relative group overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1c1c1e] to-[#0A0A0B] border border-white/10 hover:border-[#F05442]/50 transition-colors p-10 flex flex-col justify-end">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700 pointer-events-none">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-48 h-48 filter grayscale" alt="" />
              </div>
              <div className="relative z-10">
                <h3 className="text-3xl font-playfair font-bold mb-2 text-white">Have a special request?</h3>
                <p className="text-white/60 mb-6 max-w-md">Send us a message, and we will be sure to get back to you with a custom itinerary.</p>
                <a 
                  href="https://wa.me/94757068068" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-[#F05442] hover:text-white transition-colors"
                >
                  Message on WhatsApp <ArrowRight size={18} />
                </a>
              </div>
            </FadeIn>

            {/* HQ Card */}
            <FadeIn delay={0.2} className="relative group overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1c1c1e] to-[#0A0A0B] border border-white/10 p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-6 font-playfair text-[#F05442]">Tripinlk Pvt Ltd</h3>
                <div className="space-y-4 text-sm text-white/60">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-white/40 shrink-0 mt-0.5" /> 
                    <span>3-D/62 Jayawadanagama,<br/>Wickramasinghepura,<br/>Battaramulla</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-white/40" /> 
                    <span>+94-75-7-068-068</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-white/40" /> 
                    <span>connect@tripinlk.com</span>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Map Card */}
            <FadeIn delay={0.3} className="md:col-span-3 h-[400px] relative overflow-hidden rounded-[2rem] border border-white/10 group">
              <div className="absolute inset-0 bg-black/40 pointer-events-none z-10 group-hover:bg-transparent transition-colors duration-500"></div>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9168252277514!2d79.9197!3d6.9042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTQnMTUuMSJOIDc5wrA1NScxMC45IkU!5e0!3m2!1sen!2slk!4v1650000000000!5m2!1sen!2slk" 
                className="w-full h-full grayscale contrast-125 invert-[.8]"
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
              ></iframe>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0A0A0B] pt-24 pb-12 text-white border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <img src="/tripin_logo_dark.jpg" alt="Logo" className="h-16 mx-auto opacity-50 hover:opacity-100 transition-opacity" />
          
          <div className="flex justify-center gap-6">
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
              <InstagramIcon />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
              <FacebookIcon />
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-white/40 text-sm uppercase tracking-widest">
            {navLinks.map(link => <Link key={link.name} to={link.path} className="hover:text-white transition-colors">{link.name}</Link>)}
          </div>
          <p className="text-white/20 text-xs tracking-[0.3em] pt-8">&copy; {new Date().getFullYear()} TRIPPIN LK. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}
