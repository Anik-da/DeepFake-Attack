'use client';

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from 'next-themes';
import { Shield, Settings, Bell, Lock, User, CheckCircle } from 'lucide-react';

export default function SettingsPage() {
  const { user, updateProfile } = useAuth();
  const { theme, setTheme } = useTheme();

  // Settings states
  const [name, setName] = useState(user?.name || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [threatDigest, setThreatDigest] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(name, avatar);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8 animate-scale-in">
      
      {/* Header */}
      <div>
        <h1 className="font-display font-black text-3xl text-text-primary tracking-tight">Account Settings</h1>
        <p className="text-xs sm:text-sm text-text-secondary mt-1">Manage profile configurations, notifications, API parameters, and interface theme.</p>
      </div>

      {success && (
        <div className="p-3 bg-success/10 border border-success/30 rounded-xl text-success flex items-center space-x-2 text-xs">
          <CheckCircle className="w-4.5 h-4.5 flex-shrink-0" />
          <span>Profile configuration saved successfully.</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        {/* Left Side: Navigation Links */}
        <div className="rounded-xl border border-border bg-surface p-3 space-y-1 shadow-sm">
          <button className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-primary bg-primary-50 dark:bg-primary-100/10 flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>Profile Details</span>
          </button>
          <button className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-text-secondary hover:text-text-primary hover:bg-surface-2 flex items-center space-x-2">
            <Bell className="w-4 h-4" />
            <span>Notifications</span>
          </button>
          <button className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-text-secondary hover:text-text-primary hover:bg-surface-2 flex items-center space-x-2">
            <Lock className="w-4 h-4" />
            <span>Security & API</span>
          </button>
        </div>

        {/* Right Side: Form details */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Profile details */}
          <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6 shadow-sm">
            <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider mb-4 border-b border-border pb-2.5">Edit Profile</h3>
            
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-text-secondary block mb-1">Display Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-border bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-text-secondary block mb-1">Avatar Image URL</label>
                <input
                  type="text"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-border bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2.5 text-xs font-bold text-white bg-primary hover:bg-primary-dark rounded-xl shadow-sm transition-all"
              >
                Save Profile
              </button>
            </form>
          </div>

          {/* Preferences */}
          <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6 shadow-sm">
            <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider mb-4 border-b border-border pb-2.5">Preferences</h3>
            
            <div className="space-y-4 text-xs">
              
              {/* Theme Selection */}
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-text-primary">System Color Theme</h4>
                  <p className="text-[10px] text-text-secondary mt-0.5">Toggle interface light or dark modes</p>
                </div>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg border border-border bg-surface text-text-primary focus:outline-none"
                >
                  <option value="light">Light Mode</option>
                  <option value="dark">Dark Mode</option>
                </select>
              </div>

              {/* Notification toggle */}
              <div className="flex justify-between items-center border-t border-border pt-4">
                <div>
                  <h4 className="font-bold text-text-primary">Email Notifications</h4>
                  <p className="text-[10px] text-text-secondary mt-0.5">Receive alert reports when suspicious media is detected</p>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="w-4 h-4 text-primary border-border focus:ring-primary/20 rounded"
                />
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
