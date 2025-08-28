import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'reset'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const { signIn, signUp, resetPassword, user, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Check for mode in URL params
  useEffect(() => {
    const urlMode = searchParams.get('mode');
    if (urlMode === 'reset') {
      setMode('reset');
    }
  }, [searchParams]);

  // Redirect if already authenticated
  useEffect(() => {
    if (user && !loading) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.email) {
      setError('Email wajib diisi');
      return false;
    }

    if (mode !== 'reset' && !formData.password) {
      setError('Password wajib diisi');
      return false;
    }

    if (mode === 'signup') {
      if (!formData.fullName) {
        setError('Nama lengkap wajib diisi');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Konfirmasi password tidak cocok');
        return false;
      }
      if (formData.password.length < 6) {
        setError('Password minimal 6 karakter');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!validateForm()) return;

    try {
      if (mode === 'signin') {
        const { error } = await signIn(formData.email, formData.password);
        
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            setError('Email atau password salah');
          } else if (error.message.includes('Email not confirmed')) {
            setError('Silakan cek email Anda untuk verifikasi akun');
          } else {
            setError(error.message);
          }
        } else {
          toast({
            title: "Login berhasil!",
            description: "Selamat datang di RealShirt"
          });
        }
      } else if (mode === 'signup') {
        const metadata = {
          full_name: formData.fullName,
          phone: formData.phone
        };

        const { error } = await signUp(formData.email, formData.password, metadata);
        
        if (error) {
          if (error.message.includes('User already registered')) {
            setError('Email sudah terdaftar. Silakan gunakan email lain atau login.');
          } else {
            setError(error.message);
          }
        } else {
          setMessage('Akun berhasil dibuat! Silakan cek email untuk verifikasi.');
          toast({
            title: "Pendaftaran berhasil!",
            description: "Cek email Anda untuk verifikasi akun"
          });
        }
      } else if (mode === 'reset') {
        const { error } = await resetPassword(formData.email);
        
        if (error) {
          setError(error.message);
        } else {
          setMessage('Link reset password telah dikirim ke email Anda.');
          toast({
            title: "Email terkirim!",
            description: "Cek email Anda untuk reset password"
          });
        }
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link 
          to="/" 
          className="inline-flex items-center text-white hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali ke Beranda
        </Link>

        <Card className="glass-card border-white/10">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <img 
                src="/lovable-uploads/5decbe66-1b1c-47ed-a83a-059ca66c2f8e.png" 
                alt="RealShirt Logo" 
                className="h-16 w-16"
              />
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              {mode === 'signin' && 'Masuk ke RealShirt'}
              {mode === 'signup' && 'Daftar RealShirt'}
              {mode === 'reset' && 'Reset Password'}
            </CardTitle>
            <p className="text-muted-foreground">
              {mode === 'signin' && 'Masuk untuk mengakses akun Anda'}
              {mode === 'signup' && 'Buat akun untuk mulai memesan'}
              {mode === 'reset' && 'Masukkan email untuk reset password'}
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {message && (
              <Alert>
                <AlertDescription className="text-green-700">{message}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Full Name - Only for signup */}
              {mode === 'signup' && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nama Lengkap</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Nama lengkap Anda"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Phone - Only for signup */}
              {mode === 'signup' && (
                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor WhatsApp (Opsional)</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="08XX XXXX XXXX"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              )}

              {/* Password - Not for reset */}
              {mode !== 'reset' && (
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password Anda"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Confirm Password - Only for signup */}
              {mode === 'signup' && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Konfirmasi password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full bg-primary hover:bg-primary/80" disabled={loading}>
                {loading ? 'Memproses...' : (
                  mode === 'signin' ? 'Masuk' :
                  mode === 'signup' ? 'Daftar' : 'Kirim Reset Link'
                )}
              </Button>
            </form>

            <div className="space-y-4">
              <Separator />
              
              {/* Mode switching */}
              <div className="text-center space-y-2">
                {mode === 'signin' && (
                  <>
                    <p className="text-sm text-muted-foreground">
                      Belum punya akun?{' '}
                      <button
                        onClick={() => setMode('signup')}
                        className="text-primary hover:underline font-medium"
                      >
                        Daftar disini
                      </button>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Lupa password?{' '}
                      <button
                        onClick={() => setMode('reset')}
                        className="text-primary hover:underline font-medium"
                      >
                        Reset password
                      </button>
                    </p>
                  </>
                )}

                {mode === 'signup' && (
                  <p className="text-sm text-muted-foreground">
                    Sudah punya akun?{' '}
                    <button
                      onClick={() => setMode('signin')}
                      className="text-primary hover:underline font-medium"
                    >
                      Masuk disini
                    </button>
                  </p>
                )}

                {mode === 'reset' && (
                  <p className="text-sm text-muted-foreground">
                    Kembali ke{' '}
                    <button
                      onClick={() => setMode('signin')}
                      className="text-primary hover:underline font-medium"
                    >
                      halaman login
                    </button>
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-white/60 mt-6">
          Dengan mendaftar, Anda setuju dengan syarat dan ketentuan RealShirt
        </p>
      </div>
    </div>
  );
};

export default Auth;