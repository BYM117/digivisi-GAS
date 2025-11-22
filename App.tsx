import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ServiceDetail from './pages/ServiceDetail';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Contact from './pages/Contact';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/service/:id" element={<ServiceDetail />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
