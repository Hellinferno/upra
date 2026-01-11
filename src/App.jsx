import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useOrders } from './hooks/useOrders';
import { db } from './lib/firebase';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';

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
      alert("Failed to book service. See console.");
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
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

        <Route path="/login" element={<Login isDemoMode={false} />} />

        <Route path="/partners" element={<PartnersLogin />} />

        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard user={user} onLogout={logout} orders={orders} />
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
    </>
  );
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;