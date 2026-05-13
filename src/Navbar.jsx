import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Interactive Map", path: "/map" },
    { 
      name: "Experiences", 
      path: "/experiences",
      dropdown: [
        { name: "Adventure", path: "/adventure" },
        { name: "Culture", path: "/culture" },
        { name: "Nature & Wild Life", path: "/wildlife" },
        { name: "Architecture", path: "/architecture" }
      ]
    },
    { name: "About", path: "/about" }
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-white shadow-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0 cursor-pointer flex items-center">
          <img 
            src="/tripin_logo.png" 
            alt="Trippin Logo" 
            className={`transition-all duration-300 object-contain mix-blend-multiply ${
              isScrolled ? 'h-12' : 'h-16'
            }`}
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <div 
              key={link.name} 
              className="relative group"
              onMouseEnter={() => link.dropdown && setDropdownOpen(true)}
              onMouseLeave={() => link.dropdown && setDropdownOpen(false)}
            >
              <Link 
                to={link.path}
                className="text-sm font-medium tracking-wide flex items-center gap-1 text-[#33353D] py-2"
              >
                {link.name}
                {link.dropdown && <ChevronDown size={14} className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#F05442] transition-all duration-300 group-hover:w-full"></span>
              </Link>

              {/* Dropdown Menu */}
              {link.dropdown && (
                <div 
                  className={`absolute left-0 mt-0 w-56 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden transition-all duration-300 origin-top-left ${
                    dropdownOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                  }`}
                >
                  <div className="py-2">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="block px-6 py-3 text-sm text-gray-700 hover:bg-[#F05442] hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="focus:outline-none text-[#33353D]"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      <div 
        className={`lg:hidden absolute top-full left-0 w-full bg-[#2A2B31] transition-all duration-300 origin-top overflow-hidden ${
          mobileMenuOpen ? 'max-h-[500px] py-4' : 'max-h-0 py-0'
        }`}
      >
        <div className="flex flex-col space-y-2 px-6">
          {navLinks.map((link) => (
            <div key={link.name}>
              <div className="flex justify-between items-center py-3">
                <Link 
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#FFFFFF] text-lg font-medium"
                >
                  {link.name}
                </Link>
                {link.dropdown && (
                  <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="text-white/50"
                  >
                    <ChevronDown size={20} className={dropdownOpen ? 'rotate-180' : ''} />
                  </button>
                )}
              </div>
              
              {link.dropdown && dropdownOpen && (
                <div className="pl-4 space-y-2 pb-2">
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 text-white/70 text-sm hover:text-[#F05442]"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
