'use client';

import React, { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ShieldCheck, ShieldAlert, BarChart3, Users, ChevronRight, FileImage, FileVideo, FileAudio, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import { mockDashboardStats } from '../../lib/mockData';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';

export default function DashboardPage() {
  const { history } = useAuth();
  const [filterType, setFilterType] = useState<'all' | 'image' | 'video' | 'audio' | 'text'>('all');

  const stats = [
    {
      title: 'Total Verified',
      value: mockDashboardStats.totalVerified.toLocaleString(),
      change: '+12.4% MoM',
      icon: <ShieldCheck className="w-5 h-5 text-primary" />,
      bg: 'bg-primary-50 dark:bg-primary-100/10'
    },
    {
      title: 'Deepfakes Blocked',
      value: mockDashboardStats.deepfakesDetected.toLocaleString(),
      change: '+18.1% MoM',
      icon: <ShieldAlert className="w-5 h-5 text-danger" />,
      bg: 'bg-danger/5 dark:bg-danger/10'
    },
    {
      title: 'Fact Checked',
      value: mockDashboardStats.factChecksCompleted.toLocaleString(),
      change: '+8.9% MoM',
      icon: <BarChart3 className="w-5 h-5 text-secondary" />,
      bg: 'bg-indigo-50 dark:bg-indigo-100/10'
    },
    {
      title: 'Community Cases',
      value: mockDashboardStats.communityReports.toLocaleString(),
      change: '+15.2% MoM',
      icon: <Users className="w-5 h-5 text-accent" />,
      bg: 'bg-cyan-50 dark:bg-cyan-100/10'
    }
  ];

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

  const filteredHistory = filterType === 'all'
    ? history
    : history.filter(item => item.type === filterType);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="font-display font-black text-3xl text-text-primary tracking-tight">AI Trust Dashboard</h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">Real-time indicators, detection volumes, and digital media verification integrity metrics.</p>
        </div>
        <div className="flex space-x-2">
          <Link
            href="/verify"
            className="px-4 py-2.5 text-xs font-bold text-white bg-primary hover:bg-primary-dark rounded-xl shadow-sm transition-all"
          >
            Verify Content
          </Link>
          <Link
            href="/fact-check"
            className="px-4 py-2.5 text-xs font-bold text-text-primary border border-border bg-surface hover:bg-surface-2 rounded-xl transition-all"
          >
            Fact Check Claim
          </Link>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-text-secondary uppercase tracking-wide">{stat.title}</span>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${stat.bg}`}>
                {stat.icon}
              </div>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <span className="font-display font-extrabold text-2xl text-text-primary">{stat.value}</span>
              <span className="text-[10px] font-bold text-success">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Historical Area Chart */}
        <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6 shadow-sm lg:col-span-2">
          <div className="flex justify-between items-center border-b border-border pb-4 mb-6">
            <div>
              <h3 className="text-sm font-bold text-text-primary">System Verifications Over Time</h3>
              <p className="text-xs text-text-secondary">Historical analysis of processed content batches</p>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockDashboardStats.historicalData}>
                <defs>
                  <linearGradient id="colorVerified2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="date" stroke="var(--text-tertiary)" fontSize={11} tickLine={false} />
                <YAxis stroke="var(--text-tertiary)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }} />
                <Area type="monotone" dataKey="verified" stroke="#2563eb" fillOpacity={1} fill="url(#colorVerified2)" strokeWidth={2} />
                <Area type="monotone" dataKey="deepfakes" stroke="#ef4444" fillOpacity={0} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Content Type Breakdown (Pie) */}
        <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6 shadow-sm">
          <div className="border-b border-border pb-4 mb-6">
            <h3 className="text-sm font-bold text-text-primary">Content Type Breakdown</h3>
            <p className="text-xs text-text-secondary">Percentage of media formats submitted</p>
          </div>
          <div className="h-48 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockDashboardStats.contentTypeBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {mockDashboardStats.contentTypeBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute text-center">
              <span className="text-xs text-text-tertiary font-bold uppercase block">Accuracy</span>
              <span className="font-display font-extrabold text-lg text-success">99.85%</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4 text-[10px]">
            {mockDashboardStats.contentTypeBreakdown.map((type, i) => (
              <div key={i} className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: type.color }} />
                <span className="font-semibold text-text-secondary">{type.name} ({type.value}%)</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Grid: Category distribution & Recent verification list */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Category distribution */}
        <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6 shadow-sm">
          <div className="border-b border-border pb-4 mb-6">
            <h3 className="text-sm font-bold text-text-primary">Debunked Claims by Category</h3>
            <p className="text-xs text-text-secondary">Incident frequencies categorized by topic</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockDashboardStats.categoryDistribution} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" />
                <XAxis type="number" stroke="var(--text-tertiary)" fontSize={11} tickLine={false} />
                <YAxis dataKey="category" type="category" stroke="var(--text-tertiary)" fontSize={11} tickLine={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Verification history table */}
        <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6 shadow-sm lg:col-span-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-border pb-4 mb-6 gap-3">
            <div>
              <h3 className="text-sm font-bold text-text-primary">Recent Verification Log</h3>
              <p className="text-xs text-text-secondary">Audit list of files evaluated by your session</p>
            </div>
            <div className="flex border border-border p-0.5 rounded-lg space-x-1 bg-surface-2 text-[10px] font-bold">
              {(['all', 'image', 'video', 'audio'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-2.5 py-1 rounded-md uppercase tracking-wider capitalize ${
                    filterType === type 
                      ? 'bg-surface text-primary shadow-sm' 
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border text-text-tertiary uppercase tracking-wider font-semibold">
                  <th className="pb-3 font-semibold">File Name</th>
                  <th className="pb-3 font-semibold">Processed</th>
                  <th className="pb-3 font-semibold">Auth Score</th>
                  <th className="pb-3 font-semibold">Risk Level</th>
                  <th className="pb-3 font-semibold"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-surface-2/40 transition-colors">
                    <td className="py-3.5 flex items-center space-x-2 truncate max-w-[180px]">
                      {getFileIcon(item.type)}
                      <span className="font-semibold text-text-primary truncate">{item.fileName}</span>
                    </td>
                    <td className="py-3.5 text-text-secondary font-mono">{item.timestamp}</td>
                    <td className="py-3.5">
                      <div className="flex items-center space-x-1.5">
                        <span className={`font-bold ${item.authenticityScore > 70 ? 'text-success' : item.authenticityScore > 40 ? 'text-warning' : 'text-danger'}`}>
                          {item.authenticityScore}%
                        </span>
                        <span className="text-[10px] text-text-tertiary">Match</span>
                      </div>
                    </td>
                    <td className="py-3.5">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wide ${getRiskColor(item.riskLevel)}`}>
                        {item.riskLevel}
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      <Link
                        href={`/verify?demo=true`}
                        className="text-primary hover:text-primary-dark font-bold inline-flex items-center space-x-0.5"
                      >
                        <span>Audit</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredHistory.length === 0 && (
              <div className="text-center py-10">
                <span className="text-text-tertiary block">No logs match this content filter.</span>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
