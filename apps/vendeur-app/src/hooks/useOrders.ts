import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface OrderItem {
  id: string;
  product_id: string;
  quantity: number;
  price_per_unit: number;
  products?: {
    name: string;
    image_url?: string;
  };
}

export interface Order {
  id: string;
  store_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  shipping_address: string;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  notes?: string;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
}

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('orders', {
        body: {}
      });
      
      if (error) throw error;
      setOrders(data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (order: Omit<Order, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase.functions.invoke('orders', {
        body: order
      });
      
      if (error) throw error;
      await fetchOrders();
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create order');
    }
  };

  const updateOrder = async (id: string, updates: Partial<Order>) => {
    try {
      const { data, error } = await supabase.functions.invoke('orders', {
        body: { ...updates, id }
      });
      
      if (error) throw error;
      await fetchOrders();
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update order');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    loading,
    error,
    createOrder,
    updateOrder,
    refetch: fetchOrders
  };
};