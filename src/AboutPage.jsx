import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, X, Phone, Mail, MapPin
} from 'lucide-react';

const FadeInSection = ({ children }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = React.useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setVisible(true);
      });
    });
    if (domRef.current) observer.observe(domRef.current);
    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  );
};

export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Interactive Map", path: "/map" },
    { name: "Experiences", path: "/experiences" },
    { name: "About", path: "/about" }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-inter text-[#33353D] overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="fixed w-full z-50 bg-white shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/" className="flex-shrink-0 flex items-center">
            <img src="/tripin_logo.png" alt="Trippin Logo" className="h-16 w-auto mix-blend-multiply" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex space-x-10 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="text-[13px] font-bold tracking-[0.15em] uppercase text-[#1A1C1E] hover:text-[#F05442] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav Drawer */}
        <div 
          className={`lg:hidden absolute top-full left-0 w-full bg-[#2A2B31] transition-all duration-300 origin-top overflow-hidden ${
            mobileMenuOpen ? 'max-h-[300px] py-4' : 'max-h-0 py-0'
          }`}
        >
          <div className="flex flex-col items-center space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#FFFFFF] text-lg font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-40 pb-20 bg-[#1A1C1E] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h1 className="font-playfair text-4xl md:text-7xl font-bold">About Us</h1>
          <div className="h-1 w-24 bg-[#F05442] mx-auto"></div>
          <p className="max-w-2xl mx-auto text-lg text-white/70 font-light leading-relaxed">
            Discover the passion and purpose behind Trippin LK. We are more than a travel agency; we are your gateway to the soul of Sri Lanka.
          </p>
        </div>
      </section>

      {/* HOW WE OPERATE */}
      <section className="py-24 bg-[#3D4F37] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 space-y-10">
              <FadeInSection>
                <h2 className="font-playfair text-3xl md:text-5xl font-bold leading-tight">How we Operate</h2>
                <div className="space-y-6 text-white/80 text-lg font-light leading-relaxed">
                  <p>
                    In 2013 we started giving free itineraries to invite visitors to experience this beautiful island we call home.
                  </p>
                  <p>
                    We try to keep things simple, personal and interesting for our guests to maximize their memories.
                  </p>
                  <p>
                    Always prefer to customize an itinerary to accommodate your interests. If you have a special request, send us a message, and we will be sure to get back to you soon.
                  </p>
                </div>
                
                <div className="pt-8">
                  <a 
                    href="https://wa.me/94757068068" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-white text-[#3D4F37] px-8 py-4 rounded-lg font-bold hover:bg-[#F05442] hover:text-white transition-all shadow-xl"
                  >
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-6 h-6" alt="WhatsApp" />
                    Message us on WhatsApp
                  </a>
                </div>

                <div className="pt-12 space-y-4">
                  <h3 className="text-2xl font-playfair font-bold">Tripinlk Pvt Ltd</h3>
                  <div className="space-y-2 text-white/70 text-sm">
                    <div className="flex items-center gap-3"><MapPin size={18} /> 3-D/62 Jayawadanagama, Wickramasinghepura, Battaramulla</div>
                    <div className="flex items-center gap-3"><Phone size={18} /> +94-75-7-068-068</div>
                    <div className="flex items-center gap-3"><Mail size={18} /> connect@tripinlk.com</div>
                  </div>
                </div>
              </FadeInSection>
            </div>

            {/* Right Map Visual */}
            <div className="w-full lg:w-1/2">
              <FadeInSection>
                <div className="rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/10 aspect-square lg:aspect-auto lg:h-[600px]">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9168252277514!2d79.9197!3d6.9042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTQnMTUuMSJOIDc5wrA1NScxMC45IkU!5e0!3m2!1sen!2slk!4v1650000000000!5m2!1sen!2slk" 
                    className="w-full h-full grayscale contrast-125 invert opacity-80"
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy"
                  ></iframe>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#111111] pt-24 pb-12 text-white border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <img src="/tripin_logo.png" alt="Logo" className="h-12 mx-auto grayscale invert opacity-50" />
          <div className="flex justify-center gap-8 text-white/40 text-sm uppercase tracking-widest">
            {navLinks.map(link => <Link key={link.name} to={link.path}>{link.name}</Link>)}
          </div>
          <p className="text-white/20 text-xs tracking-[0.3em]">&copy; 2026 TRIPPIN LK. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}
