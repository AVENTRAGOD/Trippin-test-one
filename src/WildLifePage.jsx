import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, Trees, Sun, Compass, MapPin, Calendar, Camera, Info, 
  Sparkles, Heart, ShieldAlert, ArrowUpRight, X, Maximize2, Users, Tent, Binoculars, Flame
} from 'lucide-react';
import Navbar from './Navbar';

// 1. DATASETS FOR THE CINEMATIC EXPERIENCE
const HERO_TABS = [
  {
    id: "leopard",
    label: "Leopard Dynasty",
    title: "The Elusive King",
    subtitle: "Track the gorgeous Sri Lankan leopard stalking through Yala's scrublands.",
    image: "https://images.unsplash.com/photo-1602491453979-53a99888c031?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: "elephant",
    label: "Gentle Giants",
    title: "Majestic Herds",
    subtitle: "Witness ancient elephant gatherings beside royal historic reservoirs.",
    image: "https://images.unsplash.com/photo-1581888227599-779811939961?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: "rainforest",
    label: "Rainforest Mists",
    title: "Sinharaja Canopy",
    subtitle: "Explore prehistoric jungles dripping with moss, wild orchids, and streams.",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: "jungle",
    label: "Jungle Light",
    title: "Untamed Paradise",
    subtitle: "Encounter rich biodiversity illuminated by golden equatorial sunbeams.",
    image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=2000&auto=format&fit=crop"
  }
];

const DESTINATIONS = [
  {
    id: "yala",
    name: "Yala National Park",
    type: "Dry Zone Reserve",
    desc: "Famous globally for having one of the highest densities of leopards in the wild, mixed with wild boars, peacocks, and mud lakes.",
    img: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?q=80&w=1500&auto=format&fit=crop",
    details: "Yala spans over 978 square kilometers in the dry southeast. Comprising five blocks, it hosts diverse ecosystems from moist monsoon forests to sandy beaches. It is a critical sanctuary for Sri Lankan leopards, elephants, and aquatic birds."
  },
  {
    id: "wilpattu",
    name: "Wilpattu National Park",
    type: "Ancient Willu Sanctuary",
    desc: "A stunning wilderness characterized by natural rainwater lakes ('willus') hosting spotted deer, sloth bears, and leopards.",
    img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1500&auto=format&fit=crop",
    details: "Wilpattu is Sri Lanka's largest and oldest national park. Famous for its unique flat basins filled with rainwater, the park offers highly tranquil safaris away from crowds. Spot sloth bears foraging under the palu trees."
  },
  {
    id: "udawalawe",
    name: "Udawalawe Sanctuary",
    type: "Elephant Wilderness",
    desc: "The absolute best place in Asia to view wild elephant herds roaming freely across grasslands and massive reservoirs.",
    img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1500&auto=format&fit=crop",
    details: "Established to provide a sanctuary for wild animals displaced by the construction of the Udawalawe Reservoir, this park is home to over 250 permanently residing elephants. The open grasslands make spotting incredibly easy."
  },
  {
    id: "sinharaja",
    name: "Sinharaja Forest",
    type: "UNESCO Biosphere",
    desc: "A virgin tropical rainforest containing over 60% endemic trees and massive multi-species bird feeding flocks.",
    img: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1500&auto=format&fit=crop",
    details: "Sinharaja is Sri Lanka's last viable area of primary tropical rainforest. It is a treasure trove of endemic species, including rare amphibians, reptiles, butterflies, and spectacular bird waves."
  },
  {
    id: "mirissa",
    name: "Mirissa Whale Sea",
    type: "Marine Sanctuary",
    desc: "Warm deep currents close to the coastline create a rich feeding trough for massive blue whales and sperm whales.",
    img: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?q=80&w=1500&auto=format&fit=crop",
    details: "Mirissa is globally famous as a premier marine mammal watching destination. Blue whales, bryde's whales, and spinner dolphins gather in great numbers during their seasonal migrations."
  },
  {
    id: "horton",
    name: "Horton Plains",
    type: "Highland Grasslands",
    desc: "Misty plateaus 2,100m high covered in cloud forests, wild sambar deer, and the dramatic 1,000m sheer drop at World's End.",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1500&auto=format&fit=crop",
    details: "A cold, windy highland plateau hosting montane cloud forests. Here, major rivers originate, flowing down into gorges. Sambar deer graze the grasslands as endemic purple-faced langurs swing above."
  }
];

const TIMELINE_DATA = [
  {
    id: "dry-safari",
    season: "Dry Safaris",
    months: "May – September",
    highlight: "Waterhole Predators",
    desc: "As inland forest pools dry up, apex predators and giants are forced to gather around remaining lakes. Optimal tracking in Yala & Wilpattu.",
    spots: ["Yala Block 1", "Wilpattu Central Lakes"],
    icon: <Binoculars size={20} />
  },
  {
    id: "gathering",
    season: "Elephant Gathering",
    months: "July – October",
    highlight: "The Great Gathering",
    desc: "Up to 300 elephants gather at Minneriya Reservoir as grass beds recede, creating the largest seasonal gathering of Asian Elephants in the world.",
    spots: ["Minneriya National Park", "Kaudulla Reservoir"],
    icon: <Users size={20} />
  },
  {
    id: "whales",
    season: "Whale Migration",
    months: "November – April",
    highlight: "Ocean Giants Peak",
    desc: "Deep underwater canyons near Mirissa host warm currents, drawing blue whales and super-pods of sperm whales close to the south coast.",
    spots: ["Mirissa Bay", "Trincomalee Deep Sea"],
    icon: <Compass size={20} />
  },
  {
    id: "birds",
    season: "Bird Migrations",
    months: "October – March",
    highlight: "Endemic & Migrant Avian",
    desc: "Over 200 species of migratory birds arrive from Siberia and Central Asia, joining beautiful endemic blue magpies in marshlands.",
    spots: ["Bundala Wetland Reserve", "Kumana Bird Sanctuary"],
    icon: <Camera size={20} />
  },
  {
    id: "rainforest",
    season: "Rainforest Treks",
    months: "Year-Round",
    highlight: "Primal Canopy Trekking",
    desc: "Prehistoric trees dripping with jungle vines and moss. High moisture supports a spectacular micro-climate of amphibians and rare geckos.",
    spots: ["Sinharaja Reserve", "Kanneliya Rain Forest"],
    icon: <Trees size={20} />
  }
];

const WILDLIFE_DATA = [
  {
    id: "leopard",
    name: "Sri Lankan Leopard",
    scientific: "Panthera pardus kotiya",
    status: "Endangered",
    tag: "Apex Predator",
    image: "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?q=80&w=1200&auto=format&fit=crop",
    facts: { weight: "50 - 75 kg", diet: "Carnivore (Spotted Deer, Boar)", habitat: "Dry scrub jungle & montane forests" },
    desc: "The top predator on the island, this endemic subspecies has grown large and bold due to the lack of tiger or lion competitors.",
    conservation: "Threatened by forest fragmentation and poaching. Protected heavily inside Yala, Wilpattu, and highland national sanctuaries."
  },
  {
    id: "elephant",
    name: "Asian Elephant",
    scientific: "Elephas maximus maximus",
    status: "Endangered",
    tag: "Keystone Herbivore",
    image: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?q=80&w=1200&auto=format&fit=crop",
    facts: { weight: "3,000 - 5,500 kg", diet: "Herbivore (Grasses, Bark)", habitat: "Dry zone scrublands & forests" },
    desc: "The largest of the Asian Elephant subspecies, distinguished by darker skin patches and highly complex herd bonds.",
    conservation: "Confronted by human-elephant conflict as development encroaches on migratory paths. Managed through seasonal wildlife corridors."
  },
  {
    id: "whale",
    name: "Blue Whale",
    scientific: "Balaenoptera musculus",
    status: "Endangered",
    tag: "Marine Sovereign",
    image: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=1200&auto=format&fit=crop",
    facts: { weight: "Up to 150,000 kg", diet: "Carnivore (Krill exclusively)", habitat: "Deep offshore marine currents" },
    desc: "The largest creature ever known to have lived on Earth. Sri Lanka's resident pods cruise coastal margins year-round.",
    conservation: "Highly protected from commercial shipping lanes in the Indian Ocean to avoid ship strikes. Regulated eco-tours only."
  },
  {
    id: "slothbear",
    name: "Sloth Bear",
    scientific: "Melursus ursinus inornatus",
    status: "Vulnerable",
    tag: "Shy Forager",
    image: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?q=80&w=1200&auto=format&fit=crop",
    facts: { weight: "80 - 140 kg", diet: "Omnivore (Termites, Palu Fruit)", habitat: "Dry lowland forests" },
    desc: "Equipped with curved claws and a hollow snout, these bears tear apart termite mounds and vacuum up nests.",
    conservation: "Highly dependent on primary dry monsoon forests. Protected within Udawalawe and Wilpattu boundaries."
  },
  {
    id: "birds",
    name: "Exotic Endemic Birds",
    scientific: "Aves (Diverse Species)",
    status: "Varying Status",
    tag: "Avian Wonders",
    image: "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?q=80&w=1200&auto=format&fit=crop",
    facts: { variety: "33 Endemic Species", diet: "Omnivore (Insects, Nectar)", habitat: "Rainforests & wet zone marshes" },
    desc: "Features highly colorful wonders like the Sri Lanka Blue Magpie, Junglefowl, and Crimson-fronted Barbet.",
    conservation: "Protected intensely within rainforest reserves like Sinharaja, preserving critical tropical breeding branches."
  }
];

const GALLERY_IMAGES = [
  { url: "https://images.unsplash.com/photo-1484406566174-9da000fda645?q=80&w=1000&auto=format&fit=crop", caption: "Spotted Deer running in Yala scrublands" },
  { url: "https://images.unsplash.com/photo-1604608678051-64d46d84bffe?q=80&w=1000&auto=format&fit=crop", caption: "Mugger crocodile basking on sandbank" },
  { url: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1000&auto=format&fit=crop", caption: "Sri Lanka Blue Magpie in Sinharaja rainforest" },
  { url: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?q=80&w=1000&auto=format&fit=crop", caption: "Luxury safari camp lit at twilight" },
  { url: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=1000&auto=format&fit=crop", caption: "Wild elephants grazing in open glade" },
  { url: "https://images.unsplash.com/photo-1559583985-c80d8ad9b29f?q=80&w=1000&auto=format&fit=crop", caption: "Green Sea Turtle swimming in coral reef" }
];

const EXPERIENCES = [
  {
    title: "4x4 Jeep Safaris",
    icon: <Binoculars size={28} className="text-[#10B981]" />,
    desc: "Rigid open-top offroad drives at the crack of dawn to track leopards, bears, and giants."
  },
  {
    title: "Luxury Camping",
    icon: <Tent size={28} className="text-[#10B981]" />,
    desc: "Sleep under a canopy of stars in high-end glamping structures inside national buffer zones."
  },
  {
    title: "Rainforest Trekking",
    icon: <Trees size={28} className="text-[#10B981]" />,
    desc: "Walk beneath 50m canopy giants accompanied by expert local conservation naturalists."
  },
  {
    title: "Deep Sea Cruises",
    icon: <Compass size={28} className="text-[#10B981]" />,
    desc: "Private ocean charters designed to spot majestic blue whales rising above dark waves."
  },
  {
    title: "Avian Photography",
    icon: <Camera size={28} className="text-[#10B981]" />,
    desc: "Hone in on rare endemics from specially positioned, low-impact wildlife viewing blinds."
  }
];

// 2. SCROLL TRIGGER FADE-IN UTILITY COMPONENT
const FadeInSection = ({ children }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      });
    }, { threshold: 0.1 });
    
    if (domRef.current) {
      observer.observe(domRef.current);
    }
    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {children}
    </div>
  );
};

export default function WildLifePage() {
  // Navigation & UI States
  const [activeHeroTab, setActiveHeroTab] = useState(HERO_TABS[0]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [activeTimelineIdx, setActiveTimelineIdx] = useState(0);
  const [selectedSpecies, setSelectedSpecies] = useState(WILDLIFE_DATA[0]);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Parallax Hero Effect
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Discrete Hero Slide Interval
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroTab((prevTab) => {
        const currIdx = HERO_TABS.findIndex(t => t.id === prevTab.id);
        const nextIdx = (currIdx + 1) % HERO_TABS.length;
        return HERO_TABS[nextIdx];
      });
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#070908] text-white font-inter overflow-x-hidden selection:bg-[#10B981] selection:text-white">
      
      {/* 1. CUSTOM AMBIENT PARTICLE CSS INJECTION */}
      <style>{`
        @keyframes floatParticle {
          0% { transform: translateY(0px) translateX(0px); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateY(-120px) translateX(25px); opacity: 0; }
        }
        .particle-effect {
          position: absolute;
          width: 6px;
          height: 6px;
          background: #10B981;
          border-radius: 50%;
          box-shadow: 0 0 10px #10B981;
          animation: floatParticle 8s infinite linear;
          pointer-events: none;
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* 2. TRANSPARENT LUXURY NAVBAR */}
      <Navbar />

      {/* 3. FULLSCREEN CINEMATIC HERO SECTION */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Dynamic sliding backgrounds with parallax scale */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out scale-105"
            style={{ 
              backgroundImage: `url(${activeHeroTab.image})`,
              transform: `translateY(${scrollY * 0.2}px) scale(1.05)`
            }}
          />
          {/* Layered cinematic overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070908] via-[#070908]/20 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
        </div>

        {/* Ambient floating forest dusts */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className="particle-effect"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${80 + Math.random() * 20}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${6 + Math.random() * 6}s`,
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`
              }}
            />
          ))}
        </div>

        {/* Hero Copy (Text Reveal + Parallax) */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[#10B981] shadow-2xl animate-pulse text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4">
            <Flame size={14} />
            Trippin lk Campaign
          </div>
          <h1 className="font-playfair text-6xl sm:text-8xl md:text-9xl font-bold tracking-tight text-white leading-none drop-shadow-2xl">
            {activeHeroTab.title}
          </h1>
          <p className="font-inter text-white/80 text-lg sm:text-2xl max-w-3xl mx-auto font-light leading-relaxed drop-shadow-lg">
            {activeHeroTab.subtitle}
          </p>

          <div className="pt-10 flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => document.getElementById('explore-intro')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 rounded-full font-semibold uppercase tracking-widest text-xs bg-[#10B981] text-white hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.3)] shadow-[#10B981]/20 cursor-pointer"
            >
              Begin Journey
            </button>
            <Link 
              to="/experiences"
              className="px-10 py-4 rounded-full font-semibold uppercase tracking-widest text-xs border border-white/20 bg-white/5 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all duration-300 cursor-pointer flex items-center gap-2"
            >
              <ChevronLeft size={16} /> Back to Experiences
            </Link>
          </div>
        </div>

        {/* Tab switchers at Hero bottom */}
        <div className="absolute bottom-12 inset-x-0 z-25 max-w-5xl mx-auto px-4 hidden md:flex justify-between items-center gap-4 bg-black/30 backdrop-blur-md border border-white/5 p-4 rounded-2xl">
          {HERO_TABS.map((tab) => {
            const isActive = activeHeroTab.id === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveHeroTab(tab)}
                className={`flex-1 py-3 px-6 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-500 text-center cursor-pointer ${
                  isActive 
                    ? 'bg-[#10B981] text-white shadow-xl shadow-[#10B981]/15' 
                    : 'text-white/40 hover:text-white/90 hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. INTRODUCTION SECTION */}
      <section id="explore-intro" className="py-32 relative bg-[#070908] overflow-hidden border-b border-white/5">
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-[#10B981]/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-10">
          <FadeInSection>
            <div className="inline-flex p-5 rounded-full bg-[#10B981]/5 border border-[#10B981]/15 text-[#10B981] mb-2 animate-bounce">
              <Trees size={36} strokeWidth={1.5} />
            </div>
            <h2 className="font-playfair text-4xl sm:text-6xl font-bold leading-tight">
              The Wild Heart of Sri Lanka
            </h2>
            <div className="h-1 w-24 bg-[#10B981] mx-auto rounded-full" />
            <p className="font-inter text-white/60 text-lg sm:text-xl leading-relaxed font-light text-justify md:text-center">
              Sri Lanka is one of the world's absolute biodiversity hot-spots. Packed within a compact tropical island, you'll encounter dry scrub forests hosting the highest density of leopards globally, misty plateaus where cloud forests touch World's End, wetlands teaming with rare migratory flocks, and warm deep sea currents drawing massive blue whales close to shore. This is nature, untamed and absolute.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* 5. DESTINATIONS BENTO GRID */}
      <section className="py-32 bg-[#090b0a] relative overflow-hidden">
        <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-[#10B981]/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeInSection>
            <div className="text-center mb-24 space-y-4">
              <p className="font-inter text-[#10B981] font-bold tracking-[0.3em] text-sm uppercase">Protected Parks</p>
              <h2 className="font-playfair text-4xl sm:text-6xl font-bold">Immersive Destinations</h2>
              <div className="h-1 w-24 bg-[#10B981] mx-auto rounded-full" />
            </div>
          </FadeInSection>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DESTINATIONS.map((dest, idx) => (
              <FadeInSection key={dest.id}>
                <div 
                  onClick={() => setSelectedDestination(dest)}
                  className="group relative rounded-[2.5rem] overflow-hidden aspect-[4/5] bg-[#121614] border border-white/5 hover:border-[#10B981]/25 hover:shadow-2xl transition-all duration-700 cursor-pointer shadow-xl"
                >
                  {/* Photo with hover zoom */}
                  <img 
                    src={dest.img} 
                    alt={dest.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  />
                  {/* Cinematic Shadow overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#10B981]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Top category label */}
                  <div className="absolute top-6 left-6 z-10">
                    <span className="px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/80 font-bold uppercase tracking-widest text-[9px]">
                      {dest.type}
                    </span>
                  </div>

                  {/* Details reveal on bottom */}
                  <div className="absolute bottom-0 inset-x-0 p-8 z-10 flex flex-col justify-end h-1/2">
                    <h3 className="font-playfair font-bold text-3xl text-white mb-2 group-hover:text-[#10B981] transition-colors leading-tight">
                      {dest.name}
                    </h3>
                    <p className="font-inter text-white/60 text-xs sm:text-sm font-light line-clamp-2 leading-relaxed opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75">
                      {dest.desc}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-white/90 uppercase tracking-widest mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150">
                      <span>Explore Park</span>
                      <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* DESTINATION DETAIL DIALOG MODAL */}
      {selectedDestination && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black/85 backdrop-blur-xl transition-opacity duration-500"
            onClick={() => setSelectedDestination(null)}
          />

          <div className="relative bg-[#111312] border border-white/10 rounded-[2.5rem] w-full max-w-4xl overflow-hidden shadow-2xl z-10 transition-all duration-500 transform scale-100 opacity-100 max-h-[85vh] flex flex-col md:flex-row">
            
            <button
              onClick={() => setSelectedDestination(null)}
              className="absolute top-6 right-6 z-30 w-12 h-12 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Visual side */}
            <div className="w-full md:w-5/12 relative min-h-[250px] md:min-h-full">
              <img 
                src={selectedDestination.img} 
                alt={selectedDestination.name} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111312] hidden md:block" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white z-10">
                <span className="px-3 py-1 rounded-full bg-[#10B981] text-white text-[9px] uppercase font-bold tracking-widest mb-2 inline-block">
                  {selectedDestination.type}
                </span>
                <h4 className="font-playfair font-bold text-2xl leading-tight">{selectedDestination.name}</h4>
              </div>
            </div>

            {/* Info side */}
            <div className="w-full md:w-7/12 p-8 sm:p-12 overflow-y-auto max-h-[50vh] md:max-h-[80vh] space-y-6 text-white/95">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#10B981]">
                  <MapPin size={18} />
                  <span className="font-inter text-xs font-bold uppercase tracking-widest">Protected Sanctuary</span>
                </div>
                <h3 className="font-playfair text-3xl font-bold">{selectedDestination.name}</h3>
              </div>

              <div className="h-px bg-white/10" />

              <p className="font-inter text-base sm:text-lg leading-relaxed text-white/80 font-light">
                {selectedDestination.details}
              </p>

              <div className="bg-white/5 border border-white/5 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-[#10B981]">
                  <Info size={16} />
                  <span className="font-inter text-xs font-bold uppercase tracking-widest">Visitor Highlights</span>
                </div>
                <p className="font-inter text-white/60 text-sm leading-relaxed font-light">
                  {selectedDestination.desc}
                </p>
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  onClick={() => setSelectedDestination(null)}
                  className="flex-1 py-4 px-6 rounded-xl bg-[#10B981] hover:bg-white hover:text-black text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer text-center"
                >
                  Perfect, Close Details
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 6. WILDLIFE EXPERIENCE TIMELINE */}
      <section className="py-32 bg-[#070908] border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#10B981]/5 rounded-full blur-[180px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeInSection>
            <div className="text-center mb-20 space-y-4">
              <p className="font-inter text-[#10B981] font-bold tracking-[0.3em] text-sm uppercase">Year-Round Seasons</p>
              <h2 className="font-playfair text-4xl sm:text-6xl font-bold">Wildlife Experience Timeline</h2>
              <div className="h-1 w-24 bg-[#10B981] mx-auto rounded-full" />
            </div>
          </FadeInSection>

          {/* Interactive Timeline Header */}
          <div className="relative mb-16 overflow-x-auto scrollbar-none pb-6">
            {/* Connecting line */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-white/10 z-0 hidden lg:block" />

            <div className="flex lg:justify-between items-center min-w-[800px] relative z-10 px-4">
              {TIMELINE_DATA.map((t, idx) => {
                const isActive = activeTimelineIdx === idx;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTimelineIdx(idx)}
                    className="flex-1 flex flex-col items-center text-center group focus:outline-none cursor-pointer"
                  >
                    {/* Circle Node */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-500 mb-4 z-10 ${
                      isActive 
                        ? 'bg-[#10B981] border-[#10B981] text-white shadow-xl shadow-[#10B981]/20 scale-110' 
                        : 'bg-[#0f1110] border-white/10 text-white/50 group-hover:border-white/30 group-hover:text-white'
                    }`}>
                      {t.icon}
                    </div>
                    <span className={`font-inter text-sm font-bold uppercase tracking-wider transition-colors ${
                      isActive ? 'text-[#10B981]' : 'text-white/40 group-hover:text-white/80'
                    }`}>
                      {t.season}
                    </span>
                    <span className="font-inter text-xs text-white/20 mt-1">
                      {t.months}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Display active card content with elegant horizontal split */}
          <div className="bg-[#101211] border border-white/5 rounded-[2.5rem] p-8 sm:p-12 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 shadow-2xl relative">
            <div className="absolute top-8 right-8 text-white/5 pointer-events-none hidden md:block">
              <Calendar size={120} strokeWidth={1} />
            </div>

            {/* Left text panel */}
            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-2 text-[#10B981]">
                <Calendar size={16} />
                <span className="font-inter text-xs font-bold uppercase tracking-widest">Featured Season</span>
              </div>
              <h3 className="font-playfair text-4xl sm:text-5xl font-bold leading-tight text-white">
                {TIMELINE_DATA[activeTimelineIdx].highlight}
              </h3>
              <p className="font-inter text-white/60 text-lg leading-relaxed font-light">
                {TIMELINE_DATA[activeTimelineIdx].desc}
              </p>

              <div className="space-y-4">
                <span className="font-inter text-xs font-bold text-white/30 uppercase tracking-widest block">Primary Hotspots</span>
                <div className="flex flex-wrap gap-2">
                  {TIMELINE_DATA[activeTimelineIdx].spots.map((s, i) => (
                    <span key={i} className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-white/80 text-xs font-bold uppercase tracking-widest">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right graphic/visual placeholder panel */}
            <div className="w-full md:w-5/12 aspect-[4/3] sm:aspect-square md:aspect-[3/4] rounded-3xl overflow-hidden relative border border-white/10 shadow-2xl">
              <img 
                src={
                  activeTimelineIdx === 0 ? "https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=1000" :
                  activeTimelineIdx === 1 ? "https://images.unsplash.com/photo-1581888227599-779811939961?q=80&w=1000" :
                  activeTimelineIdx === 2 ? "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=1000" :
                  activeTimelineIdx === 3 ? "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?q=80&w=1000" :
                  "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1000"
                }
                alt="Season Highlights"
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 z-10">
                <span className="font-inter text-xs text-[#10B981] font-bold uppercase tracking-widest">Best Season Time</span>
                <p className="font-playfair text-xl font-bold text-white mt-1">{TIMELINE_DATA[activeTimelineIdx].months}</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. FEATURED WILDLIFE SECTION */}
      <section className="py-32 bg-[#090b0a] relative overflow-hidden">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#10B981]/5 rounded-full blur-[180px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeInSection>
            <div className="text-center mb-24 space-y-4">
              <p className="font-inter text-[#10B981] font-bold tracking-[0.3em] text-sm uppercase">Subspecies Spotlight</p>
              <h2 className="font-playfair text-4xl sm:text-6xl font-bold">Featured Wildlife</h2>
              <div className="h-1 w-24 bg-[#10B981] mx-auto rounded-full" />
            </div>
          </FadeInSection>

          {/* Layout: Sidebar list with detailed visual brochures */}
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            {/* Left sidebar species list selector */}
            <div className="w-full lg:w-4/12 space-y-3 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-none gap-3">
              {WILDLIFE_DATA.map((sp) => {
                const isActive = selectedSpecies.id === sp.id;
                return (
                  <button
                    key={sp.id}
                    onClick={() => setSelectedSpecies(sp)}
                    className={`w-full text-left p-6 rounded-2xl border transition-all duration-500 flex items-center justify-between min-w-[240px] cursor-pointer flex-shrink-0 lg:flex-shrink ${
                      isActive 
                        ? 'bg-[#10B981]/10 border-[#10B981]/30 shadow-lg text-white' 
                        : 'bg-white/5 border-white/5 text-white/50 hover:bg-white/10 hover:text-white/90'
                    }`}
                  >
                    <div>
                      <p className="font-inter text-[10px] uppercase font-bold tracking-widest text-[#10B981] mb-1">
                        {sp.tag}
                      </p>
                      <h4 className="font-playfair text-xl font-bold">{sp.name}</h4>
                    </div>
                    <span className="text-xl">&rarr;</span>
                  </button>
                );
              })}
            </div>

            {/* Right: Species Showcase Brochure Card */}
            <div className="w-full lg:w-8/12 bg-[#101211] border border-white/5 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row gap-10">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#10B981]/5 to-transparent pointer-events-none" />

              {/* Graphic panel */}
              <div className="w-full md:w-5/12 aspect-square md:aspect-[3/4] rounded-2xl overflow-hidden relative shadow-2xl border border-white/5 flex-shrink-0">
                <img 
                  src={selectedSpecies.image} 
                  alt={selectedSpecies.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 z-10">
                  <span className="px-3 py-1 rounded-full bg-red-600 text-white font-bold uppercase tracking-widest text-[9px]">
                    Status: {selectedSpecies.status}
                  </span>
                </div>
              </div>

              {/* Copy & Details Panel */}
              <div className="flex-1 space-y-6">
                <div className="space-y-2">
                  <p className="font-inter text-[#10B981] text-xs font-bold uppercase tracking-widest">
                    {selectedSpecies.tag}
                  </p>
                  <h3 className="font-playfair text-3xl sm:text-4xl font-bold leading-tight text-white">
                    {selectedSpecies.name}
                  </h3>
                  <p className="font-inter text-white/30 text-xs italic font-semibold">
                    {selectedSpecies.scientific}
                  </p>
                </div>

                <p className="font-inter text-white/60 text-sm leading-relaxed font-light">
                  {selectedSpecies.desc}
                </p>

                {/* Facts metrics */}
                <div className="grid grid-cols-3 gap-4 border-y border-white/10 py-5">
                  {Object.entries(selectedSpecies.facts).map(([k, v]) => (
                    <div key={k}>
                      <span className="font-inter text-[10px] text-white/30 uppercase tracking-widest block mb-1">
                        {k}
                      </span>
                      <span className="font-inter text-xs sm:text-sm font-bold text-white">
                        {v}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Conservation warning box */}
                <div className="bg-red-500/5 border-l-4 border-red-600 p-4 rounded-r-xl flex gap-3 items-start">
                  <ShieldAlert size={20} className="text-red-500 shrink-0 mt-0.5" />
                  <p className="font-inter text-white/70 text-xs leading-relaxed font-light">
                    {selectedSpecies.conservation}
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 8. IMMERSIVE GALLERY */}
      <section className="py-32 bg-[#070908] border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#10B981]/5 rounded-full blur-[200px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeInSection>
            <div className="text-center mb-24 space-y-4">
              <p className="font-inter text-[#10B981] font-bold tracking-[0.3em] text-sm uppercase">Close-Up Captures</p>
              <h2 className="font-playfair text-4xl sm:text-6xl font-bold">Immersive Masonry Gallery</h2>
              <div className="h-1 w-24 bg-[#10B981] mx-auto rounded-full" />
            </div>
          </FadeInSection>

          {/* Masonry Layout grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {GALLERY_IMAGES.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxIndex(idx)}
                className="break-inside-avoid relative rounded-[2rem] overflow-hidden group cursor-pointer border border-white/5 hover:border-[#10B981]/30 transition-all duration-500 shadow-xl"
              >
                <img 
                  src={img.url} 
                  alt={img.caption} 
                  className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Overlay shadow on hover */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/60 transition-colors duration-500" />
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex justify-between items-center">
                    <p className="font-inter text-xs text-white/80 font-medium">
                      {img.caption}
                    </p>
                    <Maximize2 size={16} className="text-[#10B981]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX OVERLAY POPUP */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl transition-opacity duration-300">
          
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 z-30 w-12 h-12 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all cursor-pointer"
          >
            <X size={20} />
          </button>

          {/* Left Arrow */}
          <button
            onClick={() => setLightboxIndex((lightboxIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)}
            className="absolute left-6 w-14 h-14 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all cursor-pointer"
          >
            &larr;
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => setLightboxIndex((lightboxIndex + 1) % GALLERY_IMAGES.length)}
            className="absolute right-6 w-14 h-14 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all cursor-pointer"
          >
            &rarr;
          </button>

          {/* Visual Container */}
          <div className="max-w-4xl max-h-[85vh] text-center space-y-4 px-4">
            <img 
              src={GALLERY_IMAGES[lightboxIndex].url} 
              alt="Lightbox Zoomed" 
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/10"
            />
            <p className="font-inter text-sm text-white/70 italic font-light leading-relaxed">
              "{GALLERY_IMAGES[lightboxIndex].caption}"
            </p>
          </div>

        </div>
      )}

      {/* 9. EXPERIENCE SECTION */}
      <section className="py-32 bg-[#090b0a] border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-10 w-[500px] h-[500px] bg-[#10B981]/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeInSection>
            <div className="text-center mb-24 space-y-4">
              <p className="font-inter text-[#10B981] font-bold tracking-[0.3em] text-sm uppercase">Curated Outings</p>
              <h2 className="font-playfair text-4xl sm:text-6xl font-bold">Luxury Experiences</h2>
              <div className="h-1 w-24 bg-[#10B981] mx-auto rounded-full" />
            </div>
          </FadeInSection>

          {/* Outing card grids */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {EXPERIENCES.map((ex, i) => (
              <FadeInSection key={i}>
                <div className="group relative bg-[#101211] border border-white/5 hover:border-[#10B981]/30 p-8 sm:p-10 rounded-[2.5rem] space-y-6 hover:shadow-2xl transition-all duration-500 shadow-xl cursor-pointer">
                  {/* Glowing background circle */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#10B981]/5 rounded-full blur-[50px] group-hover:bg-[#10B981]/10 transition-colors pointer-events-none" />

                  {/* Icon wrap */}
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-[#10B981]/15 group-hover:border-[#10B981]/30 transition-all duration-500 shadow-lg">
                    {ex.icon}
                  </div>

                  <h3 className="font-playfair font-bold text-2xl text-white group-hover:text-[#10B981] transition-colors leading-tight">
                    {ex.title}
                  </h3>
                  <p className="font-inter text-white/50 text-sm leading-relaxed font-light">
                    {ex.desc}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA SECTION */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background photo */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=2000" 
            alt="Jungle Sunset" 
            className="w-full h-full object-cover scale-105"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          />
          {/* Cover gradient & particle mists */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070908] via-[#070908]/90 to-transparent" />
          <div className="absolute inset-0 bg-[#070908]/50 backdrop-blur-[1px]" />
        </div>

        {/* Slow floating amber mists */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className="particle-effect"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${60 + Math.random() * 30}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${8 + Math.random() * 8}s`,
                width: `${3 + Math.random() * 4}px`,
                height: `${3 + Math.random() * 4}px`
              }}
            />
          ))}
        </div>

        {/* CTA Content details */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-8">
          <FadeInSection>
            <p className="font-inter text-[#10B981] font-bold tracking-[0.4em] text-xs sm:text-sm uppercase mb-2 animate-pulse">
              Unforgettable Adventure
            </p>
            <h2 className="font-playfair text-5xl sm:text-7xl font-bold leading-tight text-white mb-6">
              Discover the Untamed <br /> Beauty of Sri Lanka
            </h2>
            <div className="h-1 w-24 bg-[#10B981] mx-auto rounded-full mb-8" />
            
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group relative px-12 py-5 rounded-full font-bold uppercase tracking-widest text-xs bg-white text-black hover:bg-[#10B981] hover:text-white hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all duration-500 cursor-pointer shadow-2xl"
            >
              Start Your Adventure &uarr;
            </button>
          </FadeInSection>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="bg-[#050605] py-20 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 text-white/30">
          <p className="font-playfair text-xl text-white/50 tracking-wider">TRIPPIN LK</p>
          <div className="flex justify-center gap-10 text-xs uppercase tracking-widest font-semibold mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/map" className="hover:text-white transition-colors">Interactive Map</Link>
            <Link to="/experiences" className="hover:text-white transition-colors">Experiences</Link>
            <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
          </div>
          <div className="h-px bg-white/5 max-w-xs mx-auto" />
          <p className="text-[10px] tracking-[0.3em] uppercase pt-4">
            &copy; 2026 TRIPPIN LK. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>

    </div>
  );
}
