import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await supabase.functions.invoke('auth', {
        body: { action: 'login', email, password }
      });

      if (error) throw error;
      setMessage('Connexion réussie!');
      
      // Redirect based on user type or default to buyer
      setTimeout(() => {
        navigate('/buyer');
      }, 1000);
    } catch (error) {
      setMessage('Échec de la connexion. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-2xl border-0">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <LogIn className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Connexion
          </CardTitle>
          <CardDescription className="text-gray-600">
            Connectez-vous à votre compte pour accéder à votre espace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white/70 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
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
                  className="pl-10 bg-white/70 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
              variant="premium"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </Button>
            {message && (
              <p className={`text-sm text-center font-medium ${
                message.includes('réussie') ? 'text-green-600' : 'text-red-600'
              }`}>
                {message}
              </p>
            )}
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                Pas encore de compte?{' '}
                <Link to="/signup" className="text-purple-600 hover:text-purple-700 font-semibold hover:underline transition-colors">
                  S'inscrire
                </Link>
              </p>
              <div className="flex justify-center space-x-4 pt-4">
                <Link to="/buyer">
                  <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                    Espace Acheteur
                  </Button>
                </Link>
                <Link to="/seller">
                  <Button variant="outline" size="sm" className="text-green-600 border-green-200 hover:bg-green-50">
                    Espace Vendeur
                  </Button>
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;