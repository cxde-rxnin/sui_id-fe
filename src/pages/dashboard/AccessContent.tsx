import { useState } from 'react';
import { useUserCredentials } from '../../hooks/useUserCredentials';
import { useNavigate } from 'react-router-dom';

const AccessContent = () => {
  const { credentials, verifyCredential, loading, error } = useUserCredentials();
  const navigate = useNavigate();
  const [verificationResult, setVerificationResult] = useState<{
    isValid: boolean;
    hasAccess: boolean;
    message: string;
  } | null>(null);
  const [selectedCredential, setSelectedCredential] = useState<string>('');

  const handleVerifyAccess = async () => {
    if (!selectedCredential) return;

    try {
      const result = await verifyCredential(selectedCredential);
      if (result) {
        setVerificationResult(result);
      }
    } catch (err) {
      console.error('Verification failed:', err);
    }
  };

  const protectedContent = [
    {
      title: 'Premium Financial Services',
      description: 'Access advanced banking and investment tools',
      icon: '🏦',
      features: ['High-yield savings accounts', 'Investment advisory', 'Loan pre-approval', 'Private banking']
    },
    {
      title: 'Advanced Trading Platform',
      description: 'Professional trading tools and real-time analytics',
      icon: '📈',
      features: ['Real-time market data', 'Advanced charting', 'Algorithmic trading', 'Risk management tools']
    },
    {
      title: 'Exclusive Market Insights',
      description: 'Premium research and market analysis',
      icon: '📊',
      features: ['Market research reports', 'Expert analysis', 'Trend predictions', 'Economic forecasts']
    },
    {
      title: 'Priority Support',
      description: '24/7 dedicated customer service',
      icon: '🎯',
      features: ['Dedicated account manager', '24/7 phone support', 'Priority ticket resolution', 'Personal consultation']
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Access Protected Content 🔐
        </h1>
        <p className="text-gray-400 text-lg">
          Use your verified credentials to unlock exclusive content and services
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="glass-card rounded-2xl p-4 border-l-4 border-red-500">
          <div className="flex items-center gap-2">
            <span className="text-red-400">⚠️</span>
            <p className="text-red-200">{error}</p>
          </div>
        </div>
      )}

      {credentials.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <div className="text-6xl mb-6">🔒</div>
          <h2 className="text-2xl font-semibold text-white mb-4">No Credentials Available</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            You need verified credentials to access protected content. Create your first credential to get started.
          </p>
          <button 
            onClick={() => navigate('/dashboard/get-credential')}
            className="glass-button px-8 py-3 rounded-xl text-white font-medium hover:scale-105 transition-all duration-200 bg-blue-500/20"
          >
            <span className="flex items-center gap-2">
              <span>✨</span>
              Create Credential
            </span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Verification Panel */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <span>🔍</span>
                Verify Credentials
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Select Credential
                  </label>
                  <select
                    value={selectedCredential}
                    onChange={(e) => setSelectedCredential(e.target.value)}
                    className="w-full glass-dark rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
                  >
                    <option value="" className="bg-gray-800">Choose a credential...</option>
                    {credentials.map((cred) => (
                      <option key={cred.id} value={cred.suiVcId || cred.id} className="bg-gray-800">
                        {cred.credentialData.fullName} - {new Date(cred.issuedAt).toLocaleDateString()}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleVerifyAccess}
                  disabled={!selectedCredential || loading}
                  className="w-full glass-button px-6 py-3 rounded-xl text-white font-medium hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Verifying...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <span>🔐</span>
                      Verify Access
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Verification Result */}
            {verificationResult && (
              <div className={`glass-card rounded-2xl p-6 ${
                verificationResult.hasAccess 
                  ? 'border-l-4 border-green-500' 
                  : 'border-l-4 border-red-500'
              }`}>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <span>{verificationResult.hasAccess ? '✅' : '❌'}</span>
                  Verification Result
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className={`font-medium ${verificationResult.isValid ? 'text-green-400' : 'text-red-400'}`}>
                      {verificationResult.isValid ? 'Valid' : 'Invalid'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Access:</span>
                    <span className={`font-medium ${verificationResult.hasAccess ? 'text-green-400' : 'text-red-400'}`}>
                      {verificationResult.hasAccess ? 'Granted' : 'Denied'}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-gray-700/50">
                    <p className="text-gray-300 text-sm">{verificationResult.message}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Content Area */}
          <div className="lg:col-span-2">
            {verificationResult?.hasAccess ? (
              <div className="space-y-6">
                {/* Success Header */}
                <div className="glass-card rounded-2xl p-8 text-center border-l-4 border-green-500">
                  <div className="text-6xl mb-4">🎉</div>
                  <h2 className="text-2xl font-semibold text-white mb-2">
                    Protected Content Unlocked!
                  </h2>
                  <p className="text-gray-300">
                    Your KYC verification has been successfully confirmed. Welcome to exclusive content!
                  </p>
                </div>

                {/* Protected Content Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {protectedContent.map((content, index) => (
                    <div key={index} className="glass-card rounded-2xl p-6 hover:scale-105 transition-all duration-200 cursor-pointer group">
                      <div className="text-4xl mb-4">{content.icon}</div>
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {content.title}
                      </h3>
                      <p className="text-gray-400 mb-4 text-sm">
                        {content.description}
                      </p>
                      <div className="space-y-2">
                        {content.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></div>
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <button className="w-full mt-4 glass-dark px-4 py-2 rounded-xl text-white text-sm font-medium hover:scale-105 transition-all duration-200">
                        Access Now
                      </button>
                    </div>
                  ))}
                </div>

                {/* Additional Benefits */}
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <span>🌟</span>
                    Additional Benefits
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="glass-dark rounded-xl p-4 text-center">
                      <div className="text-2xl mb-2">🔒</div>
                      <p className="text-white font-medium mb-1">Secure Access</p>
                      <p className="text-gray-400 text-sm">Blockchain-verified identity</p>
                    </div>
                    <div className="glass-dark rounded-xl p-4 text-center">
                      <div className="text-2xl mb-2">⚡</div>
                      <p className="text-white font-medium mb-1">Instant Verification</p>
                      <p className="text-gray-400 text-sm">No waiting periods</p>
                    </div>
                    <div className="glass-dark rounded-xl p-4 text-center">
                      <div className="text-2xl mb-2">🎯</div>
                      <p className="text-white font-medium mb-1">Personalized Services</p>
                      <p className="text-gray-400 text-sm">Tailored to your profile</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass-card rounded-2xl p-12 text-center">
                <div className="text-6xl mb-6">🔐</div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Content Locked
                </h2>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  Please verify your credentials using the panel on the left to unlock exclusive content and services.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                  {protectedContent.map((content, index) => (
                    <div key={index} className="glass-dark rounded-xl p-4 opacity-50">
                      <div className="text-2xl mb-2">{content.icon}</div>
                      <p className="text-gray-400 text-sm">{content.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Info Panel */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <span>ℹ️</span>
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-blue-400 font-semibold">1</span>
            </div>
            <h4 className="text-white font-medium mb-2">Select Credential</h4>
            <p className="text-gray-400 text-sm">Choose from your verified credentials</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-blue-400 font-semibold">2</span>
            </div>
            <h4 className="text-white font-medium mb-2">Verify Identity</h4>
            <p className="text-gray-400 text-sm">Blockchain verification process</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-blue-400 font-semibold">3</span>
            </div>
            <h4 className="text-white font-medium mb-2">Access Granted</h4>
            <p className="text-gray-400 text-sm">Unlock exclusive content</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-blue-400 font-semibold">4</span>
            </div>
            <h4 className="text-white font-medium mb-2">Enjoy Services</h4>
            <p className="text-gray-400 text-sm">Premium features available</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessContent;
