
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ServiceDetail from './pages/ServiceDetail';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Contact from './pages/Contact';

// Admin Imports
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import InquiryManager from './pages/admin/InquiryManager';
import PortfolioManager from './pages/admin/PortfolioManager';
import Statistics from './pages/admin/Statistics';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={
          <AdminLayout>
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="statistics" element={<Statistics />} />
              <Route path="inquiries" element={<InquiryManager />} />
              <Route path="portfolio" element={<PortfolioManager />} />
              {/* Default to dashboard if just /admin is accessed (handled by layout or redirect) */}
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </AdminLayout>
        } />

        {/* Public Routes (Wrapped in Public Layout) */}
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/service/:id" element={<ServiceDetail />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </HashRouter>
  );
};

export default App;
