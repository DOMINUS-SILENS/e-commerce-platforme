import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/lib/supabase';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, Store, ShoppingCart } from 'lucide-react';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [userType, setUserType] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await supabase.functions.invoke('auth', {
        body: { action: 'signup', email, password, fullName, userType }
      });

      if (error) throw error;
      setMessage('Compte créé avec succès!');
      
      setTimeout(() => {
        navigate(userType === 'seller' ? '/seller' : '/buyer');
      }, 1000);
    } catch (error) {
      setMessage('Échec de l\'inscription. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-2xl border-0">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
            <UserPlus className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Inscription
          </CardTitle>
          <CardDescription className="text-gray-600">
            Créez votre compte pour commencer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-gray-700 font-medium">Nom complet</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pl-10 bg-white/70 border-gray-200 focus:border-purple-400"
                  placeholder="Votre nom complet"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white/70 border-gray-200 focus:border-purple-400"
                  placeholder="votre@email.com"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-white/70 border-gray-200 focus:border-purple-400"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Type de compte</Label>
              <Select value={userType} onValueChange={setUserType} required>
                <SelectTrigger className="bg-white/70 border-gray-200 focus:border-purple-400">
                  <SelectValue placeholder="Choisissez votre type de compte" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buyer">
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="h-4 w-4" />
                      Acheteur
                    </div>
                  </SelectItem>
                  <SelectItem value="seller">
                    <div className="flex items-center gap-2">
                      <Store className="h-4 w-4" />
                      Vendeur
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
              variant="premium"
            >
              {loading ? 'Création du compte...' : 'Créer mon compte'}
            </Button>
            {message && (
              <p className={`text-sm text-center font-medium ${
                message.includes('succès') ? 'text-green-600' : 'text-red-600'
              }`}>
                {message}
              </p>
            )}
            <p className="text-sm text-center text-gray-600">
              Déjà un compte?{' '}
              <Link to="/login" className="text-purple-600 hover:text-purple-700 font-semibold hover:underline transition-colors">
                Se connecter
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;