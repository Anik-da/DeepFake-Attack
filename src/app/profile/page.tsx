'use client';

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Calendar, ShieldCheck, FileImage, FileVideo, FileAudio, FileText, Trash2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function UserProfilePage() {
  const { user, history, clearHistory } = useAuth();

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return <FileImage className="w-4 h-4 text-primary" />;
      case 'video': return <FileVideo className="w-4 h-4 text-secondary" />;
      case 'audio': return <FileAudio className="w-4 h-4 text-accent" />;
      default: return <FileText className="w-4 h-4 text-text-secondary" />;
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-success bg-success/10 border-success/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'high': return 'text-danger bg-danger/10 border-danger/20';
      case 'critical': return 'text-danger bg-danger/15 border-danger/35';
      default: return 'text-text-secondary bg-surface-2 border-border';
    }
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-text-secondary">Please sign in to view your profile.</p>
        <Link href="/login" className="text-primary hover:underline font-bold mt-2 inline-block">Login</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 animate-scale-in">
      
      {/* Profile Header card */}
      <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-16 h-16 rounded-2xl object-cover border-2 border-primary/20 shadow-sm"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xl">
              {user.name.charAt(0)}
            </div>
          )}
          <div>
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <h1 className="text-xl font-bold text-text-primary">{user.name}</h1>
              <span className="text-[9px] uppercase font-bold bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full">
                {user.role}
              </span>
            </div>
            <p className="text-xs text-text-secondary mt-0.5">{user.email}</p>
            <div className="flex items-center justify-center sm:justify-start text-[10px] text-text-tertiary mt-2 space-x-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Member since {user.createdAt}</span>
            </div>
          </div>
        </div>

        <Link
          href="/settings"
          className="px-4 py-2 text-xs font-bold text-text-primary border border-border hover:bg-surface-2 rounded-xl transition-colors"
        >
          Edit Profile
        </Link>
      </div>

      {/* Verification History list */}
      <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6 shadow-sm">
        <div className="flex justify-between items-center border-b border-border pb-4 mb-4">
          <div>
            <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">Verification History</h3>
            <p className="text-xs text-text-secondary">List of files scanned on this browser session</p>
          </div>
          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="text-xs font-bold text-danger hover:underline flex items-center space-x-1.5"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Log</span>
            </button>
          )}
        </div>

        <div className="divide-y divide-border/60">
          {history.map((item) => (
            <div key={item.id} className="py-3.5 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <div className="flex items-center space-x-3 truncate">
                {getFileIcon(item.type)}
                <div className="truncate">
                  <p className="text-xs font-bold text-text-primary truncate max-w-[200px]">{item.fileName}</p>
                  <p className="text-[10px] text-text-tertiary font-mono mt-0.5">{item.timestamp} • {item.fileSize || 'N/A'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 justify-between sm:justify-end">
                <div className="flex items-center space-x-2">
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wide ${getRiskColor(item.riskLevel)}`}>
                    {item.riskLevel}
                  </span>
                  <span className={`text-xs font-bold ${item.authenticityScore > 70 ? 'text-success' : item.authenticityScore > 40 ? 'text-warning' : 'text-danger'}`}>
                    {item.authenticityScore}%
                  </span>
                </div>
                <Link
                  href={`/verify?demo=true`}
                  className="p-1 rounded-lg border border-border text-text-secondary hover:text-primary hover:bg-surface-2"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}

          {history.length === 0 && (
            <div className="text-center py-12">
              <ShieldCheck className="w-10 h-10 text-text-tertiary mx-auto mb-3" />
              <p className="text-xs text-text-secondary">Your verification history log is empty.</p>
              <Link href="/verify" className="text-xs font-bold text-primary hover:underline mt-1.5 inline-block">
                Start scanning files now
              </Link>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
