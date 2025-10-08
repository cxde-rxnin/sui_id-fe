import { useState } from 'react';
import { useUserCredentials } from '../../hooks/useUserCredentials';

const GetCredential = () => {
  const { createCredential, loading, error, hasDid } = useUserCredentials();
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    nationalId: '',
    address: '',
  });
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    try {
      await createCredential(formData);
      setSuccess(true);
      setFormData({
        fullName: '',
        dateOfBirth: '',
        nationalId: '',
        address: '',
      });
    } catch (err) {
      console.error('Failed to create credential:', err);
    }
  };

  if (!hasDid) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        <div className="text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Get New Credential 🆔
          </h1>
          <p className="text-gray-400 text-lg">
            Create a new KYC credential for identity verification
          </p>
        </div>

        <div className="glass-card rounded-2xl p-8 text-center">
          <div className="text-6xl mb-6">🔐</div>
          <h2 className="text-2xl font-semibold text-white mb-4">DID Required</h2>
          <p className="text-gray-300 mb-4">
            You need to create a Decentralized Identity (DID) before you can request credentials.
          </p>
          <p className="text-gray-400 mb-6">
            Please go to the Home page and create your DID first.
          </p>
          <button
            onClick={() => window.location.href = '/dashboard/home'}
            className="glass-button px-6 py-3 rounded-xl text-white font-medium hover:scale-105 transition-all duration-200"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const isFormValid = formData.fullName && formData.dateOfBirth && formData.nationalId && formData.address;

  const formFields = [
    { 
      name: 'fullName', 
      label: 'Full Name', 
      type: 'text', 
      placeholder: 'Enter your full legal name', 
      icon: '👤',
      required: true 
    },
    { 
      name: 'dateOfBirth', 
      label: 'Date of Birth', 
      type: 'date', 
      placeholder: '', 
      icon: '📅',
      required: true 
    },
    { 
      name: 'nationalId', 
      label: 'National ID / SSN', 
      type: 'text', 
      placeholder: 'Enter your national ID or SSN', 
      icon: '🆔',
      required: true 
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Get New Credential 🆔
        </h1>
        <p className="text-gray-400 text-lg">
          Create a new KYC credential for identity verification
        </p>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="glass-card rounded-2xl p-4 border-l-4 border-red-500">
          <div className="flex items-center gap-2">
            <span className="text-red-400">⚠️</span>
            <p className="text-red-200">{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="glass-card rounded-2xl p-4 border-l-4 border-green-500">
          <div className="flex items-center gap-2">
            <span className="text-green-400">✅</span>
            <p className="text-green-200">
              Credential created successfully! Check "My Credentials" to view it.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              <span>📝</span>
              KYC Information Form
            </h2>
            <p className="text-gray-400 mb-8">
              Please fill out the form below to create your KYC (Know Your Customer) credential.
              This information will be stored securely on the Sui blockchain.
            </p>

            <div className="space-y-6">
              {formFields.map((field) => (
                <div key={field.name}>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    <span className="flex items-center gap-2">
                      <span>{field.icon}</span>
                      {field.label} {field.required && <span className="text-red-400">*</span>}
                    </span>
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    className="w-full glass-dark rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
                    required={field.required}
                  />
                </div>
              ))}

              {/* Address Field */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  <span className="flex items-center gap-2">
                    <span>🏠</span>
                    Address <span className="text-red-400">*</span>
                  </span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your full address"
                  rows={3}
                  className="w-full glass-dark rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 resize-none"
                  required
                />
              </div>

              {/* Privacy Notice */}
              <div className="glass-dark rounded-xl p-6">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <span>🔒</span>
                  Privacy Notice
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Your information will be encrypted and stored as a verifiable credential on the Sui blockchain.
                  Only you control access to this data through your wallet.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={!isFormValid || loading}
                className="flex-1 glass-button px-6 py-3 rounded-xl text-white font-medium hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating Credential...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <span>✨</span>
                    Create KYC Credential
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setFormData({
                  fullName: '',
                  dateOfBirth: '',
                  nationalId: '',
                  address: '',
                })}
                className="glass-card px-6 py-3 rounded-xl text-gray-300 font-medium hover:scale-105 transition-all duration-200"
              >
                Reset Form
              </button>
            </div>
          </form>
        </div>

        {/* Info Panel */}
        <div className="space-y-6">
          {/* Requirements */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span>📋</span>
              Requirements
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300 text-sm">Valid government-issued identification</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300 text-sm">Accurate personal information</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300 text-sm">Valid residential address</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300 text-sm">Created DID (Decentralized Identity)</p>
              </div>
            </div>
          </div>

          {/* Process Steps */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span>🔄</span>
              Process
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-400 text-sm font-semibold">1</span>
                </div>
                <p className="text-gray-300 text-sm">Fill out the KYC form with accurate information</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-400 text-sm font-semibold">2</span>
                </div>
                <p className="text-gray-300 text-sm">Submit for verification and processing</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-400 text-sm font-semibold">3</span>
                </div>
                <p className="text-gray-300 text-sm">Credential issued to your DID</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-400 text-sm font-semibold">4</span>
                </div>
                <p className="text-gray-300 text-sm">Use credential for identity verification</p>
              </div>
            </div>
          </div>

          {/* Security Information */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span>🛡️</span>
              Security
            </h3>
            <div className="space-y-3">
              <p className="text-gray-300 text-sm leading-relaxed">
                🔐 End-to-end encryption for all data
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                🌐 Stored on Sui blockchain for immutability
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                🔑 You control access with your private wallet
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                ✅ Verifiable credentials standard compliance
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetCredential;
