import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Globe, Heart, Users, Target, Gift, ExternalLink, QrCode, Sparkles, Github } from 'lucide-react';
import "./Home.css";

// Composant Fluid Background
const FluidBackground = ({ isDark }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Initialiser les particules avec couleurs adaptées au thème
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 150; i++) {
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * (isDark ? 0.5 : 0.3) + (isDark ? 0.2 : 0.1),
          hue: isDark ? Math.random() * 60 + 240 : Math.random() * 60 + 200 // Violet foncé / Bleu clair
        });
      }
    };

    initParticles();

    const animate = () => {
      // Couleur de fond adaptée au thème
      ctx.fillStyle = isDark ? 'rgba(15, 23, 42, 0.1)' : 'rgba(248, 250, 252, 0.1';
      ctx.fillRect(0, 0, width, height);

      particlesRef.current.forEach((particle, index) => {
        // Attraction vers la souris
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
          const force = (200 - distance) / 200;
          particle.vx += (dx / distance) * force * 0.1;
          particle.vy += (dy / distance) * force * 0.1;
        }

        // Mouvement
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Friction
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Rebond sur les bords
        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;

        // Garder dans les limites
        particle.x = Math.max(0, Math.min(width, particle.x));
        particle.y = Math.max(0, Math.min(height, particle.y));

        // Dessiner la particule avec couleurs adaptées
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        const saturation = isDark ? 70 : 60;
        const lightness = isDark ? 60 : 70;
        ctx.fillStyle = `hsla(${particle.hue}, ${saturation}%, ${lightness}%, ${particle.opacity})`;
        ctx.fill();

        // Connexions entre particules proches
        particlesRef.current.slice(index + 1).forEach(otherParticle => {
          const dx2 = particle.x - otherParticle.x;
          const dy2 = particle.y - otherParticle.y;
          const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          
          if (distance2 < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            const connectionOpacity = isDark ? 0.1 : 0.08;
            const saturation = isDark ? 70 : 50;
            const lightness = isDark ? 60 : 80;
            ctx.strokeStyle = `hsla(${particle.hue}, ${saturation}%, ${lightness}%, ${connectionOpacity * (100 - distance2) / 100})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDark]); // Recréer quand le thème change

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ 
        background: isDark 
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)' 
          : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)'
      }}
    />
  );
};

// Composant principal
const Home = () => {
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState('fr');
  const [isLoading, setIsLoading] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [amount, setAmount] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [confetti, setConfetti] = useState(false);

  // Traductions
  const translations = {
    fr: {
      min_title :"Fonds pour une fête surprise",
      title: "Contribuer à la cagnotte de ---",
      description: "Pour son anniversaire, nous avons eu envie d'offrir à --- un beau cadeau : un billet d'avion pour la Nouvelle-Calédonie.",
      helpText: "Pour nous aider à réaliser cette surprise, j'ai mis en place une cagnotte en ligne pour celles et ceux qui préfèrent participer par virement.",
      contributeText: "Chacun peut contribuer à hauteur de ce qu'il souhaite — il suffit d'entrer le montant et de cliquer sur \"Contribuer\".",
      thanksText: "Un grand merci d'avance pour votre participation !",
      totalAmount: "Montant total de la cagnotte",
      participants: "Nombre de participants",
      contribute: "Contribuer",
      qrText: "Ou scannez le QR code",
      footer: "Ceci est un exemple de cagnotte simple utilisée pour un anniversaire.",
      amount: "Montant",
      currency: "€"
    },
    en: {
      min_title :"Surprise Party Fund",
      title: "Contribute to ---'s fundraiser",
      description: "For their birthday, we wanted to offer --- a beautiful gift: a plane ticket to New Caledonia.",
      helpText: "To help us make this surprise happen, I've set up an online fundraiser for those who prefer to contribute by transfer.",
      contributeText: "Everyone can contribute as much as they wish — just enter the amount and click \"Contribute\".",
      thanksText: "Thank you very much in advance for your participation!",
      totalAmount: "Total fundraiser amount",
      participants: "Number of participants",
      contribute: "Contribute",
      qrText: "Or scan the QR code",
      footer: "This is an example of a simple fundraiser used for a birthday.",
      amount: "Amount",
      currency: "$"
    }
  };

  const t = translations[language];

  const handleContribute = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      window.open("https://www.paypal.com/donate/?hosted_button_id=DRARAU3BJVJ56", '_blank');
    }, 800);
  };

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDark ? 'dark' : ''}`}>
      <FluidBackground isDark={isDark} />
      
      {/* Header avec contrôles */}
      <div className="fixed top-4 right-4 z-50 flex gap-3">
        <button
          onClick={toggleLanguage}
          className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 ${
            isDark 
              ? 'bg-white/10 border border-white/20 hover:bg-white/20 text-white' 
              : 'bg-black/10 border border-black/20 hover:bg-black/20 text-gray-800'
          }`}
        >
          <Globe className="w-5 h-5" />
        </button>
        <button
          onClick={toggleDarkMode}
          className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 ${
            isDark 
              ? 'bg-white/10 border border-white/20 hover:bg-white/20 text-white' 
              : 'bg-black/10 border border-black/20 hover:bg-black/20 text-gray-800'
          }`}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8 md:py-16">
          {/* En-tête avec animation */}
          <div className="text-center mb-16 animate-fade-in-up">
            <div className={`inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full backdrop-blur-md border transition-all duration-300 ${
              isDark 
                ? 'bg-gradient-to-r from-violet-500/20 to-purple-500/20 border-violet-300/30' 
                : 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border-blue-300/40'
            }`}>
              <Sparkles className={`w-5 h-5 ${isDark ? 'text-violet-300' : 'text-blue-600'}`} />
              <span className={`font-medium ${isDark ? 'text-violet-200' : 'text-blue-700'}`}>{t.min_title}</span>
              <Gift className={`w-5 h-5 ${isDark ? 'text-violet-300' : 'text-blue-600'}`} />
            </div>
            
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 leading-tight ${
              isDark 
                ? 'bg-gradient-to-r from-violet-300 via-purple-300 to-pink-300 bg-clip-text text-transparent' 
                : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent'
            }`}>
              {t.title}
            </h1>
            
            <div className={`w-24 h-1 mx-auto rounded-full ${
              isDark 
                ? 'bg-gradient-to-r from-violet-500 to-purple-500' 
                : 'bg-gradient-to-r from-blue-500 to-indigo-500'
            }`}></div>
          </div>

          {/* Contenu principal */}
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              
              {/* Colonne gauche - Description */}
              <div className="space-y-8">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                  <div className="relative">
                    <img 
                      src="img/5d95c2c803819_airbus.jpg" 
                      alt="Destination voyage" 
                      className="w-full h-80 object-cover rounded-2xl shadow-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 text-white">
                        <Target className="w-5 h-5" />
                        <span className="font-medium">Nouvelle-Calédonie</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 text-slate-200">
                  <p className={`text-lg leading-relaxed ${isDark ? 'text-slate-200' : 'text-gray-700'}`}>
                    {t.description}
                  </p>
                  <p className={`text-lg leading-relaxed ${isDark ? 'text-slate-200' : 'text-gray-700'}`}>
                    {t.helpText}
                  </p>
                  <p className={`text-lg leading-relaxed ${isDark ? 'text-slate-200' : 'text-gray-700'}`}>
                    {t.contributeText}
                  </p>
                  <p className={`text-lg leading-relaxed font-medium ${isDark ? 'text-violet-300' : 'text-blue-600'}`}>
                    {t.thanksText}
                  </p>
                </div>
              </div>

              {/* Colonne droite - Formulaire */}
              <div className="flex justify-center">
                                  <div className="w-full max-w-md">
                  <div className={`backdrop-blur-md rounded-3xl p-8 border shadow-2xl transition-all duration-300 ${
                    isDark 
                      ? 'bg-white/10 border-white/20' 
                      : 'bg-white/80 border-white/60 shadow-lg'
                  }`}>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className={`text-center p-4 rounded-2xl border transition-all duration-300 ${
                        isDark 
                          ? 'bg-gradient-to-br from-violet-500/20 to-purple-500/20 border-violet-300/20' 
                          : 'bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border-blue-300/30'
                      }`}>
                        <div className="flex items-center justify-center mb-2">
                          <Target className={`w-5 h-5 ${isDark ? 'text-violet-300' : 'text-blue-600'}`} />
                        </div>
                        <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>---{t.currency}</div>
                        <div className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>{t.totalAmount}</div>
                      </div>
                      <div className={`text-center p-4 rounded-2xl border transition-all duration-300 ${
                        isDark 
                          ? 'bg-gradient-to-br from-pink-500/20 to-rose-500/20 border-pink-300/20' 
                          : 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-300/30'
                      }`}>
                        <div className="flex items-center justify-center mb-2">
                          <Users className={`w-5 h-5 ${isDark ? 'text-pink-300' : 'text-purple-600'}`} />
                        </div>
                        <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>---</div>
                        <div className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>{t.participants}</div>
                      </div>
                    </div>

                    {/* Formulaire de contribution */}
                    <div className="space-y-6">
                      <div>
                        <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-slate-200' : 'text-gray-700'}`}>
                          {t.amount}
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0"
                            className={`w-full px-4 py-4 border rounded-2xl focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                              isDark 
                                ? 'bg-white/10 border-white/20 text-white placeholder-slate-400 focus:ring-violet-500' 
                                : 'bg-white/60 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500'
                            }`}
                          />
                          <div className={`absolute right-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                            {t.currency}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={handleContribute}
                        disabled={isLoading}
                        className={`w-full font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 ${
                          isDark 
                            ? 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white' 
                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                        }`}
                      >
                        {isLoading ? (
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <>
                            <Heart className="w-5 h-5" />
                            {t.contribute}
                            <ExternalLink className="w-5 h-5" />
                          </>
                        )}
                      </button>

                      <div className="text-center">
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className={`w-full border-t ${isDark ? 'border-white/20' : 'border-gray-300'}`}></div>
                          </div>
                          <div className="relative flex justify-center text-sm">
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setShowQR(!showQR)}
                        className={`w-full flex items-center justify-center gap-3 py-3 transition-colors ${isDark ? 'text-slate-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                      >
                        <QrCode className="w-5 h-5" />
                        {t.qrText}
                      </button>

                      {showQR && (
                        <div className="text-center p-4 bg-white rounded-2xl animate-fade-in">
                          <img 
                            src="img/qr-code-paypal.png" 
                            alt="QR Code PayPal" 
                            className="w-48 h-48 mx-auto"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className={`text-center mt-20 text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
            <div className="max-w-2xl mx-auto">
              <p>{t.footer}</p>
              <div className="mt-6 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                  <span>Made with</span>
                  <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                  <span>by TeamssUTXO</span>
                </div>
                <div className="h-4 w-px bg-gray-400"></div>
                <a 
                  href="https://github.com/teamssUTXO" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 transition-all duration-300 hover:scale-110 ${
                    isDark 
                      ? 'text-slate-400 hover:text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Github className="w-5 h-5" />
                  <span className="font-medium">GitHub</span>
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Home;