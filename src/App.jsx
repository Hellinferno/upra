/* src/App.jsx */
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from './lib/firebase';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// Data
import { NAV_MENU, POPULAR_SERVICES, SERVICE_DETAILS, HOME_CATEGORIES } from './data/constants';

// Components
import Logo from './components/Logo';
import MegaMenu from './components/MegaMenu';
import OTPModal from './components/OTPModal';

// Pages
import HomeLanding from './pages/HomeLanding';
import ServicePage from './pages/ServicePage';
import PartnersLogin from './pages/PartnersLogin';
import Dashboard from './pages/Dashboard';
import PartnerDashboard from './pages/PartnerDashboard';
import {
  StartupLanding, MCALanding, ComplianceLanding, GlobalLanding,
  RegistrationsLanding, TrademarkLanding, GSTLanding, IncomeTaxLanding
} from './pages/CategoryLandings';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Flatten all services for search
const ALL_SERVICES = Object.values(NAV_MENU).flat().map(s => ({
  ...s,
  // Add dummy descriptions/prices if missing, or map from SERVICE_DETAILS if key matches
  ...(SERVICE_DETAILS[s.name] || {
    desc: "Professional business service.",
    price: "Enquire",
    icon: null // ServiceCard handles null icon
  })
}));

const App = () => {
  const [view, setView] = useState('home');
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null); // { uid, email, displayName, role: 'user' | 'partner' }
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(null); // Service object for modal
  const [searchQuery, setSearchQuery] = useState('');

  // Mock Orders State
  const [orders, setOrders] = useState([]);

  // Auth Listener
  useEffect(() => {
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          // In a real app, fetch role from DB. For now, assume 'user' unless otherwise specified.
          // If we came from PartnerLogin (demo), we manually set user.
          // If it's real Firebase auth, we might lack 'role'.
          // We'll default to current state's role logic if preserved, or 'user'.
          setUser(prev => ({
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            role: (prev && prev.role) || 'user',
            photoURL: currentUser.photoURL
          }));
        } else {
          setUser(null);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = async () => {
    if (auth) await signOut(auth);
    setUser(null);
    setView('home');
  };

  // Login handler for Demo/Partner login manual trigger
  const handleManualLogin = (userData) => {
    setUser(userData);
    setView(userData.role === 'partner' ? 'partner-dashboard' : 'dashboard');
  };

  const handleBookService = (service) => {
    if (!user) {
      setView('login'); // Or trigger login modal
      return;
    }
    const newOrder = {
      id: Date.now().toString(),
      service: service.title || service.name,
      date: new Date().toISOString(),
      status: 'In Progress',
      userId: user.uid
    };
    setOrders([newOrder, ...orders]);
    setView('dashboard');
    setShowModal(null);
  };

  // Partner Logic
  const handleAcceptOrder = (orderId) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, assignedTo: user.uid, status: 'In Progress' } : o));
  };

  const handleSubmitWork = (orderId) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: 'Completed' } : o));
  };


  // Filtering Logic
  // Combine POPULAR_SERVICES with ALL_SERVICES if query exists
  const getFilteredServices = () => {
    if (!searchQuery) return POPULAR_SERVICES;
    const lowerQ = searchQuery.toLowerCase();
    return ALL_SERVICES.filter(s => s.name?.toLowerCase().includes(lowerQ) || s.title?.toLowerCase().includes(lowerQ));
  };

  const filteredServices = getFilteredServices();

  // Navigation Helper
  const onNavigate = (item) => {
    // Check if item is a category ID
    if (HOME_CATEGORIES.find(c => c.id === item)) {
      setView(`cat-${item}`);
    } else if (item === 'Partner') {
      setView('partner-login');
    } else {
      // Assume service name
      setSearchQuery(item);
      setView('home'); // Go home and search
    }
    setActiveMenu(null);
    setIsMobileMenuOpen(false);
  };

  // View Switcher
  const renderView = () => {
    if (view === 'dashboard' && user) return <Dashboard user={user} orders={orders.filter(o => o.userId === user.uid)} onLogout={handleLogout} />;
    if (view === 'partner-dashboard' && user?.role === 'partner') return <PartnerDashboard user={user} availableJobs={orders} onAccept={handleAcceptOrder} onSubmitWork={handleSubmitWork} onLogout={handleLogout} />;
    if (view === 'partner-login') return <PartnersLogin onLogin={handleManualLogin} onBack={() => setView('home')} />;
    if (view === 'login') return <PartnersLogin onLogin={handleManualLogin} onBack={() => setView('home')} />; // Reusing PartnerLogin for simplicity or need a separate UserLogin?

    // Category Pages
    if (view.startsWith('cat-')) {
      const cat = view.replace('cat-', '');
      const props = { onServiceClick: (s) => { setSearchQuery(s); setView('home'); } };
      switch (cat) {
        case 'Startup': return <StartupLanding {...props} />;
        case 'MCA': return <MCALanding {...props} />;
        case 'Compliance': return <ComplianceLanding {...props} />;
        case 'Global': return <GlobalLanding {...props} />;
        case 'Registrations': return <RegistrationsLanding {...props} />;
        case 'Trademark': return <TrademarkLanding {...props} />;
        case 'Goods & Services Tax': return <GSTLanding {...props} />;
        case 'Income Tax': return <IncomeTaxLanding {...props} />;
        default: return <HomeLanding filteredServices={filteredServices} setShowModal={setShowModal} setSearchQuery={setSearchQuery} searchQuery={searchQuery} onNavigate={onNavigate} onSearchInput={setSearchQuery} />;
      }
    }

    // Default Home
    return <HomeLanding filteredServices={filteredServices} setShowModal={setShowModal} setSearchQuery={setSearchQuery} searchQuery={searchQuery} onNavigate={onNavigate} onSearchInput={setSearchQuery} />;
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

  return (
    <div className="min-h-screen font-inter bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Navbar (Only show if not in dashboard/login) */}
      {!['dashboard', 'partner-dashboard', 'partner-login', 'login'].includes(view) && (
        <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <div className="flex items-center gap-8 cursor-pointer" onClick={() => setView('home')}>
                <Logo />
              </div>

              {/* Desktop Menu */}
              <div className="hidden lg:flex items-center gap-8">
                {Object.keys(NAV_MENU).map((key) => (
                  <div
                    key={key}
                    className="relative group"
                    onMouseEnter={() => setActiveMenu(key)}
                    onMouseLeave={() => setActiveMenu(null)}
                  >
                    <button className="flex items-center text-sm font-bold text-slate-600 hover:text-blue-600 py-2 transition-colors">
                      {key} <Menu className="ml-1 w-4 h-4 opacity-50" />
                    </button>
                    <MegaMenu
                      isOpen={activeMenu === key}
                      items={NAV_MENU[key]}
                      category={key}
                      onClose={() => setActiveMenu(null)}
                      onItemClick={onNavigate}
                    />
                  </div>
                ))}
              </div>

              {/* Auth Buttons */}
              <div className="hidden lg:flex items-center gap-4">
                {user ? (
                  <button onClick={() => setView(user.role === 'partner' ? 'partner-dashboard' : 'dashboard')} className="font-bold text-slate-700 hover:text-blue-600">
                    Dashboard
                  </button>
                ) : (
                  <>
                    <button onClick={() => setView('partner-login')} className="text-sm font-bold text-slate-500 hover:text-slate-900">
                      Partner Login
                    </button>
                    <button onClick={() => setShowModal({ title: 'Login/Signup' })} className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 hover:-translate-y-0.5">
                      Login
                    </button>
                  </>
                )}
              </div>

              {/* Mobile Trigger */}
              <div className="lg:hidden">
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600">
                  {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* content */}
      {renderView()}

      {/* Footer (Simple version) */}
      {!['dashboard', 'partner-dashboard', 'partner-login', 'login'].includes(view) && (
        <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <Logo className="text-white mx-auto mb-6 scale-110" />
            <p className="text-slate-500 mb-8">India's largest business services platform.</p>
            <div className="text-slate-600 text-sm">© 2024 UPRA Filings. All rights reserved.</div>
          </div>
        </footer>
      )}

      {/* OTP/Service Modal */}
      {showModal && (
        <OTPModal
          service={showModal}
          onClose={() => setShowModal(null)}
          onSubmit={(otp) => {
            // Handle OTP Login/Booking
            if (showModal.title === 'Login/Signup') {
              handleManualLogin({ uid: 'user-' + Date.now(), displayName: 'User', role: 'user', email: 'user@example.com' });
            } else {
              handleBookService(showModal);
            }
            setShowModal(null);
          }}
        />
      )}
    </div>
  );
};
export default App;