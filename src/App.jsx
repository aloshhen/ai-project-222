import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import SafeIcon from './components/SafeIcon';

// SafeIcon wrapper for inline usage
const Icon = ({ name, size = 24, className = '' }) => (
  <SafeIcon name={name} size={size} className={className} />
);

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// News Data
const newsData = [
  {
    id: 1,
    title: "CS2 Major Championship 2024",
    excerpt: "Расписание и формат нового мейджора по Counter-Strike 2 в Копенгагене",
    date: "15 Мар 2024",
    category: "Турниры",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80"
  },
  {
    id: 2,
    title: "Обновление игрового движка",
    excerpt: "Valve выпустила крупное обновление с улучшением производительности",
    date: "12 Мар 2024",
    category: "Обновления",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80"
  },
  {
    id: 3,
    title: "Трансферы про-сцены",
    excerpt: "Крупнейшие переходы игроков в межсезонье 2024 года",
    date: "10 Мар 2024",
    category: "Команды",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80"
  }
];

// Teams Data
const teamsData = [
  { name: "NAVI", rank: 1, region: "EU", players: ["s1mple", "b1t", "jL", "iM", "Aleksib"] },
  { name: "FaZe Clan", rank: 2, region: "EU", players: ["karrigan", "rain", "ropz", "frozen", "broky"] },
  { name: "G2 Esports", rank: 3, region: "EU", players: ["HooXi", "NiKo", "m0NESY", "huNter-", "nexa"] },
  { name: "Vitality", rank: 4, region: "EU", players: ["apEX", "ZywOo", "flameZ", "Spinx", "mezii"] },
  { name: "Spirit", rank: 5, region: "CIS", players: ["chopper", "sh1ro", "zont1x", "donk", "magixx"] },
  { name: "MOUZ", rank: 6, region: "EU", players: ["siuhy", "Jimpphat", "torzsi", "xertioN", "Brollan"] }
];

// Tournaments Data
const tournamentsData = [
  {
    name: "PGL Major Copenhagen 2024",
    prize: "$1,250,000",
    date: "17-31 Мар 2024",
    location: "Копенгаген, Дания",
    tier: "Major",
    status: "active"
  },
  {
    name: "IEM Katowice 2024",
    prize: "$1,000,000",
    date: "31 Янв - 11 Фев",
    location: "Катовице, Польша",
    tier: "IEM",
    status: "completed"
  },
  {
    name: "BLAST Premier Spring Final",
    prize: "$425,000",
    date: "12-16 Июн 2024",
    location: "Лондон, UK",
    tier: "BLAST",
    status: "upcoming"
  },
  {
    name: "ESL Pro League Season 19",
    prize: "$750,000",
    date: "23 Апр - 12 Май",
    location: "Онлайн / Мальта",
    tier: "ESL",
    status: "upcoming"
  }
];

// Section Component with scroll animation
const AnimatedSection = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// News Card Component
const NewsCard = ({ news, index }) => (
  <motion.article
    variants={fadeInUp}
    className="group bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-[1.02]"
  >
    <div className="relative h-48 overflow-hidden">
      <img 
        src={news.image} 
        alt={news.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute top-4 left-4">
        <span className="bg-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full">
          {news.category}
        </span>
      </div>
    </div>
    <div className="p-6">
      <div className="flex items-center gap-2 text-slate-400 text-sm mb-3">
        <Icon name="calendar" size={14} />
        <span>{news.date}</span>
      </div>
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
        {news.title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed">
        {news.excerpt}
      </p>
      <button className="mt-4 flex items-center gap-2 text-orange-500 font-semibold text-sm hover:text-orange-400 transition-colors">
        Читать далее
        <Icon name="arrow-right" size={16} />
      </button>
    </div>
  </motion.article>
);

// Team Card Component
const TeamCard = ({ team, index }) => (
  <motion.div
    variants={fadeInUp}
    className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl border border-slate-700/50 hover:border-orange-500/30 transition-all duration-300 hover:transform hover:-translate-y-1"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center font-black text-black text-lg">
          {team.name.substring(0, 2).toUpperCase()}
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">{team.name}</h3>
          <span className="text-slate-400 text-xs">{team.region}</span>
        </div>
      </div>
      <div className="text-right">
        <div className="text-2xl font-black text-orange-500">#{team.rank}</div>
        <div className="text-slate-500 text-xs">Рейтинг</div>
      </div>
    </div>
    <div className="space-y-2">
      <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Состав:</p>
      <div className="flex flex-wrap gap-2">
        {team.players.map((player, idx) => (
          <span 
            key={idx}
            className="bg-slate-800 text-slate-300 text-xs px-2 py-1 rounded-md border border-slate-700"
          >
            {player}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

// Tournament Card Component
const TournamentCard = ({ tournament, index }) => {
  const statusColors = {
    active: "bg-green-500/20 text-green-400 border-green-500/30",
    completed: "bg-slate-700/50 text-slate-400 border-slate-600",
    upcoming: "bg-orange-500/20 text-orange-400 border-orange-500/30"
  };
  
  const statusText = {
    active: "Идёт сейчас",
    completed: "Завершён",
    upcoming: "Предстоит"
  };

  return (
    <motion.div
      variants={fadeInUp}
      className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl border border-slate-700/50 hover:border-orange-500/30 transition-all duration-300 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full -mr-16 -mt-16 blur-3xl" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${statusColors[tournament.status]}`}>
            {statusText[tournament.status]}
          </span>
          <span className="text-orange-500 font-bold text-sm">{tournament.tier}</span>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2">{tournament.name}</h3>
        
        <div className="space-y-3 mt-4">
          <div className="flex items-center gap-3 text-slate-400">
            <Icon name="trophy" size={16} className="text-orange-500" />
            <span className="text-white font-semibold">{tournament.prize}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <Icon name="calendar" size={16} className="text-orange-500" />
            <span>{tournament.date}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <Icon name="map-pin" size={16} className="text-orange-500" />
            <span>{tournament.location}</span>
          </div>
        </div>
        
        <button className="mt-6 w-full bg-slate-800 hover:bg-orange-500 hover:text-black text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
          Подробнее
          <Icon name="chevron-right" size={16} />
        </button>
      </div>
    </motion.div>
  );
};

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-x-hidden">
      {/* HEADER */}
      <header className="fixed top-0 w-full bg-slate-950/90 backdrop-blur-xl z-50 border-b border-slate-800/50">
        <nav className="container mx-auto max-w-7xl px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Icon name="target" size={24} className="text-black" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                CS<span className="text-orange-500">:GO</span>
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#news" onClick={(e) => scrollToSection(e, 'news')} className="text-slate-300 hover:text-orange-500 font-medium transition-colors">
                Новости
              </a>
              <a href="#teams" onClick={(e) => scrollToSection(e, 'teams')} className="text-slate-300 hover:text-orange-500 font-medium transition-colors">
                Команды
              </a>
              <a href="#tournaments" onClick={(e) => scrollToSection(e, 'tournaments')} className="text-slate-300 hover:text-orange-500 font-medium transition-colors">
                Турниры
              </a>
              <button className="bg-orange-500 hover:bg-orange-600 text-black font-bold px-6 py-2.5 rounded-lg transition-all transform hover:scale-105 flex items-center gap-2">
                <Icon name="gamepad-2" size={18} />
                Играть
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name={mobileMenuOpen ? "x" : "menu"} size={24} />
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 pb-4 border-t border-slate-800 pt-4 space-y-3"
              >
                <a href="#news" onClick={(e) => scrollToSection(e, 'news')} className="block text-slate-300 hover:text-orange-500 font-medium py-2">
                  Новости
                </a>
                <a href="#teams" onClick={(e) => scrollToSection(e, 'teams')} className="block text-slate-300 hover:text-orange-500 font-medium py-2">
                  Команды
                </a>
                <a href="#tournaments" onClick={(e) => scrollToSection(e, 'tournaments')} className="block text-slate-300 hover:text-orange-500 font-medium py-2">
                  Турниры
                </a>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Icon name="gamepad-2" size={18} />
                  Играть
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/90 to-slate-950" />
        
        <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              <span className="text-orange-400 font-semibold text-sm">PGL Major Copenhagen 2024 уже начался!</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight">
              COUNTER
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                STRIKE
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Легендарный тактический шутер. Присоединяйтесь к миллионам игроков по всему миру и станьте частью киберспортивной истории.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-orange-500 hover:bg-orange-600 text-black font-bold px-8 py-4 rounded-xl text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg shadow-orange-500/25">
                <Icon name="download" size={20} />
                Скачать бесплатно
              </button>
              <button className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all border border-slate-700 flex items-center justify-center gap-3">
                <Icon name="play" size={20} />
                Смотреть трансляции
              </button>
            </div>
            
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-white mb-1">35M+</div>
                <div className="text-slate-500 text-sm">Игроков</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-orange-500 mb-1">$100M+</div>
                <div className="text-slate-500 text-sm">Призовых</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-white mb-1">10+</div>
                <div className="text-slate-500 text-sm">Лет истории</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* NEWS SECTION */}
      <section id="news" className="py-20 md:py-32 bg-slate-950/50">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <AnimatedSection>
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-2">
                  Последние <span className="text-orange-500">новости</span>
                </h2>
                <p className="text-slate-400">Актуальные события мира CS:GO</p>
              </div>
              <button className="hidden md:flex items-center gap-2 text-orange-500 font-semibold hover:text-orange-400 transition-colors">
                Все новости
                <Icon name="arrow-right" size={20} />
              </button>
            </div>
          </AnimatedSection>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {newsData.map((news, index) => (
              <NewsCard key={news.id} news={news} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* TEAMS SECTION */}
      <section id="teams" className="py-20 md:py-32">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Про-<span className="text-orange-500">команды</span>
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Лучшие коллективы мировой сцены Counter-Strike. Следите за их выступлениями на крупнейших турнирах.
              </p>
            </div>
          </AnimatedSection>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {teamsData.map((team, index) => (
              <TeamCard key={team.name} team={team} index={index} />
            ))}
          </motion.div>

          <AnimatedSection className="mt-12 text-center">
            <button className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-8 py-4 rounded-xl transition-all border border-slate-700 inline-flex items-center gap-2">
              <Icon name="users" size={20} />
              Все команды
            </button>
          </AnimatedSection>
        </div>
      </section>

      {/* TOURNAMENTS SECTION */}
      <section id="tournaments" className="py-20 md:py-32 bg-gradient-to-b from-slate-950/50 to-slate-900/50">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Турниры и <span className="text-orange-500">события</span>
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Крупнейшие чемпионаты по CS:GO с многомиллионными призовыми фондами
              </p>
            </div>
          </AnimatedSection>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {tournamentsData.map((tournament, index) => (
              <TournamentCard key={tournament.name} tournament={tournament} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-orange-900/20" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1920&q=80')] bg-cover bg-center opacity-5" />
        
        <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                Готовы к <span className="text-orange-500">бою?</span>
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Присоединяйтесь к сообществу из 35 миллионов игроков. Скачайте CS:GO бесплатно и начните свой путь к профессиональной сцене.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-orange-500 hover:bg-orange-600 text-black font-bold px-10 py-5 rounded-xl text-lg transition-all transform hover:scale-105 shadow-xl shadow-orange-500/25 flex items-center justify-center gap-3">
                  <Icon name="download" size={22} />
                  Начать играть
                </button>
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold px-10 py-5 rounded-xl text-lg transition-all border border-white/20 flex items-center justify-center gap-3">
                  <Icon name="video" size={22} />
                  Смотреть Major
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-800/50 py-12 md:py-16">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <Icon name="target" size={24} className="text-black" />
                </div>
                <span className="text-2xl font-black text-white">
                  CS<span className="text-orange-500">:GO</span>
                </span>
              </div>
              <p className="text-slate-400 max-w-sm mb-6">
                Counter-Strike: Global Offensive — легендарный тактический шутер от Valve. Играйте бесплатно на PC, PlayStation и Xbox.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-orange-500 hover:text-black text-slate-400 rounded-lg flex items-center justify-center transition-all">
                  <Icon name="twitter" size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-orange-500 hover:text-black text-slate-400 rounded-lg flex items-center justify-center transition-all">
                  <Icon name="youtube" size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-orange-500 hover:text-black text-slate-400 rounded-lg flex items-center justify-center transition-all">
                  <Icon name="twitch" size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-orange-500 hover:text-black text-slate-400 rounded-lg flex items-center justify-center transition-all">
                  <Icon name="instagram" size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Разделы</h4>
              <ul className="space-y-3">
                <li><a href="#news" onClick={(e) => scrollToSection(e, 'news')} className="text-slate-400 hover:text-orange-500 transition-colors">Новости</a></li>
                <li><a href="#teams" onClick={(e) => scrollToSection(e, 'teams')} className="text-slate-400 hover:text-orange-500 transition-colors">Команды</a></li>
                <li><a href="#tournaments" onClick={(e) => scrollToSection(e, 'tournaments')} className="text-slate-400 hover:text-orange-500 transition-colors">Турниры</a></li>
                <li><a href="#" className="text-slate-400 hover:text-orange-500 transition-colors">Обновления</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Поддержка</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-400 hover:text-orange-500 transition-colors">Справочный центр</a></li>
                <li><a href="#" className="text-slate-400 hover:text-orange-500 transition-colors">Сообщество Steam</a></li>
                <li><a href="#" className="text-slate-400 hover:text-orange-500 transition-colors">Связаться с нами</a></li>
                <li><a href="#" className="text-slate-400 hover:text-orange-500 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © 2024 Valve Corporation. Все права защищены.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-slate-500 text-sm">Powered by</span>
              <div className="flex items-center gap-2 text-slate-400">
                <Icon name="steam" size={20} />
                <span className="font-bold">Steam</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;