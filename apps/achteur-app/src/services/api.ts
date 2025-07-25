// API service for achteur-app to integrate with backend
import { AuthService } from '@shared/utils/auth';

const API_BASE_URL = 'http://localhost:8000';

export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  stock: number;
  vendeur_id: number;
  created_at?: string;
  updated_at?: string;
}

export interface Purchase {
  id: number;
  user_id: number;
  product_id: number;
  product: Product;
  created_at: string;
}

export interface BuyerStats {
  totalPurchases: number;
  totalSpent: number;
  recentPurchases: Purchase[];
  availableProducts: Product[];
}

class AcheteurApiService {
  // Get buyer dashboard statistics
  static async getBuyerStats(): Promise<BuyerStats> {
    try {
      const [productsResponse, purchasesResponse] = await Promise.all([
        AuthService.apiRequest('/acheteur/products'),
        AuthService.apiRequest('/acheteur/purchases')
      ]);

      const availableProducts: Product[] = await productsResponse.json();
      const purchases: Purchase[] = await purchasesResponse.json();

      const totalPurchases = purchases.length;
      const totalSpent = purchases.reduce((sum, purchase) => sum + purchase.product.price, 0);
      const recentPurchases = purchases.slice(-5).reverse(); // Last 5 purchases

      return {
        totalPurchases,
        totalSpent,
        recentPurchases,
        availableProducts
      };
    } catch (error) {
      console.error('Error fetching buyer stats:', error);
      throw error;
    }
  }

  // Get all available products for purchase
  static async getProducts(): Promise<Product[]> {
    try {
      const response = await AuthService.apiRequest('/acheteur/products');
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  // Purchase a product
  static async buyProduct(productId: number): Promise<Purchase> {
    try {
      const response = await AuthService.apiRequest(`/acheteur/buy/${productId}`, {
        method: 'POST'
      });
      return await response.json();
    } catch (error) {
      console.error('Error purchasing product:', error);
      throw error;
    }
  }

  // Get buyer's purchase history
  static async getPurchases(): Promise<Purchase[]> {
    try {
      const response = await AuthService.apiRequest('/acheteur/purchases');
      return await response.json();
    } catch (error) {
      console.error('Error fetching purchases:', error);
      throw error;
    }
  }

  // Get buyer dashboard info
  static async getBuyerDashboard(): Promise<{ message: string }> {
    try {
      const response = await AuthService.apiRequest('/acheteur/boutique');
      return await response.json();
    } catch (error) {
      console.error('Error fetching buyer dashboard:', error);
      throw error;
    }
  }
}

export default AcheteurApiService;
