import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  full_name: z.string().min(2),
  is_active: z.boolean(),
  role: z.enum(['vendeur', 'acheteur', 'admin']),
  created_at: z.string(),
  updated_at: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export const RegisterDataSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  full_name: z.string().min(2),
  role: z.enum(['vendeur', 'acheteur', 'admin']),
});

export type RegisterData = z.infer<typeof RegisterDataSchema>;
