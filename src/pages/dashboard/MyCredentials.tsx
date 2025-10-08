import { useState } from 'react';
import { useUserCredentials } from '../../hooks/useUserCredentials';
import { useNavigate } from 'react-router-dom';

const MyCredentials = () => {
  const { credentials, loading, error, refetch } = useUserCredentials();
  const navigate = useNavigate();
  const [selectedCredential, setSelectedCredential] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const maskSensitiveData = (data: string, visibleChars = 4) => {
    if (data.length <= visibleChars) return data;
    return '*'.repeat(data.length - visibleChars) + data.slice(-visibleChars);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        <div className="text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            My Credentials 📄
          </h1>
          <p className="text-gray-400 text-lg">
            Manage your digital identity credentials
          </p>
        </div>
        
        <div className="glass-card rounded-2xl p-12 text-center">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your credentials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            My Credentials 📄
          </h1>
          <p className="text-gray-400 text-lg">
            Manage your digital identity credentials
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={refetch}
            className="glass-button px-4 py-2 rounded-xl text-white font-medium hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            <span>🔄</span>
            Refresh
          </button>
          <button
            onClick={() => navigate('/dashboard/get-credential')}
            className="glass-button px-4 py-2 rounded-xl text-white font-medium hover:scale-105 transition-all duration-200 flex items-center gap-2 bg-blue-500/20"
          >
            <span>➕</span>
            New Credential
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-4 text-center">
          <div className="text-2xl mb-2">📊</div>
          <div className="text-2xl font-bold text-white">{credentials.length}</div>
          <div className="text-gray-400 text-sm">Total</div>
        </div>
        <div className="glass-card rounded-2xl p-4 text-center">
          <div className="text-2xl mb-2">✅</div>
          <div className="text-2xl font-bold text-green-400">{credentials.length}</div>
          <div className="text-gray-400 text-sm">Active</div>
        </div>
        <div className="glass-card rounded-2xl p-4 text-center">
          <div className="text-2xl mb-2">🔄</div>
          <div className="text-2xl font-bold text-yellow-400">0</div>
          <div className="text-gray-400 text-sm">Pending</div>
        </div>
        <div className="glass-card rounded-2xl p-4 text-center">
          <div className="text-2xl mb-2">❌</div>
          <div className="text-2xl font-bold text-red-400">0</div>
          <div className="text-gray-400 text-sm">Revoked</div>
        </div>
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

      {/* Credentials Grid */}
      {credentials.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <div className="text-6xl mb-6">📭</div>
          <h3 className="text-2xl font-semibold text-white mb-4">No Credentials Found</h3>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            You haven't created any credentials yet. Get started by creating your first KYC credential.
          </p>
          <button 
            onClick={() => navigate('/dashboard/get-credential')}
            className="glass-button px-8 py-3 rounded-xl text-white font-medium hover:scale-105 transition-all duration-200 bg-green-500/20"
          >
            <span className="flex items-center gap-2">
              <span>✨</span>
              Get Your First Credential
            </span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {credentials.map((credential) => (
            <div 
              key={credential.id} 
              className={`glass-card rounded-2xl p-6 transition-all duration-200 hover:scale-[1.02] cursor-pointer ${
                selectedCredential === credential.id ? 'ring-2 ring-blue-500/50' : ''
              }`}
              onClick={() => setSelectedCredential(
                selectedCredential === credential.id ? null : credential.id
              )}
            >
              {/* Credential Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                    <span>🆔</span>
                    KYC Credential
                  </h3>
                  <p className="text-gray-400 text-sm font-mono">
                    ID: {credential.id ? `${credential.id.slice(0, 8)}...${credential.id.slice(-8)}` : 'N/A'}
                  </p>
                  {credential.suiVcId && (
                    <p className="text-gray-400 text-sm font-mono">
                      Sui VC: {credential.suiVcId.slice(0, 8)}...{credential.suiVcId.slice(-8)}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    Active
                  </span>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    {selectedCredential === credential.id ? '📖' : '📄'}
                  </button>
                </div>
              </div>

              {/* Credential Data */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-dark rounded-lg p-3">
                    <label className="block text-gray-400 text-xs font-medium mb-1">
                      👤 Full Name
                    </label>
                    <p className="text-white font-medium">{credential.credentialData.fullName}</p>
                  </div>
                  <div className="glass-dark rounded-lg p-3">
                    <label className="block text-gray-400 text-xs font-medium mb-1">
                      📅 Date of Birth
                    </label>
                    <p className="text-white">{credential.credentialData.dateOfBirth}</p>
                  </div>
                </div>

                <div className="glass-dark rounded-lg p-3">
                  <label className="block text-gray-400 text-xs font-medium mb-1">
                    🆔 National ID
                  </label>
                  <p className="text-white font-mono">
                    {selectedCredential === credential.id 
                      ? credential.credentialData.nationalId
                      : maskSensitiveData(credential.credentialData.nationalId)
                    }
                  </p>
                </div>

                <div className="glass-dark rounded-lg p-3">
                  <label className="block text-gray-400 text-xs font-medium mb-1">
                    🏠 Address
                  </label>
                  <p className="text-white text-sm">
                    {selectedCredential === credential.id 
                      ? credential.credentialData.address
                      : credential.credentialData.address.slice(0, 20) + '...'
                    }
                  </p>
                </div>
              </div>

              {/* Credential Footer */}
              <div className="border-t border-gray-700/50 pt-4 mt-6">
                <div className="flex justify-between items-center text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">📅 Issued:</span>
                    <span className="text-white">{formatDate(credential.issuedAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">👤 User:</span>
                    <span className="text-white font-mono text-xs">
                      {credential.userAddress.slice(0, 6)}...{credential.userAddress.slice(-4)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button 
                    className="flex-1 glass-dark px-3 py-2 rounded-lg text-white text-sm font-medium hover:scale-105 transition-all duration-200 flex items-center justify-center gap-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle view details
                    }}
                  >
                    <span>👁️</span>
                    Details
                  </button>
                  <button 
                    className="flex-1 glass-dark px-3 py-2 rounded-lg text-white text-sm font-medium hover:scale-105 transition-all duration-200 flex items-center justify-center gap-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/dashboard/access-content');
                    }}
                  >
                    <span>🔐</span>
                    Use
                  </button>
                  <button 
                    className="glass-dark px-3 py-2 rounded-lg text-gray-400 text-sm font-medium hover:scale-105 transition-all duration-200 hover:text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle download
                    }}
                  >
                    📥
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Information Panel */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <span>💡</span>
          About Your Credentials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-300 text-sm">
                Your credentials are stored securely on the Sui blockchain
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-300 text-sm">
                Only you have access to your credential data through your wallet
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-300 text-sm">
                Credentials can be used to prove your identity without revealing personal details
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-300 text-sm">
                You can revoke access to your credentials at any time
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCredentials;
