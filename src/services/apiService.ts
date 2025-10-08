import axios from 'axios';
import { config } from '../config/config';

const api = axios.create({
  baseURL: `${config.apiUrl}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface UserCredential {
  id: string;
  userAddress: string;
  credentialData: {
    fullName: string;
    dateOfBirth: string;
    nationalId: string;
    address: string;
  };
  issuedAt: string;
  suiVcId?: string;
}

export interface CreateCredentialRequest {
  userAddress: string;
  credentialData: {
    fullName: string;
    dateOfBirth: string;
    nationalId: string;
    address: string;
  };
}

export interface VerifyCredentialRequest {
  userAddress: string;
  vcId: string;
}

export interface VerifyCredentialResponse {
  isValid: boolean;
  hasAccess: boolean;
  message: string;
}

// API service functions
export const apiService = {
  // Create a new credential
  createCredential: async (data: CreateCredentialRequest): Promise<UserCredential> => {
    const response = await api.post('/users/credentials', data);
    return response.data;
  },

  // Get user's credentials
  getUserCredentials: async (userAddress: string): Promise<UserCredential[]> => {
    const response = await api.get(`/users/${userAddress}/credentials`);
    return response.data;
  },

  // Verify a credential and check access
  verifyCredential: async (data: VerifyCredentialRequest): Promise<VerifyCredentialResponse> => {
    const response = await api.post('/users/verify', data);
    return response.data;
  },

  // Check if user has a DID
  checkUserDid: async (userAddress: string): Promise<{ hasDid: boolean; didId?: string }> => {
    try {
      const response = await api.get(`/users/${userAddress}/did`);
      return response.data;
    } catch (error) {
      return { hasDid: false };
    }
  },

  // Create DID for user
  createUserDid: async (userAddress: string): Promise<{ didId: string }> => {
    const response = await api.post(`/users/${userAddress}/did`);
    return response.data;
  },
};

export default apiService;
