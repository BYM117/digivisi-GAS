
import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, Image, LogOut, BarChart3 } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem('admin_auth');
    if (!isAuth) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Statistics', path: '/admin/statistics', icon: BarChart3 },
    { name: 'Inquiries', path: '/admin/inquiries', icon: MessageSquare },
    { name: 'Portfolio', path: '/admin/portfolio', icon: Image },
  ];

  return (
    <div className="min-h-screen bg-neutral-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-black text-white flex flex-col fixed h-full">
        <div className="p-6 border-b border-neutral-800">
          <h1 className="text-xl font-bold tracking-tighter">DIGIVISI <span className="text-brand-red text-sm font-normal ml-1">ADMIN</span></h1>
        </div>
        
        <nav className="flex-grow p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded transition-colors ${
                  isActive ? 'bg-brand-red text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <item.icon size={20} />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-neutral-800">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 text-neutral-400 hover:text-white w-full transition-colors"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">로그아웃</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
