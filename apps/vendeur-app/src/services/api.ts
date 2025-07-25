// API service for vendeur-app to integrate with backend
import { AuthService } from '../../../../shared/utils/auth';

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

export interface ProductCreate {
  name: string;
  price: number;
  description?: string;
  stock: number;
}

export interface Purchase {
  id: number;
  user_id: number;
  product_id: number;
  product: Product;
  created_at: string;
}

export interface DashboardStats {
  totalProducts: number;
  totalSales: number;
  totalRevenue: number;
  recentOrders: Purchase[];
}

class VendeurApiService {
  // Get dashboard statistics
  static async getDashboardStats(): Promise<DashboardStats> {
    try {
      const [productsResponse, purchasesResponse] = await Promise.all([
        AuthService.apiRequest('/vendeur/products'),
        AuthService.apiRequest('/vendeur/purchases')
      ]);

      const products: Product[] = await productsResponse.json();
      const purchases: Purchase[] = await purchasesResponse.json();

      const totalProducts = products.length;
      const totalSales = purchases.length;
      const totalRevenue = purchases.reduce((sum, purchase) => sum + purchase.product.price, 0);
      const recentOrders = purchases.slice(-5).reverse(); // Last 5 orders

      return {
        totalProducts,
        totalSales,
        totalRevenue,
        recentOrders
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  }

  // Get all products for current vendeur
  static async getProducts(): Promise<Product[]> {
    try {
      const response = await AuthService.apiRequest('/vendeur/products');
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  // Get single product by ID
  static async getProduct(productId: number): Promise<Product> {
    try {
      const response = await AuthService.apiRequest(`/vendeur/products/${productId}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  // Create new product
  static async createProduct(productData: ProductCreate): Promise<Product> {
    try {
      const response = await AuthService.apiRequest('/vendeur/products', {
        method: 'POST',
        body: JSON.stringify(productData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  // Update existing product
  static async updateProduct(productId: number, productData: ProductCreate): Promise<Product> {
    try {
      const response = await AuthService.apiRequest(`/vendeur/products/${productId}`, {
        method: 'PUT',
        body: JSON.stringify(productData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  // Delete product
  static async deleteProduct(productId: number): Promise<void> {
    try {
      await AuthService.apiRequest(`/vendeur/products/${productId}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  // Get sales/purchases for current vendeur
  static async getPurchases(): Promise<Purchase[]> {
    try {
      const response = await AuthService.apiRequest('/vendeur/purchases');
      return await response.json();
    } catch (error) {
      console.error('Error fetching purchases:', error);
      throw error;
    }
  }

  // Get vendeur dashboard info
  static async getVendeurDashboard(): Promise<{ message: string }> {
    try {
      const response = await AuthService.apiRequest('/vendeur/vendre');
      return await response.json();
    } catch (error) {
      console.error('Error fetching vendeur dashboard:', error);
      throw error;
    }
  }
}

export default VendeurApiService;
