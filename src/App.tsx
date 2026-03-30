import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Pause, Radio, 
  Headphones, Shield, Heart, 
  MapPin, Facebook, Twitter, Instagram,
  ChevronRight, ChevronLeft, Star, Map, X,
  Newspaper, Users, Phone, ExternalLink,
  Clock, Calendar, Mic2, Sun, Moon
} from 'lucide-react';

// --- Brand Colors (Derived from Logo) ---
// Orange: #F58220
// Blue: #20388F
// Dark: #1E293B (Slate 800)

// --- Types ---
type View = 'home' | 'stations' | 'about' | 'news' | 'contact' | 'skyz' | 'breeze';

interface Station {
  id: string;
  name: string;
  freq: string;
  tagline: string;
  location: string;
  desc: string;
  image: string;
  shows: Show[];
  hosts: string[];
}

interface Show {
  name: string;
  time: string;
  host: string;
  desc: string;
}

// --- Data ---
const STATIONS: Record<string, Station> = {
  skyz: {
    id: 'skyz',
    name: "Skyz Metro FM",
    freq: "100.3 FM",
    tagline: "The Soul of Bulawayo",
    location: "Bulawayo, Zimbabwe",
    desc: "Bulawayo's first commercial radio station, focusing on urban culture, local news, and the heartbeat of Matabeleland.",
    image: "https://images.unsplash.com/photo-1516280440502-a2fc9861e389?q=80&w=2072&auto=format&fit=crop",
    hosts: ["Taboka Nleya", "Possenti Sikosana", "Vusumuzi Zwane", "Charity Chikara"],
    shows: [
      { name: "The Morning Drive", time: "06:00 - 09:00", host: "Taboka Nleya", desc: "Start your day with the latest Bulawayo news and urban hits." },
      { name: "Urban Beats", time: "12:00 - 15:00", host: "Possenti Sikosana", desc: "The best in local and international urban music." },
      { name: "Matabeleland Today", time: "18:00 - 19:00", host: "Charity Chikara", desc: "In-depth regional news and community analysis." }
    ]
  },
  breeze: {
    id: 'breeze',
    name: "Breeze FM",
    freq: "91.2 FM",
    tagline: "Voices of the Falls",
    location: "Victoria Falls, Zimbabwe",
    desc: "Serving the resort town of Victoria Falls and the Hwange district with tourism updates, community news, and multi-lingual broadcasting.",
    image: "https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=2072&auto=format&fit=crop",
    hosts: ["Timothy Hogo", "Stanley Dube", "Mkhenara"],
    shows: [
      { name: "Kusile on Breeze", time: "06:00 - 09:00", host: "Stanley Dube", desc: "The premier breakfast show for Victoria Falls and Hwange." },
      { name: "Tourism Weekly", time: "10:00 - 11:00", host: "Timothy Hogo", desc: "Updates from the tourism industry and river flow reports." },
      { name: "Agri Talk", time: "20:00 - 21:00", host: "Mkhenara", desc: "Empowering local farmers with agricultural insights." }
    ]
  }
};

// --- Constants ---
const NAV_ITEMS: { label: string, view: View }[] = [
  { label: 'Home', view: 'home' },
  { label: 'Stations', view: 'stations' },
  { label: 'News', view: 'news' },
  { label: 'About', view: 'about' },
  { label: 'Contact', view: 'contact' },
];

// --- Components ---

const Navbar = ({ 
  setView, 
  currentView, 
  playStation,
  isMenuOpen,
  setIsMenuOpen
}: { 
  setView: (v: View) => void, 
  currentView: View, 
  playStation: (id: string) => void,
  isMenuOpen: boolean,
  setIsMenuOpen: (o: boolean) => void
}) => {
  const handleNavClick = (view: View) => {
    setView(view);
    setIsMenuOpen(false);
  };

  return (
    <nav className="w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-[60] py-4 px-6 md:px-12 flex justify-between items-center border-b border-slate-100 dark:border-slate-800 transition-all duration-500">
      <div 
        className="cursor-pointer z-[70]"
        onClick={() => handleNavClick('home')}
      >
        <img src="/logo.png" alt="FairTalk Communications" className="h-8 md:h-12 w-auto object-contain dark:brightness-0 dark:invert transition-all" />
      </div>

      <div className="hidden md:flex space-x-8 text-sm font-semibold text-slate-600 dark:text-slate-400">
        {NAV_ITEMS.map((item) => (
          <button 
            key={item.view}
            onClick={() => setView(item.view)}
            className={`transition-colors hover:text-[#20388F] dark:hover:text-[#F58220] ${currentView === item.view ? 'text-[#20388F] dark:text-[#F58220] border-b-2 border-[#F58220]' : ''}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => playStation('skyz')} 
          className="hidden sm:flex bg-[#20388F] hover:bg-[#1a2d73] text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-colors shadow-md items-center gap-2"
        >
          <Play size={14} fill="currentColor" /> Listen Live
        </button>

        {/* Unique Hamburger Menu */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 relative z-[210] focus:outline-none"
          aria-label="Toggle Menu"
        >
          <motion.span 
            animate={isMenuOpen ? { rotate: 45, y: 8, width: "100%" } : { rotate: 0, y: 0, width: "70%" }}
            className="h-1 bg-[#20388F] dark:bg-[#F58220] rounded-full block transition-all origin-center self-end"
          />
          <motion.span 
            animate={isMenuOpen ? { opacity: 0, x: -20 } : { opacity: 1, x: 0, width: "100%" }}
            className="h-1 bg-[#F58220] dark:bg-slate-100 rounded-full block transition-all"
          />
          <motion.span 
            animate={isMenuOpen ? { rotate: -45, y: -8, width: "100%" } : { rotate: 0, y: 0, width: "50%" }}
            className="h-1 bg-[#20388F] dark:bg-[#F58220] rounded-full block transition-all origin-center self-end"
          />
        </button>
      </div>
    </nav>
  );
};

const Footer = ({ setView }: { setView: (v: View) => void }) => (
  <footer className="bg-slate-800 dark:bg-slate-950 text-white py-16 px-6 md:px-12 border-t border-white/5 dark:border-slate-800 transition-colors duration-500">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-1">
        <div className="mb-6">
          <img src="/logo.png" alt="FairTalk Communications" className="h-10 md:h-12 w-auto object-contain dark:brightness-0 dark:invert opacity-90 transition-all" />
        </div>
        <p className="text-slate-400 dark:text-slate-500 text-sm leading-relaxed mb-6">
          Zimbabwe's leading regional media group, connecting communities through Skyz Metro FM and Breeze FM.
        </p>
        <div className="flex gap-4">
          <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#F58220] transition-colors"><Twitter size={18} /></a>
          <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#F58220] transition-colors"><Facebook size={18} /></a>
          <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#F58220] transition-colors"><Instagram size={18} /></a>
        </div>
      </div>
      <div>
        <h4 className="font-bold mb-6 text-slate-100">Quick Links</h4>
        <ul className="space-y-4 text-sm text-slate-400 dark:text-slate-500">
          <li><button onClick={() => setView('home')} className="hover:text-white dark:hover:text-[#F58220] transition-colors">Home</button></li>
          <li><button onClick={() => setView('about')} className="hover:text-white dark:hover:text-[#F58220] transition-colors">About Fairtalk</button></li>
          <li><button onClick={() => setView('news')} className="hover:text-white dark:hover:text-[#F58220] transition-colors">Latest News</button></li>
          <li><button onClick={() => setView('contact')} className="hover:text-white dark:hover:text-[#F58220] transition-colors">Contact & Advertising</button></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6 text-slate-100">Our Stations</h4>
        <ul className="space-y-4 text-sm text-slate-400 dark:text-slate-500">
          <li><button onClick={() => setView('skyz')} className="hover:text-white dark:hover:text-[#F58220] transition-colors">Skyz Metro FM (Bulawayo)</button></li>
          <li><button onClick={() => setView('breeze')} className="hover:text-white dark:hover:text-[#F58220] transition-colors">Breeze FM (Vic Falls)</button></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6 text-slate-100">Contact Us</h4>
        <div className="space-y-4 text-sm text-slate-400 dark:text-slate-500">
          <div className="flex gap-3">
            <MapPin size={18} className="text-[#F58220] flex-shrink-0" />
            <p>City Centre, Bulawayo, Zimbabwe</p>
          </div>
          <div className="flex gap-3">
            <Phone size={18} className="text-[#F58220] flex-shrink-0" />
            <p>+263 9 881 100</p>
          </div>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto border-t border-white/10 dark:border-slate-800 mt-16 pt-8 text-center text-xs text-slate-500">
      &copy; {new Date().getFullYear()} Fairtalk Communications. All Rights Reserved.
    </div>
  </footer>
);

const HomeView = ({ setView, playStation }: { setView: (v: View) => void, playStation: (id: string) => void }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: "The Soul of Bulawayo",
      desc: "Skyz Metro FM: Connecting the city with urban culture and local news on 100.3 FM.",
      image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2072&auto=format&fit=crop",
      action: () => setView('skyz'),
      label: "Explore Skyz Metro"
    },
    {
      title: "Voices of the Falls",
      desc: "Breeze FM: Your tourism and lifestyle companion in Victoria Falls on 91.2 FM.",
      image: "https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=2072&auto=format&fit=crop",
      action: () => setView('breeze'),
      label: "Explore Breeze FM"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="px-4 md:px-8">
        <div className="relative w-full h-[600px] rounded-lg overflow-hidden flex flex-col items-center justify-center text-center shadow-2xl bg-slate-800 dark:bg-slate-950 transition-colors duration-500">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 w-full h-full"
            >
              <img src={slides[currentSlide].image} className="absolute inset-0 w-full h-full object-cover opacity-60" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 max-w-4xl px-6 mx-auto">
                <motion.h1 
                  initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                  className="text-4xl sm:text-5xl md:text-8xl font-black text-white tracking-tighter mb-4 md:mb-6 drop-shadow-2xl"
                >
                  {slides[currentSlide].title}
                </motion.h1>
                <motion.p 
                  initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
                  className="text-white/90 text-base sm:text-lg md:text-2xl font-medium mb-8 md:mb-10 max-w-2xl mx-auto"
                >
                  {slides[currentSlide].desc}
                </motion.p>
                <motion.div 
                  initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                  className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                >
                  <button onClick={slides[currentSlide].action} className="bg-[#F58220] text-white px-8 md:px-10 py-3 md:py-4 rounded-lg font-bold hover:bg-[#d9721b] transition-all shadow-xl">
                    {slides[currentSlide].label}
                  </button>
                  <button onClick={() => playStation(currentSlide === 1 ? 'breeze' : 'skyz')} className="bg-[#20388F]/40 backdrop-blur-md border border-white/30 text-white px-8 md:px-10 py-3 md:py-4 rounded-lg font-bold hover:bg-[#20388F]/60 transition-all">
                    Listen Now
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Corporate Overview */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <img src="/logo.png" alt="FairTalk Communications" className="h-10 w-auto object-contain mb-8 dark:brightness-0 dark:invert transition-all" />
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-slate-100 mb-8 leading-tight tracking-tight">
            Connecting Communities, Empowering Voices.
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-10 text-lg leading-relaxed">
            Fairtalk Communications is more than a media company; we are the pulse of the regions we serve. Founded on the vision of cultural icons, we bridge the gap between tradition and urban lifestyle.
          </p>
          <div className="grid grid-cols-2 gap-8">
            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 transition-colors">
              <div className="text-3xl font-black text-[#F58220] mb-2">2016</div>
              <div className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase">Founded</div>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 transition-colors">
              <div className="text-3xl font-black text-[#20388F] dark:text-[#F58220] mb-2">4M+</div>
              <div className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase">Audience Reach</div>
            </div>
          </div>
          <button onClick={() => setView('about')} className="mt-12 flex items-center gap-2 font-bold text-[#20388F] dark:text-[#F58220] hover:text-[#F58220] dark:hover:text-[#20388F] transition-colors">
            Our Story <ChevronRight size={20} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-slate-900 h-64 rounded-lg overflow-hidden relative group">
              <img src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#20388F]/80 to-transparent flex items-end p-6">
                <span className="text-white font-bold text-slate-100">Local Radio</span>
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 h-48 rounded-lg flex items-center justify-center p-8 text-center italic text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-800 transition-colors">
              "We give a voice to the communities previously underserved."
            </div>
          </div>
          <div className="space-y-6 pt-12">
            <div className="bg-[#20388F] dark:bg-slate-900 h-48 rounded-lg flex flex-col justify-end p-6 text-white transition-colors">
              <Headphones size={32} className="mb-4 text-[#F58220]" />
              <div className="font-bold text-slate-100">Digital Presence</div>
              <div className="text-xs text-white/60 dark:text-slate-400">Online Streaming</div>
            </div>
            <div className="bg-blue-50 dark:bg-slate-900 h-64 rounded-lg overflow-hidden relative group transition-colors">
              <img src="https://images.unsplash.com/photo-1516280440502-a2fc9861e389?q=80&w=800" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#F58220]/80 to-transparent flex items-end p-6">
                <span className="text-white font-bold text-slate-100">Live Events</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* News Snippet */}
      <div className="bg-slate-50 dark:bg-slate-900/50 py-24 px-6 md:px-12 transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-4 transition-colors">Latest from Fairtalk News</h2>
              <p className="text-slate-500 dark:text-slate-400 transition-colors">Breaking stories from Matabeleland and Victoria Falls.</p>
            </div>
            <button onClick={() => setView('news')} className="text-[#20388F] dark:text-[#F58220] font-bold flex items-center gap-1 hover:underline transition-colors">
              View all news <ExternalLink size={16} />
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all cursor-pointer group">
                <div className="text-xs font-bold text-[#F58220] mb-3">REGIONAL NEWS</div>
                <h3 className="font-bold text-lg mb-3 leading-snug text-slate-800 dark:text-slate-100 group-hover:text-[#20388F] dark:group-hover:text-[#F58220] transition-colors">
                  {i === 1 ? "Fairtalk Communications Announces 2026 Strategic Growth Initiative" : 
                   i === 2 ? "Skyz Metro FM celebrates 8 years of broadcasting in Bulawayo" : 
                   "Breeze FM expands transmission reach to Hwange rural areas"}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-4">
                  Stay updated with the latest corporate developments and regional milestones from our stations.
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
                  <Clock size={12} /> March 29, 2026
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StationsView = ({ setView }: { setView: (v: View) => void }) => (
  <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
    <div className="text-center mb-20">
      <h1 className="text-5xl font-black text-slate-800 dark:text-slate-100 mb-6 tracking-tight transition-colors">Our Broadcasting Network</h1>
      <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed transition-colors">
        From the urban heart of Bulawayo to the thunderous falls of the Zambezi, our stations define the regional soundscape.
      </p>
    </div>
    
    <div className="grid md:grid-cols-2 gap-12 mb-20">
      {Object.values(STATIONS).map((station) => (
        <div key={station.id} className="group relative rounded-lg overflow-hidden shadow-2xl bg-slate-800 dark:bg-slate-950 aspect-[4/5] md:aspect-[4/3] transition-all duration-500">
          <img src={station.image} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent p-10 flex flex-col justify-end">
            <div className="bg-[#F58220] text-white px-4 py-2 rounded-full text-sm font-bold w-fit mb-6 shadow-lg">
              {station.freq}
            </div>
            <h2 className="text-4xl font-black text-white mb-4 tracking-tighter">{station.name}</h2>
            <p className="text-white/80 mb-8 max-w-md">{station.desc}</p>
            <div className="flex gap-4">
              <button onClick={() => setView(station.id as View)} className="bg-white dark:bg-slate-800 text-[#20388F] dark:text-slate-100 px-8 py-3 rounded-full font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
                View Station
              </button>
              <button className="bg-[#20388F]/40 text-white border border-white/30 px-8 py-3 rounded-full font-bold hover:bg-[#20388F]/60 transition-all backdrop-blur-sm">
                Live Stream
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const StationDetailView = ({ station, playStation }: { station: Station, playStation: (id: string) => void }) => (
  <div className="pb-20">
    {/* Header */}
    <div className="relative h-[400px] bg-slate-800 dark:bg-slate-950 overflow-hidden transition-colors duration-500">
      <img src={station.image} className="absolute inset-0 w-full h-full object-cover opacity-50" />
      <div className="absolute inset-0 flex items-center px-6 md:px-12">
        <div className="max-w-4xl">
          <div className="bg-[#F58220] text-white px-4 py-1 rounded-full text-sm font-bold w-fit mb-4">{station.freq}</div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4">{station.name}</h1>
          <p className="text-xl text-white/90 font-medium italic mb-8">"{station.tagline}"</p>
          <button 
            onClick={() => playStation(station.id)}
            className="bg-[#20388F] text-white px-10 py-4 rounded-full font-bold hover:bg-[#1a2d73] transition-all shadow-xl flex items-center gap-2"
          >
            <Play size={20} fill="currentColor" /> Listen Live
          </button>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 md:px-12 mt-20 grid lg:grid-cols-3 gap-16">
      {/* Main Info */}
      <div className="lg:col-span-2 space-y-20">
        <section>
          <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-8 flex items-center gap-3 transition-colors">
            <Clock className="text-[#F58220]" /> Program Schedule
          </h2>
          <div className="space-y-4">
            {station.shows.map((show, i) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-900 p-6 rounded-lg border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition-all">
                <div>
                  <div className="text-[#20388F] dark:text-[#F58220] font-bold text-sm mb-1 transition-colors">{show.time}</div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1 transition-colors">{show.name}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm transition-colors">{show.desc}</p>
                </div>
                <div className="flex items-center gap-3 bg-white dark:bg-slate-950 px-4 py-2 rounded-lg border border-slate-100 dark:border-slate-800 group-hover:border-[#20388F]/30 dark:group-hover:border-[#F58220]/30 transition-colors">
                  <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 dark:text-slate-500 transition-colors">
                    <Mic2 size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase transition-colors">Host</div>
                    <div className="text-sm font-bold text-slate-700 dark:text-slate-200 transition-colors">{show.host}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-8 flex items-center gap-3 transition-colors">
            <Users className="text-[#F58220]" /> The On-Air Team
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {station.hosts.map((host, i) => (
              <div key={i} className="text-center group cursor-pointer">
                <div className="aspect-square bg-slate-50 dark:bg-slate-900 rounded-lg mb-4 overflow-hidden border-2 border-transparent group-hover:border-[#20388F] dark:group-hover:border-[#F58220] transition-all">
                  <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-600 transition-colors">
                    <Users size={40} />
                  </div>
                </div>
                <h4 className="font-bold text-slate-800 dark:text-slate-100 transition-colors">{host}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 transition-colors">Broadcaster</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Sidebar */}
      <div className="space-y-10">
        <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-lg border border-slate-100 dark:border-slate-800 transition-colors">
          <h3 className="font-black text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2 transition-colors">
            <MapPin size={20} className="text-[#F58220]" /> Station Location
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed transition-colors">
            {station.id === 'skyz' ? 
              "Broadcasting live from the heart of the City of Kings, Skyz Metro FM serves Bulawayo and the surrounding Matabeleland regions." : 
              "Broadcasting from the majestic Victoria Falls, Breeze FM serves the Hwange district and the resort town's vibrant tourism community."
            }
          </p>
          <div className="flex items-center gap-2 text-sm font-bold text-[#20388F] dark:text-[#F58220] cursor-pointer hover:underline transition-colors">
            <Map size={16} /> View coverage map
          </div>
        </div>

        <div className="bg-[#20388F] dark:bg-slate-900 p-8 rounded-lg text-white shadow-xl transition-colors duration-500">
          <div className="flex justify-center mb-6">
            <img src="/logo.png" alt="FairTalk Logo" className="h-12 w-auto object-contain dark:brightness-0 dark:invert transition-all" />
          </div>
          <h3 className="font-black mb-4 text-center text-slate-100">Advertise With Us</h3>
          <p className="text-white/80 dark:text-slate-400 text-sm mb-6 leading-relaxed text-center transition-colors">
            Connect your brand with the most engaged audience in the region. We offer customized advertising slots and sponsorships.
          </p>
          <button className="w-full bg-[#F58220] py-3 rounded-full font-bold text-sm hover:bg-[#d9721b] transition-colors shadow-lg">
            Get Rate Card
          </button>
        </div>
      </div>
    </div>
  </div>
);

const AboutView = () => (
  <div className="max-w-5xl mx-auto px-6 md:px-12 py-20 space-y-24">
    <section className="text-center">
      <div className="flex justify-center mb-12">
        <img src="/logo.png" alt="FairTalk Communications" className="h-24 w-auto object-contain dark:brightness-0 dark:invert transition-all" />
      </div>
      <h1 className="text-6xl font-black text-slate-800 dark:text-slate-100 mb-8 tracking-tighter transition-colors">Our Legacy</h1>
      <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto transition-colors">
        Fairtalk Communications was built on the foundation of authentic storytelling. Co-founded by the legendary cultural pioneer <strong>Cont Mhlanga</strong>, our mission has always been to represent the voices of Zimbabwe's vibrant regions.
      </p>
    </section>

    <div className="grid md:grid-cols-2 gap-16 items-center">
      <div className="aspect-[4/5] bg-slate-50 dark:bg-slate-900 rounded-lg overflow-hidden relative shadow-xl border border-slate-100 dark:border-slate-800 transition-colors">
        <div className="absolute inset-0 flex items-center justify-center text-slate-200 dark:text-slate-800 transition-colors">
          <Users size={80} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-slate-900 to-transparent text-white">
          <h4 className="font-bold text-xl text-slate-100">Cont Mhlanga</h4>
          <p className="text-sm opacity-80 text-slate-300">Founder & Cultural Icon</p>
        </div>
      </div>
      <div className="space-y-8">
        <h2 className="text-4xl font-black text-slate-800 dark:text-slate-100 transition-colors">A Vision for Local Voices</h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">
          Before Skyz Metro FM, Bulawayo lacked a dedicated commercial radio voice. Our launch in 2016 broke new ground, providing a platform for local artists, Ndebele culture, and community-driven news.
        </p>
        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-[#F58220]/10 flex items-center justify-center text-[#F58220] flex-shrink-0"><Shield size={20} /></div>
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-100 transition-colors">Cultural Integrity</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors">Preserving and promoting the languages and traditions of the region.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-[#20388F]/10 flex items-center justify-center text-[#20388F] dark:text-[#F58220] flex-shrink-0 transition-colors"><Headphones size={20} /></div>
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-100 transition-colors">Media Excellence</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors">Delivering high-quality broadcasting with state-of-the-art technology.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section className="bg-slate-50 dark:bg-slate-900 p-12 rounded-lg border border-slate-100 dark:border-slate-800 text-center shadow-sm transition-colors duration-500">
      <h3 className="text-2xl font-black text-[#20388F] dark:text-[#F58220] mb-4 transition-colors">Innovation & Growth</h3>
      <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto transition-colors">
        Fairtalk Communications continues to expand its reach and innovate in the digital media space, bringing cutting-edge broadcasting solutions to the Matabeleland and Victoria Falls regions.
      </p>
    </section>
  </div>
);

const NewsView = () => {
  const news = [
    {
      id: 1,
      category: "CORPORATE",
      title: "Fairtalk Communications Outlines 5-Year Digital Transformation Roadmap",
      date: "March 25, 2026",
      excerpt: "The media group is set to invest heavily in streaming technologies and interactive digital platforms to better serve its growing global audience.",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800"
    },
    {
      id: 2,
      category: "REGIONAL",
      title: "Skyz Metro FM Announces 2026 'Soul of the City' Music Awards",
      date: "March 20, 2026",
      excerpt: "Bulawayo's premier radio station is set to honor local artists who have dominated the airwaves over the past year.",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800"
    },
    {
      id: 3,
      category: "TOURISM",
      title: "Breeze FM to Host Victoria Falls Tourism Symposium",
      date: "March 15, 2026",
      excerpt: "In partnership with local stakeholders, Breeze FM will lead a discussion on the future of sustainable tourism in the Hwange district.",
      image: "https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=800"
    },
    {
      id: 4,
      category: "COMMUNITY",
      title: "Fairtalk News Expands Coverage in Matabeleland South",
      date: "March 10, 2026",
      excerpt: "New transmission infrastructure brings clear signals and local reporting to communities in Gwanda and Filabusi.",
      image: "https://images.unsplash.com/photo-1493225457124-a1a2a5f09624?q=80&w=800"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
      <div className="mb-16">
        <img src="/logo.png" alt="FairTalk Communications" className="h-12 w-auto object-contain mb-6 dark:brightness-0 dark:invert transition-all" />
        <h1 className="text-5xl font-black text-slate-800 dark:text-slate-100 mb-4 tracking-tight transition-colors">Fairtalk News</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg transition-colors">The definitive voice of the regions.</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-12">
          {news.map((item) => (
            <div key={item.id} className="group flex flex-col md:flex-row gap-8 bg-white dark:bg-slate-900 p-4 rounded-lg hover:shadow-xl transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
              <div className="w-full md:w-64 h-48 rounded-lg overflow-hidden flex-shrink-0">
                <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="flex-1 py-2">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-black bg-[#20388F]/10 dark:bg-[#F58220]/10 text-[#20388F] dark:text-[#F58220] px-2 py-1 rounded uppercase tracking-widest">{item.category}</span>
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">{item.date}</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4 group-hover:text-[#F58220] transition-colors">{item.title}</h2>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6 transition-colors">{item.excerpt}</p>
                <button className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-[#20388F] dark:hover:text-[#F58220] transition-colors">
                  Read Full Story <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <aside className="space-y-10">
          <div className="bg-[#20388F] dark:bg-slate-900 rounded-lg p-8 text-white shadow-xl transition-colors duration-500">
            <h3 className="font-bold text-xl mb-6 text-slate-100">Trending Now</h3>
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-4 group cursor-pointer">
                  <div className="text-2xl font-black text-white/20 dark:text-white/10 group-hover:text-[#F58220] transition-colors">0{i}</div>
                  <p className="text-sm font-bold text-white/80 dark:text-slate-300 leading-snug transition-colors">
                    {i === 1 ? "Top 10 Bulawayo artists to watch this month" : 
                     i === 2 ? "How the new Hwange unit is impacting local industry" : 
                     "Victoria Falls prepares for peak tourism season"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#F58220]/5 dark:bg-slate-900/50 rounded-lg p-8 border border-[#F58220]/20 dark:border-slate-800 transition-colors duration-500">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 transition-colors">News Tip?</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 transition-colors">Have a story from your community? Send it to our newsroom.</p>
            <button className="w-full bg-[#F58220] text-white py-3 rounded-lg font-bold text-sm shadow-md hover:bg-[#d9721b] transition-colors">Submit Tip</button>
          </div>
        </aside>
      </div>
    </div>
  );
};

const ContactView = () => (
  <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
    <div className="text-center mb-20">
      <h1 className="text-5xl font-black text-slate-800 dark:text-slate-100 mb-4 tracking-tight transition-colors">Connect With Us</h1>
      <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto transition-colors">
        Whether you're looking to advertise, share a story, or join our team, we're just a message away.
      </p>
    </div>

    <div className="grid lg:grid-cols-2 gap-20">
      <div>
        <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-10 transition-colors">Our Offices</h2>
        <div className="space-y-12">
          <div className="flex gap-6">
            <div className="w-14 h-14 bg-slate-50 dark:bg-slate-900 rounded-lg flex items-center justify-center text-[#20388F] dark:text-[#F58220] flex-shrink-0 border border-slate-100 dark:border-slate-800 transition-colors">
              <MapPin size={28} />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-2 transition-colors">Bulawayo (HQ)</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed transition-colors">
                City Centre, Bulawayo<br />
                Zimbabwe
              </p>
              <p className="mt-4 font-bold text-[#F58220]">+263 9 881 100</p>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="w-14 h-14 bg-slate-50 dark:bg-slate-900 rounded-lg flex items-center justify-center text-[#20388F] dark:text-[#F58220] flex-shrink-0 border border-slate-100 dark:border-slate-800 transition-colors">
              <MapPin size={28} />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-2 transition-colors">Victoria Falls</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed transition-colors">
                Victoria Falls<br />
                Zimbabwe
              </p>
              <p className="mt-4 font-bold text-[#F58220]">+263 13 42100</p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-16 border-t border-slate-100 dark:border-slate-800 transition-colors">
          <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-6 transition-colors">Follow Our Journey</h3>
          <div className="flex gap-4">
            <a href="#" className="w-12 h-12 rounded-lg bg-[#1E293B] dark:bg-slate-800 text-white flex items-center justify-center hover:bg-[#20388F] dark:hover:bg-[#F58220] transition-colors"><Twitter size={20} /></a>
            <a href="#" className="w-12 h-12 rounded-lg bg-[#1E293B] dark:bg-slate-800 text-white flex items-center justify-center hover:bg-[#20388F] dark:hover:bg-[#F58220] transition-colors"><Facebook size={20} /></a>
            <a href="#" className="w-12 h-12 rounded-lg bg-[#1E293B] dark:bg-slate-800 text-white flex items-center justify-center hover:bg-[#20388F] dark:hover:bg-[#F58220] transition-colors"><Instagram size={20} /></a>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-900 p-10 md:p-12 rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm transition-colors duration-500">
        <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-8 transition-colors">Send a Message</h2>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
              <input type="text" className="w-full bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-lg focus:outline-none focus:border-[#20388F] dark:focus:border-[#F58220] transition-colors" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
              <input type="email" className="w-full bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-lg focus:outline-none focus:border-[#20388F] dark:focus:border-[#F58220] transition-colors" placeholder="john@example.com" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Inquiry Type</label>
            <select className="w-full bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-lg focus:outline-none focus:border-[#20388F] dark:focus:border-[#F58220] transition-colors">
              <option className="dark:bg-slate-800">Advertising / Sales</option>
              <option className="dark:bg-slate-800">Newsroom / Tip</option>
              <option className="dark:bg-slate-800">Program Feedback</option>
              <option className="dark:bg-slate-800">Career Opportunities</option>
              <option className="dark:bg-slate-800">General Inquiry</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Message</label>
            <textarea className="w-full bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-lg focus:outline-none focus:border-[#20388F] dark:focus:border-[#F58220] transition-colors h-40" placeholder="How can we help you?"></textarea>
          </div>
          <button className="w-full bg-[#20388F] dark:bg-[#F58220] text-white py-4 rounded-lg font-bold hover:bg-[#1a2d73] dark:hover:bg-[#d9721b] transition-all shadow-lg flex items-center justify-center gap-2">
            Send Message <ChevronRight size={18} />
          </button>
        </form>
      </div>
    </div>
  </div>
);

const RadioPlayer = ({ 
  isPlaying, 
  setIsPlaying, 
  activeStationId, 
  setActiveStationId, 
  isPlayerVisible, 
  setIsPlayerVisible 
}: any) => {
  if (!isPlayerVisible) return null;
  const station = STATIONS[activeStationId] || STATIONS.skyz;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-lg shadow-2xl border border-slate-100 dark:border-slate-800 z-50 overflow-hidden transition-colors duration-500"
      >
        <div className="flex flex-col md:flex-row items-center p-4 gap-6">
          {/* Cover/Logo */}
          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 relative group cursor-pointer border border-slate-50 dark:border-slate-800 shadow-sm">
            <img src={station.image} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-slate-900/10 flex items-center justify-center">
              <Radio size={24} className="text-white drop-shadow-md" />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left min-w-0">
            <div className="text-[#F58220] text-[10px] font-black uppercase tracking-widest mb-1 flex items-center justify-center md:justify-start gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span> Live Broadcast
            </div>
            <h3 className="text-slate-800 dark:text-slate-100 font-bold text-lg truncate transition-colors">{station.name}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs truncate font-medium transition-colors">{station.freq} - {station.tagline}</p>
            
            {/* Quick Switch */}
            <div className="flex gap-2 mt-2 justify-center md:justify-start">
              <button 
                onClick={() => setActiveStationId('skyz')}
                className={`text-[10px] px-3 py-1 rounded-full font-bold transition-all ${activeStationId === 'skyz' ? 'bg-[#20388F] dark:bg-[#F58220] text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
              >
                SKYZ
              </button>
              <button 
                onClick={() => setActiveStationId('breeze')}
                className={`text-[10px] px-3 py-1 rounded-full font-bold transition-all ${activeStationId === 'breeze' ? 'bg-[#20388F] dark:bg-[#F58220] text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
              >
                BREEZE
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-6">
            {isPlaying && (
              <div className="hidden md:flex items-end gap-1 h-6">
                {[...Array(5)].map((_, i) => (
                  <motion.div key={i} className="w-1 bg-[#20388F] dark:bg-[#F58220] rounded-t-full" animate={{ height: ['20%', '100%', '40%'] }} transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }} />
                ))}
              </div>
            )}
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full bg-[#20388F] dark:bg-[#F58220] text-white flex items-center justify-center hover:bg-[#1a2d73] dark:hover:bg-[#d9721b] transition-all shadow-xl"
            >
              {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
            </button>
            <button onClick={() => setIsPlayerVisible(false)} className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// --- Theme Toggle ---

const ThemeToggle = ({ theme, setTheme }: { theme: 'dark' | 'light', setTheme: (t: 'dark' | 'light') => void }) => (
  <button
    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    className="fixed bottom-10 right-10 z-[100] p-4 rounded-full bg-white dark:bg-slate-800 shadow-2xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:scale-110 transition-all active:scale-95 group"
    aria-label="Toggle Theme"
  >
    {theme === 'dark' ? <Sun size={28} className="group-hover:rotate-45 transition-transform" /> : <Moon size={28} className="group-hover:-rotate-12 transition-transform" />}
  </button>
);

// --- Main App ---

export default function App() {
  const [view, setView] = useState<View>('home');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeStationId, setActiveStationId] = useState('skyz');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const playStation = (id: string) => {
    setActiveStationId(id);
    setIsPlaying(true);
    setIsPlayerVisible(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [theme]);

  return (
    <div className={`min-h-screen font-sans selection:bg-[#F58220] selection:text-white pb-10 transition-colors duration-500 ${theme === 'dark' ? 'dark bg-slate-950 text-slate-100' : 'bg-white text-slate-900'}`}>
      <Navbar 
        setView={setView} 
        currentView={view} 
        playStation={playStation} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white dark:bg-slate-950 z-[200] flex flex-col md:hidden"
          >
            <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-800">
              <img src="/logo.png" alt="FairTalk" className="h-8 w-auto dark:brightness-0 dark:invert" />
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                <X size={32} />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center px-10 space-y-8">
              {NAV_ITEMS.map((item, idx) => (
                <motion.button 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  key={item.view}
                  onClick={() => { setView(item.view); setIsMenuOpen(false); }}
                  className="text-left group"
                >
                  <span className={`text-5xl font-black block transition-all ${view === item.view ? 'text-[#F58220] translate-x-4' : 'text-slate-800 dark:text-slate-100 group-hover:translate-x-2'}`}>
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </div>

            <div className="p-10 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <button 
                onClick={() => { playStation('skyz'); setIsMenuOpen(false); }}
                className="w-full bg-[#20388F] text-white py-5 rounded-lg text-lg font-bold flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-transform"
              >
                <Play fill="currentColor" /> Listen Live Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {view === 'home' && <HomeView setView={setView} playStation={playStation} />}
            {view === 'stations' && <StationsView setView={setView} />}
            {view === 'skyz' && <StationDetailView station={STATIONS.skyz} playStation={playStation} />}
            {view === 'breeze' && <StationDetailView station={STATIONS.breeze} playStation={playStation} />}
            {view === 'about' && <AboutView />}
            {view === 'news' && <NewsView />}
            {view === 'contact' && <ContactView />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer setView={setView} />
      
      <RadioPlayer 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying} 
        activeStationId={activeStationId} 
        setActiveStationId={setActiveStationId}
        isPlayerVisible={isPlayerVisible}
        setIsPlayerVisible={setIsPlayerVisible}
      />

      <ThemeToggle theme={theme} setTheme={setTheme} />
    </div>
  );
}
