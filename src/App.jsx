import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Toaster } from 'react-hot-toast';

// --- Import Page Components ---
import HomeLanding from './pages/HomeLanding';
import ServicePage from './pages/ServicePage';
import Dashboard from './pages/Dashboard';
import PartnerDashboard from './pages/PartnerDashboard';
import PartnersLogin from './pages/PartnersLogin';
import Login from './pages/Login';
import {
  StartupLanding,
  MCALanding,
  ComplianceLanding,
  GlobalLanding,
  RegistrationsLanding,
  TrademarkLanding,
  GSTLanding,
  IncomeTaxLanding
} from './pages/CategoryLandings';

// --- Import Reusable Components ---
import Layout from './components/Layout';

// --- FIREBASE CONFIGURATION ---
// 🔴 REPLACE THESE VALUES WITH YOUR KEYS FROM FIREBASE CONSOLE TO GO LIVE
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Check if we are in Demo Mode (keys haven't been replaced)
const isDemoMode = firebaseConfig.apiKey === "YOUR_API_KEY_HERE";

// Initialize Firebase only if keys are valid
let auth = null;
if (!isDemoMode) {
  try {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
  } catch (error) {
    console.log("Firebase initialization error:", error);
  }
}

// --- Main App Component ---
const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  // Auth Listener with timeout
  useEffect(() => {
    let mounted = true;
    const timeoutFn = setTimeout(() => {
      if (mounted && loading) {
        console.warn("Auth timeout - fallback to guest mode");
        setLoading(false);
      }
    }, 3000);

    if (auth) {
      try {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if (!mounted) return;
          if (currentUser) {
            setUser({
              name: currentUser.displayName || "User",
              email: currentUser.email,
              uid: currentUser.uid,
              isPartner: false // Default to false, updated by Partner Login logic if separate
            });
          } else {
            setUser(null);
          }
          setLoading(false);
        });
        return () => {
          mounted = false;
          clearTimeout(timeoutFn);
          unsubscribe();
        };
      } catch (err) {
        console.error("Auth error:", err);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }

    return () => {
      mounted = false;
      clearTimeout(timeoutFn);
    };
  }, []);

  // Handlers
  const handleBookService = (orderDetails) => {
    const newOrder = { ...orderDetails, id: Date.now(), assignedPartner: null };
    setOrders([newOrder, ...orders]);
    if (!user) {
      // If booking without login, set a temporary user object or redirect to login? 
      // Current logic in previous App.jsx set the user directly.
      // We will keep this behavior for now to minimal change.
      setUser({ name: orderDetails.fullName, email: orderDetails.email, isPartner: false });
    }
    navigate('/dashboard');
  };

  const handleAcceptOrder = (order) => {
    setOrders(orders.map(o =>
      o.id === order.id ? { ...o, status: 'In Progress', assignedPartner: user.name } : o
    ));
  };

  const handleSubmitWork = (order) => {
    setOrders(orders.map(o =>
      o.id === order.id ? { ...o, status: 'Completed' } : o
    ));
    alert("Work submitted!"); // Verify if Toaster should be used here later
  };

  const handleLogout = async () => {
    if (auth) await signOut(auth).catch(() => { });
    setUser(null);
    navigate('/');
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          {/* Logo is now imported in Components but we can just use text here for loading */}
          <h1 className="text-4xl font-black text-[#0B2447]">UPRA</h1>
          <p className="mt-4 text-slate-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Layout user={user} />}>
          <Route index element={<HomeLanding />} />
          <Route path="startup" element={<StartupLanding />} />
          <Route path="mca" element={<MCALanding />} />
          <Route path="compliance" element={<ComplianceLanding />} />
          <Route path="global" element={<GlobalLanding />} />
          <Route path="registrations" element={<RegistrationsLanding />} />
          <Route path="trademark" element={<TrademarkLanding />} />
          <Route path="gst" element={<GSTLanding />} />
          <Route path="incometax" element={<IncomeTaxLanding />} />
          <Route path="service/:serviceName" element={<ServicePage onBook={handleBookService} />} />
        </Route>

        <Route path="/login" element={<Login auth={auth} setUser={setUser} isDemoMode={isDemoMode} />} />

        <Route path="/partners" element={<PartnersLogin setUser={setUser} />} />

        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard user={user} onLogout={handleLogout} orders={orders} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/partner-dashboard"
          element={
            user?.isPartner ? (
              <PartnerDashboard user={user} onLogout={handleLogout} orders={orders} onAcceptOrder={handleAcceptOrder} onSubmitWork={handleSubmitWork} />
            ) : (
              <Navigate to="/partners" replace />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;