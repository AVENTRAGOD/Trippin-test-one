import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, X, Compass, Mountain, Waves, Wind, MapPin
} from 'lucide-react';
import Navbar from './Navbar';

const adventureActivities = [
  {
    title: "Kite Surfing",
    location: "Kalpitiya",
    desc: "Experience the thrill of kite surfing in the best lagoons and waves of Kalpitiya.",
    img: "/kite_surf.jpg"
  },
  {
    title: "Hiking & Trekking",
    location: "Ella & Knuckles Range",
    desc: "Traverse through misty mountains and lush tea plantations for breathtaking views.",
    img: "/knuk.jpg"
  },
  {
    title: "White Water Rafting",
    location: "Kitulgala",
    desc: "Battle the rapids of the Kelani River in an adrenaline-pumping rafting adventure.",
    img: "/rafting.jpg"
  }
];

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

export default function AdventurePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-inter text-[#1A1C1E] overflow-x-hidden">
      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1502126324834-38f8e02d7160?q=80&w=2070&auto=format&fit=crop" 
            alt="Adventure Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <FadeInSection>
            <span className="text-[#F05442] font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Push Your Limits</span>
            <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6">Adventure in Sri Lanka</h1>
            <p className="max-w-2xl mx-auto text-white/80 font-light text-lg">
              From the highest peaks to the deep blue ocean, embark on a journey that will take your breath away.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
            <FadeInSection>
              <div className="space-y-6">
                <h2 className="font-playfair text-4xl md:text-5xl font-bold">Unleash Your Spirit</h2>
                <p className="text-gray-500 font-light text-lg leading-relaxed">
                  Sri Lanka is a playground for adventure seekers. Whether you're scaling the rocky faces of the Knuckles Range, catching world-class waves in Arugam Bay, or diving into the vibrant coral reefs of Hikkaduwa, every moment is an opportunity to discover something new about the world and yourself.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                    <Mountain size={18} className="text-[#F05442]" />
                    <span className="text-xs font-bold uppercase tracking-wider">Mountain Climbing</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                    <Waves size={18} className="text-[#F05442]" />
                    <span className="text-xs font-bold uppercase tracking-wider">Water Sports</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                    <Wind size={18} className="text-[#F05442]" />
                    <span className="text-xs font-bold uppercase tracking-wider">Paragliding</span>
                  </div>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl">
                <img 
                  src="/hikers_walking_up_stairs.png" 
                  alt="Adventure Scene" 
                  className="w-full h-auto"
                />
              </div>
            </FadeInSection>
          </div>

          <div className="space-y-12">
            <div className="text-center">
              <h2 className="font-playfair text-4xl font-bold">Popular Activities</h2>
              <div className="h-1 w-20 bg-[#F05442] mx-auto mt-4"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {adventureActivities.map((activity, idx) => (
                <FadeInSection key={activity.title}>
                  <div className="group">
                    <div className="relative overflow-hidden rounded-3xl aspect-square mb-6">
                      <img src={activity.img} alt={activity.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[#F05442]">
                        <MapPin size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{activity.location}</span>
                      </div>
                      <h3 className="font-playfair text-2xl font-bold">{activity.title}</h3>
                      <p className="text-gray-500 font-light text-sm">{activity.desc}</p>
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#111111] py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="font-playfair text-4xl font-bold">Ready to start your adventure?</h2>
          <button className="inline-block border border-white/20 hover:border-[#F05442] hover:bg-[#F05442] px-12 py-5 transition-all font-bold tracking-widest uppercase text-xs">
            Book This Experience
          </button>
          <div className="pt-20 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 text-white/20 text-[10px] tracking-[0.2em] uppercase">
            <p>&copy; 2026 TRIPPIN LK</p>
            <div className="flex gap-10">
              <Link to="/">Home</Link>
              <Link to="/map">Map</Link>
              <Link to="/experiences">Experiences</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
