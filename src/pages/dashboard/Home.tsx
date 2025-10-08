import { useCurrentAccount } from '@mysten/dapp-kit';
import { useUserCredentials } from '../../hooks/useUserCredentials';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const account = useCurrentAccount();
  const { credentials, hasDid, createDid, loading, error } = useUserCredentials();
  const navigate = useNavigate();

  const handleCreateDid = async () => {
    await createDid();
  };

  const stats = [
    { label: 'Total Credentials', value: credentials.length, icon: '📄', color: 'blue' },
    { label: 'Active Status', value: hasDid ? 'Active' : 'Inactive', icon: '🟢', color: 'green' },
    { label: 'DID Created', value: hasDid ? 'Yes' : 'No', icon: '🆔', color: 'purple' },
    { label: 'Verifications', value: credentials.length, icon: '✅', color: 'cyan' },
  ];

  const quickActions = [
    { 
      title: 'Get New Credential', 
      description: 'Create a new KYC credential',
      icon: '📄',
      action: () => navigate('/dashboard/get-credential'),
      color: 'green'
    },
    { 
      title: 'View Credentials', 
      description: 'Manage your existing credentials',
      icon: '🎯',
      action: () => navigate('/dashboard/my-credentials'),
      color: 'blue'
    },
    { 
      title: 'Access Content', 
      description: 'Use credentials to access protected content',
      icon: '🔐',
      action: () => navigate('/dashboard/access-content'),
      color: 'purple'
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome Section */}
      <div className="text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Welcome back! 👋
        </h1>
        <p className="text-gray-400 text-lg">
          Manage your digital identity and credentials
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

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="glass-card rounded-2xl p-4 sm:p-6 text-center">
            <div className="text-2xl sm:text-3xl mb-2">{stat.icon}</div>
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
              {stat.value}
            </div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Account & DID Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Info */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span>👤</span>
            Account Information
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-400 text-sm mb-1">Wallet Address</p>
              <div className="glass-dark rounded-lg p-3">
                <p className="text-white font-mono text-sm break-all">
                  {account?.address || 'Not connected'}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">DID Status</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`w-3 h-3 rounded-full ${hasDid ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-white font-medium">
                    {hasDid ? 'Created' : 'Not Created'}
                  </span>
                </div>
              </div>
              {!hasDid && (
                <button
                  onClick={handleCreateDid}
                  disabled={loading}
                  className="glass-button px-4 py-2 rounded-xl text-white font-medium hover:scale-105 transition-all duration-200 disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create DID'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Credentials Overview */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span>📋</span>
            Credentials Overview
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Credentials</span>
              <span className="text-white font-semibold text-lg">{credentials.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Active</span>
              <span className="text-green-400 font-semibold">{credentials.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Revoked</span>
              <span className="text-red-400 font-semibold">0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Last Issued</span>
              <span className="text-white text-sm">
                {credentials.length > 0 
                  ? new Date(credentials[credentials.length - 1].issuedAt).toLocaleDateString()
                  : 'None'
                }
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <span>⚡</span>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="glass-card rounded-xl p-6 text-left hover:scale-105 transition-all duration-200 group"
            >
              <div className="text-3xl mb-3">{action.icon}</div>
              <h3 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                {action.title}
              </h3>
              <p className="text-gray-400 text-sm">{action.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <span>📈</span>
          Recent Activity
        </h2>
        {credentials.length > 0 ? (
          <div className="space-y-3">
            {credentials.slice(0, 3).map((cred) => (
              <div key={cred.id} className="glass-dark rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-blue-400">📄</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{cred.credentialData.fullName}</p>
                    <p className="text-gray-400 text-sm">Credential issued</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white text-sm">
                    {new Date(cred.issuedAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {new Date(cred.issuedAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">📭</div>
            <p className="text-gray-400 mb-4">No recent activity</p>
            <p className="text-gray-500 text-sm">Your credential activities will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
