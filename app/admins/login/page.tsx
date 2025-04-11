"use client";
import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      router.push('/admin/dashboard/members');

      toast.success('Welcome back! Redirecting...');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
      <div className="w-full max-w-md bg-white/100 backdrop-blur-lg rounded-2xl shadow-xl px-8 py-12 mx-4">
        <div className="text-center mb-10">
          <div className="flex flex-col items-center justify-center gap-3 mb-3">
            <Image
              src="/logo.png"
              alt="Logo"
              width={60}
              height={60}
              className="rounded-lg  transition-transform"
            />
            <h1 className="text-2xl font-bold text-gray-900">NextGen Innovators</h1>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
          </h2>
          Admin Login
          <p className="text-gray-600"> </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-1 outline-0  focus:ring-gray-500 focus:border-gray-500"
                disabled={isLoading}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 outline-0 focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white rounded-full animate-spin" />
                Signing In...
              </span>
            ) : (
              'Sign In'
            )}
          </button>

          {/* <div className="text-center text-sm text-gray-600">
            <Link href="/forgot-password" className="text-orange-600 hover:underline">
              Forgot password?
            </Link>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;