import React from 'react';
import { useUserCredentials } from '../../hooks/useUserCredentials';

const MyCredentials: React.FC = () => {
  const { credentials, loading, error, refetch } = useUserCredentials();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-white mb-6">My Credentials</h1>
        <div className="text-center text-gray-400">Loading credentials...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">My Credentials</h1>
        <button
          onClick={refetch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Refresh
        </button>
      </div>
      
      {error && (
        <div className="bg-red-500 text-white p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {credentials.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No Credentials Found</h3>
          <p className="text-gray-400 mb-4">You haven't created any credentials yet.</p>
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Get Your First Credential
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {credentials.map((credential) => (
            <div key={credential.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">
                    KYC Credential
                  </h3>
                  <p className="text-gray-400 text-sm">
                    ID: {credential.id}
                  </p>
                  {credential.suiVcId && (
                    <p className="text-gray-400 text-sm">
                      Sui VC ID: {credential.suiVcId}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="bg-green-600 text-green-100 px-3 py-1 rounded-full text-sm font-medium">
                    Active
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <p className="text-white">{credential.credentialData.fullName}</p>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-1">
                    Date of Birth
                  </label>
                  <p className="text-white">{credential.credentialData.dateOfBirth}</p>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-1">
                    National ID
                  </label>
                  <p className="text-white">
                    {credential.credentialData.nationalId.replace(/./g, '*').slice(0, -4) + 
                     credential.credentialData.nationalId.slice(-4)}
                  </p>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-medium mb-1">
                    Address
                  </label>
                  <p className="text-white">{credential.credentialData.address}</p>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <div className="flex justify-between items-center text-sm">
                  <div>
                    <span className="text-gray-400">Issued: </span>
                    <span className="text-white">{formatDate(credential.issuedAt)}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">User: </span>
                    <span className="text-white font-mono text-xs">
                      {credential.userAddress.slice(0, 6)}...{credential.userAddress.slice(-4)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex space-x-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  View Details
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Use for Access
                </button>
                <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 bg-gray-800 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-white mb-3">About Your Credentials</h2>
        <div className="text-gray-400 space-y-2">
          <p>• Your credentials are stored securely on the Sui blockchain</p>
          <p>• Only you have access to your credential data through your wallet</p>
          <p>• Credentials can be used to prove your identity without revealing personal details</p>
          <p>• You can revoke access to your credentials at any time</p>
        </div>
      </div>
    </div>
  );
};

export default MyCredentials;
