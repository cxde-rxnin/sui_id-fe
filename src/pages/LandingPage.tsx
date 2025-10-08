import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';

function LandingPage() {
  const account = useCurrentAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (account) {
      navigate('/dashboard/home');
    }
  }, [account, navigate]);

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo/Icon */}
          <div className="mb-8">
            <div className="glass-card rounded-3xl p-6 mx-auto w-fit">
              <svg className="w-16 h-16 sm:w-20 sm:h-20 text-blue-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Sui Decentralized
            <span className="block text-blue-400">Identity</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Own your identity. Control your data. 
            <span className="block mt-2">Built on the Sui blockchain for maximum security.</span>
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 max-w-4xl mx-auto">
            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Secure</h3>
              <p className="text-gray-400 text-sm">Cryptographically secured on Sui blockchain</p>
            </div>

            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Private</h3>
              <p className="text-gray-400 text-sm">You control who sees your data</p>
            </div>

            <div className="glass-card rounded-2xl p-6 text-center sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Fast</h3>
              <p className="text-gray-400 text-sm">Instant verification and access</p>
            </div>
          </div>

          {/* Connect Button */}
          <div className="glass-card rounded-2xl p-6 sm:p-8 mx-auto max-w-md">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Get Started</h2>
            <p className="text-gray-400 mb-6 text-sm sm:text-base">Connect your Sui wallet to begin managing your digital identity</p>
            <div className="flex justify-center">
              <ConnectButton className="glass-button text-white font-medium px-6 py-3 rounded-xl hover:scale-105 transition-all duration-300" />
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              Powered by <span className="text-blue-400 font-medium">Sui Network</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;