import { useState, useEffect } from 'react';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { apiService, type UserCredential } from '../services/apiService';

export const useUserCredentials = () => {
  const account = useCurrentAccount();
  const [credentials, setCredentials] = useState<UserCredential[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasDid, setHasDid] = useState(false);

  // Check if user has a DID
  const checkDid = async () => {
    if (!account?.address) return;
    
    try {
      const result = await apiService.checkUserDid(account.address);
      setHasDid(result.hasDid);
    } catch (err) {
      console.error('Error checking DID:', err);
      setHasDid(false);
    }
  };

  // Create DID for user
  const createDid = async () => {
    if (!account?.address) return;
    
    setLoading(true);
    try {
      await apiService.createUserDid(account.address);
      setHasDid(true);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create DID');
    } finally {
      setLoading(false);
    }
  };

  // Fetch user credentials
  const fetchCredentials = async () => {
    if (!account?.address) return;
    
    setLoading(true);
    try {
      const userCredentials = await apiService.getUserCredentials(account.address);
      setCredentials(userCredentials);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch credentials');
      setCredentials([]);
    } finally {
      setLoading(false);
    }
  };

  // Create new credential
  const createCredential = async (credentialData: {
    fullName: string;
    dateOfBirth: string;
    nationalId: string;
    address: string;
  }) => {
    if (!account?.address) return;
    
    setLoading(true);
    try {
      const newCredential = await apiService.createCredential({
        userAddress: account.address,
        credentialData,
      });
      setCredentials(prev => [...prev, newCredential]);
      setError(null);
      return newCredential;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create credential');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Verify credential and get access
  const verifyCredential = async (vcId: string) => {
    if (!account?.address) return;
    
    setLoading(true);
    try {
      const result = await apiService.verifyCredential({
        userAddress: account.address,
        vcId,
      });
      setError(null);
      return result;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to verify credential');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Check DID status when account changes
  useEffect(() => {
    if (account?.address) {
      checkDid();
    } else {
      setHasDid(false);
      setCredentials([]);
    }
  }, [account?.address]);

  // Fetch credentials when user has DID
  useEffect(() => {
    if (account?.address && hasDid) {
      fetchCredentials();
    }
  }, [account?.address, hasDid]);

  return {
    credentials,
    loading,
    error,
    hasDid,
    createDid,
    createCredential,
    verifyCredential,
    fetchCredentials,
    refetch: fetchCredentials,
  };
};
