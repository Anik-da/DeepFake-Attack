'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert } from 'lucide-react';

const PROTECTED_ROUTES = ['/verify', '/fact-check', '/dashboard', '/reports', '/profile', '/settings'];

export const RouteGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));

  useEffect(() => {
    if (!loading && !user && isProtectedRoute) {
      router.push('/login');
    }
  }, [user, loading, pathname, router, isProtectedRoute]);

  // Show a premium, beautiful full-screen loading spinner while restoring firebase session
  if (loading && isProtectedRoute) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-md">
        <div className="relative w-16 h-16 mb-6">
          <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" />
          <div className="absolute inset-2 rounded-full border-2 border-primary/40 animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center text-primary">
            <ShieldAlert className="w-6 h-6 animate-spin" />
          </div>
        </div>
        <h3 className="font-display font-extrabold text-lg text-text-primary uppercase tracking-wider">TruthGuard AI</h3>
        <p className="text-xs text-text-secondary mt-1">Verifying secure forensic terminal credentials...</p>
      </div>
    );
  }

  // Prevent rendering children if route is protected and user is not authenticated
  if (!loading && !user && isProtectedRoute) {
    return null;
  }

  return <>{children}</>;
};
