import React, { useState, useEffect } from 'react';
import {
  Users, ChevronRight, Phone, Mail, Globe, Search, Menu, X, Home, LayoutGrid
} from 'lucide-react';

import { NAV_MENU, POPULAR_SERVICES } from './data/constants';
import { auth } from './lib/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail
} from "firebase/auth";

// Components
import Logo from './components/Logo';
import MegaMenu from './components/MegaMenu';
import OTPModal from './components/OTPModal';

// Pages
import PartnersLogin from './pages/PartnersLogin';
import Dashboard from './pages/Dashboard';
import PartnerDashboard from './pages/PartnerDashboard';
import ServicePage from './pages/ServicePage';
import HomeLanding from './pages/HomeLanding';
import {
  StartupLanding, MCALanding, ComplianceLanding, GlobalLanding,
  RegistrationsLanding, TrademarkLanding, GSTLanding, IncomeTaxLanding
} from './pages/CategoryLandings';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // Updated view state to handle all new pages
  const [view, setView] = useState('home');
  const [selectedService, setSelectedService] = useState(null);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false); // Toggle for Login/SignUp form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [authError, setAuthError] = useState('');

  // New States for Features
  const [isResetting, setIsResetting] = useState(false); // Forgot Password View
  const [resetEmail, setResetEmail] = useState('');
  const [showOTPModal, setShowOTPModal] = useState(false); // OTP Popup
  const [orders, setOrders] = useState([]); // MOCK DATABASE OF ORDERS

  // --- ACTIONS ---
  const handleBookService = (orderDetails) => {
    // 1. Create Order
    const newOrder = { ...orderDetails, id: Date.now(), assignedPartner: null };
    setOrders([newOrder, ...orders]);
    // 2. Redirect User to Dashboard to see pending status
    // We assume user is logged in for this flow in a real app, or we prompt login
    // For demo, we just auto-login a demo user if needed
    if (!user) {
      setUser({ name: orderDetails.fullName, email: orderDetails.email, isPartner: false });
    }
    setView('dashboard');
  };

  const handleAcceptOrder = (order) => {
    const updatedOrders = orders.map(o =>
      o.id === order.id ? { ...o, status: 'In Progress', assignedPartner: user.name } : o
    );
    setOrders(updatedOrders);
  };

  const handleSubmitWork = (order) => {
    const updatedOrders = orders.map(o =>
      o.id === order.id ? { ...o, status: 'Completed' } : o
    );
    setOrders(updatedOrders);
    alert("Work submitted to client!");
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    // Check for persisted user session
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setUser({
            name: currentUser.displayName || "User",
            email: currentUser.email
          });
          // If we land on dashboard from a direct link or reload, this handles it, 
          // but defaults to home if just visiting root. 
          // Keeping view logic separate for now.
        } else {
          setUser(null);
        }
      });
      return () => {
        window.removeEventListener('scroll', handleScroll);
        unsubscribe();
      };
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError('');

    if (!auth) {
      setAuthError("Firebase is not configured. Please add your keys in the code.");
      return;
    }

    try {
      if (isSignUp) {
        // Sign Up Logic
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Update profile with name
        await updateProfile(userCredential.user, { displayName: name });
        setUser({ name: name, email: email });
      } else {
        // Login Logic
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUser({
          name: userCredential.user.displayName || "User",
          email: userCredential.user.email
        });
      }
      setView('dashboard');
    } catch (error) {
      console.error(error);
      setAuthError(error.message.replace("Firebase: ", ""));
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (!resetEmail) return setAuthError("Please enter email");

    if (!auth) {
      alert("Firebase not configured");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      alert("Password reset email sent! Check your inbox.");
      setIsResetting(false);
    } catch (error) {
      setAuthError(error.message);
    }
  };

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
    }
    setUser(null);
    setView('home');
  };

  const handleServiceClick = (serviceName) => {
    setSelectedService(serviceName);
    setView('service');
    setMobileMenuOpen(false);
  };

  const filteredServices = searchQuery
    ? POPULAR_SERVICES.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : POPULAR_SERVICES;

  // View Mapping logic for main nav
  const handleNavClick = (menuName) => {
    switch (menuName) {
      case 'Startup': setView('startup'); break;
      case 'MCA': setView('mca'); break;
      case 'Compliance': setView('compliance'); break;
      case 'Global': setView('global'); break;
      case 'Registrations': setView('registrations'); break;
      case 'Trademark': setView('trademark'); break;
      case 'Goods & Services Tax': setView('gst'); break;
      case 'Income Tax': setView('incometax'); break;
      default: setView('home');
    }
  };

  const handleSearchInput = (value) => {
    // If user types in global search and is not on home, go to home
    if (value && view !== 'home') {
      setView('home');
    }
  };

  // Login View
  if (view === 'login') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-inter">
        {showOTPModal && <OTPModal onClose={() => setShowOTPModal(false)} />}

        <div className="bg-white w-full max-w-md p-10 rounded-3xl shadow-2xl border border-gray-100 relative">
          <button onClick={() => setView('home')} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {isResetting ? "Reset Password" : (isSignUp ? "Create Account" : "Welcome Back")}
            </h2>
            <p className="text-slate-500 mt-2">
              {isResetting ? "Enter your email to receive instructions" : (isSignUp ? "Sign up to get started" : "Sign in to access your dashboard")}
            </p>
          </div>

          {authError && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex items-center">
              <Minus className="w-4 h-4 mr-2" /> {authError}
            </div>
          )}

          {isResetting ? (
            // --- FORGOT PASSWORD FORM ---
            <form onSubmit={handlePasswordReset} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="name@company.com"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
                Send Reset Link
              </button>
              <button
                type="button"
                onClick={() => { setIsResetting(false); setAuthError(''); }}
                className="w-full text-slate-500 hover:text-slate-700 font-bold text-sm"
              >
                Cancel
              </button>
            </form>
          ) : (
            // --- LOGIN / SIGNUP FORM ---
            <form onSubmit={handleAuth} className="space-y-6">
              {isSignUp && (
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
                <input
                  type="password"
                  required
                  className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {!isSignUp && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsResetting(true)}
                    className="text-sm font-bold text-blue-600 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              <button type="submit" className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
                {isSignUp ? "Sign Up" : "Secure Login"}
              </button>

              {!isSignUp && (
                <button
                  type="button"
                  onClick={() => setShowOTPModal(true)}
                  className="w-full bg-white border-2 border-slate-100 text-slate-700 py-3.5 rounded-xl font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Smartphone className="w-5 h-5" /> Login with Mobile
                </button>
              )}
            </form>
          )}

          {!isResetting && (
            <div className="mt-8 text-center text-sm text-slate-500 border-t border-gray-100 pt-6">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
              <button
                onClick={() => { setIsSignUp(!isSignUp); setAuthError(''); }}
                className="ml-2 text-blue-600 font-bold hover:underline"
              >
                {isSignUp ? "Login" : "Sign Up"}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Dashboard View
  if (view === 'dashboard' && user) {
    return <Dashboard user={user} onLogout={handleLogout} orders={orders} />;
  }

  // Partner Dashboard View
  if (view === 'partnerDashboard' && user?.isPartner) {
    return (
      <PartnerDashboard
        user={user}
        onLogout={() => { setUser(null); setView('home'); }}
        orders={orders}
        onAcceptOrder={handleAcceptOrder}
        onSubmitWork={handleSubmitWork}
      />
    );
  }

  // Partner Login Page
  if (view === 'partners') {
    return (
      <PartnersLogin
        onBack={() => setView('home')}
        setUser={setUser}
        setView={setView}
      />
    );
  }

  // Service Booking Page
  if (view === 'service') {
    return <ServicePage serviceName={selectedService} onBack={() => setView('home')} onBook={handleBookService} />;
  }

  // Public Home View
  return (
    <div className="min-h-screen bg-white font-inter text-slate-800 antialiased">
      {/* Top Bar */}
      <div className="bg-[#0B2447] text-slate-300 text-xs py-2.5 px-4 md:px-8 flex justify-between items-center font-medium tracking-wide">
        <div className="flex space-x-6">
          <span className="flex items-center hover:text-white transition-colors cursor-pointer"><Phone className="w-3 h-3 mr-2 text-cyan-400" /> 044-4000-4000</span>
          <span className="flex items-center hover:text-white transition-colors cursor-pointer"><Mail className="w-3 h-3 mr-2 text-cyan-400" /> help@uprafillings.com</span>
        </div>
        <div className="flex space-x-6">
          <button onClick={() => setView('partners')} className="hover:text-white transition-colors text-cyan-400 font-bold">Partners</button>
          <a href="#" className="hover:text-white transition-colors">Articles</a>
          <a href="#" className="hover:text-white transition-colors">Nearest Office</a>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`sticky top-0 z-40 transition-all duration-500 ${isScrolled
            ? 'bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 py-3'
            : 'bg-white border-b border-gray-100 py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-10">
            <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setView('home')}>
              <Logo />
            </div>
            <div className="hidden xl:flex space-x-8">
              {Object.keys(NAV_MENU).map((menu) => (
                <div
                  key={menu}
                  className="relative group h-full flex items-center"
                  onMouseEnter={() => setActiveMenu(menu)}
                >
                  <button
                    onClick={() => handleNavClick(menu)}
                    className={`flex items-center text-sm font-semibold py-2 transition-colors ${(view === 'startup' && menu === 'Startup') ||
                        (view === 'mca' && menu === 'MCA') ||
                        (view === 'compliance' && menu === 'Compliance') ||
                        (view === 'global' && menu === 'Global') ||
                        (view === 'registrations' && menu === 'Registrations') ||
                        (view === 'trademark' && menu === 'Trademark') ||
                        (view === 'gst' && menu === 'Goods & Services Tax') ||
                        (view === 'incometax' && menu === 'Income Tax')
                        ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'
                      }`}
                  >
                    {menu} <ChevronDown className="w-3 h-3 ml-1.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 w-64 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition-all">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search services..."
                className="bg-transparent border-none outline-none text-sm w-full font-medium text-slate-700 placeholder:text-gray-400"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  handleSearchInput(e.target.value);
                }}
              />
            </div>
            <button
              onClick={() => setView('login')}
              className="hidden md:flex items-center px-6 py-2.5 bg-[#0B2447] text-white rounded-full font-bold text-sm hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <Users className="w-4 h-4 mr-2" /> Login
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="xl:hidden p-2 text-slate-600">
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        <div onMouseLeave={() => setActiveMenu(null)}>
          <MegaMenu
            activeMenu={activeMenu}
            closeMenu={() => setActiveMenu(null)}
            onNavigate={handleNavClick}
            onServiceClick={handleServiceClick}
          />
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 pt-24 px-6 overflow-y-auto xl:hidden animate-fade-in">
          <div className="flex flex-col space-y-6 pb-20">
            {Object.keys(NAV_MENU).map((menu) => (
              <div key={menu} className="border-b border-gray-100 pb-4">
                <button
                  onClick={() => { handleNavClick(menu); setMobileMenuOpen(false); }}
                  className="font-bold text-xl text-slate-900 mb-4 block w-full text-left flex justify-between items-center"
                >
                  {menu} <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
                <div className="pl-4 space-y-3">
                  {NAV_MENU[menu].slice(0, 5).map((sub, i) => (
                    <button
                      key={i}
                      onClick={() => handleServiceClick(sub.name)}
                      className="block w-full text-left text-slate-500 font-medium py-1"
                    >
                      {sub.name}
                    </button>
                  ))}
                  <button onClick={() => handleNavClick(menu)} className="text-blue-600 font-bold text-sm mt-2">View All...</button>
                </div>
              </div>
            ))}
            <button
              onClick={() => setView('login')}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg mt-4 shadow-lg shadow-blue-300"
            >
              Login / Sign Up
            </button>
          </div>
        </div>
      )}

      {/* VIEW CONTENT RENDERER */}
      {view === 'home' && (
        <HomeLanding
          filteredServices={filteredServices}
          setShowModal={setShowModal}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onNavigate={handleNavClick}
          onSearchInput={handleSearchInput}
        />
      )}

      {view === 'startup' && <StartupLanding onServiceClick={handleServiceClick} />}
      {view === 'mca' && <MCALanding onServiceClick={handleServiceClick} />}
      {view === 'compliance' && <ComplianceLanding onServiceClick={handleServiceClick} />}
      {view === 'global' && <GlobalLanding onServiceClick={handleServiceClick} />}
      {view === 'registrations' && <RegistrationsLanding onServiceClick={handleServiceClick} />}
      {view === 'trademark' && <TrademarkLanding onServiceClick={handleServiceClick} />}
      {view === 'gst' && <GSTLanding onServiceClick={handleServiceClick} />}
      {view === 'incometax' && <IncomeTaxLanding onServiceClick={handleServiceClick} />}

      {/* Footer */}
      <footer className="bg-slate-50 pt-24 pb-12 border-t border-slate-200 text-sm font-medium text-slate-500">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <Logo />
            </div>
            <p className="mb-8 leading-relaxed">
              India's largest online business services platform dedicated to helping people start and grow their business, at an affordable cost.
            </p>
            <div className="flex space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all cursor-pointer shadow-sm">
                  <Globe className="w-4 h-4" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-base">Start A Business</h4>
            <ul className="space-y-3">
              <li><button onClick={() => handleServiceClick('Proprietorship')} className="hover:text-blue-600 transition-colors">Proprietorship</button></li>
              <li><button onClick={() => handleServiceClick('Partnership')} className="hover:text-blue-600 transition-colors">Partnership</button></li>
              <li><button onClick={() => handleServiceClick('Private Limited Company')} className="hover:text-blue-600 transition-colors">Private Limited</button></li>
              <li><button onClick={() => handleServiceClick('LLP Registration')} className="hover:text-blue-600 transition-colors">LLP Registration</button></li>
              <li><button onClick={() => handleServiceClick('One Person Company')} className="hover:text-blue-600 transition-colors">One Person Company</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-base">Tools</h4>
            <ul className="space-y-3">
              <li><button onClick={() => handleServiceClick('GST Calculator')} className="hover:text-blue-600 transition-colors">GST Calculator</button></li>
              <li><button onClick={() => handleServiceClick('Business Search')} className="hover:text-blue-600 transition-colors">Business Search</button></li>
              <li><button onClick={() => handleServiceClick('Trademark Search')} className="hover:text-blue-600 transition-colors">Trademark Search</button></li>
              <li><button onClick={() => handleServiceClick('HSN Code Finder')} className="hover:text-blue-600 transition-colors">HSN Code Finder</button></li>
              <li><button onClick={() => handleServiceClick('LEDGERS Software')} className="hover:text-blue-600 transition-colors">LEDGERS Software</button></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 border-t border-gray-200 pt-10 flex flex-col md:flex-row justify-between items-center text-slate-400">
          <p>&copy; 2026 UPRA fillings Private Limited. All rights reserved.</p>
          <div className="flex space-x-8 mt-4 md:mt-0 font-semibold">
            <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Refund Policy</a>
          </div>
        </div>
      </footer>

      {/* Service Detail Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl transform transition-all scale-100">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center space-x-5">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
                  <showModal.icon className="w-7 h-7 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900">{showModal.title}</h3>
                  <p className="text-blue-600 font-bold text-lg">{showModal.price}</p>
                </div>
              </div>
              <button onClick={() => setShowModal(null)} className="text-gray-400 hover:text-gray-600 hover:rotate-90 transition-all">
                <X className="w-6 h-6" />
              </button>
            </div>

            <p className="text-slate-600 mb-8 leading-relaxed text-lg">
              Start your {showModal.title} process completely online. Our experts will guide you through every step of the way, ensuring compliance and peace of mind.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => { setShowModal(null); setView('login'); }}
                className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
              >
                Buy Now
              </button>
              <button
                onClick={() => setShowModal(null)}
                className="flex-1 bg-white border-2 border-gray-100 text-slate-700 py-4 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-200 transition-all"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Bottom Bar for Mobile */}
      <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-gray-200 p-3 md:hidden flex justify-between items-center z-40 pb-safe">
        <div className="flex flex-col items-center flex-1 text-blue-600">
          <Home className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-bold">Home</span>
        </div>
        <div className="flex flex-col items-center flex-1 text-gray-400" onClick={() => setView('login')}>
          <LayoutGrid className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">Dashboard</span>
        </div>
        <div className="flex flex-col items-center flex-1 text-gray-400">
          <Phone className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">Contact</span>
        </div>
        <div className="flex-1">
          <button className="w-full bg-slate-900 text-white py-3 rounded-xl text-xs font-bold shadow-lg">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;