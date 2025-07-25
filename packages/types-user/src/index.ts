export type UserRole = 'buyer' | 'seller' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
} 