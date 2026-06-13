'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Shield, Sun, Moon, Menu, X, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Avoid hydration issues by mounting theme selector after client mount
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Verify Content', href: '/verify' },
    { name: 'Fact Check', href: '/fact-check' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Reports', href: '/reports' },
    { name: 'Education', href: '/education' },
    { name: 'About', href: '/about' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'glass shadow-sm border-b border-border/40 py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <img 
              src="/logo.png" 
              alt="TruthGuard AI" 
              className="h-9 w-auto object-contain dark:brightness-125 dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] transition-transform duration-200 group-hover:scale-[1.02]" 
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                    isActive 
                      ? 'text-primary bg-primary-50 dark:bg-primary-100/10' 
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-2'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Actions (Theme + Auth) */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-colors border border-border/40"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}

            {/* Auth Buttons */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 pr-3 rounded-xl border border-border/40 bg-surface hover:bg-surface-2 transition-colors focus:ring-2 focus:ring-primary/20"
                >
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-8 h-8 rounded-lg object-cover border border-border/20"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                      {user.name.charAt(0)}
                    </div>
                  )}
                  <span className="text-sm font-semibold text-text-primary max-w-[120px] truncate">
                    {user.name}
                  </span>
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2.5 w-56 rounded-xl border border-border bg-surface p-1.5 shadow-lg shadow-black/5 animate-scale-in">
                    <div className="px-3 py-2.5 border-b border-border mb-1.5">
                      <p className="text-xs text-text-tertiary">Logged in as</p>
                      <p className="text-sm font-bold text-text-primary truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center space-x-2.5 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span>My Profile</span>
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center space-x-2.5 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-sm text-danger hover:bg-danger/5 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2.5">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary-dark transition-all rounded-xl shadow-sm hover:shadow-md hover:shadow-primary/10 active:scale-[0.98]"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-3">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg text-text-secondary hover:bg-surface-2 border border-border/40"
              >
                {theme === 'dark' ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-2 border border-border/40"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[68px] glass border-b border-border shadow-lg p-5 flex flex-col space-y-4 animate-scale-in">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-base font-semibold ${
                  isActive 
                    ? 'text-primary bg-primary-50 dark:bg-primary-100/10' 
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-2'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="border-t border-border pt-4 mt-2">
            {user ? (
              <div className="flex flex-col space-y-3">
                <div className="flex items-center space-x-3 px-3 py-1">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-lg object-cover" />
                  ) : (
                    <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
                      {user.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-bold text-text-primary">{user.name}</p>
                    <p className="text-xs text-text-tertiary truncate max-w-[200px]">{user.email}</p>
                  </div>
                </div>
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:bg-surface-2 rounded-lg"
                >
                  <User className="w-4 h-4" />
                  <span>My Profile</span>
                </Link>
                <Link
                  href="/settings"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:bg-surface-2 rounded-lg"
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-danger hover:bg-danger/5 rounded-lg text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2.5">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-2.5 text-sm font-bold text-text-secondary hover:bg-surface-2 rounded-lg border border-border"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-2.5 text-sm font-bold text-white bg-primary hover:bg-primary-dark rounded-lg shadow-sm"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
