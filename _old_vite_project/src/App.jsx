import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import { useOrderStore } from './store/orderStore';
import Loading from './components/Loading';

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
import MainLayout from './layouts/MainLayout';

// --- Main App Component ---
const App = () => {
  const { user, setUser, setLoading, loading } = useOrderStore();
  const navigate = useNavigate();

  // Auth Listener
  useEffect(() => {
    // Safety timeout
    const timeoutFn = setTimeout(() => {
      if (loading) setLoading(false);
    }, 4000);

    let unsubscribe;
    if (auth) {
      unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          // In a real app, you'd fetch additional profile data from Firestore here
          setUser({
            name: currentUser.displayName || "User",
            email: currentUser.email,
            uid: currentUser.uid,
            // Persist properties if they exist in store (like role from previous mock login)
            // or default to client
            role: 'client'
          });
        } else {
          // Don't clear user immediately if we are in a "mock" session from the store 
          // unless we explicitly want to support Firebase logout.
          // For now, let's trust the auth state.
          setUser(null);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }

    return () => {
      if (unsubscribe) unsubscribe();
      clearTimeout(timeoutFn);
    };
  }, [setUser, setLoading]);

  // Loading state
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        {/* PUBLIC ROUTES (Wrapped in MainLayout) */}
        <Route path="/" element={<MainLayout user={user}><HomeLanding /></MainLayout>} />

        <Route path="/startup" element={<MainLayout user={user}><StartupLanding /></MainLayout>} />
        <Route path="/mca" element={<MainLayout user={user}><MCALanding /></MainLayout>} />
        <Route path="/compliance" element={<MainLayout user={user}><ComplianceLanding /></MainLayout>} />
        <Route path="/global" element={<MainLayout user={user}><GlobalLanding /></MainLayout>} />
        <Route path="/registrations" element={<MainLayout user={user}><RegistrationsLanding /></MainLayout>} />
        <Route path="/trademark" element={<MainLayout user={user}><TrademarkLanding /></MainLayout>} />
        <Route path="/gst" element={<MainLayout user={user}><GSTLanding /></MainLayout>} />
        <Route path="/incometax" element={<MainLayout user={user}><IncomeTaxLanding /></MainLayout>} />

        {/* Service Page now handles its own booking logic via store */}
        <Route path="/service/:serviceName" element={<MainLayout user={user}><ServicePage /></MainLayout>} />

        {/* AUTH/PARTNER ROUTES */}
        <Route path="/login" element={<Login isDemoMode={false} />} />

        <Route path="/partners" element={<PartnersLogin setView={(view) => { if (view === 'partnerDashboard') navigate('/partner-dashboard'); else if (view === 'home') navigate('/'); }} />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/dashboard"
          element={
            user ? (
              <MainLayout user={user}>
                <Dashboard />
              </MainLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/partner-dashboard"
          element={
            user?.isPartner ? (
              <PartnerDashboard />
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