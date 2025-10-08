import { useEffect, useState } from 'react';
import { Outlet, useNavigate, NavLink, useLocation } from 'react-router-dom';
import { useCurrentAccount, ConnectButton } from '@mysten/dapp-kit';

function DashboardLayout() {
  const account = useCurrentAccount();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!account) {
      navigate('/');
    }
  }, [account, navigate]);

  if (!account) {
    return null;
  }

  const navItems = [
    { path: 'home', label: 'Home', icon: '🏠' },
    { path: 'get-credential', label: 'Get Credential', icon: '📄' },
    { path: 'my-credentials', label: 'My Credentials', icon: '🎯' },
    { path: 'access-content', label: 'Access Content', icon: '🔐' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex h-screen">
        {/* Desktop Sidebar */}
        <nav className="hidden lg:flex w-64 glass-card m-4 mr-0 rounded-2xl p-6 flex-col">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-blue-400">🔒</span>
              Dashboard
            </h2>
            <p className="text-gray-400 text-sm mt-1">Identity Manager</p>
          </div>
          
          <ul className="space-y-2 flex-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'glass-button text-white font-medium'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="hidden xl:block">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-auto">
            <div className="glass-dark rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-2">Connected Account</p>
              <p className="text-white font-mono text-sm break-all">
                {account.address.slice(0, 6)}...{account.address.slice(-4)}
              </p>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Mobile Header */}
          <header className="lg:hidden glass-card m-4 mb-0 rounded-2xl p-4 flex justify-between items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-white">Dashboard</h1>
            <ConnectButton />
          </header>

          {/* Desktop Header */}
          <header className="hidden lg:flex glass-card m-4 mb-0 ml-0 rounded-2xl p-4 justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white capitalize">
                {location.pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard'}
              </h1>
              <p className="text-gray-400 text-sm">Manage your digital identity</p>
            </div>
            <ConnectButton />
          </header>

          {/* Main Content Area */}
          <main className="flex-1 p-4 pt-0 overflow-y-auto">
            <div className="glass-card rounded-2xl p-6 sm:p-8 h-full overflow-y-auto">
              <Outlet />
            </div>
          </main>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div className="glass-card w-64 m-4 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-white">Menu</h2>
                <button
                  onClick={toggleMobileMenu}
                  className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={toggleMobileMenu}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                          isActive
                            ? 'glass-button text-white font-medium'
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`
                      }
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div 
              className="flex-1" 
              onClick={toggleMobileMenu}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardLayout;