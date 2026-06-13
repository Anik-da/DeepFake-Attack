'use client';

import React from 'react';
import Link from 'next/link';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Shield, CheckCircle, AlertTriangle, Users } from 'lucide-react';

const mockChartData = [
  { name: 'Jan', verified: 34000, deepfakes: 4000 },
  { name: 'Feb', verified: 48000, deepfakes: 6200 },
  { name: 'Mar', verified: 59000, deepfakes: 9100 },
  { name: 'Apr', verified: 72000, deepfakes: 12000 },
  { name: 'May', verified: 88000, deepfakes: 18500 },
  { name: 'Jun', verified: 104000, deepfakes: 23100 },
];

export const DashboardPreview = () => {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text block */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-text-primary tracking-tight">
              A Complete Command Center for Digital Integrity
            </h2>
            <p className="text-base text-text-secondary leading-relaxed">
              Verify images, scan text authenticity, review logs, export certificates, and analyze overall threat trends through a powerful, unified web platform.
            </p>
            
            {/* Highlights */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 rounded bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-primary">Multi-modal AI Classifiers</h4>
                  <p className="text-xs text-text-secondary mt-0.5">Simultaneously evaluate spatial landmarks, visual inconsistencies, spectral voice fingerprints, and EXIF headers.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 rounded bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Shield className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-primary">Cryptographic Verification Certificates</h4>
                  <p className="text-xs text-text-secondary mt-0.5">Produce tamper-proof, PDF-downloadable analysis reports to easily share and corroborate results.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center space-x-2 text-sm font-bold text-primary hover:text-primary-dark transition-colors"
              >
                <span>View Analytics Dashboard</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Interactive Chart Container */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border bg-surface-2 p-5 sm:p-6 shadow-xl shadow-black/5 dark:shadow-black/25">
              
              {/* Fake dashboard header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-border pb-4 mb-6 gap-3">
                <div>
                  <h3 className="text-base font-bold text-text-primary">Global Verification Volumes</h3>
                  <p className="text-xs text-text-secondary">Tracking monthly processed files and malicious deepfake frequency</p>
                </div>
                <div className="flex items-center space-x-2 bg-surface border border-border px-3 py-1 rounded-lg text-xs font-semibold text-text-secondary">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary/20 border border-primary flex-shrink-0" />
                  <span>June 2026</span>
                </div>
              </div>

              {/* Charts area */}
              <div className="h-64 sm:h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={mockChartData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorVerified" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorDeepfakes" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                    <XAxis 
                      dataKey="name" 
                      stroke="var(--text-tertiary)" 
                      fontSize={11}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="var(--text-tertiary)" 
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'var(--surface)', 
                        borderColor: 'var(--border)',
                        borderRadius: '8px',
                        fontSize: '12px',
                        color: 'var(--text-primary)'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="verified" 
                      name="Verified Media"
                      stroke="#2563eb" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorVerified)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="deepfakes" 
                      name="Deepfakes Blocked"
                      stroke="#ef4444" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorDeepfakes)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Stats badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 border-t border-border pt-5">
                <div className="text-center sm:text-left">
                  <span className="text-[10px] uppercase font-bold text-text-tertiary tracking-wider block">Total Verified</span>
                  <span className="text-lg font-extrabold text-text-primary block mt-0.5">1.2M+</span>
                </div>
                <div className="text-center sm:text-left">
                  <span className="text-[10px] uppercase font-bold text-text-tertiary tracking-wider block">Deepfakes Identified</span>
                  <span className="text-lg font-extrabold text-danger block mt-0.5">348.9K</span>
                </div>
                <div className="text-center sm:text-left">
                  <span className="text-[10px] uppercase font-bold text-text-tertiary tracking-wider block">Fact Checked</span>
                  <span className="text-lg font-extrabold text-text-primary block mt-0.5">87.1K</span>
                </div>
                <div className="text-center sm:text-left">
                  <span className="text-[10px] uppercase font-bold text-text-tertiary tracking-wider block">Avg. Accuracy</span>
                  <span className="text-lg font-extrabold text-success block mt-0.5">99.85%</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
