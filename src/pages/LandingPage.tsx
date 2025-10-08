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
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight mt-30">
            Sui Decentralized
            <span className="block text-blue-400">Identity</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Own your identity. Control your data. 
            <span className="block mt-2">Built on the Sui blockchain for maximum security.</span>
          </p>

          <ConnectButton className="glass-button text-white font-medium px-6 py-3 rounded-xl hover:scale-105 transition-all duration-300 mb-20" />

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