import React, { useState, useEffect } from 'react';
import { Users, ChevronRight } from 'lucide-react';
import { NAV_MENU, POPULAR_SERVICES } from './data/constants';

// UI Components
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
  const [view, setView] = useState('home'); // home, service, dashboard, partnerDashboard, login, partnerLogin
  const [activeService, setActiveService] = useState(null);
  const [user, setUser] = useState(null); // null or user object
  const [activeMenu, setActiveMenu] = useState(null); // For Mega Menu
  const [showOTP, setShowOTP] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock Database for Orders
  const [orders, setOrders] = useState([
    { id: 1001, service: 'Private Limited Company', status: 'In Progress', date: '2023-10-15', userId: 'user_123', assignedPartner: 'Demo Partner', documents: ['PAN', 'Aadhar'] },
    { id: 1002, service: 'Trademark Registration', status: 'Completed', date: '2023-09-20', userId: 'user_123', assignedPartner: 'Demo Partner', documents: ['Logo'] }
  ]);

  // Navbar Transition
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter Services for Search
  const filteredServices = POPULAR_SERVICES.filter(s =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handlers
  const handleServiceClick = (serviceTitle) => {
    // Find service object or create dummy
    const service = POPULAR_SERVICES.find(s => s.title === serviceTitle) || { title: serviceTitle, desc: "Comprehensive professional service.", price: "₹999" };
    setActiveService(service.title); // Use title as ID for simplicity in this demo
    setView('service');
    setActiveMenu(null);
  };

  const handleBookService = (orderDetails) => {
    if (!user) {
      setShowOTP(true); // Force login
      return;
    }
    // Create Order
    const newOrder = {
      ...orderDetails,
      id: Date.now(),
      userId: user.uid,
      fullName: user.name
    };
    setOrders([newOrder, ...orders]);
    alert("Order Placed Successfully!");
    setView('dashboard');
  };

  const handlePartnerAccept = (job) => {
    const updated = orders.map(o => o.id === job.id ? { ...o, status: 'In Progress', assignedPartner: user.name } : o);
    setOrders(updated);
    alert("Job Accepted! Check 'My Active Jobs'.");
  };

  const handlePartnerSubmit = (job) => {
    const updated = orders.map(o => o.id === job.id ? { ...o, status: 'Completed' } : o);
    setOrders(updated);
    alert("Work Submitted Successfully!");
  };

  const renderContent = () => {
    if (view === 'dashboard' && user) return <Dashboard user={user} orders={orders} onLogout={() => { setUser(null); setView('home'); }} />;
    if (view === 'partnerDashboard' && user) return <PartnerDashboard user={user} orders={orders} onLogout={() => { setUser(null); setView('home'); }} onAcceptOrder={handlePartnerAccept} onSubmitWork={handlePartnerSubmit} />;

    if (view === 'partnerLogin') return <PartnersLogin onBack={() => setView('home')} setUser={setUser} setView={setView} />;

    if (view === 'service' && activeService) return (
      <ServicePage
        serviceName={activeService}
        onBack={() => setView('home')}
        onBook={handleBookService}
      />
    );

    // Dynamic Landing Pages for Categories
    switch (view) {
      case 'startup': return <StartupLanding />;
      case 'mca': return <MCALanding />;
      case 'compliance': return <ComplianceLanding />;
      case 'global': return <GlobalLanding />;
      case 'registrations': return <RegistrationsLanding />;
      case 'trademark': return <TrademarkLanding />;
      case 'gst': return <GSTLanding />;
      case 'incometax': return <IncomeTaxLanding />;
      default: return (
        <HomeLanding
          filteredServices={filteredServices}
          setShowModal={(s) => { setActiveService(s.title); setView('service'); }}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
          onNavigate={(v) => {
            if (['startup', 'mca', 'compliance', 'global', 'registrations', 'trademark', 'gst', 'incometax'].includes(v)) {
              setView(v);
            } else {
              handleServiceClick(v);
            }
          }}
          onSearchInput={setSearchQuery}
        />
      );
    }
  };

  return (
    <div className="min-h-screen bg-white font-inter text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation Bar */}
      {view !== 'dashboard' && view !== 'partnerDashboard' && view !== 'partnerLogin' && (
        <nav className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center relative">
            <div className="flex items-center gap-12">
              <div onClick={() => setView('home')} className="cursor-pointer">
                <Logo />
              </div>

              {/* Desktop Menu */}
              <div className="hidden lg:flex items-center space-x-1">
                {Object.keys(NAV_MENU).map((menu) => (
                  <button
                    key={menu}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${activeMenu === menu ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-gray-50'}`}
                    onMouseEnter={() => setActiveMenu(menu)}
                    onClick={() => {
                      if (menu === 'Startup') setView('startup');
                      // ... simplistic mapping for click
                    }}
                  >
                    {menu}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button onClick={() => setShowOTP(true)} className="hidden md:flex items-center gap-2 text-slate-700 font-bold hover:text-blue-600 transition-colors">
                <span className="bg-slate-100 p-2 rounded-full"><Users className="w-4 h-4" /></span>
                Login
              </button>
              <button
                onClick={() => setView('partnerLogin')}
                className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-bold hover:bg-slate-800 transition-all hover:shadow-lg text-sm flex items-center"
              >
                For Partners <ChevronRight className="w-4 h-4 ml-1" />
              </button>
              {/* Mobile Menu Toggle would go here */}
            </div>

            {/* Mega Menu Overlay */}
            <MegaMenu
              activeMenu={activeMenu}
              closeMenu={() => setActiveMenu(null)}
              onNavigate={(v) => {
                setView(v);
                setActiveMenu(null);
              }}
              onServiceClick={handleServiceClick}
            />
          </div>
        </nav>
      )}

      {/* Main Content Area */}
      <div className={`${(view !== 'dashboard' && view !== 'partnerDashboard' && view !== 'partnerLogin') ? 'pt-0' : ''}`}>
        {renderContent()}
      </div>

      {/* Footer */}
      {view !== 'dashboard' && view !== 'partnerDashboard' && (
        <footer className="bg-white border-t border-gray-200 pt-20 pb-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
              <div className="col-span-2 lg:col-span-2">
                <Logo className="mb-6" />
                <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-sm">
                  India's most trusted digital platform for legal, tax, and compliance services. We help entrepreneurs start, manage, and grow their business.
                </p>
                <div className="flex space-x-4">
                  {/* Social Icons */}
                  {[1, 2, 3, 4].map(i => <div key={i} className="w-8 h-8 bg-gray-100 rounded-full hover:bg-blue-600 transition-colors"></div>)}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-6">Startups</h4>
                <ul className="space-y-4 text-sm text-slate-500">
                  <li className="hover:text-blue-600 cursor-pointer">Private Limited</li>
                  <li className="hover:text-blue-600 cursor-pointer">LLP Registration</li>
                  <li className="hover:text-blue-600 cursor-pointer">One Person Company</li>
                  <li className="hover:text-blue-600 cursor-pointer">Nidhi Company</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-6">Intellectual Property</h4>
                <ul className="space-y-4 text-sm text-slate-500">
                  <li className="hover:text-blue-600 cursor-pointer">Trademark Registration</li>
                  <li className="hover:text-blue-600 cursor-pointer">Copyright</li>
                  <li className="hover:text-blue-600 cursor-pointer">Patent Filing</li>
                  <li className="hover:text-blue-600 cursor-pointer">Design Registration</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-6">Contact</h4>
                <ul className="space-y-4 text-sm text-slate-500">
                  <li>help@uprafilings.com</li>
                  <li>+91 98765 43210</li>
                  <li>HSR Layout, Bangalore</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-slate-400">© 2024 UPRA Filings Technologies Pvt Ltd. All rights reserved.</p>
              <div className="flex space-x-6 text-sm text-slate-400">
                <span className="hover:text-slate-600 cursor-pointer">Privacy Policy</span>
                <span className="hover:text-slate-600 cursor-pointer">Terms of Service</span>
              </div>
            </div>
          </div>
        </footer>
      )}

      {/* Login Modal */}
      {showOTP && <OTPModal onClose={() => setShowOTP(false)} />}
    </div>
  );
};

export default App;