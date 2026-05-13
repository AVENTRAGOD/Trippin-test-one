import React from 'react';
import { Link } from 'react-router-dom';
import { Trees, ChevronLeft } from 'lucide-react';

export default function WildLifePage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-inter text-[#33353D]">
      <nav className="fixed w-full z-50 bg-white shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/" className="flex-shrink-0 flex items-center">
            <img src="/tripin_logo.png" alt="Trippin Logo" className="h-16 w-auto mix-blend-multiply" />
          </Link>
          <Link to="/experiences" className="flex items-center gap-2 text-sm font-medium text-[#F05442] hover:underline">
            <ChevronLeft size={16} /> Back to Experiences
          </Link>
        </div>
      </nav>

      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img 
            src="/elepents.jpg" 
            alt="Wild Life" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6">Nature & Wild Life</h1>
          <p className="text-xl max-w-2xl mx-auto font-light opacity-90">
            Encounter the majestic giants and elusive leopards of the wild.
          </p>
        </div>
      </section>

      <section className="py-24 max-w-4xl mx-auto px-4 text-center space-y-12">
        <div className="inline-flex p-4 rounded-full bg-[#10B981]/10 text-[#10B981]">
          <Trees size={48} strokeWidth={1.5} />
        </div>
        <h2 className="font-playfair text-4xl font-bold text-[#1A1C1E]">The Wild Heart of Sri Lanka</h2>
        <p className="text-lg text-gray-600 leading-relaxed font-light">
          We are building a comprehensive guide to Sri Lanka's incredible biodiversity. 
          From whale watching in the deep south to safari adventures in Yala and Wilpattu, 
          your guide to the natural world is on its way.
        </p>
        <div className="pt-12">
          <div className="h-1 w-24 bg-[#10B981] mx-auto opacity-30"></div>
        </div>
        <p className="text-sm font-bold tracking-[0.2em] text-gray-400 uppercase">Coming Soon</p>
      </section>

      <footer className="bg-[#111111] py-12 text-center">
        <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase">
          &copy; 2026 TRIPPIN LK. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </div>
  );
}
