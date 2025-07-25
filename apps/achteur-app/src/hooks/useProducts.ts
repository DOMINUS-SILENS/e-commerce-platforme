import { useState, useEffect } from 'react';
import AcheteurApiService, { Product, Purchase } from '../services/api';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await AcheteurApiService.getProducts();
      setProducts(data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const buyProduct = async (productId: number): Promise<Purchase> => {
    try {
      const purchase = await AcheteurApiService.buyProduct(productId);
      await fetchProducts(); // Refresh products after purchase
      return purchase;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to purchase product');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    buyProduct,
    refetch: fetchProducts
  };
};

export const usePurchases = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPurchases = async () => {
    try {
      setLoading(true);
      const data = await AcheteurApiService.getPurchases();
      setPurchases(data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch purchases');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  return {
    purchases,
    loading,
    error,
    refetch: fetchPurchases
  };
};
