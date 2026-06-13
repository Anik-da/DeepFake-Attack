'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, Mail, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithGoogle } = useAuth();
  
  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      } else {
        setErrorMsg('Invalid credentials. Password must be at least 6 characters.');
        setIsLoading(false);
      }
    } catch (err) {
      setErrorMsg('An error occurred during authentication.');
      setIsLoading(false);
    }
  };

  const handleGoogleSSO = async () => {
    setErrorMsg('');
    try {
      const success = await loginWithGoogle();
      if (success) {
        router.push('/dashboard');
      }
    } catch (err) {
      setErrorMsg('Google single sign-on failed.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-md space-y-6 relative overflow-hidden">
        
        {/* Brand/Title */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center">
            <img 
              src="/logo.png" 
              alt="TruthGuard AI" 
              className="h-9 w-auto object-contain dark:brightness-125 dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]" 
            />
          </Link>
          <h2 className="text-xl font-bold text-text-primary">Welcome Back</h2>
          <p className="text-xs text-text-secondary">Sign in to manage and verify your content history.</p>
        </div>

        {/* Status Alerts */}
        {errorMsg && (
          <div className="p-3 bg-danger/10 border border-danger/30 rounded-xl text-danger flex items-center space-x-2 text-xs">
            <AlertCircle className="w-4.5 h-4.5 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {success && (
          <div className="p-3 bg-success/10 border border-success/30 rounded-xl text-success flex items-center space-x-2 text-xs">
            <CheckCircle2 className="w-4.5 h-4.5 flex-shrink-0" />
            <span>Authenticated successfully. Redirecting...</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div className="relative">
            <label className="text-[10px] uppercase font-bold text-text-secondary block mb-1">Email Address</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 text-text-tertiary w-4 h-4" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-9 pr-3.5 py-2 text-xs rounded-lg border border-border bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="relative">
            <div className="flex justify-between items-center mb-1">
              <label className="text-[10px] uppercase font-bold text-text-secondary block">Password</label>
              <a href="#" className="text-[10px] font-bold text-primary hover:underline">Forgot?</a>
            </div>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 text-text-tertiary w-4 h-4" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3.5 py-2 text-xs rounded-lg border border-border bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || success}
            className="w-full py-2.5 text-center text-xs font-bold text-white bg-primary hover:bg-primary-dark rounded-xl shadow-sm transition-all disabled:opacity-50"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-border"></div>
          <span className="flex-shrink mx-3 text-[10px] text-text-tertiary font-bold uppercase">Or continue with</span>
          <div className="flex-grow border-t border-border"></div>
        </div>

        {/* Google SSO */}
        <button
          onClick={handleGoogleSSO}
          type="button"
          className="w-full py-2.5 text-xs font-bold text-text-primary border border-border hover:bg-surface-2 transition-all rounded-xl flex items-center justify-center space-x-2"
        >
          {/* Mock Google icon */}
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.58 15 1 12 1 7.35 1 3.4 3.65 1.5 7.5l3.87 3C6.3 7.8 8.9 5.04 12 5.04z"
            />
            <path
              fill="#4285F4"
              d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.28 1.48-1.12 2.73-2.38 3.58l3.7 2.87c2.16-1.99 3.41-4.92 3.41-8.6z"
            />
            <path
              fill="#FBBC05"
              d="M5.37 14.5c-.24-.72-.37-1.49-.37-2.3s.13-1.58.37-2.3L1.5 6.9C.54 8.82 0 10.97 0 13.2s.54 4.38 1.5 6.3l3.87-3z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.7-2.87c-1.03.69-2.35 1.1-4.26 1.1-3.1 0-5.7-2.76-6.63-5.46l-3.87 3C3.4 19.35 7.35 23 12 23z"
            />
          </svg>
          <span>Sign in with Google</span>
        </button>

        {/* Register link */}
        <p className="text-center text-xs text-text-secondary">
          Don't have an account?{' '}
          <Link href="/register" className="font-bold text-primary hover:underline">
            Register free
          </Link>
        </p>

      </div>
    </div>
  );
}
