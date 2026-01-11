import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useOrders } from './hooks/useOrders';
import { db } from './lib/firebase';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import Loading from './components/Loading';

// --- Import Page Components (Lazy Loaded) ---
const HomeLanding = lazy(() => import('./pages/HomeLanding'));
const ServicePage = lazy(() => import('./pages/ServicePage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const PartnerDashboard = lazy(() => import('./pages/PartnerDashboard'));
const PartnersLogin = lazy(() => import('./pages/PartnersLogin'));
const Login = lazy(() => import('./pages/Login'));

// Lazy load named exports from CategoryLandings
const StartupLanding = lazy(() => import('./pages/CategoryLandings').then(module => ({ default: module.StartupLanding })));
const MCALanding = lazy(() => import('./pages/CategoryLandings').then(module => ({ default: module.MCALanding })));
const ComplianceLanding = lazy(() => import('./pages/CategoryLandings').then(module => ({ default: module.ComplianceLanding })));
const GlobalLanding = lazy(() => import('./pages/CategoryLandings').then(module => ({ default: module.GlobalLanding })));
const RegistrationsLanding = lazy(() => import('./pages/CategoryLandings').then(module => ({ default: module.RegistrationsLanding })));
const TrademarkLanding = lazy(() => import('./pages/CategoryLandings').then(module => ({ default: module.TrademarkLanding })));
const GSTLanding = lazy(() => import('./pages/CategoryLandings').then(module => ({ default: module.GSTLanding })));
const IncomeTaxLanding = lazy(() => import('./pages/CategoryLandings').then(module => ({ default: module.IncomeTaxLanding })));

// --- Import Reusable Components ---
import MainLayout from './layouts/MainLayout';

// --- Main App Component ---
const AppContent = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  // Use custom hook for orders
  // Pass user details only if logged in
  const { orders, loading: ordersLoading } = useOrders(user?.uid, user?.role);

  // Handlers
  const handleBookService = async (orderDetails) => {
    if (!user) {
      // Store intent or force login? For now, navigate to login or show modal
      // Logic: If no user, we can't book to firestore easily without an ID.
      // Let's redirect to login for now.
      navigate('/login');
      return;
    }

    try {
      await addDoc(collection(db, 'orders'), {
        ...orderDetails,
        userId: user.uid,
        userEmail: user.email,
        status: 'Pending',
        assignedPartnerId: null,
        createdAt: new Date()
      });
      navigate('/dashboard');
    } catch (err) {
      console.error("Error booking service:", err);
      toast.error("Failed to book service. Please try again.");
    }
  };

  const handleAcceptOrder = async (order) => {
    if (!user) return;
    try {
      await updateDoc(doc(db, 'orders', order.id), {
        status: 'In Progress',
        assignedPartnerId: user.uid,
        assignedPartnerName: user.name
      });
    } catch (err) {
      console.error("Error accepting order:", err);
    }
  };

  const handleSubmitWork = async (order) => {
    if (!user) return;
    try {
      await updateDoc(doc(db, 'orders', order.id), {
        status: 'Completed'
      });
    } catch (err) {
      console.error("Error submitting work:", err);
    }
  };

  // Loading state
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Toaster position="top-center" />
      <Suspense fallback={<Loading />}>
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
          <Route path="/service/:serviceName" element={<MainLayout user={user}><ServicePage onBook={handleBookService} /></MainLayout>} />

          {/* AUTH/PARTNER ROUTES */}
          <Route path="/login" element={<Login isDemoMode={false} />} />

          <Route path="/partners" element={<PartnersLogin />} />

          {/* PROTECTED ROUTES */}
          <Route
            path="/dashboard"
            element={
              user ? (
                <MainLayout user={user}>
                  <Dashboard user={user} onLogout={logout} orders={orders} />
                </MainLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/partner-dashboard"
            element={
              user?.role === 'partner' || user?.isPartner ? (
                <PartnerDashboard user={user} onLogout={logout} orders={orders} onAcceptOrder={handleAcceptOrder} onSubmitWork={handleSubmitWork} />
              ) : (
                <Navigate to="/partners" replace />
              )
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  );
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;