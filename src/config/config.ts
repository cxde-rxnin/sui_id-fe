// Frontend configuration using Vite environment variables

export const config = {
  // API Configuration
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  
  // Sui Network Configuration
  suiRpcUrl: import.meta.env.VITE_SUI_RPC_URL || 'https://fullnode.testnet.sui.io:443',
  
  // Sui Object IDs
  suiPackageId: import.meta.env.VITE_SUI_PACKAGE_ID!,
  suiPolicyId: import.meta.env.VITE_SUI_POLICY_ID!,
  suiSchemaId: import.meta.env.VITE_SUI_SCHEMA_ID!,
  issuerDidId: import.meta.env.VITE_ISSUER_DID_ID!,
  issuerAddress: import.meta.env.VITE_ISSUER_ADDRESS!,
};

// Validate required environment variables
const requiredEnvVars = [
  'VITE_SUI_PACKAGE_ID',
  'VITE_SUI_POLICY_ID', 
  'VITE_SUI_SCHEMA_ID',
  'VITE_ISSUER_DID_ID',
  'VITE_ISSUER_ADDRESS'
];

for (const envVar of requiredEnvVars) {
  if (!import.meta.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
  }
}

export default config;
