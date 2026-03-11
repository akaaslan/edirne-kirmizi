import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy-loaded pages for code splitting
const Home = lazy(() => import("./pages/Home"));
const Story = lazy(() => import("./pages/Story"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminPanelNew = lazy(() => import("./pages/AdminPanelNew"));
const UserAuth = lazy(() => import("./pages/UserAuth"));
const UserAccount = lazy(() => import("./pages/UserAccount"));
const Support = lazy(() => import("./pages/Support"));
const EditProfile = lazy(() => import("./pages/EditProfile"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

function PageLoader() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      color: 'var(--edirne, #9C1E24)',
      fontSize: '1.1rem',
      fontWeight: 500
    }}>
      Yükleniyor...
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/hikaye" element={<Story />} />
        <Route path="/urunler" element={<Products />} />
        <Route path="/urunler/:id" element={<ProductDetail />} />
        <Route path="/hakkimizda" element={<About />} />
        <Route path="/iletisim" element={<Contact />} />
        <Route path="/gizlilik" element={<Privacy />} />
        <Route path="/giris" element={<UserAuth />} />
        <Route path="/sifremi-unuttum" element={<ForgotPassword />} />
        <Route path="/sifre-sifirla" element={<ResetPassword />} />
        <Route path="/hesabim" element={<UserAccount />} />
        <Route path="/destek" element={<Support />} />
        <Route path="/profil-duzenle" element={<EditProfile />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/panel" element={
          <ProtectedRoute>
            <AdminPanelNew />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <div className="app-root">
        <Navbar />
        <main className="content">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}
