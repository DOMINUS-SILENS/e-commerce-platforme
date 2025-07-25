import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface Store {
  id: string;
  owner_id: string;
  name: string;
  description?: string;
  logo_url?: string;
  banner_url?: string;
  contact_email: string;
  contact_phone?: string;
  address?: string;
  website_url?: string;
  social_links?: Record<string, string>;
  theme_colors?: Record<string, string>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useStores = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStores = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('stores', {
        body: {}
      });
      
      if (error) throw error;
      setStores(data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stores');
    } finally {
      setLoading(false);
    }
  };

  const createStore = async (store: Omit<Store, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase.functions.invoke('stores', {
        body: store
      });
      
      if (error) throw error;
      await fetchStores();
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create store');
    }
  };

  const updateStore = async (id: string, updates: Partial<Store>) => {
    try {
      const { data, error } = await supabase.functions.invoke('stores', {
        body: { ...updates, id }
      });
      
      if (error) throw error;
      await fetchStores();
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update store');
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return {
    stores,
    loading,
    error,
    createStore,
    updateStore,
    refetch: fetchStores
  };
};