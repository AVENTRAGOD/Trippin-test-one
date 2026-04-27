import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, X, Heart, Gem, TrendingUp, Compass, Sun, Briefcase, Camera, Trees, Landmark
} from 'lucide-react';

const experiences = [
  {
    title: "Volunteering",
    icon: <Heart />,
    desc: "Sri Lanka is all about opportunities. We assist you with programs for enthusiasts looking to give back.",
    img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Destination Weddings",
    icon: <Gem />,
    desc: "Say your I do's in paradise. We make your dream day come true in the Pearl of the Indian Ocean.",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Investments",
    icon: <TrendingUp />,
    desc: "Explore opportunities in real estate, hospitality, tourism, renewable energy, and more.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
  },
  {
    title: "Adventure",
    icon: <Compass />,
    desc: "From kite surfing in Kalpitiya to hiking the peaks of Ella, adventure awaits at every turn.",
    img: "https://images.unsplash.com/photo-1502126324834-38f8e02d7160?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Spiritual Healing",
    icon: <Sun />,
    desc: "Take a break from the hectic lifestyle. Heal yourself while enjoying the peace of Sri Lanka.",
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "MICE",
    icon: <Briefcase />,
    desc: "Perfect locations for corporate meetings, incentives, conferences, and exhibitions.",
    img: "https://images.unsplash.com/photo-1517457373958-b7bdd058a548?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Culture",
    icon: <Camera />,
    desc: "Vibrant history of folktales and stories. 5000 years of documented history will leave you in awe.",
    img: "/dancer.jpg"
  },
  {
    title: "Nature & Wild Life",
    icon: <Trees />,
    desc: "Leopards, elephants, and whales. Sri Lanka is a hot destination for wildlife enthusiasts.",
    img: "/elepents.jpg"
  },
  {
    title: "Architecture",
    icon: <Landmark />,
    desc: "From Sigiriya Rock Fortress to the third tallest ancient man-made structures.",
    img: "/sigiriya_drone_view.jpg"
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

export default function ExperiencesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-inter text-[#1A1C1E] overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/" className="flex-shrink-0 flex items-center">
            <img src="/tripin_logo.png" alt="Trippin Logo" className="h-16 w-auto mix-blend-multiply" />
          </Link>
          <div className="hidden lg:flex space-x-10 items-center">
            {["Home", "Interactive Map", "Experiences", "About"].map((link) => (
              <Link 
                key={link} 
                to={link === "Home" ? "/" : `/${link.toLowerCase().replace(" ", "")}`}
                className="text-[13px] font-bold tracking-[0.15em] uppercase hover:text-[#F05442] transition-colors"
              >
                {link}
              </Link>
            ))}
          </div>
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
            {["Home", "Interactive Map", "Experiences", "About"].map((link) => (
              <Link 
                key={link} 
                to={link === "Home" ? "/" : `/${link.toLowerCase().replace(" ", "")}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#FFFFFF] text-lg font-medium"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-40 pb-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-[#F05442] font-bold tracking-[0.3em] uppercase text-xs">Curated For You</span>
          <h1 className="font-playfair text-4xl md:text-7xl font-bold">Experiences</h1>
          <p className="max-w-2xl mx-auto text-gray-500 font-light text-lg">
            Every journey with Trippin LK is unique. Choose your path and let us handle the rest.
          </p>
        </div>
      </section>

      {/* GRID */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {experiences.map((exp, idx) => (
              <FadeInSection key={exp.title}>
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-[2rem] aspect-[4/5] mb-8 bg-gray-100">
                    <img 
                      src={exp.img} 
                      alt={exp.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                    <div className="absolute top-8 left-8 bg-white/20 backdrop-blur-md p-4 rounded-2xl text-white">
                      {React.cloneElement(exp.icon, { size: 24, strokeWidth: 1.5 })}
                    </div>
                  </div>
                  <div className="space-y-4 px-2">
                    <h3 className="font-playfair text-3xl font-bold group-hover:text-[#F05442] transition-colors">{exp.title}</h3>
                    <p className="text-gray-500 font-light leading-relaxed">{exp.desc}</p>
                    <div className="pt-2">
                      <span className="inline-block h-[1px] w-12 bg-[#F05442] transition-all group-hover:w-24"></span>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#111111] py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="font-playfair text-4xl font-bold">Ready to explore?</h2>
          <Link to="/about" className="inline-block border border-white/20 hover:border-[#F05442] hover:bg-[#F05442] px-12 py-5 transition-all font-bold tracking-widest uppercase text-xs">
            Contact Our Team
          </Link>
          <div className="pt-20 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 text-white/20 text-[10px] tracking-[0.2em] uppercase">
            <p>&copy; 2026 TRIPPIN LK</p>
            <div className="flex gap-10">
              <Link to="/">Home</Link>
              <Link to="/map">Map</Link>
              <Link to="/about">About</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
